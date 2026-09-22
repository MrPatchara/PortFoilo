import { Fragment, useEffect, useRef, type CSSProperties } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface AnimatedTextProps {
  text: string
  className?: string
}

/**
 * Scroll-scrubbed text reveal — visually identical to before, ~6x cheaper.
 *
 * Previously this mounted one framer-motion `motion.span` **and** one
 * `MotionValue` per character (235 of each for the About paragraph), every one
 * of them subscribing to scroll position. Now it renders one span per word and
 * derives every word's opacity in CSS from a single `--p` custom property that
 * one rAF-throttled scroll listener writes onto the paragraph.
 *
 * The per-word opacity formula is the same interpolation the old code used:
 *   opacity = 0.2 + 0.8 * clamp(0, p * wordCount - wordIndex, 1)
 */
export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const words = text.split(/\s+/).filter(Boolean)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (prefersReducedMotion) {
      element.style.setProperty('--p', '1')
      return
    }

    let frame = 0

    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const viewport = window.innerHeight
      // Mirrors the previous offset: ['start 0.8', 'end 0.2'].
      const distance = Math.max(1, viewport * 0.6 - rect.height)
      const progress = (viewport * 0.8 - rect.top) / distance
      element.style.setProperty(
        '--p',
        progress < 0 ? '0' : progress > 1 ? '1' : progress.toFixed(4),
      )
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [prefersReducedMotion])

  return (
    <p ref={ref} className={className ? `animated-text ${className}` : 'animated-text'}>
      {words.map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          <span
            className="animated-text__word"
            style={
              {
                '--i': String(index),
                '--n': String(words.length),
              } as CSSProperties
            }
          >
            {word}
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  )
}


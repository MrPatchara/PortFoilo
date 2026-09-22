import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { observeReveal } from '../lib/reveal'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
  style?: CSSProperties
}

/**
 * Scroll-triggered fade/slide reveal.
 *
 * Same public API as before, but the animation now runs as a pure CSS
 * transition driven by one shared IntersectionObserver (src/lib/reveal.ts)
 * instead of mounting a framer-motion instance per element. This removes
 * framer-motion from the initial JS payload entirely.
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => observeReveal(ref.current), [])

  const revealVars: Record<string, string> = {
    '--reveal-x': `${x}px`,
    '--reveal-y': `${y}px`,
    '--reveal-delay': `${delay}s`,
    '--reveal-duration': `${duration}s`,
  }

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : 'reveal'}
      style={{ ...revealVars, ...style } as CSSProperties}
    >
      {children}
    </div>
  )
}


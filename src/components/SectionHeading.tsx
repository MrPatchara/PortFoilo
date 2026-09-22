import type { CSSProperties } from 'react'
import FadeIn from './FadeIn'

interface SectionHeadingProps {
  /** Section counter, e.g. "02". Rendered as an eyebrow above the title. */
  index: string
  title: string
  /** Optional eyebrow label. Omit it to render the counter on its own. */
  eyebrow?: string
  /** `outline` alternates with the gradient to break up the repetition. */
  variant?: 'gradient' | 'outline'
  fontSize?: string
  className?: string
  style?: CSSProperties
}

/**
 * Shared section heading: eyebrow counter + display title.
 *
 * Every section previously repeated the exact same gradient heading, which
 * made the page read as one long block. The counter and the alternating
 * outline treatment give each section a clear position in the page.
 */
export default function SectionHeading({
  index,
  title,
  eyebrow,
  variant = 'gradient',
  fontSize = 'clamp(3rem, 12vw, 160px)',
  className = '',
  style,
}: SectionHeadingProps) {
  return (
    <FadeIn delay={0} y={40} duration={0.7} className={className}>
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <span className="flex items-center gap-3 text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-[#D7E2EA]/45">
          <span className="text-[#B600A8] font-semibold">{index}</span>
          <span aria-hidden className="h-px w-6 sm:w-10 bg-[#D7E2EA]/25" />
          {eyebrow ? <span>{eyebrow}</span> : null}
        </span>
        <h2
          className={`font-black uppercase leading-none tracking-tight text-center ${
            variant === 'outline' ? 'hero-heading--outline' : 'hero-heading'
          }`}
          style={{ fontSize, ...style }}
        >
          {title}
        </h2>
      </div>
    </FadeIn>
  )
}

import { Download } from 'lucide-react'
import { SITE } from '../data/site'

/**
 * Secondary CTA next to "Contact Me".
 *
 * Renders nothing while `SITE.resumeUrl` is empty so a portfolio that is
 * being sent to recruiters never shows a download that 404s.
 */
export default function CvButton({ className = '' }: { className?: string }) {
  if (!SITE.resumeUrl) return null

  return (
    <a
      href={SITE.resumeUrl}
      download
      className={`inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA] font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base px-6 py-3 sm:px-8 sm:py-3.5 hover:bg-[#D7E2EA]/10 transition-colors ${className}`}
    >
      <Download size={18} />
      Download CV
    </a>
  )
}

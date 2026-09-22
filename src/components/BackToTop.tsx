import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/**
 * Floating "back to top" control. Uses `window.scrollTo({ top: 0 })` without an
 * explicit behaviour so it inherits `scroll-behavior` from CSS — which the
 * reduced-motion media query already downgrades to `auto`.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setVisible(window.scrollY > window.innerHeight * 1.5)
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0C0C0C]/80 text-[#D7E2EA] backdrop-blur-md transition-all duration-300 hover:bg-[#0C0C0C] sm:bottom-8 sm:right-8 sm:h-12 sm:w-12 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp size={20} />
    </button>
  )
}

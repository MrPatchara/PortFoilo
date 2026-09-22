/**
 * A single shared IntersectionObserver drives every `.reveal` element.
 *
 * This replaces one `motion.div` + one IntersectionObserver per instance
 * (framer-motion creates its own observer per component), so the whole page
 * now runs on one observer and zero JS-per-frame.
 */
const REVEALED = 'data-revealed'

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const element = entry.target as HTMLElement
        element.setAttribute(REVEALED, 'true')
        // Reveal once, then stop tracking this element.
        observer?.unobserve(element)
      }
    },
    // Mirrors framer-motion's `viewport={{ once: true, margin: '50px' }}`.
    { rootMargin: '50px', threshold: 0 },
  )

  return observer
}

/**
 * Starts observing `element` and returns a cleanup function.
 * Falls back to showing the element immediately when IntersectionObserver
 * is unavailable (very old browsers, SSR-less environments).
 */
export function observeReveal(element: HTMLElement | null): () => void {
  if (!element) return () => {}

  const io = getObserver()
  if (!io) {
    element.setAttribute(REVEALED, 'true')
    return () => {}
  }

  io.observe(element)
  return () => io.unobserve(element)
}

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollLock } from '../hooks/useScrollLock'

interface LightboxProps {
  images: string[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
  /** Noun used to build accessibility labels, e.g. "Certificate 4". */
  label?: string
}

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
/** Must stay in sync with the `.lightbox-overlay` exit animation in index.css. */
const EXIT_MS = 180
const SWIPE_THRESHOLD = 45

/**
 * Full-screen image viewer.
 *
 * Rewritten without framer-motion (this was the last consumer besides
 * ProjectsSection, which keeps it in a lazily-loaded chunk) and hardened:
 *  - swipe left/right on touch devices — previously the only way to change
 *    image on a phone was to hit the small arrow buttons,
 *  - focus is trapped inside the dialog and restored to the tile that opened
 *    it (was missing entirely),
 *  - page scroll is locked with scrollbar-width compensation so the layout
 *    behind the overlay doesn't jump.
 */
export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
  label = 'Certificate',
}: LightboxProps) {
  const total = images.length
  const isOpen = index !== null && total > 0

  const dialogRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const closeTimerRef = useRef<number | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const [closing, setClosing] = useState(false)

  const requestClose = useCallback(() => {
    if (closeTimerRef.current !== null) return
    setClosing(true)
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null
      setClosing(false)
      onClose()
    }, EXIT_MS)
  }, [onClose])

  useScrollLock(isOpen)

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current)
    }
  }, [])

  // Move focus into the dialog on open, restore it to the trigger on close.
  useEffect(() => {
    if (!isOpen) return
    restoreFocusRef.current = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()

    return () => {
      const target = restoreFocusRef.current
      if (target && typeof target.focus === 'function') target.focus()
    }
  }, [isOpen])

  if (index === null || total === 0) return null

  const current = ((index % total) + total) % total
  const labelLower = label.toLowerCase()

  const goTo = (next: number) => onNavigate(next)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      requestClose()
      return
    }
    if (event.key === 'ArrowRight') {
      goTo(current + 1)
      return
    }
    if (event.key === 'ArrowLeft') {
      goTo(current - 1)
      return
    }
    if (event.key !== 'Tab') return

    // Focus trap — keep Tab cycling inside the dialog.
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
    if (!focusable || focusable.length === 0) return

    const items = Array.from(focusable)
    const first = items[0]
    const last = items[items.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0]
    if (touch) touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    const touch = event.changedTouches[0]
    if (!start || !touch) return

    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y
    // Horizontal intent only — ignore vertical drags and plain taps.
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return

    goTo(deltaX < 0 ? current + 1 : current - 1)
  }

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      data-closing={closing ? 'true' : 'false'}
      onClick={requestClose}
      onKeyDown={handleKeyDown}
      className="lightbox-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8 outline-none"
      role="dialog"
      aria-modal="true"
      aria-label={`${label} viewer`}
    >
      {/* Counter */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-medium tracking-widest text-white">
        {current + 1} / {total}
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={requestClose}
        aria-label="Close viewer"
        className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          goTo(current - 1)
        }}
        aria-label={`Previous ${labelLower}`}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Image */}
      <figure
        key={images[current]}
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="lightbox-figure max-w-full"
      >
        <img
          src={images[current]}
          alt={`${label} ${current + 1}`}
          className="max-h-[78vh] sm:max-h-[82vh] max-w-[88vw] sm:max-w-[80vw] w-auto h-auto object-contain rounded-2xl border border-white/20 shadow-[0_30px_120px_-20px_rgba(182,0,168,0.45)]"
          draggable={false}
        />
      </figure>

      {/* Next */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          goTo(current + 1)
        }}
        aria-label={`Next ${labelLower}`}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors"
      >
        <ChevronRight size={22} />
      </button>

      {/* Hint */}
      <p className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-[11px] sm:text-xs uppercase tracking-widest text-white/50 whitespace-nowrap">
        Swipe or arrow keys · ESC to close
      </p>
    </div>
  )
}

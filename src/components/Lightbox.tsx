import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxProps {
  images: string[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const total = images.length
  const current = index === null ? 0 : ((index % total) + total) % total

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(current + 1)
      if (e.key === 'ArrowLeft') onNavigate(current - 1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [index, current, onClose, onNavigate])

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Certificate viewer"
        >
          {/* Counter */}
          <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-medium tracking-widest text-white">
            {current + 1} / {total}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigate(current - 1)
            }}
            aria-label="Previous certificate"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Image */}
          <motion.figure
            key={images[current]}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full"
          >
            <img
              src={images[current]}
              alt={`Certificate ${current + 1}`}
              className="max-h-[78vh] sm:max-h-[82vh] max-w-[88vw] sm:max-w-[80vw] w-auto h-auto object-contain rounded-2xl border border-white/20 shadow-[0_30px_120px_-20px_rgba(182,0,168,0.45)]"
              draggable={false}
            />
          </motion.figure>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigate(current + 1)
            }}
            aria-label="Next certificate"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={22} />
          </button>

          {/* Hint */}
          <p className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-[11px] sm:text-xs uppercase tracking-widest text-white/50 whitespace-nowrap">
            Click outside or press ESC to close
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

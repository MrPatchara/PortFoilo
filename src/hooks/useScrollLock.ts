import { useEffect } from 'react'

let lockCount = 0
let previousOverflow = ''
let previousPaddingRight = ''

function applyLock() {
  // Compensate for the disappearing scrollbar so the page doesn't jump.
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  previousOverflow = document.body.style.overflow
  previousPaddingRight = document.body.style.paddingRight
  document.body.style.overflow = 'hidden'
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
}

function releaseLock() {
  document.body.style.overflow = previousOverflow
  document.body.style.paddingRight = previousPaddingRight
}

/**
 * Locks page scrolling (mobile menu / lightbox) and restores it on unmount.
 * Reference counted so nested locks don't unlock each other early.
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return
    lockCount += 1
    if (lockCount === 1) applyLock()

    return () => {
      lockCount -= 1
      if (lockCount === 0) releaseLock()
    }
  }, [active])
}

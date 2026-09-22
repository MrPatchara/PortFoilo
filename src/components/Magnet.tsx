import { useEffect, useRef, type ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

/**
 * Cursor-following "magnet" wrapper.
 *
 * Rewritten to avoid the two costs the old version had:
 *  1. It called `setState` on every `mousemove`, forcing a React re-render for
 *     each pointer event. It now writes the transform straight to the node.
 *  2. It read `getBoundingClientRect()` on every event — and the element's own
 *     transform fed back into the next measurement. The rect is now measured
 *     with the current offset subtracted, so it can never drift.
 *
 * It also does nothing at all on touch devices and for reduced-motion users,
 * where the effect was never visible but the listeners still ran.
 */
export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof window.matchMedia !== 'function') return

    const pointerCoarse = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (pointerCoarse || reducedMotion) return

    let frame = 0
    let pending: MouseEvent | null = null
    let isActive = false
    let offsetX = 0
    let offsetY = 0
    let box = { left: 0, top: 0, width: 0, height: 0 }

    const measure = () => {
      const rect = element.getBoundingClientRect()
      box = {
        left: rect.left - offsetX,
        top: rect.top - offsetY,
        width: rect.width,
        height: rect.height,
      }
    }

    const write = (x: number, y: number) => {
      offsetX = x
      offsetY = y
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    const handleMove = (event: MouseEvent) => {
      const distX = event.clientX - (box.left + box.width / 2)
      const distY = event.clientY - (box.top + box.height / 2)
      const withinX = Math.abs(distX) < box.width / 2 + padding
      const withinY = Math.abs(distY) < box.height / 2 + padding

      if (withinX && withinY) {
        if (!isActive) {
          isActive = true
          element.style.transition = activeTransition
        }
        write(distX / strength, distY / strength)
      } else if (isActive) {
        isActive = false
        element.style.transition = inactiveTransition
        write(0, 0)
      }
    }

    // At most one layout read + one style write per animation frame.
    const schedule = (event?: MouseEvent) => {
      if (event) pending = event
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        if (pending) {
          handleMove(pending)
          pending = null
        } else {
          measure()
        }
      })
    }

    measure()
    const onMove = (event: MouseEvent) => schedule(event)
    const onLayout = () => schedule()

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onLayout, { passive: true })
    window.addEventListener('resize', onLayout, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onLayout)
      window.removeEventListener('resize', onLayout)
      element.style.transform = ''
      element.style.transition = ''
    }
  }, [padding, strength, activeTransition, inactiveTransition])

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', transition: inactiveTransition, willChange: 'transform' }}
    >
      {children}
    </div>
  )
}


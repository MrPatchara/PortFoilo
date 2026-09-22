import { useEffect, useState } from 'react'

const MAX_ATTEMPTS = 25
const RETRY_MS = 250

/**
 * Highlights the nav link for whichever section currently owns the vertical
 * band around 35% of the viewport.
 *
 * Sections can mount late (they are `React.lazy` chunks), so a single
 * `getElementById` sweep at mount would silently observe nothing. Instead the
 * hook retries for a few seconds before giving up.
 */
export function useActiveSection(ids: string[], focusRatio = 0.35): string {
  const [active, setActive] = useState('')
  const key = ids.join('|')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sectionIds = key ? key.split('|') : []
    if (sectionIds.length === 0) return

    const top = Math.round(focusRatio * 100)
    const bottom = Math.max(0, 100 - top - 1)

    let observer: IntersectionObserver | null = null
    let timer: number | null = null
    let attempts = 0

    const connect = () => {
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null)

      if (elements.length < sectionIds.length && attempts < MAX_ATTEMPTS) {
        attempts += 1
        timer = window.setTimeout(connect, RETRY_MS)
        return
      }

      if (elements.length === 0) return

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

          if (visible[0]) setActive(visible[0].target.id)
        },
        { rootMargin: `-${top}% 0px -${bottom}% 0px`, threshold: 0 },
      )

      elements.forEach((element) => observer?.observe(element))
    }

    connect()

    return () => {
      if (timer !== null) window.clearTimeout(timer)
      observer?.disconnect()
    }
  }, [key, focusRatio])

  return active
}


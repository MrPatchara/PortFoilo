import { srcFromSrcset } from '../lib/srcset'

export interface MarqueeImage {
  /** Ready-made `srcset` string produced by vite-imagetools. */
  srcset: string
  /** Fallback `src`, derived from the largest srcset candidate. */
  src: string
  /** Alt text — pass `''` for purely decorative images. */
  alt?: string
  /** Optional identifier handed back to `onSelect` (e.g. index in the full list). */
  id?: string
}

interface MarqueeRowProps {
  images: MarqueeImage[]
  direction: 'left' | 'right'
  duration: string
  tileClass?: string
  sizes?: string
  /** Called with the clicked image. Enables the zoomable `<button>` variant. */
  onSelect?: (image: MarqueeImage) => void
  /** Label prefix for the accessibility label of selectable tiles. */
  labelPrefix?: string
}

const DEFAULT_TILE = 'w-[200px] h-[130px] sm:w-[420px] sm:h-[270px]'
const DEFAULT_SIZES = '(min-width: 640px) 420px, 200px'

/**
 * Infinite CSS marquee. The rendering result is unchanged from the original
 * implementation — the row is still duplicated into two halves so the loop is
 * seamless — but each tile now:
 *
 *  - serves a resized WebP `srcset` instead of a full-resolution JPEG
 *    (certificates alone went from 5.12 MB to a fraction of that),
 *  - decodes off the main thread (`decoding="async"`),
 *  - and is wrapped in a real `<button>` when it opens the lightbox, so it is
 *    reachable with the keyboard and announced by screen readers (the old
 *    `<img onClick>` was neither).
 *
 * The whole row is also paint-isolated (`.marquee-scope`) so these very wide,
 * permanently animating layers stop invalidating layout for the rest of the
 * document.
 */
export default function MarqueeRow({
  images,
  direction,
  duration,
  tileClass = DEFAULT_TILE,
  sizes = DEFAULT_SIZES,
  onSelect,
  labelPrefix = 'View item',
}: MarqueeRowProps) {
  const halves = [0, 1]

  return (
    <div className="marquee-scope overflow-hidden w-full">
      <div
        className="flex w-max hover:[animation-play-state:paused]"
        style={{
          animationName: direction === 'left' ? 'marquee-left' : 'marquee-right',
          animationDuration: duration,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          willChange: 'transform',
        }}
      >
        {halves.map((half) => (
          <div key={half} className="flex gap-3 pr-3 shrink-0" aria-hidden={half === 1}>
            {images.map((image, index) => {
              const src = image.src || srcFromSrcset(image.srcset)

              if (!onSelect) {
                return (
                  <img
                    key={`${half}-${index}`}
                    src={src}
                    srcSet={image.srcset}
                    sizes={sizes}
                    alt={image.alt ?? ''}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className={`rounded-2xl object-cover shrink-0 select-none transition hover:brightness-110 hover:ring-2 hover:ring-white/60 ${tileClass}`}
                  />
                )
              }

              return (
                <button
                  key={`${half}-${index}`}
                  type="button"
                  tabIndex={half === 1 ? -1 : 0}
                  onClick={() => onSelect(image)}
                  aria-label={
                    image.alt || `${labelPrefix} ${(image.id ?? String(index + 1))}`
                  }
                  className={`group shrink-0 cursor-zoom-in rounded-2xl ${tileClass}`}
                >
                  <img
                    src={src}
                    srcSet={image.srcset}
                    sizes={sizes}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full select-none rounded-2xl object-cover transition group-hover:brightness-110 group-hover:ring-2 group-hover:ring-white/60 group-focus-visible:brightness-110 group-focus-visible:ring-2 group-focus-visible:ring-white/60"
                  />
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}


import { useState } from 'react'
import MarqueeRow, { type MarqueeImage } from '../components/MarqueeRow'
import Lightbox from '../components/Lightbox'
import SectionHeading from '../components/SectionHeading'
import { naturalSort, spreadOrder } from '../lib/imageOrder'
import { srcFromSrcset } from '../lib/srcset'

// Auto-loads every image dropped into src/Pic_cer (sorted by file number).
// `?w=400;800&format=webp&as=srcset` makes Vite emit two resized WebP variants
// per file at build time, so the browser downloads ~400px wide artwork for the
// mobile tile instead of the full 1280px JPEG. The 47 source files add up to
// 5.12 MB; the variants that actually ship are a small fraction of that.
const modules = import.meta.glob('../Pic_cer/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  query: '?w=400;800&format=webp&as=srcset',
  import: 'default',
}) as Record<string, string>

const SORTED: string[] = Object.keys(modules)
  .sort(naturalSort)
  .map((key) => modules[key])

// `id` is the position inside CERTS so the lightbox can navigate by index.
const CERTS: MarqueeImage[] = spreadOrder(SORTED.length).map((sourceIndex, position) => ({
  srcset: SORTED[sourceIndex],
  src: srcFromSrcset(SORTED[sourceIndex]),
  alt: `Certificate ${position + 1}`,
  id: String(position),
}))

const CERT_URLS = CERTS.map((certificate) => certificate.src)

const ROW_1 = CERTS.filter((_, index) => index % 3 === 0)
const ROW_2 = CERTS.filter((_, index) => index % 3 === 1)
const ROW_3 = CERTS.filter((_, index) => index % 3 === 2)

const TILE = 'w-[180px] h-[120px] sm:w-[300px] sm:h-[190px]'
const SIZES = '(min-width: 640px) 300px, 180px'

export default function CertificateSection() {
  const [selected, setSelected] = useState<number | null>(null)

  const handleSelect = (image: MarqueeImage) => {
    const index = Number(image.id)
    if (Number.isInteger(index) && index >= 0 && index < CERTS.length) setSelected(index)
  }

  return (
    <section
      id="certificates"
      className="px-5 sm:px-8 md:px-10 pt-12 sm:pt-24 md:pt-28 pb-12 sm:pb-24"
      style={{ background: '#0C0C0C' }}
    >
      <SectionHeading
        index="04"
        title="Certificates"
        eyebrow={`${CERTS.length} credentials`}
        variant="outline"
        fontSize="clamp(2.5rem, 10vw, 140px)"
        className="mb-8 sm:mb-16"
      />

      {CERTS.length === 0 ? (
        <p className="text-center text-[#D7E2EA]/60 font-light uppercase tracking-widest text-sm">
          Drop certificate images into src/Pic_cer to display them here
        </p>
      ) : (
        <div className="flex flex-col gap-2 sm:gap-3 -mx-5 sm:-mx-8 md:-mx-10">
          <MarqueeRow
            images={ROW_1}
            direction="right"
            duration="90s"
            tileClass={TILE}
            sizes={SIZES}
            onSelect={handleSelect}
          />
          <MarqueeRow
            images={ROW_2}
            direction="left"
            duration="110s"
            tileClass={TILE}
            sizes={SIZES}
            onSelect={handleSelect}
          />
          <MarqueeRow
            images={ROW_3}
            direction="right"
            duration="100s"
            tileClass={TILE}
            sizes={SIZES}
            onSelect={handleSelect}
          />
        </div>
      )}

      <Lightbox
        images={CERT_URLS}
        index={selected}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </section>
  )
}


import { useState } from 'react'
import FadeIn from '../components/FadeIn'
import MarqueeRow from '../components/MarqueeRow'
import Lightbox from '../components/Lightbox'

// Auto-loads every image dropped into src/Pic_cer (sorted by file number)
const modules = import.meta.glob('../Pic_cer/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function naturalSort(a: string, b: string) {
  const num = (s: string) => {
    const m = s.match(/(\d+)\.(png|jpe?g|webp|gif)$/i)
    return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER
  }
  return num(a) - num(b) || a.localeCompare(b)
}

// Spread ordering: consecutive files (often the same institution batch)
// are distributed evenly so similar certificates never sit next to each other.
// Uses a coprime stride permutation, so it stays stable for any file count.
function spreadOrder(n: number): number[] {
  if (n <= 1) return [0]
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  let step = 7
  while (gcd(step, n) !== 1) step += 1
  return Array.from({ length: n }, (_, i) => (i * step) % n)
}

const SORTED = Object.keys(modules).sort(naturalSort).map((k) => modules[k])
const CERTS = spreadOrder(SORTED.length).map((i) => SORTED[i])
const ROW_1 = CERTS.filter((_, i) => i % 3 === 0)
const ROW_2 = CERTS.filter((_, i) => i % 3 === 1)
const ROW_3 = CERTS.filter((_, i) => i % 3 === 2)

const TILE = 'w-[180px] h-[120px] sm:w-[300px] sm:h-[190px]'

export default function CertificateSection() {
  const [selected, setSelected] = useState<number | null>(null)

  const handleSelect = (src: string) => {
    const idx = CERTS.indexOf(src)
    if (idx !== -1) setSelected(idx)
  }

  return (
    <section
      id="certificates"
      className="px-5 sm:px-8 md:px-10 pt-12 sm:pt-24 md:pt-28 pb-12 sm:pb-24"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={40} duration={0.7}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-8 sm:mb-16"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
        >
          Certificates
        </h2>
      </FadeIn>

      {CERTS.length === 0 ? (
        <p className="text-center text-[#D7E2EA]/60 font-light uppercase tracking-widest text-sm">
          Drop certificate images into src/Pic_cer to display them here
        </p>
      ) : (
        <div className="flex flex-col gap-2 sm:gap-3 -mx-5 sm:-mx-8 md:-mx-10">
          <MarqueeRow images={ROW_1} direction="right" duration="90s" tileClass={TILE} onSelect={handleSelect} />
          <MarqueeRow images={ROW_2} direction="left" duration="110s" tileClass={TILE} onSelect={handleSelect} />
          <MarqueeRow images={ROW_3} direction="right" duration="100s" tileClass={TILE} onSelect={handleSelect} />
        </div>
      )}

      <Lightbox
        images={CERTS}
        index={selected}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </section>
  )
}

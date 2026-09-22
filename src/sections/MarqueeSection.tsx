import MarqueeRow, { type MarqueeImage } from '../components/MarqueeRow'
import { srcFromSrcset } from '../lib/srcset'

// Each import is resized and converted to WebP at build time; the source
// JPEGs/PNGs (1.14 MB total) are never shipped to the browser.
import row1a from '../Pic_main/326777.jpg?w=400;800;1200&format=webp&as=srcset'
import row1b from '../Pic_main/port1.jpg?w=400;800;1200&format=webp&as=srcset'
import row1c from '../Pic_main/port0.jpg?w=400;800;1200&format=webp&as=srcset'
import row1d from '../Pic_main/383129.jpg?w=400;800;1200&format=webp&as=srcset'
import row2a from '../Pic_main/379903.jpg?w=400;800;1200&format=webp&as=srcset'
import row2b from '../Pic_main/port0-2.jpg?w=400;800;1200&format=webp&as=srcset'
import row2c from '../Pic_main/port4.jpg?w=400;800;1200&format=webp&as=srcset'

const toImage = (srcset: string): MarqueeImage => ({ srcset, src: srcFromSrcset(srcset) })

const ROW_1 = [row1a, row1b, row1c, row1d].map(toImage)
const ROW_2 = [row2a, row2b, row2c].map(toImage)

export default function MarqueeSection() {
  return (
    <section
      className="pt-10 sm:pt-32 md:pt-40 pb-6 sm:pb-10"
      style={{ background: '#0C0C0C' }}
      aria-hidden
    >
      <div className="flex flex-col gap-2 sm:gap-3">
        <MarqueeRow images={ROW_1} direction="right" duration="55s" />
        <MarqueeRow images={ROW_2} direction="left" duration="65s" />
      </div>
    </section>
  )
}


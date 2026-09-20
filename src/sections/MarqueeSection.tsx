import MarqueeRow from '../components/MarqueeRow'
import img326777 from '../Pic_main/326777.jpg'
import imgPort1 from '../Pic_main/port1.jpg'
import imgPort0 from '../Pic_main/port0.jpg'
import img383129 from '../Pic_main/383129.jpg'
import img379903 from '../Pic_main/379903.jpg'
import imgPort02 from '../Pic_main/port0-2.jpg'
import imgPort4 from '../Pic_main/port4.jpg'

const ROW_1 = [img326777, imgPort1, imgPort0, img383129]
const ROW_2 = [img379903, imgPort02, imgPort4]

export default function MarqueeSection() {
  return (
    <section
      className="pt-24 sm:pt-32 md:pt-40 pb-10"
      style={{ background: '#0C0C0C' }}
    >
      <div className="flex flex-col gap-3">
        <MarqueeRow images={ROW_1} direction="right" duration="55s" />
        <MarqueeRow images={ROW_2} direction="left" duration="65s" />
      </div>
    </section>
  )
}

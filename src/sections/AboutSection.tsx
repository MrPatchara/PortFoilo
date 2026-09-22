import FadeIn from '../components/FadeIn'
import AnimatedText from '../components/AnimatedText'
import ContactButton from '../components/ContactButton'
import CvButton from '../components/CvButton'
import SectionHeading from '../components/SectionHeading'
import { srcFromSrcset } from '../lib/srcset'

// Decorative artwork: resized and converted to WebP at build time. These four
// files were 940 KB of PNG for elements that render at 72-220px wide.
import moonSrcset from '../assets/decor/moon_icon.11395d36.png?w=150;320;450&format=webp&as=srcset'
import p59Srcset from '../assets/decor/p59_1.4659672e.png?w=150;320;450&format=webp&as=srcset'
import legoSrcset from '../assets/decor/lego_icon-1.703bb594.png?w=150;320;450&format=webp&as=srcset'
import groupSrcset from '../assets/decor/Group_134-1.2e04f3ce.png?w=150;320;450&format=webp&as=srcset'

type Decor = {
  srcset: string
  natural: [number, number]
  className: string
  sizes: string
  position: string
  delay: number
  x: number
}

const DECOR: Decor[] = [
  {
    srcset: moonSrcset,
    natural: [714, 714],
    className: 'w-[72px] sm:w-[160px] md:w-[210px]',
    sizes: '(min-width: 768px) 210px, (min-width: 640px) 160px, 72px',
    position: 'absolute top-[2%] left-[1%] sm:left-[2%] md:left-[4%]',
    delay: 0.1,
    x: -80,
  },
  {
    srcset: p59Srcset,
    natural: [420, 446],
    className: 'w-[64px] sm:w-[140px] md:w-[180px]',
    sizes: '(min-width: 768px) 180px, (min-width: 640px) 140px, 64px',
    position: 'absolute bottom-[4%] left-[3%] sm:left-[6%] md:left-[10%]',
    delay: 0.25,
    x: -80,
  },
  {
    srcset: legoSrcset,
    natural: [708, 862],
    className: 'w-[72px] sm:w-[160px] md:w-[210px]',
    sizes: '(min-width: 768px) 210px, (min-width: 640px) 160px, 72px',
    position: 'absolute top-[2%] right-[1%] sm:right-[2%] md:right-[4%]',
    delay: 0.15,
    x: 80,
  },
  {
    srcset: groupSrcset,
    natural: [688, 676],
    className: 'w-[80px] sm:w-[170px] md:w-[220px]',
    sizes: '(min-width: 768px) 220px, (min-width: 640px) 170px, 80px',
    position: 'absolute bottom-[4%] right-[3%] sm:right-[6%] md:right-[10%]',
    delay: 0.3,
    x: 80,
  },
]

const ABOUT_TEXT =
  'Computer Engineering and Sports Science graduate with hands-on experience in software development, technical support, and system integration. Focused on solving technical challenges through practical software and engineering solutions.'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-12 sm:py-20 gap-6 sm:gap-14 md:gap-16"
    >
      {/* Decorative images */}
      {DECOR.map((item) => (
        <FadeIn
          key={item.position}
          delay={item.delay}
          x={item.x}
          y={0}
          duration={0.9}
          className={item.position}
        >
          <img
            src={srcFromSrcset(item.srcset)}
            srcSet={item.srcset}
            sizes={item.sizes}
            width={item.natural[0]}
            height={item.natural[1]}
            alt=""
            loading="lazy"
            decoding="async"
            className={`${item.className} h-auto`}
          />
        </FadeIn>
      ))}
      {/* Heading */}
      <SectionHeading index="01" eyebrow="Who I am" title="About me" />

      {/* Text + button */}
      <div
        className="flex flex-col items-center gap-8 sm:gap-20 md:gap-24 relative z-10"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
      >
        <AnimatedText
          text={ABOUT_TEXT}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
        />
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <ContactButton />
          <CvButton />
        </div>
      </div>
    </section>
  )
}


import { Sparkles, Boxes } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import ContactButton from '../components/ContactButton'
import CvButton from '../components/CvButton'

// The portrait is the LCP element. It used to ship as a 445 KB PNG; these
// imports emit AVIF + WebP at three widths plus a PNG fallback, so the browser
// picks the smallest format it understands.
import portraitAvif from '../pic1-cutout.png?w=400;640;900&format=avif&as=srcset'
import portraitWebp from '../pic1-cutout.png?w=400;640;900&format=webp&as=srcset'
import { srcFromSrcset } from '../lib/srcset'

const NAV_LINKS = ['About', 'Education', 'Projects', 'Contact']

const PORTRAIT_SIZES =
  '(min-width: 1024px) 600px, (min-width: 768px) 500px, (min-width: 640px) 420px, 76vw'

const PORTRAIT_CLASS =
  'relative w-full h-auto object-contain saturate-[1.08] contrast-[1.03] brightness-[1.02] [mask-image:linear-gradient(to_bottom,#000_78%,transparent_99%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_78%,transparent_99%)] [filter:drop-shadow(0_25px_45px_rgba(0,0,0,0.55))_drop-shadow(0_0_55px_rgba(182,0,168,0.20))]'

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex flex-col min-h-svh pt-[var(--header-h)] md:pt-0"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar — desktop only. On phones the sticky SiteHeader supplies the
          navigation, which frees up the ~272px of edge-to-edge space the four
          uppercase labels used to fight over at 320px wide. */}
      <FadeIn delay={0} y={-20} duration={0.7} className="hidden md:block">
        <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {link}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Heading */}
      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40} duration={0.7}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none w-full text-[13vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[16.5vw] mt-6 sm:mt-4 md:-mt-5 text-center">
            <span className="block whitespace-nowrap">Patchara</span>
            <span className="block whitespace-nowrap">Al-umaree</span>
          </h1>
        </FadeIn>
      </div>

      {/* Scroll cue (desktop) */}
      <FadeIn delay={0.9} y={0} duration={0.7} className="hidden md:flex justify-center mt-2">
        <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-[#D7E2EA]/15">
          <span className="absolute inset-x-0 top-0 h-4 bg-[#E9A9FF] animate-scroll-cue" />
        </span>
      </FadeIn>

      <div className="flex-1" />

      {/* Portrait — in normal flow on phones so it can never cover the heading
          or the badges, and pinned to the bottom centre from `sm` up. */}
      <div className="relative z-10 mx-auto w-[76vw] max-w-[320px] sm:absolute sm:bottom-0 sm:left-1/2 sm:w-[420px] sm:max-w-none sm:-translate-x-1/2 md:w-[500px] lg:w-[600px]">
        <FadeIn delay={0.6} y={30} duration={0.7}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <div className="relative w-full">
              {/* Ambient halo behind the figure */}
              <div
                aria-hidden
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[130%] aspect-square bg-[radial-gradient(ellipse_60%_55%_at_50%_40%,rgba(182,0,168,0.30),transparent_70%)] pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute bottom-[-4%] left-1/2 -translate-x-1/2 w-[90%] h-[12%] rounded-[100%] bg-black/70 blur-[50px] pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[70%] h-[10%] rounded-[100%] bg-[#B600A8]/20 blur-[60px] pointer-events-none"
              />

              {/* Transparent cutout, bottom melts into the page */}
              <picture>
                <source srcSet={portraitAvif} sizes={PORTRAIT_SIZES} type="image/avif" />
                <source srcSet={portraitWebp} sizes={PORTRAIT_SIZES} type="image/webp" />
                <img
                  src={srcFromSrcset(portraitWebp)}
                  sizes={PORTRAIT_SIZES}
                  width={1024}
                  height={871}
                  alt="Patchara Al-umaree, Computer Engineer and Sports Scientist"
                  fetchPriority="high"
                  decoding="async"
                  className={PORTRAIT_CLASS}
                />
              </picture>

              {/* Floating badges — CSS keyframes instead of framer-motion */}
              <div className="animate-float absolute -top-3 sm:top-24 -right-2 sm:-right-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-white shadow-lg">
                <Sparkles size={14} className="text-[#E9A9FF]" />
                Engineer &amp; Scientist
              </div>
              <div className="animate-float-alt absolute bottom-6 sm:bottom-24 -left-2 sm:-left-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-white shadow-lg">
                <Boxes size={14} className="text-[#FFC46B]" />
                5+ Years Exp
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom bar — stacks on phones; the copy and the CTA used to be
          squeezed into the same 272px row at 320px wide. */}
      <div className="relative z-20 flex flex-col items-start gap-5 px-6 pb-7 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-full sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            Dual degrees in Computer Engineering and Sports Science.
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} duration={0.7}>
          <div className="flex flex-wrap items-center gap-3">
            <ContactButton />
            <CvButton />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

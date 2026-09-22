import { Github, Sparkles, Boxes } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import ContactButton from '../components/ContactButton'
import CvButton from '../components/CvButton'
import { SITE } from '../data/site'

// The portrait is the LCP element. It used to ship as a 445 KB PNG; these
// imports emit AVIF + WebP at three widths plus a PNG fallback, so the browser
// picks the smallest format it understands.
import portraitAvif from '../pic1-cutout.png?w=400;640;900&format=avif&as=srcset'
import portraitWebp from '../pic1-cutout.png?w=400;640;900&format=webp&as=srcset'
import { srcFromSrcset } from '../lib/srcset'

const NAV_LINKS = ['About', 'Education', 'Projects', 'Contact']

const PORTRAIT_SIZES = '(min-width: 1024px) 600px, (min-width: 768px) 500px, 82vw'

const PORTRAIT_CLASS =
  'relative w-full h-auto object-contain saturate-[1.08] contrast-[1.03] brightness-[1.02] [mask-image:linear-gradient(to_bottom,#000_78%,transparent_99%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_78%,transparent_99%)] [filter:drop-shadow(0_25px_45px_rgba(0,0,0,0.55))_drop-shadow(0_0_55px_rgba(182,0,168,0.20))]'

const BADGE_CLASS =
  'flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-medium uppercase tracking-widest text-white shadow-lg'

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex flex-col pt-[var(--header-h)] md:min-h-svh md:pt-0"
      style={{ overflowX: 'clip' }}
    >
      {/* Ambient glow — gives the flat ink background depth on phone + desktop. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[64svh] bg-[radial-gradient(60%_52%_at_50%_0%,rgba(118,33,176,0.16),transparent_72%)]"
      />

      {/* Desktop nav row — on phones the sticky SiteHeader navigates instead. */}
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

      {/* Identity block — the availability pill sits right above the name so
          the first glance answers "who / is he available". */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <FadeIn delay={0.05} y={16} duration={0.6}>
          <p className="mt-2 md:mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[10px] md:text-xs font-medium uppercase tracking-[0.22em] text-[#D7E2EA]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
            </span>
            Open to work
          </p>
        </FadeIn>

        <FadeIn delay={0.15} y={40} duration={0.7} className="overflow-hidden">
          <h1 className="font-black uppercase tracking-tight leading-none w-full text-[13.5vw] sm:text-[14vw] md:text-[15.5vw] lg:text-[16.5vw] mt-3 sm:mt-4 md:mt-4 text-center">
            <span className="hero-heading block whitespace-nowrap">Patchara</span>
            <span className="hero-heading--outline block whitespace-nowrap">Al-umaree</span>
          </h1>
        </FadeIn>
      </div>

      {/* Scroll cue (desktop only) */}
      <FadeIn delay={0.9} y={0} duration={0.7} className="hidden md:flex justify-center mt-2">
        <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-[#D7E2EA]/15">
          <span className="absolute inset-x-0 top-0 h-4 bg-[#E9A9FF] animate-scroll-cue" />
        </span>
      </FadeIn>

      {/* Portrait — hugs the name on phones (no dead gap); from `md` up it is
          pinned to the bottom centre of the full-height hero. */}
      <div className="relative z-10 mx-auto mt-5 w-[82vw] max-w-[360px] md:absolute md:bottom-0 md:left-1/2 md:mt-0 md:w-[500px] md:max-w-none md:-translate-x-1/2 lg:w-[600px]">
        <FadeIn delay={0.45} y={30} duration={0.7}>
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
              <div className={`animate-float absolute top-6 right-0 md:top-24 md:-right-6 ${BADGE_CLASS}`}>
                <Sparkles size={14} className="text-[#E9A9FF]" />
                Engineer &amp; Scientist
              </div>
              <div className={`animate-float-alt absolute bottom-10 left-0 md:bottom-24 md:-left-6 ${BADGE_CLASS}`}>
                <Boxes size={14} className="text-[#FFC46B]" />
                5+ Years Exp
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom bar — centred on phones, spread on desktop. `mt-auto` keeps it
          pinned to the bottom of the full-height hero from `md` up. */}
      <div className="relative z-20 mt-auto flex flex-col items-center gap-4 px-6 pb-8 pt-2 text-center md:flex-row md:items-end md:justify-between md:gap-4 md:px-10 md:pb-10 md:pt-0 md:text-left">
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-full md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            Dual degrees in Computer Engineering and Sports Science.
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} duration={0.7}>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
            <ContactButton />
            <CvButton />
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white transition-colors duration-200 hover:border-[#B600A8]/70 hover:bg-white/[0.16]"
            >
              <Github size={18} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

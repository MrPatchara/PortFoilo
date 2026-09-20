import { motion } from 'framer-motion'
import { Sparkles, Boxes } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import ContactButton from '../components/ContactButton'
import portraitImg from '../pic1-cutout.png'

const NAV_LINKS = ['About', 'Education', 'Projects', 'Contact']

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col min-h-svh"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20} duration={0.7}>
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

      <div className="flex-1" />

      {/* Portrait */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <FadeIn delay={0.6} y={30} duration={0.7}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <div className="relative w-[320px] sm:w-[400px] md:w-[500px] lg:w-[600px]">
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
              <img
                src={portraitImg}
                alt="Patchara Computer Engineer"
                className="relative w-full h-auto object-contain saturate-[1.08] contrast-[1.03] brightness-[1.02] [mask-image:linear-gradient(to_bottom,#000_78%,transparent_99%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_78%,transparent_99%)] [filter:drop-shadow(0_25px_45px_rgba(0,0,0,0.55))_drop-shadow(0_0_55px_rgba(182,0,168,0.20))]"
              />

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 sm:top-24 -right-2 sm:-right-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-white shadow-lg"
              >
                <Sparkles size={14} className="text-[#E9A9FF]" />
                Engineer & Scientist
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.6,
                }}
                className="absolute bottom-6 sm:bottom-24 -left-2 sm:-left-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-widest text-white shadow-lg"
              >
                <Boxes size={14} className="text-[#FFC46B]" />
                5+ Years Exp
              </motion.div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-20">
        <FadeIn delay={0.35} y={20} duration={0.7}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            Dual degrees in Computer Engineering and Sports Science.
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} duration={0.7}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

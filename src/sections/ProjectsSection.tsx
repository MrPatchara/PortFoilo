import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { srcFromSrcset } from '../lib/srcset'

// 25 files worth of award photos used to ship at full resolution (1.64 MB).
// These imports emit two resized WebP variants each at build time.
import p01a from '../Pic_proj/01/port0-6.jpg?w=480;960&format=webp&as=srcset'
import p01b from '../Pic_proj/01/port0-5.jpg?w=480;960&format=webp&as=srcset'
// Byte-identical to the copy in Pic_main (verified blob hash) — one file serves both rows.
import p01c from '../Pic_main/port0.jpg?w=480;960&format=webp&as=srcset'
import p02a from '../Pic_proj/02/326827_0.jpg?w=480;960&format=webp&as=srcset'
import p02b from '../Pic_proj/02/326828_0.jpg?w=480;960&format=webp&as=srcset'
import p02c from '../Pic_proj/02/326829_0.jpg?w=480;960&format=webp&as=srcset'
import p03a from '../Pic_proj/03/389763_0.jpg?w=480;960&format=webp&as=srcset'
import p03b from '../Pic_proj/03/cir11.jpg?w=480;960&format=webp&as=srcset'
import p03c from '../Pic_proj/03/408642_0.jpg?w=480;960&format=webp&as=srcset'

/** The narrow left column renders around 420px wide on desktop, ~40vw on phones. */
const COL1_SIZES = '(min-width: 768px) 420px, 40vw'
/** The wide right column renders around 640px wide on desktop, ~60vw on phones. */
const COL2_SIZES = '(min-width: 768px) 640px, 60vw'

interface Project {
  number: string
  name: string
  category: string
  col1Image1: string
  col1Image2: string
  col2Image: string
}

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'AI & IOT Innovation 2026',
    category: '🥇 First Place',
    col1Image1: p01a,
    col1Image2: p01b,
    col2Image: p01c,
  },
  {
    number: '02',
    name: 'Sport Science Innovation Contest 2026',
    category: '🏆 Honorable mention',
    col1Image1: p02a,
    col1Image2: p02b,
    col2Image: p02c,
  },
  {
    number: '03',
    name: 'Sport Science Innovation Contest 2025',
    category: '🥈 First Runner-up',
    col1Image1: p03a,
    col1Image2: p03b,
    col2Image: p03c,
  },
]

function ProjectCard({
  project,
  index,
  total,
  progress,
  isLast,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
  isLast: boolean
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <div
      className={
        isLast
          ? 'h-auto flex items-start justify-center md:static'
          : // 140vh per card meant 420vh of scrolling for three projects.
            'h-auto md:h-[110vh] flex items-start justify-center md:sticky md:top-4'
      }
    >
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full max-w-6xl rounded-[24px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-3 sm:p-6 md:p-6"
      >
        <div
          className="rounded-[20px] sm:rounded-[40px] md:rounded-[48px] p-3 sm:p-6 md:p-6"
          style={{ background: '#0C0C0C' }}
        >
          {/* Top row */}
          <div className="flex justify-between items-start gap-3 sm:gap-4 mb-3 sm:mb-6">
            <div className="flex items-start gap-4 sm:gap-8">
              <span className="font-black leading-none text-[#D7E2EA] text-[clamp(3rem,10vw,140px)] md:text-[clamp(2.5rem,10vh,120px)]">
                {project.number}
              </span>
              <div className="flex flex-col gap-1 sm:gap-2 pt-1 sm:pt-3">
                <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm font-light">
                  {project.category}
                </span>
                <h3
                  className="font-medium uppercase text-[#D7E2EA]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {project.name}
                </h3>
              </div>
            </div>
          </div>

          {/* Bottom image grid */}
          <div className="flex gap-2 sm:gap-4">
            <div className="w-[40%] flex flex-col gap-2 sm:gap-4">
              <img
                src={srcFromSrcset(project.col1Image1)}
                srcSet={project.col1Image1}
                sizes={COL1_SIZES}
                alt={`${project.name} preview 1`}
                loading="lazy"
                decoding="async"
                className="w-full object-cover rounded-[20px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(110px,16vw,230px)] md:h-[clamp(150px,22vh,210px)]"
              />
              <img
                src={srcFromSrcset(project.col1Image2)}
                srcSet={project.col1Image2}
                sizes={COL1_SIZES}
                alt={`${project.name} preview 2`}
                loading="lazy"
                decoding="async"
                className="w-full object-cover rounded-[20px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(130px,22vw,340px)] md:h-[clamp(180px,30vh,300px)]"
              />
            </div>
            <div className="w-[60%]">
              <img
                src={srcFromSrcset(project.col2Image)}
                srcSet={project.col2Image}
                sizes={COL2_SIZES}
                alt={`${project.name} preview 3`}
                loading="lazy"
                decoding="async"
                className="w-full object-cover rounded-[20px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(248px,38vw,586px)] md:h-[calc(clamp(150px,22vh,210px)+clamp(180px,30vh,300px)+16px)]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="projects"
      className="rounded-t-[28px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-6 sm:-mt-12 md:-mt-14 relative z-10 px-4 sm:px-8 md:px-10 pt-12 sm:pt-24 pb-10 sm:pb-16"
      style={{ background: '#0C0C0C' }}
    >
      <SectionHeading
        index="03"
        title="Projects"
        eyebrow="Award-winning work"
        className="mb-8 sm:mb-20"
      />

      <div ref={containerRef} className="relative flex flex-col gap-5 md:gap-0">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
            isLast={i === PROJECTS.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

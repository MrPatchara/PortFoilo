import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import LiveProjectButton from '../components/LiveProjectButton'
import p01a from '../Pic_proj/01/port0-6.jpg'
import p01b from '../Pic_proj/01/port0-5.jpg'
import p01c from '../Pic_proj/01/port0.jpg'
import p02a from '../Pic_proj/02/326827_0.jpg'
import p02b from '../Pic_proj/02/326828_0.jpg'
import p02c from '../Pic_proj/02/326829_0.jpg'
import p03a from '../Pic_proj/03/389763_0.jpg'
import p03b from '../Pic_proj/03/cir11.jpg'
import p03c from '../Pic_proj/03/408642_0.jpg'

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
          ? 'h-[85vh] md:h-auto flex items-start justify-center sticky top-24 md:static'
          : 'h-[85vh] md:h-[140vh] flex items-start justify-center sticky top-24 md:top-4'
      }
    >
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-6"
      >
        <div
          className="rounded-[32px] sm:rounded-[40px] md:rounded-[48px] p-4 sm:p-6 md:p-6"
          style={{ background: '#0C0C0C' }}
        >
          {/* Top row */}
          <div className="flex justify-between items-start gap-4 mb-4 sm:mb-6">
            <div className="flex items-start gap-4 sm:gap-8">
              <span
                className="font-black leading-none text-[#D7E2EA] text-[clamp(3rem,10vw,140px)] md:text-[clamp(2.5rem,10vh,120px)]"
              >
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
            <LiveProjectButton />
          </div>

          {/* Bottom image grid */}
          <div className="flex gap-3 sm:gap-4">
            <div className="w-[40%] flex flex-col gap-3 sm:gap-4">
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(130px,16vw,230px)] md:h-[clamp(150px,22vh,210px)]"
              />
              <img
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(160px,22vw,340px)] md:h-[clamp(180px,30vh,300px)]"
              />
            </div>
            <div className="w-[60%]">
              <img
                src={project.col2Image}
                alt={`${project.name} preview 3`}
                loading="lazy"
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] h-[clamp(306px,38vw,586px)] md:h-[calc(clamp(150px,22vh,210px)+clamp(180px,30vh,300px)+16px)]"
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
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 pb-14 sm:pb-16"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={40} duration={0.7}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={containerRef} className="relative">
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

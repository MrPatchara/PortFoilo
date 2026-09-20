import { GraduationCap, Briefcase } from 'lucide-react'
import FadeIn from '../components/FadeIn'

// TODO: replace mock data with real education & work history
const EDUCATION = [
  {
    period: '2023 — 2026',
    title: "B.Eng. Computer Engineering",
    org: 'RAMKHAMHAENG UNIVERSITY - GPA 3.64',
    detail:
      'Studied software development, hardware systems, embedded systems, IoT, networking, databases, and computer architecture. Gained hands-on experience in C/C++, Python, web development, microcontrollers, sensors, electronics, and system integration. Developed software and hardware projects involving data processing, automation, and device communication.',
  },
  {
    period: '2016 — 2020',
    title: 'B.Sc. Sports Science',
    org: 'SRINAKHARINWIROT UNIVERSITY - GPA 3.11',
    detail:
      'Studied exercise science, sports physiology, biomechanics, fitness assessment, and sports performance. Gained hands-on experience in physiological testing, human movement analysis, exercise testing, and sports data analysis.',
  }
]

const WORK = [
  {
    period: 'November 2025 — Present',
    title: 'Product Support Specialist',
    org: 'GRAND SPORT GROUP CO., LTD',
    detail:
      'Technical product support for advanced sports science, laboratory, and medical equipment.',
    points: [
      'Provided technical product support for advanced sports science, laboratory, and medical equipment, combining engineering knowledge with software-based solutions.',
      'Assisted clients with installation, system configuration, calibration, and validation of hardware and software components.',
      'Developed and customized software tools, scripts, or small programs (e.g., Python, data processing, device communication) to support testing, data analysis, automation, and troubleshooting.',
    ],
  },
  {
    period: 'August 2022 — October 2025',
    title: 'Technician & Product Specialist',
    org: 'VINA SPORTS INTERTRADE CO.,LTD',
    detail:
      'IT and product support, providing technical assistance and troubleshooting for office systems to ensure smooth and efficient operations.',
  },
  {
    period: 'June 2021 — October 2021',
    title: 'Teacher Assistant',
    org: 'CHULALONGKORN UNIVERSITY',
    detail:
      'Teacher assistant at the Faculty of Sports Science.',
  },
]

interface TimelineItem {
  period: string
  title: string
  org: string
  detail: string
  points?: string[]
}

function Column({
  icon,
  heading,
  items,
}: {
  icon: React.ReactNode
  heading: string
  items: TimelineItem[]
}) {
  return (
    <div className="rounded-[24px] sm:rounded-[36px] border border-[rgba(12,12,12,0.12)] bg-[#F6F6F6] p-6 sm:p-10 md:p-12">
      <div className="flex items-center gap-4 mb-6 sm:mb-10">
        <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white shrink-0 bg-[#0C0C0C]">
          {icon}
        </span>
        <h3
          className="font-black uppercase text-[#0C0C0C] tracking-tight leading-none"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)' }}
        >
          {heading}
        </h3>
      </div>

      <div className="flex flex-col">
        {items.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.1} y={24} duration={0.6}>
            <div className="relative pl-8 sm:pl-10 pb-8 sm:pb-12 last:pb-0">
              {/* timeline line + dot */}
              <span
                aria-hidden
                className="absolute left-[7px] top-2 bottom-0 w-px bg-[rgba(12,12,12,0.15)]"
                style={i === items.length - 1 ? { display: 'none' } : undefined}
              />
              <span
                aria-hidden
                className="absolute left-0 top-[7px] w-[15px] h-[15px] rounded-full border-[3px] border-[#0C0C0C] bg-[#B600A8]"
              />
              <span className="inline-block rounded-full bg-[#0C0C0C] text-white text-[11px] sm:text-xs font-medium uppercase tracking-widest px-3 py-1 sm:px-4 sm:py-1.5 mb-3">
                {item.period}
              </span>
              <h4
                className="font-medium text-[#0C0C0C] leading-snug"
                style={{ fontSize: 'clamp(1.05rem, 2vw, 1.5rem)' }}
              >
                {item.title}
              </h4>
              <p
                className="font-medium uppercase tracking-wider text-[#0C0C0C]/50 mt-1"
                style={{ fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)' }}
              >
                {item.org}
              </p>
              <p
                className="font-light text-[#0C0C0C]/70 leading-relaxed mt-2 max-w-md"
                style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)' }}
              >
                {item.detail}
              </p>
              {item.points && (
                <ul className="mt-3 max-w-md flex flex-col gap-2">
                  {item.points.map((point) => (
                    <li
                      key={point.slice(0, 24)}
                      className="relative pl-5 font-light text-[#0C0C0C]/70 leading-relaxed"
                      style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)' }}
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-[#B600A8]"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section
      id="education"
      className="px-4 sm:px-8 md:px-10 py-12 sm:py-24 md:py-32 rounded-t-[28px] sm:rounded-t-[50px] md:rounded-t-[60px]"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-6xl mx-auto grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-8">
        <Column
          icon={<GraduationCap size={26} strokeWidth={2} />}
          heading="Education"
          items={EDUCATION}
        />
        <Column
          icon={<Briefcase size={26} strokeWidth={2} />}
          heading="Work Experience"
          items={WORK}
        />
      </div>
    </section>
  )
}

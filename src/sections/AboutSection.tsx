import FadeIn from '../components/FadeIn'
import AnimatedText from '../components/AnimatedText'
import ContactButton from '../components/ContactButton'
import moonIcon from '../assets/decor/moon_icon.11395d36.png'
import decorP59 from '../assets/decor/p59_1.4659672e.png'
import legoIcon from '../assets/decor/lego_icon-1.703bb594.png'
import decorGroup from '../assets/decor/Group_134-1.2e04f3ce.png'

const ABOUT_TEXT =
  'Computer Engineering and Sports Science graduate with hands-on experience in software development, technical support, and system integration. Focused on solving technical challenges through practical software and engineering solutions.'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 gap-10 sm:gap-14 md:gap-16"
    >
      {/* Decorative images */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]"
      >
        <img
          src={moonIcon}
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
        />
      </FadeIn>
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]"
      >
        <img
          src={decorP59}
          alt=""
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto"
        />
      </FadeIn>
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]"
      >
        <img
          src={legoIcon}
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
        />
      </FadeIn>
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]"
      >
        <img
          src={decorGroup}
          alt=""
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto"
        />
      </FadeIn>

      {/* Heading */}
      <FadeIn delay={0} y={40} duration={0.7}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About me
        </h2>
      </FadeIn>

      {/* Text + button */}
      <div
        className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24 relative z-10"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
      >
        <AnimatedText
          text={ABOUT_TEXT}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
        />
        <ContactButton />
      </div>
    </section>
  )
}


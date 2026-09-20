import HeroSection from './sections/HeroSection'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import CertificateSection from './sections/CertificateSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'

export default function App() {
  return (
    <div
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
      className="min-h-screen w-full"
    >
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <CertificateSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}

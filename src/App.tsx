import { Suspense, lazy } from 'react'
import SiteHeader from './components/SiteHeader'
import BackToTop from './components/BackToTop'
import HeroSection from './sections/HeroSection'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'

// Everything below the second screen is a separate chunk, so the first paint
// only pays for the hero. ProjectsSection also owns the last framer-motion
// dependency in the app, which now stays off the critical path entirely.
// Their images are `loading="lazy"` inside those chunks, so deferring the
// modules also defers the image requests.
const EducationSection = lazy(() => import('./sections/EducationSection'))
const CertificateSection = lazy(() => import('./sections/CertificateSection'))
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'))
const ContactSection = lazy(() => import('./sections/ContactSection'))

export default function App() {
  return (
    <div
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
      className="min-h-screen w-full"
    >
      <SiteHeader />

      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />

        {/* One boundary per section so a slow chunk never blocks the others. */}
        <Suspense fallback={null}>
          <EducationSection />
        </Suspense>
        <Suspense fallback={null}>
          <CertificateSection />
        </Suspense>
        <Suspense fallback={null}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>
      </main>

      <BackToTop />
    </div>
  )
}


import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrollLock } from '../hooks/useScrollLock'
import { NAV_SECTIONS, SECTION_IDS, SITE } from '../data/site'

/**
 * Sticky navigation that fades in once the hero has been scrolled past.
 *
 * Previously the only navigation lived inside the hero, so after the first
 * screen there was no way back to another section without scrolling all the
 * way up. On phones the links were also crammed edge to edge (four uppercase
 * labels occupied ~267px of the ~272px available at 320px wide) — they are
 * now behind a full-screen menu with 44px+ targets.
 */
export default function SiteHeader() {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  useScrollLock(menuOpen)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setVisible(window.scrollY > window.innerHeight * 0.55)
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const query = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (query.matches) setMenuOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const shown = visible || menuOpen

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[transform,opacity,background-color] duration-300 ${
          shown ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
        } ${
          menuOpen
            ? 'border-transparent bg-[#0C0C0C]/95'
            : 'border-white/10 bg-[#0C0C0C]/80 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 md:px-10">
          <a
            href="#top"
            className="truncate text-xs font-semibold uppercase tracking-widest text-[#D7E2EA] sm:text-sm"
          >
            {SITE.name}
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
            {NAV_SECTIONS.map((section) => {
              const isActive = activeSection === section.id
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-xs font-medium uppercase tracking-widest transition-colors lg:text-sm ${
                    isActive ? 'text-white' : 'text-[#D7E2EA]/55 hover:text-[#D7E2EA]'
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-inset ring-white/15"
                    />
                  )}
                  <span className="relative">{section.label}</span>
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="gradient-cta hidden items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-white md:inline-flex lg:text-xs"
            >
              Hire me
              <ArrowUpRight size={14} />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#D7E2EA] transition-colors hover:bg-white/10 md:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — full-screen panel, one 44px+ target per section. */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="mobile-menu-panel fixed inset-0 z-40 bg-[#0C0C0C]/95 backdrop-blur-xl md:hidden"
      >
        <nav
          aria-label="Sections"
          className="flex h-full flex-col justify-center gap-0 px-6 pt-[var(--header-h)] pb-10"
        >
          {NAV_SECTIONS.map((section, index) => {
            const isActive = activeSection === section.id
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex min-h-[56px] items-center justify-between border-b border-white/10 py-4 text-3xl font-black uppercase tracking-tight transition-colors ${
                  isActive ? 'text-white' : 'text-[#D7E2EA]/65'
                }`}
              >
                {section.label}
                <span className="text-xs font-medium tracking-widest text-[#D7E2EA]/35">
                  {`0${index + 1}`}
                </span>
              </a>
            )
          })}

          <a
            href={`mailto:${SITE.email}`}
            onClick={() => setMenuOpen(false)}
            className="gradient-cta mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium uppercase tracking-widest text-white"
          >
            Email me
          </a>
        </nav>
      </div>
    </>
  )
}

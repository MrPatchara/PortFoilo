/** Single source of truth for profile data, links and section ordering. */
export const SITE = {
  name: 'Patchara Al-umaree',
  role: 'Computer Engineer × Sports Scientist',
  tagline: 'Dual degrees in Computer Engineering and Sports Science.',
  email: 'patcharaalumaree@gmail.com',
  phone: '+66960614238',
  phoneDisplay: '+66 96 061 4238',
  github: 'https://github.com/MrPatchara',
  githubHandle: '@MrPatchara',
  /** TODO: add your LinkedIn URL to show the LinkedIn card in the contact section. */
  linkedin: '',
  /**
   * Drop your CV in `public/` (e.g. `public/patchara-al-umaree-resume.pdf`)
   * and set this to `/patchara-al-umaree-resume.pdf` to enable the
   * "Download CV" button. Left empty the button is not rendered at all, so
   * the site never shows a broken download.
   */
  resumeUrl: '',
} as const

export interface NavSection {
  id: string
  label: string
}

export const NAV_SECTIONS: NavSection[] = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
]

export const SECTION_IDS: string[] = NAV_SECTIONS.map((section) => section.id)

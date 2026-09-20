import { useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Loader2, CheckCircle2, AlertCircle, ArrowUpRight, Github, Phone } from 'lucide-react'
import FadeIn from '../components/FadeIn'

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm sm:text-base text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 outline-none transition focus:border-[#B600A8] focus:ring-2 focus:ring-[#B600A8]/30'

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setErrorMsg('')

    const payload = Object.fromEntries(new FormData(formRef.current!).entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok || !json?.success) {
        throw new Error(json?.error || 'Failed to send message. Please try again.')
      }
      setStatus('success')
      formRef.current?.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <section
      id="contact"
      className="px-4 sm:px-8 md:px-10 pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-10"
      style={{ background: '#0C0C0C' }}
    >
      <div className="max-w-6xl mx-auto grid gap-8 md:gap-10 lg:gap-16 items-start">
        {/* Left: heading + direct email */}
        <div>
          <FadeIn delay={0} y={40} duration={0.7}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-widest text-[#D7E2EA]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to opportunities
            </span>
            <h2
              className="hero-heading font-black uppercase leading-[0.95] tracking-tight mt-6"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 110px)' }}
            >
              Let&apos;s talk
            </h2>
            <p
              className="text-[#D7E2EA]/70 font-light leading-relaxed mt-6 max-w-md"
              style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)' }}
            >
              Have a project in mind, a role to discuss, or just want to say hi?
              Fill in the form and I&apos;ll get back to you soon.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} y={24} duration={0.7}>
            <div className="mt-8 flex flex-col gap-3 sm:gap-4 max-w-md">
            <a
              href="mailto:patcharaalumaree@gmail.com"
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 hover:border-[#B600A8]/60 hover:bg-white/[0.07] transition-colors"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#B600A8] to-[#BE4C00] text-white shrink-0">
                <Mail size={20} />
              </span>
              <span className="flex flex-col min-w-0">
                <span className="text-[11px] uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                  Email me directly
                </span>
                <span className="text-sm sm:text-base text-white font-medium break-all">
                  patcharaalumaree@gmail.com
                </span>
              </span>
              <ArrowUpRight
                size={20}
                className="text-[#D7E2EA]/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto shrink-0"
              />
            </a>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <a
                href="https://github.com/MrPatchara"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 hover:border-[#B600A8]/60 hover:bg-white/[0.07] transition-colors"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#0C0C0C] border border-white/15 text-white shrink-0">
                  <Github size={20} />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className="text-[11px] uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                    GitHub
                  </span>
                  <span className="text-sm text-white font-medium truncate">
                    @MrPatchara
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-[#D7E2EA]/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto shrink-0"
                />
              </a>

              <a
                href="tel:+66960614238"
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 hover:border-[#B600A8]/60 hover:bg-white/[0.07] transition-colors"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#7621B0] to-[#B600A8] text-white shrink-0">
                  <Phone size={20} />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className="text-[11px] uppercase tracking-widest text-[#D7E2EA]/50 font-medium">
                    Phone
                  </span>
                  <span className="text-sm text-white font-medium">
                    +66 96 061 4238
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-[#D7E2EA]/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto shrink-0"
                />
              </a>
            </div>
            </div>
          </FadeIn>
        </div>

        {/* Right: form card */}
        <FadeIn delay={0.1} y={40} duration={0.7}>
          <div className="rounded-[24px] sm:rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur p-5 sm:p-8">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10"
              >
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-400/15 text-emerald-400 mb-5">
                  <CheckCircle2 size={36} />
                </span>
                <h3 className="text-white font-medium text-xl sm:text-2xl uppercase tracking-wide">
                  Message sent!
                </h3>
                <p className="text-[#D7E2EA]/60 font-light mt-2 max-w-xs">
                  Thanks for reaching out. I&apos;ll reply as soon as possible.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA] font-medium uppercase tracking-widest text-xs sm:text-sm px-8 py-3 hover:bg-[#D7E2EA]/10 transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-5">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] sm:text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                      Name
                    </span>
                    <input name="name" type="text" placeholder="Your name" autoComplete="name" className={inputClass} />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] sm:text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                      Email *
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={inputClass}
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-[11px] sm:text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                    Subject
                  </span>
                  <input name="subject" type="text" placeholder="What's this about?" className={inputClass} />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[11px] sm:text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                    Message *
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`${inputClass} resize-y min-h-[120px]`}
                  />
                </label>

                {/* Honeypot: leave empty */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute opacity-0 h-0 w-0 pointer-events-none"
                />

                {status === 'error' && (
                  <p className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-full text-white font-medium uppercase tracking-widest text-sm sm:text-base px-8 py-3.5 sm:py-4 disabled:opacity-60 disabled:cursor-wait"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow:
                      '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                    outline: '2px solid white',
                    outlineOffset: '-3px',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-10 sm:mt-20 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
        <p className="text-[#D7E2EA]/40 font-light text-xs sm:text-sm uppercase tracking-widest">
          © {new Date().getFullYear()} Patchara Al-umaree
        </p>
        <p className="text-[#D7E2EA]/40 font-light text-xs sm:text-sm uppercase tracking-widest">
          Engineering × Sports Science
        </p>
      </footer>
    </section>
  )
}

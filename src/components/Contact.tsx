import { ArrowUp, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { P } from '@/data/profile'

const icon = 'flex h-10 w-10 items-center justify-center rounded-md text-white/60 transition-colors hover:text-white'

export default function Contact() {
  return (
    <>
      <section id="contact" className="scroll-mt-6 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">Let&apos;s work together.</h2>
        <p className="mx-auto mb-8 max-w-xl text-white/60">
          I&apos;m always interested in new opportunities and exciting projects. Whether you have a
          project in mind or just want to chat about tech, I&apos;d love to hear from you.
        </p>
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <a href={`mailto:${P.email}`}><Mail className="h-4 w-4" />Get in touch</a>
          </Button>
          <Button asChild variant="outline">
            {/* put your file at public/resume.pdf */}
            <a href={`${import.meta.env.BASE_URL}resume.pdf`} download><FileText className="h-4 w-4" />Download Resume</a>
          </Button>
        </div>
        <div className="mb-8 flex justify-center gap-2">
          <a data-target className={icon} href={P.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="h-5 w-5" /></a>
          <a data-target className={icon} href={P.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
          <a data-target className={icon} href={`mailto:${P.email}`} aria-label="Email"><Mail className="h-5 w-5" /></a>
        </div>
        <p className="text-sm text-white/50">Open to AI/ML engineering roles, consulting, and collaboration on ambitious AI projects</p>
      </section>

      <footer className="flex items-center justify-between border-t border-white/10 pt-8 text-sm text-white/50">
        <span>{P.name} · {new Date().getFullYear()}</span>
        <button
          data-target
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 px-3 py-2 transition-colors hover:text-white"
        >
          Elevate to the top <ArrowUp className="h-4 w-4" />
        </button>
      </footer>
    </>
  )
}
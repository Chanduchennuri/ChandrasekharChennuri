import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import Background3D from '@/components/Background3D'
import Cursor from '@/components/Cursor'
import MathLink from '@/components/MathLink'
import ProfileTabs from '@/components/ProfileTabs'
import SkillPhysics from '@/components/SkillPhysics'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { P, jobs, projects, skills } from '@/data/profile'
import TechnicalSkills from '@/components/TechnicalSkills'
import Contact from '@/components/Contact'

const Title = ({ children }: { children: React.ReactNode }) => <h2 className="mb-6 font-mono text-xs uppercase tracking-[.2em] text-white/40">{children}</h2>
const fade = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } }

export default function App() {
  return (
    <>
      <div className="bg-grid" /><div className="top-light" /><div className="beam" />
      <Background3D /><Cursor />
      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-10">
        <header className="mb-14 flex items-center justify-between">
          <span className="font-mono text-sm font-bold tracking-tight">λ Csr.io</span>
          <nav className="flex">
            <MathLink href="#about" glyph="∫">About</MathLink>
            <MathLink href="#experience" glyph="Σ">Experience</MathLink>
            <MathLink href="#projects" glyph="∇">Projects</MathLink>
          </nav>
        </header>

        <motion.section {...fade} className="mb-16 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <img src={`${import.meta.env.BASE_URL}avatar.jpg`} alt={P.name} className="h-32 w-32 rounded-full border-2 border-white/20 object-cover shadow-[0_0_40px_rgba(255,255,255,.08)]" />
          <div>
            <p className="mb-2 text-sm text-white/40">hi there 👋, I'm</p>
            <h1 className="mb-3 text-4xl font-bold tracking-tighter sm:text-5xl">{P.name}</h1>
            <p className="mb-2 max-w-xl text-white/60">{P.tagline}</p>
            <p className="mb-4 font-mono text-xs text-[hsl(var(--accent))]">f(x) = ∫ ideas dt  →  systems that ship</p>
            <div className="flex flex-wrap items-center gap-2">
              <Button asChild><a href={`mailto:${P.email}`}><Mail className="h-4 w-4" />Contact</a></Button>
              <MathLink href={P.github} glyph="⟨/⟩" external>GitHub</MathLink>
              <MathLink href={P.linkedin} glyph="in" external>LinkedIn</MathLink>
            </div>
          </div>
        </motion.section>

        <motion.section {...fade} id="about" className="mb-20 scroll-mt-6"><Title>About · profiles</Title><ProfileTabs /></motion.section>

        <section id="experience" className="mb-20 scroll-mt-6">
          <Title>Experience</Title>
          <div className="ml-1 border-l border-white/15">
            {jobs.map(j => (
              <motion.div key={j.role} {...fade} className="relative pb-9 pl-6">
                <span className="absolute -left-[4px] top-2 h-[7px] w-[7px] rounded-full bg-white shadow-[0_0_10px_#fff]" />
                <div className="flex flex-wrap justify-between gap-2"><h3 className="text-lg font-medium">{j.role}</h3><span className="text-sm text-white/40">{j.when}</span></div>
                <p className="mb-3 text-sm text-white/50">{j.org}</p>
                <ul className="mb-3 space-y-1.5 text-sm text-white/60">{j.pts.map(p => <li key={p}>· {p}</li>)}</ul>
                <div className="flex flex-wrap gap-1.5">{j.tags.map(t => <Badge key={t}>{t}</Badge>)}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-6">
          <Title>Projects</Title>
          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            {projects.map(p => (
              <motion.a key={p.n} {...fade} data-target href={P.github} target="_blank" rel="noreferrer">
                <Card className="h-full p-5"><h3 className="mb-2 font-medium">{p.n} ↗</h3><p className="mb-3 text-sm text-white/50">{p.d}</p><div className="flex flex-wrap gap-1.5">{p.t.map(t => <Badge key={t}>{t}</Badge>)}</div></Card>
              </motion.a>
            ))}
          </div>
          <Title>Toolkit · drag me</Title>
          <SkillPhysics skills={skills} />
        </section>
        <br /><br />
        <TechnicalSkills />
        <Contact />
      </main>
    </>
  )
}

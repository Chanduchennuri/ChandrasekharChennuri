import { motion } from 'framer-motion'
import { skillGroups } from '@/data/profile'

export default function TechnicalSkills() {
  return (
    <section id="skills" className="mb-24 scroll-mt-6">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-[.2em] text-white/40">Technical skills</h2>
      <dl className="space-y-3">
        {skillGroups.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.03 }}
            className="grid gap-1 text-sm sm:grid-cols-[150px_1fr] sm:gap-6"
          >
            <dt className="font-medium text-white">{g.label}:</dt>
            <dd className="space-y-1 text-white/60">
              {g.label === 'Certifications' || g.label === 'Achievements'
                ? g.items.map((x) => <div key={x}>{x}</div>)
                : g.items.join(', ')}
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  )
}
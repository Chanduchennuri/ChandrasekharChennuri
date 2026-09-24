import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
/** Link with a spring-driven magnetic pull and a sine-wave underline drawn on hover. */
export default function MathLink({ href, glyph, children, external }: { href: string; glyph: string; children: React.ReactNode; external?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [hover, setHover] = useState(false)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 }), y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const wave = 'M0 6 ' + Array.from({ length: 40 }, (_, i) => `L${i * 3 + 3} ${6 + 3.5 * Math.sin((i + 1) * 0.55)}`).join(' ')
  return (
    <motion.a ref={ref} data-target href={href} style={{ x, y }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.25); y.set((e.clientY - r.top - r.height / 2) * 0.25); setHover(true) }}
      onMouseLeave={() => { x.set(0); y.set(0); setHover(false) }}
      className="relative flex items-baseline gap-1.5 px-3 py-2 text-sm text-white/60 transition-colors hover:text-white">
      <span className="font-mono text-xs text-[hsl(var(--accent))]">{glyph}</span>{children}
      <svg className="absolute bottom-0 left-3 right-3 h-3 w-[calc(100%-1.5rem)]" viewBox="0 0 120 12" preserveAspectRatio="none">
        <motion.path d={wave} fill="none" stroke="hsl(var(--accent))" strokeWidth="1.2" initial={{ pathLength: 0 }} animate={{ pathLength: hover ? 1 : 0 }} transition={{ duration: 0.5 }} />
      </svg>
    </motion.a>
  )
}

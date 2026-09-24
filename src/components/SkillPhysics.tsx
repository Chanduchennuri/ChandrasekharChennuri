import { useEffect, useRef } from 'react'
import Matter from 'matter-js'
/** Rigid-body playground (Matter.js): skills fall under gravity, collide, and can be dragged. */
export default function SkillPhysics({ skills }: { skills: string[] }) {
  const wrap = useRef<HTMLDivElement>(null), cv = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = cv.current!, w = wrap.current!.clientWidth, h = 300
    c.width = w; c.height = h
    const ctx = c.getContext('2d')!; ctx.font = '500 13px ui-sans-serif,system-ui'
    const { Engine, Bodies, Composite, Mouse, MouseConstraint } = Matter
    const engine = Engine.create({ gravity: { x: 0, y: 0.7 } })
    const wall = (x: number, y: number, ww: number, hh: number) => Bodies.rectangle(x, y, ww, hh, { isStatic: true })
    const items = skills.map((s, i) => Bodies.rectangle(30 + Math.random() * (w - 60), -30 - i * 38, ctx.measureText(s).width + 28, 30,
      { chamfer: { radius: 15 }, restitution: 0.45, friction: 0.15, label: s }))
    const mouse = Mouse.create(c)
    const m = mouse as unknown as { mousewheel: EventListener }
    for (const ev of ['wheel', 'mousewheel', 'DOMMouseScroll']) c.removeEventListener(ev, m.mousewheel) // keep page scrollable
    const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } })
    Composite.add(engine.world, [wall(w / 2, h + 25, w * 2, 50), wall(-25, 0, 50, h * 6), wall(w + 25, 0, 50, h * 6), ...items, mc])
    let raf = 0
    const loop = () => {
      Engine.update(engine, 1000 / 60); ctx.clearRect(0, 0, w, h)
      for (const b of items) {
        const bw = b.bounds.max.x - b.bounds.min.x
        ctx.save(); ctx.translate(b.position.x, b.position.y); ctx.rotate(b.angle)
        ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.fillStyle = 'rgba(255,255,255,.05)'
        ctx.beginPath(); ctx.roundRect(-bw / 2, -15, bw, 30, 15); ctx.fill(); ctx.stroke()
        ctx.fillStyle = '#e4e4e7'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(b.label, 0, 1); ctx.restore()
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); Composite.clear(engine.world, false); Engine.clear(engine) }
  }, [skills])
  return <div ref={wrap} data-target className="overflow-hidden rounded-xl border border-white/10 bg-card/40"><canvas ref={cv} className="block" aria-label="Draggable skill tags" /></div>
}

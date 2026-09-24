import { useEffect, useRef } from 'react'
/** Magnetic reticle: rotates freely, locks onto any [data-target] element and resizes to it. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia('(hover: none)').matches) return
    const el = ref.current!
    let mx = -100, my = -100, cx = -100, cy = -100, raf = 0
    const mv = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    addEventListener('mousemove', mv)
    const loop = () => {
      let hit: DOMRect | null = null
      for (const n of Array.from(document.querySelectorAll<HTMLElement>('[data-target]'))) {
        const r = n.getBoundingClientRect()
        if (mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom) hit = r
      }
      const tx = hit ? hit.left + hit.width / 2 : mx, ty = hit ? hit.top + hit.height / 2 : my
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2
      el.style.width = (hit ? hit.width : 34) + 'px'; el.style.height = (hit ? hit.height : 34) + 'px'
      el.classList.toggle('lock', !!hit)
      el.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { removeEventListener('mousemove', mv); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div id="cursor" ref={ref} style={{ transform: 'translate3d(-100px,-100px,0)' }}>
      <div className="spin"><i className="a" /><i className="b" /><i className="c" /><i className="d" />
        <b className="t" /><b className="r" /><b className="m" /><b className="l" /></div>
      <div className="dot" />
    </div>
  )
}

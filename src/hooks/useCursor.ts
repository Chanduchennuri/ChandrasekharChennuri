import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const cursor = cursorRef.current

    if (!cursor) return

    let mouseX = -100
    let mouseY = -100

    let currentX = -100
    let currentY = -100

    let animationFrame = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const update = () => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-target]'
        )
      )

      let hit: DOMRect | null = null

      for (const element of targets) {
        const rect = element.getBoundingClientRect()

        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          hit = rect
          break
        }
      }

      const targetX = hit
        ? hit.left + hit.width / 2
        : mouseX

      const targetY = hit
        ? hit.top + hit.height / 2
        : mouseY

      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18

      const width = hit ? hit.width + 12 : 34
      const height = hit ? hit.height + 12 : 34

      cursor.style.width = `${width}px`
      cursor.style.height = `${height}px`

      cursor.style.transform = `
        translate3d(
          ${currentX}px,
          ${currentY}px,
          0
        )
        translate(-50%, -50%)
      `

      cursor.classList.toggle('is-locked', Boolean(hit))

      animationFrame = requestAnimationFrame(update)
    }

    window.addEventListener(
      'mousemove',
      handleMouseMove,
      { passive: true }
    )

    animationFrame = requestAnimationFrame(update)

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )

      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return {
    cursorRef,
  }
}
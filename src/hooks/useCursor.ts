import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current

    if (!cursor) return

    const isTouch = window.matchMedia('(hover: none)').matches

    let mouseX = -100
    let mouseY = -100

    let currentX = -100
    let currentY = -100

    let lockedTarget: HTMLElement | null = null

    let animationFrame = 0


    /* =========================================================
       MOUSE MOVE
       ========================================================= */

    const handleMouseMove = (event: MouseEvent) => {
      if (isTouch) return

      mouseX = event.clientX
      mouseY = event.clientY
    }


    /* =========================================================
       MOBILE TOUCH
       ========================================================= */

    const handleTouchStart = (event: TouchEvent) => {
      if (!isTouch) return

      const touch = event.touches[0]

      if (!touch) return

      const element = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      ) as HTMLElement | null

      const target = element?.closest(
        '[data-target]'
      ) as HTMLElement | null


      /* -------------------------------------------------------
         TAP OUTSIDE TARGET
         ------------------------------------------------------- */

      if (!target) {
        lockedTarget = null

        cursor.classList.remove('is-locked')

        return
      }


      /* -------------------------------------------------------
         TAP TARGET
         ------------------------------------------------------- */

      lockedTarget = target

      const rect = target.getBoundingClientRect()

      currentX =
        rect.left + rect.width / 2

      currentY =
        rect.top + rect.height / 2


      cursor.style.width =
        `${rect.width + 12}px`

      cursor.style.height =
        `${rect.height + 12}px`


      cursor.style.transform = `
        translate3d(
          ${currentX}px,
          ${currentY}px,
          0
        )
        translate(-50%, -50%)
      `


      cursor.classList.add('is-locked')
    }


    /* =========================================================
       MAIN ANIMATION LOOP
       ========================================================= */

    const update = () => {

      /* =======================================================
         MOBILE
         ======================================================= */

      if (isTouch) {
        /*
         * Mobile does not have a mouse cursor.
         *
         * The HUD is positioned only when the user taps
         * a [data-target].
         */

        animationFrame =
          requestAnimationFrame(update)

        return
      }


      /* =======================================================
         CHECK ELEMENT UNDER MOUSE
         ======================================================= */

      const element = document.elementFromPoint(
        mouseX,
        mouseY
      ) as HTMLElement | null


      const target = element?.closest(
        '[data-target]'
      ) as HTMLElement | null


      /* =======================================================
         TARGET LOCK
         ======================================================= */

      if (target) {

        /*
         * Only lock once when entering a new target.
         */

        if (lockedTarget !== target) {

          lockedTarget = target

          const rect =
            target.getBoundingClientRect()


          /*
           * Get target center.
           */

          currentX =
            rect.left + rect.width / 2

          currentY =
            rect.top + rect.height / 2


          /*
           * Resize HUD around target.
           */

          cursor.style.width =
            `${rect.width + 12}px`

          cursor.style.height =
            `${rect.height + 12}px`


          /*
           * Position HUD at target center.
           */

          cursor.style.transform = `
            translate3d(
              ${currentX}px,
              ${currentY}px,
              0
            )
            translate(-50%, -50%)
          `


          /*
           * Tell CSS to:
           *
           * 1. Stop rotation
           * 2. Enlarge corners
           * 3. Increase center dot
           */

          cursor.classList.add('is-locked')
        }


        /*
         * VERY IMPORTANT
         *
         * Nothing changes while inside the target.
         *
         * We intentionally DO NOT:
         *
         * - update currentX
         * - update currentY
         * - follow mouse
         * - change transform
         *
         * Therefore the HUD remains completely frozen.
         */

        animationFrame =
          requestAnimationFrame(update)

        return
      }


      /* =======================================================
         UNLOCK
         ======================================================= */

      if (lockedTarget !== null) {

        lockedTarget = null

        cursor.classList.remove('is-locked')
      }


      /* =======================================================
         FREE MOUSE MODE
         ======================================================= */

      currentX +=
        (mouseX - currentX) * 0.18

      currentY +=
        (mouseY - currentY) * 0.18


      /*
       * Restore normal HUD size.
       */

      cursor.style.width = '34px'
      cursor.style.height = '34px'


      /*
       * Follow mouse.
       */

      cursor.style.transform = `
        translate3d(
          ${currentX}px,
          ${currentY}px,
          0
        )
        translate(-50%, -50%)
      `


      /*
       * Continue loop.
       */

      animationFrame =
        requestAnimationFrame(update)
    }


    /* =========================================================
       EVENT LISTENERS
       ========================================================= */

    window.addEventListener(
      'mousemove',
      handleMouseMove,
      {
        passive: true,
      }
    )


    window.addEventListener(
      'touchstart',
      handleTouchStart,
      {
        passive: true,
      }
    )


    /* =========================================================
       START
       ========================================================= */

    animationFrame =
      requestAnimationFrame(update)


    /* =========================================================
       CLEANUP
       ========================================================= */

    return () => {

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )

      window.removeEventListener(
        'touchstart',
        handleTouchStart
      )

      cancelAnimationFrame(
        animationFrame
      )
    }
  }, [])


  return {
    cursorRef,
  }
}
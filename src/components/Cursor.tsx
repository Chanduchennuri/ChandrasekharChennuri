import { useCursor } from '@/hooks/useCursor'


export default function Cursor() {
  const { cursorRef } = useCursor()

  return (
    <div
      ref={cursorRef}
      id="cursor"
      aria-hidden="true"
    >
      <div className="cursor-reticle">
        <span className="corner corner-tl" />
        <span className="corner corner-tr" />
        <span className="corner corner-br" />
        <span className="corner corner-bl" />

        <span className="cursor-line cursor-line-top" />
        <span className="cursor-line cursor-line-right" />
        <span className="cursor-line cursor-line-bottom" />
        <span className="cursor-line cursor-line-left" />
      </div>

      <div className="cursor-dot" />
    </div>
  )
}
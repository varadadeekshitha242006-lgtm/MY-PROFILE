import React, { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, raf

    const onMove = e => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot.current)
        dot.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      if (ring.current)
        ring.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onDown = () => ring.current?.classList.add('pressed')
    const onUp   = () => ring.current?.classList.remove('pressed')

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <style>{`
        .cursor-dot {
          position:fixed; top:0; left:0; width:8px; height:8px;
          background:var(--p); border-radius:50%; pointer-events:none;
          z-index:9999; will-change:transform;
        }
        .cursor-ring {
          position:fixed; top:0; left:0; width:40px; height:40px;
          border:1.5px solid rgba(124,111,255,.5); border-radius:50%;
          pointer-events:none; z-index:9998; will-change:transform;
          transition:width .2s, height .2s, border-color .2s;
        }
        .cursor-ring.pressed {
          width:32px; height:32px;
          border-color:var(--a);
          transform-origin:center !important;
        }
        @media(hover:none) { .cursor-dot, .cursor-ring { display:none; } }
      `}</style>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  )
}

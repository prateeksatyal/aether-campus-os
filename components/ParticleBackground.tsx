// components/ParticleBackground.tsx
'use client'
import { useEffect, useRef } from 'react'

export function ParticleBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    let running = true
    let particles = Array.from({length: 80}, (_,i)=>({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      r: 1.5 + Math.random()*2.1,
      dx: (Math.random()-0.5)*0.07,
      dy: (Math.random()-0.5)*0.09,
      c: ['#00f3ff','#c084fc','#ff2e63'][i % 3],
      a: 0.5 + Math.random()*0.4
    }))
    function resize() {
      cv.width = window.innerWidth
      cv.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    function animate() {
      ctx!.clearRect(0, 0, cv.width, cv.height)
      for (const p of particles) {
        ctx!.save()
        ctx!.globalAlpha = p.a
        ctx!.beginPath()
        ctx!.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx!.fillStyle = p.c
        ctx!.shadowColor = p.c
        ctx!.shadowBlur = 20
        ctx!.fill()
        ctx!.restore()
        p.x += p.dx; p.y += p.dy
        if (p.x < 0) p.x = cv.width; if (p.x > cv.width) p.x = 0
        if (p.y < 0) p.y = cv.height; if (p.y > cv.height) p.y = 0
      }
      if (running) requestAnimationFrame(animate)
    }
    animate()
    return () => {
      running = false
      window.removeEventListener('resize', resize)
    }
  }, [])
  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 w-full h-full z-10"
      width={1920}
      height={1080}
      aria-hidden
    />
  )
}

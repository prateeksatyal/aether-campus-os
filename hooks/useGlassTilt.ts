// hooks/useGlassTilt.ts
import { useRef, useEffect } from 'react'

export function useGlassTilt() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    function handle(e: MouseEvent) {
      const rect = node.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      node.style.transform = `perspective(700px) rotateX(${y*11}deg) rotateY(${-x*13}deg) scale(1.04)`
    }
    function reset() { node.style.transform = '' }
    node.addEventListener('mousemove', handle)
    node.addEventListener('mouseleave', reset)
    return () => { node.removeEventListener('mousemove', handle); node.removeEventListener('mouseleave', reset) }
  }, [])
  return ref
}

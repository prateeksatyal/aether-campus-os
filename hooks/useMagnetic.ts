// hooks/useMagnetic.ts
import { useEffect } from 'react'

export function useMagnetic(ref:any) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    function handle(e: MouseEvent) {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width/2
      const y = e.clientY - rect.top - rect.height/2
      el.style.transform = `translate(${x/9}px,${y/11}px) scale(1.08)`
    }
    const reset = ()=>{el.style.transform=''}
    el.addEventListener('mousemove', handle)
    el.addEventListener('mouseleave', reset)
    return ()=>{el.removeEventListener('mousemove',handle);el.removeEventListener('mouseleave',reset)}
  }, [ref])
}

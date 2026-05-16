// components/MagneticButton.tsx
'use client'
import { useRef } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'
import { playClick } from '@/lib/sound'

type Props = {
  children: React.ReactNode,
  color?: 'blue' | 'purple' | 'pink'
}
const colorMap = {
  blue: 'border-[#00f3ff] text-[#00f3ff]',
  purple: 'border-[#c084fc] text-[#c084fc]',
  pink: 'border-[#ff2e63] text-[#ff2e63]',
}
export function MagneticButton({ children, color = 'blue' }: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  useMagnetic(ref)
  return (
    <button
      ref={ref}
      type="button"
      className={`magnetic-hover px-7 py-3 mt-1 rounded-full font-semibold border-2 text-glass shadow-xl bg-[#0a0a0f]/80 hover:scale-105 transition-all duration-200 ${colorMap[color]}`}
      style={{ 
        filter: `drop-shadow(0 0 10px ${color === 'blue' ? '#00f3ff' : color === 'purple' ? '#c084fc' : '#ff2e63'})`
      }}
      onClick={playClick}
    >
      {children}
    </button>
  )
}

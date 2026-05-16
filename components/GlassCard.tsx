// components/GlassCard.tsx
import { ReactNode } from 'react'
import { useGlassTilt } from '../hooks/useGlassTilt'

export function GlassCard({ children, className = '' }: { children: ReactNode, className?: string }) {
  const ref = useGlassTilt()
  return (
    <div
      ref={ref}
      className={`glass p-7 transition-all duration-200 cursor-pointer magnetic-hover ${className}`}
      style={{
        boxShadow:
          '0 2px 36px 2px #00f3ff33, 0 0 0 2px #c084fc26',
        WebkitBackdropFilter: 'blur(32px)',
        backdropFilter: 'blur(32px)',
      }}
    >
      {children}
    </div>
  )
}

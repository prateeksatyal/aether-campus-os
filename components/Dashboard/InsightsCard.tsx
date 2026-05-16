// components/Dashboard/InsightsCard.tsx
'use client'
import { MicroType } from '../MicroType'

export function InsightsCard({ insight }: { insight: string }) {
  return (
    <div className="flex flex-col min-h-[170px]">
      <div className="uppercase font-bold text-[#ff2e63] tracking-wider mb-1">Aether’s Take</div>
      <MicroType text={insight} />
      <div className="text-xs text-[#c084fc8c] mt-auto pt-6">Powered by Aether AI</div>
    </div>
  )
}

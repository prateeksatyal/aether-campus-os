// components/Dashboard/GradeBars.tsx
'use client'
import { motion } from 'framer-motion'

export function GradeBars({ gpa, grades }: { gpa: number, grades: { subject: string, score: number }[] }) {
  const colorFor = (score: number) =>
    score >= 85 ? '#00f3ff' : score >= 75 ? '#c084fc' : '#ff2e63'
  return (
    <div className="flex flex-col items-start min-h-[170px] w-full">
      <div className="uppercase font-bold text-[#c084fc] tracking-wider">GPA</div>
      <div className="font-black text-3xl mb-3">{gpa}</div>
      <div className="w-full space-y-2">
        {grades.map(({subject, score}, i) => (
          <div key={subject} className="flex items-center gap-3">
            <span className="text-sm text-[#00f3ff99] w-[76px] tracking-wide">{subject}</span>
            <motion.div
              className="rounded-lg bg-gradient-to-r from-[#00f3ff88] via-[#c084fc99] to-[#ff2e63bb] shadow-lg"
              style={{ width: `${score}%`, height: '14px' }}
              initial={{ scaleX: 0.88 }}
              animate={{ scaleX: [1, 1.09, 1], boxShadow: `0 0 20px ${colorFor(score)}` }}
              transition={{ duration: 1.1, repeat: Infinity, repeatType: 'reverse', delay: i * 0.15 }}
            />
            <span className="ml-2 font-bold" style={{color: colorFor(score)}}>{score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

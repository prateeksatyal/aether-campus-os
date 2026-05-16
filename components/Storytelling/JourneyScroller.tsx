// components/Storytelling/JourneyScroller.tsx
'use client'
import { Chapter } from './Chapter'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const chapters = [
  {
    title: 'The Arrival',
    desc: "Neon-lit rain. A first step through Softwarica's glass doors. Dreams ignite.",
    color: '#00f3ff',
  },
  {
    title: 'First Semester',
    desc: "Caffeine and code. Nights bleed into dawn. Friendship found in glowing labs.",
    color: '#c084fc',
  },
  {
    title: 'The Awakening',
    desc: "Breakthrough. Ambition blazes. GPA returns 3.87. You’re not who you were.",
    color: '#ff2e63',
  },
  {
    title: 'The Horizon',
    desc: "Tomorrow. A path lit in neon. The OS evolves with you: infinite, alive.",
    color: '#00f3ff',
  },
]

export function JourneyScroller() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: ref })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[700px] overflow-y-auto scrollbar-thin" ref={ref}>
      {/* Animated progress bar */}
      <motion.div
        className="fixed left-0 top-0 h-1 bg-gradient-to-r from-[#00f3ff] via-[#c084fc] to-[#ff2e63] rounded-xl z-20"
        style={{ width: progress }}
      />
      <div className="flex flex-col gap-48 py-10 px-2 relative z-10">
        {chapters.map((c, i) => (
          <Chapter
            key={i}
            idx={i}
            title={c.title}
            desc={c.desc}
            color={c.color}
          />
        ))}
      </div>
    </div>
  )
}

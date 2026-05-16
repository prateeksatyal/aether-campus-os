// components/Storytelling/Chapter.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function Chapter({
  idx, title, desc, color
}: { idx: number, title: string, desc: string, color: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-30% 0px -20% 0px', once: true })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 120 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 1.16,
        delay: idx * 0.17
      }}
      className="w-full text-center select-none"
    >
      <motion.div
        className="font-extrabold text-4xl md:text-6xl neon mb-4"
        style={{
          color,
          textShadow: `0 0 30px ${color},0 0 4px #fff`,
        }}
      >{title}</motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ delay: 0.46 + idx*0.11, duration: 1.1 }}
        className="text-lg md:text-2xl text-white neon"
      >{desc}</motion.div>
    </motion.section>
  )
}

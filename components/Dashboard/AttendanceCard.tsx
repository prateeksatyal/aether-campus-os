// components/Dashboard/AttendanceCard.tsx
'use client'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'

export function AttendanceCard({ percentage }: { percentage: number }) {
  const [marked, setMarked] = useState(false)

  function markPresent() {
    setMarked(true)
    confetti({
      particleCount: 32,
      spread: 68,
      origin: { y: 0.77 },
      colors: ['#00f3ff', '#c084fc', '#ff2e63'],
      zIndex: 2001,
    })
    setTimeout(() => setMarked(false), 1700)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[170px]">
      <div className="uppercase font-bold text-[#00f3ff]/90 tracking-wider">Attendance</div>
      <div className="text-3xl font-black my-2">{percentage}%</div>
      <AnimatePresence>
        {!marked
          ? <motion.button
              className="text-[#ff2e63] font-bold px-5 py-2 rounded-xl bg-[#0a0a0f]/60 border border-[#00f3ff33] hover:scale-105 transition"
              onClick={markPresent}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.08 }}
            >
              Mark Present
            </motion.button>
          : <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.12, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[#c084fc] mt-2 font-bold"
            >✔ Present!</motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

// components/MicroType.tsx
'use client'
import { useEffect, useState } from 'react'

export function MicroType({ text }: { text: string }) {
  const [out, setOut] = useState('')
  useEffect(() => {
    setOut('')
    let i = 0
    const id = setInterval(() => {
      setOut(text.slice(0, i++))
      if (i > text.length) clearInterval(id)
    }, 15)
    return () => clearInterval(id)
  }, [text])
  return <span className="font-mono text-[#c084fc]">{out}</span>
}

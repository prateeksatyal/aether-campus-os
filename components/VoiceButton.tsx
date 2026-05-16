// components/VoiceButton.tsx
'use client'
import { Mic } from 'lucide-react'
import { useVoiceControl } from '@/hooks/useVoiceControl'
import { useMagnetic } from '@/hooks/useMagnetic'
import { playClick } from '@/lib/sound'
import { useRef } from 'react'

export function VoiceButton() {
  const { isListening, listen, transcript } = useVoiceControl()
  const ref = useRef<HTMLButtonElement>(null)
  useMagnetic(ref)

  return (
    <button
      ref={ref}
      aria-label="Speak to Aether"
      onClick={(e) => { playClick(); listen() }}
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-full neon bg-[#0a0a0f]/80 border-2 border-[#00f3ff] cursor-pointer shadow-2xl transition-all
        ${isListening ? 'scale-110 animate-pulse btn-clicked' : 'hover:scale-110'}
      `}
      style={{
        filter: `drop-shadow(0 0 14px #00f3ffcc)`
      }}
      type="button"
    >
      <Mic className="w-7 h-7" />
      <span className="sr-only">Voice Control</span>
      {/* Floating feedback bubble */}
      {isListening &&
        <span className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 min-w-[90px] px-3 py-1 rounded-lg bg-[#141438] border border-[#00f3ff44] text-[#00f3ff] text-[0.98rem] shadow-lg font-bold">
          Listening
        </span>
      }
    </button>
  )
}

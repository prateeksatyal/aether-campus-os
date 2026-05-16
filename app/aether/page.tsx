// app/aether/page.tsx
import { HoloAI } from '@/components/HoloAI'
import { MagneticButton } from '@/components/MagneticButton'
import Link from 'next/link'

export default function AetherPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-3">
      <div className="text-center my-14 space-y-3">
        <div className="neon text-5xl md:text-7xl font-bold">Aether AI</div>
        <div className="text-[#c084fc] text-lg">
          Your Holographic Tutor.  
          <span className="block text-[#00f3ff] font-semibold">Ask, chat, learn — via voice & gestures.</span>
        </div>
      </div>
      <div className="w-full h-[min(75vh,600px)] max-w-3xl mx-auto nasa-glow rounded-3xl overflow-hidden shadow-2xl">
        <HoloAI />
      </div>
      <div className="mt-10 flex gap-8">
        <Link href="/">
          <MagneticButton>← Back to Dashboard</MagneticButton>
        </Link>
      </div>
    </main>
  )
}

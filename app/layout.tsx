// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { ParticleBackground } from '@/components/ParticleBackground'
import { VoiceButton } from '@/components/VoiceButton'

export const metadata = {
  title: 'AETHER — The Living Campus OS',
  description: 'Softwarica’s most futuristic, cinematic student OS',
}

export default function RootLayout({
  children,
}: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="relative bg-[#0a0a0f] min-h-screen overflow-x-hidden antialiased">
        {/* Animated grid backdrop */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden
        >
          <div className="absolute inset-0 bg-grid animate-gridmove opacity-[0.17]" />
        </div>
        <ParticleBackground />
        <VoiceButton />
        {/* App, absolutely centered on dark glass */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}

// app/journey/page.tsx
import { JourneyScroller } from '@/components/Storytelling/JourneyScroller'
import Link from 'next/link'
import { MagneticButton } from '@/components/MagneticButton'

export default function JourneyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center py-12">
      <div className="max-w-xl w-full text-center mt-12 space-y-2">
        <h1 className="text-5xl md:text-7xl font-black neon mb-1">
          Your Academic Journey
        </h1>
        <p className="text-[#c084fc] text-md font-medium">
          Scroll to experience the chapters of your Softwarica story — every milestone, every neon-lit night.
        </p>
      </div>
      <div className="w-full flex-grow flex flex-col items-center">
        <div className="w-full mt-8">
          <JourneyScroller />
        </div>
        <div className="mt-24 mb-8">
          <Link href="/">
            <MagneticButton color="blue">← Back to Dashboard</MagneticButton>
          </Link>
        </div>
      </div>
    </main>
  )
}

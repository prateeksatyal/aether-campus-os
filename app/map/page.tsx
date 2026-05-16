// app/map/page.tsx
import { CampusMap3D } from '@/components/CampusMap3D'
import { MagneticButton } from '@/components/MagneticButton'
import Link from 'next/link'

export default function MapPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12">
      <h1 className="text-5xl font-black neon mb-3">Campus Map</h1>
      <p className="mb-7 text-[#c084fc] max-w-xl text-center">
        Explore Softwarica’s campus in 3D — click buildings, hover for info, and spot your friends.
      </p>
      <div className="nasa-glow max-w-5xl w-full rounded-3xl overflow-hidden shadow-2xl h-[600px] mb-8">
        <CampusMap3D />
      </div>
      <Link href="/">
        <MagneticButton color="blue">← Back to Dashboard</MagneticButton>
      </Link>
    </main>
  )
}

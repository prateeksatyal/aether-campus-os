// app/page.tsx
import { GlassCard } from '@/components/GlassCard'
import { AttendanceCard } from '@/components/Dashboard/AttendanceCard'
import { GradeBars } from '@/components/Dashboard/GradeBars'
import { InsightsCard } from '@/components/Dashboard/InsightsCard'
import { MagneticButton } from '@/components/MagneticButton'
import { fakeUser } from '@/lib/fakeData'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12">
      <section className="w-full flex flex-col items-center mb-8">
        {/* Hero */}
        <div className="my-10 text-center space-y-3">
          <div className="neon text-[clamp(2.5rem,10vw,7rem)] font-black tracking-tighter">
            AETHER
          </div>
          <div className="text-lg text-[#c084fc] tracking-wide font-semibold">
            The Living Campus OS for <span className="text-[#00f3ff]">{fakeUser.name}</span>
          </div>
        </div>
        {/* Dashboard Cards */}
        <div className="w-full max-w-6xl flex flex-wrap justify-center gap-8 mb-10">
          <GlassCard className="w-[310px]">
            <AttendanceCard percentage={fakeUser.attendance} />
          </GlassCard>
          <GlassCard className="w-[310px]">
            <GradeBars gpa={fakeUser.gpa} grades={fakeUser.grades} />
          </GlassCard>
          <GlassCard className="w-[310px]">
            <InsightsCard insight={fakeUser.insight} />
          </GlassCard>
        </div>
        {/* CTAs */}
        <div className="flex gap-6 mt-8">
          <Link href="/aether">
            <MagneticButton color="blue">👾 Talk to Aether</MagneticButton>
          </Link>
          <Link href="/journey">
            <MagneticButton color="purple">🌌 Your Journey</MagneticButton>
          </Link>
          <Link href="/map">
            <MagneticButton color="pink">🗺️ Campus Map</MagneticButton>
          </Link>
        </div>
      </section>
    </main>
  )
}

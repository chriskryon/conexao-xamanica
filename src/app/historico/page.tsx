"use client"
import { useCallback, Suspense } from "react"
import dynamic from "next/dynamic"

import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"
import CommonHeader from "@/components/shared/CommonHeader"

// Components with proper imports
import HistoricoStats from "@/components/historico/HistoricoStats"
import HistoricoFilters from "@/components/historico/HistoricoFilters"
import TimelineList from "@/components/historico/TimelineList"

// Dynamic import for modal to avoid SSR issues
const TimelineDetailModal = dynamic(
  () => import("@/components/historico/TimelineDetailModal"),
  { ssr: false }
)

export default function HistoricoPage() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log(container)
  }, [])

  const user = {
    name: "Irmão da Luz",
    avatar: "/profile.jpg",
    powerAnimal: "Águia",
    lastActivity: "Hoje às 10:30",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0E6F7] via-[#E6F3FF] to-[#FDF4E6] relative overflow-hidden">

      {/* Content */}
      <div className="relative z-10">
        <CommonHeader 
          title="Histórico Sagrado" 
          subtitle="Sua jornada xamânica documentada com amor e reverência"
          user={user} 
        />

        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Statistics Section */}
          <Suspense fallback={<div className="animate-pulse bg-white/20 h-32 rounded-xl backdrop-blur-sm" />}>
            <HistoricoStats />
          </Suspense>

          {/* Filters Section */}
          <Suspense fallback={<div className="animate-pulse bg-white/20 h-24 rounded-xl backdrop-blur-sm" />}>
            <HistoricoFilters />
          </Suspense>

          {/* Timeline Section */}
          <Suspense fallback={<div className="animate-pulse bg-white/20 h-96 rounded-xl backdrop-blur-sm" />}>
            <TimelineList />
          </Suspense>
        </main>
      </div>

      {/* Detail Modal */}
      <TimelineDetailModal />
    </div>
  )
}

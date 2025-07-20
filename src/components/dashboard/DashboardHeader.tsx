import { Icon } from "@iconify/react"

interface User {
  name: string
  avatar: string
  powerAnimal: string
  lastActivity: string
}

interface DashboardHeaderProps {
  user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="relative z-20 bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center gap-3">
            <Icon icon="mdi:eagle" className="w-8 h-8 text-[#2E4A2F]" />
            <div>
              <h1 className="font-sans text-xl font-bold text-[#2E4A2F]">Diário Xamânico</h1>
              <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Dashboard Espiritual</p>
            </div>
          </div>

          {/* Right - Compact Profile */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
            <img
              src={user.avatar || "/profile.jpg"}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-[#D6BCFA]/30"
            />
            <div className="hidden sm:block">
              <p className="font-sans text-sm font-semibold text-[#2E4A2F]">{user.name}</p>
              <p className="font-sans text-xs text-[#2C4A7E] opacity-70">🦅 {user.powerAnimal}</p>
            </div>
            <Icon icon="mdi:chevron-down" className="w-4 h-4 text-[#2C4A7E] opacity-70" />
          </div>
        </div>
      </div>
    </header>
  )
}

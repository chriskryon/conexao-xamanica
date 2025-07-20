import { Icon } from "@iconify/react"

export default function OnboardingHeader() {
  return (
    <header className="relative z-20 bg-white/10 backdrop-blur-sm border-b border-white/20 flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 py-1">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:eagle" className="w-8 h-8 text-[#2E4A2F]" />
            <div className="text-center">
              <h1 className="font-sans text-xl font-bold text-[#2E4A2F]">Diário Xamânico</h1>
              <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Bem-vindo à sua jornada</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

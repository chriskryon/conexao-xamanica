import { Icon } from "@iconify/react"

interface ActionCardsProps {
  onOpenConsagracao: () => void
  onOpenDiario: () => void
}

export default function ActionCards({ onOpenConsagracao, onOpenDiario }: ActionCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Experiência de Consagração Card */}
      <div
        className="card-glassmorphism group cursor-pointer hover:scale-[1.02] transition-all duration-300"
        onClick={onOpenConsagracao}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2E4A2F] to-[#1a2e1b] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon icon="mdi:feather" className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="font-sans text-xl font-bold text-[#2E4A2F] mb-1">Experiência de Consagração</h2>
              <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Registre rituais sagrados</p>
            </div>
          </div>
          <Icon
            icon="mdi:plus-circle"
            className="w-6 h-6 text-[#D6BCFA] group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-sm text-[#2C4A7E]">
            <Icon icon="mdi:cup" className="w-5 h-5 text-[#2E4A2F]" />
            <span>Ayahuasca, Rapé, Kambô</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#2C4A7E]">
            <Icon icon="mdi:star" className="w-5 h-5 text-[#2E4A2F]" />
            <span>Nível de intensidade</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#2C4A7E]">
            <Icon icon="mdi:camera" className="w-5 h-5 text-[#2E4A2F]" />
            <span>Fotos e áudios</span>
          </div>
        </div>

        <button className="btn-primary w-full group-hover:shadow-lg transition-all duration-300">
          <Icon icon="mdi:plus" className="w-5 h-5 inline mr-2" />
          Adicionar Experiência
        </button>
      </div>

      {/* Diário de Vida Card */}
      <div
        className="card-glassmorphism group cursor-pointer hover:scale-[1.02] transition-all duration-300"
        onClick={onOpenDiario}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D6BCFA] to-[#b794f6] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon icon="mdi:book-open" className="w-8 h-8 text-[#2E4A2F]" />
            </div>
            <div>
              <h2 className="font-sans text-xl font-bold text-[#2E4A2F] mb-1">Diário de Vida</h2>
              <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Reflexões e pensamentos</p>
            </div>
          </div>
          <Icon
            icon="mdi:plus-circle"
            className="w-6 h-6 text-[#D6BCFA] group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-sm text-[#2C4A7E]">
            <Icon icon="mdi:heart" className="w-5 h-5 text-[#2E4A2F]" />
            <span>Estado emocional</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#2C4A7E]">
            <Icon icon="mdi:tag" className="w-5 h-5 text-[#2E4A2F]" />
            <span>Tags personalizadas</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#2C4A7E]">
            <Icon icon="mdi:calendar" className="w-5 h-5 text-[#2E4A2F]" />
            <span>Registro diário</span>
          </div>
        </div>

        <button className="btn-primary w-full group-hover:shadow-lg transition-all duration-300">
          <Icon icon="mdi:plus" className="w-5 h-5 inline mr-2" />
          Nova Reflexão
        </button>
      </div>
    </div>
  )
}

import { Icon } from "@iconify/react"
import { useHistoricoStats } from "@/hooks/useHistorico"

export default function HistoricoStats() {
  const { data: stats, isLoading, error } = useHistoricoStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card-glassmorphism text-center animate-pulse">
            <div className="w-8 h-8 bg-gray-300 rounded mx-auto mb-2"></div>
            <div className="h-8 bg-gray-300 rounded mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-glassmorphism text-center">
          <Icon icon="mdi:alert-circle" className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Erro ao carregar</p>
        </div>
      </div>
    )
  }

  const statsCards = [
    {
      icon: "mdi:chart-line",
      value: stats.totalEntries,
      label: "Total de Entradas",
      color: "text-[#2E4A2F]"
    },
    {
      icon: "mdi:feather",
      value: stats.consagracaoEntries,
      label: "Consagrações",
      color: "text-[#2E4A2F]"
    },
    {
      icon: "mdi:book-open",
      value: stats.diarioEntries,
      label: "Reflexões",
      color: "text-[#2E4A2F]"
    },
    {
      icon: "mdi:star",
      value: stats.avgIntensity,
      label: "Intensidade Média",
      color: "text-[#2E4A2F]"
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsCards.map((card, index) => (
        <div key={index} className="card-glassmorphism text-center fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <Icon icon={card.icon} className={`w-8 h-8 ${card.color} mx-auto mb-2`} />
          <h3 className="font-sans text-2xl font-bold text-[#2E4A2F]">
            {typeof card.value === 'number' && card.value % 1 !== 0 ? card.value.toFixed(1) : card.value}
          </h3>
          <p className="font-sans text-sm text-[#2C4A7E] opacity-70">{card.label}</p>
        </div>
      ))}
    </div>
  )
}

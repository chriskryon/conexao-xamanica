import { Icon } from "@iconify/react"
import { useTimelineItems } from "@/hooks/useHistorico"
import { useHistoricoFilters } from "@/stores/historicoStore"
import TimelineItem from "./TimelineItem"

export default function TimelineList() {
  const { filters } = useHistoricoFilters()
  const { data: items, isLoading, error } = useTimelineItems(filters)

  if (isLoading) {
    return (
      <div className="card-glassmorphism">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-32 animate-pulse"></div>
        </div>

        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex gap-6 p-6 rounded-xl bg-white/5 border border-white/10 animate-pulse">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-300 rounded w-64 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-32 mb-4"></div>
                <div className="h-16 bg-gray-300 rounded mb-4"></div>
                <div className="flex gap-4">
                  <div className="h-8 bg-gray-300 rounded w-24"></div>
                  <div className="h-8 bg-gray-300 rounded w-20"></div>
                  <div className="h-8 bg-gray-300 rounded w-28"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card-glassmorphism">
        <div className="text-center py-12">
          <Icon icon="mdi:alert-circle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-2">Erro ao carregar histórico</h3>
          <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
            Tente recarregar a página ou contate o suporte
          </p>
        </div>
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="card-glassmorphism">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-sans text-2xl font-bold text-[#2E4A2F] mb-2">Linha do Tempo</h2>
            <p className="font-sans text-sm text-[#2C4A7E] opacity-70">0 entradas encontradas</p>
          </div>
          <button className="btn-secondary px-6 py-2 text-sm hover:scale-105 transition-all duration-300">
            <Icon icon="mdi:download" className="w-4 h-4 inline mr-2" />
            Exportar Tudo
          </button>
        </div>

        <div className="text-center py-12">
          <Icon icon="mdi:magnify" className="w-16 h-16 text-[#2C4A7E] opacity-30 mx-auto mb-4" />
          <h3 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-2">Nenhuma entrada encontrada</h3>
          <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
            Tente ajustar os filtros ou adicionar novas entradas
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card-glassmorphism">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-sans text-2xl font-bold text-[#2E4A2F] mb-2">Linha do Tempo</h2>
          <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
            {items.length} {items.length === 1 ? 'entrada encontrada' : 'entradas encontradas'}
          </p>
        </div>
        <button className="btn-secondary px-6 py-2 text-sm hover:scale-105 transition-all duration-300">
          <Icon icon="mdi:download" className="w-4 h-4 inline mr-2" />
          Exportar Tudo
        </button>
      </div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            showConnector={index < items.length - 1}
          />
        ))}
      </div>

      {/* Load More - pode ser implementado posteriormente com paginação */}
      {items.length >= 10 && (
        <div className="text-center mt-8">
          <button className="btn-secondary px-8 py-3 hover:scale-105 transition-all duration-300">
            <Icon icon="mdi:refresh" className="w-5 h-5 inline mr-2" />
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  )
}

import { Icon } from "@iconify/react"
import { useHistoricoFilters } from "@/stores/historicoStore"
import { useAllTags } from "@/hooks/useHistorico"

export default function HistoricoFilters() {
  const { filters, setFilters, resetFilters } = useHistoricoFilters()
  const { data: allTags } = useAllTags()

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters({ [key]: value })
  }

  const hasActiveFilters = filters.type !== "all" || 
                          filters.dateRange !== "all" || 
                          filters.searchTerm !== "" || 
                          filters.tags.length > 0

  return (
    <div className="card-glassmorphism mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-sans text-xl font-bold text-[#2E4A2F]">Filtros</h2>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="btn-secondary text-sm px-4 py-2 hover:scale-105 transition-all duration-300"
          >
            <Icon icon="mdi:filter-off" className="w-4 h-4 inline mr-1" />
            Limpar Filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div className="input-with-icon">
          <Icon icon="mdi:magnify" className="input-icon" />
          <input
            type="text"
            placeholder="Buscar por título ou descrição..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
            className="input-glassmorphism font-sans"
          />
        </div>

        {/* Type Filter */}
        <div className="input-with-icon">
          <Icon icon="mdi:filter" className="input-icon" />
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="select-glassmorphism font-sans"
          >
            <option value="all">Todos os tipos</option>
            <option value="consagracao">Consagrações</option>
            <option value="diario">Reflexões</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="input-with-icon">
          <Icon icon="mdi:calendar-range" className="input-icon" />
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange("dateRange", e.target.value)}
            className="select-glassmorphism font-sans"
          >
            <option value="all">Todo o período</option>
            <option value="week">Última semana</option>
            <option value="month">Último mês</option>
            <option value="year">Último ano</option>
          </select>
        </div>

        {/* Tags Filter */}
        {allTags && allTags.length > 0 && (
          <div className="input-with-icon">
            <Icon icon="mdi:tag" className="input-icon" />
            <select
              value=""
              onChange={(e) => {
                const tag = e.target.value
                if (tag && !filters.tags.includes(tag)) {
                  handleFilterChange("tags", [...filters.tags, tag])
                }
              }}
              className="select-glassmorphism font-sans"
            >
              <option value="">Adicionar tag...</option>
              {allTags
                .filter(tag => !filters.tags.includes(tag))
                .map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))
              }
            </select>
          </div>
        )}
      </div>

      {/* Selected Tags */}
      {filters.tags.length > 0 && (
        <div className="mt-6">
          <h3 className="font-sans text-sm font-medium text-[#2C4A7E] opacity-70 mb-3">Tags selecionadas:</h3>
          <div className="flex flex-wrap gap-2">
            {filters.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 bg-[#D6BCFA]/20 text-[#2C4A7E] px-3 py-1 rounded-full text-sm font-sans"
              >
                {tag}
                <button
                  onClick={() => {
                    handleFilterChange("tags", filters.tags.filter(t => t !== tag))
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  <Icon icon="mdi:close" className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

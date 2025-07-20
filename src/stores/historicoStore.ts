import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { FilterState, TimelineItemData } from '@/schemas/historico'

interface HistoricoState {
  // Estado dos filtros
  filters: FilterState
  
  // Modal de detalhes
  showDetailModal: boolean
  selectedItem: TimelineItemData | null
  
  // Timeline selecionado para expansão
  selectedTimelineItem: string | null
  
  // View preferences
  viewMode: 'list' | 'grid'
  itemsPerPage: number
  
  // Actions
  setFilters: (filters: Partial<FilterState>) => void
  resetFilters: () => void
  
  openDetailModal: (item: TimelineItemData) => void
  closeDetailModal: () => void
  
  toggleTimelineItem: (itemId: string) => void
  setSelectedTimelineItem: (itemId: string | null) => void
  
  setViewMode: (mode: 'list' | 'grid') => void
  setItemsPerPage: (count: number) => void
}

const defaultFilters: FilterState = {
  type: "all",
  dateRange: "all", 
  searchTerm: "",
  tags: [],
}

export const useHistoricoStore = create<HistoricoState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      filters: defaultFilters,
      showDetailModal: false,
      selectedItem: null,
      selectedTimelineItem: null,
      viewMode: 'list',
      itemsPerPage: 10,

      // Ações para filtros
      setFilters: (newFilters) => {
        set(state => ({
          filters: { ...state.filters, ...newFilters }
        }))
      },

      resetFilters: () => {
        set({ filters: defaultFilters })
      },

      // Ações para modal de detalhes
      openDetailModal: (item) => {
        set({
          selectedItem: item,
          showDetailModal: true,
        })
      },

      closeDetailModal: () => {
        set({
          showDetailModal: false,
          selectedItem: null,
        })
      },

      // Ações para timeline expandido
      toggleTimelineItem: (itemId) => {
        const currentSelected = get().selectedTimelineItem
        set({
          selectedTimelineItem: currentSelected === itemId ? null : itemId
        })
      },

      setSelectedTimelineItem: (itemId) => {
        set({ selectedTimelineItem: itemId })
      },

      // Ações para preferências de visualização
      setViewMode: (mode) => {
        set({ viewMode: mode })
      },

      setItemsPerPage: (count) => {
        set({ itemsPerPage: count })
      },
    }),
    {
      name: 'historico-preferences',
      storage: createJSONStorage(() => localStorage),
      
      // Persistir apenas as preferências do usuário
      partialize: (state) => ({
        filters: state.filters,
        viewMode: state.viewMode,
        itemsPerPage: state.itemsPerPage,
      }),
      
      version: 1,
    }
  )
)

// Hooks específicos para facilitar o uso
export const useHistoricoFilters = () => {
  const filters = useHistoricoStore(state => state.filters)
  const setFilters = useHistoricoStore(state => state.setFilters)
  const resetFilters = useHistoricoStore(state => state.resetFilters)
  
  return { filters, setFilters, resetFilters }
}

export const useHistoricoModal = () => {
  const showDetailModal = useHistoricoStore(state => state.showDetailModal)
  const selectedItem = useHistoricoStore(state => state.selectedItem)
  const openDetailModal = useHistoricoStore(state => state.openDetailModal)
  const closeDetailModal = useHistoricoStore(state => state.closeDetailModal)
  
  return { 
    showDetailModal, 
    selectedItem, 
    openDetailModal, 
    closeDetailModal 
  }
}

export const useHistoricoTimeline = () => {
  const selectedTimelineItem = useHistoricoStore(state => state.selectedTimelineItem)
  const toggleTimelineItem = useHistoricoStore(state => state.toggleTimelineItem)
  const setSelectedTimelineItem = useHistoricoStore(state => state.setSelectedTimelineItem)
  
  return { 
    selectedTimelineItem, 
    toggleTimelineItem, 
    setSelectedTimelineItem 
  }
}

export const useHistoricoView = () => {
  const viewMode = useHistoricoStore(state => state.viewMode)
  const itemsPerPage = useHistoricoStore(state => state.itemsPerPage)
  const setViewMode = useHistoricoStore(state => state.setViewMode)
  const setItemsPerPage = useHistoricoStore(state => state.setItemsPerPage)
  
  return { 
    viewMode, 
    itemsPerPage, 
    setViewMode, 
    setItemsPerPage 
  }
}

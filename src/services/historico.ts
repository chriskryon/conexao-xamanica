import { 
  TimelineItemData, 
  FilterState, 
  HistoricoStats, 
  CreateTimelineItemData,
  UpdateTimelineItemData 
} from "@/schemas/historico"

// Mock data para desenvolvimento
const mockTimelineItems: TimelineItemData[] = [
  {
    id: "1",
    type: "consagracao",
    title: "Cerimônia de Ayahuasca",
    description: "Experiência profunda de conexão com a natureza e ancestrais. Visões de cura e renovação espiritual. Durante a cerimônia, recebi mensagens importantes sobre meu caminho de vida e propósito espiritual.",
    date: "03/07/2025",
    time: "19:30",
    intensity: 5,
    ritual: "Ayahuasca",
    location: "Centro Xamânico Luz da Floresta",
    notes: "Facilitador: João da Silva. Participantes: 12 pessoas. Duração: 6 horas.",
    tags: ["cura", "visões", "ancestrais", "propósito"],
    createdAt: "2025-07-03T19:30:00Z",
  },
  {
    id: "2",
    type: "diario",
    title: "Reflexão sobre Gratidão",
    description: "Momento de introspecção profunda sobre as bênçãos recebidas e o caminho espiritual percorrido. Sinto uma conexão mais forte com minha essência.",
    date: "02/07/2025",
    time: "08:15",
    mood: "grato",
    tags: ["gratidão", "reflexão", "bênçãos", "essência"],
    createdAt: "2025-07-02T08:15:00Z",
  },
  {
    id: "3",
    type: "consagracao",
    title: "Ritual de Rapé",
    description: "Limpeza energética e foco mental. Conexão com a respiração e presença no momento atual. Senti uma clareza mental incrível.",
    date: "01/07/2025",
    time: "16:45",
    intensity: 3,
    ritual: "Rapé",
    location: "Casa",
    notes: "Rapé de Tsunu. Momento de meditação profunda.",
    tags: ["limpeza", "foco", "respiração", "clareza"],
    createdAt: "2025-07-01T16:45:00Z",
  },
  {
    id: "4",
    type: "diario",
    title: "Sonhos e Símbolos",
    description: "Registro de sonhos significativos com símbolos xamânicos e mensagens do inconsciente. Apareceu uma águia dourada voando sobre montanhas.",
    date: "30/06/2025",
    time: "07:00",
    mood: "inspirado",
    tags: ["sonhos", "símbolos", "inconsciente", "águia"],
    createdAt: "2025-06-30T07:00:00Z",
  },
  {
    id: "5",
    type: "consagracao",
    title: "Cerimônia de Kambô",
    description: "Ritual de purificação com medicina da floresta. Processo intenso de limpeza física e energética.",
    date: "28/06/2025",
    time: "10:00",
    intensity: 4,
    ritual: "Kambô",
    location: "Centro de Medicina Ancestral",
    notes: "Aplicação de 5 pontos. Jejum de 12 horas antes.",
    tags: ["purificação", "limpeza", "medicina", "floresta"],
    createdAt: "2025-06-28T10:00:00Z",
  },
  {
    id: "6",
    type: "diario",
    title: "Conexão com a Natureza",
    description: "Caminhada na floresta trouxe insights profundos sobre minha relação com os elementos naturais.",
    date: "25/06/2025",
    time: "14:30",
    mood: "calmo",
    tags: ["natureza", "floresta", "elementos", "insights"],
    createdAt: "2025-06-25T14:30:00Z",
  },
]

// Simular delay de rede
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 500))

class HistoricoService {
  // Buscar todos os itens da timeline
  async getTimelineItems(filters?: FilterState): Promise<TimelineItemData[]> {
    await simulateNetworkDelay()
    
    let items = [...mockTimelineItems]
    
    // Aplicar filtros se fornecidos
    if (filters) {
      items = this.applyFilters(items, filters)
    }
    
    // Ordenar por data (mais recente primeiro)
    items.sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime())
    
    return items
  }

  // Buscar item por ID
  async getTimelineItemById(id: string): Promise<TimelineItemData | null> {
    await simulateNetworkDelay()
    return mockTimelineItems.find(item => item.id === id) || null
  }

  // Criar novo item
  async createTimelineItem(data: CreateTimelineItemData): Promise<TimelineItemData> {
    await simulateNetworkDelay()
    
    const newItem: TimelineItemData = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    mockTimelineItems.unshift(newItem)
    return newItem
  }

  // Atualizar item existente
  async updateTimelineItem(data: UpdateTimelineItemData): Promise<TimelineItemData> {
    await simulateNetworkDelay()
    
    const index = mockTimelineItems.findIndex(item => item.id === data.id)
    if (index === -1) {
      throw new Error("Item não encontrado")
    }
    
    const updatedItem = {
      ...mockTimelineItems[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    
    mockTimelineItems[index] = updatedItem
    return updatedItem
  }

  // Deletar item
  async deleteTimelineItem(id: string): Promise<void> {
    await simulateNetworkDelay()
    
    const index = mockTimelineItems.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error("Item não encontrado")
    }
    
    mockTimelineItems.splice(index, 1)
  }

  // Buscar estatísticas
  async getStats(): Promise<HistoricoStats> {
    await simulateNetworkDelay()
    
    const totalEntries = mockTimelineItems.length
    const consagracaoEntries = mockTimelineItems.filter(item => item.type === "consagracao").length
    const diarioEntries = mockTimelineItems.filter(item => item.type === "diario").length
    
    const intensityItems = mockTimelineItems.filter(item => item.intensity)
    const avgIntensity = intensityItems.length > 0 
      ? intensityItems.reduce((sum, item) => sum + (item.intensity || 0), 0) / intensityItems.length
      : 0

    return {
      totalEntries,
      consagracaoEntries,
      diarioEntries,
      avgIntensity: Number(avgIntensity.toFixed(1)),
      streakDays: 7, // TODO: calcular streak real
      lastActivity: mockTimelineItems[0]?.createdAt || new Date().toISOString(),
    }
  }

  // Aplicar filtros
  private applyFilters(items: TimelineItemData[], filters: FilterState): TimelineItemData[] {
    return items.filter(item => {
      // Filtro por tipo
      if (filters.type !== "all" && item.type !== filters.type) {
        return false
      }

      // Filtro por termo de busca
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        const titleMatch = item.title.toLowerCase().includes(searchLower)
        const descriptionMatch = item.description.toLowerCase().includes(searchLower)
        const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        
        if (!titleMatch && !descriptionMatch && !tagsMatch) {
          return false
        }
      }

      // Filtro por período
      if (filters.dateRange !== "all") {
        const itemDate = new Date(item.date.split("/").reverse().join("-"))
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - itemDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        switch (filters.dateRange) {
          case "week":
            if (diffDays > 7) return false
            break
          case "month":
            if (diffDays > 30) return false
            break
          case "year":
            if (diffDays > 365) return false
            break
        }
      }

      // Filtro por tags
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(filterTag => 
          item.tags?.includes(filterTag)
        )
        if (!hasMatchingTag) return false
      }

      return true
    })
  }

  // Buscar todas as tags únicas
  async getAllTags(): Promise<string[]> {
    await simulateNetworkDelay()
    
    const allTags = mockTimelineItems
      .flatMap(item => item.tags || [])
      .filter((tag, index, array) => array.indexOf(tag) === index)
      .sort()
    
    return allTags
  }
}

export const historicoService = new HistoricoService()

import { ConsagracaoFormData, DiarioFormData, TimelineItemData, UserData } from "@/schemas/dashboard"
import { onboardingStorage } from "./onboarding"

// Flag para alternar entre localStorage e API real
const USE_API = false
const API_BASE_URL = "/api"

// Chaves do localStorage
const STORAGE_KEYS = {
  USER: "diario_xamanico_user",
  TIMELINE_ITEMS: "diario_xamanico_timeline",
  LAST_SYNC: "diario_xamanico_last_sync",
} as const

// Simulação de delay de rede
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 800))

// ============= SIMULAÇÃO LOCALSTORAGE =============

const getStoredTimelineItems = (): TimelineItemData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TIMELINE_ITEMS)
    return stored ? JSON.parse(stored) : getDefaultTimelineItems()
  } catch {
    return getDefaultTimelineItems()
  }
}

const setStoredTimelineItems = (items: TimelineItemData[]) => {
  localStorage.setItem(STORAGE_KEYS.TIMELINE_ITEMS, JSON.stringify(items))
  localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString())
}

const getStoredUser = (): UserData => {
  try {
    // Primeiro tenta buscar dados do onboarding
    const onboardingData = onboardingStorage.getProfile()
    
    if (onboardingData && onboardingStorage.isCompleted()) {
      // Converte dados do onboarding para formato do dashboard
      return {
        name: onboardingData.nome,
        avatar: typeof onboardingData.photo === 'string' ? onboardingData.photo : "/placeholder.svg?height=80&width=80",
        powerAnimal: onboardingData.animalPoder || "Águia",
        lastActivity: "Agora",
      }
    }
    
    // Fallback: busca do localStorage específico do dashboard
    const stored = localStorage.getItem(STORAGE_KEYS.USER)
    return stored ? JSON.parse(stored) : getDefaultUser()
  } catch {
    return getDefaultUser()
  }
}

const setStoredUser = (user: UserData) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

// Dados padrão
const getDefaultUser = (): UserData => ({
  name: "Maria Silva",
  avatar: "/placeholder.svg?height=80&width=80",
  powerAnimal: "Águia",
  lastActivity: "Agora",
})

const getDefaultTimelineItems = (): TimelineItemData[] => [
  {
    id: "1",
    type: "consagracao",
    title: "Cerimônia de Ayahuasca",
    description: "Experiência profunda de conexão com a natureza e ancestrais. Visões de cura e renovação espiritual.",
    date: "03/07/2025",
    time: "19:30",
    intensity: 5,
    ritual: "Ayahuasca",
    tags: ["cura", "visões", "ancestrais"],
    createdAt: "2025-07-03T19:30:00Z",
  },
  {
    id: "2",
    type: "diario",
    title: "Reflexão sobre Gratidão",
    description: "Momento de introspecção profunda sobre as bênçãos recebidas e o caminho espiritual percorrido.",
    date: "02/07/2025",
    time: "08:15",
    mood: "grato",
    tags: ["gratidão", "reflexão", "bênçãos"],
    createdAt: "2025-07-02T08:15:00Z",
  },
  {
    id: "3",
    type: "consagracao",
    title: "Ritual de Rapé",
    description: "Limpeza energética e foco mental. Conexão com a respiração e presença no momento atual.",
    date: "01/07/2025",
    time: "16:45",
    intensity: 3,
    ritual: "Rapé",
    tags: ["limpeza", "foco", "respiração"],
    createdAt: "2025-07-01T16:45:00Z",
  },
  {
    id: "4",
    type: "diario",
    title: "Sonhos e Símbolos",
    description: "Registro de sonhos significativos com símbolos xamânicos e mensagens do inconsciente.",
    date: "30/06/2025",
    time: "07:00",
    mood: "inspirado",
    tags: ["sonhos", "símbolos", "inconsciente"],
    createdAt: "2025-06-30T07:00:00Z",
  },
]

// ============= SERVIÇOS =============

export const dashboardService = {
  // Obter dados do usuário
  async getUser(): Promise<UserData> {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/user`)
      if (!response.ok) throw new Error("Erro ao carregar dados do usuário")
      return response.json()
    }

    await simulateNetworkDelay()
    return getStoredUser()
  },

  // Atualizar dados do usuário
  async updateUser(userData: Partial<UserData>): Promise<UserData> {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      if (!response.ok) throw new Error("Erro ao atualizar usuário")
      return response.json()
    }

    await simulateNetworkDelay()
    const currentUser = getStoredUser()
    const updatedUser = { ...currentUser, ...userData }
    setStoredUser(updatedUser)
    return updatedUser
  },

  // Obter itens da timeline
  async getTimelineItems(): Promise<TimelineItemData[]> {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/timeline`)
      if (!response.ok) throw new Error("Erro ao carregar timeline")
      return response.json()
    }

    await simulateNetworkDelay()
    return getStoredTimelineItems()
  },

  // Criar experiência de consagração
  async createConsagracao(data: ConsagracaoFormData): Promise<TimelineItemData> {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/consagracao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Erro ao salvar experiência")
      return response.json()
    }

    await simulateNetworkDelay()

    const newItem: TimelineItemData = {
      id: Date.now().toString(),
      type: "consagracao",
      title: `Ritual de ${data.tipoRitual === "outros" ? data.outroRitual : data.tipoRitual}`,
      description: data.descricao,
      date: new Date(data.data).toLocaleDateString("pt-BR"),
      time: data.hora || "00:00",
      intensity: data.intensidade,
      ritual: data.tipoRitual === "outros" ? data.outroRitual : data.tipoRitual,
      tags: [data.tipoRitual, data.local].filter((tag): tag is string => Boolean(tag)),
      createdAt: new Date().toISOString(),
    }

    const currentItems = getStoredTimelineItems()
    const updatedItems = [newItem, ...currentItems]
    setStoredTimelineItems(updatedItems)

    return newItem
  },

  // Criar entrada de diário
  async createDiario(data: DiarioFormData): Promise<TimelineItemData> {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/diario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Erro ao salvar reflexão")
      return response.json()
    }

    await simulateNetworkDelay()

    const newItem: TimelineItemData = {
      id: Date.now().toString(),
      type: "diario",
      title: data.titulo,
      description: data.reflexao,
      date: new Date(data.data).toLocaleDateString("pt-BR"),
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      mood: data.humor,
      tags: data.tags,
      createdAt: new Date().toISOString(),
    }

    const currentItems = getStoredTimelineItems()
    const updatedItems = [newItem, ...currentItems]
    setStoredTimelineItems(updatedItems)

    return newItem
  },

  // Atualizar item da timeline
  async updateTimelineItem(id: string, data: Partial<TimelineItemData>): Promise<TimelineItemData> {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/timeline/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Erro ao atualizar item")
      return response.json()
    }

    await simulateNetworkDelay()

    const currentItems = getStoredTimelineItems()
    const itemIndex = currentItems.findIndex(item => item.id === id)
    
    if (itemIndex === -1) {
      throw new Error("Item não encontrado")
    }

    const updatedItem = { 
      ...currentItems[itemIndex], 
      ...data, 
      updatedAt: new Date().toISOString() 
    }
    
    currentItems[itemIndex] = updatedItem
    setStoredTimelineItems(currentItems)

    return updatedItem
  },

  // Deletar item da timeline
  async deleteTimelineItem(id: string): Promise<void> {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/timeline/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Erro ao deletar item")
      return
    }

    await simulateNetworkDelay()

    const currentItems = getStoredTimelineItems()
    const updatedItems = currentItems.filter(item => item.id !== id)
    setStoredTimelineItems(updatedItems)
  },

  // Limpar todos os dados (útil para debug)
  async clearAllData(): Promise<void> {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/clear-all`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Erro ao limpar dados")
      return
    }

    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.TIMELINE_ITEMS)
    localStorage.removeItem(STORAGE_KEYS.LAST_SYNC)
  },

  // Obter informações de sincronização
  getLastSync(): string | null {
    return localStorage.getItem(STORAGE_KEYS.LAST_SYNC)
  },

  // Verificar se há dados salvos
  hasLocalData(): boolean {
    return !!(
      localStorage.getItem(STORAGE_KEYS.TIMELINE_ITEMS) ||
      localStorage.getItem(STORAGE_KEYS.USER)
    )
  },
}

import { ConsagracaoFormData, DiarioFormData, TimelineItemData, UserData } from "@/schemas/dashboard"
import { useUserStore } from "@/stores/userStore"

// Flag para alternar entre localStorage e API real
const USE_API = false
const API_BASE_URL = "/api"

// Simulação de delay de rede
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 800))

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
    
    // Usar Zustand para obter dados
    const store = useUserStore.getState()
    const profile = store.profile
    const onboardingCompleted = store.onboardingCompleted
    
    // Fallback se não houver dados do onboarding
    if (!profile || !onboardingCompleted) {
      return {
        name: "Usuário",
        avatar: "/profile.jpg",
        powerAnimal: "Águia",
        lastActivity: "Agora",
      }
    }

    const user = {
      name: profile.nome,
      avatar: typeof profile.photo === 'string' ? profile.photo : '/profile.jpg',
      powerAnimal: profile.animalPoder || 'Águia',
      lastActivity: 'Agora'
    }
    
    return user
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
    
    // Para API falsa, apenas retornar os dados atualizados
    const currentUser = await this.getUser()
    return { ...currentUser, ...userData }
  },

  // Obter itens da timeline
  async getTimelineItems(): Promise<TimelineItemData[]> {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/timeline`)
      if (!response.ok) throw new Error("Erro ao carregar timeline")
      return response.json()
    }

    await simulateNetworkDelay()
    
    // Usar Zustand para obter timeline
    return useUserStore.getState().timelineItems
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

    // Adicionar ao Zustand store
    useUserStore.getState().addTimelineItem(newItem)

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

    // Adicionar ao Zustand store
    useUserStore.getState().addTimelineItem(newItem)

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

    const store = useUserStore.getState()
    const existingItem = store.timelineItems.find((item: TimelineItemData) => item.id === id)
    
    if (!existingItem) {
      throw new Error("Item não encontrado")
    }

    const updatedItem = { 
      ...existingItem, 
      ...data, 
      updatedAt: new Date().toISOString() 
    }
    
    store.updateTimelineItem(id, data)
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

    useUserStore.getState().deleteTimelineItem(id)
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

    // Limpar dados do Zustand
    useUserStore.getState().clearAllData()
  },

  // Obter informações de sincronização
  getLastSync(): string | null {
    // Para Zustand, podemos implementar timestamp de última atualização se necessário
    return new Date().toISOString()
  },

  // Verificar se há dados salvos
  hasLocalData(): boolean {
    const store = useUserStore.getState()
    return !!(store.timelineItems.length || (store.profile && store.onboardingCompleted))
  },
}

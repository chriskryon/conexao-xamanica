import { UserProfileData, ChangePasswordData, NotificationPreferencesData, UserStatsData } from "@/schemas/perfil"

// Flag para alternar entre localStorage e API real
const USE_API = false

// Chaves do localStorage
const STORAGE_KEYS = {
  USER_PROFILE: "diario_xamanico_user_profile",
  USER_STATS: "diario_xamanico_user_stats", 
  NOTIFICATION_PREFERENCES: "diario_xamanico_notification_prefs",
  USER_SESSIONS: "diario_xamanico_user_sessions",
}

// Dados mockados para desenvolvimento
const MOCK_USER_PROFILE: UserProfileData = {
  name: "Maria Silva",
  nickname: "Mari",
  email: "maria.silva@email.com",
  bio: "Buscadora da luz interior, conectada com a medicina ancestral e os ensinamentos da floresta. Minha jornada xamânica começou há 3 anos e desde então venho explorando os mistérios da consciência.",
  powerAnimal: "Águia",
  civilStatus: "Solteiro(a)",
  preference: "Todos os humanos",
  avatar: "/placeholder.svg?height=120&width=120",
  birthDate: "15/03/1985",
  zodiacSign: "Peixes",
  ayahuascaExperience: "3 anos",
  joinDate: "Janeiro 2022",
  totalEntries: 47,
  totalConsagracoes: 23,
  totalReflexoes: 24,
}

const MOCK_USER_STATS: UserStatsData = {
  totalEntries: 47,
  totalConsagracoes: 23,
  totalReflexoes: 24,
  streakDays: 7,
  lastActivity: new Date().toISOString(),
}

const MOCK_NOTIFICATION_PREFERENCES: NotificationPreferencesData = {
  reminderNotifications: true,
  eventNotifications: true,
  publicProfile: false,
  dataSharing: true,
}

const MOCK_USER_SESSIONS = [
  {
    id: "1",
    device: "MacBook Pro - Chrome",
    location: "São Paulo, Brasil",
    lastActive: "Ativo agora",
    isCurrent: true,
  },
  {
    id: "2", 
    device: "iPhone - Safari",
    location: "São Paulo, Brasil",
    lastActive: "2 horas atrás",
    isCurrent: false,
  },
]

// Simulação de delay para APIs
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Função para inicializar dados no localStorage
const initializeStorage = () => {
  if (typeof window === "undefined") return

  if (!localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(MOCK_USER_PROFILE))
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.USER_STATS)) {
    localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(MOCK_USER_STATS))
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATION_PREFERENCES)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATION_PREFERENCES, JSON.stringify(MOCK_NOTIFICATION_PREFERENCES))
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.USER_SESSIONS)) {
    localStorage.setItem(STORAGE_KEYS.USER_SESSIONS, JSON.stringify(MOCK_USER_SESSIONS))
  }
}

// Serviços do perfil
export const perfilService = {
  // Buscar dados do perfil
  async getUserProfile(): Promise<UserProfileData> {
    if (USE_API) {
      // TODO: Implementar chamada real para API
      const response = await fetch("/api/profile")
      return response.json()
    } else {
      // Simulação com localStorage
      await delay(800)
      initializeStorage()
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
      return data ? JSON.parse(data) : MOCK_USER_PROFILE
    }
  },

  // Atualizar perfil
  async updateUserProfile(profileData: UserProfileData): Promise<UserProfileData> {
    if (USE_API) {
      // TODO: Implementar chamada real para API
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      })
      return response.json()
    } else {
      // Simulação com localStorage
      await delay(1000)
      const updatedProfile = {
        ...profileData,
        totalEntries: profileData.totalEntries || 0,
        totalConsagracoes: profileData.totalConsagracoes || 0,
        totalReflexoes: profileData.totalReflexoes || 0,
      }
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile))
      return updatedProfile
    }
  },

  // Buscar estatísticas do usuário
  async getUserStats(): Promise<UserStatsData> {
    if (USE_API) {
      const response = await fetch("/api/profile/stats")
      return response.json()
    } else {
      await delay(600)
      initializeStorage()
      const data = localStorage.getItem(STORAGE_KEYS.USER_STATS)
      return data ? JSON.parse(data) : MOCK_USER_STATS
    }
  },

  // Alterar senha
  async changePassword(passwordData: ChangePasswordData): Promise<{ success: boolean; message: string }> {
    if (USE_API) {
      const response = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
      })
      return response.json()
    } else {
      await delay(1200)
      // Simulação de validação da senha atual
      if (passwordData.currentPassword !== "123456") {
        throw new Error("Senha atual incorreta")
      }
      return { success: true, message: "Senha alterada com sucesso!" }
    }
  },

  // Buscar preferências de notificação
  async getNotificationPreferences(): Promise<NotificationPreferencesData> {
    if (USE_API) {
      const response = await fetch("/api/profile/notifications")
      return response.json()
    } else {
      await delay(400)
      initializeStorage()
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATION_PREFERENCES)
      return data ? JSON.parse(data) : MOCK_NOTIFICATION_PREFERENCES
    }
  },

  // Atualizar preferências de notificação
  async updateNotificationPreferences(preferences: NotificationPreferencesData): Promise<NotificationPreferencesData> {
    if (USE_API) {
      const response = await fetch("/api/profile/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      })
      return response.json()
    } else {
      await delay(600)
      localStorage.setItem(STORAGE_KEYS.NOTIFICATION_PREFERENCES, JSON.stringify(preferences))
      return preferences
    }
  },

  // Buscar sessões ativas
  async getUserSessions(): Promise<any[]> {
    if (USE_API) {
      const response = await fetch("/api/profile/sessions")
      return response.json()
    } else {
      await delay(500)
      initializeStorage()
      const data = localStorage.getItem(STORAGE_KEYS.USER_SESSIONS)
      return data ? JSON.parse(data) : MOCK_USER_SESSIONS
    }
  },

  // Encerrar sessão
  async endSession(sessionId: string): Promise<{ success: boolean }> {
    if (USE_API) {
      const response = await fetch(`/api/profile/sessions/${sessionId}`, {
        method: "DELETE",
      })
      return response.json()
    } else {
      await delay(800)
      const sessions = await this.getUserSessions()
      const updatedSessions = sessions.filter(s => s.id !== sessionId)
      localStorage.setItem(STORAGE_KEYS.USER_SESSIONS, JSON.stringify(updatedSessions))
      return { success: true }
    }
  },

  // Exportar dados do usuário
  async exportUserData(): Promise<{ url: string }> {
    if (USE_API) {
      const response = await fetch("/api/profile/export", {
        method: "POST",
      })
      return response.json()
    } else {
      await delay(2000)
      // Simulação de geração de arquivo de exportação
      const allData = {
        profile: await this.getUserProfile(),
        stats: await this.getUserStats(),
        preferences: await this.getNotificationPreferences(),
        exportDate: new Date().toISOString(),
      }
      const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      return { url }
    }
  },

  // Upload de avatar
  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    if (USE_API) {
      const formData = new FormData()
      formData.append("avatar", file)
      const response = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      })
      return response.json()
    } else {
      await delay(1500)
      // Simulação de upload - criar URL temporária para o arquivo
      const avatarUrl = URL.createObjectURL(file)
      
      // Atualizar o perfil com a nova URL do avatar
      const currentProfile = await this.getUserProfile()
      const updatedProfile = { ...currentProfile, avatar: avatarUrl }
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile))
      
      return { avatarUrl }
    }
  },
}

import { UserProfileData, ChangePasswordData, NotificationPreferencesData, UserStatsData } from "@/schemas/perfil"
import { useUserStore } from "@/stores/userStore"

// Flag para alternar entre localStorage e API real
const USE_API = false

// Simulação de delay para APIs
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Serviços do perfil
export const perfilService = {
  // Buscar dados do perfil
  async getUserProfile(): Promise<UserProfileData> {
    if (USE_API) {
      // TODO: Implementar chamada real para API
      const response = await fetch("/api/profile")
      return response.json()
    } else {
      await delay(800)
      
      // Buscar do Zustand store
      const store = useUserStore.getState()
      const profile = store.profile
      const onboardingCompleted = store.onboardingCompleted
      const timelineItems = store.timelineItems
      const userStats = store.userStats
      
      console.log('DEBUG - Perfil Service Estado Zustand:', {
        hasProfile: !!profile,
        onboardingCompleted,
        profileData: profile
      })
      
      // Primeiro, tentar buscar dados do onboarding
      if (profile && onboardingCompleted) {
        const stats = userStats || {
          totalEntries: timelineItems.length,
          totalConsagracoes: timelineItems.filter(item => item.type === 'consagracao').length,
          totalReflexoes: timelineItems.filter(item => item.type === 'diario').length,
          streakDays: 7,
          lastActivity: new Date().toISOString()
        }
        
        return {
          name: profile.nome,
          nickname: profile.apelido || '',
          email: profile.email,
          bio: profile.bio || '',
          powerAnimal: profile.animalPoder || '',
          zodiacSign: profile.signo || '',
          spiritualJourney: profile.inicioJornada || '',
          experience: profile.tempoExperiencia || '',
          relationshipStatus: profile.estadoCivil || '',
          preference: profile.preferencia || '',
          secondaryAnimals: profile.animaisSecundarios || [],
          birthDate: profile.dataNascimento || '',
          ayahuascaExperience: profile.tempoExperiencia || '',
          stats: {
            totalEntries: stats.totalEntries,
            totalConsagracoes: stats.totalConsagracoes,
            totalReflexoes: stats.totalReflexoes,
            streakDays: stats.streakDays,
            lastActivity: stats.lastActivity
          }
        }
      }
      
      // Fallback: tentar buscar diretamente do localStorage
      if (typeof window !== 'undefined') {
        try {
          const directProfile = localStorage.getItem('diario_xamanico_user_profile')
          if (directProfile) {
            const parsedProfile = JSON.parse(directProfile)
            console.log('Perfil Service: Dados encontrados no localStorage direto:', parsedProfile)
            
            // Os dados já estão no formato correto
            return {
              name: parsedProfile.name || "Usuário",
              nickname: parsedProfile.nickname || '',
              email: parsedProfile.email || '',
              bio: parsedProfile.bio || '',
              powerAnimal: parsedProfile.powerAnimal || '',
              zodiacSign: parsedProfile.zodiacSign || '',
              spiritualJourney: parsedProfile.spiritualJourney || '',
              experience: parsedProfile.ayahuascaExperience || '',
              relationshipStatus: parsedProfile.civilStatus || '',
              preference: parsedProfile.preference || '',
              secondaryAnimals: parsedProfile.secondaryAnimals || [],
              birthDate: parsedProfile.birthDate || '',
              ayahuascaExperience: parsedProfile.ayahuascaExperience || '',
              stats: {
                totalEntries: parsedProfile.totalEntries || 0,
                totalConsagracoes: parsedProfile.totalConsagracoes || 0,
                totalReflexoes: parsedProfile.totalReflexoes || 0,
                streakDays: parsedProfile.streakDays || 0,
                lastActivity: parsedProfile.joinDate ? new Date().toISOString() : new Date().toISOString()
              }
            }
          }
        } catch (error) {
          console.error('Erro ao ler dados diretos do localStorage:', error)
        }
      }
      
      // Fallback para dados mock se não houver dados do onboarding
      return {
        name: "Usuário",
        nickname: "",
        email: "usuario@email.com",
        bio: "",
        powerAnimal: "Águia",
        zodiacSign: "",
        spiritualJourney: "",
        experience: "",
        relationshipStatus: "Solteiro(a)",
        preference: "Todos os humanos",
        secondaryAnimals: [],
        birthDate: "",
        ayahuascaExperience: "",
        stats: {
          totalEntries: 0,
          totalConsagracoes: 0,
          totalReflexoes: 0,
          streakDays: 0,
          lastActivity: new Date().toISOString()
        }
      }
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
      await delay(1000)
      
      // Atualizar no Zustand store
      useUserStore.getState().updateUserProfile(profileData)
      
      return profileData
    }
  },

  // Buscar estatísticas do usuário
  async getUserStats(): Promise<UserStatsData> {
    if (USE_API) {
      const response = await fetch("/api/profile/stats")
      return response.json()
    } else {
      await delay(600)
      
      // Buscar do Zustand store
      const stats = useUserStore.getState().userStats
      
      if (stats) {
        return stats
      }
      
      // Fallback para dados mock
      return {
        totalEntries: 0,
        totalConsagracoes: 0,
        totalReflexoes: 0,
        streakDays: 0,
        lastActivity: new Date().toISOString(),
      }
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
      
      // Buscar do Zustand store
      const prefs = useUserStore.getState().notificationPreferences
      
      if (prefs) {
        return prefs
      }
      
      // Fallback para dados padrão
      return {
        reminderNotifications: true,
        eventNotifications: true,
        publicProfile: false,
        dataSharing: true,
      }
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
      
      // Atualizar no Zustand store
      useUserStore.getState().updateNotificationPreferences(preferences)
      
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
      
      // Buscar do Zustand store
      return useUserStore.getState().userSessions
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
      
      // Remover do Zustand store
      useUserStore.getState().removeUserSession(sessionId)
      
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
      
      // Buscar todos os dados do Zustand store
      const store = useUserStore.getState()
      const allData = {
        profile: store.profile,
        timelineItems: store.timelineItems,
        userStats: store.userStats,
        notificationPreferences: store.notificationPreferences,
        userSessions: store.userSessions,
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
      const store = useUserStore.getState()
      if (store.profile) {
        store.setProfile({ 
          ...store.profile, 
          photo: avatarUrl as any // URL string para avatar atualizado
        })
      }
      
      return { avatarUrl }
    }
  },
}

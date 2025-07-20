import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { FormData as OnboardingFormData } from '@/schemas/onboarding'
import type { UserProfileData, UserStatsData, NotificationPreferencesData } from '@/schemas/perfil'
import type { UserData, TimelineItemData } from '@/schemas/dashboard'

// ============= TIPOS =============

interface UserSession {
  id: string
  device: string
  location: string
  lastActive: string
  isCurrent: boolean
}

interface UserState {
  // ========== DADOS PRINCIPAIS ==========
  
  // Dados do onboarding (fonte da verdade)
  profile: OnboardingFormData | null
  onboardingCompleted: boolean
  
  // Timeline de experiências
  timelineItems: TimelineItemData[]
  
  // Estatísticas do usuário
  userStats: UserStatsData | null
  
  // Preferências de notificação
  notificationPreferences: NotificationPreferencesData | null
  
  // Sessões do usuário
  userSessions: UserSession[]
  
  // ========== ESTADOS DE LOADING ==========
  isLoading: boolean
  
  // ========== ACTIONS - ONBOARDING ==========
  setProfile: (profile: OnboardingFormData) => void
  completeOnboarding: () => void
  clearOnboarding: () => void
  
  // ========== ACTIONS - TIMELINE ==========
  addTimelineItem: (item: TimelineItemData) => void
  updateTimelineItem: (id: string, updates: Partial<TimelineItemData>) => void
  deleteTimelineItem: (id: string) => void
  setTimelineItems: (items: TimelineItemData[]) => void
  
  // ========== ACTIONS - PERFIL ==========
  updateUserProfile: (updates: Partial<UserProfileData>) => void
  updateUserStats: (stats: UserStatsData) => void
  updateNotificationPreferences: (prefs: NotificationPreferencesData) => void
  addUserSession: (session: UserSession) => void
  removeUserSession: (sessionId: string) => void
  
  // ========== UTILITIES ==========
  setLoading: (loading: boolean) => void
  clearAllData: () => void
  syncStats: () => void
}

// ============= DADOS PADRÃO =============

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
]

const getDefaultNotificationPreferences = (): NotificationPreferencesData => ({
  reminderNotifications: true,
  eventNotifications: true,
  publicProfile: false,
  dataSharing: true,
})

const getDefaultUserSessions = (): UserSession[] => [
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
    lastActive: "Há 2 horas",
    isCurrent: false,
  },
]

// ============= STORE PRINCIPAL =============

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // ========== ESTADO INICIAL ==========
      profile: null,
      onboardingCompleted: false,
      timelineItems: [],
      userStats: null,
      notificationPreferences: null,
      userSessions: [],
      isLoading: false,

      // ========== ONBOARDING ACTIONS ==========
      
      setProfile: (profile: OnboardingFormData) => {
        set({ profile })
        
        // Auto-sync stats quando profile é atualizado
        get().syncStats()
      },

      completeOnboarding: () => {
        set({ onboardingCompleted: true })
        
        // Inicializar dados padrão
        const state = get()
        if (!state.timelineItems.length) {
          set({ timelineItems: getDefaultTimelineItems() })
        }
        if (!state.notificationPreferences) {
          set({ notificationPreferences: getDefaultNotificationPreferences() })
        }
        if (!state.userSessions.length) {
          set({ userSessions: getDefaultUserSessions() })
        }
        
        get().syncStats()
      },

      clearOnboarding: () => {
        set({ 
          profile: null, 
          onboardingCompleted: false,
          timelineItems: [],
          userStats: null,
          notificationPreferences: null,
          userSessions: []
        })
      },

      // ========== TIMELINE ACTIONS ==========
      
      addTimelineItem: (item: TimelineItemData) => {
        set((state) => ({
          timelineItems: [item, ...state.timelineItems]
        }))
        
        // Auto-sync stats
        get().syncStats()
      },

      updateTimelineItem: (id: string, updates: Partial<TimelineItemData>) => {
        set((state) => ({
          timelineItems: state.timelineItems.map(item => 
            item.id === id ? { ...item, ...updates } : item
          )
        }))
        
        get().syncStats()
      },

      deleteTimelineItem: (id: string) => {
        set((state) => ({
          timelineItems: state.timelineItems.filter(item => item.id !== id)
        }))
        
        get().syncStats()
      },

      setTimelineItems: (items: TimelineItemData[]) => {
        set({ timelineItems: items })
        get().syncStats()
      },

      // ========== PERFIL ACTIONS ==========
      
      updateUserProfile: (updates: Partial<UserProfileData>) => {
        const state = get()
        if (state.profile) {
          // Atualizar profile base se necessário
          const profileUpdates: Partial<OnboardingFormData> = {}
          
          if (updates.name) profileUpdates.nome = updates.name
          if (updates.nickname) profileUpdates.apelido = updates.nickname
          if (updates.email) profileUpdates.email = updates.email
          if (updates.bio) profileUpdates.bio = updates.bio
          
          set({ 
            profile: { ...state.profile, ...profileUpdates }
          })
        }
      },

      updateUserStats: (stats: UserStatsData) => {
        set({ userStats: stats })
      },

      updateNotificationPreferences: (prefs: NotificationPreferencesData) => {
        set({ notificationPreferences: prefs })
      },

      addUserSession: (session: UserSession) => {
        set((state) => ({
          userSessions: [...state.userSessions, session]
        }))
      },

      removeUserSession: (sessionId: string) => {
        set((state) => ({
          userSessions: state.userSessions.filter(session => session.id !== sessionId)
        }))
      },

      // ========== UTILITIES ==========
      
      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      clearAllData: () => {
        set({
          profile: null,
          onboardingCompleted: false,
          timelineItems: [],
          userStats: null,
          notificationPreferences: null,
          userSessions: [],
          isLoading: false
        })
      },

      // Sincronizar estatísticas baseado nos dados atuais
      syncStats: () => {
        const state = get()
        
        const stats: UserStatsData = {
          totalEntries: state.timelineItems.length,
          totalConsagracoes: state.timelineItems.filter(item => item.type === 'consagracao').length,
          totalReflexoes: state.timelineItems.filter(item => item.type === 'diario').length,
          streakDays: 7, // TODO: calcular streak real
          lastActivity: new Date().toISOString()
        }
        
        set({ userStats: stats })
      }
    }),
    {
      name: 'diario-xamanico-storage', // Chave única no localStorage
      storage: createJSONStorage(() => localStorage),
      
      // Não persistir estados temporários
      partialize: (state) => ({
        profile: state.profile,
        onboardingCompleted: state.onboardingCompleted,
        timelineItems: state.timelineItems,
        userStats: state.userStats,
        notificationPreferences: state.notificationPreferences,
        userSessions: state.userSessions,
        // isLoading não é persistido
      }),
      
      version: 1,
    }
  )
)

// ============= HOOKS ESPECÍFICOS =============

// Hook para dados do onboarding
export const useOnboarding = () => {
  const profile = useUserStore(state => state.profile)
  const completed = useUserStore(state => state.onboardingCompleted)
  const setProfile = useUserStore(state => state.setProfile)
  const completeOnboarding = useUserStore(state => state.completeOnboarding)
  const clearOnboarding = useUserStore(state => state.clearOnboarding)
  
  return {
    profile,
    completed,
    setProfile,
    completeOnboarding,
    clearOnboarding
  }
}

// Hook para dados do dashboard
export const useDashboard = () => {
  const profile = useUserStore(state => state.profile)
  const onboardingCompleted = useUserStore(state => state.onboardingCompleted)
  const timelineItems = useUserStore(state => state.timelineItems)
  const addTimelineItem = useUserStore(state => state.addTimelineItem)
  const updateTimelineItem = useUserStore(state => state.updateTimelineItem)
  const deleteTimelineItem = useUserStore(state => state.deleteTimelineItem)
  const setTimelineItems = useUserStore(state => state.setTimelineItems)
  const isLoading = useUserStore(state => state.isLoading)
  const setLoading = useUserStore(state => state.setLoading)
  
  // Compute user data only when needed
  const user = profile && onboardingCompleted ? {
    name: profile.nome,
    avatar: typeof profile.photo === 'string' ? profile.photo : '/profile.jpg',
    powerAnimal: profile.animalPoder || 'Águia',
    lastActivity: 'Agora'
  } : null
  
  return {
    user,
    timelineItems,
    addTimelineItem,
    updateTimelineItem,
    deleteTimelineItem,
    setTimelineItems,
    isLoading,
    setLoading
  }
}

// Hook para dados do perfil
export const usePerfil = () => {
  const profile = useUserStore(state => state.profile)
  const onboardingCompleted = useUserStore(state => state.onboardingCompleted)
  const timelineItems = useUserStore(state => state.timelineItems)
  const userStats = useUserStore(state => state.userStats)
  const notificationPreferences = useUserStore(state => state.notificationPreferences)
  const userSessions = useUserStore(state => state.userSessions)
  const updateUserProfile = useUserStore(state => state.updateUserProfile)
  const updateNotificationPreferences = useUserStore(state => state.updateNotificationPreferences)
  const removeUserSession = useUserStore(state => state.removeUserSession)
  const isLoading = useUserStore(state => state.isLoading)
  const setLoading = useUserStore(state => state.setLoading)
  
  // Compute user data only when needed
  const user = profile && onboardingCompleted ? (() => {
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
      stats
    }
  })() : null
  
  return {
    user,
    userStats,
    notificationPreferences,
    userSessions,
    updateUserProfile,
    updateNotificationPreferences,
    removeUserSession,
    isLoading,
    setLoading
  }
}

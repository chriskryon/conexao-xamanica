import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { FormData as OnboardingFormData } from '@/schemas/onboarding'
import type { UserProfileData } from '@/schemas/perfil'
import type { UserData, TimelineItemData } from '@/schemas/dashboard'

// ============= TIPOS =============

interface UserState {
  // Dados do usuário
  profile: OnboardingFormData | null
  dashboardUser: UserData | null
  perfilUser: UserProfileData | null
  
  // Estado do onboarding
  onboardingCompleted: boolean
  
  // Timeline
  timelineItems: TimelineItemData[]
  
  // Estados de loading
  isLoading: boolean
  
  // ============= ACTIONS =============
  
  // Onboarding
  setProfile: (profile: OnboardingFormData) => void
  completeOnboarding: () => void
  clearOnboarding: () => void
  
  // Dashboard
  setDashboardUser: (user: UserData) => void
  addTimelineItem: (item: TimelineItemData) => void
  updateTimelineItem: (id: string, updates: Partial<TimelineItemData>) => void
  deleteTimelineItem: (id: string) => void
  setTimelineItems: (items: TimelineItemData[]) => void
  
  // Perfil
  setPerfilUser: (user: UserProfileData) => void
  
  // Loading
  setLoading: (loading: boolean) => void
  
  // Utilitários
  clearAllData: () => void
  syncData: () => void
}

// ============= STORE COM PERSISTÊNCIA =============

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      profile: null,
      dashboardUser: null,
      perfilUser: null,
      onboardingCompleted: false,
      timelineItems: [],
      isLoading: false,

      // ============= ONBOARDING ACTIONS =============
      
      setProfile: (profile) => {
        set({ profile })
        
        // Auto-sync: criar dados para dashboard e perfil
        const state = get()
        state.syncData()
      },

      completeOnboarding: () => {
        set({ onboardingCompleted: true })
      },

      clearOnboarding: () => {
        set({ 
          profile: null, 
          onboardingCompleted: false 
        })
      },

      // ============= DASHBOARD ACTIONS =============
      
      setDashboardUser: (user) => {
        set({ dashboardUser: user })
      },

      addTimelineItem: (item) => {
        set((state) => ({
          timelineItems: [item, ...state.timelineItems]
        }))
      },

      updateTimelineItem: (id, updates) => {
        set((state) => ({
          timelineItems: state.timelineItems.map(item => 
            item.id === id ? { ...item, ...updates } : item
          )
        }))
      },

      deleteTimelineItem: (id) => {
        set((state) => ({
          timelineItems: state.timelineItems.filter(item => item.id !== id)
        }))
      },

      setTimelineItems: (items) => {
        set({ timelineItems: items })
      },

      // ============= PERFIL ACTIONS =============
      
      setPerfilUser: (user) => {
        set({ perfilUser: user })
      },

      // ============= LOADING =============
      
      setLoading: (loading) => {
        set({ isLoading: loading })
      },

      // ============= UTILITÁRIOS =============
      
      clearAllData: () => {
        set({
          profile: null,
          dashboardUser: null,
          perfilUser: null,
          onboardingCompleted: false,
          timelineItems: [],
          isLoading: false
        })
      },

      // Sincronizar dados entre diferentes formatos
      syncData: () => {
        const state = get()
        
        if (state.profile && state.onboardingCompleted) {
          // Criar user do dashboard baseado no profile
          const dashboardUser: UserData = {
            name: state.profile.nome,
            avatar: typeof state.profile.photo === 'string' ? state.profile.photo : '/placeholder.svg?height=80&width=80',
            powerAnimal: state.profile.animalPoder || 'Águia',
            lastActivity: 'Agora'
          }
          
          // Criar user do perfil baseado no profile
          const perfilUser: UserProfileData = {
            name: state.profile.nome,
            nickname: state.profile.apelido || '',
            email: state.profile.email,
            bio: state.profile.bio || '',
            powerAnimal: state.profile.animalPoder || '',
            civilStatus: state.profile.estadoCivil,
            preference: state.profile.preferencia,
            avatar: typeof state.profile.photo === 'string' ? state.profile.photo : '/placeholder.svg?height=120&width=120',
            birthDate: state.profile.dataNascimento,
            zodiacSign: state.profile.signo || '',
            ayahuascaExperience: state.profile.tempoExperiencia || '',
            joinDate: new Date().toLocaleDateString('pt-BR', { 
              year: 'numeric', 
              month: 'long' 
            }),
            totalEntries: state.timelineItems.length,
            totalConsagracoes: state.timelineItems.filter(item => item.type === 'consagracao').length,
            totalReflexoes: state.timelineItems.filter(item => item.type === 'diario').length,
          }
          
          set({ 
            dashboardUser,
            perfilUser 
          })
        }
      }
    }),
    {
      name: 'diario-xamanico-storage', // nome da chave no localStorage
      storage: createJSONStorage(() => localStorage),
      
      // Particionar dados (opcional - para performance)
      partialize: (state) => ({
        profile: state.profile,
        onboardingCompleted: state.onboardingCompleted,
        timelineItems: state.timelineItems,
        // Não persistir estados de loading
      }),
      
      // Versioning para migrações
      version: 1,
      
      // Migração de versões antigas (se necessário)
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migrar dados da versão 0 para 1
          return {
            ...persistedState,
            // novas propriedades ou transformações
          }
        }
        return persistedState as UserState
      },
    }
  )
)

// ============= HOOKS ESPECÍFICOS (OPCIONAL) =============

// Hook para dados do onboarding
export const useOnboarding = () => {
  const profile = useUserStore(state => state.profile)
  const completed = useUserStore(state => state.onboardingCompleted)
  const setProfile = useUserStore(state => state.setProfile)
  const completeOnboarding = useUserStore(state => state.completeOnboarding)
  
  return {
    profile,
    completed,
    setProfile,
    completeOnboarding
  }
}

// Hook para dados do dashboard
export const useDashboard = () => {
  const user = useUserStore(state => state.dashboardUser)
  const timelineItems = useUserStore(state => state.timelineItems)
  const addTimelineItem = useUserStore(state => state.addTimelineItem)
  const updateTimelineItem = useUserStore(state => state.updateTimelineItem)
  const deleteTimelineItem = useUserStore(state => state.deleteTimelineItem)
  
  return {
    user,
    timelineItems,
    addTimelineItem,
    updateTimelineItem,
    deleteTimelineItem
  }
}

// Hook para dados do perfil
export const usePerfil = () => {
  const user = useUserStore(state => state.perfilUser)
  const setUser = useUserStore(state => state.setPerfilUser)
  const syncData = useUserStore(state => state.syncData)
  
  return {
    user,
    setUser,
    syncData
  }
}

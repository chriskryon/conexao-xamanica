import type { FormData as OnboardingFormData } from "@/schemas/onboarding"

// Configuração - fácil trocar depois
const USE_API = false // Trocar para true quando tiver API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Chaves padronizadas do localStorage
const STORAGE_KEYS = {
  USER_PROFILE: "diario_xamanico_user_profile",
  ONBOARDING_COMPLETED: "diario_xamanico_onboarding_completed",
} as const

// Simuladores localStorage
const localStorageSimulator = {
  // Simular envio de onboarding
  submitOnboarding: async (data: OnboardingFormData): Promise<{ success: boolean; user: any }> => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Salvar no localStorage como "usuário criado"
    const userData = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
      photo: data.photo ? `photo-${Date.now()}.jpg` : null // Simular URL da foto
    }
    
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(userData))
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true')
    
    // Simular resposta da API
    return {
      success: true,
      user: userData
    }
  },

  // Simular verificação de email
  checkEmailAvailability: async (email: string): Promise<{ available: boolean }> => {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Emails "já cadastrados" para testar
    const usedEmails = ['teste@email.com', 'admin@test.com', 'user@example.com']
    
    return {
      available: !usedEmails.includes(email.toLowerCase())
    }
  },

  // Simular upload de foto
  uploadPhoto: async (file: File): Promise<{ url: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simular URL da foto
    return {
      url: `https://exemplo.com/uploads/${Date.now()}-${file.name}`
    }
  }
}

// Serviços reais da API (para quando trocar)
const apiServices = {
  // Submeter onboarding
  submitOnboarding: async (data: OnboardingFormData): Promise<{ success: boolean; user: any }> => {
    const formData = new FormData()
    
    // Adicionar todos os campos do formulário
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'photo' && value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, String(value))
        }
      }
    })

    const response = await fetch(`${API_BASE_URL}/onboarding`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Erro ao enviar dados do onboarding')
    }

    return response.json()
  },

  // Validar email único
  checkEmailAvailability: async (email: string): Promise<{ available: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/users/check-email?email=${encodeURIComponent(email)}`)
    
    if (!response.ok) {
      throw new Error('Erro ao verificar email')
    }

    return response.json()
  },

  // Upload de foto separado (opcional)
  uploadPhoto: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData()
    formData.append('photo', file)

    const response = await fetch(`${API_BASE_URL}/upload/photo`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Erro ao fazer upload da foto')
    }

    return response.json()
  },
}

// Exportar serviços baseado na configuração
export const onboardingService = USE_API ? apiServices : localStorageSimulator

// Função para trocar facilmente
export const switchToAPI = () => {
  console.log('🚀 Para usar API, mude USE_API para true em src/services/onboarding.ts')
}

// Função para verificar dados salvos
export const getStoredUserData = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
    const completed = localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED)
    
    return {
      userData: userData ? JSON.parse(userData) : null,
      completed: completed === 'true'
    }
  }
  return { userData: null, completed: false }
}

// Funções auxiliares para outros serviços acessarem os dados
export const onboardingStorage = {
  // Buscar dados do perfil salvo no onboarding
  getProfile: (): OnboardingFormData | null => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
      return stored ? JSON.parse(stored) : null
    }
    return null
  },

  // Verificar se onboarding foi completado
  isCompleted: (): boolean => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED) === 'true'
    }
    return false
  },

  // Limpar dados (util para logout)
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE)
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED)
    }
  }
}

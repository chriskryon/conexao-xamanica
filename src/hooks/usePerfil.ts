import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { perfilService } from "@/services/perfil"
import { UserProfileData, ChangePasswordData, NotificationPreferencesData } from "@/schemas/perfil"

// Query keys
const QUERY_KEYS = {
  USER_PROFILE: ["userProfile"],
  USER_STATS: ["userStats"],
  NOTIFICATION_PREFERENCES: ["notificationPreferences"],
  USER_SESSIONS: ["userSessions"],
}

// Hook para buscar dados do perfil
export const useUserProfile = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USER_PROFILE,
    queryFn: perfilService.getUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// Hook para buscar estatísticas do usuário
export const useUserStats = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USER_STATS,
    queryFn: perfilService.getUserStats,
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

// Hook para buscar preferências de notificação
export const useNotificationPreferences = () => {
  return useQuery({
    queryKey: QUERY_KEYS.NOTIFICATION_PREFERENCES,
    queryFn: perfilService.getNotificationPreferences,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

// Hook para buscar sessões do usuário
export const useUserSessions = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USER_SESSIONS,
    queryFn: perfilService.getUserSessions,
    staleTime: 1 * 60 * 1000, // 1 minuto
  })
}

// Hook para atualizar perfil
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (profileData: UserProfileData) => perfilService.updateUserProfile(profileData),
    onSuccess: (data) => {
      // Atualizar cache do perfil
      queryClient.setQueryData(QUERY_KEYS.USER_PROFILE, data)
      
      // Invalidar estatísticas que podem ter mudado
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_STATS })
    },
    onError: (error) => {
      console.error("Erro ao atualizar perfil:", error)
    },
  })
}

// Hook para alterar senha
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (passwordData: ChangePasswordData) => perfilService.changePassword(passwordData),
    onError: (error) => {
      console.error("Erro ao alterar senha:", error)
    },
  })
}

// Hook para atualizar preferências de notificação
export const useUpdateNotificationPreferences = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (preferences: NotificationPreferencesData) => 
      perfilService.updateNotificationPreferences(preferences),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.NOTIFICATION_PREFERENCES, data)
    },
    onError: (error) => {
      console.error("Erro ao atualizar preferências:", error)
    },
  })
}

// Hook para encerrar sessão
export const useEndSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (sessionId: string) => perfilService.endSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_SESSIONS })
    },
    onError: (error) => {
      console.error("Erro ao encerrar sessão:", error)
    },
  })
}

// Hook para exportar dados
export const useExportUserData = () => {
  return useMutation({
    mutationFn: () => perfilService.exportUserData(),
    onSuccess: (data) => {
      // Criar link de download
      const link = document.createElement("a")
      link.href = data.url
      link.download = `diario-xamanico-backup-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    onError: (error) => {
      console.error("Erro ao exportar dados:", error)
    },
  })
}

// Hook para upload de avatar
export const useUploadAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => perfilService.uploadAvatar(file),
    onSuccess: (data) => {
      // Atualizar o cache do perfil com a nova URL do avatar
      queryClient.setQueryData(QUERY_KEYS.USER_PROFILE, (oldData: UserProfileData | undefined) => {
        if (oldData) {
          return { ...oldData, avatar: data.avatarUrl }
        }
        return oldData
      })
    },
    onError: (error) => {
      console.error("Erro ao fazer upload do avatar:", error)
    },
  })
}

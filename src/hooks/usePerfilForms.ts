import { useState, useEffect, useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  userProfileSchema, 
  changePasswordSchema, 
  notificationPreferencesSchema,
  UserProfileData,
  ChangePasswordData,
  NotificationPreferencesData
} from "@/schemas/perfil"
import { 
  useUserProfile,
  useUserStats,
  useNotificationPreferences,
  useUserSessions,
  useUpdateUserProfile,
  useChangePassword,
  useUpdateNotificationPreferences,
  useEndSession,
  useExportUserData,
  useUploadAvatar
} from "./usePerfil"

export const usePerfilForms = () => {
  // Estados locais
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  // Queries
  const userProfileQuery = useUserProfile()
  const userStatsQuery = useUserStats()
  const notificationPreferencesQuery = useNotificationPreferences()
  const userSessionsQuery = useUserSessions()

  // Mutations
  const updateProfileMutation = useUpdateUserProfile()
  const changePasswordMutation = useChangePassword()
  const updateNotificationsMutation = useUpdateNotificationPreferences()
  const endSessionMutation = useEndSession()
  const exportDataMutation = useExportUserData()
  const uploadAvatarMutation = useUploadAvatar()

  // Form para perfil do usuário
  const profileForm = useForm<any>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      bio: "",
      powerAnimal: "Águia",
      civilStatus: "Solteiro(a)",
      preference: "Todos os humanos",
    },
  })

  // Form para alteração de senha
  const passwordForm = useForm<any>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  // Form para preferências de notificação
  const notificationsForm = useForm<any>({
    resolver: zodResolver(notificationPreferencesSchema),
    defaultValues: {
      reminderNotifications: true,
      eventNotifications: true,
      publicProfile: false,
      dataSharing: true,
    },
  })

  // Atualizar forms quando os dados chegarem usando useEffect
  useEffect(() => {
    if (userProfileQuery.data && !isEditing) {
      profileForm.reset(userProfileQuery.data)
    }
  }, [userProfileQuery.data, isEditing, profileForm.reset])

  useEffect(() => {
    if (notificationPreferencesQuery.data) {
      notificationsForm.reset(notificationPreferencesQuery.data)
    }
  }, [notificationPreferencesQuery.data, notificationsForm.reset])

  // Handlers do perfil
  const handleEditProfile = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false)
    if (userProfileQuery.data) {
      profileForm.reset(userProfileQuery.data)
    }
  }, [userProfileQuery.data, profileForm])

  const handleSaveProfile = useCallback(async (data: any) => {
    try {
      await updateProfileMutation.mutateAsync(data)
      setIsEditing(false)
    } catch (error) {
      console.error("Erro ao salvar perfil:", error)
    }
  }, [updateProfileMutation])

  // Handler para upload de avatar
  const handleAvatarUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        await uploadAvatarMutation.mutateAsync(file)
      } catch (error) {
        console.error("Erro ao fazer upload do avatar:", error)
      }
    }
  }, [uploadAvatarMutation])

  // Handler para alteração de senha
  const handleChangePassword = useCallback(async (data: any) => {
    try {
      await changePasswordMutation.mutateAsync(data)
      passwordForm.reset()
    } catch (error) {
      console.error("Erro ao alterar senha:", error)
    }
  }, [changePasswordMutation, passwordForm])

  // Handler para atualizar preferências de notificação
  const handleUpdateNotifications = useCallback(async (field: keyof NotificationPreferencesData, value: boolean) => {
    const currentData = notificationsForm.getValues()
    const updatedData = { ...currentData, [field]: value }
    
    try {
      await updateNotificationsMutation.mutateAsync(updatedData)
      notificationsForm.setValue(field, value)
    } catch (error) {
      console.error("Erro ao atualizar preferências:", error)
    }
  }, [updateNotificationsMutation, notificationsForm])

  // Handler para encerrar sessão
  const handleEndSession = useCallback(async (sessionId: string) => {
    try {
      await endSessionMutation.mutateAsync(sessionId)
    } catch (error) {
      console.error("Erro ao encerrar sessão:", error)
    }
  }, [endSessionMutation])

  // Handler para exportar dados
  const handleExportData = useCallback(async () => {
    try {
      await exportDataMutation.mutateAsync()
    } catch (error) {
      console.error("Erro ao exportar dados:", error)
    }
  }, [exportDataMutation])

  // Handler para mudança de aba
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  // Handlers de submit dos formulários
  const handleSubmitProfile = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    profileForm.handleSubmit(handleSaveProfile)(e)
  }, [profileForm, handleSaveProfile])

  const handleSubmitPassword = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    passwordForm.handleSubmit(handleChangePassword)(e)
  }, [passwordForm, handleChangePassword])

  return {
    // Estados
    isEditing,
    activeTab,

    // Handlers
    handleEditProfile,
    handleCancelEdit,
    handleSubmitProfile,
    handleAvatarUpload,
    handleSubmitPassword,
    handleUpdateNotifications,
    handleEndSession,
    handleExportData,
    handleTabChange,

    // Forms
    profileForm,
    passwordForm,
    notificationsForm,

    // Dados das queries
    userProfile: userProfileQuery.data,
    userStats: userStatsQuery.data,
    notificationPreferences: notificationPreferencesQuery.data,
    userSessions: userSessionsQuery.data,

    // Estados de loading
    isLoadingProfile: userProfileQuery.isLoading,
    isLoadingStats: userStatsQuery.isLoading,
    isLoadingNotifications: notificationPreferencesQuery.isLoading,
    isLoadingSessions: userSessionsQuery.isLoading,

    // Estados de submissão
    isSubmittingProfile: updateProfileMutation.isPending,
    isSubmittingPassword: changePasswordMutation.isPending,
    isSubmittingNotifications: updateNotificationsMutation.isPending,
    isUploadingAvatar: uploadAvatarMutation.isPending,
    isEndingSession: endSessionMutation.isPending,
    isExportingData: exportDataMutation.isPending,

    // Estados de erro
    profileError: userProfileQuery.error,
    statsError: userStatsQuery.error,
    notificationsError: notificationPreferencesQuery.error,
    sessionsError: userSessionsQuery.error,

    // Estados de sucesso das mutations
    profileUpdateSuccess: updateProfileMutation.isSuccess,
    passwordChangeSuccess: changePasswordMutation.isSuccess,
    notificationUpdateSuccess: updateNotificationsMutation.isSuccess,
    avatarUploadSuccess: uploadAvatarMutation.isSuccess,
  }
}

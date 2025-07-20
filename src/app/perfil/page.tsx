"use client"

import PerfilBackground from "@/components/perfil/PerfilBackground"
import PerfilHeader from "@/components/perfil/PerfilHeader"
import PerfilCard from "@/components/perfil/PerfilCard"
import PerfilTabs from "@/components/perfil/PerfilTabs"
import InformacoesPessoaisTab from "@/components/perfil/InformacoesPessoaisTab"
import SegurancaTab from "@/components/perfil/SegurancaTab"
import PreferenciasTab from "@/components/perfil/PreferenciasTab"
import { usePerfilForms } from "@/hooks/usePerfilForms"

export default function PerfilPage() {
  const {
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

    // Dados das queries
    userProfile,
    userStats,
    notificationPreferences,
    userSessions,

    // Estados de loading
    isLoadingProfile,

    // Estados de submissão
    isSubmittingProfile,
    isSubmittingPassword,
    isUploadingAvatar,
    isEndingSession,
    isExportingData,
  } = usePerfilForms()

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E4A2F] mx-auto mb-4"></div>
          <p className="text-[#2C4A7E] font-sans">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] relative overflow-x-hidden">
      {/* Background Particles */}
      <PerfilBackground />

      {/* Header */}
      <PerfilHeader
        isEditing={isEditing}
        isSubmitting={isSubmittingProfile}
        onEdit={handleEditProfile}
        onCancel={handleCancelEdit}
        onSave={handleSubmitProfile}
      />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <PerfilCard
              user={userProfile}
              stats={userStats}
              isEditing={isEditing}
              isUploadingAvatar={isUploadingAvatar}
              onAvatarUpload={handleAvatarUpload}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <PerfilTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <form onSubmit={handleSubmitProfile}>
                <InformacoesPessoaisTab
                  register={profileForm.register}
                  errors={profileForm.formState.errors}
                  isEditing={isEditing}
                  userData={userProfile}
                />
              </form>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <SegurancaTab
                register={passwordForm.register}
                errors={passwordForm.formState.errors}
                isSubmittingPassword={isSubmittingPassword}
                onSubmitPassword={handleSubmitPassword}
                userSessions={userSessions || []}
                onEndSession={handleEndSession}
                isEndingSession={isEndingSession}
              />
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <PreferenciasTab
                notificationPreferences={notificationPreferences}
                onUpdateNotifications={handleUpdateNotifications}
                onExportData={handleExportData}
                isExportingData={isExportingData}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

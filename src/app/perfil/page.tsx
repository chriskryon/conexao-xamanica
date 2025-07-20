"use client"

import { Icon } from "@iconify/react"
import PerfilBackground from "@/components/perfil/PerfilBackground"
import CommonHeader from "@/components/shared/CommonHeader"
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
      <CommonHeader 
        title="Meu Perfil"
        subtitle="Gerencie suas informações"
        showProfile={false}
        rightContent={
          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button
                onClick={handleEditProfile}
                className="btn-secondary px-4 py-2 text-sm hover:scale-105 transition-all duration-300"
              >
                <Icon icon="mdi:pencil" className="w-4 h-4 inline mr-2" />
                Editar Perfil
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancelEdit}
                  disabled={isSubmittingProfile}
                  className="btn-secondary px-4 py-2 text-sm hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitProfile}
                  disabled={isSubmittingProfile}
                  className="btn-primary px-4 py-2 text-sm hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmittingProfile ? (
                    <>
                      <Icon icon="mdi:loading" className="w-4 h-4 inline mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:content-save" className="w-4 h-4 inline mr-2" />
                      Salvar
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        }
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

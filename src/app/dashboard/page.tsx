"use client"

import { useEffect } from "react"
import DashboardBackground from "@/components/dashboard/DashboardBackground"
import CommonHeader from "@/components/shared/CommonHeader"
import ActionCards from "@/components/dashboard/ActionCards"
import ConsagracaoModal from "@/components/dashboard/ConsagracaoModal"
import DiarioModal from "@/components/dashboard/DiarioModal"
import Timeline from "@/components/dashboard/Timeline"
import ErrorBoundary from "@/components/shared/ErrorBoundary"
import { useDashboardForms } from "@/hooks/useDashboardForms"

function DashboardContent() {
  const {
    // Estado dos modais
    showConsagracaoModal,
    showDiarioModal,
    selectedTimelineItem,
    
    // Handlers dos modais
    openConsagracaoModal,
    openDiarioModal,
    closeModals,
    
    // Forms
    consagracaoForm,
    diarioForm,
    
    // Handlers específicos
    handleIntensityClick,
    handleFileUpload,
    removeFile,
    handleSubmitConsagracao,
    handleMoodSelect,
    newTag,
    setNewTag,
    addTag,
    removeTag,
    handleKeyPress,
    handleSubmitDiario,
    handleTimelineClick,
    
    // Dados
    user,
    timelineItems,
    
    // Estados de loading
    isLoadingUser,
    isLoadingTimeline,
  } = useDashboardForms()

  // Debug log para identificar problemas
  useEffect(() => {
    console.log('Dashboard render:', {
      isLoadingUser,
      isLoadingTimeline,
      hasUser: !!user,
      userProfile: user ? { name: user.name, avatar: user.avatar } : null,
      timelineItemsCount: timelineItems?.length || 0,
      location: typeof window !== 'undefined' ? window.location.href : 'SSR'
    })
  }, [isLoadingUser, isLoadingTimeline, user, timelineItems])

  // Loading state com timeout de segurança
  if (isLoadingUser || isLoadingTimeline) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E4A2F] mx-auto mb-4"></div>
          <p className="text-[#2C4A7E] font-sans">Carregando dados...</p>
          <p className="text-[#2C4A7E] text-sm mt-2 opacity-70">
            {isLoadingUser && "Carregando usuário..."} 
            {isLoadingTimeline && "Carregando timeline..."}
          </p>
        </div>
      </div>
    )
  }

  // Fallback se não conseguir carregar o usuário
  if (!user) {
    console.warn('Dashboard: Usuário não encontrado')
    
    // Redirecionamento automático para onboarding após um tempo
    useEffect(() => {
      const timer = setTimeout(() => {
        console.log('Redirecionando para onboarding...')
        window.location.href = '/onboarding'
      }, 3000)
      
      return () => clearTimeout(timer)
    }, [])
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#2C4A7E] mb-4">⚠️ Dados do usuário não encontrados</div>
          <p className="text-[#2C4A7E] text-sm mb-6 opacity-70">
            Redirecionando para configuração inicial em 3 segundos...
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/onboarding'}
              className="btn-primary px-6 py-3"
            >
              Ir para Configuração
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-secondary px-6 py-3"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] relative overflow-x-hidden">
      {/* Background Particles */}
      <DashboardBackground />

      {/* Header */}
      <CommonHeader 
        title="Diário Xamânico"
        subtitle="Dashboard Espiritual"
        user={user}
      />

      {/* Modals */}
      <ConsagracaoModal
        isOpen={showConsagracaoModal}
        onClose={closeModals}
        onSubmit={handleSubmitConsagracao}
        register={consagracaoForm.register}
        errors={consagracaoForm.formState.errors}
        watch={consagracaoForm.watch}
        onIntensityClick={handleIntensityClick}
        onFileUpload={handleFileUpload}
        onRemoveFile={removeFile}
      />

      <DiarioModal
        isOpen={showDiarioModal}
        onClose={closeModals}
        onSubmit={handleSubmitDiario}
        register={diarioForm.register}
        errors={diarioForm.formState.errors}
        watch={diarioForm.watch}
        onMoodSelect={handleMoodSelect}
        newTag={newTag}
        setNewTag={setNewTag}
        onAddTag={addTag}
        onRemoveTag={removeTag}
        onKeyPress={handleKeyPress}
      />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Action Cards */}
        <ActionCards
          onOpenConsagracao={openConsagracaoModal}
          onOpenDiario={openDiarioModal}
        />

        {/* Timeline */}
        <Timeline
          items={timelineItems}
          selectedItem={selectedTimelineItem}
          onItemClick={handleTimelineClick}
        />
      </main>
    </div>
  )
}

export default function Dashboard() {
  return (
    <ErrorBoundary>
      <DashboardContent />
    </ErrorBoundary>
  )
}

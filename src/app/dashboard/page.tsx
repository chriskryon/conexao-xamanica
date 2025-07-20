"use client"

import DashboardBackground from "@/components/dashboard/DashboardBackground"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import ActionCards from "@/components/dashboard/ActionCards"
import ConsagracaoModal from "@/components/dashboard/ConsagracaoModal"
import DiarioModal from "@/components/dashboard/DiarioModal"
import Timeline from "@/components/dashboard/Timeline"
import { useDashboardForms } from "@/hooks/useDashboardForms"

export default function Dashboard() {
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

  if (isLoadingUser || isLoadingTimeline) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E4A2F] mx-auto mb-4"></div>
          <p className="text-[#2C4A7E] font-sans">Carregando dados...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] relative overflow-x-hidden">
      {/* Background Particles */}
      <DashboardBackground />

      {/* Header */}
      <DashboardHeader user={user} />

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

"use client"

import { Icon } from "@iconify/react"
import { useState, useEffect } from "react"
import PerfilBackground from "@/components/perfil/PerfilBackground"
import CommonHeader from "@/components/shared/CommonHeader"
import PerfilCard from "@/components/perfil/PerfilCard"
import PerfilTabs from "@/components/perfil/PerfilTabs"
import InformacoesPessoaisTab from "@/components/perfil/tabs/InformacoesPessoaisTab"
import SegurancaTab from "@/components/perfil/tabs/SegurancaTab"
import PreferenciasTab from "@/components/perfil/tabs/PreferenciasTab"

export default function PerfilPage() {
  // Estados locais
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleTabChange = (tab: string) => setActiveTab(tab)

  // Buscar dados diretamente do localStorage para teste
  useEffect(() => {
    const loadUserData = () => {
      try {
        // Verificar dados do Zustand
        const zustandData = localStorage.getItem('diario-xamanico-storage')
        
        if (zustandData) {
          const parsed = JSON.parse(zustandData)
          
          if (parsed.state?.profile && parsed.state?.onboardingCompleted) {
            const profile = parsed.state.profile
            const mappedProfile = {
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
              stats: parsed.state.userStats || {
                totalEntries: 0,
                totalConsagracoes: 0,
                totalReflexoes: 0,
                streakDays: 0,
                lastActivity: new Date().toISOString()
              }
            }
            setUserProfile(mappedProfile)
          }
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error)
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2E4A2F]/10 via-white to-[#2C4A7E]/10 flex items-center justify-center">
        <div className="card-glassmorphism p-8 text-center max-w-md">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#2C4A7E]/20 border-t-[#2E4A2F] mx-auto"></div>
            <Icon icon="mdi:account-circle" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[#2E4A2F]" />
          </div>
          <h3 className="text-[#2E4A2F] font-sans font-semibold text-lg mb-2">Carregando Perfil</h3>
          <p className="text-[#2C4A7E]">Preparando suas informações sagradas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E4A2F]/10 via-white to-[#2C4A7E]/10 relative overflow-x-hidden">
      {/* Background Particles */}
      <PerfilBackground />

      {/* Header */}
      <CommonHeader 
        title="Meu Perfil"
        subtitle="Gerencie suas informações"
        showProfile={false}
      />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <PerfilCard
              user={userProfile || undefined}
              stats={undefined}
              isEditing={isEditing}
              isUploadingAvatar={false}
              onAvatarUpload={() => {}}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <PerfilTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <InformacoesPessoaisTab 
                userProfile={userProfile}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            )}

            {/* Security Tab */}
            {activeTab === "security" && <SegurancaTab />}

            {/* Preferences Tab */}
            {activeTab === "preferences" && <PreferenciasTab />}
          </div>
        </div>
      </main>
    </div>
  )
}

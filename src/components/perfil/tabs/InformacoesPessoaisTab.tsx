"use client"

import { Icon } from "@iconify/react"
import DadosBasicos from "./informacoes-pessoais/DadosBasicos"
import PerfilAstrologico from "./informacoes-pessoais/PerfilAstrologico"
import PreferenciasAfetivas from "./informacoes-pessoais/PreferenciasAfetivas"
import JornadaEspiritual from "./informacoes-pessoais/JornadaEspiritual"

interface InformacoesPessoaisTabProps {
  userProfile: any
  isEditing: boolean
  setIsEditing: (editing: boolean) => void
}

export default function InformacoesPessoaisTab({ 
  userProfile, 
  isEditing, 
  setIsEditing 
}: InformacoesPessoaisTabProps) {
  if (!userProfile) {
    return (
      <div className="text-center py-8">
        <Icon icon="mdi:account-off" className="w-16 h-16 text-[#2C4A7E] opacity-50 mx-auto mb-4" />
        <p className="text-[#2C4A7E] font-medium">Nenhuma informação encontrada.</p>
        <p className="text-[#2C4A7E] text-sm opacity-70">Complete o onboarding para ver suas informações.</p>
      </div>
    )
  }

  return (
    <div className="card-glassmorphism animate-in slide-in-from-right-5 duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-sans text-xl font-bold text-[#2E4A2F] flex items-center gap-2">
          <Icon icon="mdi:account-circle" className="w-6 h-6" />
          Informações Pessoais
        </h3>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2E4A2F] to-[#2C4A7E] text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Icon icon={isEditing ? "mdi:check" : "mdi:pencil"} className="w-4 h-4" />
          {isEditing ? "Salvar" : "Editar"}
        </button>
      </div>
      
      <div className="space-y-8">
        <DadosBasicos userProfile={userProfile} />
        {userProfile.zodiacSign && <PerfilAstrologico userProfile={userProfile} />}
        <PreferenciasAfetivas userProfile={userProfile} />
        <JornadaEspiritual userProfile={userProfile} />
      </div>
    </div>
  )
}

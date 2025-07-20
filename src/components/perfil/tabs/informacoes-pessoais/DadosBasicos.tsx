"use client"

import { Icon } from "@iconify/react"

interface DadosBasicosProps {
  userProfile: any
}

export default function DadosBasicos({ userProfile }: DadosBasicosProps) {
  return (
    <div>
      <h4 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-4 border-b border-[#2C4A7E]/20 pb-2 flex items-center gap-2">
        <Icon icon="mdi:account-circle" className="w-5 h-5 text-[#2E4A2F]" />
        Dados Básicos
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#2E4A2F]/20 hover:border-[#2E4A2F]/40 hover:shadow-lg transition-all duration-200">
          <label className="text-sm font-medium text-[#2C4A7E] mb-1 flex items-center gap-1">
            <Icon icon="mdi:account" className="w-4 h-4" />
            Nome Completo
          </label>
          <p className="text-[#2E4A2F] font-semibold">{userProfile.name}</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#2E4A2F]/20 hover:border-[#2E4A2F]/40 hover:shadow-lg transition-all duration-200">
          <label className="text-sm font-medium text-[#2C4A7E] mb-1 flex items-center gap-1">
            <Icon icon="mdi:tag" className="w-4 h-4" />
            Apelido
          </label>
          <p className="text-[#2E4A2F] font-medium">{userProfile.nickname || '-'}</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#2E4A2F]/20 hover:border-[#2E4A2F]/40 hover:shadow-lg transition-all duration-200">
          <label className="text-sm font-medium text-[#2C4A7E] mb-1 flex items-center gap-1">
            <Icon icon="mdi:email" className="w-4 h-4" />
            Email
          </label>
          <p className="text-[#2E4A2F] font-medium">{userProfile.email}</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#2E4A2F]/20 hover:border-[#2E4A2F]/40 hover:shadow-lg transition-all duration-200">
          <label className="text-sm font-medium text-[#2C4A7E] mb-1 flex items-center gap-1">
            <Icon icon="mdi:calendar" className="w-4 h-4" />
            Data de Nascimento
          </label>
          <p className="text-[#2E4A2F] font-medium">
            {userProfile.birthDate ? new Date(userProfile.birthDate).toLocaleDateString('pt-BR') : '-'}
          </p>
        </div>
      </div>
    </div>
  )
}

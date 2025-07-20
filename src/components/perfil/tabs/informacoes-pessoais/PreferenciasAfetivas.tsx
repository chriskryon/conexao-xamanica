"use client"

import { Icon } from "@iconify/react"
import { estadoCivilOptions, preferenciaOptions } from "@/constants/onboarding"

interface PreferenciasAfetivasProps {
  userProfile: any
}

// Função para mapear valores para labels
const getOptionLabel = (value: string, options: Array<{value: string, label: string}>) => {
  const option = options.find(opt => opt.value === value)
  return option ? option.label.replace(/^[^-]+ - /, '') : value // Remove emoji e hífen
}

export default function PreferenciasAfetivas({ userProfile }: PreferenciasAfetivasProps) {
  return (
    <div>
      <h4 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-4 border-b border-[#2C4A7E]/20 pb-2 flex items-center gap-2">
        <Icon icon="mdi:heart" className="w-5 h-5 text-[#2E4A2F]" />
        Preferências Pessoais
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#2E4A2F]/20 hover:border-[#2E4A2F]/40 hover:shadow-lg transition-all duration-200">
          <label className="text-sm font-medium text-[#2C4A7E] mb-1 flex items-center gap-1">
            <Icon icon="mdi:account-heart" className="w-4 h-4" />
            Estado Civil
          </label>
          <p className="text-[#2E4A2F] font-medium">
            {userProfile.maritalStatus ? getOptionLabel(userProfile.maritalStatus, estadoCivilOptions) : '-'}
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#2E4A2F]/20 hover:border-[#2E4A2F]/40 hover:shadow-lg transition-all duration-200">
          <label className="text-sm font-medium text-[#2C4A7E] mb-1 flex items-center gap-1">
            <Icon icon="mdi:heart-multiple" className="w-4 h-4" />
            Preferência Afetiva
          </label>
          <p className="text-[#2E4A2F] font-medium">
            {userProfile.preference ? getOptionLabel(userProfile.preference, preferenciaOptions) : '-'}
          </p>
        </div>
      </div>
    </div>
  )
}

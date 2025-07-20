"use client"

import { Icon } from "@iconify/react"

interface PerfilAstrologicoProps {
  userProfile: any
}

export default function PerfilAstrologico({ userProfile }: PerfilAstrologicoProps) {
  return (
    <div>
      <h4 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-4 border-b border-[#2C4A7E]/20 pb-2 flex items-center gap-2">
        <Icon icon="mdi:zodiac-leo" className="w-5 h-5 text-[#2E4A2F]" />
        Perfil Astrológico
      </h4>
      <div className="bg-gradient-to-r from-[#2E4A2F]/10 via-white to-[#2C4A7E]/10 p-4 rounded-lg border border-[#2E4A2F]/20 backdrop-blur-sm">
        <label className="text-sm font-medium text-[#2C4A7E] mb-1 flex items-center gap-1">
          <Icon icon="mdi:star-circle" className="w-4 h-4" />
          Signo Solar
        </label>
        <p className="text-[#2E4A2F] font-semibold text-lg">{userProfile.zodiacSign}</p>
      </div>
    </div>
  )
}

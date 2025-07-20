"use client"

import { Icon } from "@iconify/react"
import { 
  inicioJornadaOptions, 
  tempoExperienciaOptions, 
  animalOptions, 
  animalSecundarioOptions 
} from "@/constants/onboarding"

interface JornadaEspiritualProps {
  userProfile: any
}

// Funções utilitárias
const getOptionLabel = (value: string, options: Array<{value: string, label: string}>) => {
  const option = options.find(opt => opt.value === value)
  return option ? option.label.replace(/^[^-]+ - /, '') : value // Remove emoji e hífen
}

const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const formatAnimalWithMeaning = (value: string, options: Array<{value: string, label: string}>) => {
  const option = options.find(opt => opt.value === value)
  if (!option) return capitalizeFirst(value)
  
  // Remove emoji e extrai nome e significado
  const labelWithoutEmoji = option.label.replace(/^[^\s]+\s/, '') // Remove emoji inicial
  const [name, meaning] = labelWithoutEmoji.split(' - ')
  
  return meaning ? `${capitalizeFirst(name)} - ${meaning}` : capitalizeFirst(name)
}

export default function JornadaEspiritual({ userProfile }: JornadaEspiritualProps) {
  return (
    <div>
      <h4 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-4 border-b border-[#2C4A7E]/20 pb-2 flex items-center gap-2">
        <Icon icon="mdi:meditation" className="w-5 h-5 text-[#2E4A2F]" />
        Jornada Espiritual
      </h4>
      <div className="space-y-6">
        {/* Bio */}
        <div className="bg-gradient-to-r from-[#2E4A2F]/10 via-white to-[#2C4A7E]/10 p-4 rounded-lg border border-[#2E4A2F]/20 backdrop-blur-sm">
          <label className="text-sm font-medium text-[#2C4A7E] mb-2 flex items-center gap-1">
            <Icon icon="mdi:text-account" className="w-4 h-4" />
            Bio Espiritual
          </label>
          <p className="text-[#2E4A2F] font-medium leading-relaxed">
            {userProfile.bio}
          </p>
        </div>
        
        {/* Início e Experiência */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#2E4A2F]/20 hover:border-[#2E4A2F]/40 hover:shadow-lg transition-all duration-200">
            <label className="text-sm font-medium text-[#2C4A7E] mb-1 flex items-center gap-1">
              <Icon icon="mdi:calendar-start" className="w-4 h-4" />
              Início da Jornada
            </label>
            <p className="text-[#2E4A2F] font-medium">
              {userProfile.spiritualJourney ? getOptionLabel(userProfile.spiritualJourney, inicioJornadaOptions) : '-'}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#2E4A2F]/20 hover:border-[#2E4A2F]/40 hover:shadow-lg transition-all duration-200">
            <label className="text-sm font-medium text-[#2C4A7E] mb-1 flex items-center gap-1">
              <Icon icon="mdi:timeline-clock" className="w-4 h-4" />
              Experiência com Medicinas
            </label>
            <p className="text-[#2E4A2F] font-medium">
              {userProfile.experience ? getOptionLabel(userProfile.experience, tempoExperienciaOptions) : '-'}
            </p>
          </div>
        </div>

        {/* Animais de Poder */}
        <div className="bg-gradient-to-br from-[#2E4A2F]/15 via-white to-[#2C4A7E]/15 p-6 rounded-lg border-2 border-[#2E4A2F]/30 backdrop-blur-sm shadow-lg">
          <h5 className="text-lg font-semibold text-[#2E4A2F] mb-4 flex items-center gap-2">
            <Icon icon="mdi:paw" className="w-5 h-5" />
            Animais de Poder
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-[#2C4A7E] mb-2 flex items-center gap-1">
                <Icon icon="mdi:star" className="w-4 h-4" />
                Animal Principal
              </label>
              <p className="text-[#2E4A2F] font-bold text-lg bg-white/90 p-3 rounded-lg border border-[#2E4A2F]/20">
                {userProfile.powerAnimal ? formatAnimalWithMeaning(userProfile.powerAnimal, animalOptions) : '-'}
              </p>
            </div>
            {userProfile.secondaryAnimals && userProfile.secondaryAnimals.length > 0 && (
              <div>
                <label className="text-sm font-medium text-[#2C4A7E] mb-2 flex items-center gap-1">
                  <Icon icon="mdi:star-outline" className="w-4 h-4" />
                  Animais Secundários
                </label>
                <div className="space-y-2">
                  {userProfile.secondaryAnimals.map((animal: string, index: number) => (
                    <p key={index} className="text-[#2E4A2F] font-medium text-sm bg-white/90 p-2 rounded-lg border border-[#2E4A2F]/20">
                      • {formatAnimalWithMeaning(animal, animalSecundarioOptions)}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

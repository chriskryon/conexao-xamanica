import { Icon } from "@iconify/react"
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form"
import { FormData } from "@/schemas/onboarding"
import { inicioJornadaOptions, tempoExperienciaOptions, animalOptions, animalSecundarioOptions } from "@/constants/onboarding"

interface Step3Props {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
}

export default function Step3({ register, errors, watch, setValue }: Step3Props) {
  const bio = watch("bio")
  const animalPoder = watch("animalPoder")
  const animaisSecundarios = watch("animaisSecundarios") || []

  const handleAnimalSecundarioToggle = (animalValue: string) => {
    const currentAnimals = animaisSecundarios || []
    const isSelected = currentAnimals.includes(animalValue)
    
    if (isSelected) {
      // Remove animal
      const newAnimals = currentAnimals.filter(animal => animal !== animalValue)
      setValue("animaisSecundarios", newAnimals)
    } else {
      // Adiciona animal (máximo 3 secundários)
      if (currentAnimals.length < 3) {
        setValue("animaisSecundarios", [...currentAnimals, animalValue])
      }
    }
  }

  return (
    <div className="space-y-4 fade-in">
      <div className="form-section">
        <h3 className="section-title">Sua Jornada Espiritual</h3>
        <div className="space-y-3">
          {/* Bio */}
          <div className="input-with-icon tooltip-trigger">
            <Icon icon="mdi:feather" className="input-icon" style={{ top: "1.25rem" }} />
            <textarea
              {...register("bio")}
              placeholder="Conte sobre sua jornada espiritual, suas experiências e o que busca..."
              className="input-glassmorphism font-sans resize-none"
              rows={4}
              maxLength={140}
            />
            <div className="tooltip-glassmorphism font-sans">Descreva sua essência espiritual</div>
            <div className="flex justify-between items-center mt-2">
              {errors.bio && <div className="error-message font-sans">{errors.bio.message}</div>}
              <div className="text-xs text-[#2C4A7E] opacity-60 font-sans ml-auto">
                {bio?.length || 0}/140
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Experiências Xamânicas</h3>
        <div className="space-y-3">
          {/* Início do Caminho Espiritual */}
          <div className="input-with-icon">
            <Icon icon="mdi:compass" className="input-icon" />
            <select
              {...register("inicioJornada")}
              className="select-glassmorphism font-sans"
            >
              {inicioJornadaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.inicioJornada && (
              <div className="error-message font-sans">{errors.inicioJornada.message}</div>
            )}
          </div>

          {/* Tempo de Experiência de Consagração */}
          <div className="input-with-icon">
            <Icon icon="mdi:cup" className="input-icon" />
            <select
              {...register("tempoExperiencia")}
              className="select-glassmorphism font-sans"
            >
              {tempoExperienciaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Animal de Poder Principal */}
          <div className="input-with-icon">
            <Icon icon="mdi:paw" className="input-icon" />
            <select
              {...register("animalPoder")}
              className="select-glassmorphism font-sans"
            >
              {animalOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.animalPoder && <div className="error-message font-sans">{errors.animalPoder.message}</div>}
          </div>

          {/* Animais Secundários */}
          {animalPoder && animalPoder !== "" && animalPoder !== "outro" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:paw-off" className="w-5 h-5 text-[#2C4A7E]" />
                <h4 className="text-sm font-medium text-[#2C4A7E] font-sans">
                  Animais Secundários (opcional - máx. 3)
                </h4>
              </div>
              
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {animalSecundarioOptions
                  .filter(option => option.value !== "" && option.value !== animalPoder)
                  .map((option) => {
                    const isSelected = animaisSecundarios?.includes(option.value) || false
                    const canSelect = (animaisSecundarios?.length || 0) < 3 || isSelected
                    
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleAnimalSecundarioToggle(option.value)}
                        disabled={!canSelect}
                        className={`
                          p-3 rounded-lg text-left text-xs transition-all duration-200 font-sans
                          ${isSelected 
                            ? 'bg-[#2E4A2F]/20 border-2 border-[#2E4A2F] text-[#2E4A2F]' 
                            : canSelect
                              ? 'bg-white/20 border border-[#A67B5B]/30 text-[#2C4A7E] hover:bg-white/30'
                              : 'bg-gray-100/50 border border-gray-300/30 text-gray-400 cursor-not-allowed'
                          }
                        `}
                      >
                        {option.label}
                      </button>
                    )
                  })}
              </div>
              
              {(animaisSecundarios?.length || 0) > 0 && (
                <div className="text-xs text-[#2C4A7E] opacity-70 font-sans">
                  Selecionados: {animaisSecundarios?.length || 0}/3
                </div>
              )}
            </div>
          )}

          {/* Outro Animal */}
          {animalPoder === "outro" && (
            <div className="input-with-icon">
              <Icon icon="mdi:star" className="input-icon" />
              <input
                {...register("outroAnimal")}
                type="text"
                placeholder="Qual é seu animal de poder?"
                className="input-glassmorphism font-sans"
              />
              {errors.outroAnimal && <div className="error-message font-sans">{errors.outroAnimal.message}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

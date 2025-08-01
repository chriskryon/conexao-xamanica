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
  const outrosAnimaisSecundarios = watch("outrosAnimaisSecundarios")

  const handleAnimalSecundarioToggle = (animalValue: string) => {
    const currentAnimals = animaisSecundarios || []
    const isSelected = currentAnimals.includes(animalValue)
    
    if (isSelected) {
      // Remove animal
      const newAnimals = currentAnimals.filter(animal => animal !== animalValue)
      setValue("animaisSecundarios", newAnimals)
      
      // Se estava removendo "outro", limpar o campo de texto também
      if (animalValue === "outro") {
        setValue("outrosAnimaisSecundarios", "")
      }
    } else {
      // Adiciona animal (máximo 3 secundários)
      if (currentAnimals.length < 3) {
        setValue("animaisSecundarios", [...currentAnimals, animalValue])
      }
    }
  }

  return (
    <div className="w-full space-y-2 fade-in px-1">
        <div className="form-section">
          <h3 className="section-title">Sua Jornada Espiritual</h3>
          <div className="space-y-2">
          {/* Bio */}
          <div className="input-with-icon tooltip-trigger">
            <Icon icon="mdi:feather" className="input-icon" style={{ top: "1rem" }} />
            <textarea
              {...register("bio")}
              placeholder="Conte sobre sua jornada espiritual..."
              className="input-glassmorphism font-sans resize-none"
              rows={3}
              maxLength={140}
            />
            <div className="tooltip-glassmorphism font-sans">Sua essência espiritual</div>
            <div className="flex justify-between items-center mt-1">
              {errors.bio && <div className="error-message font-sans">{errors.bio.message}</div>}
              <div className="text-xs text-[#2C4A7E] opacity-60 font-sans ml-auto">
                {bio?.length || 0}/140
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Experiências</h3>
        <div className="space-y-2">
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

          {/* Tempo de Experiência */}
          <div className="input-with-icon">
            <Icon icon="mdi:clock-outline" className="input-icon" />
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
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:paw-off" className="w-4 h-4 text-[#2C4A7E]" />
                <h4 className="text-xs font-medium text-[#2C4A7E] font-sans opacity-80">
                  Animais Secundários (máx. 3)
                </h4>
              </div>
              
              <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto">
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
                          p-2 rounded-md text-left text-xs transition-all duration-200 font-sans
                          ${isSelected 
                            ? 'bg-[#2E4A2F]/20 border border-[#2E4A2F] text-[#2E4A2F] font-medium' 
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
                <div className="text-xs text-[#2E4A2F] opacity-70 font-sans font-medium">
                  {animaisSecundarios?.length || 0}/3 selecionados
                </div>
              )}

              {/* Campo para outros animais secundários */}
              {animaisSecundarios?.includes("outro") && (
                <div className="input-with-icon">
                  <Icon icon="mdi:star" className="input-icon" />
                  <input
                    {...register("outrosAnimaisSecundarios")}
                    type="text"
                    placeholder="Quais são seus outros animais secundários?"
                    className="input-glassmorphism font-sans"
                  />
                  {errors.outrosAnimaisSecundarios && (
                    <div className="error-message font-sans">{errors.outrosAnimaisSecundarios.message}</div>
                  )}
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

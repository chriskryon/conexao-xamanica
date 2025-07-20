import { Icon } from "@iconify/react"
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form"
import { FormData } from "@/schemas/onboarding"
import { inicioJornadaOptions, tempoExperienciaOptions, animalOptions } from "@/constants/onboarding"

interface Step3Props {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  watch: UseFormWatch<FormData>
}

export default function Step3({ register, errors, watch }: Step3Props) {
  const bio = watch("bio")
  const animalPoder = watch("animalPoder")

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

          {/* Animal de Poder */}
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

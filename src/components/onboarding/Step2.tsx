import { Icon } from "@iconify/react"
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form"
import { FormData } from "@/schemas/onboarding"
import { getZodiacDescription } from "@/utils/zodiac"

interface Step2Props {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  watch: UseFormWatch<FormData>
}

export default function Step2({ register, errors, watch }: Step2Props) {
  const signo = watch("signo")

  return (
    <div className="space-y-4 fade-in">
      <div className="form-section">
        <h3 className="section-title">Informações Astrológicas</h3>
        <div className="space-y-3">
          {/* Data de Nascimento */}
          <div className="input-with-icon">
            <Icon icon="mdi:calendar" className="input-icon" />
            <input
              {...register("dataNascimento")}
              type="date"
              className="input-glassmorphism font-sans"
            />
            {errors.dataNascimento && (
              <div className="error-message font-sans">{errors.dataNascimento.message}</div>
            )}
          </div>

          {/* Signo */}
          {signo && (
            <div className="input-with-icon tooltip-trigger">
              <Icon icon="mdi:star-circle" className="input-icon" />
              <input
                {...register("signo")}
                type="text"
                className="input-glassmorphism font-sans"
                readOnly
                placeholder="Seu signo aparecerá aqui"
              />
              <div className="tooltip-glassmorphism font-sans">
                {signo}: {getZodiacDescription(signo)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

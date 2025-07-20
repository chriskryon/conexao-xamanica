import { Icon } from "@iconify/react"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { FormData } from "@/schemas/onboarding"
import { estadoCivilOptions, preferenciaOptions } from "@/constants/onboarding"

interface Step4Props {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
}

export default function Step4({ register, errors }: Step4Props) {
  return (
    <div className="w-full space-y-2 fade-in px-1">
        <div className="form-section">
          <h3 className="section-title">Preferências Pessoais</h3>
          <div className="space-y-2">
          {/* Estado Civil */}
          <div className="input-with-icon">
            <Icon icon="mdi:heart" className="input-icon" />
            <select
              {...register("estadoCivil")}
              className="select-glassmorphism font-sans"
            >
              {estadoCivilOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.estadoCivil && <div className="error-message font-sans">{errors.estadoCivil.message}</div>}
          </div>

          {/* Preferência */}
          <div className="input-with-icon">
            <Icon icon="mdi:account-group" className="input-icon" />
            <select
              {...register("preferencia")}
              className="select-glassmorphism font-sans"
            >
              {preferenciaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.preferencia && <div className="error-message font-sans">{errors.preferencia.message}</div>}
          </div>
        </div>
        </div>
      </div>
  )
}

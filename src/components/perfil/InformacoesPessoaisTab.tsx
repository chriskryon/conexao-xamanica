import { Icon } from "@iconify/react"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { animalOptions, civilStatusOptions, preferenceOptions } from "@/schemas/perfil"

interface InformacoesPessoaisTabProps {
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  isEditing: boolean
  userData: any
}

export default function InformacoesPessoaisTab({
  register,
  errors,
  isEditing,
  userData,
}: InformacoesPessoaisTabProps) {
  return (
    <div className="card-glassmorphism">
      <h3 className="font-sans text-xl font-bold text-[#2E4A2F] mb-6">Informações Pessoais</h3>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="form-section">
          <h4 className="section-title">Dados Básicos</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-with-icon">
              <Icon icon="mdi:account" className="input-icon" />
              <input
                type="text"
                {...register("name")}
                placeholder="Nome completo"
                className="input-glassmorphism font-sans"
                disabled={!isEditing}
              />
              {errors.name && <div className="error-message font-sans">{String(errors.name.message || "Campo obrigatório")}</div>}
            </div>

            <div className="input-with-icon">
              <Icon icon="mdi:account-outline" className="input-icon" />
              <input
                type="text"
                {...register("nickname")}
                placeholder="Apelido"
                className="input-glassmorphism font-sans"
                disabled={!isEditing}
              />
              {errors.nickname && <div className="error-message font-sans">{String(errors.nickname.message || "Campo obrigatório")}</div>}
            </div>

            <div className="input-with-icon md:col-span-2">
              <Icon icon="mdi:email" className="input-icon" />
              <input
                type="email"
                {...register("email")}
                placeholder="E-mail"
                className="input-glassmorphism font-sans"
                disabled={!isEditing}
              />
              {errors.email && <div className="error-message font-sans">{String(errors.email.message || "Campo obrigatório")}</div>}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="form-section">
          <h4 className="section-title">Biografia Espiritual</h4>
          <div className="input-with-icon">
            <Icon icon="mdi:feather" className="input-icon" style={{ top: "1.25rem" }} />
            <textarea
              {...register("bio")}
              placeholder="Conte sobre sua jornada espiritual..."
              className="input-glassmorphism font-sans resize-none break-words"
              rows={4}
              disabled={!isEditing}
            />
            {errors.bio && <div className="error-message font-sans">{String(errors.bio.message || "Campo obrigatório")}</div>}
          </div>
        </div>

        {/* Spiritual Info */}
        <div className="form-section">
          <h4 className="section-title">Informações Espirituais</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-with-icon">
              <Icon icon="mdi:paw" className="input-icon" />
              <select
                {...register("powerAnimal")}
                className="select-glassmorphism font-sans"
                disabled={!isEditing}
              >
                {animalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.powerAnimal && <div className="error-message font-sans">{String(errors.powerAnimal.message || "Campo obrigatório")}</div>}
            </div>

            <div className="input-with-icon">
              <Icon icon="mdi:calendar" className="input-icon" />
              <input
                type="text"
                value={userData?.birthDate || ""}
                className="input-glassmorphism font-sans"
                disabled
                placeholder="Data de nascimento"
              />
            </div>

            <div className="input-with-icon">
              <Icon icon="mdi:star-circle" className="input-icon" />
              <input
                type="text"
                value={userData?.zodiacSign || ""}
                className="input-glassmorphism font-sans"
                disabled
                placeholder="Signo"
              />
            </div>

            <div className="input-with-icon">
              <Icon icon="mdi:cup" className="input-icon" />
              <input
                type="text"
                value={userData?.ayahuascaExperience || ""}
                className="input-glassmorphism font-sans"
                disabled
                placeholder="Experiência com Ayahuasca"
              />
            </div>
          </div>
        </div>

        {/* Personal Preferences */}
        <div className="form-section">
          <h4 className="section-title">Preferências Pessoais</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-with-icon">
              <Icon icon="mdi:heart" className="input-icon" />
              <select
                {...register("relationshipStatus")}
                className="select-glassmorphism font-sans"
                disabled={!isEditing}
              >
                {civilStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.relationshipStatus && <div className="error-message font-sans">{String(errors.relationshipStatus.message || "Campo obrigatório")}</div>}
            </div>

            <div className="input-with-icon">
              <Icon icon="mdi:account-group" className="input-icon" />
              <select
                {...register("preference")}
                className="select-glassmorphism font-sans"
                disabled={!isEditing}
              >
                {preferenceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.preference && <div className="error-message font-sans">{String(errors.preference.message || "Campo obrigatório")}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

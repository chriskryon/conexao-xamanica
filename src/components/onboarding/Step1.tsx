import { Icon } from "@iconify/react"
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form"
import { FormData } from "@/schemas/onboarding"
import { useCheckEmail } from "@/hooks/useOnboardingQueries"
import { useEffect, useState } from "react"
import PhotoUpload from "./PhotoUpload"

interface Step1Props {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  photo: File | null
  onPhotoChange: (file: File | null) => void
  watch: UseFormWatch<FormData>
}

export default function Step1({ register, errors, photo, onPhotoChange, watch }: Step1Props) {
  const [shouldCheckEmail, setShouldCheckEmail] = useState(false)
  const email = watch("email")
  
  const { data: emailCheck, isLoading: isCheckingEmail } = useCheckEmail(email, shouldCheckEmail)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (email && email.includes("@") && !errors.email) {
        setShouldCheckEmail(true)
      } else {
        setShouldCheckEmail(false)
      }
    }, 1000) // Debounce de 1 segundo

    return () => clearTimeout(timer)
  }, [email, errors.email])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onPhotoChange(file)
  }

  return (
    <div className="space-y-3 fade-in">
      <div className="form-section">
        <h3 className="section-title">
            oais</h3>
        <div className="space-y-2">
          {/* Nome */}
          <div className="input-with-icon">
            <Icon icon="mdi:account" className="input-icon" />
            <input
              {...register("nome")}
              type="text"
              placeholder="Seu nome completo"
              className="input-glassmorphism font-sans"
              autoComplete="name"
            />
            {errors.nome && <div className="error-message font-sans">{errors.nome.message}</div>}
          </div>

          {/* Apelido */}
          <div className="input-with-icon">
            <Icon icon="mdi:account-outline" className="input-icon" />
            <input
              {...register("apelido")}
              type="text"
              placeholder="Apelido ou Nome"
              className="input-glassmorphism font-sans"
              autoComplete="nickname"
            />
          </div>

          {/* Email */}
          <div className="input-with-icon">
            <Icon icon="mdi:email" className="input-icon" />
            <input
              {...register("email")}
              type="email"
              placeholder="seu@email.com"
              className="input-glassmorphism font-sans"
              autoComplete="email"
              inputMode="email"
            />
            {isCheckingEmail && (
              <div className="flex items-center gap-2 mt-1">
                <Icon icon="mdi:loading" className="w-4 h-4 animate-spin text-blue-500" />
                <span className="text-xs text-blue-500 font-sans">Verificando email...</span>
              </div>
            )}
            {emailCheck && !emailCheck.available && (
              <div className="error-message font-sans">Este email já está em uso</div>
            )}
            {emailCheck && emailCheck.available && (
              <div className="flex items-center gap-2 mt-1">
                <Icon icon="mdi:check-circle" className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-500 font-sans">Email disponível</span>
              </div>
            )}
            {errors.email && <div className="error-message font-sans">{errors.email.message}</div>}
          </div>

          {/* Foto de Perfil */}
          <div className="pt-1">
            <label className="block text-xs font-medium text-[#2C4A7E] mb-1 font-sans opacity-80">
              Foto de Perfil (opcional)
            </label>
            <PhotoUpload 
              onPhotoChange={onPhotoChange}
              currentPhoto={photo}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

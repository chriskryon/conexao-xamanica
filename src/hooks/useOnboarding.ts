import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormData, fullFormSchema, step1Schema, step2Schema, step3Schema, step4Schema } from "@/schemas/onboarding"
import { calculateZodiacSign } from "@/utils/zodiac"
import { useSubmitOnboarding, useCheckEmail } from "@/hooks/useOnboardingQueries"

const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema]

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState(() => {
    // Restaurar step do localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('onboarding-step')
      return saved ? parseInt(saved) : 1
    }
    return 1
  })
  
  const submitOnboardingMutation = useSubmitOnboarding()

  const form = useForm<FormData>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: {
      photo: null,
      nome: "",
      apelido: "",
      email: "",
      dataNascimento: "",
      signo: "",
      bio: "",
      inicioJornada: "",
      tempoExperiencia: "",
      animalPoder: "",
      outroAnimal: "",
      estadoCivil: "",
      preferencia: "",
    },
    mode: "onChange",
  })

  const { watch, setValue, trigger } = form
  const watchedDate = watch("dataNascimento")

  // Auto-calculate zodiac sign
  useEffect(() => {
    if (watchedDate) {
      const sign = calculateZodiacSign(watchedDate)
      setValue("signo", sign)
    }
  }, [watchedDate, setValue])

  // Persistir dados no localStorage
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (typeof window !== 'undefined') {
        // Não salvar a foto no localStorage (muito pesado)
        const { photo, ...dataToSave } = data
        localStorage.setItem('onboarding-data', JSON.stringify(dataToSave))
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  // Persistir step atual
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding-step', currentStep.toString())
    }
  }, [currentStep])

  // Restaurar dados salvos
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('onboarding-data')
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          Object.entries(parsedData).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
              setValue(key as keyof FormData, value as any)
            }
          })
        } catch (error) {
          console.error('Erro ao restaurar dados:', error)
        }
      }
    }
  }, [setValue])

  const validateCurrentStep = async () => {
    const currentSchema = stepSchemas[currentStep - 1]
    const data = form.getValues()
    
    try {
      currentSchema.parse(data)
      return true
    } catch {
      await trigger()
      return false
    }
  }

  const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: FormData) => {
    submitOnboardingMutation.mutate(data, {
      onSuccess: () => {
        // Limpar dados salvos após sucesso
        if (typeof window !== 'undefined') {
          localStorage.removeItem('onboarding-data')
          localStorage.removeItem('onboarding-step')
        }
      }
    })
  }

  const clearSavedData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('onboarding-data')
      localStorage.removeItem('onboarding-step')
      form.reset()
      setCurrentStep(1)
    }
  }

  const handleSubmit = async () => {
    const isValid = await validateCurrentStep()
    if (isValid) {
      const data = form.getValues()
      await onSubmit(data)
    }
  }

  return {
    form,
    currentStep,
    nextStep,
    prevStep,
    handleSubmit,
    validateCurrentStep,
    isSubmitting: submitOnboardingMutation.isPending,
    clearSavedData,
  }
}

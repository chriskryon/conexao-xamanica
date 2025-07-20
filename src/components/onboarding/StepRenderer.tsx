import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form"
import { FormData } from "@/schemas/onboarding"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import Step4 from "./Step4"

interface StepRendererProps {
  currentStep: number
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
  photo: File | null
  onPhotoChange: (file: File | null) => void
}

export default function StepRenderer({
  currentStep,
  register,
  errors,
  watch,
  setValue,
  photo,
  onPhotoChange,
}: StepRendererProps) {
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 register={register} errors={errors} photo={photo} onPhotoChange={onPhotoChange} watch={watch} />
      case 2:
        return <Step2 register={register} errors={errors} watch={watch} />
      case 3:
        return <Step3 register={register} errors={errors} watch={watch} setValue={setValue} />
      case 4:
        return <Step4 register={register} errors={errors} />
      default:
        return null
    }
  }

  return (
    <div className="w-full h-full">
      {renderStep()}
    </div>
  )
}

import ProgressIndicator from "./ProgressIndicator"
import SavedDataIndicator from "./SavedDataIndicator"
import StepHeader from "./StepHeader"
import StepTransition from "./StepTransition"
import NavigationButtons from "./NavigationButtons"
import StepRenderer from "./StepRenderer"
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form"
import { FormData } from "@/schemas/onboarding"

interface OnboardingFormProps {
  currentStep: number
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  watch: UseFormWatch<FormData>
  photo: File | null
  onPhotoChange: (file: File | null) => void
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
  isSubmitting: boolean
  onClearData: () => void
}

export default function OnboardingForm({
  currentStep,
  register,
  errors,
  watch,
  photo,
  onPhotoChange,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting,
  onClearData,
}: OnboardingFormProps) {
  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto px-8 py-4 md:max-w-4xl md:px-12">
      {/* Indicador de dados salvos */}
      <SavedDataIndicator onClearData={onClearData} />
      
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} totalSteps={4} />

      {/* Main Card - com scroll interno */}
      <div className="card-glassmorphism flex-1 flex flex-col overflow-hidden">
        {/* Step Header - fixo */}
        <StepHeader currentStep={currentStep} />

        {/* Form - com scroll */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 pr-2">
            <StepTransition currentStep={currentStep}>
              <StepRenderer
                currentStep={currentStep}
                register={register}
                errors={errors}
                watch={watch}
                photo={photo}
                onPhotoChange={onPhotoChange}
              />
            </StepTransition>
          </div>
        </div>

        {/* Navigation Buttons - fixos no final */}
        <NavigationButtons
          currentStep={currentStep}
          onPrevious={onPrevious}
          onNext={onNext}
          onSubmit={onSubmit}
          isValid={true} // Podemos melhorar isso depois
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}

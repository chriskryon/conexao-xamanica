import ProgressIndicator from "./ProgressIndicator"
import SavedDataIndicator from "./SavedDataIndicator"
import StepHeader from "./StepHeader"
import StepTransition from "./StepTransition"
import NavigationButtons from "./NavigationButtons"
import StepRenderer from "./StepRenderer"
import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form"
import { FormData } from "@/schemas/onboarding"

interface OnboardingFormProps {
  currentStep: number
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  watch: UseFormWatch<FormData>
  setValue: UseFormSetValue<FormData>
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
  setValue,
  photo,
  onPhotoChange,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting,
  onClearData,
}: OnboardingFormProps) {
  return (
    <div className="flex flex-col h-full w-full px-4 py-3 md:px-6">
      {/* Indicador de dados salvos */}
      <SavedDataIndicator onClearData={onClearData} />
      
      {/* Progress Indicator */}
      {/* Removi por que estava ocupando muito espaço */}
      {/* <ProgressIndicator currentStep={currentStep} totalSteps={4} /> */}

      {/* Main Card - com scroll interno */}
      <div className="card-glassmorphism flex-1 flex flex-col overflow-hidden w-full max-w-sm mx-auto md:max-w-2xl">
        {/* Step Header - fixo */}
        <StepHeader currentStep={currentStep} />

        {/* Form - com scroll */}
        <div className="flex-1 overflow-y-auto scrollbar-stable">
          <div className="space-y-3 pr-1 min-h-full">
            <StepTransition currentStep={currentStep}>
              <StepRenderer
                currentStep={currentStep}
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
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

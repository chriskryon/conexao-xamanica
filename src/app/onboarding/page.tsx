"use client"

import { useOnboarding } from "@/hooks/useOnboarding"
import OnboardingBackground from "@/components/onboarding/OnboardingBackground"
import OnboardingHeader from "@/components/onboarding/OnboardingHeader"
import OnboardingForm from "@/components/onboarding/OnboardingForm"

export default function Onboarding() {
  const { 
    form, 
    currentStep, 
    nextStep, 
    prevStep, 
    handleSubmit, 
    isSubmitting, 
    clearSavedData 
  } = useOnboarding()
  
  const { register, formState: { errors }, watch, setValue } = form
  const photo = watch("photo")
  
  const handlePhotoChange = (file: File | null) => {
    setValue("photo", file)
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] relative overflow-hidden flex flex-col">
      {/* Background Particles */}
      <OnboardingBackground />

      {/* Header */}
      <OnboardingHeader />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        <OnboardingForm
          currentStep={currentStep}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          photo={photo}
          onPhotoChange={handlePhotoChange}
          onPrevious={prevStep}
          onNext={nextStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onClearData={clearSavedData}
        />
      </div>
    </div>
  )
}

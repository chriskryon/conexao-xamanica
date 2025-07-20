"use client"

import { useCallback } from "react"
import { Icon } from "@iconify/react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"

import { useOnboarding } from "@/hooks/useOnboarding"
import { stepInfo } from "@/constants/onboarding"
import ProgressIndicator from "@/components/onboarding/ProgressIndicator"
import Step1 from "@/components/onboarding/Step1"
import Step2 from "@/components/onboarding/Step2"
import Step3 from "@/components/onboarding/Step3"
import Step4 from "@/components/onboarding/Step4"
import NavigationButtons from "@/components/onboarding/NavigationButtons"
import StepTransition from "@/components/onboarding/StepTransition"
import SavedDataIndicator from "@/components/onboarding/SavedDataIndicator"

export default function Onboarding() {
  const { form, currentStep, nextStep, prevStep, handleSubmit, validateCurrentStep, isSubmitting, clearSavedData } = useOnboarding()
  const { register, formState: { errors }, watch, setValue } = form
  
  const photo = watch("photo")
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container)
  }, [])

  const handlePhotoChange = (file: File | null) => {
    setValue("photo", file)
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 register={register} errors={errors} photo={photo} onPhotoChange={handlePhotoChange} watch={watch} />
      case 2:
        return <Step2 register={register} errors={errors} watch={watch} />
      case 3:
        return <Step3 register={register} errors={errors} watch={watch} />
      case 4:
        return <Step4 register={register} errors={errors} />
      default:
        return null
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] relative overflow-hidden flex flex-col">
      {/* Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#2E4A2F", "#D6BCFA"],
            },
            links: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 15,
            },
            opacity: {
              value: 0.1,
            },
            shape: {
              type: ["star", "circle"],
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Header */}
      <header className="relative z-20 bg-white/10 backdrop-blur-sm border-b border-white/20 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <Icon icon="mdi:eagle" className="w-8 h-8 text-[#2E4A2F]" />
              <div className="text-center">
                <h1 className="font-sans text-xl font-bold text-[#2E4A2F]">Diário Xamânico</h1>
                <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Bem-vindo à sua jornada</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col h-full max-w-2xl mx-auto px-8 py-4 md:max-w-4xl md:px-12">
          {/* Indicador de dados salvos */}
          <SavedDataIndicator onClearData={clearSavedData} />
          
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} totalSteps={4} />

          {/* Main Card - com scroll interno */}
          <div className="card-glassmorphism flex-1 flex flex-col overflow-hidden">
            {/* Step Header - fixo */}
            <div className="step-header flex-shrink-0 mb-3 pb-2 border-b border-white/10">
              <Icon
                icon={stepInfo[currentStep - 1].icon}
                className="w-10 h-10 text-[#2E4A2F] mx-auto mb-3 hover:scale-110 transition-all duration-300"
              />
              <h1 className="step-title text-xl mb-1">{stepInfo[currentStep - 1].title}</h1>
              <p className="step-subtitle text-sm">{stepInfo[currentStep - 1].subtitle}</p>
            </div>

            {/* Form - com scroll */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4 pr-2">
                <StepTransition currentStep={currentStep}>
                  {renderCurrentStep()}
                </StepTransition>
              </div>
            </div>

            {/* Navigation Buttons - fixos no final */}
            <NavigationButtons
              currentStep={currentStep}
              onPrevious={prevStep}
              onNext={nextStep}
              onSubmit={handleSubmit}
              isValid={true} // Podemos melhorar isso depois
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

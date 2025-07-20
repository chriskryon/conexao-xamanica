import { Icon } from "@iconify/react"
import { stepInfo } from "@/constants/onboarding"

interface StepHeaderProps {
  currentStep: number
}

export default function StepHeader({ currentStep }: StepHeaderProps) {
  return (
    <div className="step-header flex-shrink-0 mb-3 pb-2 border-b border-white/10">
      <Icon
        icon={stepInfo[currentStep - 1].icon}
        className="w-10 h-10 text-[#2E4A2F] mx-auto mb-3 hover:scale-110 transition-all duration-300"
      />
      <h1 className="step-title text-xl mb-1">{stepInfo[currentStep - 1].title}</h1>
      <p className="step-subtitle text-sm">{stepInfo[currentStep - 1].subtitle}</p>
    </div>
  )
}

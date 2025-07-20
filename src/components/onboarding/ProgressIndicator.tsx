interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex justify-center gap-3 mb-3 flex-shrink-0">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className={`progress-circle ${step === currentStep ? "active" : ""}`}>
          {step}
        </div>
      ))}
    </div>
  )
}

import { Icon } from "@iconify/react"

interface NavigationButtonsProps {
  currentStep: number
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
  isValid: boolean
  isSubmitting?: boolean
}

export default function NavigationButtons({ 
  currentStep, 
  onPrevious, 
  onNext, 
  onSubmit, 
  isValid,
  isSubmitting = false
}: NavigationButtonsProps) {
  const handleClick = () => {
    if (currentStep === 4) {
      onSubmit()
    } else {
      onNext()
    }
  }

  return (
    <div className="flex gap-3 pt-4 border-t border-[#A67B5B]/20 flex-shrink-0 mt-4">
      {currentStep > 1 && (
        <button type="button" onClick={onPrevious} className="btn-secondary flex-1 font-sans py-3">
          <Icon icon="mdi:arrow-left" className="w-4 h-4 inline mr-2" />
          Anterior
        </button>
      )}
      <button
        type="button"
        onClick={handleClick}
        disabled={!isValid || isSubmitting}
        className="btn-primary flex-1 font-sans py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Icon icon="mdi:loading" className="w-4 h-4 inline mr-2 animate-spin" />
            Enviando...
          </>
        ) : currentStep === 4 ? (
          <>
            <Icon icon="mdi:check" className="w-4 h-4 inline mr-2" />
            Finalizar
          </>
        ) : (
          <>
            Próximo
            <Icon icon="mdi:arrow-right" className="w-4 h-4 inline ml-2" />
          </>
        )}
      </button>
    </div>
  )
}

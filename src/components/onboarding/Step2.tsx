import { Icon } from "@iconify/react"
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form"
import { FormData } from "@/schemas/onboarding"
import { getZodiacDescription } from "@/utils/zodiac"
import { useState, useEffect } from "react"
import Picker from "react-mobile-picker"

interface Step2Props {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  watch: UseFormWatch<FormData>
}

// Gerar seleções conforme a documentação - usando valor fixo para evitar hydration error
const selections = {
  day: Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')),
  month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  year: Array.from({ length: 80 }, (_, i) => String(2025 - 18 - i)) // Valor fixo para evitar hydration
}

const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export default function Step2({ register, errors, watch }: Step2Props) {
  const signo = watch("signo")
  const dataNascimento = watch("dataNascimento")
  
  const [showPicker, setShowPicker] = useState(false)
  const [pickerValue, setPickerValue] = useState({
    day: '01',
    month: '01', 
    year: '2000' // Valor fixo padrão
  })
  const [tempPickerValue, setTempPickerValue] = useState(pickerValue)

  // Sincronizar com o campo de data do formulário apenas quando confirmar
  const handleConfirmDate = () => {
    setPickerValue(tempPickerValue)
    const dateString = `${tempPickerValue.year}-${tempPickerValue.month}-${tempPickerValue.day}`
    const event = { target: { name: 'dataNascimento', value: dateString } }
    register('dataNascimento').onChange(event)
    setShowPicker(false)
  }

  // Cancelar seleção
  const handleCancelDate = () => {
    setTempPickerValue(pickerValue)
    setShowPicker(false)
  }

  // Parse da data existente
  useEffect(() => {
    if (dataNascimento) {
      const [year, month, day] = dataNascimento.split('-')
      if (year && month && day) {
        const newValue = { day, month, year }
        setPickerValue(newValue)
        setTempPickerValue(newValue)
      }
    }
  }, [dataNascimento])

  const formatDisplayDate = () => {
    if (dataNascimento) {
      const [year, month, day] = dataNascimento.split('-')
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      return `${day}/${monthNames[parseInt(month) - 1]}/${year}`
    }
    return 'Toque para selecionar sua data'
  }

  return (
    <div className="space-y-4 fade-in">
      <div className="form-section">
        <h3 className="section-title">Informações Astrológicas</h3>
        <div className="space-y-3">
          {/* Data de Nascimento */}
          <div className="input-with-icon">
            <Icon icon="mdi:calendar" className="input-icon" />
            <div
              onClick={() => setShowPicker(!showPicker)}
              className="input-glassmorphism font-sans cursor-pointer flex items-center justify-between pl-12"
            >
              <span className={dataNascimento ? 'text-[#2C4A7E]' : 'text-[#2C4A7E] opacity-60'}>
                {formatDisplayDate()}
              </span>
              <Icon 
                icon={showPicker ? "mdi:chevron-up" : "mdi:chevron-down"} 
                className="w-5 h-5 text-[#2C4A7E] opacity-60" 
              />
            </div>
            
            {/* Campo hidden para o formulário */}
            <input
              {...register("dataNascimento")}
              type="hidden"
              value={dataNascimento || ''}
            />
            
            {errors.dataNascimento && (
              <div className="error-message font-sans">{errors.dataNascimento.message}</div>
            )}
          </div>

          {/* Picker de Data */}
          {showPicker && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay com blur */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>
              
              {/* Modal */}
              <div className="relative modal-glassmorphism w-full max-w-sm">
                <h3 className="text-lg font-semibold text-[#2C4A7E] mb-4 text-center font-sans">
                  Data de Nascimento
                </h3>
                
                <div className="mb-6">
                  <Picker
                    value={tempPickerValue}
                    onChange={setTempPickerValue}
                    wheelMode="natural"
                    height={180}
                    itemHeight={36}
                  >
                    {Object.keys(selections).map(name => (
                      <Picker.Column key={name} name={name}>
                        {selections[name as keyof typeof selections].map(option => (
                          <Picker.Item key={option} value={option}>
                            {({ selected }: { selected: boolean }) => (
                              <div 
                                style={{ 
                                  color: selected ? '#2E4A2F' : '#2C4A7E',
                                  fontSize: selected ? '18px' : '16px',
                                  fontWeight: selected ? '600' : '400',
                                  opacity: selected ? 1 : 0.6,
                                  transition: 'all 0.2s ease',
                                  fontFamily: 'inherit',
                                  textAlign: 'center',
                                  padding: '8px 0'
                                }}
                              >
                                {name === 'month' 
                                  ? monthNames[parseInt(option) - 1] 
                                  : option
                                }
                              </div>
                            )}
                          </Picker.Item>
                        ))}
                      </Picker.Column>
                    ))}
                  </Picker>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCancelDate}
                    className="flex-1 py-3 px-4 bg-transparent border border-[#A67B5B]/30 text-[#2C4A7E] rounded-lg font-sans font-medium hover:bg-[#A67B5B]/10 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmDate}
                    className="flex-1 py-3 px-4 bg-[#2E4A2F] text-white rounded-lg font-sans font-medium hover:bg-[#2E4A2F]/90 transition-colors"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Signo */}
          {signo && (
            <div className="input-with-icon tooltip-trigger">
              <Icon icon="mdi:star-circle" className="input-icon" />
              <input
                {...register("signo")}
                type="text"
                className="input-glassmorphism font-sans"
                readOnly
                placeholder="Seu signo aparecerá aqui"
              />
              <div className="tooltip-glassmorphism font-sans">
                {signo}: {getZodiacDescription(signo)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

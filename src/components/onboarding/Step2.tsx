import { Icon } from "@iconify/react"
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form"
import { FormData } from "@/schemas/onboarding"
import { getZodiacDescription, getZodiacEmoji } from "@/utils/zodiac"
import { useState, useEffect } from "react"
import Picker from "react-mobile-picker"

interface Step2Props {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
  watch: UseFormWatch<FormData>
}

// Gerar seleções conforme a documentação - usando valor fixo para evitar hydration error
const selections = {
  month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  year: Array.from({ length: 80 }, (_, i) => String(2025 - 18 - i)) // Valor fixo para evitar hydration
}

// Função para calcular dias válidos baseado no mês e ano
const getDaysInMonth = (month: string, year: string) => {
  const monthNum = parseInt(month)
  const yearNum = parseInt(year)
  
  // Dias por mês (índice 0 = janeiro)
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
  // Verificar ano bissexto para fevereiro
  if (monthNum === 2) {
    const isLeapYear = (yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 400 === 0)
    return isLeapYear ? 29 : 28
  }
  
  return daysInMonth[monthNum - 1]
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

  // Gerar dias dinamicamente baseado no mês/ano selecionado
  const getDynamicSelections = () => {
    const maxDays = getDaysInMonth(tempPickerValue.month, tempPickerValue.year)
    const days = Array.from({ length: maxDays }, (_, i) => String(i + 1).padStart(2, '0'))
    
    return {
      day: days,
      month: selections.month,
      year: selections.year
    }
  }

  // Validar e ajustar dia quando mês/ano mudar
  const handlePickerChange = (newValue: typeof tempPickerValue) => {
    const maxDays = getDaysInMonth(newValue.month, newValue.year)
    const currentDay = parseInt(newValue.day)
    
    // Se o dia atual é maior que os dias disponíveis no novo mês, ajustar para o último dia
    if (currentDay > maxDays) {
      newValue.day = String(maxDays).padStart(2, '0')
    }
    
    setTempPickerValue(newValue)
  }

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
    <div className="w-full space-y-2 fade-in px-1">
        <div className="form-section">
          <h3 className="section-title">Informações Astrológicas</h3>
          <div className="space-y-2">
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
                  🎂 Data de Nascimento
                </h3>
                
                <div className="mb-6">
                  <Picker
                    value={tempPickerValue}
                    onChange={handlePickerChange}
                    wheelMode="natural"
                    height={180}
                    itemHeight={36}
                  >
                    {Object.keys(getDynamicSelections()).map(name => {
                      const dynamicSelections = getDynamicSelections()
                      const columnName = name as keyof typeof dynamicSelections
                      return (
                        <Picker.Column key={name} name={name}>
                          {dynamicSelections[columnName].map((option: string) => (
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
                      )
                    })}
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
            <div className="space-y-3">
              {/* Emoji grande do signo */}
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-[#D6BCFA]/20 to-[#2E4A2F]/10 border border-[#D6BCFA]/30">
                <div className="text-6xl mb-2">
                  {getZodiacEmoji(signo)}
                </div>
                <div className="text-center">
                  <h4 className="font-sans text-lg font-semibold text-[#2E4A2F]">{signo}</h4>
                  <p className="font-sans text-sm text-[#2C4A7E] opacity-80 mt-1">
                    {getZodiacDescription(signo)}
                  </p>
                </div>
              </div>
              
              {/* Input hidden para o formulário */}
              <input
                {...register("signo")}
                type="hidden"
                value={signo}
              />
            </div>
          )}
        </div>
        </div>
      </div>
  )
}

"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Icon } from "@iconify/react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"

interface FormData {
  // Step 1: Cadastro Único
  photo: File | null
  nome: string
  apelido: string
  email: string

  // Step 2: Dados Pessoais
  dataNascimento: string
  signo: string

  // Step 3: Perfil Espiritual
  bio: string
  inicioJornada: string
  tempoExperiencia: string
  animalPoder: string
  outroAnimal: string

  // Step 4: Preferências
  estadoCivil: string
  preferencia: string
}

interface FormErrors {
  [key: string]: string
}

const zodiacSigns = [
  { name: "Áries", start: [3, 21], end: [4, 19], description: "Energia e liderança natural" },
  { name: "Touro", start: [4, 20], end: [5, 20], description: "Estabilidade e conexão com a terra" },
  { name: "Gêmeos", start: [5, 21], end: [6, 20], description: "Comunicação e versatilidade mental" },
  { name: "Câncer", start: [6, 21], end: [7, 22], description: "Intuição e proteção emocional" },
  { name: "Leão", start: [7, 23], end: [8, 22], description: "Criatividade e generosidade do coração" },
  { name: "Virgem", start: [8, 23], end: [9, 22], description: "Precisão e análise detalhada" },
  { name: "Libra", start: [9, 23], end: [10, 22], description: "Equilíbrio e harmonia nas relações" },
  { name: "Escorpião", start: [10, 23], end: [11, 21], description: "Transformação e intensidade espiritual" },
  { name: "Sagitário", start: [11, 22], end: [12, 21], description: "Aventura e busca pela sabedoria" },
  { name: "Capricórnio", start: [12, 22], end: [1, 19], description: "Disciplina e ambição estruturada" },
  { name: "Aquário", start: [1, 20], end: [2, 18], description: "Inovação e visão humanitária" },
  { name: "Peixes", start: [2, 19], end: [3, 20], description: "Intuição e compaixão universal" },
]

const stepInfo = [
  {
    title: "Informações Básicas",
    subtitle: "Vamos começar com seus dados essenciais",
    icon: "mdi:account-circle",
  },
  {
    title: "Perfil Astrológico",
    subtitle: "Descubra sua conexão cósmica",
    icon: "mdi:star-circle",
  },
  {
    title: "Jornada Espiritual",
    subtitle: "Compartilhe sua experiência xamânica",
    icon: "mdi:feather",
  },
  {
    title: "Preferências Pessoais",
    subtitle: "Finalize seu perfil completo",
    icon: "mdi:heart",
  },
]

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    photo: null,
    nome: "",
    apelido: "",
    email: "",
    dataNascimento: "",
    signo: "",
    bio: "",
    inicioJornada: "",
    tempoExperiencia: "",
    animalPoder: "",
    outroAnimal: "",
    estadoCivil: "",
    preferencia: "",
  })

  const calculateZodiacSign = (dateString: string) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()

    for (const sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start
      const [endMonth, endDay] = sign.end

      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (startMonth > endMonth && (month === startMonth || month === endMonth))
      ) {
        return sign.name
      }
    }

    return ""
  }

  const getZodiacDescription = (signName: string) => {
    const sign = zodiacSigns.find((s) => s.name === signName)
    return sign ? sign.description : ""
  }

  useEffect(() => {
    if (formData.dataNascimento) {
      const sign = calculateZodiacSign(formData.dataNascimento)
      setFormData((prev) => ({ ...prev, signo: sign }))
    }
  }, [formData.dataNascimento])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      photo: file,
    }))
  }

  const validateStep = () => {
    const newErrors: FormErrors = {}

    switch (currentStep) {
      case 1:
        if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório"
        if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "E-mail inválido"
        break
      case 2:
        if (!formData.dataNascimento) newErrors.dataNascimento = "Data de nascimento é obrigatória"
        break
      case 3:
        if (!formData.bio.trim()) newErrors.bio = "Bio é obrigatória"
        if (!formData.inicioJornada) newErrors.inicioJornada = "Início da jornada é obrigatório"
        if (!formData.animalPoder) newErrors.animalPoder = "Animal de poder é obrigatório"
        if (formData.animalPoder === "outro" && !formData.outroAnimal.trim()) {
          newErrors.outroAnimal = "Especifique seu animal de poder"
        }
        break
      case 4:
        if (!formData.estadoCivil) newErrors.estadoCivil = "Estado civil é obrigatório"
        if (!formData.preferencia) newErrors.preferencia = "Preferência é obrigatória"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep() && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === 4) {
      if (validateStep()) {
        console.log("Form submitted:", formData)
        // Redirect to dashboard
        window.location.href = "/dashboard"
      }
    } else {
      nextStep()
    }
  }

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container)
  }, [])

  const inicioJornadaOptions = [
    { value: "", label: "Quando começou sua jornada espiritual?" },
    { value: "menos-1-ano", label: "Há menos de 1 ano" },
    { value: "1-2-anos", label: "Entre 1 e 2 anos" },
    { value: "2-5-anos", label: "Entre 2 e 5 anos" },
    { value: "5-10-anos", label: "Entre 5 e 10 anos" },
    { value: "mais-10-anos", label: "Há mais de 10 anos" },
    { value: "desde-sempre", label: "Desde sempre" },
  ]

  const tempoExperienciaOptions = [
    { value: "", label: "Tempo de experiência com consagrações" },
    { value: "nenhuma", label: "Nenhuma experiência ainda" },
    { value: "primeira-vez", label: "Primeira experiência recente" },
    { value: "algumas-vezes", label: "Algumas experiências (2-5)" },
    { value: "experiencia-moderada", label: "Experiência moderada (5-15)" },
    { value: "experiencia-ampla", label: "Experiência ampla (15+)" },
    { value: "praticante-regular", label: "Praticante regular" },
  ]

  const animalOptions = [
    { value: "", label: "Selecione seu animal de poder" },
    { value: "aguia", label: "🦅 Águia - Visão e liberdade" },
    { value: "lobo", label: "🐺 Lobo - Lealdade e intuição" },
    { value: "onca", label: "🐆 Onça - Força e mistério" },
    { value: "serpente", label: "🐍 Serpente - Transformação e cura" },
    { value: "urso", label: "🐻 Urso - Força e proteção" },
    { value: "coruja", label: "🦉 Coruja - Sabedoria e mistério" },
    { value: "jaguar", label: "🐅 Jaguar - Poder e xamanismo" },
    { value: "condor", label: "🦅 Condor - Visão espiritual" },
    { value: "coiote", label: "🐺 Coiote - Astúcia e adaptação" },
    { value: "veado", label: "🦌 Veado - Gentileza e sensibilidade" },
    { value: "tartaruga", label: "🐢 Tartaruga - Paciência e longevidade" },
    { value: "golfinho", label: "🐬 Golfinho - Inteligência e alegria" },
    { value: "borboleta", label: "🦋 Borboleta - Transformação e renascimento" },
    { value: "libélula", label: "🪲 Libélula - Mudança e adaptabilidade" },
    { value: "beija-flor", label: "🐦 Beija-flor - Alegria e energia" },
    { value: "outro", label: "🌟 Outro animal" },
  ]

  const estadoCivilOptions = [
    { value: "", label: "Selecione seu estado civil" },
    { value: "solteiro", label: "Solteiro(a)" },
    { value: "casado", label: "Casado(a)" },
    { value: "relacionamento-aberto", label: "Relacionamento Aberto" },
    { value: "disponivel", label: "Disponível" },
  ]

  const preferenciaOptions = [
    { value: "", label: "Selecione sua preferência" },
    { value: "homem", label: "Homem" },
    { value: "mulher", label: "Mulher" },
    { value: "humanos", label: "Todos os humanos" },
  ]

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
          {/* Progress Indicator */}
          <div className="flex justify-center gap-3 mb-3 flex-shrink-0">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className={`progress-circle ${step === currentStep ? "active" : ""}`}>
                {step}
              </div>
            ))}
          </div>

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
              <form className="space-y-4 pr-2">
                {/* Step 1: Cadastro Único */}
                {currentStep === 1 && (
                  <div className="space-y-4 fade-in">
                    <div className="form-section">
                      <h3 className="section-title">Foto de Perfil</h3>
                      <div className="file-upload">
                        <input type="file" accept="image/*" onChange={handleFileChange} id="photo-upload" />
                        <label htmlFor="photo-upload" className="file-upload-label">
                          <Icon icon="mdi:camera-plus" className="w-6 h-6 text-[#2E4A2F]" />
                          <span className="font-sans">
                            {formData.photo ? formData.photo.name : "Escolha sua foto de perfil"}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3 className="section-title">Informações Pessoais</h3>
                      <div className="space-y-3">
                        {/* Nome */}
                        <div className="input-with-icon">
                          <Icon icon="mdi:account" className="input-icon" />
                          <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            placeholder="Seu nome completo"
                            className="input-glassmorphism font-sans"
                          />
                          {errors.nome && <div className="error-message font-sans">{errors.nome}</div>}
                        </div>

                        {/* Apelido */}
                        <div className="input-with-icon">
                          <Icon icon="mdi:account-outline" className="input-icon" />
                          <input
                            type="text"
                            name="apelido"
                            value={formData.apelido}
                            onChange={handleInputChange}
                            placeholder="Como gosta de ser chamado(a)"
                            className="input-glassmorphism font-sans"
                          />
                        </div>

                        {/* Email */}
                        <div className="input-with-icon">
                          <Icon icon="mdi:email" className="input-icon" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="seu@email.com"
                            className="input-glassmorphism font-sans"
                          />
                          {errors.email && <div className="error-message font-sans">{errors.email}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Dados Pessoais */}
                {currentStep === 2 && (
                  <div className="space-y-4 fade-in">
                    <div className="form-section">
                      <h3 className="section-title">Informações Astrológicas</h3>
                      <div className="space-y-3">
                        {/* Data de Nascimento */}
                        <div className="input-with-icon">
                          <Icon icon="mdi:calendar" className="input-icon" />
                          <input
                            type="date"
                            name="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={handleInputChange}
                            className="input-glassmorphism font-sans"
                          />
                          {errors.dataNascimento && (
                            <div className="error-message font-sans">{errors.dataNascimento}</div>
                          )}
                        </div>

                        {/* Signo */}
                        {formData.signo && (
                          <div className="input-with-icon tooltip-trigger">
                            <Icon icon="mdi:star-circle" className="input-icon" />
                            <input
                              type="text"
                              name="signo"
                              value={formData.signo}
                              className="input-glassmorphism font-sans"
                              readOnly
                              placeholder="Seu signo aparecerá aqui"
                            />
                            <div className="tooltip-glassmorphism font-sans">
                              {formData.signo}: {getZodiacDescription(formData.signo)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Perfil Espiritual */}
                {currentStep === 3 && (
                  <div className="space-y-4 fade-in">
                    <div className="form-section">
                      <h3 className="section-title">Sua Jornada Espiritual</h3>
                      <div className="space-y-3">
                        {/* Bio */}
                        <div className="input-with-icon tooltip-trigger">
                          <Icon icon="mdi:feather" className="input-icon" style={{ top: "1.25rem" }} />
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Conte sobre sua jornada espiritual, suas experiências e o que busca..."
                            className="input-glassmorphism font-sans resize-none"
                            rows={4}
                            maxLength={140}
                          />
                          <div className="tooltip-glassmorphism font-sans">Descreva sua essência espiritual</div>
                          <div className="flex justify-between items-center mt-2">
                            {errors.bio && <div className="error-message font-sans">{errors.bio}</div>}
                            <div className="text-xs text-[#2C4A7E] opacity-60 font-sans ml-auto">
                              {formData.bio.length}/140
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3 className="section-title">Experiências Xamânicas</h3>
                      <div className="space-y-3">
                        {/* Início do Caminho Espiritual */}
                        <div className="input-with-icon">
                          <Icon icon="mdi:compass" className="input-icon" />
                          <select
                            name="inicioJornada"
                            value={formData.inicioJornada}
                            onChange={handleInputChange}
                            className="select-glassmorphism font-sans"
                          >
                            {inicioJornadaOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.inicioJornada && (
                            <div className="error-message font-sans">{errors.inicioJornada}</div>
                          )}
                        </div>

                        {/* Tempo de Experiência de Consagração */}
                        <div className="input-with-icon">
                          <Icon icon="mdi:cup" className="input-icon" />
                          <select
                            name="tempoExperiencia"
                            value={formData.tempoExperiencia}
                            onChange={handleInputChange}
                            className="select-glassmorphism font-sans"
                          >
                            {tempoExperienciaOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Animal de Poder */}
                        <div className="input-with-icon">
                          <Icon icon="mdi:paw" className="input-icon" />
                          <select
                            name="animalPoder"
                            value={formData.animalPoder}
                            onChange={handleInputChange}
                            className="select-glassmorphism font-sans"
                          >
                            {animalOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.animalPoder && <div className="error-message font-sans">{errors.animalPoder}</div>}
                        </div>

                        {/* Outro Animal */}
                        {formData.animalPoder === "outro" && (
                          <div className="input-with-icon">
                            <Icon icon="mdi:star" className="input-icon" />
                            <input
                              type="text"
                              name="outroAnimal"
                              value={formData.outroAnimal}
                              onChange={handleInputChange}
                              placeholder="Qual é seu animal de poder?"
                              className="input-glassmorphism font-sans"
                            />
                            {errors.outroAnimal && <div className="error-message font-sans">{errors.outroAnimal}</div>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Preferências */}
                {currentStep === 4 && (
                  <div className="space-y-4 fade-in">
                    <div className="form-section">
                      <h3 className="section-title">Preferências Pessoais</h3>
                      <div className="space-y-3">
                        {/* Estado Civil */}
                        <div className="input-with-icon">
                          <Icon icon="mdi:heart" className="input-icon" />
                          <select
                            name="estadoCivil"
                            value={formData.estadoCivil}
                            onChange={handleInputChange}
                            className="select-glassmorphism font-sans"
                          >
                            {estadoCivilOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.estadoCivil && <div className="error-message font-sans">{errors.estadoCivil}</div>}
                        </div>

                        {/* Preferência */}
                        <div className="input-with-icon">
                          <Icon icon="mdi:account-group" className="input-icon" />
                          <select
                            name="preferencia"
                            value={formData.preferencia}
                            onChange={handleInputChange}
                            className="select-glassmorphism font-sans"
                          >
                            {preferenciaOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.preferencia && <div className="error-message font-sans">{errors.preferencia}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Navigation Buttons - fixos no final */}
            <div className="flex gap-3 pt-4 border-t border-[#A67B5B]/20 flex-shrink-0 mt-4">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="btn-secondary flex-1 font-sans py-3">
                  <Icon icon="mdi:arrow-left" className="w-4 h-4 inline mr-2" />
                  Anterior
                </button>
              )}
              <button
                type="button"
                onClick={
                  currentStep === 4
                    ? (e) => {
                        e.preventDefault()
                        if (validateStep()) {
                          console.log("Form submitted:", formData)
                          window.location.href = "/dashboard"
                        }
                      }
                    : nextStep
                }
                className="btn-primary flex-1 font-sans py-3"
              >
                {currentStep === 4 ? (
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
          </div>
        </div>
      </div>
    </div>
  )
}

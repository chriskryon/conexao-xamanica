"use client"
import { useState, useCallback } from "react"
import type React from "react"

import { Icon } from "@iconify/react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"

interface User {
  name: string
  avatar: string
  powerAnimal: string
  lastActivity: string
}

interface ConsagracaoForm {
  tipoRitual: string
  outroRitual: string
  data: string
  hora: string
  descricao: string
  intensidade: number
  local: string
  notasAdicionais: string
  midia: File[]
}

interface DiarioForm {
  data: string
  titulo: string
  reflexao: string
  tags: string[]
  humor: string
}

interface TimelineItem {
  id: string
  type: "consagracao" | "diario"
  title: string
  description: string
  date: string
  time: string
  intensity?: number
  mood?: string
  tags?: string[]
  ritual?: string
}

interface FormErrors {
  [key: string]: string
}

const moodOptions = [
  { value: "feliz", emoji: "😊", label: "Feliz" },
  { value: "grato", emoji: "🙏", label: "Grato" },
  { value: "reflexivo", emoji: "🤔", label: "Reflexivo" },
  { value: "triste", emoji: "😔", label: "Triste" },
  { value: "inspirado", emoji: "🌟", label: "Inspirado" },
  { value: "calmo", emoji: "😌", label: "Calmo" },
  { value: "ansioso", emoji: "😰", label: "Ansioso" },
  { value: "energizado", emoji: "⚡", label: "Energizado" },
]

const ritualOptions = [
  { value: "", label: "Selecione o tipo de ritual" },
  { value: "ayahuasca", label: "🌿 Ayahuasca" },
  { value: "rape", label: "🍃 Rapé" },
  { value: "kambo", label: "🐸 Kambô" },
  { value: "outros", label: "✨ Outros" },
]

export default function RegistrarExperiencia() {
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<string | null>(null)
  const [showConsagracaoModal, setShowConsagracaoModal] = useState(false)
  const [showDiarioModal, setShowDiarioModal] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [newTag, setNewTag] = useState("")

  const [consagracaoData, setConsagracaoData] = useState<ConsagracaoForm>({
    tipoRitual: "",
    outroRitual: "",
    data: "",
    hora: "",
    descricao: "",
    intensidade: 0,
    local: "",
    notasAdicionais: "",
    midia: [],
  })

  const [diarioData, setDiarioData] = useState<DiarioForm>({
    data: new Date().toISOString().split("T")[0],
    titulo: "",
    reflexao: "",
    tags: [],
    humor: "",
  })

  const user: User = {
    name: "Maria Silva",
    avatar: "/placeholder.svg?height=80&width=80",
    powerAnimal: "Águia",
    lastActivity: "2 horas atrás",
  }

  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    {
      id: "1",
      type: "consagracao",
      title: "Cerimônia de Ayahuasca",
      description:
        "Experiência profunda de conexão com a natureza e ancestrais. Visões de cura e renovação espiritual.",
      date: "03/07/2025",
      time: "19:30",
      intensity: 5,
      ritual: "Ayahuasca",
      tags: ["cura", "visões", "ancestrais"],
    },
    {
      id: "2",
      type: "diario",
      title: "Reflexão sobre Gratidão",
      description: "Momento de introspecção profunda sobre as bênçãos recebidas e o caminho espiritual percorrido.",
      date: "02/07/2025",
      time: "08:15",
      mood: "grato",
      tags: ["gratidão", "reflexão", "bênçãos"],
    },
    {
      id: "3",
      type: "consagracao",
      title: "Ritual de Rapé",
      description: "Limpeza energética e foco mental. Conexão com a respiração e presença no momento atual.",
      date: "01/07/2025",
      time: "16:45",
      intensity: 3,
      ritual: "Rapé",
      tags: ["limpeza", "foco", "respiração"],
    },
    {
      id: "4",
      type: "diario",
      title: "Sonhos e Símbolos",
      description: "Registro de sonhos significativos com símbolos xamânicos e mensagens do inconsciente.",
      date: "30/06/2025",
      time: "07:00",
      mood: "inspirado",
      tags: ["sonhos", "símbolos", "inconsciente"],
    },
  ])

  const handleTimelineClick = (itemId: string) => {
    setSelectedTimelineItem(selectedTimelineItem === itemId ? null : itemId)
  }

  const openConsagracaoModal = () => {
    setShowConsagracaoModal(true)
    resetConsagracaoForm()
  }

  const openDiarioModal = () => {
    setShowDiarioModal(true)
    resetDiarioForm()
  }

  const closeModals = () => {
    setShowConsagracaoModal(false)
    setShowDiarioModal(false)
    setErrors({})
  }

  const resetConsagracaoForm = () => {
    setConsagracaoData({
      tipoRitual: "",
      outroRitual: "",
      data: "",
      hora: "",
      descricao: "",
      intensidade: 0,
      local: "",
      notasAdicionais: "",
      midia: [],
    })
  }

  const resetDiarioForm = () => {
    setDiarioData({
      data: new Date().toISOString().split("T")[0],
      titulo: "",
      reflexao: "",
      tags: [],
      humor: "",
    })
    setNewTag("")
  }

  const handleConsagracaoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setConsagracaoData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleDiarioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDiarioData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleIntensityClick = (level: number) => {
    setConsagracaoData((prev) => ({ ...prev, intensidade: level }))
  }

  const handleMoodSelect = (mood: string) => {
    setDiarioData((prev) => ({ ...prev, humor: mood }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setConsagracaoData((prev) => ({ ...prev, midia: [...prev.midia, ...files] }))
  }

  const removeFile = (index: number) => {
    setConsagracaoData((prev) => ({
      ...prev,
      midia: prev.midia.filter((_, i) => i !== index),
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !diarioData.tags.includes(newTag.trim())) {
      setDiarioData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setDiarioData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const validateConsagracao = () => {
    const newErrors: FormErrors = {}

    if (!consagracaoData.tipoRitual) newErrors.tipoRitual = "Tipo de ritual é obrigatório"
    if (consagracaoData.tipoRitual === "outros" && !consagracaoData.outroRitual) {
      newErrors.outroRitual = "Especifique o tipo de ritual"
    }
    if (!consagracaoData.data) newErrors.data = "Data é obrigatória"
    if (!consagracaoData.descricao.trim()) newErrors.descricao = "Descrição é obrigatória"
    if (consagracaoData.intensidade === 0) newErrors.intensidade = "Selecione o nível de intensidade"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateDiario = () => {
    const newErrors: FormErrors = {}

    if (!diarioData.titulo.trim()) newErrors.titulo = "Título é obrigatório"
    if (!diarioData.reflexao.trim()) newErrors.reflexao = "Reflexão é obrigatória"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitConsagracao = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateConsagracao()) {
      // Create new timeline item
      const newItem: TimelineItem = {
        id: Date.now().toString(),
        type: "consagracao",
        title: `Ritual de ${consagracaoData.tipoRitual === "outros" ? consagracaoData.outroRitual : consagracaoData.tipoRitual}`,
        description: consagracaoData.descricao,
        date: new Date(consagracaoData.data).toLocaleDateString("pt-BR"),
        time: consagracaoData.hora || "00:00",
        intensity: consagracaoData.intensidade,
        ritual: consagracaoData.tipoRitual === "outros" ? consagracaoData.outroRitual : consagracaoData.tipoRitual,
        tags: [consagracaoData.tipoRitual, consagracaoData.local].filter(Boolean),
      }

      setTimelineItems((prev) => [newItem, ...prev])
      closeModals()
      resetConsagracaoForm()
    }
  }

  const handleSubmitDiario = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateDiario()) {
      // Create new timeline item
      const newItem: TimelineItem = {
        id: Date.now().toString(),
        type: "diario",
        title: diarioData.titulo,
        description: diarioData.reflexao,
        date: new Date(diarioData.data).toLocaleDateString("pt-BR"),
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        mood: diarioData.humor,
        tags: diarioData.tags,
      }

      setTimelineItems((prev) => [newItem, ...prev])
      closeModals()
      resetDiarioForm()
    }
  }

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container)
  }, [])

  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      feliz: "😊",
      grato: "🙏",
      reflexivo: "🤔",
      triste: "😔",
      inspirado: "🌟",
      calmo: "😌",
      ansioso: "😰",
      energizado: "⚡",
    }
    return moodMap[mood] || "😊"
  }

  const getRitualIcon = (ritual: string) => {
    const ritualMap: { [key: string]: string } = {
      ayahuasca: "mdi:cup",
      Ayahuasca: "mdi:cup",
      rape: "mdi:leaf",
      Rapé: "mdi:leaf",
      kambo: "mdi:water",
      Kambô: "mdi:water",
    }
    return ritualMap[ritual] || "mdi:feather"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] relative overflow-x-hidden">
      {/* Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: false },
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: { distance: 80, duration: 0.4 },
            },
          },
          particles: {
            color: { value: ["#2E4A2F", "#D6BCFA"] },
            links: { enable: false },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 0.3,
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 12 },
            opacity: { value: 0.08 },
            shape: { type: ["star", "circle"] },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Header */}
      <header className="relative z-20 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo */}
            <div className="flex items-center gap-3">
              <Icon icon="mdi:eagle" className="w-8 h-8 text-[#2E4A2F]" />
              <div>
                <h1 className="font-sans text-xl font-bold text-[#2E4A2F]">Diário Xamânico</h1>
                <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Dashboard Espiritual</p>
              </div>
            </div>

            {/* Right - Compact Profile */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-[#D6BCFA]/30"
              />
              <div className="hidden sm:block">
                <p className="font-sans text-sm font-semibold text-[#2E4A2F]">{user.name}</p>
                <p className="font-sans text-xs text-[#2C4A7E] opacity-70">🦅 {user.powerAnimal}</p>
              </div>
              <Icon icon="mdi:chevron-down" className="w-4 h-4 text-[#2C4A7E] opacity-70" />
            </div>
          </div>
        </div>
      </header>

      {/* Modal Overlays */}
      {(showConsagracaoModal || showDiarioModal) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Consagração Modal */}
            {showConsagracaoModal && (
              <div className="modal-glassmorphism fade-in">
                <div className="modal-header">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#2E4A2F] to-[#1a2e1b] rounded-xl flex items-center justify-center">
                        <Icon icon="mdi:feather" className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-sans text-xl font-bold text-[#2E4A2F]">Nova Experiência de Consagração</h2>
                        <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Registre seu ritual sagrado</p>
                      </div>
                    </div>
                    <button
                      onClick={closeModals}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    >
                      <Icon icon="mdi:close" className="w-6 h-6 text-[#2C4A7E]" />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmitConsagracao} className="space-y-6">
                  {/* Tipo de Ritual */}
                  <div className="form-section">
                    <h3 className="section-title">Tipo de Ritual</h3>
                    <div className="space-y-4">
                      <div className="input-with-icon">
                        <Icon icon="mdi:leaf" className="input-icon" />
                        <select
                          name="tipoRitual"
                          value={consagracaoData.tipoRitual}
                          onChange={handleConsagracaoChange}
                          className="select-glassmorphism font-sans"
                        >
                          {ritualOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.tipoRitual && <div className="error-message font-sans">{errors.tipoRitual}</div>}
                      </div>

                      {consagracaoData.tipoRitual === "outros" && (
                        <div className="input-with-icon">
                          <Icon icon="mdi:pencil" className="input-icon" />
                          <input
                            type="text"
                            name="outroRitual"
                            value={consagracaoData.outroRitual}
                            onChange={handleConsagracaoChange}
                            placeholder="Especifique o tipo de ritual"
                            className="input-glassmorphism font-sans"
                          />
                          {errors.outroRitual && <div className="error-message font-sans">{errors.outroRitual}</div>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Data e Hora */}
                  <div className="form-section">
                    <h3 className="section-title">Data e Hora</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="input-with-icon">
                        <Icon icon="mdi:calendar" className="input-icon" />
                        <input
                          type="date"
                          name="data"
                          value={consagracaoData.data}
                          onChange={handleConsagracaoChange}
                          className="input-glassmorphism font-sans"
                        />
                        {errors.data && <div className="error-message font-sans">{errors.data}</div>}
                      </div>
                      <div className="input-with-icon">
                        <Icon icon="mdi:clock" className="input-icon" />
                        <input
                          type="time"
                          name="hora"
                          value={consagracaoData.hora}
                          onChange={handleConsagracaoChange}
                          className="input-glassmorphism font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="form-section">
                    <h3 className="section-title">Descrição da Experiência</h3>
                    <div className="input-with-icon">
                      <Icon icon="mdi:text" className="input-icon" style={{ top: "1.25rem" }} />
                      <textarea
                        name="descricao"
                        value={consagracaoData.descricao}
                        onChange={handleConsagracaoChange}
                        placeholder="Descreva suas visões, sentimentos, aprendizados ou mensagens recebidas..."
                        className="input-glassmorphism font-sans resize-none"
                        rows={4}
                      />
                      {errors.descricao && <div className="error-message font-sans">{errors.descricao}</div>}
                    </div>
                  </div>

                  {/* Nível de Intensidade */}
                  <div className="form-section">
                    <h3 className="section-title">Nível de Intensidade</h3>
                    <div className="intensity-selector">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleIntensityClick(level)}
                          className={`intensity-button ${consagracaoData.intensidade >= level ? "active" : ""}`}
                        >
                          <Icon icon="mdi:star" className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                    <p className="text-center text-sm text-[#2C4A7E] opacity-70 font-sans">
                      {consagracaoData.intensidade === 0 && "Selecione o nível de intensidade"}
                      {consagracaoData.intensidade === 1 && "Muito Suave"}
                      {consagracaoData.intensidade === 2 && "Suave"}
                      {consagracaoData.intensidade === 3 && "Moderada"}
                      {consagracaoData.intensidade === 4 && "Intensa"}
                      {consagracaoData.intensidade === 5 && "Muito Intensa"}
                    </p>
                    {errors.intensidade && (
                      <div className="error-message font-sans text-center">{errors.intensidade}</div>
                    )}
                  </div>

                  {/* Local e Notas */}
                  <div className="form-section">
                    <h3 className="section-title">Detalhes Adicionais</h3>
                    <div className="space-y-4">
                      <div className="input-with-icon">
                        <Icon icon="mdi:map-marker" className="input-icon" />
                        <input
                          type="text"
                          name="local"
                          value={consagracaoData.local}
                          onChange={handleConsagracaoChange}
                          placeholder="Local do ritual (opcional)"
                          className="input-glassmorphism font-sans"
                        />
                      </div>
                      <div className="input-with-icon">
                        <Icon icon="mdi:note-text" className="input-icon" style={{ top: "1.25rem" }} />
                        <textarea
                          name="notasAdicionais"
                          value={consagracaoData.notasAdicionais}
                          onChange={handleConsagracaoChange}
                          placeholder="Notas adicionais: pessoas presentes, facilitadores, contexto..."
                          className="input-glassmorphism font-sans resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload de Mídia */}
                  <div className="form-section">
                    <h3 className="section-title">Mídia (Opcional)</h3>
                    <div className="file-upload">
                      <input
                        type="file"
                        multiple
                        accept="image/*,audio/*"
                        onChange={handleFileUpload}
                        id="media-upload"
                      />
                      <label htmlFor="media-upload" className="file-upload-label">
                        <Icon icon="mdi:camera-plus" className="w-6 h-6 text-[#2E4A2F]" />
                        <span className="font-sans">Adicionar fotos ou áudios</span>
                      </label>
                    </div>

                    {consagracaoData.midia.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {consagracaoData.midia.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
                            <span className="font-sans text-sm text-[#2C4A7E]">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Icon icon="mdi:close" className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-[#A67B5B]/20">
                    <button type="button" onClick={closeModals} className="btn-secondary flex-1 font-sans">
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary flex-1 font-sans">
                      <Icon icon="mdi:content-save" className="w-5 h-5 inline mr-2" />
                      Salvar Experiência
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Diário Modal */}
            {showDiarioModal && (
              <div className="modal-glassmorphism fade-in">
                <div className="modal-header">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#D6BCFA] to-[#b794f6] rounded-xl flex items-center justify-center">
                        <Icon icon="mdi:book-open" className="w-6 h-6 text-[#2E4A2F]" />
                      </div>
                      <div>
                        <h2 className="font-sans text-xl font-bold text-[#2E4A2F]">Nova Reflexão</h2>
                        <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Registre seus pensamentos</p>
                      </div>
                    </div>
                    <button
                      onClick={closeModals}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    >
                      <Icon icon="mdi:close" className="w-6 h-6 text-[#2C4A7E]" />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmitDiario} className="space-y-6">
                  {/* Data e Título */}
                  <div className="form-section">
                    <h3 className="section-title">Informações Básicas</h3>
                    <div className="space-y-4">
                      <div className="input-with-icon">
                        <Icon icon="mdi:calendar" className="input-icon" />
                        <input
                          type="date"
                          name="data"
                          value={diarioData.data}
                          onChange={handleDiarioChange}
                          className="input-glassmorphism font-sans"
                        />
                      </div>
                      <div className="input-with-icon">
                        <Icon icon="mdi:format-title" className="input-icon" />
                        <input
                          type="text"
                          name="titulo"
                          value={diarioData.titulo}
                          onChange={handleDiarioChange}
                          placeholder="Título da entrada (ex: Gratidão de Hoje)"
                          className="input-glassmorphism font-sans"
                        />
                        {errors.titulo && <div className="error-message font-sans">{errors.titulo}</div>}
                      </div>
                    </div>
                  </div>

                  {/* Reflexão */}
                  <div className="form-section">
                    <h3 className="section-title">Sua Reflexão</h3>
                    <div className="input-with-icon">
                      <Icon icon="mdi:heart" className="input-icon" style={{ top: "1.25rem" }} />
                      <textarea
                        name="reflexao"
                        value={diarioData.reflexao}
                        onChange={handleDiarioChange}
                        placeholder="O que está em seu coração hoje? Registre suas emoções, ideias ou aprendizados..."
                        className="input-glassmorphism font-sans resize-none"
                        rows={6}
                      />
                      {errors.reflexao && <div className="error-message font-sans">{errors.reflexao}</div>}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="form-section">
                    <h3 className="section-title">Tags</h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div className="input-with-icon flex-1">
                          <Icon icon="mdi:tag" className="input-icon" />
                          <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Adicionar tag (ex: Gratidão, Autoconhecimento)"
                            className="input-glassmorphism font-sans"
                          />
                        </div>
                        <button type="button" onClick={addTag} className="btn-secondary px-4">
                          <Icon icon="mdi:plus" className="w-5 h-5" />
                        </button>
                      </div>

                      {diarioData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {diarioData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-[#D6BCFA]/20 text-[#2C4A7E] px-3 py-1 rounded-full text-sm font-sans flex items-center gap-2"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="hover:text-red-500 transition-colors"
                              >
                                <Icon icon="mdi:close" className="w-4 h-4" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Humor */}
                  <div className="form-section">
                    <h3 className="section-title">Como você está se sentindo?</h3>
                    <div className="mood-grid">
                      {moodOptions.map((mood) => (
                        <button
                          key={mood.value}
                          type="button"
                          onClick={() => handleMoodSelect(mood.value)}
                          className={`mood-button ${diarioData.humor === mood.value ? "active" : ""}`}
                        >
                          <div className="text-2xl mb-2">{mood.emoji}</div>
                          <div className="text-xs font-sans text-[#2C4A7E]">{mood.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-[#A67B5B]/20">
                    <button type="button" onClick={closeModals} className="btn-secondary flex-1 font-sans">
                      Cancelar
                    </button>
                    <button type="submit" className="btn-primary flex-1 font-sans">
                      <Icon icon="mdi:content-save" className="w-5 h-5 inline mr-2" />
                      Salvar Reflexão
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Experiência de Consagração Card */}
          <div
            className="card-glassmorphism group cursor-pointer hover:scale-[1.02] transition-all duration-300"
            onClick={openConsagracaoModal}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2E4A2F] to-[#1a2e1b] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon icon="mdi:feather" className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="font-sans text-xl font-bold text-[#2E4A2F] mb-1">Experiência de Consagração</h2>
                  <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Registre rituais sagrados</p>
                </div>
              </div>
              <Icon
                icon="mdi:plus-circle"
                className="w-6 h-6 text-[#D6BCFA] group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-[#2C4A7E]">
                <Icon icon="mdi:cup" className="w-5 h-5 text-[#2E4A2F]" />
                <span>Ayahuasca, Rapé, Kambô</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2C4A7E]">
                <Icon icon="mdi:star" className="w-5 h-5 text-[#2E4A2F]" />
                <span>Nível de intensidade</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2C4A7E]">
                <Icon icon="mdi:camera" className="w-5 h-5 text-[#2E4A2F]" />
                <span>Fotos e áudios</span>
              </div>
            </div>

            <button className="btn-primary w-full group-hover:shadow-lg transition-all duration-300">
              <Icon icon="mdi:plus" className="w-5 h-5 inline mr-2" />
              Adicionar Experiência
            </button>
          </div>

          {/* Diário de Vida Card */}
          <div
            className="card-glassmorphism group cursor-pointer hover:scale-[1.02] transition-all duration-300"
            onClick={openDiarioModal}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D6BCFA] to-[#b794f6] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon icon="mdi:book-open" className="w-8 h-8 text-[#2E4A2F]" />
                </div>
                <div>
                  <h2 className="font-sans text-xl font-bold text-[#2E4A2F] mb-1">Diário de Vida</h2>
                  <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Reflexões e pensamentos</p>
                </div>
              </div>
              <Icon
                icon="mdi:plus-circle"
                className="w-6 h-6 text-[#D6BCFA] group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-[#2C4A7E]">
                <Icon icon="mdi:heart" className="w-5 h-5 text-[#2E4A2F]" />
                <span>Estado emocional</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2C4A7E]">
                <Icon icon="mdi:tag" className="w-5 h-5 text-[#2E4A2F]" />
                <span>Tags personalizadas</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2C4A7E]">
                <Icon icon="mdi:calendar" className="w-5 h-5 text-[#2E4A2F]" />
                <span>Registro diário</span>
              </div>
            </div>

            <button className="btn-primary w-full group-hover:shadow-lg transition-all duration-300">
              <Icon icon="mdi:plus" className="w-5 h-5 inline mr-2" />
              Nova Reflexão
            </button>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="card-glassmorphism">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-sans text-2xl font-bold text-[#2E4A2F] mb-2">Histórico Recente</h2>
              <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Suas últimas experiências e reflexões</p>
            </div>
            <button className="btn-secondary px-6 py-2 text-sm hover:scale-105 transition-all duration-300">
              Ver Tudo
              <Icon icon="mdi:arrow-right" className="w-4 h-4 inline ml-2" />
            </button>
          </div>

          <div className="space-y-6">
            {timelineItems.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Timeline Line */}
                {index < timelineItems.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-[#D6BCFA] to-transparent opacity-30" />
                )}

                {/* Timeline Item */}
                <div
                  className={`flex gap-6 p-6 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    selectedTimelineItem === item.id
                      ? "bg-white/20 border-[#D6BCFA]/50 shadow-lg"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#D6BCFA]/30"
                  }`}
                  onClick={() => handleTimelineClick(item.id)}
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      item.type === "consagracao"
                        ? "bg-gradient-to-br from-[#2E4A2F] to-[#1a2e1b]"
                        : "bg-gradient-to-br from-[#D6BCFA] to-[#b794f6]"
                    }`}
                  >
                    <Icon
                      icon={item.type === "consagracao" ? getRitualIcon(item.ritual || "") : "mdi:book-open"}
                      className={`w-8 h-8 ${item.type === "consagracao" ? "text-white" : "text-[#2E4A2F]"}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-1">{item.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-[#2C4A7E] opacity-70">
                          <span className="flex items-center gap-1">
                            <Icon icon="mdi:calendar" className="w-4 h-4" />
                            {item.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon icon="mdi:clock" className="w-4 h-4" />
                            {item.time}
                          </span>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.type === "consagracao"
                            ? "bg-[#2E4A2F]/20 text-[#2E4A2F]"
                            : "bg-[#D6BCFA]/20 text-[#2C4A7E]"
                        }`}
                      >
                        {item.type === "consagracao" ? "Consagração" : "Diário"}
                      </span>
                    </div>

                    <p className="font-sans text-[#2C4A7E] mb-4 leading-relaxed line-clamp-3 break-words">
                      {item.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-6 flex-wrap overflow-hidden">
                      {item.intensity && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-[#2C4A7E] opacity-70">Intensidade:</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <Icon
                                key={level}
                                icon="mdi:star"
                                className={`w-4 h-4 ${
                                  level <= item.intensity! ? "text-[#D6BCFA]" : "text-[#2C4A7E] opacity-30"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {item.mood && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-[#2C4A7E] opacity-70">Humor:</span>
                          <span className="text-lg">{getMoodEmoji(item.mood)}</span>
                        </div>
                      )}

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs font-medium text-[#2C4A7E] opacity-70 flex-shrink-0">Tags:</span>
                          <div className="flex gap-1 flex-wrap min-w-0">
                            {item.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-[#D6BCFA]/10 text-[#2C4A7E] rounded-full text-xs truncate max-w-20"
                              >
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 2 && (
                              <span className="px-2 py-1 bg-[#D6BCFA]/10 text-[#2C4A7E] rounded-full text-xs flex-shrink-0">
                                +{item.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Expanded Content */}
                    {selectedTimelineItem === item.id && (
                      <div className="mt-4 pt-4 border-t border-white/10 fade-in">
                        <div className="flex gap-4">
                          <button className="btn-secondary text-sm px-4 py-2">
                            <Icon icon="mdi:pencil" className="w-4 h-4 inline mr-1" />
                            Editar
                          </button>
                          <button className="btn-secondary text-sm px-4 py-2">
                            <Icon icon="mdi:share" className="w-4 h-4 inline mr-1" />
                            Compartilhar
                          </button>
                          <button className="btn-secondary text-sm px-4 py-2">
                            <Icon icon="mdi:download" className="w-4 h-4 inline mr-1" />
                            Exportar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="btn-secondary px-8 py-3 hover:scale-105 transition-all duration-300">
              <Icon icon="mdi:refresh" className="w-5 h-5 inline mr-2" />
              Carregar Mais
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

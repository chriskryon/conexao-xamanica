"use client"
import { useState, useCallback } from "react"

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
  location?: string
  notes?: string
}

interface FilterState {
  type: "all" | "consagracao" | "diario"
  dateRange: "all" | "week" | "month" | "year"
  searchTerm: string
  tags: string[]
}

export default function HistoricoPage() {
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<string | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    type: "all",
    dateRange: "all",
    searchTerm: "",
    tags: [],
  })

  const user: User = {
    name: "Maria Silva",
    avatar: "/placeholder.svg?height=80&width=80",
    powerAnimal: "Águia",
    lastActivity: "2 horas atrás",
  }

  const [timelineItems] = useState<TimelineItem[]>([
    {
      id: "1",
      type: "consagracao",
      title: "Cerimônia de Ayahuasca",
      description:
        "Experiência profunda de conexão com a natureza e ancestrais. Visões de cura e renovação espiritual. Durante a cerimônia, recebi mensagens importantes sobre meu caminho de vida e propósito espiritual.",
      date: "03/07/2025",
      time: "19:30",
      intensity: 5,
      ritual: "Ayahuasca",
      location: "Centro Xamânico Luz da Floresta",
      notes: "Facilitador: João da Silva. Participantes: 12 pessoas. Duração: 6 horas.",
      tags: ["cura", "visões", "ancestrais", "propósito"],
    },
    {
      id: "2",
      type: "diario",
      title: "Reflexão sobre Gratidão",
      description:
        "Momento de introspecção profunda sobre as bênçãos recebidas e o caminho espiritual percorrido. Sinto uma conexão mais forte com minha essência.",
      date: "02/07/2025",
      time: "08:15",
      mood: "grato",
      tags: ["gratidão", "reflexão", "bênçãos", "essência"],
    },
    {
      id: "3",
      type: "consagracao",
      title: "Ritual de Rapé",
      description:
        "Limpeza energética e foco mental. Conexão com a respiração e presença no momento atual. Senti uma clareza mental incrível.",
      date: "01/07/2025",
      time: "16:45",
      intensity: 3,
      ritual: "Rapé",
      location: "Casa",
      notes: "Rapé de Tsunu. Momento de meditação profunda.",
      tags: ["limpeza", "foco", "respiração", "clareza"],
    },
    {
      id: "4",
      type: "diario",
      title: "Sonhos e Símbolos",
      description:
        "Registro de sonhos significativos com símbolos xamânicos e mensagens do inconsciente. Apareceu uma águia dourada voando sobre montanhas.",
      date: "30/06/2025",
      time: "07:00",
      mood: "inspirado",
      tags: ["sonhos", "símbolos", "inconsciente", "águia"],
    },
    {
      id: "5",
      type: "consagracao",
      title: "Cerimônia de Kambô",
      description: "Ritual de purificação com medicina da floresta. Processo intenso de limpeza física e energética.",
      date: "28/06/2025",
      time: "10:00",
      intensity: 4,
      ritual: "Kambô",
      location: "Centro de Medicina Ancestral",
      notes: "Aplicação de 5 pontos. Jejum de 12 horas antes.",
      tags: ["purificação", "limpeza", "medicina", "floresta"],
    },
    {
      id: "6",
      type: "diario",
      title: "Conexão com a Natureza",
      description: "Caminhada na floresta trouxe insights profundos sobre minha relação com os elementos naturais.",
      date: "25/06/2025",
      time: "14:30",
      mood: "calmo",
      tags: ["natureza", "floresta", "elementos", "insights"],
    },
  ])

  const handleTimelineClick = (itemId: string) => {
    setSelectedTimelineItem(selectedTimelineItem === itemId ? null : itemId)
  }

  const openDetailModal = (item: TimelineItem) => {
    setSelectedItem(item)
    setShowDetailModal(true)
  }

  const closeDetailModal = () => {
    setShowDetailModal(false)
    setSelectedItem(null)
  }

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const filteredItems = timelineItems.filter((item) => {
    // Filter by type
    if (filters.type !== "all" && item.type !== filters.type) return false

    // Filter by search term
    if (
      filters.searchTerm &&
      !item.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !item.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by date range
    if (filters.dateRange !== "all") {
      const itemDate = new Date(item.date.split("/").reverse().join("-"))
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - itemDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      switch (filters.dateRange) {
        case "week":
          if (diffDays > 7) return false
          break
        case "month":
          if (diffDays > 30) return false
          break
        case "year":
          if (diffDays > 365) return false
          break
      }
    }

    return true
  })

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

  const getStatsData = () => {
    const totalEntries = timelineItems.length
    const consagracaoEntries = timelineItems.filter((item) => item.type === "consagracao").length
    const diarioEntries = timelineItems.filter((item) => item.type === "diario").length
    const avgIntensity =
      timelineItems.filter((item) => item.intensity).reduce((sum, item) => sum + (item.intensity || 0), 0) /
      timelineItems.filter((item) => item.intensity).length

    return { totalEntries, consagracaoEntries, diarioEntries, avgIntensity: avgIntensity.toFixed(1) }
  }

  const stats = getStatsData()

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
                <h1 className="font-sans text-xl font-bold text-[#2E4A2F]">Histórico Completo</h1>
                <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Sua jornada espiritual</p>
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

      {/* Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="modal-glassmorphism fade-in">
              <div className="modal-header">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedItem.type === "consagracao"
                          ? "bg-gradient-to-br from-[#2E4A2F] to-[#1a2e1b]"
                          : "bg-gradient-to-br from-[#D6BCFA] to-[#b794f6]"
                      }`}
                    >
                      <Icon
                        icon={
                          selectedItem.type === "consagracao"
                            ? getRitualIcon(selectedItem.ritual || "")
                            : "mdi:book-open"
                        }
                        className={`w-6 h-6 ${selectedItem.type === "consagracao" ? "text-white" : "text-[#2E4A2F]"}`}
                      />
                    </div>
                    <div>
                      <h2 className="font-sans text-xl font-bold text-[#2E4A2F]">{selectedItem.title}</h2>
                      <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                        {selectedItem.date} às {selectedItem.time}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeDetailModal}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                  >
                    <Icon icon="mdi:close" className="w-6 h-6 text-[#2C4A7E]" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Description */}
                <div className="form-section">
                  <h3 className="section-title">Descrição</h3>
                  <p className="font-sans text-[#2C4A7E] leading-relaxed bg-white/20 p-4 rounded-lg">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedItem.intensity && (
                    <div className="form-section">
                      <h3 className="section-title">Intensidade</h3>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <Icon
                            key={level}
                            icon="mdi:star"
                            className={`w-6 h-6 ${
                              level <= selectedItem.intensity! ? "text-[#D6BCFA]" : "text-[#2C4A7E] opacity-30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedItem.mood && (
                    <div className="form-section">
                      <h3 className="section-title">Humor</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{getMoodEmoji(selectedItem.mood)}</span>
                        <span className="font-sans text-[#2C4A7E] capitalize">{selectedItem.mood}</span>
                      </div>
                    </div>
                  )}

                  {selectedItem.location && (
                    <div className="form-section">
                      <h3 className="section-title">Local</h3>
                      <p className="font-sans text-[#2C4A7E]">{selectedItem.location}</p>
                    </div>
                  )}

                  {selectedItem.ritual && (
                    <div className="form-section">
                      <h3 className="section-title">Tipo de Ritual</h3>
                      <p className="font-sans text-[#2C4A7E]">{selectedItem.ritual}</p>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div className="form-section">
                    <h3 className="section-title">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-[#D6BCFA]/20 text-[#2C4A7E] px-3 py-1 rounded-full text-sm font-sans"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedItem.notes && (
                  <div className="form-section">
                    <h3 className="section-title">Notas Adicionais</h3>
                    <p className="font-sans text-[#2C4A7E] leading-relaxed bg-white/20 p-4 rounded-lg">
                      {selectedItem.notes}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-[#A67B5B]/20">
                  <button className="btn-secondary flex-1 font-sans">
                    <Icon icon="mdi:pencil" className="w-5 h-5 inline mr-2" />
                    Editar
                  </button>
                  <button className="btn-secondary flex-1 font-sans">
                    <Icon icon="mdi:share" className="w-5 h-5 inline mr-2" />
                    Compartilhar
                  </button>
                  <button className="btn-secondary flex-1 font-sans">
                    <Icon icon="mdi:download" className="w-5 h-5 inline mr-2" />
                    Exportar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-glassmorphism text-center">
            <Icon icon="mdi:chart-line" className="w-8 h-8 text-[#2E4A2F] mx-auto mb-2" />
            <h3 className="font-sans text-2xl font-bold text-[#2E4A2F]">{stats.totalEntries}</h3>
            <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Total de Entradas</p>
          </div>
          <div className="card-glassmorphism text-center">
            <Icon icon="mdi:feather" className="w-8 h-8 text-[#2E4A2F] mx-auto mb-2" />
            <h3 className="font-sans text-2xl font-bold text-[#2E4A2F]">{stats.consagracaoEntries}</h3>
            <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Consagrações</p>
          </div>
          <div className="card-glassmorphism text-center">
            <Icon icon="mdi:book-open" className="w-8 h-8 text-[#2E4A2F] mx-auto mb-2" />
            <h3 className="font-sans text-2xl font-bold text-[#2E4A2F]">{stats.diarioEntries}</h3>
            <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Reflexões</p>
          </div>
          <div className="card-glassmorphism text-center">
            <Icon icon="mdi:star" className="w-8 h-8 text-[#2E4A2F] mx-auto mb-2" />
            <h3 className="font-sans text-2xl font-bold text-[#2E4A2F]">{stats.avgIntensity}</h3>
            <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Intensidade Média</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card-glassmorphism mb-8">
          <h2 className="font-sans text-xl font-bold text-[#2E4A2F] mb-6">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="input-with-icon">
              <Icon icon="mdi:magnify" className="input-icon" />
              <input
                type="text"
                placeholder="Buscar por título ou descrição..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                className="input-glassmorphism font-sans"
              />
            </div>

            {/* Type Filter */}
            <div className="input-with-icon">
              <Icon icon="mdi:filter" className="input-icon" />
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="select-glassmorphism font-sans"
              >
                <option value="all">Todos os tipos</option>
                <option value="consagracao">Consagrações</option>
                <option value="diario">Reflexões</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="input-with-icon">
              <Icon icon="mdi:calendar-range" className="input-icon" />
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange("dateRange", e.target.value)}
                className="select-glassmorphism font-sans"
              >
                <option value="all">Todo o período</option>
                <option value="week">Última semana</option>
                <option value="month">Último mês</option>
                <option value="year">Último ano</option>
              </select>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="card-glassmorphism">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-sans text-2xl font-bold text-[#2E4A2F] mb-2">Linha do Tempo</h2>
              <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                {filteredItems.length} de {timelineItems.length} entradas
              </p>
            </div>
            <button className="btn-secondary px-6 py-2 text-sm hover:scale-105 transition-all duration-300">
              <Icon icon="mdi:download" className="w-4 h-4 inline mr-2" />
              Exportar Tudo
            </button>
          </div>

          <div className="space-y-6">
            {filteredItems.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Timeline Line */}
                {index < filteredItems.length - 1 && (
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
                        {item.type === "consagracao" ? "Consagração" : "Reflexão"}
                      </span>
                    </div>

                    <p className="font-sans text-[#2C4A7E] mb-4 leading-relaxed line-clamp-2 break-words">
                      {item.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-6 mb-4 flex-wrap overflow-hidden">
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

                    {/* Actions */}
                    <div className="flex gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openDetailModal(item)
                        }}
                        className="btn-secondary text-sm px-4 py-2"
                      >
                        <Icon icon="mdi:eye" className="w-4 h-4 inline mr-1" />
                        Ver Detalhes
                      </button>
                      <button className="btn-secondary text-sm px-4 py-2">
                        <Icon icon="mdi:pencil" className="w-4 h-4 inline mr-1" />
                        Editar
                      </button>
                      <button className="btn-secondary text-sm px-4 py-2">
                        <Icon icon="mdi:share" className="w-4 h-4 inline mr-1" />
                        Compartilhar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Icon icon="mdi:magnify" className="w-16 h-16 text-[#2C4A7E] opacity-30 mx-auto mb-4" />
              <h3 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-2">Nenhuma entrada encontrada</h3>
              <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                Tente ajustar os filtros ou adicionar novas entradas
              </p>
            </div>
          )}

          {filteredItems.length > 0 && (
            <div className="text-center mt-8">
              <button className="btn-secondary px-8 py-3 hover:scale-105 transition-all duration-300">
                <Icon icon="mdi:refresh" className="w-5 h-5 inline mr-2" />
                Carregar Mais
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

"use client"
import { useState, useCallback } from "react"
import type React from "react"

import { Icon } from "@iconify/react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"

interface User {
  name: string
  nickname: string
  email: string
  avatar: string
  powerAnimal: string
  birthDate: string
  zodiacSign: string
  bio: string
  ayahuascaExperience: string
  civilStatus: string
  preference: string
  joinDate: string
  totalEntries: number
  totalConsagracoes: number
  totalReflexoes: number
}

interface ProfileForm {
  name: string
  nickname: string
  email: string
  bio: string
  powerAnimal: string
  civilStatus: string
  preference: string
}

interface FormErrors {
  [key: string]: string
}

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [activeTab, setActiveTab] = useState("profile")

  const [user] = useState<User>({
    name: "Maria Silva",
    nickname: "Mari",
    email: "maria.silva@email.com",
    avatar: "/placeholder.svg?height=120&width=120",
    powerAnimal: "Águia",
    birthDate: "15/03/1985",
    zodiacSign: "Peixes",
    bio: "Buscadora da luz interior, conectada com a medicina ancestral e os ensinamentos da floresta. Minha jornada xamânica começou há 3 anos e desde então venho explorando os mistérios da consciência.",
    ayahuascaExperience: "3 anos",
    civilStatus: "Solteira",
    preference: "Todos os humanos",
    joinDate: "Janeiro 2022",
    totalEntries: 47,
    totalConsagracoes: 23,
    totalReflexoes: 24,
  })

  const [profileForm, setProfileForm] = useState<ProfileForm>({
    name: user.name,
    nickname: user.nickname,
    email: user.email,
    bio: user.bio,
    powerAnimal: user.powerAnimal,
    civilStatus: user.civilStatus,
    preference: user.preference,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!profileForm.name.trim()) newErrors.name = "Nome é obrigatório"
    if (!profileForm.email.trim()) newErrors.email = "E-mail é obrigatório"
    else if (!/\S+@\S+\.\S+/.test(profileForm.email)) newErrors.email = "E-mail inválido"
    if (!profileForm.bio.trim()) newErrors.bio = "Bio é obrigatória"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      // Save logic here
      setIsEditing(false)
      console.log("Profile saved:", profileForm)
    }
  }

  const handleCancel = () => {
    setProfileForm({
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      bio: user.bio,
      powerAnimal: user.powerAnimal,
      civilStatus: user.civilStatus,
      preference: user.preference,
    })
    setIsEditing(false)
    setErrors({})
  }

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container)
  }, [])

  const animalOptions = [
    { value: "Águia", label: "🦅 Águia - Visão e liberdade" },
    { value: "Lobo", label: "🐺 Lobo - Lealdade e intuição" },
    { value: "Onça", label: "🐆 Onça - Força e mistério" },
    { value: "Outro", label: "🌟 Outro animal" },
  ]

  const civilStatusOptions = [
    { value: "Solteiro(a)", label: "Solteiro(a)" },
    { value: "Casado(a)", label: "Casado(a)" },
    { value: "Relacionamento Aberto", label: "Relacionamento Aberto" },
    { value: "Disponível", label: "Disponível" },
  ]

  const preferenceOptions = [
    { value: "Homem", label: "Homem" },
    { value: "Mulher", label: "Mulher" },
    { value: "Todos os humanos", label: "Todos os humanos" },
  ]

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
                <h1 className="font-sans text-xl font-bold text-[#2E4A2F]">Meu Perfil</h1>
                <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Gerencie suas informações</p>
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary px-4 py-2 text-sm hover:scale-105 transition-all duration-300"
                >
                  <Icon icon="mdi:pencil" className="w-4 h-4 inline mr-2" />
                  Editar Perfil
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="btn-secondary px-4 py-2 text-sm hover:scale-105 transition-all duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary px-4 py-2 text-sm hover:scale-105 transition-all duration-300"
                  >
                    <Icon icon="mdi:content-save" className="w-4 h-4 inline mr-2" />
                    Salvar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card-glassmorphism text-center overflow-hidden">
              <div className="relative inline-block mb-6">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-[#D6BCFA]/30 mx-auto"
                />
                {isEditing && (
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-[#D6BCFA] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Icon icon="mdi:camera" className="w-5 h-5 text-[#2E4A2F]" />
                  </button>
                )}
              </div>

              <h2 className="font-sans text-2xl font-bold text-[#2E4A2F] mb-2 truncate">{user.name}</h2>
              <p className="font-sans text-lg text-[#2C4A7E] mb-4 truncate">@{user.nickname}</p>

              <div className="space-y-3 text-sm text-[#2C4A7E]">
                <div className="flex items-center justify-center gap-2">
                  <Icon icon="mdi:paw" className="w-5 h-5 text-[#2E4A2F]" />
                  <span>Animal de Poder: {user.powerAnimal}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Icon icon="mdi:star-circle" className="w-5 h-5 text-[#2E4A2F]" />
                  <span>Signo: {user.zodiacSign}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Icon icon="mdi:calendar" className="w-5 h-5 text-[#2E4A2F]" />
                  <span>Membro desde {user.joinDate}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <h3 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-4">Estatísticas</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="font-sans text-2xl font-bold text-[#2E4A2F]">{user.totalEntries}</div>
                    <div className="font-sans text-xs text-[#2C4A7E] opacity-70">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="font-sans text-2xl font-bold text-[#2E4A2F]">{user.totalConsagracoes}</div>
                    <div className="font-sans text-xs text-[#2C4A7E] opacity-70">Rituais</div>
                  </div>
                  <div className="text-center">
                    <div className="font-sans text-2xl font-bold text-[#2E4A2F]">{user.totalReflexoes}</div>
                    <div className="font-sans text-xs text-[#2C4A7E] opacity-70">Reflexões</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-3 rounded-lg font-sans font-medium transition-all duration-300 ${
                  activeTab === "profile" ? "bg-[#2E4A2F] text-white" : "bg-white/20 text-[#2C4A7E] hover:bg-white/30"
                }`}
              >
                <Icon icon="mdi:account" className="w-5 h-5 inline mr-2" />
                Informações Pessoais
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`px-6 py-3 rounded-lg font-sans font-medium transition-all duration-300 ${
                  activeTab === "security" ? "bg-[#2E4A2F] text-white" : "bg-white/20 text-[#2C4A7E] hover:bg-white/30"
                }`}
              >
                <Icon icon="mdi:shield-account" className="w-5 h-5 inline mr-2" />
                Segurança
              </button>
              <button
                onClick={() => setActiveTab("preferences")}
                className={`px-6 py-3 rounded-lg font-sans font-medium transition-all duration-300 ${
                  activeTab === "preferences"
                    ? "bg-[#2E4A2F] text-white"
                    : "bg-white/20 text-[#2C4A7E] hover:bg-white/30"
                }`}
              >
                <Icon icon="mdi:cog" className="w-5 h-5 inline mr-2" />
                Preferências
              </button>
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="card-glassmorphism">
                <h3 className="font-sans text-xl font-bold text-[#2E4A2F] mb-6">Informações Pessoais</h3>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="form-section">
                    <h4 className="section-title">Dados Básicos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="input-with-icon">
                        <Icon icon="mdi:account" className="input-icon" />
                        <input
                          type="text"
                          name="name"
                          value={profileForm.name}
                          onChange={handleInputChange}
                          placeholder="Nome completo"
                          className="input-glassmorphism font-sans"
                          disabled={!isEditing}
                        />
                        {errors.name && <div className="error-message font-sans">{errors.name}</div>}
                      </div>

                      <div className="input-with-icon">
                        <Icon icon="mdi:account-outline" className="input-icon" />
                        <input
                          type="text"
                          name="nickname"
                          value={profileForm.nickname}
                          onChange={handleInputChange}
                          placeholder="Apelido"
                          className="input-glassmorphism font-sans"
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="input-with-icon md:col-span-2">
                        <Icon icon="mdi:email" className="input-icon" />
                        <input
                          type="email"
                          name="email"
                          value={profileForm.email}
                          onChange={handleInputChange}
                          placeholder="E-mail"
                          className="input-glassmorphism font-sans"
                          disabled={!isEditing}
                        />
                        {errors.email && <div className="error-message font-sans">{errors.email}</div>}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="form-section">
                    <h4 className="section-title">Biografia Espiritual</h4>
                    <div className="input-with-icon">
                      <Icon icon="mdi:feather" className="input-icon" style={{ top: "1.25rem" }} />
                      <textarea
                        name="bio"
                        value={profileForm.bio}
                        onChange={handleInputChange}
                        placeholder="Conte sobre sua jornada espiritual..."
                        className="input-glassmorphism font-sans resize-none break-words"
                        rows={4}
                        disabled={!isEditing}
                      />
                      {errors.bio && <div className="error-message font-sans">{errors.bio}</div>}
                    </div>
                  </div>

                  {/* Spiritual Info */}
                  <div className="form-section">
                    <h4 className="section-title">Informações Espirituais</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="input-with-icon">
                        <Icon icon="mdi:paw" className="input-icon" />
                        <select
                          name="powerAnimal"
                          value={profileForm.powerAnimal}
                          onChange={handleInputChange}
                          className="select-glassmorphism font-sans"
                          disabled={!isEditing}
                        >
                          {animalOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="input-with-icon">
                        <Icon icon="mdi:calendar" className="input-icon" />
                        <input
                          type="text"
                          value={user.birthDate}
                          className="input-glassmorphism font-sans"
                          disabled
                          placeholder="Data de nascimento"
                        />
                      </div>

                      <div className="input-with-icon">
                        <Icon icon="mdi:star-circle" className="input-icon" />
                        <input
                          type="text"
                          value={user.zodiacSign}
                          className="input-glassmorphism font-sans"
                          disabled
                          placeholder="Signo"
                        />
                      </div>

                      <div className="input-with-icon">
                        <Icon icon="mdi:cup" className="input-icon" />
                        <input
                          type="text"
                          value={user.ayahuascaExperience}
                          className="input-glassmorphism font-sans"
                          disabled
                          placeholder="Experiência com Ayahuasca"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Personal Preferences */}
                  <div className="form-section">
                    <h4 className="section-title">Preferências Pessoais</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="input-with-icon">
                        <Icon icon="mdi:heart" className="input-icon" />
                        <select
                          name="civilStatus"
                          value={profileForm.civilStatus}
                          onChange={handleInputChange}
                          className="select-glassmorphism font-sans"
                          disabled={!isEditing}
                        >
                          {civilStatusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="input-with-icon">
                        <Icon icon="mdi:account-group" className="input-icon" />
                        <select
                          name="preference"
                          value={profileForm.preference}
                          onChange={handleInputChange}
                          className="select-glassmorphism font-sans"
                          disabled={!isEditing}
                        >
                          {preferenceOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="card-glassmorphism">
                <h3 className="font-sans text-xl font-bold text-[#2E4A2F] mb-6">Segurança da Conta</h3>

                <div className="space-y-6">
                  {/* Change Password */}
                  <div className="form-section">
                    <h4 className="section-title">Alterar Senha</h4>
                    <div className="space-y-4">
                      <div className="input-with-icon">
                        <Icon icon="mdi:lock" className="input-icon" />
                        <input type="password" placeholder="Senha atual" className="input-glassmorphism font-sans" />
                      </div>
                      <div className="input-with-icon">
                        <Icon icon="mdi:lock-plus" className="input-icon" />
                        <input type="password" placeholder="Nova senha" className="input-glassmorphism font-sans" />
                      </div>
                      <div className="input-with-icon">
                        <Icon icon="mdi:lock-check" className="input-icon" />
                        <input
                          type="password"
                          placeholder="Confirmar nova senha"
                          className="input-glassmorphism font-sans"
                        />
                      </div>
                      <button className="btn-primary">
                        <Icon icon="mdi:key" className="w-5 h-5 inline mr-2" />
                        Alterar Senha
                      </button>
                    </div>
                  </div>

                  {/* Two Factor Authentication */}
                  <div className="form-section">
                    <h4 className="section-title">Autenticação de Dois Fatores</h4>
                    <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                      <div>
                        <p className="font-sans font-medium text-[#2E4A2F]">2FA não está ativado</p>
                        <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                          Adicione uma camada extra de segurança à sua conta
                        </p>
                      </div>
                      <button className="btn-secondary">
                        <Icon icon="mdi:shield-plus" className="w-5 h-5 inline mr-2" />
                        Ativar 2FA
                      </button>
                    </div>
                  </div>

                  {/* Login Sessions */}
                  <div className="form-section">
                    <h4 className="section-title">Sessões Ativas</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon icon="mdi:laptop" className="w-6 h-6 text-[#2E4A2F]" />
                          <div>
                            <p className="font-sans font-medium text-[#2E4A2F]">MacBook Pro - Chrome</p>
                            <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                              São Paulo, Brasil • Ativo agora
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-700 rounded-full text-xs font-medium">
                          Atual
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon icon="mdi:cellphone" className="w-6 h-6 text-[#2E4A2F]" />
                          <div>
                            <p className="font-sans font-medium text-[#2E4A2F]">iPhone - Safari</p>
                            <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                              São Paulo, Brasil • 2 horas atrás
                            </p>
                          </div>
                        </div>
                        <button className="btn-secondary text-sm px-3 py-1">Encerrar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="card-glassmorphism">
                <h3 className="font-sans text-xl font-bold text-[#2E4A2F] mb-6">Preferências do App</h3>

                <div className="space-y-6">
                  {/* Notifications */}
                  <div className="form-section">
                    <h4 className="section-title">Notificações</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                        <div>
                          <p className="font-sans font-medium text-[#2E4A2F]">Lembretes de Registro</p>
                          <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                            Receba lembretes para registrar suas experiências
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E4A2F]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                        <div>
                          <p className="font-sans font-medium text-[#2E4A2F]">Eventos Xamânicos</p>
                          <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                            Notificações sobre novos eventos e cerimônias
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E4A2F]"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Privacy */}
                  <div className="form-section">
                    <h4 className="section-title">Privacidade</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                        <div>
                          <p className="font-sans font-medium text-[#2E4A2F]">Perfil Público</p>
                          <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                            Permitir que outros usuários vejam seu perfil
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E4A2F]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                        <div>
                          <p className="font-sans font-medium text-[#2E4A2F]">Compartilhamento de Dados</p>
                          <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                            Permitir análises anônimas para melhorar o app
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E4A2F]"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Data Export */}
                  <div className="form-section">
                    <h4 className="section-title">Dados da Conta</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                        <div>
                          <p className="font-sans font-medium text-[#2E4A2F]">Exportar Dados</p>
                          <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                            Baixe uma cópia de todos os seus dados
                          </p>
                        </div>
                        <button className="btn-secondary">
                          <Icon icon="mdi:download" className="w-5 h-5 inline mr-2" />
                          Exportar
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                        <div>
                          <p className="font-sans font-medium text-[#2E4A2F] text-red-600">Excluir Conta</p>
                          <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                            Remover permanentemente sua conta e todos os dados
                          </p>
                        </div>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-sans font-medium transition-colors duration-300">
                          <Icon icon="mdi:delete" className="w-5 h-5 inline mr-2" />
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

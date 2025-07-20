import { z } from "zod"

// Schema para dados do usuário
export const userProfileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  nickname: z.string().min(1, "Apelido é obrigatório").max(50, "Apelido muito longo"),
  email: z.string().email("E-mail inválido"),
  bio: z.string().min(1, "Bio é obrigatória").max(500, "Bio muito longa"),
  powerAnimal: z.string().min(1, "Animal de poder é obrigatório"),
  zodiacSign: z.string().optional(),
  spiritualJourney: z.string().optional(),
  experience: z.string().optional(),
  relationshipStatus: z.string().optional(),
  preference: z.string().min(1, "Preferência é obrigatória"),
  secondaryAnimals: z.array(z.string()).default([]),
  birthDate: z.string().optional(),
  ayahuascaExperience: z.string().optional(),
  stats: z.object({
    totalEntries: z.number().default(0),
    totalConsagracoes: z.number().default(0),
    totalReflexoes: z.number().default(0),
    streakDays: z.number().default(0),
    lastActivity: z.string()
  })
})

// Schema para alteração de senha
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Senha atual é obrigatória"),
  newPassword: z.string().min(6, "Nova senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
})

// Schema para preferências de notificação
export const notificationPreferencesSchema = z.object({
  reminderNotifications: z.boolean().default(true),
  eventNotifications: z.boolean().default(true),
  publicProfile: z.boolean().default(false),
  dataSharing: z.boolean().default(true),
})

// Tipos inferidos dos schemas
export type UserProfileData = z.infer<typeof userProfileSchema>
export type ChangePasswordData = z.infer<typeof changePasswordSchema>
export type NotificationPreferencesData = z.infer<typeof notificationPreferencesSchema>

// Schema para estatísticas do usuário
export const userStatsSchema = z.object({
  totalEntries: z.number(),
  totalConsagracoes: z.number(),
  totalReflexoes: z.number(),
  streakDays: z.number().default(0),
  lastActivity: z.string().datetime(),
})

export type UserStatsData = z.infer<typeof userStatsSchema>

// Opções para selects
export const animalOptions = [
  { value: "Águia", label: "🦅 Águia - Visão e liberdade" },
  { value: "Lobo", label: "🐺 Lobo - Lealdade e intuição" },
  { value: "Onça", label: "🐆 Onça - Força e mistério" },
  { value: "Serpente", label: "🐍 Serpente - Transformação" },
  { value: "Jaguar", label: "🐆 Jaguar - Poder e mistério" },
  { value: "Condor", label: "🦅 Condor - Espiritualidade" },
  { value: "Outro", label: "🌟 Outro animal" },
]

export const civilStatusOptions = [
  { value: "Solteiro(a)", label: "Solteiro(a)" },
  { value: "Casado(a)", label: "Casado(a)" },
  { value: "Relacionamento Aberto", label: "Relacionamento Aberto" },
  { value: "Disponível", label: "Disponível" },
  { value: "União Estável", label: "União Estável" },
  { value: "Divorciado(a)", label: "Divorciado(a)" },
  { value: "Viúvo(a)", label: "Viúvo(a)" },
]

export const preferenceOptions = [
  { value: "Homem", label: "Homem" },
  { value: "Mulher", label: "Mulher" },
  { value: "Todos os humanos", label: "Todos os humanos" },
  { value: "Não-binário", label: "Não-binário" },
]

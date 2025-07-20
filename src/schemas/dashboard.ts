import { z } from "zod"

// Schema para Experiência de Consagração
export const consagracaoSchema = z.object({
  tipoRitual: z.string().min(1, "Tipo de ritual é obrigatório"),
  outroRitual: z.string().optional(),
  data: z.string().min(1, "Data é obrigatória"),
  hora: z.string().optional(),
  descricao: z.string().min(1, "Descrição é obrigatória").max(1000, "Descrição muito longa"),
  intensidade: z.number().min(1, "Selecione o nível de intensidade").max(5),
  local: z.string().optional(),
  notasAdicionais: z.string().optional(),
  midia: z.array(z.instanceof(File)).default([]),
}).refine((data) => {
  if (data.tipoRitual === "outros") {
    return data.outroRitual && data.outroRitual.trim().length > 0
  }
  return true
}, {
  message: "Especifique o tipo de ritual",
  path: ["outroRitual"],
})

// Schema para Entrada de Diário
export const diarioSchema = z.object({
  data: z.string().min(1, "Data é obrigatória"),
  titulo: z.string().min(1, "Título é obrigatório").max(100, "Título muito longo"),
  reflexao: z.string().min(1, "Reflexão é obrigatória").max(2000, "Reflexão muito longa"),
  tags: z.array(z.string()).default([]),
  humor: z.string().optional(),
})

// Schema para Item da Timeline
export const timelineItemSchema = z.object({
  id: z.string(),
  type: z.enum(["consagracao", "diario"]),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  intensity: z.number().optional(),
  mood: z.string().optional(),
  tags: z.array(z.string()).optional(),
  ritual: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
})

// Schema para o usuário
export const userSchema = z.object({
  name: z.string(),
  avatar: z.string(),
  powerAnimal: z.string(),
  lastActivity: z.string(),
  email: z.string().email().optional(),
  bio: z.string().optional(),
})

// Tipos inferidos dos schemas
export type ConsagracaoFormData = z.infer<typeof consagracaoSchema>
export type DiarioFormData = z.infer<typeof diarioSchema>
export type TimelineItemData = z.infer<typeof timelineItemSchema>
export type UserData = z.infer<typeof userSchema>

// Schema para validação de filtros e pesquisa
export const timelineFiltersSchema = z.object({
  type: z.enum(["all", "consagracao", "diario"]).default("all"),
  dateRange: z.object({
    start: z.string().optional(),
    end: z.string().optional(),
  }).optional(),
  tags: z.array(z.string()).default([]),
  mood: z.string().optional(),
  ritual: z.string().optional(),
  intensityMin: z.number().min(1).max(5).optional(),
  intensityMax: z.number().min(1).max(5).optional(),
})

export type TimelineFiltersData = z.infer<typeof timelineFiltersSchema>

import { z } from "zod"

export const timelineItemSchema = z.object({
  id: z.string(),
  type: z.enum(["consagracao", "diario"]),
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  date: z.string().min(1, "Data é obrigatória"),
  time: z.string().min(1, "Horário é obrigatório"),
  intensity: z.number().min(1).max(5).optional(),
  mood: z.string().optional(),
  tags: z.array(z.string()).optional(),
  ritual: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const filtersSchema = z.object({
  type: z.enum(["all", "consagracao", "diario"]).default("all"),
  dateRange: z.enum(["all", "week", "month", "year"]).default("all"),
  searchTerm: z.string().default(""),
  tags: z.array(z.string()).default([]),
})

export const historicoStatsSchema = z.object({
  totalEntries: z.number(),
  consagracaoEntries: z.number(), 
  diarioEntries: z.number(),
  avgIntensity: z.number(),
  streakDays: z.number().optional(),
  lastActivity: z.string().optional(),
})

// Export types
export type TimelineItemData = z.infer<typeof timelineItemSchema>
export type FilterState = z.infer<typeof filtersSchema>
export type HistoricoStats = z.infer<typeof historicoStatsSchema>

// Form schemas para criação/edição
export const createTimelineItemSchema = timelineItemSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
})

export const updateTimelineItemSchema = timelineItemSchema.partial().extend({
  id: z.string().min(1, "ID é obrigatório")
})

export type CreateTimelineItemData = z.infer<typeof createTimelineItemSchema>
export type UpdateTimelineItemData = z.infer<typeof updateTimelineItemSchema>

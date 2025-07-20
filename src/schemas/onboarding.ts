import { z } from "zod"

export const step1Schema = z.object({
  photo: z.instanceof(File).nullable(),
  nome: z.string().min(1, "Nome é obrigatório"),
  apelido: z.string().optional(),
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
})

export const step2Schema = z.object({
  dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  signo: z.string().optional(),
})

export const step3Schema = z.object({
  bio: z.string().min(1, "Bio é obrigatória").max(140, "Bio deve ter no máximo 140 caracteres"),
  inicioJornada: z.string().min(1, "Início da jornada é obrigatório"),
  tempoExperiencia: z.string().optional(),
  animalPoder: z.string().min(1, "Animal de poder principal é obrigatório"),
  animaisSecundarios: z.array(z.string()),
  outroAnimal: z.string().optional(),
}).refine((data) => {
  if (data.animalPoder === "outro") {
    return data.outroAnimal && data.outroAnimal.trim().length > 0
  }
  return true
}, {
  message: "Especifique seu animal de poder",
  path: ["outroAnimal"],
})

export const step4Schema = z.object({
  estadoCivil: z.string().min(1, "Estado civil é obrigatório"),
  preferencia: z.string().min(1, "Preferência é obrigatória"),
})

// Compose full schema from individual steps
export const fullFormSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)

export type FormData = z.infer<typeof fullFormSchema>
export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type Step4Data = z.infer<typeof step4Schema>

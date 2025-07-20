import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { onboardingService } from "@/services/onboarding"
import type { FormData } from "@/schemas/onboarding"

// Hook para submeter onboarding
export function useSubmitOnboarding() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: onboardingService.submitOnboarding,
    onSuccess: (data) => {
      toast.success("Perfil criado com sucesso! 🎉")
      // Invalidar queries relacionadas se necessário
      queryClient.invalidateQueries({ queryKey: ["user"] })
      // Redirecionar para dashboard
      router.push("/dashboard")
    },
    onError: (error) => {
      toast.error("Erro ao criar perfil. Tente novamente.")
      console.error("Erro no onboarding:", error)
    },
  })
}

// Hook para verificar email
export function useCheckEmail(email: string, enabled: boolean = false) {
  return useQuery({
    queryKey: ["email-check", email],
    queryFn: () => onboardingService.checkEmailAvailability(email),
    enabled: enabled && !!email && email.includes("@"),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

// Hook para upload de foto
export function useUploadPhoto() {
  return useMutation({
    mutationFn: onboardingService.uploadPhoto,
    onSuccess: () => {
      toast.success("Foto enviada com sucesso!")
    },
    onError: () => {
      toast.error("Erro ao enviar foto. Tente novamente.")
    },
  })
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { dashboardService } from "@/services/dashboard"
import { ConsagracaoFormData, DiarioFormData, TimelineItemData, UserData } from "@/schemas/dashboard"

// Query keys para cache management
export const dashboardKeys = {
  all: ["dashboard"] as const,
  user: () => [...dashboardKeys.all, "user"] as const,
  timeline: () => [...dashboardKeys.all, "timeline"] as const,
  timelineItem: (id: string) => [...dashboardKeys.timeline(), "item", id] as const,
}

// Hook para dados do usuário
export const useUser = () => {
  return useQuery({
    queryKey: dashboardKeys.user(),
    queryFn: dashboardService.getUser,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  })
}

// Hook para atualizar usuário
export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: dashboardService.updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData(dashboardKeys.user(), data)
      toast.success("Perfil atualizado com sucesso!")
    },
    onError: () => {
      toast.error("Erro ao atualizar perfil")
    },
  })
}

// Hook para itens da timeline
export const useTimelineItems = () => {
  return useQuery({
    queryKey: dashboardKeys.timeline(),
    queryFn: dashboardService.getTimelineItems,
    staleTime: 2 * 60 * 1000, // 2 minutos
    retry: 2,
  })
}

// Hook para criar experiência de consagração
export const useCreateConsagracao = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: dashboardService.createConsagracao,
    onSuccess: (newItem) => {
      // Atualizar cache da timeline
      queryClient.setQueryData<TimelineItemData[]>(
        dashboardKeys.timeline(),
        (oldData) => oldData ? [newItem, ...oldData] : [newItem]
      )
      toast.success("Experiência registrada com sucesso!")
    },
    onError: (error) => {
      console.error("Erro ao criar consagração:", error)
      toast.error("Erro ao registrar experiência")
    },
  })
}

// Hook para criar entrada de diário
export const useCreateDiario = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: dashboardService.createDiario,
    onSuccess: (newItem) => {
      // Atualizar cache da timeline
      queryClient.setQueryData<TimelineItemData[]>(
        dashboardKeys.timeline(),
        (oldData) => oldData ? [newItem, ...oldData] : [newItem]
      )
      toast.success("Reflexão salva com sucesso!")
    },
    onError: (error) => {
      console.error("Erro ao criar diário:", error)
      toast.error("Erro ao salvar reflexão")
    },
  })
}

// Hook para atualizar item da timeline
export const useUpdateTimelineItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TimelineItemData> }) =>
      dashboardService.updateTimelineItem(id, data),
    onSuccess: (updatedItem) => {
      // Atualizar cache da timeline
      queryClient.setQueryData<TimelineItemData[]>(
        dashboardKeys.timeline(),
        (oldData) =>
          oldData?.map((item) => 
            item.id === updatedItem.id ? updatedItem : item
          ) || []
      )
      toast.success("Item atualizado com sucesso!")
    },
    onError: () => {
      toast.error("Erro ao atualizar item")
    },
  })
}

// Hook para deletar item da timeline
export const useDeleteTimelineItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: dashboardService.deleteTimelineItem,
    onSuccess: (_, deletedId) => {
      // Remover do cache da timeline
      queryClient.setQueryData<TimelineItemData[]>(
        dashboardKeys.timeline(),
        (oldData) => oldData?.filter((item) => item.id !== deletedId) || []
      )
      toast.success("Item removido com sucesso!")
    },
    onError: () => {
      toast.error("Erro ao remover item")
    },
  })
}

// Hook para limpar todos os dados
export const useClearAllData = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: dashboardService.clearAllData,
    onSuccess: () => {
      // Limpar todo o cache do dashboard
      queryClient.removeQueries({ queryKey: dashboardKeys.all })
      toast.success("Todos os dados foram removidos!")
    },
    onError: () => {
      toast.error("Erro ao limpar dados")
    },
  })
}

// Hook para verificar se há dados locais
export const useLocalDataStatus = () => {
  const hasData = dashboardService.hasLocalData()
  const lastSync = dashboardService.getLastSync()

  return {
    hasLocalData: hasData,
    lastSync: lastSync ? new Date(lastSync) : null,
    lastSyncFormatted: lastSync 
      ? new Date(lastSync).toLocaleString("pt-BR")
      : "Nunca sincronizado",
  }
}

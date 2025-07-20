import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { historicoService } from '@/services/historico'
import { 
  TimelineItemData, 
  FilterState, 
  CreateTimelineItemData, 
  UpdateTimelineItemData 
} from '@/schemas/historico'

// Query keys
export const historicoKeys = {
  all: ['historico'] as const,
  items: (filters?: FilterState) => [...historicoKeys.all, 'items', filters] as const,
  item: (id: string) => [...historicoKeys.all, 'item', id] as const,
  stats: () => [...historicoKeys.all, 'stats'] as const,
  tags: () => [...historicoKeys.all, 'tags'] as const,
}

// Hook para buscar itens da timeline
export const useTimelineItems = (filters?: FilterState) => {
  return useQuery({
    queryKey: historicoKeys.items(filters),
    queryFn: () => historicoService.getTimelineItems(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  })
}

// Hook para buscar item específico
export const useTimelineItem = (id: string) => {
  return useQuery({
    queryKey: historicoKeys.item(id),
    queryFn: () => historicoService.getTimelineItemById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar estatísticas
export const useHistoricoStats = () => {
  return useQuery({
    queryKey: historicoKeys.stats(),
    queryFn: () => historicoService.getStats(),
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

// Hook para buscar todas as tags
export const useAllTags = () => {
  return useQuery({
    queryKey: historicoKeys.tags(),
    queryFn: () => historicoService.getAllTags(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

// Hook para criar novo item
export const useCreateTimelineItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTimelineItemData) => historicoService.createTimelineItem(data),
    onSuccess: (newItem) => {
      // Invalidar cache dos itens
      queryClient.invalidateQueries({ queryKey: historicoKeys.all })
      
      // Adicionar otimisticamente o novo item ao cache
      queryClient.setQueryData(
        historicoKeys.items(),
        (oldData: TimelineItemData[] | undefined) => {
          if (!oldData) return [newItem]
          return [newItem, ...oldData]
        }
      )
    },
    onError: (error) => {
      console.error("Erro ao criar item da timeline:", error)
    }
  })
}

// Hook para atualizar item
export const useUpdateTimelineItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateTimelineItemData) => historicoService.updateTimelineItem(data),
    onSuccess: (updatedItem) => {
      // Invalidar cache dos itens
      queryClient.invalidateQueries({ queryKey: historicoKeys.all })
      
      // Atualizar item específico no cache
      queryClient.setQueryData(
        historicoKeys.item(updatedItem.id),
        updatedItem
      )
      
      // Atualizar lista de itens
      queryClient.setQueryData(
        historicoKeys.items(),
        (oldData: TimelineItemData[] | undefined) => {
          if (!oldData) return [updatedItem]
          return oldData.map(item => 
            item.id === updatedItem.id ? updatedItem : item
          )
        }
      )
    },
    onError: (error) => {
      console.error("Erro ao atualizar item da timeline:", error)
    }
  })
}

// Hook para deletar item
export const useDeleteTimelineItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => historicoService.deleteTimelineItem(id),
    onSuccess: (_, deletedId) => {
      // Invalidar cache dos itens
      queryClient.invalidateQueries({ queryKey: historicoKeys.all })
      
      // Remover item da lista
      queryClient.setQueryData(
        historicoKeys.items(),
        (oldData: TimelineItemData[] | undefined) => {
          if (!oldData) return []
          return oldData.filter(item => item.id !== deletedId)
        }
      )
      
      // Remover item específico do cache
      queryClient.removeQueries({ queryKey: historicoKeys.item(deletedId) })
    },
    onError: (error) => {
      console.error("Erro ao deletar item da timeline:", error)
    }
  })
}

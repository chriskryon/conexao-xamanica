import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { consagracaoSchema, diarioSchema, ConsagracaoFormData, DiarioFormData } from "@/schemas/dashboard"
import { useCreateConsagracao, useCreateDiario, useTimelineItems, useUser } from "./useDashboard"

export const useDashboardForms = () => {
  // Estado dos modais
  const [showConsagracaoModal, setShowConsagracaoModal] = useState(false)
  const [showDiarioModal, setShowDiarioModal] = useState(false)
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<string | null>(null)
  const [newTag, setNewTag] = useState("")

  // Queries
  const userQuery = useUser()
  const timelineQuery = useTimelineItems()

  // Mutations
  const createConsagracao = useCreateConsagracao()
  const createDiario = useCreateDiario()

  // Form para Consagração
  const consagracaoForm = useForm<any>({
    resolver: zodResolver(consagracaoSchema),
    defaultValues: {
      tipoRitual: "",
      outroRitual: "",
      data: "",
      hora: "",
      descricao: "",
      intensidade: 0,
      local: "",
      notasAdicionais: "",
      midia: [],
    },
  })

  // Form para Diário
  const diarioForm = useForm<any>({
    resolver: zodResolver(diarioSchema),
    defaultValues: {
      data: new Date().toISOString().split("T")[0],
      titulo: "",
      reflexao: "",
      tags: [],
      humor: "",
    },
  })

  // Handlers dos modais
  const openConsagracaoModal = () => {
    setShowConsagracaoModal(true)
    consagracaoForm.reset()
  }

  const openDiarioModal = () => {
    setShowDiarioModal(true)
    diarioForm.reset({
      data: new Date().toISOString().split("T")[0],
      titulo: "",
      reflexao: "",
      tags: [],
      humor: "",
    })
    setNewTag("")
  }

  const closeModals = () => {
    setShowConsagracaoModal(false)
    setShowDiarioModal(false)
    consagracaoForm.reset()
    diarioForm.reset()
    setNewTag("")
  }

  // Handlers específicos do formulário de consagração
  const handleIntensityClick = (level: number) => {
    consagracaoForm.setValue("intensidade", level)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const currentFiles = consagracaoForm.getValues("midia")
    consagracaoForm.setValue("midia", [...currentFiles, ...files])
  }

  const removeFile = (index: number) => {
    const currentFiles = consagracaoForm.getValues("midia")
    consagracaoForm.setValue("midia", currentFiles.filter((_: any, i: number) => i !== index))
  }

  // Handlers específicos do formulário de diário
  const handleMoodSelect = (mood: string) => {
    diarioForm.setValue("humor", mood)
  }

  const addTag = () => {
    if (newTag.trim()) {
      const currentTags = diarioForm.getValues("tags")
      if (!currentTags.includes(newTag.trim())) {
        diarioForm.setValue("tags", [...currentTags, newTag.trim()])
        setNewTag("")
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    const currentTags = diarioForm.getValues("tags")
    diarioForm.setValue("tags", currentTags.filter((tag: string) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  // Handlers de submit
  const onSubmitConsagracao = async (data: any) => {
    try {
      await createConsagracao.mutateAsync(data)
      closeModals()
    } catch (error) {
      console.error("Erro ao submeter consagração:", error)
    }
  }

  const onSubmitDiario = async (data: any) => {
    try {
      await createDiario.mutateAsync(data)
      closeModals()
    } catch (error) {
      console.error("Erro ao submeter diário:", error)
    }
  }

  // Handler da timeline
  const handleTimelineClick = (itemId: string) => {
    setSelectedTimelineItem(selectedTimelineItem === itemId ? null : itemId)
  }

  return {
    // Estado dos modais
    showConsagracaoModal,
    showDiarioModal,
    selectedTimelineItem,
    
    // Handlers dos modais
    openConsagracaoModal,
    openDiarioModal,
    closeModals,
    
    // Forms
    consagracaoForm,
    diarioForm,
    
    // Handlers de consagração
    handleIntensityClick,
    handleFileUpload,
    removeFile,
    handleSubmitConsagracao: (e: React.FormEvent) => {
      e.preventDefault()
      consagracaoForm.handleSubmit(onSubmitConsagracao)(e)
    },
    
    // Handlers de diário
    handleMoodSelect,
    newTag,
    setNewTag,
    addTag,
    removeTag,
    handleKeyPress,
    handleSubmitDiario: (e: React.FormEvent) => {
      e.preventDefault()
      diarioForm.handleSubmit(onSubmitDiario)(e)
    },
    
    // Handler da timeline
    handleTimelineClick,
    
    // Dados das queries
    user: userQuery.data,
    timelineItems: timelineQuery.data || [],
    
    // Estados de loading
    isLoadingUser: userQuery.isLoading,
    isLoadingTimeline: timelineQuery.isLoading,
    isSubmittingConsagracao: createConsagracao.isPending,
    isSubmittingDiario: createDiario.isPending,
    
    // Estados de erro
    userError: userQuery.error,
    timelineError: timelineQuery.error,
  }
}

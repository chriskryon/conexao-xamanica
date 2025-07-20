import { Icon } from "@iconify/react"

interface PerfilHeaderProps {
  isEditing: boolean
  isSubmitting: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: (e: React.FormEvent) => void
}

export default function PerfilHeader({
  isEditing,
  isSubmitting,
  onEdit,
  onCancel,
  onSave,
}: PerfilHeaderProps) {
  return (
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
                onClick={onEdit}
                className="btn-secondary px-4 py-2 text-sm hover:scale-105 transition-all duration-300"
              >
                <Icon icon="mdi:pencil" className="w-4 h-4 inline mr-2" />
                Editar Perfil
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="btn-secondary px-4 py-2 text-sm hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={onSave}
                  disabled={isSubmitting}
                  className="btn-primary px-4 py-2 text-sm hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="mdi:loading" className="w-4 h-4 inline mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:content-save" className="w-4 h-4 inline mr-2" />
                      Salvar
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

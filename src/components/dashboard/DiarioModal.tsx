import { Icon } from "@iconify/react"
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form"
import { DiarioFormData } from "@/schemas/dashboard"

interface DiarioModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  watch: UseFormWatch<any>
  onMoodSelect: (mood: string) => void
  newTag: string
  setNewTag: (tag: string) => void
  onAddTag: () => void
  onRemoveTag: (tag: string) => void
  onKeyPress: (e: React.KeyboardEvent) => void
}

const moodOptions = [
  { value: "feliz", emoji: "😊", label: "Feliz" },
  { value: "grato", emoji: "🙏", label: "Grato" },
  { value: "reflexivo", emoji: "🤔", label: "Reflexivo" },
  { value: "triste", emoji: "😔", label: "Triste" },
  { value: "inspirado", emoji: "🌟", label: "Inspirado" },
  { value: "calmo", emoji: "😌", label: "Calmo" },
  { value: "ansioso", emoji: "😰", label: "Ansioso" },
  { value: "energizado", emoji: "⚡", label: "Energizado" },
]

export default function DiarioModal({
  isOpen,
  onClose,
  onSubmit,
  register,
  errors,
  watch,
  onMoodSelect,
  newTag,
  setNewTag,
  onAddTag,
  onRemoveTag,
  onKeyPress,
}: DiarioModalProps) {
  if (!isOpen) return null

  const formData = watch()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="modal-glassmorphism fade-in">
          <div className="modal-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D6BCFA] to-[#b794f6] rounded-xl flex items-center justify-center">
                  <Icon icon="mdi:book-open" className="w-6 h-6 text-[#2E4A2F]" />
                </div>
                <div>
                  <h2 className="font-sans text-xl font-bold text-[#2E4A2F]">Nova Reflexão</h2>
                  <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Registre seus pensamentos</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <Icon icon="mdi:close" className="w-6 h-6 text-[#2C4A7E]" />
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Data e Título */}
            <div className="form-section">
              <h3 className="section-title">Informações Básicas</h3>
              <div className="space-y-4">
                <div className="input-with-icon">
                  <Icon icon="mdi:calendar" className="input-icon" />
                  <input
                    type="date"
                    {...register("data")}
                    className="input-glassmorphism font-sans"
                  />
                </div>
                <div className="input-with-icon">
                  <Icon icon="mdi:format-title" className="input-icon" />
                  <input
                    type="text"
                    {...register("titulo")}
                    placeholder="Título da entrada (ex: Gratidão de Hoje)"
                    className="input-glassmorphism font-sans"
                  />
                  {errors.titulo && <div className="error-message font-sans">{String(errors.titulo.message || "Campo obrigatório")}</div>}
                </div>
              </div>
            </div>

            {/* Reflexão */}
            <div className="form-section">
              <h3 className="section-title">Sua Reflexão</h3>
              <div className="input-with-icon">
                <Icon icon="mdi:heart" className="input-icon" style={{ top: "1.25rem" }} />
                <textarea
                  {...register("reflexao")}
                  placeholder="O que está em seu coração hoje? Registre suas emoções, ideias ou aprendizados..."
                  className="input-glassmorphism font-sans resize-none"
                  rows={6}
                />
                {errors.reflexao && <div className="error-message font-sans">{String(errors.reflexao.message || "Campo obrigatório")}</div>}
              </div>
            </div>

            {/* Tags */}
            <div className="form-section">
              <h3 className="section-title">Tags</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="input-with-icon flex-1">
                    <Icon icon="mdi:tag" className="input-icon" />
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={onKeyPress}
                      placeholder="Adicionar tag (ex: Gratidão, Autoconhecimento)"
                      className="input-glassmorphism font-sans"
                    />
                  </div>
                  <button type="button" onClick={onAddTag} className="btn-secondary px-4">
                    <Icon icon="mdi:plus" className="w-5 h-5" />
                  </button>
                </div>

                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-[#D6BCFA]/20 text-[#2C4A7E] px-3 py-1 rounded-full text-sm font-sans flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => onRemoveTag(tag)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <Icon icon="mdi:close" className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Humor */}
            <div className="form-section">
              <h3 className="section-title">Como você está se sentindo?</h3>
              <div className="mood-grid">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => onMoodSelect(mood.value)}
                    className={`mood-button ${formData.humor === mood.value ? "active" : ""}`}
                  >
                    <div className="text-2xl mb-2">{mood.emoji}</div>
                    <div className="text-xs font-sans text-[#2C4A7E]">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-[#A67B5B]/20">
              <button type="button" onClick={onClose} className="btn-secondary flex-1 font-sans">
                Cancelar
              </button>
              <button type="submit" className="btn-primary flex-1 font-sans">
                <Icon icon="mdi:content-save" className="w-5 h-5 inline mr-2" />
                Salvar Reflexão
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

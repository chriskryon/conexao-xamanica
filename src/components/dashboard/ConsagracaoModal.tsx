import { Icon } from "@iconify/react"
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form"
import { ConsagracaoFormData } from "@/schemas/dashboard"

interface ConsagracaoModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  watch: UseFormWatch<any>
  onIntensityClick: (level: number) => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (index: number) => void
}

const ritualOptions = [
  { value: "", label: "Selecione o tipo de ritual" },
  { value: "ayahuasca", label: "🌿 Ayahuasca" },
  { value: "rape", label: "🍃 Rapé" },
  { value: "cachimbo-sagrado", label: "🔥Cachimbo Sagrado" },
  { value: "outros", label: "✨ Outros" },
]

export default function ConsagracaoModal({
  isOpen,
  onClose,
  onSubmit,
  register,
  errors,
  watch,
  onIntensityClick,
  onFileUpload,
  onRemoveFile,
}: ConsagracaoModalProps) {
  if (!isOpen) return null

  const formData = watch()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="modal-glassmorphism fade-in">
          <div className="modal-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2E4A2F] to-[#1a2e1b] rounded-xl flex items-center justify-center">
                  <Icon icon="mdi:feather" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-sans text-xl font-bold text-[#2E4A2F]">Nova Experiência de Consagração</h2>
                  <p className="font-sans text-sm text-[#2C4A7E] opacity-70">Registre seu ritual sagrado</p>
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
            {/* Tipo de Ritual */}
            <div className="form-section">
              <h3 className="section-title">Tipo de Ritual</h3>
              <div className="space-y-4">
                <div className="input-with-icon">
                  <Icon icon="mdi:leaf" className="input-icon" />
                  <select
                    {...register("tipoRitual")}
                    className="select-glassmorphism font-sans"
                  >
                    {ritualOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.tipoRitual && <div className="error-message font-sans">{String(errors.tipoRitual.message || "Campo obrigatório")}</div>}
                </div>

                {formData.tipoRitual === "outros" && (
                  <div className="input-with-icon">
                    <Icon icon="mdi:pencil" className="input-icon" />
                    <input
                      type="text"
                      {...register("outroRitual")}
                      placeholder="Especifique o tipo de ritual"
                      className="input-glassmorphism font-sans"
                    />
                    {errors.outroRitual && <div className="error-message font-sans">{String(errors.outroRitual.message || "Campo obrigatório")}</div>}
                  </div>
                )}
              </div>
            </div>

            {/* Data e Hora */}
            <div className="form-section">
              <h3 className="section-title">Data e Hora</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="input-with-icon">
                  <Icon icon="mdi:calendar" className="input-icon" />
                  <input
                    type="date"
                    {...register("data")}
                    className="input-glassmorphism font-sans"
                  />
                  {errors.data && <div className="error-message font-sans">{String(errors.data.message || "Campo obrigatório")}</div>}
                </div>
                <div className="input-with-icon">
                  <Icon icon="mdi:clock" className="input-icon" />
                  <input
                    type="time"
                    {...register("hora")}
                    className="input-glassmorphism font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="form-section">
              <h3 className="section-title">Descrição da Experiência</h3>
              <div className="input-with-icon">
                <Icon icon="mdi:text" className="input-icon" style={{ top: "1.25rem" }} />
                <textarea
                  {...register("descricao")}
                  placeholder="Descreva suas visões, sentimentos, aprendizados ou mensagens recebidas..."
                  className="input-glassmorphism font-sans resize-none"
                  rows={4}
                />
                {errors.descricao && <div className="error-message font-sans">{String(errors.descricao.message || "Campo obrigatório")}</div>}
              </div>
            </div>

            {/* Nível de Intensidade */}
            <div className="form-section">
              <h3 className="section-title">Nível de Intensidade</h3>
              <div className="intensity-selector">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => onIntensityClick(level)}
                    className={`intensity-button ${formData.intensidade >= level ? "active" : ""}`}
                  >
                    <Icon icon="mdi:star" className="w-5 h-5" />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-[#2C4A7E] opacity-70 font-sans">
                {formData.intensidade === 0 && "Selecione o nível de intensidade"}
                {formData.intensidade === 1 && "Muito Suave"}
                {formData.intensidade === 2 && "Suave"}
                {formData.intensidade === 3 && "Moderada"}
                {formData.intensidade === 4 && "Intensa"}
                {formData.intensidade === 5 && "Muito Intensa"}
              </p>
              {errors.intensidade && (
                <div className="error-message font-sans text-center">{String(errors.intensidade.message || "Campo obrigatório")}</div>
              )}
            </div>

            {/* Local e Notas */}
            <div className="form-section">
              <h3 className="section-title">Detalhes Adicionais</h3>
              <div className="space-y-4">
                <div className="input-with-icon">
                  <Icon icon="mdi:map-marker" className="input-icon" />
                  <input
                    type="text"
                    {...register("local")}
                    placeholder="Local do ritual (opcional)"
                    className="input-glassmorphism font-sans"
                  />
                </div>
                <div className="input-with-icon">
                  <Icon icon="mdi:note-text" className="input-icon" style={{ top: "1.25rem" }} />
                  <textarea
                    {...register("notasAdicionais")}
                    placeholder="Notas adicionais: pessoas presentes, facilitadores, contexto..."
                    className="input-glassmorphism font-sans resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Upload de Mídia */}
            <div className="form-section">
              <h3 className="section-title">Mídia (Opcional)</h3>
              <div className="file-upload">
                <input
                  type="file"
                  multiple
                  accept="image/*,audio/*"
                  onChange={onFileUpload}
                  id="media-upload"
                />
                <label htmlFor="media-upload" className="file-upload-label">
                  <Icon icon="mdi:camera-plus" className="w-6 h-6 text-[#2E4A2F]" />
                  <span className="font-sans">Adicionar fotos ou áudios</span>
                </label>
              </div>

              {formData.midia && formData.midia.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.midia.map((file: any, index: number) => (
                    <div key={index} className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
                      <span className="font-sans text-sm text-[#2C4A7E]">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => onRemoveFile(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Icon icon="mdi:close" className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-[#A67B5B]/20">
              <button type="button" onClick={onClose} className="btn-secondary flex-1 font-sans">
                Cancelar
              </button>
              <button type="submit" className="btn-primary flex-1 font-sans">
                <Icon icon="mdi:content-save" className="w-5 h-5 inline mr-2" />
                Salvar Experiência
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

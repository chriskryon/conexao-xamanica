import { Icon } from "@iconify/react"
import { useHistoricoModal } from "@/stores/historicoStore"

export default function TimelineDetailModal() {
  const { showDetailModal, selectedItem, closeDetailModal } = useHistoricoModal()

  if (!showDetailModal || !selectedItem) return null

  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      feliz: "😊",
      grato: "🙏",
      reflexivo: "🤔",
      triste: "😔",
      inspirado: "🌟",
      calmo: "😌",
      ansioso: "😰",
      energizado: "⚡",
    }
    return moodMap[mood] || "😊"
  }

  const getRitualIcon = (ritual: string) => {
    const ritualMap: { [key: string]: string } = {
      ayahuasca: "mdi:cup",
      Ayahuasca: "mdi:cup",
      rape: "mdi:leaf",
      Rapé: "mdi:leaf",
      kambo: "mdi:water",
      Kambô: "mdi:water",
    }
    return ritualMap[ritual] || "mdi:feather"
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="modal-glassmorphism fade-in">
          <div className="modal-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedItem.type === "consagracao"
                      ? "bg-gradient-to-br from-[#2E4A2F] to-[#1a2e1b]"
                      : "bg-gradient-to-br from-[#D6BCFA] to-[#b794f6]"
                  }`}
                >
                  <Icon
                    icon={
                      selectedItem.type === "consagracao"
                        ? getRitualIcon(selectedItem.ritual || "")
                        : "mdi:book-open"
                    }
                    className={`w-6 h-6 ${selectedItem.type === "consagracao" ? "text-white" : "text-[#2E4A2F]"}`}
                  />
                </div>
                <div>
                  <h2 className="font-sans text-xl font-bold text-[#2E4A2F]">{selectedItem.title}</h2>
                  <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                    {selectedItem.date} às {selectedItem.time}
                  </p>
                </div>
              </div>
              <button
                onClick={closeDetailModal}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <Icon icon="mdi:close" className="w-6 h-6 text-[#2C4A7E]" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Description */}
            <div className="form-section">
              <h3 className="section-title">Descrição</h3>
              <p className="font-sans text-[#2C4A7E] leading-relaxed bg-white/20 p-4 rounded-lg">
                {selectedItem.description}
              </p>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedItem.intensity && (
                <div className="form-section">
                  <h3 className="section-title">Intensidade</h3>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <Icon
                        key={level}
                        icon="mdi:star"
                        className={`w-6 h-6 ${
                          level <= selectedItem.intensity! ? "text-[#D6BCFA]" : "text-[#2C4A7E] opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.mood && (
                <div className="form-section">
                  <h3 className="section-title">Humor</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getMoodEmoji(selectedItem.mood)}</span>
                    <span className="font-sans text-[#2C4A7E] capitalize">{selectedItem.mood}</span>
                  </div>
                </div>
              )}

              {selectedItem.location && (
                <div className="form-section">
                  <h3 className="section-title">Local</h3>
                  <p className="font-sans text-[#2C4A7E]">{selectedItem.location}</p>
                </div>
              )}

              {selectedItem.ritual && (
                <div className="form-section">
                  <h3 className="section-title">Tipo de Ritual</h3>
                  <p className="font-sans text-[#2C4A7E]">{selectedItem.ritual}</p>
                </div>
              )}
            </div>

            {/* Tags */}
            {selectedItem.tags && selectedItem.tags.length > 0 && (
              <div className="form-section">
                <h3 className="section-title">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#D6BCFA]/20 text-[#2C4A7E] px-3 py-1 rounded-full text-sm font-sans"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {selectedItem.notes && (
              <div className="form-section">
                <h3 className="section-title">Notas Adicionais</h3>
                <p className="font-sans text-[#2C4A7E] leading-relaxed bg-white/20 p-4 rounded-lg">
                  {selectedItem.notes}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-[#A67B5B]/20">
              <button className="btn-secondary flex-1 font-sans">
                <Icon icon="mdi:pencil" className="w-5 h-5 inline mr-2" />
                Editar
              </button>
              <button className="btn-secondary flex-1 font-sans">
                <Icon icon="mdi:share" className="w-5 h-5 inline mr-2" />
                Compartilhar
              </button>
              <button className="btn-secondary flex-1 font-sans">
                <Icon icon="mdi:download" className="w-5 h-5 inline mr-2" />
                Exportar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

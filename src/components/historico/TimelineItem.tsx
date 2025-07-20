import { Icon } from "@iconify/react"
import { TimelineItemData } from "@/schemas/historico"
import { useHistoricoModal, useHistoricoTimeline } from "@/stores/historicoStore"

interface TimelineItemProps {
  item: TimelineItemData
  showConnector?: boolean
}

export default function TimelineItem({ item, showConnector = false }: TimelineItemProps) {
  const { openDetailModal } = useHistoricoModal()
  const { selectedTimelineItem, toggleTimelineItem } = useHistoricoTimeline()

  const isExpanded = selectedTimelineItem === item.id

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
    <div className="relative">
      {/* Timeline Line */}
      {showConnector && (
        <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-[#D6BCFA] to-transparent opacity-30" />
      )}

      {/* Timeline Item */}
      <div
        className={`flex gap-6 p-6 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
          isExpanded
            ? "bg-white/20 border-[#D6BCFA]/50 shadow-lg backdrop-blur-sm"
            : "bg-white/10 border-[#A67B5B]/30 hover:bg-white/15 hover:border-[#D6BCFA]/40 backdrop-blur-sm"
        }`}
        onClick={() => toggleTimelineItem(item.id)}
      >
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            item.type === "consagracao"
              ? "bg-gradient-to-br from-[#2E4A2F] to-[#1a2e1b]"
              : "bg-gradient-to-br from-[#D6BCFA] to-[#b794f6]"
          }`}
        >
          <Icon
            icon={item.type === "consagracao" ? getRitualIcon(item.ritual || "") : "mdi:book-open"}
            className={`w-8 h-8 ${item.type === "consagracao" ? "text-white" : "text-[#2E4A2F]"}`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-1">{item.title}</h3>
              <div className="flex items-center gap-4 text-sm text-[#2C4A7E] opacity-70">
                <span className="flex items-center gap-1">
                  <Icon icon="mdi:calendar" className="w-4 h-4" />
                  {item.date}
                </span>
                <span className="flex items-center gap-1">
                  <Icon icon="mdi:clock" className="w-4 h-4" />
                  {item.time}
                </span>
              </div>
            </div>

            {/* Type Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.type === "consagracao"
                  ? "bg-[#2E4A2F]/20 text-[#2E4A2F]"
                  : "bg-[#D6BCFA]/20 text-[#2C4A7E]"
              }`}
            >
              {item.type === "consagracao" ? "Consagração" : "Reflexão"}
            </span>
          </div>

          <p className="font-sans text-[#2C4A7E] mb-4 leading-relaxed line-clamp-2 break-words">
            {item.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-6 mb-4 flex-wrap overflow-hidden">
            {item.intensity && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#2C4A7E] opacity-70">Intensidade:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <Icon
                      key={level}
                      icon="mdi:star"
                      className={`w-4 h-4 ${
                        level <= item.intensity! ? "text-[#D6BCFA]" : "text-[#2C4A7E] opacity-30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {item.mood && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#2C4A7E] opacity-70">Humor:</span>
                <span className="text-lg">{getMoodEmoji(item.mood)}</span>
              </div>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-medium text-[#2C4A7E] opacity-70 flex-shrink-0">Tags:</span>
                <div className="flex gap-1 flex-wrap min-w-0">
                  {item.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-[#D6BCFA]/10 text-[#2C4A7E] rounded-full text-xs truncate max-w-20"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="px-2 py-1 bg-[#D6BCFA]/10 text-[#2C4A7E] rounded-full text-xs flex-shrink-0">
                      +{item.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation()
                openDetailModal(item)
              }}
              className="btn-secondary text-sm px-4 py-2"
            >
              <Icon icon="mdi:eye" className="w-4 h-4 inline mr-1" />
              Ver Detalhes
            </button>
            <button className="btn-secondary text-sm px-4 py-2">
              <Icon icon="mdi:pencil" className="w-4 h-4 inline mr-1" />
              Editar
            </button>
            <button className="btn-secondary text-sm px-4 py-2">
              <Icon icon="mdi:share" className="w-4 h-4 inline mr-1" />
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

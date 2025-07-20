import { Icon } from "@iconify/react"

interface PerfilTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  {
    id: "profile",
    label: "Informações Pessoais",
    icon: "mdi:account",
  },
  {
    id: "security",
    label: "Segurança",
    icon: "mdi:shield-account",
  },
  {
    id: "preferences",
    label: "Preferências",
    icon: "mdi:cog",
  },
]

export default function PerfilTabs({ activeTab, onTabChange }: PerfilTabsProps) {
  return (
    <div className="flex gap-2 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 rounded-lg font-sans font-medium transition-all duration-300 ${
            activeTab === tab.id 
              ? "bg-[#2E4A2F] text-white" 
              : "bg-white/20 text-[#2C4A7E] hover:bg-white/30"
          }`}
        >
          <Icon icon={tab.icon} className="w-5 h-5 inline mr-2" />
          {tab.label}
        </button>
      ))}
    </div>
  )
}

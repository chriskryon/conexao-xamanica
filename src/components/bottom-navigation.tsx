"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Icon } from "@iconify/react"

export default function BottomNavigation() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    // Determine active tab based on current path
    if (pathname === "/dashboard") setActiveTab("dashboard")
    else if (pathname === "/historico") setActiveTab("historico")
    else if (pathname === "/perfil") setActiveTab("perfil")
    else if (pathname === "/configuracoes") setActiveTab("configuracoes")
    else setActiveTab("")
  }, [pathname])

  const navItems = [
    {
      id: "dashboard",
      href: "/dashboard",
      icon: "mdi:view-dashboard",
      label: "Dashboard",
    },
    {
      id: "historico",
      href: "/historico",
      icon: "mdi:history",
      label: "Histórico",
    },
    {
      id: "perfil",
      href: "/perfil",
      icon: "mdi:account",
      label: "Perfil",
    },
    // {
    //   id: "configuracoes",
    //   href: "/configuracoes",
    //   icon: "mdi:cog",
    //   label: "Config",
    // },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-[#A67B5B]/20 shadow-xl">
      <div className="max-w-md mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 p-2.5 rounded-lg transition-all duration-300 min-w-[60px] ${
                activeTab === item.id
                  ? "bg-gradient-to-br from-[#2E4A2F] to-[#1a2e1b] text-white scale-105 shadow-md"
                  : "text-[#2C4A7E] hover:bg-white/30 hover:scale-102"
              }`}
            >
              <Icon icon={item.icon} className={`${activeTab === item.id ? 'w-5 h-5' : 'w-5 h-5'}`} />
              <span className={`text-[10px] font-sans font-medium ${activeTab === item.id ? 'opacity-100' : 'opacity-75'}`}>
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

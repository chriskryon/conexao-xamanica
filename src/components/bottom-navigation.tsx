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
      icon: "mdi:plus-circle",
      label: "Registrar",
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
    {
      id: "configuracoes",
      href: "/configuracoes",
      icon: "mdi:cog",
      label: "Config",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/10 backdrop-blur-md border-t border-white/20">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-gradient-to-br from-[#2E4A2F] to-[#1a2e1b] text-white scale-110 shadow-lg"
                  : "text-[#2C4A7E] hover:bg-white/20 hover:scale-105"
              }`}
            >
              <Icon icon={item.icon} className="w-6 h-6" />
              <span className="text-xs font-sans font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

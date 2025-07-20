"use client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import type React from "react"
import BottomNavigation from "@/components/bottom-navigation"
import QueryProvider from "@/providers/QueryProvider"
import { Toaster } from "sonner"
import DevTools from "@/components/DevTools"
import "./globals.css"

// Componente separado para lógica que depende do router
function ConditionalBottomNav() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const showBottomNav = pathname !== "/onboarding"
  return showBottomNav ? <BottomNavigation /> : null
}

// Componente para aplicar padding condicional ao body
function ConditionalBodyPadding({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const showBottomNav = mounted && pathname !== "/onboarding"

  return (
    <div className={`min-h-screen ${showBottomNav ? "pb-24" : ""}`}>
      {children}
    </div>
  )
}

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <QueryProvider>
          <ConditionalBodyPadding>
            {children}
          </ConditionalBodyPadding>
          <ConditionalBottomNav />
          <Toaster position="top-right" richColors />
          {/* <DevTools /> */}
        </QueryProvider>
      </body>
    </html>
  )
}

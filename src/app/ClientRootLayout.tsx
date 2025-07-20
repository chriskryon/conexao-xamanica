"use client"
import { usePathname } from "next/navigation"
import type React from "react"
import BottomNavigation from "@/components/bottom-navigation"
import "./globals.css"

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showBottomNav = pathname !== "/onboarding"

  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased ${showBottomNav ? "pb-20" : ""}`}>
        {children}
        {showBottomNav && <BottomNavigation />}
      </body>
    </html>
  )
}

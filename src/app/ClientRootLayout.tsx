"use client"
import { usePathname } from "next/navigation"
import type React from "react"
import BottomNavigation from "@/components/bottom-navigation"
import QueryProvider from "@/providers/QueryProvider"
import { Toaster } from "sonner"
import DevTools from "@/components/DevTools"
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
      <body className={`font-sans antialiased ${showBottomNav ? "pb-24" : ""}`}>
        <QueryProvider>
          {children}
          {showBottomNav && <BottomNavigation />}
          <Toaster position="top-right" richColors />
          {/* <DevTools /> */}
        </QueryProvider>
      </body>
    </html>
  )
}

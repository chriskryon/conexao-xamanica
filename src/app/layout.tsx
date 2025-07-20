import type React from "react"
import type { Metadata } from "next"
import ClientRootLayout from "./ClientRootLayout"
import './globals.css'


export const metadata: Metadata = {
  title: "Diário Xamânico - Onboarding",
  description: "Conecte-se com sua jornada espiritual",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientRootLayout>{children}</ClientRootLayout>
}


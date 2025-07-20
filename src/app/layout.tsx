import type React from "react"
import type { Metadata } from "next"
import ClientRootLayout from "./ClientRootLayout"
import './globals.css'


export const metadata: Metadata = {
  title: {
    default: "Conexão Xamânica - Diário Espiritual",
    template: "%s | Conexão Xamânica"
  },
  description: "Aplicativo sagrado para registrar jornadas xamânicas, experiências com plantas medicinais e práticas espirituais. Conecte-se com sua sabedoria ancestral.",
  keywords: [
    "xamanismo",
    "diário espiritual", 
    "jornada xamânica",
    "plantas medicinais",
    "ayahuasca",
    "rapé",
    "cura espiritual",
    "consciência expandida",
    "medicina sagrada"
  ],
  authors: [{ name: "Conexão Xamânica" }],
  creator: "Conexão Xamânica",
  publisher: "Conexão Xamânica",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://conexao-xamanica.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://conexao-xamanica.vercel.app',
    title: 'Conexão Xamânica - Diário Espiritual',
    description: 'Portal Sagrado para registrar Jornadas Xamânicas e Experiências Espirituais',
    siteName: 'Conexão Xamânica',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Conexão Xamânica - Diário Espiritual',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conexão Xamânica - Diário Espiritual',
    description: 'Aplicativo sagrado para registrar jornadas xamânicas e experiências espirituais',
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'lifestyle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientRootLayout>{children}</ClientRootLayout>
}


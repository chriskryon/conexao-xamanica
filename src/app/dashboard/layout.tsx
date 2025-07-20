"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useOnboarding } from "@/stores/userStore"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { completed: onboardingCompleted, profile } = useOnboarding()

  useEffect(() => {
    // Verificação de onboarding ao acessar rotas protegidas
    const checkAccess = () => {
      if (!onboardingCompleted || !profile) {
        console.log('Dashboard Layout: Onboarding não completado, redirecionando...')
        router.replace('/onboarding')
        return
      }
      
      console.log('Dashboard Layout: Acesso autorizado', { 
        completed: onboardingCompleted, 
        hasProfile: !!profile 
      })
    }

    // Pequeno delay para garantir hidratação do Zustand
    const timer = setTimeout(checkAccess, 100)
    
    return () => clearTimeout(timer)
  }, [onboardingCompleted, profile, router])

  // Se onboarding não está completo, mostrar loading enquanto redireciona
  if (!onboardingCompleted || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E4A2F] mx-auto mb-4"></div>
          <p className="text-[#2C4A7E] font-sans">Verificando acesso...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/stores/userStore";

export default function Home() {
  const router = useRouter();
  const { completed: onboardingCompleted, profile } = useOnboarding();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aguarda hidratação do Zustand para evitar mismatch entre servidor e cliente
    const checkOnboardingStatus = () => {
      // Verifica se o onboarding foi completado E se há um profile válido
      if (onboardingCompleted && profile) {
        router.replace("/dashboard");
      } else {
        router.replace("/onboarding");
      }
      setIsLoading(false);
    };

    // Pequeno delay para garantir que o localStorage foi hidratado
    const timeout = setTimeout(checkOnboardingStatus, 100);
    
    return () => clearTimeout(timeout);
  }, [router, onboardingCompleted, profile]);

  // Loading state enquanto verifica o status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0E6F7] via-[#E6F3FF] to-[#FDF4E6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E4A2F] mx-auto mb-4"></div>
          <p className="text-[#2C4A7E] font-sans">Carregando...</p>
        </div>
      </div>
    );
  }

  return null;
}

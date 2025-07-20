import { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import { getStoredUserData } from "@/services/onboarding"

export default function DevTools() {
  const [userData, setUserData] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkData = () => {
      const { userData: data, completed } = getStoredUserData()
      setUserData(data)
    }
    
    checkData()
    // Verificar a cada 2 segundos
    const interval = setInterval(checkData, 2000)
    return () => clearInterval(interval)
  }, [])

  const clearAllData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user-profile')
      localStorage.removeItem('onboarding-completed')
      localStorage.removeItem('onboarding-data')
      localStorage.removeItem('onboarding-step')
      setUserData(null)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        title="DevTools - Dados salvos"
      >
        <Icon icon="mdi:developer-board" className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border p-4 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">🛠️ DevTools</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Icon icon="mdi:close" className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-sm text-gray-600 mb-1">
                📊 Status do Onboarding
              </h4>
              <p className="text-xs bg-gray-100 p-2 rounded">
                {userData ? 
                  `✅ Completo (ID: ${userData.id})` : 
                  '⏳ Em andamento'
                }
              </p>
            </div>

            {userData && (
              <div>
                <h4 className="font-medium text-sm text-gray-600 mb-1">
                  👤 Dados do Usuário
                </h4>
                <div className="text-xs bg-gray-100 p-2 rounded space-y-1">
                  <p><strong>Nome:</strong> {userData.nome}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Signo:</strong> {userData.signo}</p>
                  <p><strong>Animal:</strong> {userData.animalPoder}</p>
                  <p><strong>Criado:</strong> {new Date(userData.createdAt).toLocaleString()}</p>
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium text-sm text-gray-600 mb-1">
                💾 localStorage
              </h4>
              <div className="text-xs space-y-1">
                <p className="bg-blue-100 p-1 rounded">
                  user-profile: {localStorage.getItem('user-profile') ? '✅' : '❌'}
                </p>
                <p className="bg-blue-100 p-1 rounded">
                  onboarding-data: {localStorage.getItem('onboarding-data') ? '✅' : '❌'}
                </p>
                <p className="bg-blue-100 p-1 rounded">
                  onboarding-step: {localStorage.getItem('onboarding-step') || 'N/A'}
                </p>
              </div>
            </div>

            <button
              onClick={clearAllData}
              className="w-full bg-red-500 text-white text-xs py-2 px-3 rounded hover:bg-red-600 transition-colors"
            >
              🗑️ Limpar tudo
            </button>

            <div className="text-xs text-gray-500 text-center">
              <p>🔄 Atualiza automaticamente</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

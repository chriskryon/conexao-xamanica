import { Icon } from "@iconify/react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface SavedDataIndicatorProps {
  onClearData: () => void
}

export default function SavedDataIndicator({ onClearData }: SavedDataIndicatorProps) {
  const [hasSavedData, setHasSavedData] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('onboarding-data')
      setHasSavedData(!!savedData)
    }
  }, [])

  const handleClear = () => {
    onClearData()
    setHasSavedData(false)
    setShowConfirm(false)
  }

  if (!hasSavedData) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-4 p-3 bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-700">
            <Icon icon="mdi:content-save" className="w-5 h-5" />
            <span className="text-sm font-medium font-sans">
              Dados salvos automaticamente
            </span>
          </div>
          
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="text-xs text-blue-600 hover:text-blue-800 font-sans underline"
          >
            Recomeçar
          </button>
        </div>

        <AnimatePresence>
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-blue-200"
            >
              <p className="text-xs text-blue-600 mb-2 font-sans">
                Tem certeza? Todos os dados preenchidos serão perdidos.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded font-sans hover:bg-red-600 transition-colors"
                >
                  Sim, recomeçar
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded font-sans hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

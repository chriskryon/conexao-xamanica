import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Icon } from "@iconify/react"
import { motion, AnimatePresence } from "framer-motion"

interface PhotoUploadProps {
  onPhotoChange: (file: File | null) => void
  currentPhoto: File | null
}

export default function PhotoUpload({ onPhotoChange, currentPhoto }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null)
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors.some((e: any) => e.code === 'file-too-large')) {
        setError('Arquivo muito grande. Máximo 5MB.')
      } else if (rejection.errors.some((e: any) => e.code === 'file-invalid-type')) {
        setError('Tipo de arquivo inválido. Use apenas imagens.')
      } else {
        setError('Erro no upload. Tente novamente.')
      }
      return
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      onPhotoChange(file)
      
      // Criar preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [onPhotoChange])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  })

  const removePhoto = () => {
    onPhotoChange(null)
    setPreview(null)
    setError(null)
  }

  const getBorderColor = () => {
    if (isDragReject || error) return 'border-red-300'
    if (isDragActive) return 'border-green-400'
    if (preview || currentPhoto) return 'border-[#2E4A2F]'
    return 'border-[#A67B5B]/30'
  }

  const getBackgroundColor = () => {
    if (isDragReject || error) return 'bg-red-50/50'
    if (isDragActive) return 'bg-green-50/50'
    return 'bg-white/20'
  }

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
          transition-all duration-300 backdrop-blur-sm
          ${getBorderColor()} ${getBackgroundColor()}
          hover:bg-white/30 hover:border-[#2E4A2F]/50
        `}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {preview || currentPhoto ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-3"
            >
              <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                <img 
                  src={preview || (currentPhoto ? URL.createObjectURL(currentPhoto) : '')} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removePhoto()
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-[#2E4A2F] font-sans">
                Clique ou arraste para alterar
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <motion.div
                animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon 
                  icon={isDragActive ? "mdi:cloud-upload" : "mdi:camera-plus"} 
                  className={`w-12 h-12 mx-auto transition-colors ${
                    isDragActive ? 'text-green-500' : 'text-[#2E4A2F]'
                  }`} 
                />
              </motion.div>
              
              <div>
                <p className="text-[#2E4A2F] font-medium font-sans">
                  {isDragActive ? (
                    'Solte sua foto aqui!'
                  ) : (
                    'Arraste sua foto ou clique aqui'
                  )}
                </p>
                <p className="text-xs text-[#2C4A7E] opacity-60 mt-1 font-sans">
                  PNG, JPG, GIF até 5MB
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-600 text-sm font-sans"
        >
          <Icon icon="mdi:alert-circle" className="w-4 h-4" />
          {error}
        </motion.div>
      )}
    </div>
  )
}

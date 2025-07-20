import { motion, AnimatePresence } from "framer-motion"
import { ReactNode } from "react"

interface StepTransitionProps {
  children: ReactNode
  currentStep: number
}

export default function StepTransition({ children, currentStep }: StepTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

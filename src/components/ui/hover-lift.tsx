'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverLiftProps {
  children: ReactNode
  className?: string
  liftHeight?: number
  scale?: number
}

export function HoverLift({ 
  children, 
  className = '', 
  liftHeight = 8,
  scale = 1.02
}: HoverLiftProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        y: -liftHeight, 
        scale,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}
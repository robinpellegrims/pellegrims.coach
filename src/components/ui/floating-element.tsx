'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FloatingElementProps {
  children: ReactNode
  className?: string
  duration?: number
  offset?: number
}

export function FloatingElement({ 
  children, 
  className = '', 
  duration = 3,
  offset = 10
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-offset, offset, -offset],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}
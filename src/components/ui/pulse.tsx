'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PulseProps {
  children: ReactNode
  className?: string
  scale?: number[]
  duration?: number
}

export function Pulse({ 
  children, 
  className = '', 
  scale = [1, 1.05, 1],
  duration = 2
}: PulseProps) {
  return (
    <motion.div
      className={className}
      animate={{ scale }}
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
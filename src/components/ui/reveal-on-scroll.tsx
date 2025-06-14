'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  threshold?: number
}

export function RevealOnScroll({ 
  children, 
  className = '',
  threshold = 0.1
}: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      }}
      viewport={{ amount: threshold, once: true }}
    >
      {children}
    </motion.div>
  )
}
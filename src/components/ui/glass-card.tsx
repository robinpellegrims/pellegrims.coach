'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  interactive?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export function GlassCard({ 
  children, 
  className = '',
  interactive = true,
  padding = 'md'
}: GlassCardProps) {
  const baseClasses = "backdrop-blur-2xl bg-white/80 border border-ocean-200/30 rounded-xl shadow-glass"
  
  const paddingClasses = {
    sm: "p-4",
    md: "p-6", 
    lg: "p-8"
  }

  const interactiveClasses = interactive 
    ? "hover:shadow-ocean transform hover:-translate-y-2 transition-all duration-300 ease-out" 
    : ""

  return (
    <motion.div
      className={`${baseClasses} ${paddingClasses[padding]} ${interactiveClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AthleticCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'stat' | 'service' | 'project'
  interactive?: boolean
}

export function AthleticCard({ 
  children, 
  className = '',
  variant = 'default',
  interactive = true
}: AthleticCardProps) {
  const baseClasses = "bg-white rounded-xl shadow-lg border border-ocean-100 overflow-hidden"
  
  const variantClasses = {
    default: "",
    stat: "text-center p-6",
    service: "h-full p-8 relative",
    project: "h-full"
  }

  const interactiveClasses = interactive 
    ? "hover:shadow-athletic hover:border-ocean-200 transform hover:-translate-y-2 transition-all duration-300 ease-out" 
    : ""

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={interactive ? { y: variant === 'service' ? -8 : -4, scale: variant === 'stat' ? 1.05 : 1.02 } : {}}
    >
      {children}
    </motion.div>
  )
}
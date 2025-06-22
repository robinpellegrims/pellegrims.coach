'use client'

import { motion } from 'framer-motion'

interface CounterProps {
  to: number
  duration?: number
  className?: string
  suffix?: string
}

export function Counter({ 
  to, 
  duration = 2,
  className = '',
  suffix = ''
}: CounterProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration, ease: "easeOut" }}
      >
        {to}
      </motion.span>
      {suffix}
    </motion.span>
  )
}
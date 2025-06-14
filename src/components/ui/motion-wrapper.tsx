'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { animationVariants, AnimationVariant } from './animations'

interface MotionWrapperProps {
  children: ReactNode
  className?: string
  variant?: AnimationVariant
  delay?: number
  duration?: number
}

export function MotionWrapper({ 
  children, 
  className = '', 
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.6
}: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants[variant]}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
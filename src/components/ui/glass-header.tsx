'use client'

import { ReactNode } from 'react'

interface GlassHeaderProps {
  children: ReactNode
  className?: string
  isScrolled?: boolean
}

export function GlassHeader({ 
  children, 
  className = '',
  isScrolled = false
}: GlassHeaderProps) {
  const baseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-ocean-200/20 shadow-sm"
  const glassClasses = isScrolled 
    ? "py-3" 
    : "py-4"

  return (
    <header className={`${baseClasses} ${glassClasses} ${className} animate-slide-up`}>
      {children}
    </header>
  )
}
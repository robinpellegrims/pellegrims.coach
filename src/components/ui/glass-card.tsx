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
  const baseClasses = "backdrop-blur-2xl bg-white/80 border border-ocean-200/30 rounded-xl shadow-glass animate-slide-up"
  
  const paddingClasses = {
    sm: "p-4",
    md: "p-6", 
    lg: "p-8"
  }

  const interactiveClasses = interactive 
    ? "hover:shadow-ocean transform hover:-translate-y-2 transition-all duration-300 ease-out" 
    : ""

  return (
    <div className={`${baseClasses} ${paddingClasses[padding]} ${interactiveClasses} ${className}`}>
      {children}
    </div>
  )
}
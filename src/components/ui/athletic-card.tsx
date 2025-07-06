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
  const baseClasses = "bg-white rounded-xl shadow-lg border border-ocean-100 overflow-hidden animate-slide-up"
  
  const variantClasses = {
    default: "",
    stat: "text-center p-6",
    service: "h-full p-8 relative",
    project: "h-full"
  }

  const interactiveClasses = interactive 
    ? "hover:shadow-athletic hover:border-ocean-200 transform hover:-translate-y-2 transition-all duration-300 ease-out hover:scale-105" 
    : ""

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}>
      {children}
    </div>
  )
}
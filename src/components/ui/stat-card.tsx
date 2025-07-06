'use client'

import { AthleticCard } from './athletic-card'

interface StatCardProps {
  value: string | number
  label: string
  className?: string
}

export function StatCard({ value, label, className = '' }: StatCardProps) {
  return (
    <AthleticCard variant="stat" className={className}>
      <div className="text-3xl font-bold text-ocean-600 mb-2">
        {value}
      </div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </AthleticCard>
  )
}
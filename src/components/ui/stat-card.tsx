'use client'

import { motion } from 'framer-motion'
import { AthleticCard } from './athletic-card'

interface StatCardProps {
  value: string | number
  label: string
  className?: string
}

export function StatCard({ value, label, className = '' }: StatCardProps) {
  return (
    <AthleticCard variant="stat" className={className}>
      <motion.div
        className="text-3xl font-bold text-ocean-600 mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </AthleticCard>
  )
}
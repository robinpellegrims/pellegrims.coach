'use client'

import { ChartLineIcon, ClipboardListIcon, SunIcon, SwimmerIcon, UsersIcon, WaterIcon } from '@/components/icons'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AthleticButton } from '@/components/ui/athletic-button'
import { AthleticCard } from '@/components/ui/athletic-card'
import type { Locale } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/translations'

type Props = {
  locale: Locale
  t: TranslationKey
}

export default function Coaching({ t }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('coaching')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      icon: ClipboardListIcon,
      title: t.coaching.services.swimmingTraining,
      gradient: 'from-ocean-500 to-ocean-600',
      description: t.coaching.serviceDescriptions.swimmingTraining,
      highlight: t.coaching.highlights.triathlon
    },
    {
      icon: SwimmerIcon,
      title: t.coaching.services.triathlonTraining,
      gradient: 'from-ocean-600 to-ocean-700',
      description: t.coaching.serviceDescriptions.triathlonTraining,
      highlight: t.coaching.highlights.oneOnOne
    },
    {
      icon: UsersIcon,
      title: t.coaching.services.swimmingTechnique,
      gradient: 'from-ocean-400 to-ocean-500',
      description: t.coaching.serviceDescriptions.swimmingTechnique,
      highlight: t.coaching.highlights.clubs
    },
    {
      icon: WaterIcon,
      title: t.coaching.services.swimmingTechniqueClubs,
      gradient: 'from-ocean-700 to-ocean-800',
      description: t.coaching.serviceDescriptions.swimmingTechniqueClubs,
      highlight: t.coaching.highlights.adults
    },
    {
      icon: ChartLineIcon,
      title: t.coaching.services.adults,
      gradient: 'from-ocean-500 to-ocean-700',
      description: t.coaching.serviceDescriptions.adults,
      highlight: t.coaching.highlights.advanced
    },
    {
      icon: SunIcon,
      title: t.coaching.services.trainingCamp,
      gradient: 'from-ocean-400 to-ocean-600',
      description: t.coaching.serviceDescriptions.trainingCamp,
      highlight: t.coaching.highlights.camps
    }
  ]

  return (
    <section id="coaching" className="relative py-24 bg-gradient-to-br from-athletic-light via-ocean-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: "120px" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-ocean mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-athletic-dark mb-6">
            {t.coaching.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.coaching.intro}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <AthleticCard variant="service" className="group relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500`}></div>
                
                {/* Highlight Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r ${service.gradient} text-white rounded-full`}>
                    {service.highlight}
                  </span>
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl text-white text-2xl mb-6 shadow-athletic group-hover:shadow-ocean`}
                >
                  <service.icon />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-display font-bold text-athletic-dark mb-3 group-hover:text-ocean-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-ocean-200 rounded-xl transition-colors duration-300"></div>
              </AthleticCard>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-ocean rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                {t.coaching.cta.title}
              </h3>
              <p className="text-ocean-100 text-lg mb-8 max-w-2xl mx-auto">
                {t.coaching.cta.description}
              </p>
              <AthleticButton
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                variant="inverted"
                size="lg"
                className="font-semibold"
              >
                {t.coaching.cta.button}
              </AthleticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

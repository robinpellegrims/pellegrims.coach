'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AthleticButton } from '@/components/ui/athletic-button'
import { StatCard } from '@/components/ui/stat-card'
import { getYearsOfExperienceString, getExperienceText } from '@/lib/experience'
import { ATHLETE_COUNTS } from '@/lib/constants'
import type { Locale } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/translations'

type Props = {
  locale: Locale
  t: TranslationKey
}

export default function About({ locale, t }: Props) {
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

    const section = document.getElementById('about')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="relative overflow-hidden">
      {/* Dynamic Hero Section */}
      <div className="relative h-screen min-h-[500px] w-full flex items-center justify-center pt-20">
        {/* Background Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: isVisible ? 1 : 1.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/images/banner_1920.jpg"
            alt={t.about.bannerAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-athletic opacity-60"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>

        {/* Animated Geometric Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-ocean-400/30 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-ocean-500/20 rounded-lg backdrop-blur-sm"
          animate={{
            rotate: -360,
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p 
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
            >
              Ward Pellegrims
            </motion.p>
            
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-ocean-100 font-medium mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t.about.subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <AthleticButton
                onClick={() => document.getElementById('coaching')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
              >
                {t.about.exploreCoaching}
              </AthleticButton>
              <AthleticButton
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                variant="inverted"
                size="lg"
              >
                {t.about.getInTouch}
              </AthleticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* About Content Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: "80px" } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-1 bg-gradient-ocean"
                />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-athletic-dark">
                  {t.about.myStory}
                </h2>
              </div>
              
              <div className="space-y-6 text-lg leading-relaxed text-gray-600">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {getExperienceText(locale)}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {t.about.intro2}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  {t.about.intro3}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="font-semibold text-ocean-700 p-6 bg-ocean-50 rounded-xl border-l-4 border-ocean-500"
                >
                  {t.about.intro4}
                </motion.p>
              </div>
            </motion.div>

            {/* Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative flex flex-col items-center"
            >
              {/* Featured Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
                className="relative mb-8"
              >
                <div className="w-64 h-64 rounded-full overflow-hidden ring-4 ring-ocean-500/20 shadow-2xl relative">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Ward Pellegrims - Professional Swimming & Triathlon Coach"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/10 to-transparent"></div>
                </div>
                
                {/* Floating ring animation */}
                <motion.div
                  className="absolute inset-0 w-64 h-64 rounded-full border-2 border-ocean-400/30"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>

              {/* Key Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg"
              >
                <StatCard value={getYearsOfExperienceString()} label={t.about.yearsExperience} />
                <StatCard value={`${ATHLETE_COUNTS.CLIENTS}+`} label={t.about.clientsCoached} />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-ocean rounded-full opacity-20"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-ocean-300 rounded-lg opacity-30"
                animate={{
                  x: [-5, 5, -5],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

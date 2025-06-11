'use client'

import Image from 'next/image'
import { useTranslation } from '@/context/TranslationContext'

export default function About() {
  const { t } = useTranslation()
  return (
    <section id="about">
      <div className="relative h-80 w-full">
        <Image
          src="/images/banner_1920.jpg"
          alt="Swimming banner"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 py-24">
        <header className="text-center mb-12">
          <h2 className="text-6xl font-bold text-blue-600 mb-4">Ward Pellegrims</h2>
          <p className="text-2xl text-gray-600 font-medium">
            {t('about-subtitle')}
          </p>
        </header>
        
        <div className="text-lg leading-relaxed space-y-4 text-gray-700">
          <p>
            {t('about-intro-1')}
          </p>
          <p>
            {t('about-intro-2')}
          </p>
          <p>
            {t('about-intro-3')}
          </p>
          <p className="font-medium">
            {t('about-intro-4')}
          </p>
        </div>
      </div>
    </section>
  )
}
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/translations'

type Props = {
  locale: Locale
  t: TranslationKey
}

export default function About({ t }: Props) {
  return (
    <section id="about">
      <div className="relative h-80 w-full">
        <Image
          src="/images/banner_1920.jpg"
          alt={t.about.bannerAlt}
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
            {t.about.subtitle}
          </p>
        </header>
        
        <div className="text-lg leading-relaxed space-y-4 text-gray-700">
          <p>
            {t.about.intro1}
          </p>
          <p>
            {t.about.intro2}
          </p>
          <p>
            {t.about.intro3}
          </p>
          <p className="font-medium">
            {t.about.intro4}
          </p>
        </div>
      </div>
    </section>
  )
}
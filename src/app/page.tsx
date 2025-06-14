import Header from '@/components/Header'
import About from '@/components/About'
import Coaching from '@/components/Coaching'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getTranslations } from '@/lib/translations'
import { defaultLocale } from '@/lib/i18n'

export default function RootPage() {
  const locale = defaultLocale
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} t={t} />
      <main>
        <About locale={locale} t={t} />
        <Coaching locale={locale} t={t} />
        <Projects locale={locale} t={t} />
        <Contact locale={locale} t={t} />
        <Footer locale={locale} t={t} />
      </main>
    </div>
  )
}
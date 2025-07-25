import Header from '@/components/Header'
import About from '@/components/About'
import Coaching from '@/components/Coaching'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import { getTranslations } from '@/lib/translations'
import { isValidLocale, type Locale } from '@/lib/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale: localeParam } = await params
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en'
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-white">
      <StructuredData locale={locale} />
      <Header locale={locale} t={t} />
      <h1 className="sr-only">{t.meta.title}</h1>
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

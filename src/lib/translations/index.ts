import { en } from './en'
import { nl } from './nl'
import type { Locale } from '../i18n'

const translations = {
  en,
  nl
} as const

export type TranslationKey = typeof en
export type Translations = typeof translations

export function getTranslations(locale: Locale): TranslationKey {
  return translations[locale] as TranslationKey || translations.en
}

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'nl' }
  ]
}
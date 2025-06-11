export type Locale = 'en' | 'nl'

export const locales: Locale[] = ['en', 'nl']
export const defaultLocale: Locale = 'en'

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/')
  const locale = segments[1]
  
  if (isValidLocale(locale)) {
    return locale
  }
  
  return defaultLocale
}

export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/')
  if (segments.length > 1 && isValidLocale(segments[1])) {
    return '/' + segments.slice(2).join('/')
  }
  return pathname
}
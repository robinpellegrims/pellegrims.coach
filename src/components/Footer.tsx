import type { Locale } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/translations'

type Props = {
  locale: Locale
  t: TranslationKey
}

export default function Footer({ t }: Props) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center text-sm text-gray-500">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  )
}
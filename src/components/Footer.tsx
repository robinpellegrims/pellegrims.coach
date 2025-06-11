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
        <ul className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
          <li className="border-l-0 sm:border-l border-gray-300 pl-0 sm:pl-4 first:border-l-0 first:pl-0">
            {t.footer.copyright}
          </li>
          <li className="border-l-0 sm:border-l border-gray-300 pl-0 sm:pl-4">
            {t.footer.design}{' '}
            <a 
              href="https://html5up.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {t.footer.htmlUp}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
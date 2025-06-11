'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaGlobe } from 'react-icons/fa'
import type { Locale } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/translations'

type Props = {
  locale: Locale
  t: TranslationKey
}

export default function Header({ locale, t }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const otherLocale = locale === 'en' ? 'nl' : 'en'
  const otherLocalePath = locale === 'en' ? '/nl' : '/'

  const handleLanguageSwitch = () => {
    // Mark that user has manually chosen a language
    sessionStorage.setItem('manualLanguageChoice', 'true')
  }

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed right-0 top-0 h-full w-96 bg-gray-900 text-white z-40 hidden lg:flex lg:flex-col lg:justify-between overflow-y-auto">
        <div className="p-12 text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
            <Image
              src="/images/avatar.jpg"
              alt="Ward Pellegrims"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Ward Pellegrims
            </a>
          </h1>
          <p className="text-gray-300 italic">
            {t.profile}
          </p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-0">
            <li className="border-t border-gray-700">
              <button
                onClick={() => scrollToSection('about')}
                className="w-full py-4 px-0 text-white hover:bg-white hover:text-gray-900 transition-colors text-center block"
              >
                {t.nav.about}
              </button>
            </li>
            <li className="border-t border-gray-700">
              <button
                onClick={() => scrollToSection('coaching')}
                className="w-full py-4 px-0 text-white hover:bg-white hover:text-gray-900 transition-colors text-center block"
              >
                {t.nav.coaching}
              </button>
            </li>
            <li className="border-t border-gray-700">
              <button
                onClick={() => scrollToSection('projects')}
                className="w-full py-4 px-0 text-white hover:bg-white hover:text-gray-900 transition-colors text-center block"
              >
                {t.nav.projects}
              </button>
            </li>
            <li className="border-t border-gray-700">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-4 px-0 text-white hover:bg-white hover:text-gray-900 transition-colors text-center block"
              >
                {t.nav.contact}
              </button>
            </li>
          </ul>
        </nav>

        <footer className="p-8">
          {/* Language Switcher */}
          <div className="flex justify-center mb-4">
            <Link
              href={otherLocalePath}
              onClick={handleLanguageSwitch}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <FaGlobe size={16} />
              <span>{otherLocale.toUpperCase()}</span>
            </Link>
          </div>
          
          <ul className="flex justify-center space-x-4">
            <li>
              <a
                href="https://twitter.com/WardPel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/ward.pellegrims/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/wardpel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/pellegrimsward/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </li>
            <li>
              <a
                href="mailto:ward.pellegrims@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaEnvelope size={20} />
              </a>
            </li>
          </ul>
        </footer>
      </header>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 h-11 bg-gray-900 z-50 flex items-center justify-between px-4">
          <div className="text-white font-bold">Ward Pellegrims</div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-gray-900 z-40 pt-11 lg:hidden">
            <div className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/avatar.jpg"
                  alt="Ward Pellegrims"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-xl font-bold text-white mb-2">Ward Pellegrims</h1>
              <p className="text-gray-300 italic text-sm">{t.profile}</p>
            </div>

            <nav className="px-0">
              <ul className="space-y-0">
                <li className="border-t border-gray-700">
                  <button
                    onClick={() => scrollToSection('about')}
                    className="w-full py-4 text-white hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    {t.nav.about}
                  </button>
                </li>
                <li className="border-t border-gray-700">
                  <button
                    onClick={() => scrollToSection('coaching')}
                    className="w-full py-4 text-white hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    {t.nav.coaching}
                  </button>
                </li>
                <li className="border-t border-gray-700">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="w-full py-4 text-white hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    {t.nav.projects}
                  </button>
                </li>
                <li className="border-t border-gray-700">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full py-4 text-white hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    {t.nav.contact}
                  </button>
                </li>
              </ul>
            </nav>

            <div className="p-8">
              {/* Mobile Language Switcher */}
              <div className="flex justify-center mb-6">
                <Link
                  href={otherLocalePath}
                  onClick={handleLanguageSwitch}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaGlobe size={20} />
                  <span>{otherLocale.toUpperCase()}</span>
                </Link>
              </div>
              
              <ul className="flex justify-center space-x-6">
                <li>
                  <a
                    href="https://twitter.com/WardPel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTwitter size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/ward.pellegrims/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaFacebookF size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/wardpel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaInstagram size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/pellegrimsward/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ward.pellegrims@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaEnvelope size={24} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Spacer for mobile header */}
        <div className="h-11"></div>
      </div>
    </>
  )
}
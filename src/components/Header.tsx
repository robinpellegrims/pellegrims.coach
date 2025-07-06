'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TwitterIcon, FacebookIcon, InstagramIcon, LinkedinIcon, EnvelopeIcon, BarsIcon, TimesIcon, GlobeIcon } from '@/components/icons'
import { GlassHeader } from '@/components/ui/glass-header'
import type { Locale } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/translations'

// Social media links configuration
const socialLinks = [
  { href: "https://twitter.com/WardPel", icon: TwitterIcon, platform: "Twitter" },
  { href: "https://www.facebook.com/ward.pellegrims/", icon: FacebookIcon, platform: "Facebook" },
  { href: "https://www.instagram.com/wardpel/", icon: InstagramIcon, platform: "Instagram" },
  { href: "https://www.linkedin.com/in/pellegrimsward/", icon: LinkedinIcon, platform: "LinkedIn" }
] as const

// Reusable social link component
const SocialLink = ({
  href,
  icon: Icon,
  platform,
  size = 18,
  className = "",
  ...motionProps
}: {
  href: string
  icon: React.ComponentType<{ size: number }>
  platform: string
  size?: number
  className?: string
} & React.ComponentProps<typeof motion.a>) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`text-ocean-700 hover:text-ocean-800 rounded-full hover:bg-ocean-50 transition-all duration-300 ${className}`}
    aria-label={`Visit ${platform} profile`}
    {...motionProps}
  >
    <Icon size={size} />
  </motion.a>
)

// Contact button component
const ContactButton = ({
  onClick,
  size = 18,
  className = "",
  ...motionProps
}: {
  onClick: () => void
  size?: number
  className?: string
} & React.ComponentProps<typeof motion.button>) => (
  <motion.button
    onClick={onClick}
    className={`text-ocean-700 hover:text-ocean-800 rounded-full hover:bg-ocean-50 transition-all duration-300 ${className}`}
    title="Contact me"
    aria-label="Contact me"
    {...motionProps}
  >
    <EnvelopeIcon size={size} />
  </motion.button>
)

type Props = {
  locale: Locale
  t: TranslationKey
}

export default function Header({ locale, t }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const otherLocale = locale === 'en' ? 'nl' : 'en'
  const otherLocalePath = locale === 'en' ? '/nl/' : '/en/'

  const handleLanguageSwitch = () => {
    // Mark that user has manually chosen a language
    sessionStorage.setItem('manualLanguageChoice', 'true')
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Modern Athletic Header */}
      <GlassHeader isScrolled={isScrolled}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-12 w-auto">
                <Image
                  src="/images/WPC_Logo_Horizontal_FullColour.png"
                  alt="Ward Pellegrims Coaching"
                  width={240}
                  height={96}
                  className="h-full w-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { key: 'about', section: 'about' },
                { key: 'coaching', section: 'coaching' },
                { key: 'projects', section: 'projects' },
                { key: 'contact', section: 'contact' }
              ].map((item, index) => (
                <motion.button
                  key={item.key}
                  onClick={() => scrollToSection(item.section)}
                  className="text-athletic-dark hover:text-ocean-600 font-medium transition-colors duration-300 relative group"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  custom={index}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-ocean group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <Link
                href={otherLocalePath}
                onClick={handleLanguageSwitch}
                className="flex items-center space-x-2 text-ocean-700 hover:text-ocean-800 transition-colors duration-300 p-2 rounded-lg hover:bg-ocean-50"
              >
                <GlobeIcon size={16} />
                <span className="text-sm font-medium">{otherLocale.toUpperCase()}</span>
              </Link>

              {/* Social Links - Desktop */}
              <div className="hidden md:flex items-center space-x-3">
                {socialLinks.map((social, index) => (
                  <SocialLink
                    key={index}
                    href={social.href}
                    icon={social.icon}
                    platform={social.platform}
                    className="p-2"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
                
                {/* Contact Button */}
                <ContactButton
                  onClick={() => scrollToSection('contact')}
                  className="p-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                />
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-athletic-dark hover:bg-ocean-50 transition-colors duration-300"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-haspopup="true"
              >
                {isMenuOpen ? <TimesIcon size={24} /> : <BarsIcon size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </GlassHeader>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden"
            id="mobile-menu"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-athletic-dark/80 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
            >
              <div className="px-8 pt-6 pb-4">
                {/* Mobile Profile */}
                <div className="text-center mb-4">
                  <div className="h-16 w-auto mx-auto mb-4">
                    <Image
                      src="/images/WPC_Logo_Horizontal_FullColour.png"
                      alt="Ward Pellegrims Coaching"
                      width={320}
                      height={128}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="mb-8">
                  <ul className="space-y-2">
                    {[
                      { key: 'about', section: 'about' },
                      { key: 'coaching', section: 'coaching' },
                      { key: 'projects', section: 'projects' },
                      { key: 'contact', section: 'contact' }
                    ].map((item, index) => (
                      <motion.li
                        key={item.key}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => scrollToSection(item.section)}
                          className="w-full text-left py-3 px-4 rounded-lg text-athletic-dark hover:bg-ocean-50 hover:text-ocean-700 transition-all duration-300 font-medium"
                        >
                          {t.nav[item.key as keyof typeof t.nav]}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Language Switcher */}
                <div className="mb-8 text-center">
                  <Link
                    href={otherLocalePath}
                    onClick={handleLanguageSwitch}
                    className="inline-flex items-center space-x-2 text-ocean-700 hover:text-ocean-800 transition-colors duration-300 p-3 rounded-lg hover:bg-ocean-50"
                  >
                    <GlobeIcon size={20} />
                    <span className="font-medium">{otherLocale.toUpperCase()}</span>
                  </Link>
                </div>

                {/* Mobile Social Links */}
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <SocialLink
                      key={index}
                      href={social.href}
                      icon={social.icon}
                      platform={social.platform}
                      size={20}
                      className="p-3"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    />
                  ))}
                  
                  {/* Contact Button */}
                  <ContactButton
                    onClick={() => scrollToSection('contact')}
                    size={20}
                    className="p-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + 4 * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { PaperPlaneIcon, CheckCircleIcon, ExclamationTriangleIcon, UserIcon, EnvelopeIcon, TagIcon, CommentIcon } from '@/components/icons'
import { AthleticButton } from '@/components/ui/athletic-button'
import { GlassCard } from '@/components/ui/glass-card'
import { StatCard } from '@/components/ui/stat-card'
import type { Locale } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/translations'

type Props = {
  locale: Locale
  t: TranslationKey
}

export default function Contact({ t }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [isEmailJSReady, setIsEmailJSReady] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Check if services are enabled based on environment variables
  const isRecaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const isEmailJSEnabled = !!(
    process.env.NEXT_PUBLIC_EMAILJS_USER_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  )

  useEffect(() => {
    // Initialize EmailJS when component mounts (if enabled)
    const initEmailJS = () => {
      if (!isEmailJSEnabled) {
        console.warn('EmailJS is disabled - missing environment variables')
        return
      }

      try {
        const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
        emailjs.init(userId)
        setIsEmailJSReady(true)
      } catch (error) {
        console.warn('EmailJS initialization failed:', error)
      }
    }

    initEmailJS()
  }, [isEmailJSEnabled])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('contact')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Add reCAPTCHA callback to global scope
    if (typeof window !== 'undefined') {
      (window as unknown as { recaptchaCallback: (token: string) => void }).recaptchaCallback = (token: string) => {
        setRecaptchaToken(token)
      }
      
      (window as unknown as { recaptchaExpired: () => void }).recaptchaExpired = () => {
        setRecaptchaToken(null)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isEmailJSEnabled || !isEmailJSReady) {
      console.warn('EmailJS is not available or not ready yet')
      setStatus('error')
      return
    }

    // Check reCAPTCHA if enabled
    if (isRecaptchaEnabled && !recaptchaToken) {
      console.warn('Please complete the reCAPTCHA verification')
      setStatus('error')
      return
    }

    setStatus('sending')

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID

      if (!serviceId || !templateId || !userId) {
        throw new Error('EmailJS environment variables are required: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_USER_ID')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          'g-recaptcha-response': recaptchaToken
        },
        userId
      )
      
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setRecaptchaToken(null)
      
      // Reset reCAPTCHA
      if (typeof window !== 'undefined' && (window as unknown as { grecaptcha?: { reset: () => void } }).grecaptcha) {
        (window as unknown as { grecaptcha: { reset: () => void } }).grecaptcha.reset()
      }
    } catch (error) {
      console.error('Email error:', error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="contact" className="relative py-24 bg-gradient-to-br from-ocean-50 via-white to-athletic-light">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-ocean-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-athletic-success/20 rounded-full opacity-30 blur-3xl"></div>
        </div>

        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-athletic-dark mb-8">
              {t.contact.title}
            </h2>
            
            <GlassCard padding="lg" className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-athletic-success rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <CheckCircleIcon className="text-white text-3xl" />
              </motion.div>
              
              <h4 className="text-2xl font-display font-bold text-athletic-success mb-4">
                {t.contact.success}
              </h4>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t.contact.successMsg}
              </p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <AthleticButton
                  onClick={() => setStatus('idle')}
                  size="lg"
                >
                  {t.contact.sendAnother}
                </AthleticButton>
              </motion.div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-ocean-50 via-white to-athletic-light">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-ocean-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-ocean-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: "120px" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-ocean mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-athletic-dark mb-6">
            {t.contact.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.contact.intro}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <GlassCard padding="lg">
              <h3 className="text-2xl font-display font-bold text-athletic-dark mb-6">
                {t.contact.letsConnect}
              </h3>
              <div className="space-y-6">
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center shadow-athletic">
                    <EnvelopeIcon className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-athletic-dark">{t.contact.email}</p>
                    <p className="text-ocean-600">{t.contact.emailMessage}</p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-gradient-ocean rounded-full flex items-center justify-center shadow-athletic">
                    <UserIcon className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-athletic-dark">{t.contact.professionalCoach}</p>
                    <p className="text-gray-600">{t.contact.expertTitle}</p>
                  </div>
                </motion.div>
              </div>
            </GlassCard>

            {/* Athletic Stats */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard value="24h" label={t.contact.responseTime} className="text-2xl" />
              <StatCard value="100%" label={t.contact.personalized} className="text-2xl" />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <GlassCard padding="lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="relative"
                  >
                    <div className="relative">
                      <UserIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === 'name' || formData.name ? 'text-ocean-600' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        name="name"
                        placeholder={t.contact.form.name}
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-ocean-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="relative"
                  >
                    <div className="relative">
                      <EnvelopeIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === 'email' || formData.email ? 'text-ocean-600' : 'text-gray-400'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        placeholder={t.contact.form.email}
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full pl-12 pr-4 py-4 border border-ocean-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                  </motion.div>
                </div>
                
                {/* Subject Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="relative"
                >
                  <div className="relative">
                    <TagIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                      focusedField === 'subject' || formData.subject ? 'text-ocean-600' : 'text-gray-400'
                    }`} />
                    <input
                      type="text"
                      name="subject"
                      placeholder={t.contact.form.subject}
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-12 pr-4 py-4 border border-ocean-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                </motion.div>
                
                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="relative"
                >
                  <div className="relative">
                    <CommentIcon className={`absolute left-4 top-6 transition-colors duration-300 ${
                      focusedField === 'message' || formData.message ? 'text-ocean-600' : 'text-gray-400'
                    }`} />
                    <textarea
                      name="message"
                      placeholder={t.contact.form.message}
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-12 pr-4 py-4 border border-ocean-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 outline-none transition-all duration-300 resize-vertical bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                </motion.div>

                {/* reCAPTCHA */}
                {isRecaptchaEnabled && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="flex justify-center"
                  >
                    <div 
                      className="g-recaptcha" 
                      data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      data-callback="recaptchaCallback"
                      data-expired-callback="recaptchaExpired"
                    ></div>
                  </motion.div>
                )}

                {/* Error Message */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3"
                  >
                    <ExclamationTriangleIcon className="text-red-500 flex-shrink-0" />
                    <p className="text-red-700">{t.contact.error}</p>
                  </motion.div>
                )}
                
                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  <AthleticButton
                    type="submit"
                    disabled={status === 'sending'}
                    fullWidth
                    size="lg"
                    className="relative overflow-hidden"
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>{t.contact.form.sending}</span>
                      </>
                    ) : (
                      <>
                        <PaperPlaneIcon />
                        <span>{t.contact.form.send}</span>
                      </>
                    )}
                  </AthleticButton>
                </motion.div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

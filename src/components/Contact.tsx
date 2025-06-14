'use client'

import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
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
          message: formData.message
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
      <section id="contact" className="border-t-4 border-gray-200">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-6">{t.contact.title}</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <h4 className="text-xl font-semibold text-green-800 mb-2">{t.contact.success}</h4>
            <p className="text-green-700">{t.contact.successMsg}</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              {t.contact.sendAnother}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="border-t-4 border-gray-200">
      <div className="max-w-2xl mx-auto px-6 py-24">
        <h3 className="text-4xl font-bold text-gray-800 mb-6">{t.contact.title}</h3>
        <p className="text-lg text-gray-600 mb-12">
          {t.contact.intro}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder={t.contact.form.name}
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder={t.contact.form.email}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>
          
          <div>
            <input
              type="text"
              name="subject"
              placeholder={t.contact.form.subject}
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          
          <div>
            <textarea
              name="message"
              placeholder={t.contact.form.message}
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
            />
          </div>

          {/* reCAPTCHA - Show when environment variable is present */}
          {isRecaptchaEnabled && (
            <div className="flex justify-center">
              <div 
                className="g-recaptcha" 
                data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                data-callback="recaptchaCallback"
                data-expired-callback="recaptchaExpired"
              ></div>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">
                {t.contact.error}
              </p>
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'sending' ? t.contact.form.sending : t.contact.form.send}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

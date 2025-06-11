'use client'

import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [isEmailJSReady, setIsEmailJSReady] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  useEffect(() => {
    // Initialize EmailJS when component mounts
    const initEmailJS = () => {
      try {
        emailjs.init('user_XN4D5XCgg7cTAaQJIkE71')
        setIsEmailJSReady(true)
      } catch (error) {
        console.warn('EmailJS initialization failed:', error)
      }
    }

    initEmailJS()
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
    
    if (!isEmailJSReady) {
      console.warn('EmailJS not ready yet')
      setStatus('error')
      return
    }

    if (!recaptchaToken) {
      console.warn('Please complete the reCAPTCHA verification')
      setStatus('error')
      return
    }

    setStatus('sending')

    try {
      await emailjs.send(
        'contact_service',
        'contact_form', 
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        'user_XN4D5XCgg7cTAaQJIkE71'
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
          <h3 className="text-4xl font-bold text-gray-800 mb-6">Contact Me</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <h4 className="text-xl font-semibold text-green-800 mb-2">Thank you for your message!</h4>
            <p className="text-green-700">I&apos;ll get back to you as soon as possible.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Send another message
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="border-t-4 border-gray-200">
      <div className="max-w-2xl mx-auto px-6 py-24">
        <h3 className="text-4xl font-bold text-gray-800 mb-6">Contact Me</h3>
        <p className="text-lg text-gray-600 mb-12">
          Feel free to contact me and see what I can do for you
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
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
                placeholder="Email"
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
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          
          <div>
            <textarea
              name="message"
              placeholder="Message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-vertical"
            />
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <div 
              className="g-recaptcha" 
              data-sitekey="6Lc5w0ocAAAAAINj9RiSNuQpeFhf-NQO8uzBexrk"
              data-callback="recaptchaCallback"
              data-expired-callback="recaptchaExpired"
            ></div>
          </div>

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">
                An error occurred while trying to send your message, please try again.
              </p>
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
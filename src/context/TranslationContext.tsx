'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'nl'

interface Translations {
  [key: string]: string
}

const translations: Record<Language, Translations> = {
  en: {
    profile: "Swimming & Triathlon Coach",
    "menu-about": "About",
    "menu-coaching": "Coaching", 
    "menu-projects": "Projects",
    "menu-contact": "Contact",
    "about-subtitle": "Improve your swimming, cycling and running performance",
    "about-intro-1": "Do you want to create your own journey of success and do you want to profit from 12 years of coaching experience in Olympic swimming?",
    "about-intro-2": "Do you need a structured training plan and/or individual coaching based on the scientific knowledge I gathered during a Master in Sport Sciences and a Master in Rehabilitation Sciences?",
    "about-intro-3": "Do you want to explore your own limits and fulfill your ambitious physical goals?",
    "about-intro-4": "The silver medal at the Olympic Games in Rio 2016 was the highlight of my coaching career, but I want to help you reach your own highlights!",
    "personal-coaching-title": "Coaching",
    "personal-coaching-intro": "I can help you with the following aspects in order to make you a better athlete",
    "personal-coaching-swimming-training": "Online swimming programs",
    "personal-coaching-swimming-technique": "Swimming technique",
    "personal-coaching-adults": "Start 2 swim for companies",
    "personal-coaching-triathlon-training": "Online triathlon programs",
    "personal-coaching-swimming-technique-clubs": "Swimming technique for clubs",
    "personal-coaching-training-camp": "Training camps",
    "projects-title": "Projects",
    "projects-intro": "These are the most important projects I've been working in the past, now, and in the future",
    "projects-elite-swimmers-title": "Coaching Elite Swimmers",
    "projects-elite-swimmers-content": "Between 2009 and 2021",
    "projects-rdm2022-title": "Roc du Maroc",
    "projects-rdm2022-content": "Oktober 2022",
    "projects-camps-title": "Training camps",
    "projects-rgf-title": "Start to swim RGF Staffing",
    "projects-camps-content": "On request - minimum 4 athletes",
    "contact-title": "Contact Me",
    "contact-intro": "Feel free to contact me and see what I can do for you",
    "contact-success": "Thank you for your message!",
    "contact-fail": "An error occurred while trying to send your message, please try again.",
    "rwanda-title": "Rwanda Epic",
    "rwanda-content": "Novembre 2023"
  },
  nl: {
    profile: "Zwem- en triathloncoach",
    "menu-about": "Info",
    "menu-coaching": "Coaching",
    "menu-projects": "Projecten", 
    "menu-contact": "Contact",
    "about-subtitle": "Coaching in zwemmen, triathlon en duursporten.",
    "about-intro-1": "Wil jij gebruik maken van mijn 12 jaar ervaring in het begeleiden van Olympische topsporters en meedrijven op het Olympische succesverhaal dat ik samen met Ronald Gaastra heb mogen beleven?",
    "about-intro-2": "Heb je nood aan een gestructureerd schema of individuele begeleiding, wetenschappelijk onderbouwd dankzij mijn achtergrond als Master in de Bewegingswetenschappen en Master in de Revalidatiewetenschappen?",
    "about-intro-3": "Wil je op een verantwoorde manier je limieten opzoeken en hierdoor jouw ambitieuze sportprestatie waarmaken?",
    "about-intro-4": "De zilveren medaille van Pieter Timmers op de Olympische spelen van 2016 in Rio is voorlopig het hoogtepunt in mijn loopbaan als coach, maar ik wil er graag bij zijn wanneer jij je eigen sportieve doel waarmaakt!",
    "personal-coaching-title": "Coaching",
    "personal-coaching-intro": "Op de volgende manieren kan ik jou helpen om beter te presteren",
    "personal-coaching-swimming-training": "Online trainingschema's zwemmen",
    "personal-coaching-swimming-technique": "Analyse Zwemtechniek",
    "personal-coaching-adults": "Learn to swim voor volwassenen",
    "personal-coaching-triathlon-training": "Online trainingschema's triathlon",
    "personal-coaching-swimming-technique-clubs": "Technieksessies voor zwemclubs",
    "personal-coaching-training-camp": "Trainingskampen",
    "projects-title": "Projecten",
    "projects-intro": "Deze zijn de belangrijkste projecten waar ik in het verleden, nu en in de toekomst aan heb gewerkt",
    "projects-elite-swimmers-title": "Coaching van elite zwemmers",
    "projects-elite-swimmers-content": "Tussen 2009 en 2021",
    "projects-rdm2022-title": "Roc du Maroc",
    "projects-rdm2022-content": "Oktober 2022",
    "projects-camps-title": "Trainingskampen",
    "projects-rgf-title": "Start to swim RGF Staffing",
    "projects-camps-content": "Op aanvraag - minimum 4 atleten",
    "contact-title": "Contacteer mij",
    "contact-intro": "Contacteer me vrijblijvend via onderstaand formulier en kijk wat ik voor jou kan betekenen",
    "contact-success": "Bedankt voor uw bericht!",
    "contact-fail": "Het is niet gelukt om uw bericht te versturen, gelieve opnieuw te proberen.",
    "rwanda-title": "Rwanda Epic",
    "rwanda-content": "November 2023"
  }
}

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    // Return a fallback during SSR
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: string) => key
    }
  }
  return context
}
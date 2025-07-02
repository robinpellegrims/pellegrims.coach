import Script from 'next/script'
import { type Locale } from '@/lib/i18n'
import { getStructuredDataDescription } from '@/lib/experience'

interface StructuredDataProps {
  locale: Locale
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const siteUrl = 'https://www.pellegrims.coach'
  const pageUrl = locale === 'en' ? siteUrl : `${siteUrl}/nl`
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ward Pellegrims Coaching",
    "url": siteUrl,
    "logo": `${siteUrl}/images/banner_1920.jpg`,
    "description": locale === 'en' 
      ? "Elite level coaching in swimming and triathlon. Swimming & Triathlon Coach providing online training programs, technique analysis, and coaching services."
      : "Elite niveau coaching in zwemmen en triathlon. Zwem- en Triathloncoach die online trainingsprogramma's, techniekanalyse en coachingdiensten aanbiedt.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": `${pageUrl}#contact`
    }
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ward Pellegrims",
    "jobTitle": locale === 'en' ? "Swimming & Triathlon Coach" : "Zwem- en Triathloncoach",
    "description": locale === 'en'
      ? `${getStructuredDataDescription('en')}, including coaching Olympic swimmers. Silver medal coach at Rio 2016 Olympics.`
      : `${getStructuredDataDescription('nl')}, inclusief het coachen van Olympische zwemmers. Zilveren medaille coach op de Olympische Spelen van Rio 2016.`,
    "url": pageUrl,
    "image": `${siteUrl}/images/banner_1920.jpg`,
    "knowsAbout": [
      locale === 'en' ? "Swimming coaching" : "Zwemcoaching",
      locale === 'en' ? "Triathlon training" : "Triathlontraining",
      locale === 'en' ? "Sports science" : "Sportwetenschappen",
      locale === 'en' ? "Athletic performance" : "Atletische prestaties"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": locale === 'en' ? "Master in Sport Sciences, Master in Rehabilitation Sciences" : "Master in de Sportwetenschappen, Master in de Revalidatiewetenschappen"
    }
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": locale === 'en' ? "Swimming and Triathlon Coaching" : "Zwem- en Triathloncoaching",
    "provider": {
      "@type": "Person",
      "name": "Ward Pellegrims"
    },
    "description": locale === 'en'
      ? "Professional swimming and triathlon coaching services including online training programs, technique analysis, and personalized coaching."
      : "Professionele zwem- en triathloncoachingdiensten inclusief online trainingsprogramma's, techniekanalyse en gepersonaliseerde coaching.",
    "serviceType": [
      locale === 'en' ? "Swimming Training" : "Zwemtraining",
      locale === 'en' ? "Triathlon Training" : "Triathlontraining",
      locale === 'en' ? "Technique Analysis" : "Techniekanalyse",
      locale === 'en' ? "Training Camps" : "Trainingskampen"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Belgium"
    },
    "url": `${pageUrl}#coaching`
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />
    </>
  )
}

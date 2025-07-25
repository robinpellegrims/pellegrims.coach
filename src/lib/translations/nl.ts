import { ATHLETE_COUNTS } from '@/lib/constants'

export const nl = {
  // Meta data
  meta: {
    title: "Ward Pellegrims Coaching",
    description: "Elite coaching in zwemmen en triatlon. Zwem- en triatloncoach met online trainingsprogramma's, techniekanalyse en coaching services.",
    keywords: "zwemcoach, triatloncoach, zwemtraining, triatlontraining, België, Ward Pellegrims"
  },
  
  // Navigation
  nav: {
    about: "Info",
    coaching: "Coaching",
    projects: "Projecten", 
    contact: "Contact"
  },
  
  // Profile
  profile: "Zwem- en triatloncoach",
  
  // About section
  about: {
    title: "Ward Pellegrims",
    subtitle: "Coaching in zwemmen, triatlon en duursporten.",
    intro1: "Wil jij gebruik maken van mijn 12 jaar ervaring in het begeleiden van Olympische topsporters en meedrijven op het Olympische succesverhaal dat ik samen met Ronald Gaastra heb mogen beleven?",
    intro2: "Heb je nood aan een gestructureerd schema of individuele begeleiding, wetenschappelijk onderbouwd dankzij mijn achtergrond als Master in de Bewegingswetenschappen en Master in de Revalidatiewetenschappen?",
    intro3: "Wil je op een verantwoorde manier je limieten opzoeken en hierdoor jouw ambitieuze sportprestatie waarmaken?",
    intro4: "De zilveren medaille van Pieter Timmers op de Olympische spelen van 2016 in Rio is voorlopig het hoogtepunt in mijn loopbaan als coach, maar ik wil er graag bij zijn wanneer jij je eigen sportieve doel waarmaakt!",
    bannerAlt: "Zwembanner",
    exploreCoaching: "Ontdek mijn coaching",
    getInTouch: "Neem contact op",
    myStory: "Mijn verhaal",
    yearsExperience: "Jaar ervaring",
    clientsCoached: "Gecoachte atleten"
  },
  
  // Coaching section
  coaching: {
    title: "Coaching",
    intro: "Op de volgende manieren kan ik jou helpen om beter te presteren",
    services: {
      swimmingTraining: "Gepersonaliseerde Online trainingschema's",
      triathlonTraining: "Zwemtechniektraining",
      swimmingTechnique: "Zwem initiatie & masterclass",
      swimmingTechniqueClubs: "Start to swim",
      adults: "Improve your swim",
      trainingCamp: "Begeleiding trainingstage"
    },
    serviceDescriptions: {
      swimmingTraining: "Zwemmen • Triatlon • Wielrennen • Lopen",
      triathlonTraining: "Individueel op afspraak",
      swimmingTechnique: "Voor clubs en bedrijven",
      swimmingTechniqueClubs: "Groepstraining voor volwassenen",
      adults: "Groepstraining voor gevorderden",
      trainingCamp: "Op aanvraag"
    },
    cta: {
      title: "Klaar om je prestaties te maximaliseren?",
      description: `Sluit je aan bij meer dan ${ATHLETE_COUNTS.CLIENTS} atleten die hun doelen hebben bereikt met gepersonaliseerde coachingprogramma's.`,
      button: "Start je reis"
    },
    learnMore: "Meer info",
    highlights: {
      oneOnOne: "1-op-1",
      triathlon: "Triatlon",
      advanced: "Gevorderden",
      clubs: "Clubs",
      adults: "Volwassenen",
      camps: "Kampen"
    }
  },
  
  // Projects section
  projects: {
    items: {
      eliteSwimmers: {
        title: "Coaching van elite zwemmers",
        description: "Tussen 2009 en 2021"
      },
      rwanda: {
        title: "Rwanda Epic",
        description: "November 2023"
      },
      trainingPlans: {
        title: "Training Plans",
        description: "Zwem- en loopschema's beschikbaar op TrainingPeaks.com"
      },
      startToSwim: {
        title: "Start 2 Swim",
        description: "Groepslessen voor bedrijven 2024"
      },
      trainingCamps: {
        title: "Trainingskampen",
        description: `Op aanvraag - minimum ${ATHLETE_COUNTS.MIN_TRAINING_CAMP_SIZE} atleten`
      },
      rocDuMaroc: {
        title: "Roc Du Maroc",
        description: "Oktober 2022"
      },
    },
    // Dynamic text for projects with links
    linkTexts: {
      plansAvailableOn: "Zwem- en loopschema's beschikbaar op"
    },
    // Section headers
    featuredWork: "Uitgelicht werk",
    // Action buttons
    viewProject: "Bekijk project",
    learnMore: "Meer info",
    view: "Bekijk",
    // Categories
    categories: {
      eliteTraining: "Elite training",
      adventure: "Avontuur",
      trainingPlans: "Trainingschema's",
      community: "Gemeenschap",
      camps: "Kampen"
    }
  },
  
  // Footer section
  footer: {
    copyright: "© Ward Pellegrims. Alle rechten voorbehouden."
  },
  
  // Contact section
  contact: {
    title: "Contacteer mij",
    intro: "Contacteer me vrijblijvend en kijk wat ik voor jou kan betekenen",
    letsConnect: "Laten we verbinden",
    email: "E-mail",
    emailMessage: "Stuur me een bericht",
    professionalCoach: "Professionele coach",
    expertTitle: "Zwem- en triatlonexpert",
    responseTime: "Reactietijd",
    personalized: "Gepersonaliseerd",
    form: {
      name: "Naam",
      email: "E-mail",
      subject: "Onderwerp", 
      message: "Bericht",
      send: "Verstuur bericht",
      sending: "Versturen..."
    },
    success: "Bedankt voor uw bericht!",
    successMsg: "Ik neem zo spoedig mogelijk contact met u op.",
    sendAnother: "Verstuur nog een bericht",
    error: "Het is niet gelukt om uw bericht te versturen, gelieve opnieuw te proberen."
  }
} as const

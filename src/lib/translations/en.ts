import { ATHLETE_COUNTS } from '@/lib/constants'

export const en = {
  // Meta data
  meta: {
    title: "Ward Pellegrims Coaching",
    description: "Elite level coaching in swimming and triathlon. Swimming & Triathlon Coach providing online training programs, technique analysis, and coaching services.",
    keywords: "swimming coach, triathlon coach, swimming training, triathlon training, Belgium, Ward Pellegrims"
  },
  
  // Navigation
  nav: {
    about: "About",
    coaching: "Coaching", 
    projects: "Projects",
    contact: "Contact"
  },
  
  // Profile
  profile: "Swimming & Triathlon Coach",
  
  // About section
  about: {
    title: "Ward Pellegrims",
    subtitle: "Improve your swimming, cycling and running performance",
    intro1: "Do you want to create your own journey of success and do you want to profit from 12 years of coaching experience in Olympic swimming?",
    intro2: "Do you need a structured training plan and/or individual coaching based on the scientific knowledge I gathered during a Master in Sport Sciences and a Master in Rehabilitation Sciences?",
    intro3: "Do you want to explore your own limits and fulfill your ambitious physical goals?",
    intro4: "The silver medal at the Olympic Games in Rio 2016 was the highlight of my coaching career, but I want to help you reach your own highlights!",
    bannerAlt: "Swimming banner",
    exploreCoaching: "Explore My Coaching",
    getInTouch: "Get In Touch",
    myStory: "My Story",
    yearsExperience: "Years Experience",
    clientsCoached: "Clients Coached"
  },
  
  // Coaching section
  coaching: {
    title: "Coaching",
    intro: "I can help you with the following aspects in order to make you a better athlete",
    services: {
      swimmingTraining: "Personalized Online training programs",
      triathlonTraining: "Swim technique training",
      swimmingTechnique: "Swim initiation & masterclass",
      swimmingTechniqueClubs: "Start to swim",
      adults: "Improve your swim",
      trainingCamp: "Training camp guidance"
    },
    serviceDescriptions: {
      swimmingTraining: "Swimming • Triathlon • Cycling • Running",
      triathlonTraining: "Individual by appointment",
      swimmingTechnique: "For clubs and companies",
      swimmingTechniqueClubs: "Group training for adults",
      adults: "Group training for advanced swimmers",
      trainingCamp: "On request"
    },
    cta: {
      title: "Ready to Maximize Your Performance?",
      description: `Join more than ${ATHLETE_COUNTS.CLIENTS} athletes who have achieved their goals with personalized coaching programs.`,
      button: "Start Your Journey"
    },
    learnMore: "Learn More",
    highlights: {
      oneOnOne: "1-on-1",
      triathlon: "Triathlon",
      advanced: "Advanced",
      clubs: "Clubs",
      adults: "Adults",
      camps: "Camps"
    }
  },
  
  // Projects section
  projects: {
    items: {
      eliteSwimmers: {
        title: "Coaching Elite Swimmers",
        description: "Between 2009 and 2021."
      },
      rwanda: {
        title: "Rwanda Epic",
        description: "November 2023"
      },
      trainingPlans: {
        title: "Training Plans",
        description: "Swimming and running plans available on TrainingPeaks.com"
      },
      startToSwim: {
        title: "Start 2 Swim",
        description: "Company group sessions"
      },
      trainingCamps: {
        title: "Training camps",
        description: `On request - minimum ${ATHLETE_COUNTS.MIN_TRAINING_CAMP_SIZE} athletes`
      },
      rocDuMaroc: {
        title: "Roc Du Maroc",
        description: "October 2022"
      },
    },
    // Dynamic text for projects with links
    linkTexts: {
      plansAvailableOn: "Swimming and running plans available on"
    },
    // Section headers
    featuredWork: "Featured Work",
    // Action buttons
    viewProject: "View Project",
    learnMore: "Learn More",
    view: "View",
    // Categories
    categories: {
      eliteTraining: "Elite Training",
      adventure: "Adventure",
      trainingPlans: "Training Plans",
      community: "Community",
      camps: "Camps"
    }
  },
  
  // Footer section
  footer: {
    copyright: "© Ward Pellegrims. All rights reserved."
  },
  
  // Contact section
  contact: {
    title: "Contact Me",
    intro: "Feel free to contact me and see what I can do for you",
    letsConnect: "Let's Connect",
    email: "Email",
    emailMessage: "Send me a message",
    professionalCoach: "Professional Coach",
    expertTitle: "Swimming & Triathlon Expert",
    responseTime: "Response Time",
    personalized: "Personalized",
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject", 
      message: "Message",
      send: "Send Message",
      sending: "Sending..."
    },
    success: "Thank you for your message!",
    successMsg: "I'll get back to you as soon as possible.",
    sendAnother: "Send another message",
    error: "An error occurred while trying to send your message, please try again."
  }
} as const

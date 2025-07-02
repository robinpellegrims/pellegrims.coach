/**
 * Calculate years of experience from September 2009
 */
export function getYearsOfExperience(): number {
  const startDate = new Date(2009, 8, 1); // September 1, 2009 (month is 0-indexed)
  const currentDate = new Date();
  
  const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - startDate.getMonth();
  
  // If we haven't reached September yet this year, subtract 1
  if (monthsDiff < 0) {
    return yearsDiff - 1;
  }
  
  return yearsDiff;
}

/**
 * Get years of experience as a string for display
 */
export function getYearsOfExperienceString(): string {
  return `${getYearsOfExperience()}+`;
}

/**
 * Generate experience text for translations
 */
export function getExperienceText(locale: 'en' | 'nl'): string {
  const years = getYearsOfExperience();
  
  if (locale === 'nl') {
    return `Wil jij gebruik maken van mijn ${years} jaar ervaring in het begeleiden van Olympische topsporters en wil jij ook jouw eigen succesverhaal creëren?`;
  }
  
  return `Do you want to create your own journey of success and do you want to profit from ${years} years of coaching experience in Olympic swimming?`;
}

/**
 * Generate structured data description with dynamic experience
 */
export function getStructuredDataDescription(locale: 'en' | 'nl'): string {
  const years = getYearsOfExperience();
  
  if (locale === 'nl') {
    return `Professionele zwem- en triathloncoach met ${years} jaar ervaring in het coachen van elite atleten.`;
  }
  
  return `Professional swimming and triathlon coach with ${years} years of experience coaching elite athletes.`;
}
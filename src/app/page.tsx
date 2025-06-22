import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function RootPage() {
  // Get the accept-language header to determine user's preferred language
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  
  // Check if user prefers Dutch
  const prefersDutch = acceptLanguage.toLowerCase().includes('nl')
  
  // Redirect to appropriate locale
  if (prefersDutch) {
    redirect('/nl')
  } else {
    redirect('/en')
  }
}

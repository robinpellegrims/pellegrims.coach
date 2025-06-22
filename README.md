# Ward Pellegrims Coaching Website

This is Ward Pellegrims' coaching website built with [Next.js](https://nextjs.org) and Tailwind CSS. The site has been modernized from static HTML to a modern React application.

## Features

- **Modern React/Next.js Architecture**: Component-based structure with TypeScript
- **Tailwind CSS Styling**: Utility-first CSS framework for consistent styling
- **Responsive Design**: Mobile-first approach with responsive navigation
- **Internationalization**: Support for English and Dutch languages
- **Contact Form**: EmailJS integration for contact form submissions
- **Modern Deployment**: Optimized for modern hosting platforms

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/[locale]/page.tsx`. The page auto-updates as you edit the file.

## Environment Variables

The application supports optional environment variables for enhanced functionality:

### Contact Form (EmailJS)
To enable the contact form, set these variables:

```bash
NEXT_PUBLIC_EMAILJS_USER_ID=your_emailjs_user_id
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

### reCAPTCHA (Optional)
To enable reCAPTCHA spam protection on the contact form:

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### Setup
1. Create a `.env.local` file in the root directory
2. Add your environment variables
3. Restart the development server

**Note:** The application will work without these variables, but the contact form will be disabled.

## Development Commands

```bash
# Development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# E2E Testing (builds first, then runs tests)
npm run test:e2e

# E2E Testing with browser UI
npm run test:e2e:headed

# E2E Testing with Playwright UI
npm run test:e2e:ui
```

## Deployment

### Vercel (Recommended)
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add the same variables from your `.env.local` file:
     - `NEXT_PUBLIC_EMAILJS_USER_ID`
     - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
     - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
     - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (optional)
3. Vercel will automatically build and deploy

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms
This Next.js application can be deployed to any modern hosting platform that supports Node.js applications.

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── [locale]/       # Internationalized routes
│   │   ├── layout.tsx  # Locale-specific layout
│   │   └── page.tsx    # Locale-specific pages
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Root page (redirects to locale)
├── components/         # React components
│   ├── Header.tsx      # Navigation header
│   ├── About.tsx       # About section
│   ├── Coaching.tsx    # Coaching services
│   ├── Projects.tsx    # Projects showcase
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
├── context/           # React contexts
│   └── TranslationContext.tsx  # i18n context
├── lib/               # Utilities and configurations
│   ├── i18n.ts        # Internationalization utilities
│   └── translations/  # Translation files
│       ├── en.ts      # English translations
│       ├── nl.ts      # Dutch translations
│       └── index.ts   # Translation helpers
└── globals.css        # Global styles
```

## Key Technologies

- **Next.js 15**: React framework with App Router and Turbopack
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **EmailJS**: Client-side email service for contact forms
- **React Icons**: Comprehensive icon library
- **Playwright**: End-to-end testing framework
- **Custom i18n**: Internationalization with English/Dutch support

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

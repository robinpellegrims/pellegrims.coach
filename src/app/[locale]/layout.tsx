import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations, generateStaticParams } from "@/lib/translations";
import { isValidLocale } from "@/lib/i18n";

export { generateStaticParams };

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : 'en';
  const t = getTranslations(locale);
  
  const siteUrl = 'https://www.pellegrims.coach';
  
  // Construct canonical URL based on locale - this ensures the canonical URL 
  // points to the equivalent page content for the current locale
  const canonicalUrl = locale === 'en' ? `${siteUrl}/en` : `${siteUrl}/nl`;
  
  const pageUrl = locale === 'en' ? siteUrl : `${siteUrl}/nl`;
  const ogImageUrl = `${siteUrl}/images/banner_1920.jpg`;
  
  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: "Ward Pellegrims" }],
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
      ],
      apple: { url: "/apple-touch-icon.png", sizes: "180x180" }
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: pageUrl,
      siteName: 'Ward Pellegrims Coaching',
      locale: locale === 'en' ? 'en_US' : 'nl_BE',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1920,
          height: 1080,
          alt: locale === 'en' ? 'Ward Pellegrims Swimming & Triathlon Coach' : 'Ward Pellegrims Zwem- en Triathloncoach',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': siteUrl,
        'nl-BE': `${siteUrl}/nl`,
      },
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({ children }: Props) {
  // Only load reCAPTCHA script if the site key is configured
  const isRecaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <>
      {children}
      {isRecaptchaEnabled && (
        <Script 
          src="https://www.google.com/recaptcha/api.js"
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
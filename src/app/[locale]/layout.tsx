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
      url: locale === 'en' ? 'https://wardpellegrims.be' : 'https://wardpellegrims.be/nl',
      siteName: 'Ward Pellegrims Coaching',
      locale: locale === 'en' ? 'en_US' : 'nl_BE',
      type: 'website',
    },
    alternates: {
      canonical: locale === 'en' ? 'https://wardpellegrims.be' : 'https://wardpellegrims.be/nl',
      languages: {
        'en-US': 'https://wardpellegrims.be',
        'nl-BE': 'https://wardpellegrims.be/nl',
      },
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({ children }: Props) {
  return (
    <>
      {children}
      <Script 
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
      />
    </>
  );
}
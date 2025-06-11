import type { Metadata } from "next";
import Script from "next/script";
import { TranslationProvider } from "@/context/TranslationContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ward Pellegrims Coaching",
  description: "Elite level coaching in swimming and triathlon. Swimming & Triathlon Coach providing online training programs, technique analysis, and coaching services.",
  keywords: "swimming coach, triathlon coach, swimming training, triathlon training, Belgium, Ward Pellegrims",
  authors: [{ name: "Ward Pellegrims" }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" }
  },
  manifest: "/site.webmanifest"
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TranslationProvider>
          {children}
        </TranslationProvider>
        <Script 
          src="https://www.google.com/recaptcha/api.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

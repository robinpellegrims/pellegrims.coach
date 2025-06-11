import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Ward Pellegrims Coaching",
  description: "Elite level coaching in swimming and triathlon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Hreflang tags for SEO */}
        <link rel="alternate" hrefLang="en" href="https://wardpellegrims.be" />
        <link rel="alternate" hrefLang="nl" href="https://wardpellegrims.be/nl" />
        <link rel="alternate" hrefLang="x-default" href="https://wardpellegrims.be" />
        
        {/* Automatic language detection and redirect */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Only run on the root path
              if (window.location.pathname !== '/') return;
              
              // Check if user has manually chosen a language before
              const manualLanguageChoice = sessionStorage.getItem('manualLanguageChoice');
              if (manualLanguageChoice) return;
              
              // Get user's browser language
              const userLang = navigator.language || navigator.languages?.[0] || '';
              
              // Check if it's a Dutch language variant
              const isDutch = userLang.toLowerCase().startsWith('nl');
              
              if (isDutch) {
                // Redirect to Dutch version
                window.location.href = '/nl/';
              }
            })();
          `
        }} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
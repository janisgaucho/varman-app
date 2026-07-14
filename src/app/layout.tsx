import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Structur",
    default: "Structur - Gestion de chantiers",
  },
  description: "L'application métier dédiée à l'automatisation et la gestion des devis pour les professionnels du bâtiment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} antialiased bg-slate-50 text-gray-900 min-h-full flex flex-col`}
        suppressHydrationWarning
      >
        {children}
        <div id="google_translate_element" style={{ display: 'none' }} />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <script dangerouslySetInnerHTML={{ __html: `
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'fr',
              autoDisplay: false,
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
          }
        `}} />
      </body>
    </html>
  );
}

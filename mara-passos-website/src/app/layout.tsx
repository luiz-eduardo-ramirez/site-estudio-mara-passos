import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'; 
import CookieConsent from "../components/layout/CookieConsent";
import MetaPixel from '../components/MetaPixel';
// @ts-ignore: CSS imports may not have type declarations in this setup
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://estudiomusicalmarapassos.com.br"), // Define a base oficial para o Next.js
  title: "Estúdio Musical Mara Passos",
  description: "Escola de música com metodologia lúdica, curativa e acolhedora. Cursos de piano, violão, canto, musicalização e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicSchool",
              "name": "Estúdio Musical Mara Passos",
              "image": "https://estudiomusicalmarapassos.com.br/logo.webp",
              "@id": "https://estudiomusicalmarapassos.com.br", // Removido o www
              "url": "https://estudiomusicalmarapassos.com.br", // Removido o www
              "telephone": "+55-11-972405722",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Cuevas, 206 - Lapa, São Paulo - SP",
                "addressLocality": "São Paulo",
                "addressRegion": "SP",
                "postalCode": "05076050",
                "addressCountry": "BR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -23.4994,
                "longitude": -46.7153
              },
              "priceRange": "$$"
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MetaPixel /> 
        <a href="#inicio" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-[#f26522] focus:text-white focus:top-0 focus:left-0 font-bold">
          Pular para o conteúdo principal
        </a>
        {children}
        <CookieConsent />
        <GoogleAnalytics gaId="G-YTK6JLQJBG" />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'; 
import CookieConsent from "../components/layout/CookieConsent";
import MetaPixel from '../components/MetaPixel'; /// 1. Importação do seu componente
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Adicione o componente aqui */}
        <MetaPixel /> 
        
        {children}
        <CookieConsent />
      </body>
      <GoogleAnalytics gaId="G-YTK6JLQJBG" />
    </html>
  );
}
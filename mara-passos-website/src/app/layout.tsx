import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'; // <-- 1. Importação adicionada
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
    // suppressHydrationWarning adicionado aqui e idioma alterado para pt-BR
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      {/* 2. Componente do GA4 adicionado aqui. Substitua pelo seu ID real */}
      <GoogleAnalytics gaId="G-YTK6JLQJBG" />
    </html>
  );
}
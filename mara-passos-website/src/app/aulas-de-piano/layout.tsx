import type { Metadata } from "next";
import { PAGE_PATH } from "./data";

const titulo = "Aulas de Piano na Lapa (SP) | Estúdio Mara Passos";
const descricao =
  "Aulas de piano na Lapa, São Paulo: individuais, para todas as idades, do erudito ao popular. Agende sua aula experimental gratuita no Estúdio Mara Passos.";

export const metadata: Metadata = {
  title: titulo,
  description: descricao,
  keywords: [
    "aulas de piano na Lapa",
    "aula de piano São Paulo",
    "escola de piano Lapa",
    "professor de piano zona oeste",
    "aula de piano para adultos",
    "aula de piano infantil",
    "aula experimental de piano",
  ],
  alternates: { canonical: PAGE_PATH },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Estúdio Musical Mara Passos",
    url: PAGE_PATH,
    title: titulo,
    description: descricao,
    images: [
      {
        url: "/og/aulas-de-piano.jpg",
        width: 1200,
        height: 630,
        alt: "Sala de piano do Estúdio Mara Passos, na Lapa, em São Paulo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descricao,
    images: ["/og/aulas-de-piano.jpg"],
  },
};

export default function PianoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

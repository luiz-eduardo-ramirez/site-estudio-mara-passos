import type { Metadata } from "next";
import { NOME_ESTUDIO } from "../../data/studio";
import type { CourseConfig } from "./types";

/** Metadata (título, canonical, Open Graph, Twitter) de uma página de curso. */
export function buildCourseMetadata(c: CourseConfig): Metadata {
  const path = `/${c.slug}`;
  const { titulo, descricao, keywords, ogImagem, ogAlt } = c.seo;

  return {
    title: titulo,
    description: descricao,
    keywords,
    alternates: { canonical: path },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: NOME_ESTUDIO,
      url: path,
      title: titulo,
      description: descricao,
      images: [{ url: ogImagem, width: 1200, height: 630, alt: ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descricao,
      images: [ogImagem],
    },
  };
}

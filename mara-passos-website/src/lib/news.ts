import { newsData, type NewsItem } from '../app/data/news';

const PALAVRAS_POR_MINUTO = 200;

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsData.find((item) => item.slug === slug);
}

/** Outras notícias, começando pela seguinte na lista para não repetir sempre a mesma ordem. */
export function getRelatedNews(slug: string, limit = 2): NewsItem[] {
  const index = newsData.findIndex((item) => item.slug === slug);
  if (index === -1) {
    return newsData.slice(0, limit);
  }

  const ordenadas = [...newsData.slice(index + 1), ...newsData.slice(0, index)];
  return ordenadas.slice(0, limit);
}

export function getParagraphs(news: NewsItem): string[] {
  return (news.fullText || news.description)
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function getReadingTime(news: NewsItem): number {
  const palavras = (news.fullText || news.description).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / PALAVRAS_POR_MINUTO));
}

/** Formata uma data ISO (AAAA-MM-DD) em pt-BR. Retorna null quando a notícia ainda não tem data. */
export function formatNewsDate(iso?: string): string | null {
  if (!iso) {
    return null;
  }

  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(data);
}

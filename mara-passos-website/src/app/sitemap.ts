import { MetadataRoute } from 'next';
import { newsData } from './data/news';
import { piano } from './aulas-de-piano/data';
import { bateria } from './aulas-de-bateria/data';
import { violino } from './aulas-de-violino/data';

const baseUrl = 'https://estudiomusicalmarapassos.com.br';

/*
 * Cada página com a data da última mudança real de conteúdo, e não
 * `new Date()`: o Google descarta o <lastmod> de sitemaps que mudam a cada
 * build, então a data só serve de sinal se for honesta. Ao editar uma página,
 * atualize a data dela aqui.
 *
 * Os slugs dos cursos vêm dos próprios arquivos de dados das páginas — assim o
 * sitemap não diverge da rota. Curso novo: importe o config e acrescente uma
 * linha em `cursos`.
 */
const cursos = [
  { curso: piano, atualizadoEm: '2026-10-20' },
  { curso: bateria, atualizadoEm: '2026-10-20' },
  { curso: violino, atualizadoEm: '2026-10-20' },
];

const paginas = [
  { rota: '', atualizadoEm: '2026-10-20', changeFrequency: 'weekly' as const, priority: 1.0 },
  { rota: '/cursos', atualizadoEm: '2026-10-20', changeFrequency: 'monthly' as const, priority: 0.8 },
  { rota: '/professores', atualizadoEm: '2026-10-20', changeFrequency: 'monthly' as const, priority: 0.8 },
  { rota: '/sobre-nos', atualizadoEm: '2026-10-20', changeFrequency: 'monthly' as const, priority: 0.8 },
  { rota: '/privacidade', atualizadoEm: '2026-10-07', changeFrequency: 'yearly' as const, priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paginasUrls = paginas.map(({ rota, atualizadoEm, changeFrequency, priority }) => ({
    url: `${baseUrl}${rota}`,
    lastModified: new Date(atualizadoEm),
    changeFrequency,
    priority,
  }));

  const cursosUrls = cursos.map(({ curso, atualizadoEm }) => ({
    url: `${baseUrl}/${curso.slug}`,
    lastModified: new Date(atualizadoEm),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // A data de publicação da notícia é a data honesta; sem ela, o <lastmod> sai.
  const noticiasUrls = newsData.map((news) => ({
    url: `${baseUrl}/noticias/${news.slug}`,
    ...(news.date ? { lastModified: new Date(news.date) } : {}),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...paginasUrls, ...cursosUrls, ...noticiasUrls];
}

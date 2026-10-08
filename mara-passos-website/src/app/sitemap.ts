import { MetadataRoute } from 'next';
import { newsData } from './data/news';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://estudiomusicalmarapassos.com.br';

  /*
   * Páginas de curso, cada uma com a data da última mudança real de conteúdo,
   * e não `new Date()`: o Google descarta o <lastmod> de sitemaps que mudam a
   * cada build, então a data só serve de sinal se for honesta. Ao editar uma
   * página de curso, atualize a data dela aqui.
   */
  const cursos = [
    { slug: 'aulas-de-piano', atualizadoEm: '2026-10-08' },
    { slug: 'aulas-de-bateria', atualizadoEm: '2026-10-08' },
  ];

  const cursosUrls = cursos.map(({ slug, atualizadoEm }) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(atualizadoEm),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const novasRotas = ['/cursos', '/professores', '/sobre-nos'];
  const novasRotasUrls = novasRotas.map((rota) => ({
    url: `${baseUrl}${rota}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const noticiasUrls = newsData.map((news) => ({
    url: `${baseUrl}/noticias/${news.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...cursosUrls,
    ...novasRotasUrls,
    ...noticiasUrls,
  ];
}

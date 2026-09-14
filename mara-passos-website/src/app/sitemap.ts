import { MetadataRoute } from 'next';
import { newsData } from './data/news';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://estudiomusicalmarapassos.com.br';
  const cursos = ['aulas-de-piano'];

  const cursosUrls = cursos.map((curso) => ({
    url: `${baseUrl}/${curso}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
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

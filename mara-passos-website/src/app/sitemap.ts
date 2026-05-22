import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://estudiomusicalmarapassos.com.br';
  const cursos = ['aulas-de-piano'];

  const cursosUrls = cursos.map((curso) => ({
    url: `${baseUrl}/${curso}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...cursosUrls,
  ];
}

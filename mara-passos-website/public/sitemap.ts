import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://estudiomusicalmarapassos.com.br';

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date('2026-04-07'),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/aulas-de-piano`,
      lastModified: new Date('2026-04-07'),
      priority: 0.8,
    },
  ];
}
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 1. Regra existente: Força o domínio sem 'www'
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.estudiomusicalmarapassos.com.br',
          },
        ],
        destination: 'https://estudiomusicalmarapassos.com.br/:path*',
        permanent: true, 
      },
      // 2. /index.html respondia 200 como cópia da home
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      // 3. Nova regra: Redireciona a página morta para a Home e resolve o erro 5xx
      {
        source: '/politica-de-privacidade',
        destination: '/',
        permanent: true,
      },
      // 4. Não existe listagem de notícias; elas ficam na seção da home
      {
        source: '/noticias',
        destination: '/#noticias',
        permanent: true,
      },
      // 5. URLs removidas do site que ainda aparecem como 404 no Search Console
      {
        source: '/campanha-instagram',
        destination: '/cursos',
        permanent: true,
      },
      {
        source: '/ebook-estudio-mara-passos.pdf',
        destination: '/',
        permanent: true,
      },
      {
        source: '/links/r/:slug',
        destination: '/links',
        permanent: true,
      },
      // 6. Notícias encerradas: quem chega por link antigo cai na seção de novidades
      {
        source: '/noticias/:slug(dia-das-criancas-no-estudio|semana-da-fantasia-no-estudio)',
        destination: '/#noticias',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());

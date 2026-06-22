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
      // 2. Nova regra: Redireciona a página morta para a Home e resolve o erro 5xx
      {
        source: '/politica-de-privacidade',
        destination: '/',
        permanent: true, 
      },
    ];
  },
};

export default nextConfig;
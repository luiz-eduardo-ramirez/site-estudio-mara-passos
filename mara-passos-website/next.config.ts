import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.estudiomusicalmarapassos.com.br',
          },
        ],
        destination: 'https://estudiomusicalmarapassos.com.br/:path*',
        permanent: true, // Isso diz ao Google: "A mudança é definitiva (Status 301)"
      },
    ];
  },
};

export default nextConfig;
// src/data/news.ts

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  fullText?: string;
  link?: string;
  /** Data de publicação em ISO (AAAA-MM-DD). Sem ela, a linha de data simplesmente não aparece. */
  date?: string;
  /** Rótulo editorial exibido acima do título. Padrão: "Novidades". */
  category?: string;
  /** Frase de destaque inserida no meio do texto. */
  quote?: string;
  /** Legenda exibida abaixo da imagem principal. */
  caption?: string;
}

export const newsData: NewsItem[] = [
  {
    id: 4,
    slug: "dia-das-criancas-no-estudio",
    title: "Dia das Crianças no Estúdio!",
    description: "Para comemorar o Dia das Crianças, preparamos uma semana especial: traga um amigo para assistir a sua aula e receba um brinde exclusivo. 🎵🎉",
    image: "/images/noticia-4.webp",
    fullText: "O Dia das Crianças está chegando e o Estúdio Mara Passos preparou uma semana cheia de carinho para comemorar! Na semana da data, convide um amiguinho para assistir a sua aula de música e, juntos, vocês ganham um brinde especial só para essa ocasião.\n\nÉ a oportunidade perfeita para compartilhar a paixão pela música com quem você gosta. Fique de olho nas nossas redes e garanta a sua vaga!"
  },
  {
    id: 2,
    slug: "novo-portal-do-aluno",
    title: "Nova plataforma digital facilita gestão de aulas e pagamentos",
    description: "Uma nova plataforma está modernizando a experiência de alunos e responsáveis com agenda online, reagendamento de aulas, pagamentos via Pix e acompanhamento de frequência em tempo real. Com visual moderno e interface intuitiva, o sistema traz mais praticidade, organização e transparência para escolas e estúdios.",
    image: "/images/portal.webp",
    link: "https://www.instagram.com/p/DYxjxrikW3-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    fullText: "Estamos muito felizes em anunciar a implementação da nossa nova plataforma digital! Agora, todos os alunos e responsáveis podem acessar um portal exclusivo onde é possível verificar a agenda de aulas, solicitar reagendamentos de forma rápida, visualizar histórico financeiro, gerar cobranças Pix, e acompanhar a evolução das notas e frequência.\n\nEsse sistema moderno e intuitivo foi pensado para dar muito mais autonomia e transparência no dia a dia do estúdio. Fale com a secretaria para ativar o seu acesso e aproveite todas essas facilidades!"
  },
  {
    id: 3,
    slug: "semana-da-fantasia-no-estudio",
    title: "Semana da Fantasia no Estúdio!",
    description: "Na última semana, celebramos o início das férias com muita música e criatividade na nossa Semana da Fantasia! Nossos pequenos brilharam com seus looks incríveis. 🎶",
    image: "/images/noticia-3.webp",
    link: "https://www.instagram.com/p/DadNgLEkTo1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    fullText: "Na última semana, tivemos a Semana da Fantasia para comemorar o tão aguardado início das férias! 🎶\n\nNossos pequenos alunos abrilhantaram a escola com muita criatividade, trazendo seus looks e personagens favoritos para as aulas.\n\nNas fotos, temos a Antonella, Paola e Amora dando um show como Guerreiras do K-Pop, além do Leonardo e Ziggy arrasando de Piratas! 🥰\n\nFoi um momento mágico e muito divertido. Obrigado a todos que participaram e trouxeram ainda mais vida para o nosso estúdio! 🎶"
  }
];

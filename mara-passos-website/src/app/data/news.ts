// src/data/news.ts

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  /**
   * Imagem em /public. Tamanho ideal: 1600×1000 px (16:10), WebP qualidade ~80, até 300 KB.
   * - Home: o card mostra a arte inteira (sem corte) num painel ~16:10 no desktop e 4:3 no celular;
   *   1600 px de largura cobre telas retina.
   * - Compartilhamento (Open Graph, 1.91:1): as redes cortam ~8% em cima e embaixo, então
   *   mantenha textos e rostos longe dessas bordas.
   * - Evite artes verticais: na página da matéria a imagem fica muito alta e, na home, sobram faixas.
   */
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
    id: 5,
    slug: "halloween-no-estudio",
    title: "Semana de Halloween no Estúdio!",
    description: "O Halloween chegou ao Estúdio Mara Passos! Nesta semana, as aulas entram no clima de mistério e diversão — venham fantasiados! 🎃",
    image: "/images/halloween-2026.webp",
    date: "2026-10-29",
    category: "Eventos",
    fullText: "O Halloween chegou ao Estúdio Mara Passos! Nesta semana, as nossas aulas entram no clima da data mais misteriosa do ano, com abóboras, morcegos e, claro, muita música.\n\nÉ uma oportunidade divertida de mostrar que a música também conta histórias e cria atmosferas: do suspense ao mistério, cada som ajuda a dar vida a um personagem.\n\nVenham fantasiados para a aula e entrem na brincadeira! Compartilhe as fotos com a gente nas redes sociais e marque o estúdio. 🎃🎶"
  },
  {
    id: 6,
    slug: "apresentacao-de-piano",
    title: "Apresentação de Piano e Flauta Transversal: 14 de novembro",
    description: "No dia 14/11, às 10h, os alunos de piano e flauta transversal sobem ao palco na Biblioteca Mário Schenberg. Em 05/12 é a vez de bateria, cordas e canto. Entrada franca!",
    image: "/images/apresentacoes-musicais-2026.webp",
    date: "2026-10-29",
    category: "Apresentações",
    quote: "Subir ao palco é celebrar cada conquista construída em sala de aula.",
    caption: "Cronograma das apresentações musicais do Estúdio Mara Passos.",
    fullText: "Os alunos de piano e flauta transversal do Estúdio Mara Passos estão se preparando para um momento muito especial: no dia 14 de novembro de 2026, às 10h, eles sobem ao palco para mostrar ao público o repertório trabalhado ao longo do semestre.\n\nEssa é a segunda data da nossa temporada de apresentações musicais, que abriu em 3 de outubro com a turma de Musicalização. Confira o cronograma completo:\n\n• 03/10/2026, às 10h — Musicalização (realizada)\n• 14/11/2026, às 10h — Piano e Flauta Transversal\n• 05/12/2026, às 10h — Bateria, Cordas e Canto\n\nTodas as apresentações acontecem na Biblioteca Mário Schenberg (Rua Catão, 611), com entrada franca. Traga seus amigos e familiares para prestigiar e aplaudir os nossos músicos!\n\nTocar para uma plateia é uma etapa importante do aprendizado musical. Além de celebrar a evolução de cada aluno, a apresentação ajuda a desenvolver confiança, concentração e a alegria de compartilhar a música com quem a gente gosta. Aguardamos vocês!"
  },
  {
    id: 2,
    slug: "novo-portal-do-aluno",
    title: "Nova plataforma digital facilita gestão de aulas e pagamentos",
    description: "Uma nova plataforma está modernizando a experiência de alunos e responsáveis com agenda online, reagendamento de aulas, pagamentos via Pix e acompanhamento de frequência em tempo real. Com visual moderno e interface intuitiva, o sistema traz mais praticidade, organização e transparência para escolas e estúdios.",
    image: "/images/portal.webp",
    link: "https://www.instagram.com/p/DYxjxrikW3-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    fullText: "Estamos muito felizes em anunciar a implementação da nossa nova plataforma digital! Agora, todos os alunos e responsáveis podem acessar um portal exclusivo onde é possível verificar a agenda de aulas, solicitar reagendamentos de forma rápida, visualizar histórico financeiro, gerar cobranças Pix, e acompanhar a evolução das notas e frequência.\n\nEsse sistema moderno e intuitivo foi pensado para dar muito mais autonomia e transparência no dia a dia do estúdio. Fale com a secretaria para ativar o seu acesso e aproveite todas essas facilidades!"
  }
];

import { Brain, CircleCheck, GraduationCap, MapPin, Music, UserRound } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-piano. A estrutura vive em CoursePage; aqui só o
 * que é do piano. Perguntas, professoras e endereço alimentam tanto o que o
 * visitante lê quanto o JSON-LD — com uma fonte só, os dois não divergem.
 */
export const piano: CourseConfig = {
  slug: "aulas-de-piano",
  instrumento: "Piano",
  nomeCurso: "Aulas de Piano",
  breadcrumb: "Aulas de piano",

  seo: {
    titulo: "Aulas de Piano na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de piano na Lapa, São Paulo: individuais, para todas as idades, do erudito ao popular. Agende sua aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de piano na Lapa",
      "aula de piano São Paulo",
      "escola de piano Lapa",
      "professor de piano zona oeste",
      "aula de piano para adultos",
      "aula de piano infantil",
      "aula experimental de piano",
    ],
    ogImagem: "/og/aulas-de-piano.jpg",
    ogAlt: "Sala de piano do Estúdio Mara Passos, na Lapa, em São Paulo",
  },

  schema: {
    descricao:
      "Aulas individuais de piano, do erudito ao popular, para iniciantes e alunos avançados, de crianças a adultos, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Iniciante ao avançado",
    prerequisitos: "Nenhum. Não é preciso ter tocado antes.",
  },

  hero: {
    h1: "Aulas de Piano na",
    texto:
      "Aprenda piano com uma metodologia que respeita seu tempo. Do iniciante ao avançado, no Estúdio Mara Passos você encontra o ambiente ideal para evoluir.",
    imagem: "/hero-bg.webp",
    video: "/hero-bg.mp4",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: Music, texto: "Do erudito ao popular" },
      { icone: GraduationCap, texto: "Do iniciante ao avançado" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender piano no Estúdio Mara Passos",
    midia: {
      tipo: "youtube",
      id: "pv1RpR_RdbI",
      titulo: "Aulas de piano no Estúdio Mara Passos",
    },
    itens: [
      {
        titulo: "Instrutores qualificados",
        texto:
          "Professores graduados e com vasta experiência no ensino de piano popular e erudito.",
      },
      {
        titulo: "Currículo estruturado",
        texto:
          "Organização clara para você perceber sua evolução a cada aula, sem pular etapas essenciais.",
      },
      {
        titulo: "Aulas individuais",
        texto:
          "Foco total na sua técnica, postura e repertório preferido. O professor se adapta ao seu ritmo.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de piano",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece o professor, visita as salas e toca no piano pela primeira vez.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professores de piano",
    intro:
      "Aulas conduzidas por Mara e Amanda, com formação em piano e o cuidado de quem ensina com acolhimento.",
    professores: [
      { id: 1, papel: "Diretora e fundadora" },
      { id: 2, papel: "Professora e sócia" },
    ],
  },

  filosofia: {
    titulo: "Piano para todas as idades",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". Mais do que tocar um instrumento, aprender piano estimula conexões neurais profundas, melhora a concentração e contribui para o desenvolvimento cerebral.",
    beneficios: [
      { icone: Brain, texto: "Estimula o foco" },
      { icone: Music, texto: "Para todas as idades" },
      { icone: CircleCheck, texto: "Bem-estar mental" },
    ],
  },

  /*
   * Os pôsteres são quadros extraídos dos próprios arquivos (public/posters):
   * com preload="none" o navegador não baixa nenhum dos cinco MP4 — 29 MB no
   * total — até alguém apertar o play.
   */
  videos: {
    titulo: "A evolução dos nossos alunos",
    intro: "Veja na prática os resultados da nossa metodologia com alunos reais.",
    alt: "Vídeos de alunos tocando piano",
    itens: [
      { src: "/piano-1.mp4", poster: "/posters/piano-1.webp" },
      { src: "/piano-2.mp4", poster: "/posters/piano-2.webp" },
      { src: "/piano-3.mp4", poster: "/posters/piano-3.webp" },
      { src: "/piano-4.mp4", poster: "/posters/piano-4.webp" },
      { src: "/piano-5.mp4", poster: "/posters/piano-5.webp" },
    ],
  },

  /*
   * Galeria enxuta: só os ambientes que importam para quem procura aulas de
   * piano. Todas as fotos são 4:3 (5712×4284), então a grade usa essa
   * proporção fixa e nada se mexe quando as imagens chegam.
   */
  galeria: [
    {
      src: "/spaces/piano-1.webp",
      alt: "Piano vertical com banqueta em uma das salas de aula do Estúdio Mara Passos, na Lapa",
    },
    {
      src: "/spaces/piano-2.webp",
      alt: "Piano com partitura aberta no atril e metrônomo, pronto para a aula",
    },
    {
      src: "/spaces/piano.webp",
      alt: "Detalhe das teclas de um piano acústico da sala de aula",
    },
    {
      src: "/spaces/entrada.webp",
      alt: "Recepção do estúdio com balcão e um piano vertical ao lado da escada",
    },
    {
      src: "/spaces/fachada.webp",
      alt: "Fachada do Estúdio Mara Passos na Rua Cuevas, número 206, na Lapa",
    },
    {
      src: "/spaces/entrada-2.webp",
      alt: "Corredor interno do estúdio com cadeiras de espera e piano à esquerda",
    },
    {
      src: "/spaces/instrumentos.webp",
      alt: "Sala com bateria, teclado e violões e guitarras pendurados na parede",
    },
    {
      src: "/spaces/musicalizacao-1.webp",
      alt: "Sala de musicalização infantil com piso emborrachado colorido e instrumentos de percussão",
    },
    {
      src: "/spaces/certificados.webp",
      alt: "Parede com certificados e diplomas emoldurados da equipe do estúdio",
    },
  ],

  faqTitulo: "Perguntas frequentes sobre aulas de piano",
  faq: [
    {
      pergunta: "Preciso ter um piano em casa para começar?",
      resposta:
        "Não. No início você pode praticar com a estrutura do nosso estúdio ou começar com um teclado simples em casa. Quando decidir comprar o seu instrumento, nós orientamos a escolha.",
    },
    {
      pergunta: "Sou adulto e nunca toquei. Ainda dá tempo de aprender piano?",
      resposta:
        "Dá tempo, sim. Muitos alunos começam do zero na vida adulta. Nossa metodologia é prática e respeita o ritmo de cada pessoa, porque a música não tem idade.",
    },
    {
      pergunta: "A partir de que idade as crianças podem fazer aula de piano?",
      resposta:
        "A idade ideal para o piano é a partir de aproximadamente 5 anos. Para os menores, temos aulas de musicalização a partir de 6 meses de idade.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece o professor, visita as salas, faz seu primeiro contato prático com o piano e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de piano são em grupo ou individuais?",
      resposta:
        "São individuais. Assim o professor se concentra 100% na sua postura, na sua técnica e no repertório de que você mais gosta, seja clássico ou popular.",
    },
    {
      pergunta: "Vou aprender música erudita ou popular?",
      resposta:
        "Os dois caminhos são possíveis. Respeitamos o gosto musical de cada aluno e trabalhamos leitura à primeira vista, técnica e expressão emocional, do erudito ao popular.",
    },
    {
      pergunta: "Onde ficam as aulas de piano na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de piano na Lapa, em São Paulo",
    intro: "Venha conhecer as salas, o piano e os professores antes de decidir.",
  },
};

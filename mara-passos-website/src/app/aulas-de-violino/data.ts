import { Ear, HeartHandshake, MapPin, Music, Sparkles, UserRound } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-violino. A estrutura vive em CoursePage (a mesma
 * das páginas de piano e bateria); aqui só o que é do violino.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts e biografia do professor em
 * src/data/teachersList.ts — mais as regras da aula experimental do formulário.
 */
export const violino: CourseConfig = {
  slug: "aulas-de-violino",
  instrumento: "Violino",
  nomeCurso: "Aulas de Violino",
  breadcrumb: "Aulas de violino",

  seo: {
    titulo: "Aulas de Violino na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de violino na Lapa, São Paulo, com o professor Vitor: afinação, postura e manuseio do arco. Agende sua aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de violino na Lapa",
      "aula de violino São Paulo",
      "escola de violino Lapa",
      "professor de violino zona oeste",
      "aula de violino para adultos",
      "aula de violino infantil",
      "aula experimental de violino",
    ],
    ogImagem: "/og/aulas-de-violino.jpg",
    ogAlt: "Aluna tocando violino em uma sala de aula do Estúdio Mara Passos, na Lapa, em São Paulo",
  },

  schema: {
    descricao:
      "Aulas individuais de violino com metodologia paciente e atenciosa, trabalhando afinação, postura correta e manuseio do arco, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso ter tocado antes.",
  },

  hero: {
    h1: "Aulas de Violino na",
    texto:
      "A arte e a elegância das cordas friccionadas, com metodologia paciente e atenciosa. Aulas individuais com o professor Vitor, no Estúdio Mara Passos.",
    imagem: "/hero-bg.webp",
    video: "/hero-bg.mp4",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: Music, texto: "Afinação, postura e arco" },
      { icone: Sparkles, texto: "Diferentes gêneros musicais" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender violino no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/images/violino.webp",
      alt: "Aluna tocando violino, com partitura no estande, em uma sala de aula do estúdio",
      posicao: "center 62%",
    },
    itens: [
      {
        titulo: "Professor bacharel em violino",
        texto:
          "Vitor é formado em Bacharelado em Violino pela Faculdade Santa Marcelina e tem experiência no Projeto Guri.",
      },
      {
        titulo: "Afinação, postura e arco",
        texto:
          "Uma metodologia paciente e atenciosa para os desafios da afinação, da postura correta e do manuseio do arco.",
      },
      {
        titulo: "Para além da música clássica",
        texto:
          "Uma abordagem que valoriza autonomia, criatividade e escuta, explorando diferentes gêneros musicais.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de violino",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece o professor, visita as salas e faz seu primeiro contato prático com o violino.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professor de violino",
    intro:
      "Aulas conduzidas pelo professor Vitor, com abordagem humanizada e o cuidado de quem ensina com acolhimento.",
    professores: [{ id: 8, papel: "Professor de violino" }],
  },

  filosofia: {
    titulo: "Violino no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". No violino, uma metodologia paciente ajuda você a conquistar afinação, postura e a emoção das cordas friccionadas, sem a pressão de apresentações estressantes.",
    beneficios: [
      { icone: Ear, texto: "Desenvolvimento da escuta" },
      { icone: Sparkles, texto: "Criatividade" },
      { icone: HeartHandshake, texto: "Autonomia e acolhimento" },
    ],
  },

  /*
   * Galeria enxuta, no mesmo padrão das outras páginas de curso. Fotos 4:3
   * (5712×4284); a grade usa essa proporção fixa e nada se mexe ao carregar.
   */
  galeria: [
    {
      src: "/spaces/fachada.webp",
      alt: "Fachada do Estúdio Mara Passos na Rua Cuevas, número 206, na Lapa",
    },
    {
      src: "/spaces/entrada.webp",
      alt: "Recepção do estúdio com balcão e um piano vertical ao lado da escada",
    },
    {
      src: "/spaces/entrada-2.webp",
      alt: "Corredor interno do estúdio com cadeiras de espera",
    },
    {
      src: "/spaces/instrumentos.webp",
      alt: "Sala do estúdio com bateria, teclado e violões e guitarras pendurados na parede",
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

  faqTitulo: "Perguntas frequentes sobre aulas de violino",
  faq: [
    {
      pergunta: "Preciso ter um violino para começar?",
      resposta:
        "Você pode tirar essa dúvida na aula experimental: o professor orienta qual instrumento escolher e como começar, antes de você decidir comprar o seu.",
    },
    {
      pergunta: "Nunca toquei nada. Posso começar o violino do zero?",
      resposta:
        "Pode. A metodologia é paciente e atenciosa e parte do seu nível, trabalhando com calma a postura correta, o manuseio do arco e a afinação, sem pressão por desempenho.",
    },
    {
      pergunta: "Vou aprender só música clássica?",
      resposta:
        "Não. A abordagem do professor amplia o ensino do violino para além da música clássica, explorando diferentes gêneros e possibilidades musicais.",
    },
    {
      pergunta: "O que se aprende nas primeiras aulas?",
      resposta:
        "Os fundamentos do instrumento: a postura correta, o manuseio do arco e a afinação, que são os principais desafios de quem começa no violino.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece o professor, visita as salas, faz seu primeiro contato prático com o violino e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de violino são em grupo ou individuais?",
      resposta:
        "São individuais, com o professor concentrado na sua técnica, no seu ritmo e no repertório que você quer tocar.",
    },
    {
      pergunta: "Onde ficam as aulas de violino na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de violino na Lapa, em São Paulo",
    intro: "Venha conhecer as salas, o violino e o professor antes de decidir.",
  },
};

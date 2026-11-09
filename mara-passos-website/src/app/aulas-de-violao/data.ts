import { Ear, HeartHandshake, MapPin, Music, Sparkles, UserRound } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-violao. A estrutura vive em CoursePage (a mesma
 * das páginas de piano, bateria e violino); aqui só o que é do violão.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts, biografias dos professores em
 * src/data/teachersList.ts e a idade mínima em faqData.ts — mais as regras da
 * aula experimental do formulário.
 */
export const violao: CourseConfig = {
  slug: "aulas-de-violao",
  instrumento: "Violão",
  nomeCurso: "Aulas de Violão",
  breadcrumb: "Aulas de violão",

  seo: {
    titulo: "Aulas de Violão na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de violão na Lapa, São Paulo, com os professores Rodrigo e Rafael: acordes, dedilhados, batidas e harmonia prática. Agende sua aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de violão na Lapa",
      "aula de violão São Paulo",
      "escola de violão Lapa",
      "professor de violão zona oeste",
      "aula de violão para adultos",
      "aula de violão infantil",
      "aula experimental de violão",
    ],
    ogImagem: "/og/aulas-de-violao.jpg",
    ogAlt: "Aluno tocando violão em uma sala de aula do Estúdio Mara Passos, na Lapa, em São Paulo",
  },

  schema: {
    descricao:
      "Aulas individuais de violão adaptáveis ao estilo preferido do aluno, com foco em acordes, dedilhados, batidas e harmonia prática, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso ter tocado antes.",
  },

  hero: {
    h1: "Aulas de Violão na",
    texto:
      "Do primeiro acorde à fluência no braço do instrumento, no estilo que você mais gosta. Aulas individuais com os professores Rodrigo e Rafael, no Estúdio Mara Passos.",
    imagem: "/images/violao.webp",
    posicao: "75% 75%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: Music, texto: "Acordes, dedilhados e batidas" },
      { icone: Sparkles, texto: "Do erudito ao popular" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender violão no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/instrumentos.webp",
      alt: "Sala do estúdio com bateria, teclado e violões e guitarras pendurados na parede",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Professores com formação e experiência",
        texto:
          "Rodrigo é licenciado em Música e ensina desde 2007. Rafael é graduado em Licenciatura em Música pela UNESP e estudou Violão na EMESP.",
      },
      {
        titulo: "No estilo que você prefere",
        texto:
          "As aulas se adaptam ao seu gosto: Violão Erudito, Jazz, Música Brasileira e outros estilos, com foco em dedilhados, batidas e harmonia prática.",
      },
      {
        titulo: "Do primeiro acorde à fluência",
        texto:
          "Um caminho que parte do seu nível e evolui no seu ritmo, sem a pressão do desempenho perfeito.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de violão",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece o professor, visita as salas e faz seu primeiro contato prático com o violão.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professores de violão",
    intro:
      "Aulas conduzidas pelos professores Rodrigo e Rafael, com ampla vivência em diferentes estilos musicais.",
    professores: [{ id: 5 }, { id: 3 }],
  },

  filosofia: {
    titulo: "Violão no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". No violão, você aprende no seu ritmo, com repertório do seu gosto e sem a pressão de apresentações estressantes.",
    beneficios: [
      { icone: Ear, texto: "Desenvolvimento da escuta" },
      { icone: Sparkles, texto: "Repertório do seu gosto" },
      { icone: HeartHandshake, texto: "Acolhimento no seu ritmo" },
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

  faqTitulo: "Perguntas frequentes sobre aulas de violão",
  faq: [
    {
      pergunta: "Preciso ter um violão para começar?",
      resposta:
        "Você pode tirar essa dúvida na aula experimental: o professor orienta qual instrumento escolher e como começar, antes de você decidir comprar o seu.",
    },
    {
      pergunta: "Nunca toquei nada. Posso começar o violão do zero?",
      resposta:
        "Pode. As aulas partem do seu nível, do primeiro acorde em diante, sem pressão por desempenho.",
    },
    {
      pergunta: "Vou aprender só um estilo de música?",
      resposta:
        "Não. As aulas são adaptáveis ao seu estilo preferido, e os professores transitam por Violão Erudito, Jazz, Música Brasileira e outros estilos.",
    },
    {
      pergunta: "O que se aprende nas primeiras aulas?",
      resposta:
        "Os fundamentos do instrumento: acordes, dedilhados, batidas e harmonia prática, sempre no repertório e no estilo que você quer tocar.",
    },
    {
      pergunta: "A partir de que idade a criança pode fazer aula de violão?",
      resposta:
        "Aconselhamos iniciar a partir dos 7 anos. Para crianças menores, a Musicalização Infantil é um ótimo primeiro passo.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece o professor, visita as salas, faz seu primeiro contato prático com o violão e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de violão são em grupo ou individuais?",
      resposta:
        "São individuais, com o professor concentrado na sua técnica, no seu ritmo e no repertório que você quer tocar.",
    },
    {
      pergunta: "Onde ficam as aulas de violão na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de violão na Lapa, em São Paulo",
    intro: "Venha conhecer as salas, o violão e os professores antes de decidir.",
  },
};

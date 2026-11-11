import { Baby, Drum, Ear, HeartHandshake, MapPin, Puzzle, Smile } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-musicalizacao-infantil. A estrutura vive em
 * CoursePage (a mesma das demais páginas de curso); aqui só o que é da
 * musicalização infantil.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts, biografias das professoras Mara e Márcia em
 * src/data/teachersList.ts e as respostas sobre idade e benefícios em
 * src/components/sections/faqData.ts (musicalização a partir de 6 meses).
 *
 * Há aulas em turma e individuais (confirmado pelo estúdio); o formato de cada
 * criança é combinado na aula experimental.
 */
export const musicalizacaoInfantil: CourseConfig = {
  slug: "aulas-de-musicalizacao-infantil",
  instrumento: "Musicalização - Infantil",
  nomeCurso: "Musicalização Infantil",
  breadcrumb: "Musicalização infantil",

  seo: {
    titulo: "Musicalização Infantil na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Musicalização infantil na Lapa, SP, para bebês a partir de 6 meses: jogos, histórias e percussão. Agende aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "musicalização infantil na Lapa",
      "musicalização para bebês São Paulo",
      "aula de música para crianças Lapa",
      "musicalização infantil zona oeste",
      "escola de música infantil Lapa",
      "musicalização para bebês a partir de 6 meses",
      "aula experimental de musicalização infantil",
    ],
    ogImagem: "/og/aulas-de-musicalizacao-infantil.jpg",
    ogAlt: "Crianças brincando em uma sala de musicalização com piso emborrachado colorido e instrumentos de percussão",
  },

  schema: {
    descricao:
      "Musicalização infantil, a partir de 6 meses, com jogos, histórias e instrumentos de percussão para introduzir as crianças ao universo musical de forma lúdica, estimulando a cognição e a criatividade, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Iniciante",
    prerequisitos: "Nenhum. A partir de 6 meses de idade.",
  },

  hero: {
    h1: "Musicalização Infantil na",
    texto:
      "O despertar para o som. Com jogos, histórias e instrumentos de percussão, as crianças conhecem o universo musical de forma lúdica e amorosa, com as professoras Mara e Márcia, no Estúdio Mara Passos.",
    imagem: "/images/musicalizacao-infantil.webp",
    posicao: "50% 45%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: Baby, texto: "Bebês a partir de 6 meses" },
      { icone: Puzzle, texto: "Jogos e histórias" },
      { icone: Drum, texto: "Instrumentos de percussão" },
    ],
  },

  diferenciais: {
    titulo: "Por que escolher a musicalização infantil do Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/musicalizacao-1.webp",
      alt: "Sala de musicalização infantil com piso emborrachado colorido e instrumentos de percussão",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Professoras com formação em musicalização",
        texto:
          "Mara e Márcia têm cursos complementares em Musicalização Infantil, e Mara é pós-graduada em Musicoterapia pela Faculdade Paulista de Artes.",
      },
      {
        titulo: "Aprender de forma lúdica",
        texto:
          "Jogos, histórias e instrumentos de percussão introduzem as crianças ao universo musical de um jeito leve, amoroso e divertido.",
      },
      {
        titulo: "Cognição e criatividade",
        texto:
          "O primeiro contato com a música estimula a cognição e a criatividade, e ajuda na socialização e na concentração.",
      },
    ],
  },

  passosTitulo: "Como começar a musicalização infantil",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para a criança.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: a criança conhece a professora, vocês visitam as salas e ela faz seu primeiro contato prático com a música.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professoras de musicalização infantil",
    intro:
      "Aulas conduzidas pelas professoras Mara e Márcia, com cursos complementares em Musicalização Infantil.",
    professores: [{ id: 1 }, { id: 7 }],
  },

  filosofia: {
    titulo: "Música para todas as idades",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". Na musicalização infantil, a criança aprende brincando, no seu ritmo e sem a pressão de apresentações estressantes.",
    beneficios: [
      { icone: Ear, texto: "Desenvolvimento da escuta" },
      { icone: Smile, texto: "Aprender brincando" },
      { icone: HeartHandshake, texto: "Acolhimento no seu ritmo" },
    ],
  },

  /*
   * Galeria enxuta, no mesmo padrão das outras páginas de curso. Fotos 4:3
   * (5712×4284); a grade usa essa proporção fixa e nada se mexe ao carregar.
   */
  galeria: [
    {
      src: "/spaces/musicalizacao-1.webp",
      alt: "Sala de musicalização infantil com piso emborrachado colorido e instrumentos de percussão",
    },
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
      src: "/spaces/certificados.webp",
      alt: "Parede com certificados e diplomas emoldurados da equipe do estúdio",
    },
  ],

  faqTitulo: "Perguntas frequentes sobre musicalização infantil",
  faq: [
    {
      pergunta: "A partir de que idade a criança pode fazer musicalização?",
      resposta:
        "A musicalização é oferecida para bebês a partir de 6 meses. Na aula experimental, a professora conversa com a família sobre o melhor momento para começar.",
    },
    {
      pergunta: "O que é musicalização infantil?",
      resposta:
        "É o primeiro contato da criança com a música. Com jogos, histórias e instrumentos de percussão, ela conhece o universo musical de forma lúdica, estimulando a cognição e a criatividade.",
    },
    {
      pergunta: "Por que estudar música desde cedo?",
      resposta:
        "É comprovado pela ciência que o estudo da música desde a primeira infância contribui de forma muito significativa para o desenvolvimento cerebral. Além disso, auxilia na socialização, na sensibilização e na capacidade de concentração, benefícios que acompanham a criança por toda a vida.",
    },
    {
      pergunta: "Meu filho precisa saber tocar algum instrumento?",
      resposta:
        "Não. A musicalização é o ponto de partida: ninguém precisa chegar sabendo nada.",
    },
    {
      pergunta: "Como são as aulas?",
      resposta:
        "Com jogos, histórias e instrumentos de percussão, em um ambiente lúdico e acolhedor, sem a pressão de apresentações estressantes.",
    },
    {
      pergunta: "As aulas de musicalização são em turma ou individuais?",
      resposta:
        "Existem as duas opções: aulas em turma e aulas individuais. Na aula experimental, o formato é combinado de acordo com a idade e as necessidades da criança.",
    },
    {
      pergunta: "Como sei qual instrumento meu filho deve escolher depois?",
      resposta:
        "A musicalização ajuda a criança a conhecer os sons e a descobrir do que gosta. A equipe de professores pode ajudar a família a conhecer os instrumentos e a tomar a decisão mais acertada.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que a criança conhece a professora, vocês visitam as salas e ela faz seu primeiro contato prático com a música. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para a criança, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "Onde fica a musicalização infantil na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Musicalização infantil na Lapa, em São Paulo",
    intro: "Venha conhecer as salas e as professoras antes de decidir.",
  },
};

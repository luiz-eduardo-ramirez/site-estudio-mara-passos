import { Ear, HeartHandshake, MapPin, Music, Sparkles, UserRound } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-musicalizacao-para-adultos. A estrutura vive em
 * CoursePage (a mesma das demais páginas de curso); aqui só o que é da
 * musicalização para adultos.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts e biografias das professoras Mara e Márcia em
 * src/data/teachersList.ts — mais as regras da aula experimental do
 * formulário. As bios citam o curso complementar em Musicalização Infantil, não
 * em adultos, então o texto não afirma formação específica para adultos.
 *
 * O site não diz se as aulas são individuais ou em turma, então esta página não
 * afirma nenhum dos dois: o FAQ remete o formato à aula experimental.
 * CONFIRMAR COM A MARA antes de publicar.
 */
export const musicalizacaoAdultos: CourseConfig = {
  slug: "aulas-de-musicalizacao-para-adultos",
  instrumento: "Musicalização - Adultos",
  nomeCurso: "Musicalização para Adultos",
  breadcrumb: "Musicalização para adultos",

  seo: {
    // Sem "(SP)": com ele o título passaria de 60 caracteres.
    titulo: "Musicalização para Adultos na Lapa | Estúdio Mara Passos",
    descricao:
      "Musicalização para adultos na Lapa, SP: percepção rítmica e melódica, sem pressão. Agende aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "musicalização para adultos na Lapa",
      "musicalização para adultos São Paulo",
      "aula de música para adultos iniciantes",
      "curso de música para adultos Lapa",
      "aprender música depois dos 30",
      "musicalização adulta zona oeste",
      "aula experimental de musicalização para adultos",
    ],
    ogImagem: "/og/aulas-de-musicalizacao-para-adultos.jpg",
    ogAlt: "Professora sorrindo ao lado de um quadro branco com figuras rítmicas e a palavra staccato, ao lado do texto Música como forma de expressão",
  },

  schema: {
    descricao:
      "Musicalização para adultos, para destravar a percepção rítmica e melódica por meio de vivências práticas, sem a pressão do desempenho perfeito, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Iniciante",
    prerequisitos: "Nenhum. Não é preciso ter estudado música antes.",
  },

  hero: {
    h1: "Musicalização para Adultos na",
    texto:
      "Nunca é tarde para viver a música. Destrave a sua percepção rítmica e melódica por meio de vivências práticas, sem a pressão do desempenho perfeito, com as professoras Mara e Márcia, no Estúdio Mara Passos.",
    imagem: "/images/musicalizacao-adulto.webp",
    posicao: "50% 30%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Pensado para adultos" },
      { icone: Ear, texto: "Percepção rítmica e melódica" },
      { icone: Sparkles, texto: "Sem pressão de desempenho" },
    ],
  },

  diferenciais: {
    titulo: "Por que fazer musicalização no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/instrumentos.webp",
      alt: "Sala do estúdio com bateria, teclado e violões e guitarras pendurados na parede",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Professoras com formação musical sólida",
        texto:
          "Mara e Márcia são formadas em Piano Erudito pelo Conservatório Dramático e Musical de São Paulo, e Mara é pós-graduada em Musicoterapia pela Faculdade Paulista de Artes.",
      },
      {
        titulo: "Vivências práticas",
        texto:
          "Você desenvolve a percepção rítmica e melódica na prática, sem precisar saber nada de música antes de começar.",
      },
      {
        titulo: "Sem a pressão do desempenho perfeito",
        texto:
          "Um ambiente acolhedor, em que o foco é viver a música no seu ritmo, e não tocar sem errar.",
      },
    ],
  },

  passosTitulo: "Como começar a musicalização para adultos",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece a professora, visita as salas e faz seu primeiro contato prático com a musicalização.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professoras de musicalização",
    intro:
      "Aulas conduzidas pelas professoras Mara e Márcia, com formação em piano erudito e experiência em musicalização.",
    professores: [{ id: 1 }, { id: 7 }],
  },

  filosofia: {
    titulo: "Nunca é tarde para a música",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". Na musicalização para adultos, você aprende no seu ritmo, com vivências do seu gosto e sem a pressão de apresentações estressantes.",
    beneficios: [
      { icone: Ear, texto: "Desenvolvimento da escuta" },
      { icone: Music, texto: "Vivências do seu gosto" },
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

  faqTitulo: "Perguntas frequentes sobre musicalização para adultos",
  faq: [
    {
      pergunta: "Nunca estudei música. Posso fazer musicalização?",
      resposta:
        "Pode. Nunca é tarde para viver a música: o curso foi pensado para adultos que querem começar do zero, sem a pressão do desempenho perfeito.",
    },
    {
      pergunta: "O que é musicalização para adultos?",
      resposta:
        "É um curso para destravar a percepção rítmica e melódica por meio de vivências práticas, no seu ritmo.",
    },
    {
      pergunta: "Qual a diferença entre musicalização e aula de instrumento?",
      resposta:
        "A musicalização desenvolve a percepção rítmica e melódica por vivências práticas. A aula de instrumento foca na técnica de um instrumento específico. Quem quiser pode começar pela musicalização e depois escolher o seu instrumento.",
    },
    {
      pergunta: "Preciso saber ler partitura ou tocar algum instrumento?",
      resposta:
        "Não. Ninguém precisa chegar sabendo nada: o curso parte do seu nível.",
    },
    {
      pergunta: "Existe idade máxima para começar?",
      resposta:
        "Não. Como a música é para todas as idades, adultos de qualquer idade são bem-vindos.",
    },
    {
      pergunta: "As aulas de musicalização são em grupo ou individuais?",
      resposta:
        "O formato é combinado na aula experimental, de acordo com o seu objetivo e a sua disponibilidade.",
    },
    {
      pergunta: "Terei que me apresentar em público?",
      resposta:
        "Não. O estúdio tem como princípio a aprendizagem sem a pressão de apresentações estressantes.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece a professora, visita as salas, faz seu primeiro contato prático com a musicalização e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "Onde fica a musicalização para adultos na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Musicalização para adultos na Lapa, em São Paulo",
    intro: "Venha conhecer as salas e as professoras antes de decidir.",
  },
};

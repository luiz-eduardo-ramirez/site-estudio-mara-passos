import { BookOpen, Ear, HeartHandshake, ListMusic, MapPin, Music } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-teoria-musical. A estrutura vive em CoursePage
 * (a mesma das demais páginas de curso); aqui só o que é da teoria musical.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts, a lista de temas em public/llm.txt e a
 * biografia da professora Mara em src/data/teachersList.ts — mais as regras da
 * aula experimental do formulário. A bio da Mara não cita formação específica
 * em teoria, então o texto fala da formação dela em piano erudito e
 * musicoterapia, sem prometer mais.
 *
 * O site não diz se as aulas são individuais ou em turma, nem fixa idade
 * mínima: o FAQ remete as duas perguntas à aula experimental.
 * CONFIRMAR COM A MARA o formato antes de publicar.
 */
export const teoriaMusical: CourseConfig = {
  slug: "aulas-de-teoria-musical",
  instrumento: "Teoria Musical",
  nomeCurso: "Aulas de Teoria Musical",
  breadcrumb: "Aulas de teoria musical",

  seo: {
    titulo: "Aulas de Teoria Musical na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de teoria musical na Lapa, SP, com a professora Mara: partitura, escalas e ditados musicais. Agende aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de teoria musical na Lapa",
      "aula de teoria musical São Paulo",
      "curso de teoria musical Lapa",
      "aprender a ler partitura",
      "aula de partitura zona oeste",
      "aula de harmonia e percepção musical",
      "aula experimental de teoria musical",
    ],
    ogImagem: "/og/aulas-de-teoria-musical.jpg",
    ogAlt: "Quadro branco com figuras rítmicas e a palavra staccato escrita à mão, e uma professora apontando para a partitura",
  },

  schema: {
    descricao:
      "Aulas de teoria musical para entender a partitura e as regras que formam a música, com harmonia, percepção, escalas e ditados musicais de forma leve, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso saber ler partitura.",
  },

  hero: {
    h1: "Aulas de Teoria Musical na",
    texto:
      "Desmistificando a partitura! Aprenda as regras que formam a música de um jeito leve, com harmonia, percepção, escalas e ditados musicais, com a professora Mara, no Estúdio Mara Passos.",
    imagem: "/images/teoria.webp",
    posicao: "50% 50%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: BookOpen, texto: "Leitura de partituras" },
      { icone: ListMusic, texto: "Escalas e ditados musicais" },
      { icone: Ear, texto: "Harmonia e percepção" },
    ],
  },

  diferenciais: {
    titulo: "Por que estudar teoria musical no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/musicalizacao-1.webp",
      alt: "Sala de musicalização infantil com piso emborrachado colorido e instrumentos de percussão",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Professora com formação musical sólida",
        texto:
          "Mara é formada em Piano Erudito pelo Conservatório Dramático e Musical de São Paulo e pós-graduada em Musicoterapia pela Faculdade Paulista de Artes.",
      },
      {
        titulo: "A partitura sem mistério",
        texto:
          "Você aprende as regras que formam a música de um jeito leve e passa a entender o que está escrito na partitura.",
      },
      {
        titulo: "Uma base mais forte como músico",
        texto:
          "Harmonia, percepção, escalas e ditados musicais fortalecem a sua base, seja qual for o instrumento que você toca ou quer tocar.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de teoria musical",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece a professora, visita as salas e faz seu primeiro contato prático com a teoria musical.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professora de teoria musical",
    intro:
      "Aulas conduzidas pela professora Mara, com formação em piano erudito e em musicoterapia.",
    professores: [{ id: 1 }],
  },

  filosofia: {
    titulo: "Teoria no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". Na teoria musical, você aprende no seu ritmo, de um jeito leve e sem a pressão de apresentações estressantes.",
    beneficios: [
      { icone: Ear, texto: "Desenvolvimento da escuta" },
      { icone: Music, texto: "Base sólida como músico" },
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

  faqTitulo: "Perguntas frequentes sobre aulas de teoria musical",
  faq: [
    {
      pergunta: "Nunca li partitura. Posso começar a teoria musical do zero?",
      resposta:
        "Pode. As aulas partem do seu nível e desmistificam a partitura, explicando as regras que formam a música de um jeito leve.",
    },
    {
      pergunta: "O que se aprende na teoria musical?",
      resposta:
        "Harmonia, percepção, escalas, ditados musicais e leitura de partituras, para fortalecer a sua base como músico.",
    },
    {
      pergunta: "A teoria musical é difícil ou chata?",
      resposta:
        "A proposta é o contrário: aprender as regras da música de um jeito leve, no seu ritmo e sem a pressão de apresentações estressantes.",
    },
    {
      pergunta: "Preciso tocar um instrumento para fazer teoria musical?",
      resposta:
        "Na aula experimental a professora conversa sobre o seu objetivo e orienta como a teoria pode ajudar, com ou sem um instrumento.",
    },
    {
      pergunta: "A teoria ajuda quem já toca um instrumento?",
      resposta:
        "Sim. Harmonia, percepção e escalas fortalecem a base de quem já toca e ajudam a entender melhor o que se está tocando.",
    },
    {
      pergunta: "A partir de que idade a criança pode fazer aula de teoria musical?",
      resposta:
        "Na aula experimental a professora conversa com a família e avalia o melhor momento para começar. Para os pequenos, a Musicalização Infantil é um ótimo primeiro passo.",
    },
    {
      pergunta: "As aulas de teoria são em grupo ou individuais?",
      resposta:
        "O formato é combinado na aula experimental, de acordo com o seu objetivo e a sua disponibilidade.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece a professora, visita as salas, faz seu primeiro contato prático com a teoria musical e conversa sobre seus objetivos. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "Onde ficam as aulas de teoria musical na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de teoria musical na Lapa, em São Paulo",
    intro: "Venha conhecer as salas e a professora antes de decidir.",
  },
};

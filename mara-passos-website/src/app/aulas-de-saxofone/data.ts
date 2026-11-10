import { Ear, HeartHandshake, MapPin, Music, Sparkles, UserRound, Wind } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-saxofone. A estrutura vive em CoursePage (a
 * mesma das demais páginas de curso); aqui só o que é do saxofone.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts — mais as regras da aula experimental do
 * formulário. O saxofone ainda não tem professor indicado, então `equipe` fica
 * de fora: a página não mostra a seção Professores nem inventa biografia. Ao
 * definir o professor, acrescente `equipe` (ids de teachersList.ts) e cite-o no
 * texto. O site também não fixa idade mínima, então o FAQ remete essa pergunta
 * à aula experimental.
 */
export const saxofone: CourseConfig = {
  slug: "aulas-de-saxofone",
  instrumento: "Saxofone",
  nomeCurso: "Aulas de Saxofone",
  breadcrumb: "Aulas de saxofone",

  seo: {
    titulo: "Aulas de Saxofone na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de saxofone na Lapa, SP: embocadura, leitura de partitura e improvisação. Agende sua aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de saxofone na Lapa",
      "aula de saxofone São Paulo",
      "escola de saxofone Lapa",
      "aula de saxofone zona oeste",
      "aula de saxofone para adultos",
      "aula de saxofone infantil",
      "aula experimental de saxofone",
    ],
    ogImagem: "/og/aulas-de-saxofone.jpg",
    ogAlt: "Aluno tocando saxofone em uma sala com piano de cauda e bateria ao fundo",
  },

  schema: {
    descricao:
      "Aulas de saxofone com foco em embocadura, técnica de sopro, leitura de partituras e introdução à improvisação no jazz e na música popular, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso ter tocado antes.",
  },

  hero: {
    h1: "Aulas de Saxofone na",
    texto:
      "Domine a embocadura e a expressividade do saxofone: técnica de sopro, leitura de partituras e uma introdução à improvisação no jazz e na música popular, no Estúdio Mara Passos.",
    imagem: "/images/saxofone.webp",
    posicao: "50% 35%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: Wind, texto: "Embocadura e sopro" },
      { icone: Sparkles, texto: "Jazz e música popular" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender saxofone no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/instrumentos.webp",
      alt: "Sala do estúdio com bateria, teclado e violões e guitarras pendurados na parede",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Técnica de sopro desde a base",
        texto:
          "Você domina a embocadura e a expressividade do instrumento, a base de um som bonito no saxofone.",
      },
      {
        titulo: "Leitura de partituras",
        texto:
          "O curso abrange a leitura de partituras, para você tocar com autonomia e ampliar o seu repertório.",
      },
      {
        titulo: "Introdução à improvisação",
        texto:
          "Uma porta de entrada para a improvisação no jazz e na música popular, no seu ritmo e sem a pressão do desempenho perfeito.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de saxofone",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece o professor, visita as salas e faz seu primeiro contato prático com o saxofone.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  filosofia: {
    titulo: "Saxofone no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". No saxofone, você aprende no seu ritmo, com repertório do seu gosto e sem a pressão de apresentações estressantes.",
    beneficios: [
      { icone: Ear, texto: "Desenvolvimento da escuta" },
      { icone: Music, texto: "Repertório do seu gosto" },
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

  faqTitulo: "Perguntas frequentes sobre aulas de saxofone",
  faq: [
    {
      pergunta: "Preciso ter um saxofone para começar?",
      resposta:
        "Você pode tirar essa dúvida na aula experimental: o professor orienta qual instrumento escolher e como começar, antes de você decidir comprar o seu.",
    },
    {
      pergunta: "Nunca toquei nada. Posso começar o saxofone do zero?",
      resposta:
        "Pode. As aulas partem do seu nível, sem pressão por desempenho, a começar pela embocadura e pela técnica de sopro.",
    },
    {
      pergunta: "O que se aprende nas primeiras aulas?",
      resposta:
        "Os fundamentos do instrumento: embocadura, técnica de sopro e os primeiros passos na leitura de partituras, no repertório que você quer tocar.",
    },
    {
      pergunta: "Preciso saber ler partitura?",
      resposta:
        "Não é preciso chegar sabendo. A leitura de partituras faz parte do curso, e as aulas partem do seu nível.",
    },
    {
      pergunta: "Vou aprender a improvisar?",
      resposta:
        "Sim, o curso inclui uma introdução à improvisação no jazz e na música popular, no seu ritmo.",
    },
    {
      pergunta: "A partir de que idade a criança pode fazer aula de saxofone?",
      resposta:
        "Na aula experimental o professor conversa com a família e avalia se a criança está pronta para o instrumento. Para os pequenos, a Musicalização Infantil é um ótimo primeiro passo.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece o professor, visita as salas, faz seu primeiro contato prático com o saxofone e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de saxofone são em grupo ou individuais?",
      resposta:
        "São individuais, com o professor concentrado na sua técnica, no seu ritmo e no repertório que você quer tocar.",
    },
    {
      pergunta: "Onde ficam as aulas de saxofone na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de saxofone na Lapa, em São Paulo",
    intro: "Venha conhecer as salas e o saxofone antes de decidir.",
  },
};

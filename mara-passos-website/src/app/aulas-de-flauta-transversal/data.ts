import { Ear, HeartHandshake, MapPin, Music, Sparkles, UserRound, Wind } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-flauta-transversal. A estrutura vive em
 * CoursePage (a mesma das demais páginas de curso); aqui só o que é da flauta
 * transversal.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts e biografias das professoras Mara e Márcia em
 * src/data/teachersList.ts — mais as regras da aula experimental do
 * formulário. Quem leciona flauta transversal, segundo a bio, é a Márcia; a
 * Mara entra na equipe por definição do estúdio. O site não fixa idade mínima
 * para a flauta transversal, então o FAQ remete essa pergunta à aula
 * experimental.
 */
export const flautaTransversal: CourseConfig = {
  slug: "aulas-de-flauta-transversal",
  instrumento: "Flauta Transversal",
  nomeCurso: "Aulas de Flauta Transversal",
  breadcrumb: "Aulas de flauta transversal",

  seo: {
    // Sem "(SP)": com ele o título passaria de 60 caracteres.
    titulo: "Aulas de Flauta Transversal na Lapa | Estúdio Mara Passos",
    descricao:
      "Aulas de flauta transversal na Lapa, SP, com as professoras Mara e Márcia: embocadura e respiração. Agende aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de flauta transversal na Lapa",
      "aula de flauta transversal São Paulo",
      "escola de flauta transversal Lapa",
      "professora de flauta transversal zona oeste",
      "aula de flauta transversal para adultos",
      "aula de flauta transversal infantil",
      "aula experimental de flauta transversal",
    ],
    ogImagem: "/og/aulas-de-flauta-transversal.jpg",
    ogAlt: "Aluno tocando flauta transversal em uma sala com bateria, teclado e violões na parede",
  },

  schema: {
    descricao:
      "Aulas de flauta transversal com foco em embocadura, respiração diafragmática e repertório do erudito ao popular, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso ter tocado antes.",
  },

  hero: {
    h1: "Aulas de Flauta Transversal na",
    texto:
      "Explore a sonoridade elegante da flauta transversal: embocadura, respiração diafragmática e um repertório que vai do erudito ao popular. Aulas individuais com as professoras Mara e Márcia, no Estúdio Mara Passos.",
    imagem: "/images/flauta-transversal.webp",
    posicao: "50% 40%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: Wind, texto: "Respiração diafragmática" },
      { icone: Sparkles, texto: "Do erudito ao popular" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender flauta transversal no Estúdio Mara Passos",
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
          "Márcia leciona flauta transversal e tem formação pelo Curso Sopro Novo de Flautas Doce da Yamaha. Mara e Márcia são formadas em Piano Erudito pelo Conservatório Dramático e Musical de São Paulo.",
      },
      {
        titulo: "Embocadura e respiração",
        texto:
          "O curso aborda a embocadura e a respiração diafragmática, a base de um som limpo e expressivo na flauta transversal.",
      },
      {
        titulo: "Do erudito ao popular",
        texto:
          "Um repertório que passa pelos dois mundos, no seu ritmo e sem a pressão do desempenho perfeito.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de flauta transversal",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece a professora, visita as salas e faz seu primeiro contato prático com a flauta transversal.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professoras de flauta transversal",
    intro:
      "Aulas conduzidas pelas professoras Mara e Márcia, com formação em piano erudito e em flautas.",
    professores: [{ id: 1 }, { id: 7 }],
  },

  filosofia: {
    titulo: "Flauta transversal no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". Na flauta transversal, você aprende no seu ritmo, com repertório do seu gosto e sem a pressão de apresentações estressantes.",
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

  faqTitulo: "Perguntas frequentes sobre aulas de flauta transversal",
  faq: [
    {
      pergunta: "Preciso ter uma flauta transversal para começar?",
      resposta:
        "Você pode tirar essa dúvida na aula experimental: a professora orienta qual instrumento escolher e como começar, antes de você decidir comprar o seu.",
    },
    {
      pergunta: "Nunca toquei nada. Posso começar a flauta transversal do zero?",
      resposta:
        "Pode. As aulas partem do seu nível, sem pressão por desempenho, a começar pela embocadura e pela respiração.",
    },
    {
      pergunta: "O que é respiração diafragmática?",
      resposta:
        "É o uso do diafragma para controlar o ar, uma base do som na flauta transversal. O curso aborda essa respiração junto com a embocadura, passo a passo.",
    },
    {
      pergunta: "Que tipo de música vou tocar?",
      resposta:
        "O repertório vai do erudito ao popular, de acordo com o que você quer tocar.",
    },
    {
      pergunta: "Preciso aprender flauta doce antes?",
      resposta:
        "Não é obrigatório. As aulas partem do seu nível. A flauta doce é uma boa iniciação melódica, e na aula experimental a professora ajuda você a decidir por onde começar.",
    },
    {
      pergunta: "A partir de que idade a criança pode fazer aula de flauta transversal?",
      resposta:
        "Na aula experimental a professora conversa com a família e avalia se a criança está pronta para o instrumento. Para os pequenos, a Musicalização Infantil é um ótimo primeiro passo.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece a professora, visita as salas, faz seu primeiro contato prático com a flauta transversal e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de flauta transversal são em grupo ou individuais?",
      resposta:
        "São individuais, com a professora concentrada na sua técnica, no seu ritmo e no repertório que você quer tocar.",
    },
    {
      pergunta: "Onde ficam as aulas de flauta transversal na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de flauta transversal na Lapa, em São Paulo",
    intro: "Venha conhecer as salas, a flauta transversal e as professoras antes de decidir.",
  },
};

import { BookOpen, Ear, HeartHandshake, MapPin, Music, UserRound, Wind } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-flauta-doce. A estrutura vive em CoursePage (a
 * mesma das demais páginas de curso); aqui só o que é da flauta doce.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts e biografias das professoras Mara e Márcia em
 * src/data/teachersList.ts (ambas com o curso Sopro Novo de Flautas Doce da
 * Yamaha) — mais as regras da aula experimental do formulário. O site não fixa
 * idade mínima para a flauta doce, então o FAQ remete essa pergunta à aula
 * experimental.
 */
export const flautaDoce: CourseConfig = {
  slug: "aulas-de-flauta-doce",
  instrumento: "Flauta Doce",
  nomeCurso: "Aulas de Flauta Doce",
  breadcrumb: "Aulas de flauta doce",

  seo: {
    titulo: "Aulas de Flauta Doce na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de flauta doce na Lapa, SP, com as professoras Mara e Márcia: sopro suave e leitura de notas. Agende aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de flauta doce na Lapa",
      "aula de flauta doce São Paulo",
      "escola de flauta doce Lapa",
      "professora de flauta doce zona oeste",
      "aula de flauta doce para adultos",
      "aula de flauta doce infantil",
      "aula experimental de flauta doce",
    ],
    ogImagem: "/og/aulas-de-flauta-doce.jpg",
    ogAlt: "Aluno tocando flauta doce sentado em um banco, com outras crianças ao fundo, em uma sala com piano",
  },

  schema: {
    descricao:
      "Aulas de flauta doce, uma excelente iniciação melódica, com foco em sopro suave, leitura de notas e musicalidade de forma leve, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso ter tocado antes.",
  },

  hero: {
    h1: "Aulas de Flauta Doce na",
    texto:
      "Um instrumento doce e perfeito para a primeira iniciação melódica. Sopro suave, leitura de notas e musicalidade de forma leve, em aulas individuais com as professoras Mara e Márcia, no Estúdio Mara Passos.",
    imagem: "/images/flauta-doce.webp",
    posicao: "50% 45%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: Wind, texto: "Sopro suave" },
      { icone: BookOpen, texto: "Leitura de notas" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender flauta doce no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/musicalizacao-1.webp",
      alt: "Sala de musicalização infantil com piso emborrachado colorido e instrumentos de percussão",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Professoras com formação em flauta doce",
        texto:
          "Mara e Márcia têm formação pelo Curso Sopro Novo de Flautas Doce da Yamaha e também são formadas em Piano Erudito pelo Conservatório Dramático e Musical de São Paulo.",
      },
      {
        titulo: "A primeira iniciação melódica",
        texto:
          "A flauta doce é um instrumento doce e acolhedor para dar os primeiros passos na melodia: você desenvolve o sopro suave e a leitura de notas.",
      },
      {
        titulo: "De forma curativa e leve",
        texto:
          "As aulas trabalham a musicalidade de forma leve, no seu ritmo e sem a pressão do desempenho perfeito.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de flauta doce",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece a professora, visita as salas e faz seu primeiro contato prático com a flauta doce.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professoras de flauta doce",
    intro:
      "Aulas conduzidas pelas professoras Mara e Márcia, com formação em flautas doce pela Yamaha e em piano erudito.",
    professores: [{ id: 1 }, { id: 7 }],
  },

  filosofia: {
    titulo: "Flauta doce no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". Na flauta doce, você aprende no seu ritmo, com repertório do seu gosto e sem a pressão de apresentações estressantes.",
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

  faqTitulo: "Perguntas frequentes sobre aulas de flauta doce",
  faq: [
    {
      pergunta: "Preciso ter uma flauta doce para começar?",
      resposta:
        "Você pode tirar essa dúvida na aula experimental: a professora orienta qual instrumento escolher e como começar, antes de você decidir comprar o seu.",
    },
    {
      pergunta: "Nunca toquei nada. Posso começar a flauta doce do zero?",
      resposta:
        "Pode. A flauta doce é uma excelente iniciação melódica, e as aulas partem do seu nível, sem pressão por desempenho.",
    },
    {
      pergunta: "A flauta doce é um bom primeiro instrumento?",
      resposta:
        "É um instrumento doce e perfeito para a primeira iniciação melódica: desenvolve o sopro suave, a leitura de notas e a musicalidade de forma leve.",
    },
    {
      pergunta: "O que se aprende nas primeiras aulas?",
      resposta:
        "Os fundamentos do sopro suave e da leitura de notas, aplicados em melodias do repertório que você quer tocar.",
    },
    {
      pergunta: "Qual a diferença entre flauta doce e flauta transversal?",
      resposta:
        "A flauta doce é uma iniciação melódica leve, com sopro suave. A flauta transversal tem uma sonoridade elegante, com embocadura e respiração diafragmática, e vai do erudito ao popular. Na aula experimental a professora mostra as duas e ajuda você a escolher.",
    },
    {
      pergunta: "A partir de que idade a criança pode fazer aula de flauta doce?",
      resposta:
        "Na aula experimental a professora conversa com a família e avalia se a criança está pronta para o instrumento. Para os pequenos, a Musicalização Infantil é um ótimo primeiro passo.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece a professora, visita as salas, faz seu primeiro contato prático com a flauta doce e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de flauta doce são em grupo ou individuais?",
      resposta:
        "São individuais, com a professora concentrada na sua técnica, no seu ritmo e no repertório que você quer tocar.",
    },
    {
      pergunta: "Onde ficam as aulas de flauta doce na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de flauta doce na Lapa, em São Paulo",
    intro: "Venha conhecer as salas, a flauta doce e as professoras antes de decidir.",
  },
};

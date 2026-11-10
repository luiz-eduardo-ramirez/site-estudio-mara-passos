import { Ear, HeartHandshake, MapPin, Music, Piano, SlidersHorizontal, UserRound } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-teclado. A estrutura vive em CoursePage (a mesma
 * das demais páginas de curso); aqui só o que é do teclado.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts e biografias dos professores Reinaldo, Márcia e
 * Mara em src/data/teachersList.ts — mais as regras da aula experimental do
 * formulário. O site não fixa idade mínima para o teclado (só para piano e
 * bateria, cerca de 5 anos), então o FAQ remete essa pergunta à aula
 * experimental.
 */
export const teclado: CourseConfig = {
  slug: "aulas-de-teclado",
  instrumento: "Teclado",
  nomeCurso: "Aulas de Teclado",
  breadcrumb: "Aulas de teclado",

  seo: {
    titulo: "Aulas de Teclado na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de teclado na Lapa, SP: timbres, ritmos automáticos e arranjos com as duas mãos. Agende sua aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de teclado na Lapa",
      "aula de teclado São Paulo",
      "escola de teclado Lapa",
      "professor de teclado zona oeste",
      "aula de teclado para adultos",
      "aula de teclado infantil",
      "aula experimental de teclado",
    ],
    ogImagem: "/og/aulas-de-teclado.jpg",
    ogAlt: "Aluno tocando um teclado com painel de timbres, ao lado de outro teclado vermelho em um suporte",
  },

  schema: {
    descricao:
      "Aulas individuais de teclado com foco em timbres, ritmos automáticos e na criação de arranjos completos com as duas mãos, em música popular, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso ter tocado antes.",
  },

  hero: {
    h1: "Aulas de Teclado na",
    texto:
      "Explore a versatilidade dos timbres e dos ritmos automáticos e aprenda a criar arranjos completos com as duas mãos. Aulas individuais com os professores Reinaldo, Márcia e Mara, no Estúdio Mara Passos.",
    imagem: "/images/teclado.webp",
    posicao: "40% 45%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: SlidersHorizontal, texto: "Timbres e ritmos automáticos" },
      { icone: Piano, texto: "Arranjos com as duas mãos" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender teclado no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/instrumentos.webp",
      alt: "Sala do estúdio com bateria, teclado e violões e guitarras pendurados na parede",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Professores com formação em piano",
        texto:
          "Mara e Márcia são formadas em Piano Erudito pelo Conservatório Dramático e Musical de São Paulo, e Reinaldo estudou piano erudito e popular.",
      },
      {
        titulo: "Foco na música popular",
        texto:
          "As aulas exploram a versatilidade dos timbres e dos ritmos automáticos, para você tocar o repertório que gosta com cara de banda inteira.",
      },
      {
        titulo: "Arranjos completos, de forma prática",
        texto:
          "Você aprende a criar arranjos usando as duas mãos, no seu ritmo e sem a pressão do desempenho perfeito.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de teclado",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece o professor, visita as salas e faz seu primeiro contato prático com o teclado.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professores de teclado",
    intro:
      "Aulas conduzidas pelos professores Reinaldo, Márcia e Mara, com sólida formação em piano e em diferentes estilos.",
    professores: [{ id: 6 }, { id: 7 }, { id: 1 }],
  },

  filosofia: {
    titulo: "Teclado no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". No teclado, você aprende no seu ritmo, com repertório do seu gosto e sem a pressão de apresentações estressantes.",
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

  faqTitulo: "Perguntas frequentes sobre aulas de teclado",
  faq: [
    {
      pergunta: "Preciso ter um teclado para começar?",
      resposta:
        "Você pode tirar essa dúvida na aula experimental: o professor orienta qual instrumento escolher e como começar, antes de você decidir comprar o seu.",
    },
    {
      pergunta: "Nunca toquei nada. Posso começar o teclado do zero?",
      resposta:
        "Pode. As aulas partem do seu nível, sem pressão por desempenho, de forma prática e com as duas mãos desde o começo.",
    },
    {
      pergunta: "Qual a diferença entre teclado e piano?",
      resposta:
        "O teclado é focado na música popular e traz timbres e ritmos automáticos para criar arranjos completos. O piano tem um caminho próprio, do erudito ao popular. Na aula experimental o professor mostra os dois e ajuda você a escolher.",
    },
    {
      pergunta: "O que se aprende nas primeiras aulas?",
      resposta:
        "Os fundamentos do instrumento, o uso dos timbres e dos ritmos automáticos e os primeiros arranjos com as duas mãos, sempre no repertório que você quer tocar.",
    },
    {
      pergunta: "Vou aprender só música popular?",
      resposta:
        "O curso tem foco na música popular, mas os professores têm formação em piano erudito e popular, e as aulas seguem o repertório que você quer tocar.",
    },
    {
      pergunta: "A partir de que idade a criança pode fazer aula de teclado?",
      resposta:
        "Na aula experimental o professor conversa com a família e avalia se a criança está pronta para o instrumento. Para os pequenos, a Musicalização Infantil é um ótimo primeiro passo.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece o professor, visita as salas, faz seu primeiro contato prático com o teclado e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de teclado são em grupo ou individuais?",
      resposta:
        "São individuais, com o professor concentrado na sua técnica, no seu ritmo e no repertório que você quer tocar.",
    },
    {
      pergunta: "Onde ficam as aulas de teclado na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de teclado na Lapa, em São Paulo",
    intro: "Venha conhecer as salas, o teclado e os professores antes de decidir.",
  },
};

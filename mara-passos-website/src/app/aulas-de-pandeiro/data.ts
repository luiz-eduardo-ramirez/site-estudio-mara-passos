import { Drum, Ear, HeartHandshake, MapPin, Music, Sparkles, UserRound } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-pandeiro. A estrutura vive em CoursePage (a
 * mesma das demais páginas de curso); aqui só o que é do pandeiro.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts e biografia do professor Rafael em
 * src/data/teachersList.ts — mais as regras da aula experimental do
 * formulário. O site não fixa idade mínima para o pandeiro, então o FAQ remete
 * essa pergunta à aula experimental.
 */
export const pandeiro: CourseConfig = {
  slug: "aulas-de-pandeiro",
  instrumento: "Pandeiro",
  nomeCurso: "Aulas de Pandeiro",
  breadcrumb: "Aulas de pandeiro",

  seo: {
    titulo: "Aulas de Pandeiro na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de pandeiro na Lapa, SP, com o professor Rafael: levadas de samba e choro. Agende sua aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de pandeiro na Lapa",
      "aula de pandeiro São Paulo",
      "escola de pandeiro Lapa",
      "professor de pandeiro zona oeste",
      "aula de pandeiro para adultos",
      "aula de pandeiro infantil",
      "aula experimental de pandeiro",
    ],
    ogImagem: "/og/aulas-de-pandeiro.jpg",
    ogAlt: "Pessoa tocando pandeiro em uma sala com piso colorido, cercada por crianças atentas",
  },

  schema: {
    descricao:
      "Aulas individuais de pandeiro com foco nos ritmos brasileiros, nas levadas de samba e choro e na riqueza percussiva do instrumento, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso ter tocado antes.",
  },

  hero: {
    h1: "Aulas de Pandeiro na",
    texto:
      "O coração do samba e do chorinho, passo a passo. Aprenda os ritmos brasileiros e explore toda a riqueza percussiva do pandeiro, em aulas individuais com o professor Rafael, no Estúdio Mara Passos.",
    imagem: "/images/pandeiro.webp",
    posicao: "50% 40%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: Drum, texto: "Levadas de samba e choro" },
      { icone: Sparkles, texto: "Ritmos brasileiros" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender pandeiro no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/musicalizacao-1.webp",
      alt: "Sala de musicalização infantil com piso emborrachado colorido e instrumentos de percussão",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Professor especializado no instrumento",
        texto:
          "Rafael é graduado em Licenciatura em Música pela UNESP e se especializou em Pandeiro no SESC Vila Mariana e no Coletivo S Pandeiro.",
      },
      {
        titulo: "A base percussiva do samba",
        texto:
          "Com forte base percussiva, Rafael estudou bateria em escolas de samba e traz toda a riqueza do ritmo brasileiro para as aulas.",
      },
      {
        titulo: "Didática passo a passo",
        texto:
          "Você domina as levadas de samba e choro de forma gradual, no seu ritmo e sem a pressão do desempenho perfeito.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de pandeiro",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece o professor, visita as salas e faz seu primeiro contato prático com o pandeiro.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professor de pandeiro",
    intro:
      "Aulas conduzidas pelo professor Rafael, que traz toda a riqueza do ritmo brasileiro para a sala de aula.",
    professores: [{ id: 3 }],
  },

  filosofia: {
    titulo: "Pandeiro no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". No pandeiro, você aprende no seu ritmo, com repertório do seu gosto e sem a pressão de apresentações estressantes.",
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

  faqTitulo: "Perguntas frequentes sobre aulas de pandeiro",
  faq: [
    {
      pergunta: "Preciso ter um pandeiro para começar?",
      resposta:
        "Você pode tirar essa dúvida na aula experimental: o professor orienta qual instrumento escolher e como começar, antes de você decidir comprar o seu.",
    },
    {
      pergunta: "Nunca toquei nada. Posso começar o pandeiro do zero?",
      resposta:
        "Pode. As aulas partem do seu nível, passo a passo e sem pressão por desempenho.",
    },
    {
      pergunta: "Que ritmos eu vou aprender?",
      resposta:
        "Os ritmos brasileiros, com foco nas levadas de samba e choro, explorando toda a riqueza percussiva do pandeiro.",
    },
    {
      pergunta: "O pandeiro serve só para samba?",
      resposta:
        "Não. O samba e o choro são o ponto de partida, mas o professor Rafael explora os ritmos brasileiros em geral, de acordo com o que você quer tocar.",
    },
    {
      pergunta: "O que se aprende nas primeiras aulas?",
      resposta:
        "Os fundamentos do instrumento e as primeiras levadas, passo a passo, no repertório que você quer tocar.",
    },
    {
      pergunta: "A partir de que idade a criança pode fazer aula de pandeiro?",
      resposta:
        "Na aula experimental o professor conversa com a família e avalia se a criança está pronta para o instrumento. Para os pequenos, a Musicalização Infantil é um ótimo primeiro passo.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece o professor, visita as salas, faz seu primeiro contato prático com o pandeiro e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de pandeiro são em grupo ou individuais?",
      resposta:
        "São individuais, com o professor concentrado na sua técnica, no seu ritmo e no repertório que você quer tocar.",
    },
    {
      pergunta: "Onde ficam as aulas de pandeiro na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de pandeiro na Lapa, em São Paulo",
    intro: "Venha conhecer as salas, o pandeiro e o professor antes de decidir.",
  },
};

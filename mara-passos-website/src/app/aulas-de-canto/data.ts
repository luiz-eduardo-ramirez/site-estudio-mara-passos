import { Ear, HeartHandshake, HeartPulse, MapPin, Mic, UserRound, Wind } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-canto. A estrutura vive em CoursePage (a mesma
 * das demais páginas de curso); aqui só o que é do canto.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts, biografia da professora Vanessa em
 * src/data/teachersList.ts e a idade mínima (7 anos) em faqData.ts — mais as
 * regras da aula experimental do formulário.
 */
export const canto: CourseConfig = {
  slug: "aulas-de-canto",
  instrumento: "Canto",
  nomeCurso: "Aulas de Canto",
  breadcrumb: "Aulas de canto",

  seo: {
    titulo: "Aulas de Canto na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de canto na Lapa, SP, com a professora Vanessa: respiração, afinação e saúde vocal. Agende sua aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de canto na Lapa",
      "aula de canto São Paulo",
      "escola de canto Lapa",
      "professora de canto zona oeste",
      "aula de canto para adultos",
      "aula de canto infantil",
      "aula experimental de canto",
    ],
    ogImagem: "/og/aulas-de-canto.jpg",
    ogAlt: "Duas cantoras com microfones em uma apresentação, com uma pianista ao teclado ao fundo",
  },

  schema: {
    descricao:
      "Aulas individuais de canto com foco em respiração, afinação, impostação e repertório, para cantar com saúde vocal, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso ter cantado antes.",
  },

  hero: {
    h1: "Aulas de Canto na",
    texto:
      "Descubra a sua própria voz em um ambiente acolhedor. Respiração, afinação, impostação e repertório, em aulas individuais com a professora Vanessa, no Estúdio Mara Passos.",
    imagem: "/images/canto.webp",
    posicao: "50% 40%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: Wind, texto: "Respiração e afinação" },
      { icone: HeartPulse, texto: "Saúde vocal" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender canto no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/instrumentos.webp",
      alt: "Sala do estúdio com bateria, teclado e violões e guitarras pendurados na parede",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Professora com formação e experiência",
        texto:
          "Vanessa é formada em Canto Lírico pela FMU/FAAM, atuou como cantora do Coral Paulistano do Teatro Municipal e é licenciada do método Full-Voice.",
      },
      {
        titulo: "Ciência da voz e musicalidade",
        texto:
          "O método une conhecimentos da ciência da voz a uma visão técnico-musical e musicoterápica, para você cantar com saúde vocal e muita emoção.",
      },
      {
        titulo: "A sua voz, no seu tempo",
        texto:
          "Um ambiente acolhedor, em que o repertório é o seu e a evolução respeita o seu ritmo, sem a pressão do desempenho perfeito.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de canto",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece a professora, visita as salas e faz seu primeiro contato prático com o canto.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professora de canto",
    intro:
      "Aulas conduzidas pela professora Vanessa, com formação em Canto Lírico e experiência em coral.",
    professores: [{ id: 4 }],
  },

  filosofia: {
    titulo: "Canto no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". No canto, você aprende no seu ritmo, com repertório do seu gosto e sem a pressão de apresentações estressantes.",
    beneficios: [
      { icone: Ear, texto: "Desenvolvimento da escuta" },
      { icone: Mic, texto: "Repertório do seu gosto" },
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

  faqTitulo: "Perguntas frequentes sobre aulas de canto",
  faq: [
    {
      pergunta: "Nunca cantei. Posso começar o canto do zero?",
      resposta:
        "Pode. As aulas partem do seu nível, sem pressão por desempenho, e trabalham respiração, afinação, impostação e repertório desde o começo.",
    },
    {
      pergunta: "Preciso ter uma voz boa para fazer aula de canto?",
      resposta:
        "Não. A voz se desenvolve com técnica e prática. As aulas ajudam você a descobrir a sua própria voz e a cantar com afinação e saúde vocal.",
    },
    {
      pergunta: "O que se aprende nas primeiras aulas?",
      resposta:
        "Os fundamentos do canto: respiração, afinação e impostação, aplicados no repertório que você quer cantar.",
    },
    {
      pergunta: "Que estilos de música posso cantar?",
      resposta:
        "As aulas seguem o repertório do seu gosto. A professora Vanessa tem formação em Canto Lírico e experiência em coral, e conduz o trabalho de acordo com o que você quer cantar.",
    },
    {
      pergunta: "O que é o método Full-Voice?",
      resposta:
        "É um método que une conhecimentos da ciência da voz a uma visão técnico-musical e musicoterápica. A professora Vanessa é licenciada nele.",
    },
    {
      pergunta: "A partir de que idade a criança pode fazer aula de canto?",
      resposta:
        "Aconselhamos iniciar a partir dos 7 anos. Para crianças menores, a Musicalização Infantil é um ótimo primeiro passo.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece a professora, visita as salas, faz seu primeiro contato prático com o canto e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de canto são em grupo ou individuais?",
      resposta:
        "São individuais, com a professora concentrada na sua técnica, no seu ritmo e no repertório que você quer cantar.",
    },
    {
      pergunta: "Onde ficam as aulas de canto na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de canto na Lapa, em São Paulo",
    intro: "Venha conhecer as salas e a professora antes de decidir.",
  },
};

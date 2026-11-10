import { Activity, Ear, HeartHandshake, MapPin, Music, Sparkles, UserRound } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-baixo. A estrutura vive em CoursePage (a mesma
 * das demais páginas de curso); aqui só o que é do baixo.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts e biografia do professor Rodrigo em
 * src/data/teachersList.ts — mais as regras da aula experimental do formulário.
 * O site não fixa idade mínima para o baixo (só para guitarra, violão e canto),
 * então o FAQ remete essa pergunta à aula experimental.
 */
export const baixo: CourseConfig = {
  slug: "aulas-de-baixo",
  instrumento: "Baixo",
  nomeCurso: "Aulas de Baixo",
  breadcrumb: "Aulas de baixo",

  seo: {
    titulo: "Aulas de Baixo na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de baixo na Lapa, SP, com o professor Rodrigo: grooves, pizzicato e slap. Agende sua aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de baixo na Lapa",
      "aula de baixo São Paulo",
      "escola de contrabaixo Lapa",
      "professor de baixo zona oeste",
      "aula de contrabaixo para adultos",
      "aula de baixo elétrico",
      "aula experimental de baixo",
    ],
    ogImagem: "/og/aulas-de-baixo.jpg",
    ogAlt: "Alunos tocando baixo e guitarra em uma sala do Estúdio Mara Passos, na Lapa, em São Paulo",
  },

  schema: {
    descricao:
      "Aulas individuais de baixo com foco em grooves, técnicas como pizzicato e slap e na função do baixo na música, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso ter tocado antes.",
  },

  hero: {
    h1: "Aulas de Baixo na",
    texto:
      "O baixo é o coração do ritmo. Aprenda a criar grooves envolventes e a entender o papel do instrumento na música, com aulas individuais com o professor Rodrigo, no Estúdio Mara Passos.",
    imagem: "/images/baixo.webp",
    posicao: "50% 40%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: Activity, texto: "Grooves, pizzicato e slap" },
      { icone: Sparkles, texto: "No seu próprio ritmo" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender baixo no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/instrumentos.webp",
      alt: "Sala do estúdio com bateria, teclado e violões e guitarras pendurados na parede",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Professor com formação e experiência",
        texto:
          "Rodrigo é licenciado em Música pela FPA, formado em Guitarra pela Fundação das Artes de São Caetano do Sul e ensina desde 2007.",
      },
      {
        titulo: "Grooves e técnica desde o começo",
        texto:
          "Você aprende a criar linhas de baixo envolventes e a dominar técnicas como pizzicato e slap, entendendo a função essencial do baixo na música.",
      },
      {
        titulo: "Aprenda no seu ritmo",
        texto:
          "Um caminho que parte do seu nível e evolui no seu tempo, em um ambiente acolhedor e sem a pressão do desempenho perfeito.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de baixo",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece o professor, visita as salas e faz seu primeiro contato prático com o baixo.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professor de baixo",
    intro:
      "Aulas conduzidas pelo professor Rodrigo, com vasta experiência no ensino musical e em diferentes estilos.",
    professores: [{ id: 5 }],
  },

  filosofia: {
    titulo: "Baixo no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". No baixo, você aprende no seu ritmo, com repertório do seu gosto e sem a pressão de apresentações estressantes.",
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

  faqTitulo: "Perguntas frequentes sobre aulas de baixo",
  faq: [
    {
      pergunta: "Preciso ter um baixo para começar?",
      resposta:
        "Você pode tirar essa dúvida na aula experimental: o professor orienta qual instrumento escolher e como começar, antes de você decidir comprar o seu.",
    },
    {
      pergunta: "Nunca toquei nada. Posso começar o baixo do zero?",
      resposta:
        "Pode. As aulas partem do seu nível, sem pressão por desempenho, e vão construindo o seu groove aos poucos.",
    },
    {
      pergunta: "Qual a diferença entre baixo e guitarra?",
      resposta:
        "O baixo cuida das linhas graves, do ritmo e da harmonia, sustentando a música junto com a bateria. A guitarra costuma ficar com riffs, solos e acordes. Na aula experimental o professor mostra os dois e ajuda você a escolher.",
    },
    {
      pergunta: "O que se aprende nas primeiras aulas?",
      resposta:
        "Os fundamentos do instrumento e a função do baixo na música, com técnicas como pizzicato e slap, sempre no repertório e no estilo que você quer tocar.",
    },
    {
      pergunta: "A partir de que idade a criança pode fazer aula de baixo?",
      resposta:
        "Na aula experimental o professor conversa com a família e avalia se a criança está pronta para o instrumento. Para os pequenos, a Musicalização Infantil é um ótimo primeiro passo.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece o professor, visita as salas, faz seu primeiro contato prático com o baixo e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de baixo são em grupo ou individuais?",
      resposta:
        "São individuais, com o professor concentrado na sua técnica, no seu ritmo e no repertório que você quer tocar.",
    },
    {
      pergunta: "Onde ficam as aulas de baixo na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de baixo na Lapa, em São Paulo",
    intro: "Venha conhecer as salas, o baixo e o professor antes de decidir.",
  },
};

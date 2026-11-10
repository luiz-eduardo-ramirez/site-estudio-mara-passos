import { Ear, HeartHandshake, MapPin, Music, Sparkles, Users } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /pratica-de-conjunto. A estrutura vive em CoursePage (a
 * mesma das demais páginas de curso); aqui só o que é da prática de conjunto.
 *
 * O texto parte do que o site já afirma — descrição e categoria ("Prática em
 * Grupo") em src/data/instrumentsList.ts e biografia do professor Rodrigo em
 * src/data/teachersList.ts — mais as regras da aula experimental do
 * formulário. Por ser prática em grupo, esta página pode dizer que é em grupo;
 * o site não diz, porém, que nível ou instrumento é preciso ter, nem a idade
 * mínima: o FAQ remete isso à aula experimental. O Rodrigo é o professor
 * definido pelo estúdio; a bio dele não fala de grupos, então o texto não
 * promete experiência específica com bandas.
 */
export const praticaConjunto: CourseConfig = {
  // Sem o prefixo "aulas-de-": o curso é um grupo, não uma aula de um instrumento.
  slug: "pratica-de-conjunto",
  instrumento: "Prática de Conjunto",
  nomeCurso: "Prática de Conjunto",
  breadcrumb: "Prática de conjunto",

  seo: {
    titulo: "Prática de Conjunto na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Prática de conjunto na Lapa, SP: forme uma banda e viva a dinâmica de um ensaio real. Agende aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "prática de conjunto na Lapa",
      "aula de prática de conjunto São Paulo",
      "tocar em banda Lapa",
      "aula de música em grupo Lapa",
      "ensaio de banda para alunos",
      "prática em grupo de música zona oeste",
      "aula experimental de prática de conjunto",
    ],
    ogImagem: "/og/pratica-de-conjunto.jpg",
    ogAlt: "Crianças e adultos tocando instrumentos de percussão sentados lado a lado em uma sala, com um piano de cauda ao fundo",
  },

  schema: {
    descricao:
      "Prática de conjunto em grupo: os alunos formam uma banda e aprendem, na prática, a ouvir os outros instrumentos, manter o ritmo em grupo e a dinâmica de um ensaio real, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "A definir na aula experimental",
    prerequisitos:
      "O professor orienta, na aula experimental, o nível necessário para entrar em um grupo.",
  },

  hero: {
    h1: "Prática de Conjunto na",
    texto:
      "Junte-se a outros alunos e forme uma banda! Aprenda na prática a ouvir os outros instrumentos, a manter o ritmo em grupo e a viver a dinâmica de um ensaio real, com o professor Rodrigo, no Estúdio Mara Passos.",
    imagem: "/images/pratica-conjunto.webp",
    posicao: "50% 45%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: Users, texto: "Prática em grupo" },
      { icone: Ear, texto: "Ouvir os outros instrumentos" },
      { icone: Music, texto: "Dinâmica de ensaio real" },
    ],
  },

  diferenciais: {
    titulo: "Por que tocar em grupo no Estúdio Mara Passos",
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
          "Rodrigo é licenciado em Música pela FPA, formado em Guitarra pela Fundação das Artes de São Caetano do Sul e ensina desde 2007, transitando por diferentes estilos musicais.",
      },
      {
        titulo: "Aprender a tocar junto",
        texto:
          "Em grupo você aprende, na prática, a ouvir os outros instrumentos e a manter o ritmo com os colegas.",
      },
      {
        titulo: "Um ensaio de verdade",
        texto:
          "A dinâmica é a de um ensaio real, em um ambiente acolhedor e sem a pressão de apresentações estressantes.",
      },
    ],
  },

  passosTitulo: "Como começar na prática de conjunto",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece o professor, visita as salas e conversa sobre o seu nível e o melhor grupo para você.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professor de prática de conjunto",
    intro:
      "Aulas conduzidas pelo professor Rodrigo, com vasta experiência no ensino musical e em diferentes estilos.",
    professores: [{ id: 5 }],
  },

  filosofia: {
    titulo: "Tocar junto, no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". Na prática de conjunto, você toca em grupo, no seu ritmo, com repertório do seu gosto e sem a pressão de apresentações estressantes.",
    beneficios: [
      { icone: Ear, texto: "Escuta ativa em grupo" },
      { icone: Sparkles, texto: "Repertório do seu gosto" },
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

  faqTitulo: "Perguntas frequentes sobre prática de conjunto",
  faq: [
    {
      pergunta: "O que é prática de conjunto?",
      resposta:
        "É tocar em grupo: você se junta a outros alunos, forma uma banda e aprende, na prática, a ouvir os outros instrumentos, a manter o ritmo em grupo e a dinâmica de um ensaio real.",
    },
    {
      pergunta: "A prática de conjunto é em grupo ou individual?",
      resposta:
        "É em grupo. A graça está em tocar junto com outros alunos.",
    },
    {
      pergunta: "Preciso saber tocar um instrumento para participar?",
      resposta:
        "Na aula experimental o professor conversa com você, avalia o seu nível e indica o melhor momento e o melhor grupo para você entrar.",
    },
    {
      pergunta: "Que instrumentos participam do grupo?",
      resposta:
        "Na aula experimental o professor explica como os grupos funcionam e como o seu instrumento se encaixa neles.",
    },
    {
      pergunta: "O que acontece em um ensaio?",
      resposta:
        "A dinâmica é a de um ensaio real: você aprende a ouvir os outros instrumentos e a manter o ritmo em grupo, no repertório do grupo.",
    },
    {
      pergunta: "Terei que me apresentar em público?",
      resposta:
        "O estúdio tem como princípio a aprendizagem sem a pressão de apresentações estressantes.",
    },
    {
      pergunta: "A partir de que idade posso participar?",
      resposta:
        "Na aula experimental o professor conversa com você, ou com a família, e avalia o melhor momento para começar.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece o professor, visita as salas e conversa sobre o seu nível e os seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "Onde ficam as aulas de prática de conjunto na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Prática de conjunto na Lapa, em São Paulo",
    intro: "Venha conhecer as salas e o professor antes de decidir.",
  },
};

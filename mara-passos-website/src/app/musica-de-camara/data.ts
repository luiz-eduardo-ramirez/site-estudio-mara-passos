import { Ear, HeartHandshake, MapPin, Music, Music2, Users } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /musica-de-camara. A estrutura vive em CoursePage (a mesma
 * das demais páginas de curso); aqui só o que é da música de câmara.
 *
 * O texto parte do que o site já afirma — descrição e categoria ("Prática em
 * Grupo") em src/data/instrumentsList.ts e a lista de cursos em
 * public/llm.txt — mais as regras da aula experimental do formulário. Por ser
 * prática em grupo, esta página pode dizer que é em grupo.
 *
 * As professoras do curso são a Mara e a Márcia (definido pelo estúdio; as bios
 * vêm de src/data/teachersList.ts e citam a formação em Piano Erudito, sem
 * falar de música de câmara, então o texto não promete experiência específica
 * com o repertório). O site não diz que nível ou instrumento é preciso ter,
 * nem a idade mínima: o FAQ remete isso à aula experimental.
 */
export const musicaCamara: CourseConfig = {
  // Sem o prefixo "aulas-de-": o curso é um grupo, não uma aula de um instrumento.
  slug: "musica-de-camara",
  instrumento: "Música de Câmara",
  nomeCurso: "Música de Câmara",
  breadcrumb: "Música de câmara",

  seo: {
    titulo: "Música de Câmara na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Música de câmara na Lapa, SP: toque peças clássicas em pequenos grupos e desenvolva a escuta ativa. Agende aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "música de câmara na Lapa",
      "aula de música de câmara São Paulo",
      "tocar em grupo música clássica Lapa",
      "música erudita em grupo zona oeste",
      "prática de música de câmara para alunos",
      "pequenos grupos de música clássica",
      "aula experimental de música de câmara",
    ],
    ogImagem: "/og/musica-de-camara.jpg",
    ogAlt: "Alunos sentados em um palco ao lado de uma pianista, com um jovem flautista em primeiro plano",
  },

  schema: {
    descricao:
      "Música de câmara em grupo: os alunos executam peças clássicas em pequenos grupos, desenvolvendo a escuta ativa e a sensibilidade de tocar em conjunto, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "A definir na aula experimental",
    prerequisitos:
      "As professoras orientam, na aula experimental, o nível necessário para entrar em um grupo.",
  },

  hero: {
    h1: "Música de Câmara na",
    texto:
      "A arte de tocar junto. Neste curso, unimos alunos para executar peças clássicas em pequenos grupos, desenvolvendo a escuta ativa e a sensibilidade de tocar em conjunto, com as professoras Mara e Márcia, no Estúdio Mara Passos.",
    imagem: "/images/musica-camara.webp",
    posicao: "50% 55%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: Users, texto: "Pequenos grupos" },
      { icone: Music2, texto: "Peças clássicas" },
      { icone: Ear, texto: "Escuta ativa" },
    ],
  },

  diferenciais: {
    titulo: "Por que tocar música de câmara no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/piano.webp",
      alt: "Sala de piano do estúdio",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Professoras com formação em piano erudito",
        texto:
          "Mara e Márcia são formadas em Piano Erudito pelo Conservatório Dramático e Musical de São Paulo, e você toca peças clássicas em pequenos grupos, ao lado de outros alunos.",
      },
      {
        titulo: "Escuta ativa",
        texto:
          "Tocar em conjunto desenvolve a escuta ativa: a atenção ao que os colegas estão tocando.",
      },
      {
        titulo: "A sensibilidade de tocar em conjunto",
        texto:
          "Um ambiente acolhedor, em que o foco é a musicalidade do grupo, sem a pressão de apresentações estressantes.",
      },
    ],
  },

  passosTitulo: "Como começar na música de câmara",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece as professoras, visita as salas e conversa sobre o seu nível e o melhor grupo para você.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professoras de música de câmara",
    intro:
      "Aulas conduzidas pelas professoras Mara e Márcia, com formação em piano erudito.",
    professores: [{ id: 1 }, { id: 7 }],
  },

  filosofia: {
    titulo: "Tocar junto, no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". Na música de câmara, você toca em grupo, no seu ritmo, com acolhimento e sem a pressão de apresentações estressantes.",
    beneficios: [
      { icone: Ear, texto: "Escuta ativa em grupo" },
      { icone: Music, texto: "Peças clássicas" },
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
      src: "/spaces/piano.webp",
      alt: "Sala de piano do estúdio",
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

  faqTitulo: "Perguntas frequentes sobre música de câmara",
  faq: [
    {
      pergunta: "O que é música de câmara?",
      resposta:
        "É a arte de tocar junto. Neste curso, unimos alunos para executar peças clássicas em pequenos grupos, desenvolvendo a escuta ativa e a sensibilidade de tocar em conjunto.",
    },
    {
      pergunta: "A música de câmara é em grupo ou individual?",
      resposta:
        "É em grupo. Você toca com outros alunos, em pequenos grupos.",
    },
    {
      pergunta: "Que peças eu vou tocar?",
      resposta:
        "Peças clássicas, executadas em pequenos grupos. Na aula experimental as professoras explicam como o repertório é montado.",
    },
    {
      pergunta: "Qual a diferença entre música de câmara e prática de conjunto?",
      resposta:
        "A música de câmara executa peças clássicas em pequenos grupos, com foco na escuta ativa. Já a prática de conjunto é o curso para formar uma banda e viver a dinâmica de um ensaio real.",
    },
    {
      pergunta: "Preciso saber tocar um instrumento para participar?",
      resposta:
        "Na aula experimental as professoras conversam com você, avaliam o seu nível e indicam o melhor momento e o melhor grupo para você entrar.",
    },
    {
      pergunta: "Que instrumentos participam dos grupos?",
      resposta:
        "Na aula experimental as professoras explicam como os grupos funcionam e como o seu instrumento se encaixa neles.",
    },
    {
      pergunta: "A partir de que idade posso participar?",
      resposta:
        "Na aula experimental as professoras conversam com você, ou com a família, e avaliam o melhor momento para começar.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece as professoras, visita as salas e conversa sobre o seu nível e os seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "Onde fica a música de câmara na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Música de câmara na Lapa, em São Paulo",
    intro: "Venha conhecer as salas e as professoras antes de decidir.",
  },
};

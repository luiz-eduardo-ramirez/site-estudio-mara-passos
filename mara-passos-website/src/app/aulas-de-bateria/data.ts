import { Activity, Drum, MapPin, Music, UserRound } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-bateria. A estrutura vive em CoursePage (a mesma
 * da página de piano); aqui só o que é da bateria.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts, biografia do professor em
 * src/data/teachersList.ts e as regras da aula experimental do formulário.
 */
export const bateria: CourseConfig = {
  slug: "aulas-de-bateria",
  instrumento: "Bateria",
  nomeCurso: "Aulas de Bateria",
  breadcrumb: "Aulas de bateria",

  seo: {
    titulo: "Aulas de Bateria na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de bateria na Lapa, São Paulo, com os professores Reinaldo e Rafael: coordenação, independência e leitura rítmica. Agende sua aula experimental gratuita.",
    keywords: [
      "aulas de bateria na Lapa",
      "aula de bateria São Paulo",
      "escola de bateria Lapa",
      "professor de bateria zona oeste",
      "aula de bateria para adultos",
      "aula de bateria infantil",
      "aula experimental de bateria",
    ],
    ogImagem: "/og/aulas-de-bateria.jpg",
    ogAlt: "Sala de instrumentos do Estúdio Mara Passos, com bateria, na Lapa, em São Paulo",
  },

  schema: {
    descricao:
      "Aulas individuais de bateria com foco em coordenação motora, independência dos membros e leitura rítmica, aplicadas a diversos estilos musicais, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso ter tocado antes.",
  },

  hero: {
    h1: "Aulas de Bateria na",
    texto:
      "Libere sua energia e desenvolva coordenação, independência dos membros e leitura rítmica. Aulas individuais com os professores Reinaldo e Rafael, no Estúdio Mara Passos.",
    imagem: "/spaces/instrumentos.webp",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: Activity, texto: "Coordenação e independência" },
      { icone: Music, texto: "Diversos estilos musicais" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender bateria no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/images/bateria.webp",
      alt: "Baterista tocando uma bateria completa, com pratos e tambores",
      posicao: "center 35%",
    },
    itens: [
      {
        titulo: "Professores com formação sólida",
        texto:
          "Reinaldo estudou na Escola Drum Tech, em Londres. Rafael é licenciado em Música pela UNESP e estudou bateria em escolas de samba.",
      },
      {
        titulo: "Independência, coordenação e leitura",
        texto:
          "Trabalhamos a independência dos membros, a coordenação motora e a leitura rítmica de forma lúdica, aplicadas em diversos estilos musicais.",
      },
      {
        titulo: "Aulas individuais",
        texto:
          "Foco total na sua técnica e no que você quer tocar. O professor se adapta ao seu ritmo.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de bateria",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece o professor, visita as salas e faz seu primeiro contato prático com a bateria.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professores de bateria",
    intro:
      "Aulas conduzidas por Reinaldo e Rafael, com formação sólida e o cuidado de quem ensina com acolhimento.",
    professores: [
      { id: 6, papel: "Professor de bateria" },
      { id: 3, papel: "Professor de bateria e percussão" },
    ],
  },

  filosofia: {
    titulo: "Bateria para todas as idades",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". Na bateria, você libera a energia, desenvolve a coordenação motora e aprende a manter o ritmo, sem a pressão de apresentações estressantes.",
    beneficios: [
      { icone: Activity, texto: "Coordenação motora" },
      { icone: Drum, texto: "Independência dos membros" },
      { icone: Music, texto: "Leitura rítmica" },
    ],
  },

  /*
   * Galeria enxuta, no mesmo padrão da página de piano: só os ambientes que
   * importam para quem procura aulas de bateria. Fotos 4:3 (5712×4284).
   */
  galeria: [
    {
      src: "/spaces/instrumentos.webp",
      alt: "Sala do estúdio com bateria e pratos, teclado e violões e guitarras pendurados na parede",
    },
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
      src: "/spaces/musicalizacao-1.webp",
      alt: "Sala de musicalização infantil com piso emborrachado colorido e instrumentos de percussão",
    },
    {
      src: "/spaces/certificados.webp",
      alt: "Parede com certificados e diplomas emoldurados da equipe do estúdio",
    },
  ],

  faqTitulo: "Perguntas frequentes sobre aulas de bateria",
  faq: [
    {
      pergunta: "Preciso ter uma bateria em casa para começar?",
      resposta:
        "Não. Nas aulas você toca na bateria do estúdio. Para estudar em casa, o professor orienta o que usar no início e, quando chegar a hora de comprar o seu instrumento, ajuda na escolha.",
    },
    {
      pergunta: "Nunca toquei nada. Posso começar a bateria do zero?",
      resposta:
        "Pode. As aulas partem do seu nível e do seu ritmo e trabalham coordenação, independência dos membros e leitura rítmica de forma lúdica, sem pressão por desempenho.",
    },
    {
      pergunta: "A partir de que idade as crianças podem fazer aula de bateria?",
      resposta:
        "A idade ideal para a bateria é a partir de aproximadamente 5 anos. Para os menores, temos aulas de musicalização a partir de 6 meses de idade.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece o professor, visita as salas, faz seu primeiro contato prático com a bateria e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de bateria são em grupo ou individuais?",
      resposta:
        "São individuais, com o professor concentrado na sua técnica e no que você quer tocar. Para tocar com outras pessoas, o estúdio também oferece o curso de Prática de Conjunto, no formato de banda.",
    },
    {
      pergunta: "Que estilos musicais posso tocar na bateria?",
      resposta:
        "Aplicamos a técnica em diversos estilos musicais, de acordo com o seu gosto. Na aula experimental conversamos sobre os seus objetivos para montar o caminho das aulas.",
    },
    {
      pergunta: "Onde ficam as aulas de bateria na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de bateria na Lapa, em São Paulo",
    intro: "Venha conhecer as salas, a bateria e os professores antes de decidir.",
  },
};

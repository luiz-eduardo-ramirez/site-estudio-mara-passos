import { Ear, HeartHandshake, MapPin, Sparkles, UserRound, Zap } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-guitarra. A estrutura vive em CoursePage (a mesma
 * das demais páginas de curso); aqui só o que é da guitarra.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts, biografias dos professores Rodrigo e Rafael em
 * src/data/teachersList.ts e a idade mínima (7 anos) em faqData.ts — mais as
 * regras da aula experimental do formulário.
 */
export const guitarra: CourseConfig = {
  slug: "aulas-de-guitarra",
  instrumento: "Guitarra",
  nomeCurso: "Aulas de Guitarra",
  breadcrumb: "Aulas de guitarra",

  seo: {
    titulo: "Aulas de Guitarra na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de guitarra na Lapa, SP, com os professores Rodrigo e Rafael: riffs, solos e bends. Agende sua aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de guitarra na Lapa",
      "aula de guitarra São Paulo",
      "escola de guitarra Lapa",
      "professor de guitarra zona oeste",
      "aula de guitarra para adultos",
      "aula de guitarra infantil",
      "aula experimental de guitarra",
    ],
    ogImagem: "/og/aulas-de-guitarra.jpg",
    ogAlt: "Guitarrista sorrindo com uma guitarra vermelha, ao lado de um baixista e de um baterista em uma sala de ensaio",
  },

  schema: {
    descricao:
      "Aulas individuais de guitarra com foco em palhetada, bends, solos, harmonia aplicada e na construção do próprio timbre, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso ter tocado antes.",
  },

  hero: {
    h1: "Aulas de Guitarra na",
    texto:
      "Das bases aos grandes solos: riffs, palhetada, bends e o timbre que é a sua cara. Aulas individuais com os professores Rodrigo e Rafael, no Estúdio Mara Passos.",
    imagem: "/images/guitarra.webp",
    posicao: "50% 40%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: Zap, texto: "Riffs, solos e bends" },
      { icone: Sparkles, texto: "Seu próprio timbre" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender guitarra no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/instrumentos.webp",
      alt: "Sala do estúdio com bateria, teclado e violões e guitarras pendurados na parede",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Professores com formação e experiência",
        texto:
          "Rodrigo é licenciado em Música pela FPA, formado em Guitarra pela Fundação das Artes de São Caetano do Sul e ensina desde 2007. Rafael é graduado em Licenciatura em Música pela UNESP e estudou Violão na EMESP.",
      },
      {
        titulo: "Do riff ao solo",
        texto:
          "Técnicas de palhetada, bends e harmonia aplicada, para você sair das bases e chegar aos solos com segurança.",
      },
      {
        titulo: "A sua identidade sonora",
        texto:
          "Você aprende a timbrar o instrumento e encontra o som que é seu, em estilos que vão do Jazz e da Música Brasileira ao Heavy Metal.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de guitarra",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece o professor, visita as salas e faz seu primeiro contato prático com a guitarra.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  equipe: {
    titulo: "Professores de guitarra",
    intro:
      "Aulas conduzidas pelos professores Rodrigo e Rafael, com ampla vivência em diferentes estilos musicais.",
    professores: [{ id: 5 }, { id: 3 }],
  },

  filosofia: {
    titulo: "Guitarra no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". Na guitarra, você aprende no seu ritmo, com repertório do seu gosto e sem a pressão de apresentações estressantes.",
    beneficios: [
      { icone: Ear, texto: "Desenvolvimento da escuta" },
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

  faqTitulo: "Perguntas frequentes sobre aulas de guitarra",
  faq: [
    {
      pergunta: "Preciso ter uma guitarra para começar?",
      resposta:
        "Você pode tirar essa dúvida na aula experimental: o professor orienta qual instrumento escolher e como começar, antes de você decidir comprar o seu.",
    },
    {
      pergunta: "Nunca toquei nada. Posso começar a guitarra do zero?",
      resposta:
        "Pode. As aulas partem do seu nível, sem pressão por desempenho, das bases até os solos.",
    },
    {
      pergunta: "Preciso saber violão antes de aprender guitarra?",
      resposta:
        "Não é preciso começar por outro instrumento. As aulas partem do seu nível, e o professor adapta o caminho ao que você já sabe, seja pouco ou muito.",
    },
    {
      pergunta: "Vou aprender só rock?",
      resposta:
        "Não. O professor Rodrigo transita por Jazz, Música Brasileira, Heavy Metal e outros estilos, e as aulas seguem o repertório que você quer tocar.",
    },
    {
      pergunta: "O que se aprende nas primeiras aulas?",
      resposta:
        "Os fundamentos do instrumento, como palhetada e harmonia aplicada, e depois bends, solos e a construção do seu timbre, sempre no estilo que você quer tocar.",
    },
    {
      pergunta: "Preciso de amplificador e pedais para começar?",
      resposta:
        "Para começar, o professor orienta na aula experimental o que você realmente precisa, antes de qualquer compra.",
    },
    {
      pergunta: "A partir de que idade a criança pode fazer aula de guitarra?",
      resposta:
        "Aconselhamos iniciar a partir dos 7 anos. Para crianças menores, a Musicalização Infantil é um ótimo primeiro passo.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece o professor, visita as salas, faz seu primeiro contato prático com a guitarra e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de guitarra são em grupo ou individuais?",
      resposta:
        "São individuais, com o professor concentrado na sua técnica, no seu ritmo e no repertório que você quer tocar.",
    },
    {
      pergunta: "Onde ficam as aulas de guitarra na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de guitarra na Lapa, em São Paulo",
    intro: "Venha conhecer as salas, a guitarra e os professores antes de decidir.",
  },
};

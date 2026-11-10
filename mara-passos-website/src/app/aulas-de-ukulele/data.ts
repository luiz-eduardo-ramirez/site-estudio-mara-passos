import { Ear, HeartHandshake, MapPin, Music, Smile, Sparkles, UserRound } from "lucide-react";
import type { CourseConfig } from "../../components/course/types";
import { ENDERECO, TELEFONE_EXIBIDO } from "../../data/studio";

/*
 * Conteúdo da página /aulas-de-ukulele. A estrutura vive em CoursePage (a mesma
 * das demais páginas de curso); aqui só o que é do ukelelê.
 *
 * O texto parte do que o site já afirma — descrição do curso em
 * src/data/instrumentsList.ts — mais as regras da aula experimental do
 * formulário. O ukelelê não tem professor cadastrado em teachersList.ts, então
 * `equipe` fica de fora: a página não mostra seção de professores nem inventa
 * biografia. O site também não fixa idade mínima, então o FAQ remete essa
 * pergunta à aula experimental.
 *
 * O slug usa a grafia "ukulele" (a mais buscada); o nome do curso no
 * formulário e no texto segue o do site: "Ukelelê".
 */
export const ukulele: CourseConfig = {
  slug: "aulas-de-ukulele",
  instrumento: "Ukelelê",
  nomeCurso: "Aulas de Ukelelê",
  breadcrumb: "Aulas de ukelelê",

  seo: {
    titulo: "Aulas de Ukulele na Lapa (SP) | Estúdio Mara Passos",
    descricao:
      "Aulas de ukulele (ukelelê) na Lapa, SP: acordes práticos e batidas variadas. Agende sua aula experimental gratuita no Estúdio Mara Passos.",
    keywords: [
      "aulas de ukulele na Lapa",
      "aulas de ukelelê",
      "aula de ukulele São Paulo",
      "escola de ukulele Lapa",
      "aula de ukulele para adultos",
      "aula de ukulele infantil",
      "aula experimental de ukulele",
    ],
    ogImagem: "/og/aulas-de-ukulele.jpg",
    ogAlt: "Aluno tocando ukelelê sentado em um banco, com outras crianças ao fundo, em uma sala com piano",
  },

  schema: {
    descricao:
      "Aulas de ukelelê com foco em acordes práticos, batidas variadas e em tocar as músicas favoritas do aluno, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
    nivel: "Todos os níveis",
    prerequisitos: "Nenhum. Não é preciso ter tocado antes.",
  },

  hero: {
    h1: "Aulas de Ukulele na",
    texto:
      "O instrumento certo para quem quer resultados rápidos e divertidos. Aprenda acordes práticos, batidas variadas e toque as suas músicas favoritas, no Estúdio Mara Passos.",
    imagem: "/images/ukelele.webp",
    posicao: "50% 55%",
    fatos: [
      { icone: MapPin, texto: "Presencial na Lapa" },
      { icone: UserRound, texto: "Aulas individuais" },
      { icone: Music, texto: "Acordes e batidas variadas" },
      { icone: Smile, texto: "Prático e divertido" },
    ],
  },

  diferenciais: {
    titulo: "Por que aprender ukulele no Estúdio Mara Passos",
    midia: {
      tipo: "imagem",
      src: "/spaces/instrumentos.webp",
      alt: "Sala do estúdio com bateria, teclado e violões e guitarras pendurados na parede",
      posicao: "center",
    },
    itens: [
      {
        titulo: "Prático, divertido e fácil de aprender",
        texto:
          "O ukelelê é o instrumento perfeito para quem quer resultados rápidos: você começa pelos acordes práticos e já toca de verdade nas primeiras aulas.",
      },
      {
        titulo: "Suas músicas favoritas",
        texto:
          "Com batidas variadas, o repertório é o que você gosta de ouvir. A ideia é tocar as suas músicas preferidas em poucas semanas.",
      },
      {
        titulo: "No seu ritmo, sem pressão",
        texto:
          "Um caminho que parte do seu nível e evolui no seu tempo, em um ambiente acolhedor e sem a pressão do desempenho perfeito.",
      },
    ],
  },

  passosTitulo: "Como começar suas aulas de ukulele",
  passos: [
    {
      titulo: "Peça seu horário",
      texto:
        "Preencha o formulário desta página ou chame no WhatsApp. Retornamos para combinar o melhor horário para você.",
    },
    {
      titulo: "Faça a aula experimental",
      texto:
        "Um encontro presencial de 30 a 45 minutos: você conhece o professor, visita as salas e faz seu primeiro contato prático com o ukelelê.",
    },
    {
      titulo: "Comece a evoluir",
      texto:
        "Seguindo com aulas individuais e currículo estruturado, com agenda e pagamentos no Portal do Aluno.",
    },
  ],

  filosofia: {
    titulo: "Ukulele no seu tempo",
    antes: "A alma do Estúdio Mara Passos é provar que",
    destaque: "a música é para todas as idades",
    depois:
      ". No ukelelê, você aprende no seu ritmo, com repertório do seu gosto e sem a pressão de apresentações estressantes.",
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

  faqTitulo: "Perguntas frequentes sobre aulas de ukulele",
  faq: [
    {
      pergunta: "Ukulele e ukelelê são a mesma coisa?",
      resposta:
        "Sim. São duas grafias do mesmo instrumento, de quatro cordas e som alegre. Aqui, as aulas são de ukelelê, e você também pode procurá-lo como ukulele.",
    },
    {
      pergunta: "Preciso ter um ukelelê para começar?",
      resposta:
        "Você pode tirar essa dúvida na aula experimental: o professor orienta qual instrumento escolher e como começar, antes de você decidir comprar o seu.",
    },
    {
      pergunta: "Nunca toquei nada. Posso começar o ukelelê do zero?",
      resposta:
        "Pode. As aulas partem do seu nível, sem pressão por desempenho, com acordes práticos desde o começo.",
    },
    {
      pergunta: "O ukelelê é fácil de aprender?",
      resposta:
        "É um instrumento prático, divertido e fácil de aprender, por isso é tão escolhido por quem quer resultados rápidos. Na aula experimental você faz o primeiro contato e vê na prática.",
    },
    {
      pergunta: "O que se aprende nas primeiras aulas?",
      resposta:
        "Acordes práticos e batidas variadas, aplicados nas músicas que você mais gosta de tocar.",
    },
    {
      pergunta: "A partir de que idade a criança pode fazer aula de ukulele?",
      resposta:
        "Na aula experimental o professor conversa com a família e avalia se a criança está pronta para o instrumento. Para os pequenos, a Musicalização Infantil é um ótimo primeiro passo.",
    },
    {
      pergunta: "Como funciona a aula experimental gratuita?",
      resposta:
        "É um encontro presencial de 30 a 45 minutos em que você conhece o professor, visita as salas, faz seu primeiro contato prático com o ukelelê e conversa sobre seus objetivos musicais. É sem compromisso.",
    },
    {
      pergunta: "Posso remarcar a aula experimental?",
      resposta:
        "Pode, avisando com pelo menos 24 horas de antecedência. Como o horário fica reservado exclusivamente para você, faltas sem aviso prévio não podem ser repostas.",
    },
    {
      pergunta: "As aulas de ukulele são em grupo ou individuais?",
      resposta:
        "São individuais, com o professor concentrado na sua técnica, no seu ritmo e no repertório que você quer tocar.",
    },
    {
      pergunta: "Onde ficam as aulas de ukulele na Lapa e como agendo?",
      resposta: `O estúdio fica na ${ENDERECO}. Para agendar, preencha o formulário desta página ou chame no WhatsApp ${TELEFONE_EXIBIDO}.`,
    },
  ],

  localizacao: {
    titulo: "Aulas de ukulele na Lapa, em São Paulo",
    intro: "Venha conhecer as salas, o ukelelê e o estúdio antes de decidir.",
  },
};

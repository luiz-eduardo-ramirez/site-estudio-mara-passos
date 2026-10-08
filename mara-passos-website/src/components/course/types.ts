import type { LucideIcon } from "lucide-react";

/**
 * Tudo o que muda de um curso para outro. A estrutura da página — herói,
 * diferenciais, passo a passo, equipe, portal, galeria, FAQ, localização e
 * formulário — mora em CoursePage; cada curso só entrega o conteúdo.
 *
 * Seções com `?` são opcionais e simplesmente não aparecem quando faltam: um
 * curso sem vídeos de alunos não ganha um carrossel vazio.
 */
export type CourseConfig = {
  /** Rota, sem barra: "aulas-de-piano". */
  slug: string;
  /** Valor do <select> do formulário: "Piano". */
  instrumento: string;
  /** Nome do curso no JSON-LD: "Aulas de Piano". */
  nomeCurso: string;
  /** Último item do breadcrumb: "Aulas de piano". */
  breadcrumb: string;

  seo: {
    titulo: string;
    descricao: string;
    keywords: string[];
    ogImagem: string;
    ogAlt: string;
  };

  schema: {
    descricao: string;
    nivel: string;
    prerequisitos: string;
  };

  hero: {
    /** Antes do destaque laranja "Lapa": "Aulas de Piano na". */
    h1: string;
    texto: string;
    imagem: string;
    /** Vídeo de fundo, só carregado em telas grandes. */
    video?: string;
    fatos: { icone: LucideIcon; texto: string }[];
  };

  diferenciais: {
    titulo: string;
    itens: { titulo: string; texto: string }[];
    midia:
      | { tipo: "youtube"; id: string; titulo: string }
      | { tipo: "imagem"; src: string; alt: string; posicao?: string };
  };

  passos: { titulo: string; texto: string }[];
  passosTitulo: string;

  equipe: {
    titulo: string;
    intro: string;
    /** `id` de src/data/teachersList.ts; o papel é como aparece neste curso. */
    professores: { id: number; papel: string }[];
  };

  filosofia: {
    titulo: string;
    antes: string;
    destaque: string;
    depois: string;
    beneficios: { icone: LucideIcon; texto: string }[];
  };

  videos?: {
    titulo: string;
    intro: string;
    itens: { src: string; poster: string }[];
    alt: string;
  };

  galeria: { src: string; alt: string }[];

  faq: { pergunta: string; resposta: string }[];
  faqTitulo: string;

  localizacao: { titulo: string; intro: string };
};

/**
 * Destinos da página /links (o "link na bio" do Instagram).
 * Fonte única de verdade: trocar um link é editar uma linha aqui.
 */

export const SITE_URL = "https://estudiomusicalmarapassos.com.br";

export const CONTACT = {
  phone: "+55 (11) 97240-5722",
  phoneHref: "tel:+5511972405722",
  email: "estudiomarapassos@gmail.com",
  emailHref: "mailto:estudiomarapassos@gmail.com",
  address: "R. Cuevas, 206 - Lapa, São Paulo",
  cnpj: "20.049.762/0001-90",
} as const;

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("R. Cuevas, 206 - Lapa, São Paulo");

export type IconName = "instagram" | "facebook" | "map";

export type LinkItem = {
  /** Identificador do destino; vira o utm_campaign do link. */
  slug: string;
  title: string;
  /** Linha de apoio em caixa alta sob o título. */
  subtitle: string;
  href: string;
  /** Miniatura à esquerda; quando ausente, o card usa `icon`. */
  thumb?: string;
  icon?: IconName;
  /**
   * Anexa UTM ao destino, para separar no analytics os cliques vindos do link
   * na bio. Só vale para domínios próprios: em redes sociais e no Google Maps
   * a URL limpa é mais confiável para abrir o aplicativo nativo no celular.
   */
  track: boolean;
};

export const PRIMARY_CTA = {
  slug: "agendamento",
  label: "Agendar Aula Experimental",
  href: `${SITE_URL}/#agendamentos`,
  track: true,
} as const;

export const LINKS: LinkItem[] = [
  {
    slug: "site",
    title: "Site Institucional",
    subtitle: "Cursos e professores",
    href: `${SITE_URL}/`,
    thumb: "/links/cards/cursos.webp",
    track: true,
  },
  {
    slug: "portal",
    title: "Portal do Aluno",
    subtitle: "Agenda · Pix · Frequência",
    href: "https://portal.estudiomusicalmarapassos.com.br/login",
    thumb: "/links/cards/portal.webp",
    track: true,
  },
  {
    slug: "instagram",
    title: "Instagram",
    subtitle: "@estudiomarapassos",
    href: "https://www.instagram.com/estudiomarapassos/",
    icon: "instagram",
    track: false,
  },
  {
    slug: "facebook",
    title: "Facebook",
    subtitle: "/estudiomarapassos",
    href: "https://www.facebook.com/estudiomarapassos",
    icon: "facebook",
    track: false,
  },
  {
    slug: "como-chegar",
    title: "Como chegar",
    subtitle: "R. Cuevas, 206 · Lapa",
    href: MAPS_URL,
    thumb: "/links/cards/fachada.webp",
    track: false,
  },
];

/**
 * URL final do card, com UTM já embutido quando `track` é verdadeiro.
 *
 * Antes isto apontava para uma rota /links/r/[slug] que redirecionava anexando
 * os parâmetros. Route Handlers, porém, são compilados como função Node, e o
 * @cloudflare/next-on-pages — que constrói este site no Cloudflare Pages —
 * recusa o build de qualquer rota que não rode no Edge Runtime. Como a função
 * roda em tempo de build, o resultado para o visitante é o mesmo, sem custo de
 * um salto extra e sem nenhuma rota dinâmica no projeto.
 */
export function hrefFor(item: { slug: string; href: string; track: boolean }) {
  if (!item.track) return item.href;

  // O construtor preserva o fragmento (#agendamentos) e põe a query antes dele
  const url = new URL(item.href);
  url.searchParams.set("utm_source", "linktree");
  url.searchParams.set("utm_medium", "bio");
  url.searchParams.set("utm_campaign", item.slug);
  return url.toString();
}

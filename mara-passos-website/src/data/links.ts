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
  /** Identificador usado na rota de redirecionamento /links/r/[slug]. */
  slug: string;
  title: string;
  /** Linha de apoio em caixa alta sob o título. */
  subtitle: string;
  href: string;
  /** Miniatura à esquerda; quando ausente, o card usa `icon`. */
  thumb?: string;
  icon?: IconName;
  /**
   * Passa pela rota /links/r/[slug] para anexar UTM e permitir medir o clique.
   * Só vale para destinos próprios: em redes sociais o link direto é mais
   * confiável para abrir o aplicativo nativo no celular.
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

/** Destinos que a rota /links/r/[slug] sabe resolver. */
export const TRACKED: Record<string, string> = Object.fromEntries(
  [...LINKS, PRIMARY_CTA]
    .filter((item) => item.track)
    .map((item) => [item.slug, item.href]),
);

/** Caminho que o card deve apontar: rota medida ou destino direto. */
export function hrefFor(item: { slug: string; href: string; track: boolean }) {
  return item.track ? `/links/r/${item.slug}` : item.href;
}

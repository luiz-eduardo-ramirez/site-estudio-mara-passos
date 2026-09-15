import { NextResponse } from "next/server";
import { SITE_URL, TRACKED } from "../../../../data/links";

/**
 * Redireciona os destinos próprios anexando UTM, para que os cliques vindos do
 * link na bio apareçam separados no analytics. Redes sociais e Google Maps não
 * passam por aqui: o link direto é mais confiável para abrir o app nativo.
 */
export function generateStaticParams() {
  return Object.keys(TRACKED).map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const target = TRACKED[slug];

  if (!target) {
    return NextResponse.redirect(SITE_URL, 307);
  }

  // O construtor preserva o fragmento (#agendamentos) e insere a query antes dele.
  const url = new URL(target);
  url.searchParams.set("utm_source", "linktree");
  url.searchParams.set("utm_medium", "bio");
  url.searchParams.set("utm_campaign", slug);

  return NextResponse.redirect(url.toString(), 307);
}

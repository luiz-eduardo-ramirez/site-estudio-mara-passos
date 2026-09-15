import type { Metadata } from "next";
import { playfair } from "../../lib/fonts";
import { LINKS } from "../../data/links";
import Backdrop from "../../components/links/Backdrop";
import ProfileHeader from "../../components/links/ProfileHeader";
import PrimaryCta from "../../components/links/PrimaryCta";
import LinkCard from "../../components/links/LinkCard";
import ContactFooter from "../../components/links/ContactFooter";

const DESCRIPTION =
  "Todos os canais do Estúdio Musical e Cultural Mara Passos num lugar só: agendamento de aula experimental, Portal do Aluno, redes sociais e como chegar.";

export const metadata: Metadata = {
  title: "Links | Estúdio Musical e Cultural Mara Passos",
  description: DESCRIPTION,
  alternates: { canonical: "/links" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/links",
    siteName: "Estúdio Musical e Cultural Mara Passos",
    title: "Estúdio Musical e Cultural Mara Passos",
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
};

// O cabeçalho consome os índices 0–4 na animação de entrada;
// o restante da página continua a partir daí.
const HEADER_STEPS = 5;

export default function LinksPage() {
  return (
    // lt-page carrega a Geist do layout e a variável da Playfair, e devolve a
    // raiz a 100% (o site usa 110%) — ver a regra em globals.css.
    <div
      className={`lt-page ${playfair.variable}`}
      style={{
        fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <Backdrop />
      <main
        id="main-content"
        className="mx-auto flex w-full max-w-[430px] flex-col px-5 pb-14 pt-16 sm:pt-20"
      >
        <ProfileHeader />

        <div className="mt-10">
          <PrimaryCta index={HEADER_STEPS} />
        </div>

        <nav aria-label="Links do estúdio" className="mt-4">
          <ul className="flex flex-col gap-3">
            {LINKS.map((item, i) => (
              <li key={item.slug}>
                <LinkCard item={item} index={HEADER_STEPS + 1 + i} />
              </li>
            ))}
          </ul>
        </nav>

        <ContactFooter index={HEADER_STEPS + 1 + LINKS.length} />
      </main>
    </div>
  );
}

import Image from "next/image";
import Icon, { Chevron } from "./Icons";
import { hrefFor, type LinkItem } from "../../data/links";

/**
 * Card horizontal: miniatura à esquerda sangrando até a borda, título em
 * Playfair e linha de apoio em caixa alta — a estrutura da referência visual,
 * vestida com a paleta da marca.
 *
 * O preenchimento é translúcido, e não um cinza sólido, porque o palco do
 * Backdrop foi clareado: um `#0f0f0f` fixo agora seria mais escuro que o fundo
 * e o card viraria um buraco. Em branco a 4,5% ele sobe junto com o palco,
 * qualquer que seja o nível de clareamento.
 */

/** Dissolve a miniatura no corpo do card sem depender da cor de trás. */
const FADE = "linear-gradient(to right, #000 58%, transparent)";

export default function LinkCard({
  item,
  index,
}: {
  item: LinkItem;
  index: number;
}) {
  return (
    <a
      href={hrefFor(item)}
      target="_blank"
      rel="noopener noreferrer"
      className="lt-rise-view group relative flex min-h-[86px] items-stretch overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-mara-orange/45 hover:bg-white/[0.08]"
      style={{ "--i": index } as React.CSSProperties}
    >
      {/* Sem miniatura não há o que dissolver nem o que segurar enquanto
          carrega: o ícone fica direto sobre o card, sem ladrilho próprio. */}
      <div
        className={`relative w-[88px] shrink-0 overflow-hidden ${
          item.thumb ? "bg-white/[0.05]" : ""
        }`}
        style={
          item.thumb ? { maskImage: FADE, WebkitMaskImage: FADE } : undefined
        }
      >
        {item.thumb ? (
          <Image
            src={item.thumb}
            alt=""
            fill
            sizes="88px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-mara-orange">
            <Icon name={item.icon ?? "map"} className="h-7 w-7" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-4">
        <div className="min-w-0">
          <h2 className="font-[family-name:var(--font-playfair)] text-[1.18rem] font-semibold leading-tight text-white">
            {item.title}
          </h2>
          <p className="mt-1.5 truncate text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-mara-orange">
            {item.subtitle}
          </p>
        </div>
        <Chevron className="ml-auto h-4 w-4 shrink-0 text-[#9ca3af] transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-mara-orange" />
      </div>
    </a>
  );
}

import Image from "next/image";
import Icon, { Chevron } from "./Icons";
import { hrefFor, type LinkItem } from "../../data/links";

/**
 * Card horizontal: miniatura à esquerda sangrando até a borda, título em
 * Playfair e linha de apoio em caixa alta — a estrutura da referência visual,
 * vestida com a paleta da marca.
 */
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
      className="lt-rise group relative flex min-h-[86px] items-stretch overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-mara-orange/45 hover:bg-mara-gray"
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className="relative w-[88px] shrink-0 overflow-hidden bg-mara-gray">
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
        {/* Funde a miniatura ao corpo do card */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-[#0f0f0f] transition-colors duration-300 group-hover:to-mara-gray"
        />
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-4">
        <div className="min-w-0">
          <h2 className="font-[family-name:var(--font-playfair)] text-[19px] font-semibold leading-tight text-white">
            {item.title}
          </h2>
          <p className="mt-1.5 truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-mara-orange">
            {item.subtitle}
          </p>
        </div>
        <Chevron className="ml-auto h-4 w-4 shrink-0 text-[#9ca3af] transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-mara-orange" />
      </div>
    </a>
  );
}

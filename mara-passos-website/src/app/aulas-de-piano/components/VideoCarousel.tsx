"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Video = { readonly src: string; readonly poster: string };

/**
 * Carrossel de vídeos de alunos.
 *
 * Mudanças em relação à versão anterior:
 *  - preload="none" + pôster: nenhum MP4 baixa antes do play. Isso substitui o
 *    IntersectionObserver que montava o src na mão (e deixava o card preto até
 *    lá);
 *  - tocar um vídeo pausa os outros — cinco áudios sobrepostos nunca são o que
 *    alguém quer;
 *  - as setas desativam nas pontas, em vez de aceitar o clique e não fazer nada;
 *  - cada vídeo tem nome acessível.
 */
export default function VideoCarousel({ videos }: { videos: readonly Video[] }) {
  const trilho = useRef<HTMLUListElement>(null);
  const players = useRef<(HTMLVideoElement | null)[]>([]);
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(true);

  const atualizarSetas = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    setPodeVoltar(el.scrollLeft > 4);
    setPodeAvancar(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    atualizarSetas();
    window.addEventListener("resize", atualizarSetas);
    return () => window.removeEventListener("resize", atualizarSetas);
  }, [atualizarSetas]);

  const rolar = (direcao: -1 | 1) => {
    const el = trilho.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const passo = card ? card.getBoundingClientRect().width + 24 : 320;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direcao * passo, behavior: reduzir ? "auto" : "smooth" });
  };

  const pausarOutros = (indice: number) => {
    players.current.forEach((player, i) => {
      if (i !== indice && player && !player.paused) player.pause();
    });
  };

  return (
    <div
      className="relative mx-auto max-w-[1400px] px-6"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Vídeos de alunos tocando piano"
    >
      <button
        type="button"
        onClick={() => rolar(-1)}
        disabled={!podeVoltar}
        aria-label="Ver vídeo anterior"
        className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-mara-orange disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-black/60 md:flex"
      >
        <ChevronLeft size={24} aria-hidden="true" />
      </button>

      <ul
        ref={trilho}
        onScroll={atualizarSetas}
        className="flex snap-x snap-mandatory items-center gap-4 overflow-x-auto pb-6 pt-2 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((video, i) => (
          <li
            key={video.src}
            className="relative aspect-[9/16] w-[260px] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-xl transition-colors hover:border-mara-orange/50 sm:w-[280px] md:w-[320px]"
          >
            <video
              ref={(el) => {
                players.current[i] = el;
              }}
              src={video.src}
              poster={video.poster}
              preload="none"
              controls
              playsInline
              onPlay={() => pausarOutros(i)}
              aria-label={`Aluno tocando piano no Estúdio Mara Passos, vídeo ${i + 1} de ${videos.length}`}
              className="video-player absolute inset-0 h-full w-full object-cover"
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => rolar(1)}
        disabled={!podeAvancar}
        aria-label="Ver próximo vídeo"
        className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-mara-orange disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-black/60 md:flex"
      >
        <ChevronRight size={24} aria-hidden="true" />
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Vídeo do YouTube sob demanda.
 *
 * O iframe direto carregava ~1 MB de JavaScript do YouTube e disparava cookies
 * de terceiros assim que a página abria, sem ninguém ter pedido o vídeo. Aqui
 * entra só a miniatura; o player (no domínio youtube-nocookie) é montado no
 * clique, já tocando.
 */
export default function YouTubeFacade({
  id,
  titulo,
}: {
  id: string;
  titulo: string;
}) {
  const [ativo, setAtivo] = useState(false);

  if (ativo) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={titulo}
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setAtivo(true)}
      aria-label={`Reproduzir vídeo: ${titulo}`}
      className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-mara-orange"
    >
      {/* Miniatura do próprio YouTube: só uma imagem, sem script de terceiros. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/10" />
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-mara-orange text-white shadow-[0_0_30px_rgba(242,101,34,0.5)] transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
        <Play className="ml-1" size={28} fill="currentColor" aria-hidden="true" />
      </span>
    </button>
  );
}

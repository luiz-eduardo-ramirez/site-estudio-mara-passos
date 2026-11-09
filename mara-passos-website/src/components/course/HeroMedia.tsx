"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Fundo do herói: imagem primeiro, vídeo depois.
 *
 * O hero-bg.mp4 (usado na página de piano) tem 16 MB. Antes ele era o próprio fundo, sem pôster, e entrava
 * para todo mundo — inclusive no 4G do celular e para quem pediu menos
 * movimento. Agora o fundo é a imagem (hero-bg.webp, 93 KB), marcada como priority para
 * ser o LCP, e o vídeo só entra por cima quando:
 *
 *   - o aparelho é capaz (4+ núcleos e 4+ GB de RAM quando informado), seja
 *     desktop ou celular — celulares antigos ficam com a imagem;
 *   - a conexão é 4g (quando informada) e sem economia de dados;
 *   - o sistema não pediu prefers-reduced-motion.
 *
 * Sem JS, ou em qualquer um desses casos, a imagem continua sendo o fundo — a
 * página nunca fica com um retângulo preto.
 */
export default function HeroMedia({
  imagem,
  video,
  posicao = "center",
}: {
  imagem: string;
  video?: string;
  posicao?: string;
}) {
  const [tocar, setTocar] = useState(false);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };

    // Aparelho capaz: 4+ núcleos e, onde o navegador informa, 4+ GB de RAM
    // (Safari/iOS não informa a memória; lá só valem os núcleos). Conexão
    // lenta (abaixo de 4g) ou economia de dados também ficam com a imagem.
    const aparelhoBom =
      (nav.hardwareConcurrency ?? 0) >= 4 &&
      (nav.deviceMemory === undefined || nav.deviceMemory >= 4);
    const conexaoBoa =
      !nav.connection?.saveData &&
      (nav.connection?.effectiveType === undefined || nav.connection.effectiveType === "4g");

    const avaliar = () =>
      setTocar(Boolean(video) && !semMovimento.matches && aparelhoBom && conexaoBoa);

    avaliar();
    semMovimento.addEventListener("change", avaliar);
    return () => semMovimento.removeEventListener("change", avaliar);
  }, [video]);

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Image
        src={imagem}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: posicao }}
      />
      {tocar && video && (
        <video
          src={video}
          poster={imagem}
          autoPlay
          loop
          muted
          playsInline
          tabIndex={-1}
          onCanPlay={() => setPronto(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            pronto ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      {/* Véu: garante contraste do texto branco sobre qualquer quadro do vídeo. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0a0a0a]" />
    </div>
  );
}

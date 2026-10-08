"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Fundo do herói: imagem primeiro, vídeo depois.
 *
 * O hero-bg.mp4 tem 16 MB. Antes ele era o próprio fundo, sem pôster, e entrava
 * para todo mundo — inclusive no 4G do celular e para quem pediu menos
 * movimento. Agora o fundo é o hero-bg.webp (93 KB), marcado como priority para
 * ser o LCP, e o vídeo só entra por cima quando:
 *
 *   - a tela é de tablet para cima (no celular o ganho visual não paga os 16 MB);
 *   - o sistema não pediu prefers-reduced-motion;
 *   - o navegador não está em modo de economia de dados.
 *
 * Sem JS, ou em qualquer um desses casos, a imagem continua sendo o fundo — a
 * página nunca fica com um retângulo preto.
 */
export default function HeroMedia() {
  const [tocar, setTocar] = useState(false);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    const telaGrande = window.matchMedia("(min-width: 768px)");
    const conexao = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;

    const avaliar = () =>
      setTocar(!semMovimento.matches && telaGrande.matches && !conexao?.saveData);

    avaliar();
    semMovimento.addEventListener("change", avaliar);
    telaGrande.addEventListener("change", avaliar);
    return () => {
      semMovimento.removeEventListener("change", avaliar);
      telaGrande.removeEventListener("change", avaliar);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Image
        src="/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {tocar && (
        <video
          src="/hero-bg.mp4"
          poster="/hero-bg.webp"
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

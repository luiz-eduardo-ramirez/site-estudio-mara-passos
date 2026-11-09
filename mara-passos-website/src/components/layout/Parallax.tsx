"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, usarMovimentoCompleto } from "../../lib/gsap";

/*
 * Parallax de imagem ligado à rolagem (ScrollTrigger com scrub).
 *
 * O wrapper recorta (overflow: hidden) e o conteúdo interno faz zoom
 * (zoom → 1) e desliza no eixo Y enquanto a seção cruza a tela, em ritmo
 * diferente do card ao redor — a profundidade "cinematográfica".
 *
 * - zoom: escala inicial (padrão 1.15);
 * - shift: deslocamento em % da altura do conteúdo (padrão 8, vai de -shift a +shift);
 * - invert: inverte o sentido do deslize (útil para lados opostos).
 *
 * Em prefers-reduced-motion e em telas < 768px (movimento completo desligado)
 * nada é criado: os filhos aparecem parados. O filho deve preencher o wrapper
 * (ex.: <Image fill>) — o wrapper herda className para receber posição/tamanho.
 */
type Props = {
  children: ReactNode;
  className?: string;
  zoom?: number;
  shift?: number;
  invert?: boolean;
  /** Para blocos que já nascem no topo da página (hero): o efeito começa em
      scroll 0, sem o "salto" de aplicar o zoom da metade do percurso. */
  desdeTopo?: boolean;
};

export default function Parallax({
  children,
  className,
  zoom = 1.15,
  shift = 8,
  invert = false,
  desdeTopo = false,
}: Props) {
  const raizRef = useRef<HTMLDivElement>(null);
  const internoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const raiz = raizRef.current;
      const interno = internoRef.current;
      if (!raiz || !interno || !usarMovimentoCompleto()) return;

      const sinal = invert ? -1 : 1;
      gsap.fromTo(
        interno,
        { scale: zoom, yPercent: -shift * sinal },
        {
          scale: 1,
          yPercent: shift * sinal,
          ease: "none",
          scrollTrigger: {
            trigger: raiz,
            start: desdeTopo ? "top top" : "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: raizRef, dependencies: [zoom, shift, invert, desdeTopo] },
  );

  return (
    // "relative" só se quem chama não definiu o posicionamento: relative junto de
    // absolute/inset-0 vencia no CSS e zerava a altura (fundo do hero sumia).
    <div
      ref={raizRef}
      className={`${/\b(absolute|fixed|sticky|relative)\b/.test(className ?? "") ? "" : "relative"} overflow-hidden ${className ?? ""}`}
    >
      <div ref={internoRef} className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}

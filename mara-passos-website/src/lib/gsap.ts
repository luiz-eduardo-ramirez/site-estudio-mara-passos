"use client";

/*
 * Ponto único de entrada do GSAP no site.
 *
 * Todo componente que anima puxa o gsap daqui — nunca de "gsap" direto — para
 * manter um só lugar de configuração. Usamos o núcleo, o hook useGSAP (limpeza
 * automática no unmount, inclusive no StrictMode do React 19) e dois plugins:
 *
 * - SplitText: divide títulos em linhas para as entradas cinematográficas;
 * - ScrollTrigger: só para efeitos que acompanham a rolagem (parallax/zoom).
 *   As reveals de entrada continuam no IntersectionObserver (ver Reveal.tsx).
 *
 * A Lenis interpola o scrollTop real, então o ScrollTrigger funciona sem
 * sincronização extra.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export { gsap, useGSAP, ScrollTrigger, SplitText };

let temporizador: ReturnType<typeof setTimeout> | undefined;

/**
 * Recalcula as posições do ScrollTrigger (com debounce). A home monta seções por
 * next/dynamic depois da primeira pintura e cada uma empurra as outras; sem
 * refresh, gatilhos de scrub criados cedo ficam defasados.
 */
export function refreshScroll(): void {
  if (typeof window === "undefined") return;
  clearTimeout(temporizador);
  temporizador = setTimeout(() => ScrollTrigger.refresh(), 150);
}

/**
 * true só quando há espaço e permissão para movimento pleno: sem
 * prefers-reduced-motion e em telas >= 768px. Chamar apenas dentro de
 * useGSAP/efeitos (usa window).
 */
export function usarMovimentoCompleto(): boolean {
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    window.matchMedia("(min-width: 768px)").matches
  );
}

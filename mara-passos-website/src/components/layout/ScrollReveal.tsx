"use client";

import Reveal from "./Reveal";

/*
 * Mantido como nome histórico usado no page.tsx. Agora é só um atalho para o
 * <Reveal> (GSAP + ScrollTrigger) — a animação de entrada padrão das seções.
 */
export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  return <Reveal>{children}</Reveal>;
}

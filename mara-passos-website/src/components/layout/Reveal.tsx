"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE, REVEAL } from "../../lib/motion";

/*
 * Reveal por rolagem, feito com GSAP + ScrollTrigger. Substitui o antigo
 * componente do Framer Motion (whileInView) e é a base da animação de entrada
 * de todas as seções.
 *
 * Como usar:
 * - <Reveal> ... </Reveal>                → a caixa inteira sobe e aparece;
 * - <Reveal stagger> ...filhos... </Reveal> → cada filho direto entra em
 *   sequência (para grades e listas curtas, até ~8 itens);
 * - x / y controlam a direção (ex.: x={-40} desliza da esquerda).
 *
 * Acessibilidade: tudo roda dentro de um gsap.matchMedia. Quem pediu
 * prefers-reduced-motion não dispara nenhum from(), então o conteúdo já nasce
 * no estado final, visível — nada de texto preso em opacity:0. O useGSAP cuida
 * da limpeza (ScrollTriggers e matchMedia) no unmount, inclusive no StrictMode
 * do React 19.
 *
 * O from() é criado dentro do useGSAP (useLayoutEffect), então o opacity:0
 * inicial é aplicado antes da pintura — sem piscada.
 */
type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Deslocamento vertical inicial, em px. Padrão: REVEAL.y. */
  y?: number;
  /** Deslocamento horizontal inicial, em px. Padrão: 0. */
  x?: number;
  /** Anima cada filho direto em sequência, em vez da caixa inteira. */
  stagger?: boolean;
  /** Ponto de disparo do ScrollTrigger. Padrão: REVEAL.start. */
  start?: string;
  id?: string;
};

export default function Reveal({
  children,
  className,
  as: Tag = "div",
  y = REVEAL.y,
  x = 0,
  stagger = false,
  start = REVEAL.start,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const escopo = ref.current;
        if (!escopo) return;
        const alvos = stagger ? escopo.children : escopo;
        gsap.from(alvos, {
          opacity: 0,
          y,
          x,
          duration: DUR.base,
          ease: EASE.out,
          stagger: stagger ? REVEAL.stagger : 0,
          scrollTrigger: { trigger: escopo, start, once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

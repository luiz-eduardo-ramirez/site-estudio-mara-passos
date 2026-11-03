"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { DUR, EASE, REVEAL } from "../../lib/motion";

/*
 * Reveal por rolagem — anima a entrada das seções com GSAP, disparado por um
 * IntersectionObserver.
 *
 * Por que IntersectionObserver e não ScrollTrigger: o observer reage à
 * interseção REAL do elemento com a viewport, sem depender de posições de
 * "start" calculadas. Isso é à prova das situações que deixavam seções presas
 * invisíveis — a home monta várias seções por next/dynamic depois da primeira
 * pintura, e cada uma empurra as outras; com posições calculadas, um gatilho
 * criado cedo ficava defasado e não disparava. Com o observer, não há posição a
 * recalcular: quando a seção aparece, ela anima. Ponto.
 *
 * Uso:
 * - <Reveal> ... </Reveal>                → a caixa inteira sobe e aparece;
 * - <Reveal stagger> ...filhos... </Reveal> → cada filho direto entra em
 *   sequência (grades e listas curtas);
 * - x / y controlam a direção (ex.: x={-40} desliza da esquerda);
 * - scale={0.9} dá um leve "pop" (a caixa cresce até 1);
 * - clip faz uma revelação por máscara (wipe da esquerda para a direita);
 * - ease troca a curva (ex.: "back.out(1.4)" para um assentar com overshoot).
 *
 * Acessibilidade: em prefers-reduced-motion o efeito nem começa — o conteúdo
 * nasce visível, sem opacity:0 preso. O estado inicial é aplicado dentro do
 * useGSAP (useLayoutEffect), antes da pintura, então não há piscada; e como só
 * o JS aplica o opacity:0, sem JS (ou para crawlers) o conteúdo aparece normal.
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
  /** Acrescenta um leve desfoque que limpa na entrada — toque premium.
      Opt-in: evite em caixas muito grandes, pois animar blur é mais caro. */
  blur?: boolean;
  /** Escala inicial (cresce até 1). Ex.: 0.9 para um leve "pop". Padrão: 1. */
  scale?: number;
  /** Revelação por máscara: a caixa surge num wipe da esquerda para a direita. */
  clip?: boolean;
  /** Troca a curva de saída. Padrão: EASE.out. */
  ease?: string;
  id?: string;
};

export default function Reveal({
  children,
  className,
  as: Tag = "div",
  y = REVEAL.y,
  x = 0,
  stagger = false,
  blur = false,
  scale = 1,
  clip = false,
  ease,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const alvos: Element[] = stagger ? Array.from(el.children) : [el];
      if (alvos.length === 0) return;

      gsap.set(alvos, {
        opacity: 0,
        y,
        x,
        scale,
        ...(blur ? { filter: "blur(10px)" } : {}),
        ...(clip ? { clipPath: "inset(0 100% 0 0)" } : {}),
      });

      let revelado = false;
      const revelar = () => {
        if (revelado) return;
        revelado = true;
        gsap.to(alvos, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          ...(blur ? { filter: "blur(0px)" } : {}),
          ...(clip ? { clipPath: "inset(0 0% 0 0)" } : {}),
          duration: DUR.base,
          ease: ease ?? EASE.out,
          stagger: stagger ? REVEAL.stagger : 0,
          overwrite: true,
          // Limpa filter/clip ao fim para não deixar camadas de composição à toa.
          onComplete:
            blur || clip
              ? () => gsap.set(alvos, { clearProps: `${blur ? "filter," : ""}${clip ? "clipPath" : ""}` })
              : undefined,
        });
      };

      const observador = new IntersectionObserver(
        (entradas) => {
          for (const entrada of entradas) {
            if (entrada.isIntersecting) {
              revelar();
              observador.disconnect();
              break;
            }
          }
        },
        // Dispara um pouco antes de a seção chegar à borda inferior (lê como fade).
        { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
      );
      observador.observe(el);

      return () => observador.disconnect();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

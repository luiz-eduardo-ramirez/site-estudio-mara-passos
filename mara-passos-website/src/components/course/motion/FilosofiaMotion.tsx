"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, refreshScroll } from "../../../lib/gsap";
import { SCRUB } from "../../../lib/motion";

/*
 * Filosofia em tipografia cinética, presa à rolagem (scrub).
 *
 * - O parágrafo se acende palavra por palavra (18% → 100%) conforme a pessoa
 *   rola; "a música é para todas as idades" chega em laranja por último;
 * - o ícone gira e cresce até o lugar; os benefícios chegam das laterais e se
 *   encontram;
 * - só no desktop: duas linhas gigantes de texto vazado deslizam em sentidos
 *   opostos ao fundo e um halo laranja cresce atrás do conteúdo.
 *
 * O markup vem de CoursePage (server component) como `children`; aqui só o
 * movimento, ligado por data-fil="texto" | "icone" | "beneficios" | "fundo-a" |
 * "fundo-b" | "halo". Sob prefers-reduced-motion nada é criado e a seção fica
 * estática e legível. O SplitText mantém o parágrafo acessível (aria-label).
 */
export default function FilosofiaMotion({
  children,
  className,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  labelledBy: string;
}) {
  const raizRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const raiz = raizRef.current;
      if (!raiz) return;
      const achar = (nome: string) => raiz.querySelector<HTMLElement>(`[data-fil="${nome}"]`);

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const texto = achar("texto");
        const icone = achar("icone");
        const beneficios = achar("beneficios");

        if (texto) {
          SplitText.create(texto, {
            type: "words",
            autoSplit: true,
            // Devolver a animação deixa o SplitText refazê-la se o texto reflui.
            onSplit: (self) =>
              gsap.fromTo(
                self.words,
                { opacity: 0.18 },
                {
                  opacity: 1,
                  ease: "none",
                  stagger: 0.1,
                  scrollTrigger: { trigger: texto, start: "top 82%", end: "bottom 48%", scrub: SCRUB.suave },
                },
              ),
          });
        }

        if (icone) {
          gsap.fromTo(
            icone,
            { rotate: -120, scale: 0.4, opacity: 0.2 },
            {
              rotate: 0,
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: icone, start: "top 92%", end: "top 55%", scrub: SCRUB.suave },
            },
          );
        }

        if (beneficios && beneficios.children.length) {
          const itens = Array.from(beneficios.children);
          const ultimo = itens.length - 1;
          gsap.fromTo(
            itens,
            {
              opacity: 0,
              x: (i: number) => (i === 0 ? -60 : i === ultimo ? 60 : 0),
              y: (i: number) => (i === 0 || i === ultimo ? 0 : 40),
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: { trigger: beneficios, start: "top 94%", end: "top 62%", scrub: SCRUB.suave },
            },
          );
        }
      });

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const fundoA = achar("fundo-a");
        const fundoB = achar("fundo-b");
        const halo = achar("halo");
        const gatilho = { trigger: raiz, start: "top bottom", end: "bottom top", scrub: SCRUB.fundo };

        // As linhas são bem mais largas que a tela: o intervalo nunca deixa uma ponta à mostra.
        if (fundoA) gsap.fromTo(fundoA, { xPercent: -5 }, { xPercent: -35, ease: "none", scrollTrigger: gatilho });
        if (fundoB) gsap.fromTo(fundoB, { xPercent: -35 }, { xPercent: -5, ease: "none", scrollTrigger: gatilho });
        if (halo) {
          gsap.fromTo(halo, { scale: 0.6, opacity: 0.35 }, { scale: 1.15, opacity: 1, ease: "none", scrollTrigger: gatilho });
        }
      });

      refreshScroll();
    },
    { scope: raizRef },
  );

  return (
    <section ref={raizRef} aria-labelledby={labelledBy} className={className}>
      {children}
    </section>
  );
}

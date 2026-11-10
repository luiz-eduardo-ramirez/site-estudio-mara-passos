"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger, refreshScroll } from "../../../lib/gsap";
import { SCRUB } from "../../../lib/motion";

/*
 * Passo a passo como uma pauta musical.
 *
 * Cinco linhas de pentagrama correm acima dos cartões; uma nota (♪) percorre a
 * pauta conforme a pessoa rola a página, acendendo a linha por onde passou. Cada
 * cartão tem um anel no número que se preenche à medida que a nota se aproxima e
 * "acende" (borda, brilho, número cheio) quando ela pousa no centro dele.
 *
 * Este componente só cuida do movimento. A estrutura dos cartões vem de
 * CoursePage (server component) como `children` e é encontrada por atributos:
 *   [data-passo]          cada <li>; recebe data-ativo="true" quando aceso;
 *   [data-passo-cartao]   o cartão (fica a 50% de opacidade até acender);
 *   [data-passo-numero]   o círculo do número (dá um "pop" ao acender);
 *   [data-passo-aro]      o <circle> do anel que se preenche.
 *
 * Só em telas >= 768px e sem prefers-reduced-motion: fora disso nada é criado e
 * os cartões aparecem como sempre (a pauta some no mobile e no reduced-motion).
 * Tudo é revertido pelo gsap.matchMedia ao mudar a condição ou desmontar.
 */
const limitar = gsap.utils.clamp(0, 1);

export default function PassosMotion({ children }: { children: ReactNode }) {
  const raizRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const raiz = raizRef.current;
      if (!raiz) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const base = raiz.querySelector<HTMLElement>("[data-pauta-base]");
        const acesa = raiz.querySelector<HTMLElement>("[data-pauta-acesa]");
        const nota = raiz.querySelector<HTMLElement>("[data-pauta-nota]");

        const passos = Array.from(raiz.querySelectorAll<HTMLElement>("[data-passo]")).map((el) => {
          const aro = el.querySelector<SVGCircleElement>("[data-passo-aro]");
          return {
            el,
            aro,
            cartao: el.querySelector<HTMLElement>("[data-passo-cartao]"),
            numero: el.querySelector<HTMLElement>("[data-passo-numero]"),
            circunferencia: aro?.getTotalLength() ?? 0,
            centro: 0,
            meia: 1,
            aceso: false,
          };
        });
        if (!base || !acesa || !nota || passos.length === 0) return;

        // Posição horizontal de cada cartão, relativa à raiz (que é o offsetParent).
        const medir = () => {
          for (const p of passos) {
            p.meia = p.el.offsetWidth / 2;
            p.centro = p.el.offsetLeft + p.meia;
          }
        };
        medir();
        ScrollTrigger.addEventListener("refreshInit", medir);

        gsap.set(nota, { opacity: 0, xPercent: -50, yPercent: -50 });
        gsap.set(base, { clipPath: "inset(0 100% 0 0)" });
        gsap.set(acesa, { clipPath: "inset(0 100% 0 0)" });
        for (const p of passos) {
          if (p.cartao) gsap.set(p.cartao, { opacity: 0.5 });
          if (p.aro) {
            p.aro.style.strokeDasharray = String(p.circunferencia);
            p.aro.style.strokeDashoffset = String(p.circunferencia);
          }
        }

        const estado = { p: 0 };
        const desenhar = () => {
          const x = estado.p * raiz.clientWidth;
          gsap.set(nota, { x, y: Math.sin(estado.p * Math.PI * 6) * 14, opacity: limitar(estado.p * 25) });
          gsap.set(acesa, { clipPath: `inset(0 ${(1 - estado.p) * 100}% 0 0)` });

          for (const p of passos) {
            // O anel completa quando a nota chega ao centro do cartão.
            const r = limitar((x - (p.centro - p.meia)) / p.meia);
            if (p.aro) p.aro.style.strokeDashoffset = String(p.circunferencia * (1 - r));

            const aceso = r >= 1;
            if (aceso === p.aceso) continue;
            p.aceso = aceso;
            p.el.dataset.ativo = String(aceso);
            if (p.cartao) gsap.to(p.cartao, { opacity: aceso ? 1 : 0.5, duration: 0.4, overwrite: true });
            if (aceso && p.numero) {
              gsap.fromTo(
                p.numero,
                { scale: 1.3 },
                { scale: 1, duration: 0.55, ease: "back.out(2.5)", overwrite: true },
              );
            }
          }
        };

        // A pauta se desenha ao entrar na tela…
        gsap.to(base, {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: { trigger: raiz, start: "top 90%", end: "top 62%", scrub: SCRUB.suave },
        });
        // …e a nota a percorre enquanto a seção cruza a tela.
        gsap.to(estado, {
          p: 1,
          ease: "none",
          onUpdate: desenhar,
          scrollTrigger: { trigger: raiz, start: "top 78%", end: "bottom 38%", scrub: SCRUB.suave },
        });
        desenhar();
        refreshScroll();

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", medir);
          for (const p of passos) {
            delete p.el.dataset.ativo;
            if (p.aro) {
              p.aro.style.strokeDasharray = "";
              p.aro.style.strokeDashoffset = "";
            }
          }
        };
      });
    },
    { scope: raizRef },
  );

  return (
    <div ref={raizRef} className="relative">
      {/* Pauta (só desktop, e só com movimento permitido). Decorativa. */}
      <div aria-hidden="true" className="relative mb-6 hidden h-24 md:block motion-reduce:hidden">
        <div data-pauta-base className="absolute inset-0 text-white/15">
          <Pentagrama />
        </div>
        <div data-pauta-acesa className="absolute inset-0 text-mara-orange">
          <Pentagrama />
        </div>
        <span
          data-pauta-nota
          className="absolute left-0 top-1/2 text-4xl leading-none text-mara-orange drop-shadow-[0_0_14px_rgba(242,101,34,0.8)]"
        >
          ♪
        </span>
      </div>
      {children}
    </div>
  );
}

/** Cinco linhas e as barras de compasso entre os três cartões. */
function Pentagrama() {
  return (
    <svg viewBox="0 0 1000 48" preserveAspectRatio="none" className="absolute inset-x-0 top-1/2 h-12 w-full -translate-y-1/2">
      {[4, 14, 24, 34, 44].map((y) => (
        <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      ))}
      {[333, 667, 1000].map((x) => (
        <line key={x} x1={x} x2={x} y1="4" y2="44" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

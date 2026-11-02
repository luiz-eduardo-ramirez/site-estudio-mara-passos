"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "../../lib/gsap";
import { EASE } from "../../lib/motion";

/*
 * Transição entre páginas: uma cortina sólida da cor da marca que varre a tela
 * de baixo para cima a cada troca de rota.
 *
 * Como funciona, no App Router:
 *  1. Um ouvinte de clique (fase de captura) pega links internos para OUTRA
 *     página. Cancela a navegação nativa, sobe a cortina cobrindo a tela e só
 *     então faz o router.push — assim o carregamento da página nova fica
 *     escondido atrás da cortina.
 *  2. Quando o pathname muda (página nova já montada), a cortina sai por cima,
 *     revelando o conteúdo, e o foco vai para #main-content.
 *
 * Cuidados:
 *  - Âncoras na mesma página (#instrumentos etc.) NÃO entram aqui — continuam
 *    com a AncorasSuaves (rolagem suave). Só pathname diferente vira transição.
 *  - stopPropagation no clique de link entre páginas evita que um onClick de
 *    bubble (ex.: o closeModal do card de curso) dispare um segundo push e
 *    atropele a navegação. O travamento de scroll do modal é desfeito sozinho
 *    quando o componente antigo desmonta na troca de rota.
 *  - prefers-reduced-motion: sem cortina — navegação direta.
 *  - Voltar/avançar no navegador (sem clique nosso) não anima a cortina: não
 *    houve cobertura, então apenas reposiciona o foco.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const cortinaRef = useRef<HTMLDivElement>(null);

  // true enquanto uma transição iniciada por clique está em curso (cortina no ar)
  const cobrindo = useRef(false);
  // pula a primeira montagem (não revela cortina no carregamento inicial)
  const primeira = useRef(true);

  useEffect(() => {
    const prefereMenosMovimento = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const aoClicar = (evento: MouseEvent) => {
      if (evento.defaultPrevented || evento.button !== 0) return;
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;

      const origem = evento.target;
      if (!(origem instanceof Element)) return;

      const ancora = origem.closest("a[href]");
      if (!(ancora instanceof HTMLAnchorElement)) return;
      if (ancora.target === "_blank" || ancora.hasAttribute("download")) return;

      const destino = new URL(ancora.href, window.location.href);
      const atual = new URL(window.location.href);
      if (destino.origin !== atual.origin) return;

      // Só transiciona entre páginas diferentes. Mesma página (só âncora/busca)
      // fica para a AncorasSuaves.
      if (destino.pathname === atual.pathname) return;

      evento.preventDefault();
      evento.stopPropagation();
      if (cobrindo.current) return;

      const href = destino.pathname + destino.search + destino.hash;
      const cortina = cortinaRef.current;

      if (prefereMenosMovimento() || !cortina) {
        router.push(href);
        return;
      }

      cobrindo.current = true;
      gsap.set(cortina, { yPercent: 100, pointerEvents: "auto" });
      gsap.to(cortina, {
        yPercent: 0,
        duration: 0.4,
        ease: EASE.inOut,
        onComplete: () => router.push(href),
      });
    };

    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, [router]);

  useEffect(() => {
    if (primeira.current) {
      primeira.current = false;
      return;
    }

    // Página nova montada: devolve o foco ao conteúdo principal (leitor de tela).
    const main = document.getElementById("main-content");
    main?.focus({ preventScroll: true });

    const cortina = cortinaRef.current;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Sem cobertura (voltar/avançar, navegação programática) não há o que revelar.
    if (!cobrindo.current || !cortina || reduz) {
      cobrindo.current = false;
      return;
    }

    gsap.to(cortina, {
      yPercent: -100,
      duration: 0.5,
      ease: EASE.inOut,
      onComplete: () => {
        gsap.set(cortina, { yPercent: 100, pointerEvents: "none" });
        cobrindo.current = false;
      },
    });
  }, [pathname]);

  return (
    <div
      ref={cortinaRef}
      aria-hidden
      className="fixed inset-0 z-[10000] bg-mara-orange pointer-events-none"
      style={{ transform: "translateY(100%)" }}
    />
  );
}

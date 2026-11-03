"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "./gsap";

/*
 * Presença animada com GSAP — o que o AnimatePresence do Framer Motion fazia.
 *
 * O GSAP não segura o unmount do React: se o nó some, a animação de saída não
 * acontece. Este hook resolve isso mantendo o elemento montado durante a saída
 * e só o desmontando quando o tween termina.
 *
 * Uso:
 *   const { montado, ref } = useGsapPresence(aberto, {
 *     entrar: (el) => gsap.from(el, { opacity: 0, ... }),
 *     sair:   (el, pronto) => gsap.to(el, { opacity: 0, onComplete: pronto }),
 *   });
 *   return montado ? <div ref={ref}>...</div> : null;
 *
 * - `entrar` recebe o elemento raiz; crie o tween/timeline de entrada.
 * - `sair` recebe o elemento e um callback `pronto`: chame-o quando a saída
 *   acabar (geralmente em onComplete) para liberar o unmount.
 * - prefers-reduced-motion: sem animação — entra visível na hora e sai no mesmo
 *   quadro (sem tween), mantendo a montagem/desmontagem correta.
 * - O useGSAP cuida da limpeza dos tweens no unmount (inclusive StrictMode).
 */
type Animacoes<T extends HTMLElement> = {
  entrar: (el: T) => void;
  sair: (el: T, pronto: () => void) => void;
};

export function useGsapPresence<T extends HTMLElement>(
  aberto: boolean,
  animacoes: Animacoes<T>,
) {
  const [montado, setMontado] = useState(aberto);
  const ref = useRef<T>(null);

  // Abrir monta o elemento; fechar deixa o efeito tocar a saída antes de tirar.
  useEffect(() => {
    if (aberto) setMontado(true);
  }, [aberto]);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (aberto) {
        if (!reduz) animacoes.entrar(el);
      } else if (montado) {
        if (reduz) {
          setMontado(false);
          return;
        }
        animacoes.sair(el, () => setMontado(false));
      }
    },
    { dependencies: [aberto, montado], scope: ref },
  );

  return { montado, ref } as const;
}

export { gsap };

"use client";

import { useEffect } from "react";

/**
 * Leva a página até a âncora que já vem na URL — #agendamentos vindo do link na
 * bio, do Instagram ou de uma aba antiga — e a segura lá enquanto o layout
 * assenta.
 *
 * O salto nativo do navegador não dá conta desta home: são onze seções com
 * imagens, carrosséis e animações de entrada, e o salto acontece bem antes de
 * tudo isso assentar. A posição final da âncora só existe depois; o navegador
 * mira na posição que ela tinha no início do carregamento.
 *
 * Medido em produção: o visitante parava no rodapé (desktop, cache frio) ou não
 * saía do topo (celular). Aqui o salto é imediato e se repete a cada quadro
 * enquanto o alvo ainda estiver se mexendo. A primeira rolagem do visitante
 * encerra a correção: se ele decidiu ir para outro lugar, a página não o traz
 * de volta à força.
 *
 * A correção é instantânea de propósito, e é por isso que ela usa scrollTo em
 * vez da Lenis: não há nada para animar num destino que ainda está mudando de
 * lugar. A Lenis não briga por isso — parada, ela apenas acompanha a posição
 * real da página e assume de onde esta rotina parou.
 *
 * Vale só para a âncora presente na URL ao montar. Cliques em links internos
 * são tratados pelo SmoothScroll, que os rola com a mesma animação da roda do
 * mouse.
 */

/** Teto de segurança: passado isso a página é do visitante, esteja como estiver. */
const LIMITE_MS = 4000;

/** Quadros seguidos com o alvo parado que bastam para dar o layout por pronto. */
const QUADROS_ESTAVEIS = 6;

export default function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const raiz = document.documentElement;

    let quadro = 0;
    let parada = 0;
    let anterior = -1;
    let estaveis = 0;

    const encerrar = () => {
      cancelAnimationFrame(quadro);
      clearTimeout(parada);
      window.removeEventListener("wheel", encerrar);
      window.removeEventListener("touchstart", encerrar);
      window.removeEventListener("keydown", encerrar);
    };

    // `wheel`/`touchstart`/`keydown`, e não `scroll`: a rolagem programática
    // abaixo dispara `scroll`, e o componente cancelaria a si mesmo.
    window.addEventListener("wheel", encerrar, { passive: true });
    window.addEventListener("touchstart", encerrar, { passive: true });
    window.addEventListener("keydown", encerrar);

    /*
     * Teto por temporizador, e não pelo relógio dentro do rAF: em aba de segundo
     * plano o requestAnimationFrame não roda, e o laço abaixo só termina sozinho
     * quando o documento fica pronto. Um recurso que nunca carrega deixaria a
     * correção armada indefinidamente, pronta para puxar a página de volta na
     * hora em que a aba voltasse ao primeiro plano.
     */
    parada = window.setTimeout(encerrar, LIMITE_MS);

    const ajustar = () => {
      const alvo = document.getElementById(id);
      const pronto = document.readyState === "complete";

      if (!alvo) {
        // Âncora que não existe na página: só desiste quando o documento
        // terminou de montar, porque até lá ela ainda pode aparecer.
        if (pronto) return encerrar();
      } else {
        // A folga do cabeçalho fixo continua declarada no CSS, no
        // scroll-margin-top do próprio alvo — um lugar só para esse número.
        const folga = parseFloat(getComputedStyle(alvo).scrollMarginTop) || 0;
        const topo = alvo.getBoundingClientRect().top + window.scrollY - folga;
        const teto = raiz.scrollHeight - window.innerHeight;
        const destino = Math.round(Math.max(0, Math.min(topo, teto)));

        if (destino === anterior && Math.abs(window.scrollY - destino) <= 1) {
          estaveis += 1;
        } else {
          estaveis = 0;
          anterior = destino;
          window.scrollTo(0, destino);
        }

        if (pronto && estaveis >= QUADROS_ESTAVEIS) return encerrar();
      }

      quadro = requestAnimationFrame(ajustar);
    };

    quadro = requestAnimationFrame(ajustar);
    return encerrar;
  }, []);

  return null;
}

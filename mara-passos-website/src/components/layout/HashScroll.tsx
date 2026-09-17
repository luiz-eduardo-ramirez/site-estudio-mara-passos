"use client";

import { useEffect } from "react";

/**
 * Leva a página até a âncora que já vem na URL — #agendamentos vindo do link na
 * bio, do Instagram ou de uma aba antiga — e a segura lá enquanto o layout
 * assenta.
 *
 * O salto nativo do navegador não dá conta desta home, por dois motivos que se
 * somam:
 *
 * 1. `html { scroll-behavior: smooth }`, em globals.css, transforma o salto de
 *    carregamento numa animação. #agendamentos é a última seção: são ~14.000px
 *    no desktop e ~22.000px no celular, cerca de 1,5s de animação que qualquer
 *    toque do visitante ou mudança de layout cancela no meio do caminho.
 * 2. São onze seções com imagens, carrosséis e animações de entrada. A posição
 *    final da âncora só existe depois que tudo isso assenta — e o destino da
 *    animação é calculado antes, no início do carregamento.
 *
 * Medido em produção: o visitante parava no rodapé (desktop, cache frio) ou não
 * saía do topo (celular). Aqui o salto é imediato e se repete a cada quadro
 * enquanto o alvo ainda estiver se mexendo. A primeira rolagem do visitante
 * encerra a correção: se ele decidiu ir para outro lugar, a página não o traz
 * de volta à força.
 *
 * Vale só para a âncora presente na URL ao montar. Cliques em links internos
 * seguem com a rolagem suave do CSS, que é curta e não sofre do problema.
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
    const behaviorOriginal = raiz.style.scrollBehavior;

    /*
     * `scrollTo({ behavior: "auto" })` não serve: "auto" quer dizer "use o que
     * o CSS mandar", e o CSS aqui manda `smooth`. Medido nesta página, um
     * scrollTo de 8.000px com "auto" andava 53px antes do quadro seguinte.
     *
     * Desligar o smooth no style inline do <html> vence a folha de estilo, vale
     * em qualquer navegador (ao contrário de `behavior: "instant"`, que é
     * recente) e, de quebra, tira do caminho a própria animação nativa de
     * fragmento, que é com quem estamos disputando. O valor é devolvido ao
     * encerrar, para que os links internos continuem rolando suave.
     */
    raiz.style.scrollBehavior = "auto";

    let quadro = 0;
    let parada = 0;
    let anterior = -1;
    let estaveis = 0;

    const encerrar = () => {
      cancelAnimationFrame(quadro);
      clearTimeout(parada);
      raiz.style.scrollBehavior = behaviorOriginal;
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
     * plano o requestAnimationFrame não roda, e sem isto o scroll-behavior: auto
     * ficaria preso no <html> até a aba voltar — matando a rolagem suave dos
     * links internos, sem nenhum erro no console.
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

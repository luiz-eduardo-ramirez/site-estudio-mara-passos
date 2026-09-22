"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";

/*
 * Folha de estilo da própria biblioteca. Ela libera a altura do documento,
 * trava a rolagem enquanto a instância estiver parada — é o que segura a
 * página atrás dos modais —, contém o overscroll das áreas roláveis marcadas
 * com data-lenis-prevent e, enquanto uma animação de rolagem estiver correndo,
 * tira os iframes do caminho do ponteiro, para que o mapa do rodapé e o vídeo
 * do YouTube não engulam a roda do mouse no meio do percurso (parada a
 * animação, os dois voltam a ser clicáveis).
 *
 * Fica aqui, e não em globals.css, porque o @import de CSS com nome de pacote
 * não é resolvido na compilação: o arquivo inteiro falha calado e o Turbopack
 * continua servindo a versão anterior. Pelo import do módulo, funciona.
 *
 * Todas as regras dependem da classe .lenis no <html>, que só existe com a
 * biblioteca ativa: sem ela — em prefers-reduced-motion — nenhuma delas vale.
 */
import "lenis/dist/lenis.css";

/**
 * Rolagem suave do site inteiro, pela Lenis.
 *
 * A Lenis não move o conteúdo com transform: ela interpola o próprio
 * scrollTop da página, quadro a quadro. Isso importa porque tudo o que já
 * existe aqui depende da posição real de rolagem e continua funcionando sem
 * mudança nenhuma: o cabeçalho que encolhe (window.scrollY), a barra de
 * progresso das notícias, o whileInView do Framer Motion, o position: sticky
 * da coluna lateral do artigo e o pentagrama da /links, que é animado por
 * scroll timeline do CSS.
 *
 * Duas decisões que valem o registro:
 *
 * 1. O toque fica nativo (syncTouch: false, que é o padrão). A rolagem por
 *    dedo do iOS e do Android já é suave e tem uma inércia que o sistema
 *    calibra melhor do que qualquer biblioteca; interceptá-la no celular —
 *    de onde vem a maior parte do tráfego — só atrapalharia. A Lenis aqui é
 *    para a roda do mouse e para as âncoras.
 *
 * 2. Sob prefers-reduced-motion a Lenis nem chega a ser criada. Ela tem a
 *    opção respectReducedMotion, mas ela só torna imediato o scrollTo
 *    programático — a roda continuaria interpolada. Quem pediu menos
 *    movimento ao sistema recebe a rolagem crua do navegador, no mesmo
 *    espírito do bloco @media em globals.css.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [suave, setSuave] = useState(true);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplicar = () => setSuave(!consulta.matches);

    aplicar();
    consulta.addEventListener("change", aplicar);
    return () => consulta.removeEventListener("change", aplicar);
  }, []);

  if (!suave) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // Fração do caminho que falta percorrida a cada quadro. 0.1 é o padrão
        // da biblioteca: abaixo disso a página fica pastosa, acima ela perde o
        // deslize e vira rolagem comum.
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <AncorasSuaves />
      {children}
    </ReactLenis>
  );
}

/**
 * Faz os links de âncora da mesma página — #instrumentos, #agendamentos e
 * companhia, no menu, no rodapé e dentro dos modais — descerem com a mesma
 * animação da roda do mouse.
 *
 * A Lenis tem a opção `anchors`, que não serve aqui: ela rola até o alvo mas
 * não cancela o clique, então o next/link navegava junto e dava o salto
 * instantâneo por cima da animação. A escuta abaixo resolve isso na fase de
 * captura, antes de qualquer handler do React:
 *
 * - preventDefault() mata o salto nativo e também a navegação do next/link,
 *   que desiste ao ver defaultPrevented;
 * - sem stopPropagation, para que os onClick continuem rodando — é assim que
 *   o menu mobile ainda se fecha ao tocar num item;
 * - a URL é atualizada por history.pushState, que o App Router intercepta
 *   para manter usePathname/useSearchParams em dia, sem rolar nada.
 *
 * Links para outras páginas, cliques com modificador (ctrl/cmd, botão do
 * meio), target="_blank", download e âncoras que não existem no documento
 * passam direto e seguem o caminho normal.
 */
function AncorasSuaves() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

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
      if (destino.pathname !== atual.pathname || destino.search !== atual.search) return;

      const id = decodeURIComponent(destino.hash.slice(1));
      const alvo = id ? document.getElementById(id) : null;
      if (!alvo) return;

      evento.preventDefault();

      if (destino.hash !== atual.hash) {
        window.history.pushState(null, "", destino.hash);
      }

      focar(alvo);

      /*
       * Uma âncora clicada de dentro de um modal — o "Agendar Aula" da ficha
       * de curso — chega aqui com a página travada: o onClick do link fecha o
       * modal, mas só no ciclo de render seguinte. Rolar agora não moveria
       * nada, então a rolagem espera a página ser devolvida, por no máximo
       * meio segundo. Fora dos modais o primeiro teste já falha e a rolagem
       * começa no mesmo instante.
       *
       * A folga do cabeçalho fixo continua sendo o scroll-margin-top do alvo:
       * a Lenis lê essa propriedade sozinha, então o número segue morando só
       * no CSS.
       */
      let quadrosDeEspera = 30;
      const rolar = () => {
        if (lenis.isStopped && quadrosDeEspera-- > 0) {
          requestAnimationFrame(rolar);
          return;
        }
        lenis.scrollTo(alvo, { duration: duracaoAte(alvo) });
      };

      rolar();
    };

    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, [lenis]);

  return null;
}

/**
 * Devolve ao alvo o foco do teclado, que o salto nativo daria e o
 * preventDefault tirou. É o que mantém de pé o "Pular para o conteúdo
 * principal" — sem isto o atalho rolaria a página e deixaria o foco preso no
 * próprio link, que é exatamente o que ele existe para evitar.
 *
 * Seções não são focáveis por natureza; o tabindex temporário resolve isso e
 * sai do DOM assim que o foco segue adiante. preventScroll porque quem rola
 * aqui é a Lenis — o foco não pode dar o salto por fora.
 */
function focar(alvo: HTMLElement) {
  if (!alvo.hasAttribute("tabindex")) {
    alvo.setAttribute("tabindex", "-1");
    alvo.addEventListener("blur", () => alvo.removeAttribute("tabindex"), { once: true });
  }

  alvo.focus({ preventScroll: true });
}

/**
 * Duração da animação conforme a distância, em segundos.
 *
 * Esta home tem onze seções: ir do topo até #agendamentos são uns 14.000px no
 * desktop e 22.000px no celular. Com duração fixa, ou o pulo curto arrasta ou
 * o longo vira um borrão. O teto de 1,4s existe porque, passando disso, a
 * viagem deixa de parecer navegação e começa a parecer espera.
 */
function duracaoAte(alvo: HTMLElement) {
  const distancia = Math.abs(alvo.getBoundingClientRect().top);
  return Math.min(1.4, Math.max(0.6, distancia / 4000));
}

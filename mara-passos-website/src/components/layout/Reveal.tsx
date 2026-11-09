"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, refreshScroll } from "../../lib/gsap";
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
 * - clip faz uma revelação por máscara (wipe); clip="right" | "bottom" muda a
 *   origem (padrão/true: da esquerda);
 * - mask: o conteúdo sobe de dentro de uma "janela" (overflow: hidden) — mais
 *   cinematográfico que o fade. Com stagger, cada filho sobe da própria janela;
 * - lines: o TEXTO do elemento é dividido em linhas (SplitText) e cada linha
 *   sobe de dentro de uma máscara, em sequência. O elemento em si fica visível;
 * - rotateX={18}: os alvos "deitam" em 3D e se levantam na entrada (cascata);
 * - line: um filho com data-reveal-line (ex.: um filete) se desenha por scaleX;
 * - cine: usa a curva e a duração cinematográficas (expo.out, ~1,1s);
 * - ease troca a curva (ex.: "back.out(1.4)" para um assentar com overshoot).
 *
 * Acessibilidade: em prefers-reduced-motion o efeito nem começa — o conteúdo
 * nasce visível, sem opacity:0 preso. O estado inicial é aplicado dentro do
 * useGSAP (useLayoutEffect), antes da pintura, então não há piscada; e como só
 * o JS aplica o opacity:0, sem JS (ou para crawlers) o conteúdo aparece normal.
 * O SplitText mantém o texto acessível (aria-label no elemento dividido).
 */
type Direcao = "left" | "right" | "bottom";

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
  /** Revelação por máscara (wipe). true = da esquerda; ou a origem desejada. */
  clip?: boolean | Direcao;
  /** O conteúdo sobe de dentro de uma janela com overflow: hidden. */
  mask?: boolean;
  /** Divide o texto em linhas e anima cada uma subindo de uma máscara. */
  lines?: boolean;
  /** Rotação 3D inicial (graus) desfeita na entrada. Ex.: 18. */
  rotateX?: number;
  /** Anima filhos [data-reveal-line] com scaleX 0 → 1 (filete que se desenha). */
  line?: boolean;
  /** Curva e duração cinematográficas. */
  cine?: boolean;
  /** Troca a curva de saída. Padrão: EASE.out (ou EASE.cine com cine). */
  ease?: string;
  id?: string;
};

const CLIP_INICIAL: Record<Direcao, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  bottom: "inset(100% 0 0 0)",
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
  mask = false,
  lines = false,
  rotateX = 0,
  line = false,
  cine = false,
  ease,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const internoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const curva = ease ?? (cine ? EASE.cine : EASE.out);
      const duracao = cine ? DUR.cine : DUR.base;
      const direcaoClip: Direcao | null = clip ? (clip === true ? "left" : clip) : null;

      // Filetes que se desenham não entram no stagger dos filhos.
      const filetes = line ? Array.from(el.querySelectorAll("[data-reveal-line]")) : [];

      let alvos: Element[] = [];
      let divisao: SplitText | null = null;
      let revelado = false;

      if (lines) {
        // O elemento fica visível; só as linhas nascem escondidas dentro da máscara.
        divisao = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            if (!revelado) gsap.set(self.lines, { yPercent: 110 });
          },
        });
      } else {
        const base: Element[] = stagger
          ? Array.from(el.children)
          : mask && internoRef.current
            ? [internoRef.current]
            : [el];
        alvos = base.filter((a) => !filetes.includes(a));
        if (alvos.length === 0 && filetes.length === 0) return;

        gsap.set(alvos, {
          opacity: mask ? 1 : 0,
          y: mask ? 0 : y,
          yPercent: mask ? 110 : 0,
          x,
          scale,
          ...(rotateX ? { rotateX, transformPerspective: 800, transformOrigin: "50% 100%" } : {}),
          ...(blur ? { filter: "blur(10px)" } : {}),
          ...(direcaoClip ? { clipPath: CLIP_INICIAL[direcaoClip] } : {}),
        });
      }

      if (filetes.length) gsap.set(filetes, { scaleX: 0, transformOrigin: "left center" });

      const revelar = () => {
        if (revelado) return;
        revelado = true;
        const tl = gsap.timeline({ defaults: { ease: curva, duration: duracao } });

        if (divisao) {
          tl.to(divisao.lines, {
            yPercent: 0,
            stagger: REVEAL.lineStagger,
            // Devolve o texto ao DOM original ao fim (sem spans de máscara à toa).
            onComplete: () => divisao?.revert(),
          });
        } else if (alvos.length) {
          tl.to(
            alvos,
            {
              opacity: 1,
              y: 0,
              yPercent: 0,
              x: 0,
              scale: 1,
              ...(rotateX ? { rotateX: 0 } : {}),
              ...(blur ? { filter: "blur(0px)" } : {}),
              ...(direcaoClip ? { clipPath: "inset(0% 0% 0% 0%)" } : {}),
              stagger: stagger ? (cine ? REVEAL.cardStagger : REVEAL.stagger) : 0,
              overwrite: true,
              // Limpa transform/filter/clip ao fim: sem camadas de composição à toa
              // e sem prender um contexto de empilhamento nos filhos.
              onComplete: () =>
                gsap.set(alvos, {
                  clearProps: `transform${blur ? ",filter" : ""}${direcaoClip ? ",clipPath" : ""}`,
                }),
            },
            0,
          );
        }

        if (filetes.length) tl.to(filetes, { scaleX: 1, duration: duracao * 0.9 }, 0);

        // Esta reveal pode ter mudado a altura da página: realinha os gatilhos de scrub.
        refreshScroll();
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
        // threshold 0 (e não 0.01): com clip-path o alvo nasce recortado e sua área
        // visível é 0 — com um limiar > 0 o observer nunca disparava e a seção
        // ficava invisível para sempre.
        { rootMargin: "0px 0px -10% 0px", threshold: 0 },
      );
      observador.observe(el);

      return () => {
        observador.disconnect();
        divisao?.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      className={className}
      id={id}
      style={mask ? { overflow: "hidden" } : undefined}
    >
      {mask && !stagger ? <div ref={internoRef}>{children}</div> : children}
    </Tag>
  );
}

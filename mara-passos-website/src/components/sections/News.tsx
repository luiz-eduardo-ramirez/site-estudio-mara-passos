"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { ArrowRight, ChevronLeft, ChevronRight, Music2 } from "lucide-react";
import { newsData, type NewsItem } from "../../app/data/news";
import { gsap, useGSAP } from "../../lib/gsap";
import { EASE } from "../../lib/motion";
import Reveal from "../layout/Reveal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

/*
 * Slider de notícias com parallax em camadas, animado com GSAP.
 *
 * Cada slide tem três camadas em profundidades diferentes:
 *  - fundo  (data-c="bg"):     a arte em cover, desfocada e escurecida — a mais funda;
 *  - pôster (data-c="poster"):  a arte nítida, num cartão flutuante (só no desktop);
 *  - texto  (data-c="content"): categoria, título, resumo e o link.
 *
 * Na troca de slide, uma timeline do GSAP move as camadas com deslocamentos
 * diferentes (o fundo desliza menos, o texto entra escalonado), dando a sensação
 * de profundidade. O movimento do ponteiro também desloca as camadas (x/y), em
 * cima do transform da transição (que usa xPercent/scale — propriedades
 * distintas, então somam sem conflito).
 *
 * Os slides ficam empilhados (absolutos); só o ativo fica visível. Em
 * prefers-reduced-motion não há parallax nem timeline — é um corte simples.
 */
const reduzido = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function camadas(el: HTMLElement) {
  return {
    bg: el.querySelector<HTMLElement>('[data-c="bg"]')!,
    poster: el.querySelector<HTMLElement>('[data-c="poster"]')!,
    content: el.querySelector<HTMLElement>('[data-c="content"]')!,
    itens: el.querySelectorAll<HTMLElement>('[data-c="content"] > *'),
  };
}

export default function News() {
  const stageRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const atual = useRef(0);
  const animando = useRef(false);
  const [active, setActive] = useState(0);

  const total = newsData.length;

  const setSlideRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) slidesRef.current[i] = el;
  }, []);

  useGSAP(
    () => {
      const slides = slidesRef.current;
      if (!slides.length) return;
      slides.forEach((s, i) => {
        gsap.set(s, { autoAlpha: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 });
      });
    },
    { scope: stageRef },
  );

  const irPara = useCallback(
    (i: number) => {
      const de = atual.current;
      if (animando.current || i === de || i < 0 || i >= total) return;
      const dir = i > de ? 1 : -1;

      const saindoEl = slidesRef.current[de];
      const entrandoEl = slidesRef.current[i];
      if (!saindoEl || !entrandoEl) return;

      atual.current = i;
      setActive(i);

      const cs = camadas(saindoEl);
      const ce = camadas(entrandoEl);

      // Zera o deslocamento de ponteiro antes de animar a transição.
      gsap.set([cs.bg, cs.poster, cs.content, ce.bg, ce.poster, ce.content], { x: 0, y: 0 });

      if (reduzido()) {
        gsap.set(saindoEl, { autoAlpha: 0, zIndex: 1 });
        gsap.set(entrandoEl, { autoAlpha: 1, zIndex: 2 });
        return;
      }

      animando.current = true;
      gsap.set(entrandoEl, { autoAlpha: 1, zIndex: 2 });
      gsap.set(saindoEl, { zIndex: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(saindoEl, { autoAlpha: 0 });
          animando.current = false;
        },
      });

      // Entra
      tl.fromTo(
        ce.bg,
        { scale: 1.28, xPercent: dir * 10 },
        { scale: 1.12, xPercent: 0, duration: 0.9, ease: EASE.expoInOut },
        0,
      )
        .fromTo(
          ce.poster,
          { xPercent: dir * 45, autoAlpha: 0, rotate: dir * 2 },
          { xPercent: 0, autoAlpha: 1, rotate: 0, duration: 0.8, ease: EASE.out },
          0.05,
        )
        .fromTo(
          ce.itens,
          { yPercent: 45, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: EASE.out, stagger: 0.08 },
          0.15,
        )
        // Sai (animamos os ITENS do texto, nunca o container, para não deixar o
        // texto preso invisível entre os ciclos)
        .to(cs.bg, { xPercent: -dir * 8, duration: 0.9, ease: EASE.expoInOut }, 0)
        .to(cs.poster, { xPercent: -dir * 28, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 0)
        .to(cs.itens, { autoAlpha: 0, yPercent: -22, duration: 0.35, ease: "power2.in" }, 0);
    },
    [total],
  );

  const proximo = useCallback(() => irPara((atual.current + 1) % total), [irPara, total]);
  const anterior = useCallback(() => irPara((atual.current - 1 + total) % total), [irPara, total]);

  // Autoplay (pausa ao passar o mouse); parallax de ponteiro.
  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      let timer: number | undefined;
      const iniciar = () => {
        if (reduzido()) return;
        parar();
        timer = window.setInterval(() => irPara((atual.current + 1) % total), 6500);
      };
      const parar = () => {
        if (timer) window.clearInterval(timer);
      };

      const aoMover = (e: PointerEvent) => {
        if (reduzido() || animando.current) return;
        const r = stage.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        const c = camadas(slidesRef.current[atual.current]);
        gsap.to(c.bg, { x: nx * -28, y: ny * -16, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        gsap.to(c.poster, { x: nx * 26, y: ny * 16, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        gsap.to(c.content, { x: nx * 12, y: ny * 8, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      };
      const aoSair = () => {
        const c = camadas(slidesRef.current[atual.current]);
        gsap.to([c.bg, c.poster, c.content], { x: 0, y: 0, duration: 0.7, ease: "power2.out" });
        iniciar();
      };

      stage.addEventListener("pointermove", aoMover);
      stage.addEventListener("pointerleave", aoSair);
      stage.addEventListener("pointerenter", parar);
      iniciar();

      return () => {
        parar();
        stage.removeEventListener("pointermove", aoMover);
        stage.removeEventListener("pointerleave", aoSair);
        stage.removeEventListener("pointerenter", parar);
      };
    },
    { scope: stageRef, dependencies: [irPara, total] },
  );

  return (
    <section id="noticias" className="py-20 md:py-28 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <Reveal stagger mask cine className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 text-mara-orange text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            <Music2 size={14} aria-hidden="true" />
            Fique por dentro
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Novidades no <span className="text-mara-orange">Estúdio</span>
          </h2>
        </Reveal>
      </div>

      {/* Palco do carrossel: abre num wipe de baixo para cima. */}
      <Reveal clip="bottom" cine y={0} scale={0.97} className="mx-auto w-full max-w-6xl px-4">
        <div
          ref={stageRef}
          className="relative h-[30rem] md:h-[34rem] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl"
          role="group"
          aria-roledescription="carrossel"
          aria-label="Novidades do estúdio"
        >
          {newsData.map((news: NewsItem, i) => (
            <div
              key={news.id}
              ref={(el) => setSlideRef(el, i)}
              className="absolute inset-0"
              aria-hidden={active === i ? undefined : true}
            >
              {/* Camada de fundo (mais funda) — arte em cover, desfocada e escura */}
              <div data-c="bg" className="absolute inset-[-12%] will-change-transform">
                <Image
                  src={news.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover blur-[3px] brightness-[0.45] scale-[1.12]"
                  sizes="(min-width: 1024px) 1152px, 100vw"
                  priority={i === 0}
                />
              </div>

              {/* Gradiente fixo para leitura do texto (não entra no parallax) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

              {/* Camada do pôster nítido (só desktop) — profundidade intermediária */}
              <div
                data-c="poster"
                className="absolute right-6 top-1/2 hidden h-[78%] w-[38%] -translate-y-1/2 overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl backdrop-blur-sm will-change-transform lg:block"
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-contain p-1"
                  sizes="440px"
                  priority={i === 0}
                />
              </div>

              {/* Camada de texto (mais à frente) */}
              <div
                data-c="content"
                className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-7 sm:p-10 lg:max-w-[55%] lg:gap-4 lg:p-12 will-change-transform"
              >
                <span className="inline-flex items-center rounded-full border border-mara-orange/40 bg-mara-orange/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-mara-orange backdrop-blur-sm">
                  {news.category ?? "Novidades"}
                </span>
                <h3
                  className={`${playfair.className} text-3xl font-bold italic leading-[1.1] text-white text-balance drop-shadow-lg sm:text-4xl lg:text-5xl`}
                >
                  {news.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-gray-200 line-clamp-2 drop-shadow sm:text-base lg:line-clamp-3">
                  {news.description}
                </p>
                <Link
                  href={`/noticias/${news.slug}`}
                  data-transicao
                  className="group/cta mt-1 inline-flex w-fit items-center gap-2 border-b-2 border-mara-orange py-2 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:text-mara-orange sm:text-base"
                >
                  Ler a matéria completa
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover/cta:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          ))}

          {/* Setas */}
          <button
            type="button"
            onClick={anterior}
            aria-label="Notícia anterior"
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:border-mara-orange hover:text-mara-orange md:left-5"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={proximo}
            aria-label="Próxima notícia"
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:border-mara-orange hover:text-mara-orange md:right-5"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>

          {/* Abas/pílulas (como na referência) */}
          <div className="absolute bottom-5 right-5 z-20 hidden items-center gap-2 lg:flex">
            {newsData.map((news, i) => (
              <button
                key={news.id}
                type="button"
                onClick={() => irPara(i)}
                aria-current={active === i ? "true" : undefined}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all ${
                  active === i
                    ? "bg-mara-orange text-white shadow-[0_0_20px_rgba(242,101,34,0.4)]"
                    : "border border-white/20 bg-black/40 text-gray-200 hover:border-mara-orange/60 hover:text-white"
                }`}
              >
                {news.category ?? "Novidades"}
              </button>
            ))}
          </div>

          {/* Pontos (mobile) */}
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 lg:hidden">
            {newsData.map((news, i) => (
              <button
                key={news.id}
                type="button"
                onClick={() => irPara(i)}
                aria-label={`Ir para a notícia ${i + 1}`}
                aria-current={active === i ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${
                  active === i ? "w-6 bg-mara-orange" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { gsap, useGSAP } from "../../lib/gsap";
import { teachersList } from "../../data/teachersList";

/*
 * Professores — trilho horizontal guiado pelo scroll vertical.
 *
 * A seção é alta; dentro dela, um bloco "sticky" de altura de tela segura a
 * cena enquanto a pessoa rola. O progresso da rolagem vertical pela seção vira
 * o deslocamento horizontal do trilho de cards (um gsap.quickTo suaviza o
 * movimento), e uma barra embaixo mostra onde se está. O card mais próximo do
 * centro cresce um pouco, dando profundidade.
 *
 * A altura da seção é definida por JS = tela + distância do trilho, para que
 * rolar 1px para baixo deslize ~1px para o lado (sensação natural).
 *
 * No mobile e em prefers-reduced-motion não há "scroll-jacking": a seção tem
 * altura automática e o trilho vira um carrossel de arrastar (overflow-x-auto).
 * O scroll é lido pelo evento nativo — a Lenis move o scrollTop real, então o
 * mesmo listener serve com ou sem rolagem suave.
 */
export default function Teachers() {
  const secaoRef = useRef<HTMLElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const progressoRef = useRef<HTMLDivElement>(null);

  // Bios expandidas (por id). O texto fica em absolute bottom-0, então abrir não
  // muda a altura do card nem o scrollWidth do trilho — a cena GSAP não re-mede.
  const [abertos, setAbertos] = useState<Set<number>>(new Set());
  const alternar = (id: number) =>
    setAbertos((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  useGSAP(
    () => {
      const secao = secaoRef.current;
      const trilho = trilhoRef.current;
      const progresso = progressoRef.current;
      if (!secao || !trilho) return;

      const ehDesktop = () =>
        window.innerWidth >= 768 &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let distancia = 0;
      const quickX = gsap.quickTo(trilho, "x", { duration: 0.5, ease: "power3.out" });
      const cards = Array.from(trilho.children) as HTMLElement[];

      const atualizar = () => {
        if (!ehDesktop()) return;
        const total = secao.offsetHeight - window.innerHeight;
        const prog = total > 0 ? gsap.utils.clamp(0, 1, -secao.getBoundingClientRect().top / total) : 0;
        quickX(-prog * distancia);
        if (progresso) progresso.style.transform = `scaleX(${prog})`;

        // Profundidade: o card mais próximo do centro da tela cresce um pouco.
        const centroTela = window.innerWidth / 2;
        for (const card of cards) {
          const r = card.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - centroTela) / window.innerWidth;
          gsap.set(card, { scale: gsap.utils.clamp(0.9, 1, 1 - d * 0.16) });
        }
      };

      const medir = () => {
        if (!ehDesktop()) {
          secao.style.height = "auto";
          gsap.set(trilho, { x: 0 });
          gsap.set(cards, { scale: 1 });
          if (progresso) progresso.style.transform = "scaleX(0)";
          distancia = 0;
          return;
        }
        distancia = Math.max(0, trilho.scrollWidth - window.innerWidth);
        secao.style.height = `${window.innerHeight + distancia}px`;
        atualizar();
      };

      medir();
      window.addEventListener("resize", medir);
      window.addEventListener("scroll", atualizar, { passive: true });
      return () => {
        window.removeEventListener("resize", medir);
        window.removeEventListener("scroll", atualizar);
      };
    },
    { scope: secaoRef },
  );

  return (
    <section ref={secaoRef} id="professores" className="relative bg-[#0b0b0b]">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex min-h-[32rem] flex-col justify-center overflow-hidden py-16 md:sticky md:top-0 md:h-screen md:py-0">
        {/* Cabeçalho */}
        <div className="mb-8 px-6 md:mb-10 md:px-[8vw]">
          <h2 className="text-3xl font-extrabold text-white md:text-5xl">
            Nossos <span className="text-mara-orange">Professores</span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-400">
            Role para percorrer a equipe — profissionais apaixonados por música, prontos para guiar você em cada nota.
          </p>
        </div>

        {/* Trilho de cards */}
        <div
          ref={trilhoRef}
          className="flex gap-5 overflow-x-auto px-6 pb-4 will-change-transform [scrollbar-width:none] md:gap-6 md:overflow-visible md:px-[8vw] md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {teachersList.map((teacher) => {
            const aberto = abertos.has(teacher.id);
            return (
            <article
              key={teacher.id}
              className="group relative h-[23rem] w-[78vw] shrink-0 origin-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111] shadow-2xl will-change-transform sm:w-[21rem] md:h-[27rem]"
            >
              <Image
                src={teacher.foto}
                alt={teacher.nome}
                fill
                quality={90}
                sizes="(max-width: 640px) 78vw, 336px"
                className="object-cover object-top opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black from-40% via-black/80 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <h3 className="text-lg font-extrabold leading-tight text-white md:text-xl">
                  {teacher.nome}
                </h3>
                {/* Formação de cada professor */}
                <p
                  // data-lenis-prevent: ao expandir, o scroll interno da bio é
                  // nativo e não aciona a rolagem suave (que moveria o trilho).
                  data-lenis-prevent={aberto ? "" : undefined}
                  className={`mt-2 text-xs leading-relaxed text-gray-300 md:text-[0.8rem] ${
                    aberto
                      ? "max-h-28 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]"
                      : "line-clamp-4"
                  }`}
                >
                  {teacher.bio}
                </p>
                <button
                  type="button"
                  onClick={() => alternar(teacher.id)}
                  aria-expanded={aberto}
                  className="mt-2 inline-flex items-center gap-1 text-[0.7rem] font-semibold text-mara-orange transition-colors hover:text-orange-400"
                >
                  {aberto ? "Ver menos" : "Ver mais"}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-300 ${aberto ? "rotate-180" : ""}`}
                  />
                </button>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {teacher.especialidades.slice(0, 3).map((esp) => (
                    <li key={esp}>
                      <Link
                        href={`/?curso=${encodeURIComponent(esp)}#instrumentos`}
                        className="inline-block rounded-full border border-mara-orange/30 bg-mara-orange/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-mara-orange transition-colors hover:bg-mara-orange/20"
                      >
                        {esp}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            );
          })}
        </div>

        {/* Barra de progresso (desktop) */}
        <div className="mt-8 hidden px-[8vw] md:mt-10 md:block">
          <div className="h-1 w-full max-w-sm overflow-hidden rounded-full bg-white/10">
            <div
              ref={progressoRef}
              className="h-full w-full origin-left scale-x-0 rounded-full bg-mara-orange"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

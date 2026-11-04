"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { gsap, useGSAP } from "../../lib/gsap";
import { EASE } from "../../lib/motion";
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
          className="flex items-start gap-5 overflow-x-auto px-6 pb-4 will-change-transform [scrollbar-width:none] md:gap-6 md:overflow-visible md:px-[8vw] md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {teachersList.map((teacher) => (
            <CartaoProfessor key={teacher.id} teacher={teacher} />
          ))}
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

type Professor = (typeof teachersList)[number];

/*
 * Card do professor: foto e texto em zonas separadas.
 *
 * A foto ocupa o topo (sem nada por cima, então o rosto nunca é coberto) e o
 * texto vive num painel de fundo sólido embaixo, com um degradê curto que funde
 * os dois. Ao tocar em "Ver mais", o painel sobe como uma gaveta — a altura é
 * animada pela GSAP — revelando a bio completa, enquanto a foto escurece e dá
 * um leve zoom. O card mantém a altura fixa: nada empurra o resto do trilho.
 *
 * Detalhe de implementação: a altura do painel é travada em px ANTES de a bio
 * ser liberada (clique), e só volta a "auto" depois da animação de fechar. Sem
 * isso o painel saltaria para a altura da bio inteira antes de animar.
 */
function CartaoProfessor({ teacher }: { teacher: Professor }) {
  const [aberto, setAberto] = useState(false);
  // "desdobrado" governa o layout da bio (cortada em 2 linhas × rolável); só
  // acompanha "aberto" nas pontas da animação.
  const [desdobrado, setDesdobrado] = useState(false);

  const cartaoRef = useRef<HTMLElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);
  const fotoRef = useRef<HTMLDivElement>(null);
  const veuRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const primeira = useRef(true);
  const alturaFechado = useRef(0);

  const alternar = () => {
    const painel = painelRef.current;
    if (!painel) return;
    if (!aberto) {
      alturaFechado.current = painel.offsetHeight;
      painel.style.height = `${alturaFechado.current}px`;
      setDesdobrado(true);
    }
    setAberto((v) => !v);
  };

  useEffect(() => {
    if (primeira.current) {
      primeira.current = false;
      return;
    }
    const cartao = cartaoRef.current;
    const painel = painelRef.current;
    const foto = fotoRef.current;
    const veu = veuRef.current;
    if (!cartao || !painel || !foto || !veu) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = reduzido ? 0 : 0.6;
    gsap.killTweensOf([painel, foto, veu]);

    if (aberto) {
      gsap.fromTo(
        painel,
        { height: alturaFechado.current },
        { height: Math.round(cartao.offsetHeight * 0.56), duration: d, ease: EASE.expo },
      );
      gsap.to(foto, { scale: 1.06, duration: d + 0.3, ease: EASE.out });
      gsap.to(veu, { opacity: 1, duration: d, ease: EASE.out });
    } else {
      gsap.to(painel, {
        height: alturaFechado.current,
        duration: d * 0.75,
        ease: EASE.inOut,
        onComplete: () => {
          gsap.set(painel, { clearProps: "height" });
          if (bioRef.current) bioRef.current.scrollTop = 0;
          setDesdobrado(false);
        },
      });
      gsap.to(foto, { scale: 1, duration: d, ease: EASE.out });
      gsap.to(veu, { opacity: 0, duration: d, ease: EASE.out });
    }
  }, [aberto]);

  return (
    <article
      ref={cartaoRef}
      className="group relative h-[25rem] w-[78vw] shrink-0 origin-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111] shadow-2xl will-change-transform sm:w-[21rem] md:h-[29rem]"
    >
      {/* Zona da foto — nada de texto aqui */}
      <div
        ref={fotoRef}
        onClick={aberto ? alternar : undefined}
        className={`absolute inset-x-0 top-0 h-[15rem] origin-top md:h-[19rem] ${aberto ? "cursor-pointer" : ""}`}
      >
        <Image
          src={teacher.foto}
          alt={teacher.nome}
          fill
          quality={90}
          sizes="(max-width: 640px) 78vw, 336px"
          style={{ objectPosition: teacher.focoFoto ?? "50% 15%" }}
          className="object-cover"
        />
        {/* Véu que escurece a foto quando a gaveta abre */}
        <div ref={veuRef} className="absolute inset-0 bg-black/40 opacity-0" />
      </div>

      {/* Painel de texto (gaveta) */}
      <div
        ref={painelRef}
        className="absolute inset-x-0 bottom-0 flex flex-col bg-[#111] px-5 pb-4 pt-2 md:px-6"
      >
        {/* Degradê curto que funde a foto com o painel — sobe junto com ele */}
        <div className="pointer-events-none absolute inset-x-0 -top-12 h-12 bg-gradient-to-t from-[#111] to-transparent" />

        <h3 className="shrink-0 text-lg font-extrabold leading-tight text-white md:text-xl">
          {teacher.nome}
        </h3>

        <div
          ref={bioRef}
          // data-lenis-prevent: com a gaveta aberta, o scroll da bio é nativo e
          // não aciona a rolagem suave (que moveria o trilho).
          data-lenis-prevent={desdobrado ? "" : undefined}
          className={`mt-1.5 ${
            desdobrado ? "min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]" : ""
          }`}
        >
          <p
            className={`text-xs leading-relaxed text-gray-300 md:text-[0.8rem] ${
              desdobrado ? "" : "line-clamp-2"
            }`}
          >
            {teacher.bio}
          </p>
        </div>

        <ul className="mt-3 flex shrink-0 gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {teacher.especialidades.slice(0, 3).map((esp) => (
            <li key={esp} className="shrink-0">
              <Link
                href={`/?curso=${encodeURIComponent(esp)}#instrumentos`}
                className="inline-block whitespace-nowrap rounded-full border border-mara-orange/30 bg-mara-orange/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-mara-orange transition-colors hover:bg-mara-orange/20"
              >
                {esp}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={alternar}
          aria-expanded={aberto}
          className="mt-2 inline-flex shrink-0 items-center gap-1 self-start text-[0.7rem] font-semibold text-mara-orange transition-colors hover:text-orange-400"
        >
          {aberto ? "Ver menos" : "Ver mais"}
          <ChevronDown
            size={13}
            className={`transition-transform duration-300 ${aberto ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </article>
  );
}

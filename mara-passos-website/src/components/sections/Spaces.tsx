"use client";

import { useState, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { gsap, useGsapPresence } from "../../lib/useGsapPresence";
import { DUR, EASE } from "../../lib/motion";
import Reveal from "../layout/Reveal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Imagem com esqueleto em shimmer enquanto carrega e fade + desfoque ao concluir.
function LoadingImage({ className = "", ...props }: React.ComponentProps<typeof Image>) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Imagem já em cache pode carregar antes da hidratação, sem disparar onLoad.
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <>
      <div
        aria-hidden
        className={`absolute inset-0 overflow-hidden bg-neutral-800/60 pointer-events-none transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`}
      >
        {/* Brilho em loop (shimmer) via CSS — ver @keyframes shimmer em globals.css.
            Sob prefers-reduced-motion o bloco global zera a animação. */}
        <div className="shimmer absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <Image
        {...props}
        ref={imgRef}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-300 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}

export type Espaco = { name?: string; img: string; alt?: string };

const spacesPadrao: Espaco[] = [
  { name: "Estúdio Mara Passos", img: "/spaces/fachada.webp" },
  { name: "Recepção", img: "/spaces/entrada.webp" },
  { name: "Recepção", img: "/spaces/entrada-1.webp" },
  { name: "Recepção", img: "/spaces/entrada-2.webp" },
  { name: "Área Interna", img: "/spaces/interna.webp" },
  { name: "Área Interna", img: "/spaces/interna-1.webp" },
  { name: "Sala de Piano", img: "/spaces/piano.webp" },
  { name: "Sala de Piano", img: "/spaces/piano-1.webp" },
  { name: "Sala de Piano", img: "/spaces/piano-2.webp" },
  { name: "Sala de Musicalização", img: "/spaces/musicalizacao-1.webp" },
  { name: "Sala de Instrumentos", img: "/spaces/instrumentos.webp" },
  { name: "Sala de Jogos", img: "/spaces/sala-jogos.webp" },
  { name: "Escada", img: "/spaces/escada.webp" },
  { name: "Certificados", img: "/spaces/certificados.webp" },
  { name: "Relaxamento", img: "/spaces/relaxamento.webp" },
  { name: "Secretaria", img: "/spaces/pc.webp" },
  { name: "Corredor", img: "/spaces/IMG_4326.webp" },
  { name: "Certificados", img: "/spaces/IMG_4337.webp" },
];

/*
 * Reutilizado nas páginas de curso: sem props mostra todos os espaços da home;
 * com `fotos` mostra a seleção do curso (sem legenda quando falta `name`).
 */
export default function Spaces({
  fotos: spaces = spacesPadrao,
  titulo = (
    <>
      Conheça nossos <span className="text-mara-orange">espaços</span>
    </>
  ),
  intro = "Ambientes climatizados, equipados e preparados com muito carinho para o seu desenvolvimento.",
}: {
  fotos?: Espaco[];
  titulo?: React.ReactNode;
  intro?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lightbox com presença animada (GSAP). O estado selectedIndex é a intenção;
  // durante a saída ele volta a null, então guardo a última imagem num ref para
  // o <Image> continuar mostrando algo enquanto o modal some.
  const aberto = selectedIndex !== null;
  const ultimoIndice = useRef<number>(0);
  if (selectedIndex !== null) ultimoIndice.current = selectedIndex;
  const indiceMostrado = selectedIndex ?? ultimoIndice.current;

  const fechar = () => setSelectedIndex(null);
  const ir = (delta: number) =>
    setSelectedIndex((i) => (i === null ? i : (i + delta + spaces.length) % spaces.length));
  const touchX = useRef<number | null>(null);

  const { montado: modalMontado, ref: modalRef } = useGsapPresence<HTMLDivElement>(aberto, {
    entrar: (el) => {
      const painel = el.querySelector<HTMLElement>("[data-painel]");
      gsap
        .timeline()
        .from(el, { opacity: 0, duration: DUR.fast, ease: EASE.out })
        .from(painel, { opacity: 0, scale: 0.9, y: 20, duration: DUR.base, ease: EASE.out }, "<");
    },
    sair: (el, pronto) => {
      const painel = el.querySelector<HTMLElement>("[data-painel]");
      gsap
        .timeline({ onComplete: pronto })
        .to(painel, { opacity: 0, scale: 0.9, y: 20, duration: DUR.exit, ease: "power2.in" }, 0)
        .to(el, { opacity: 0, duration: DUR.exit }, 0);
    },
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      else if (e.key === 'ArrowRight') setSelectedIndex((i) => (i === null ? i : (i + 1) % spaces.length));
      else if (e.key === 'ArrowLeft') setSelectedIndex((i) => (i === null ? i : (i - 1 + spaces.length) % spaces.length));
    };
    // O overflow no body trava a rolagem nativa; o lenis.stop() trava a que a
    // biblioteca faz por conta própria. Sem o segundo, a roda do mouse sobre a
    // foto ampliada ficaria acumulada e saltaria toda junta ao fechar.
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
      window.addEventListener('keydown', handleKey);
    } else {
      document.body.style.overflow = 'unset';
      lenis?.start();
    }
    return () => { 
      document.body.style.overflow = 'unset';
      lenis?.start();
      window.removeEventListener('keydown', handleKey);
    };
  }, [selectedIndex, lenis]);

  return (
    <section id="espacos" className="py-24 bg-mara-gray relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        <Reveal stagger mask cine className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {titulo}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{intro}</p>
        </Reveal>

        {/* --- CARROSSEL DE IMAGENS PREMIUM --- */}
        {/* Wipe da esquerda para a direita; sem parallax aqui: os slides são um
            Swiper com object-contain, onde zoom/deslize cortaria as fotos. */}
        <Reveal clip="left" cine y={0} className="relative w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={true}
            speed={550}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            spaceBetween={24}
            grabCursor={true}
            breakpoints={{
              320: { slidesPerView: 1.1 },
              640: { slidesPerView: 1.8 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full pb-16" // Espaço extra embaixo para os "bullets" da paginação
            style={{
              // Customizando as cores nativas do Swiper
              "--swiper-navigation-color": "#f97316", // mara-orange
              "--swiper-navigation-size": "24px",
              "--swiper-pagination-color": "#f97316",
              "--swiper-pagination-bullet-inactive-color": "#888888",
            } as React.CSSProperties}
          >
            {spaces.map((space, index) => (
              <SwiperSlide key={index} className="pb-4">
                <div
                  className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-mara-orange/20 transition-shadow duration-500 bg-neutral-900/50"
                  onClick={() => setSelectedIndex(index)}
                >
                  {/* Imagem de Fundo (Next.js Image) */}
                  <LoadingImage
                    src={space.img}
                    alt={space.alt ?? space.name ?? ""}
                    fill
                    loading={index < 4 ? "eager" : "lazy"}
                    className="object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Máscara de Gradiente Inferior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Textos Sobrepostos */}
                  {space.name && (
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-md">
                        {space.name}
                      </h3>
                      {/* Linha decorativa que estica no hover */}
                      <div className="w-10 h-1 bg-mara-orange rounded-full transition-all duration-500 group-hover:w-20" />
                    </div>
                  )}

                  {/* Ícone Central de Lupa no Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="bg-black/50 backdrop-blur-md p-4 rounded-full shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <ZoomIn className="text-white" size={32} />
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>

      </div>

      {/* ---------------- MODAL LIGHTBOX (GSAP) ---------------- */}
      {mounted && modalMontado && createPortal(
        <div
          ref={modalRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
          onClick={fechar}
        >
          <button
            aria-label="Fechar"
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-mara-orange transition-colors bg-white/5 hover:bg-white/10 rounded-full p-3 z-50"
            onClick={(e) => {
              e.stopPropagation();
              fechar();
            }}
          >
            <X size={28} />
          </button>

          <button
            aria-label="Foto anterior"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/5 p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-mara-orange"
            onClick={(e) => {
              e.stopPropagation();
              ir(-1);
            }}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            aria-label="Próxima foto"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/5 p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-mara-orange"
            onClick={(e) => {
              e.stopPropagation();
              ir(1);
            }}
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-white/70">
            {indiceMostrado + 1} / {spaces.length}
          </div>

          <div
            data-painel
            className="relative w-full max-w-5xl h-full max-h-[85vh] touch-pan-y"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1);
            }}
          >
            {/* Vizinhas já ficam montadas (invisíveis): ao navegar a foto troca na
                hora, sem esqueleto nem novo download. */}
            {[-1, 0, 1].map((off) => {
              const i = (indiceMostrado + off + spaces.length) % spaces.length;
              const atual = off === 0;
              return (
                <Image
                  key={spaces[i].img}
                  src={spaces[i].img}
                  alt={atual ? (spaces[i].alt ?? spaces[i].name ?? "") : ""}
                  aria-hidden={atual ? undefined : true}
                  fill
                  loading="eager"
                  quality={90}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className={`object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-opacity duration-200 ${
                    atual ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                />
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
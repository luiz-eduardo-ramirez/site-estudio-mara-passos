"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';


export default function Spaces() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  const spaces = [
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

  return (
    <section id="espacos" className="py-24 bg-mara-gray relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Conheça nossos <span className="text-mara-orange">espaços</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ambientes climatizados, equipados e preparados com muito carinho para o seu desenvolvimento.
          </p>
        </div>

        {/* --- CARROSSEL DE IMAGENS PREMIUM --- */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, FreeMode, Pagination, Autoplay]}
            navigation={true}
            freeMode={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                  className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-mara-orange/20 transition-all duration-500"
                  onClick={() => setSelectedImage(space.img)}
                >
                  {/* Imagem de Fundo (Next.js Image) */}
                  <Image
                    src={space.img}
                    alt={space.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Máscara de Gradiente Inferior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Textos Sobrepostos */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-md">
                      {space.name}
                    </h3>
                    {/* Linha decorativa que estica no hover */}
                    <div className="w-10 h-1 bg-mara-orange rounded-full transition-all duration-500 group-hover:w-20" />
                  </div>

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
        </div>

      </div>

      {/* ---------------- MODAL LIGHTBOX COM FRAMER MOTION ---------------- */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-mara-orange transition-colors bg-white/5 hover:bg-white/10 rounded-full p-3 z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X size={28} />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl h-full max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage}
                  alt="Espaço ampliado"
                  fill
                  className="object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                  sizes="100vw"
                  quality={100}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
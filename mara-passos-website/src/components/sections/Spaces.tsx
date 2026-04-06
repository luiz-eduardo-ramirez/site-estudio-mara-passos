"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
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
    { name: "Estúdio Mara Passos", img: "/spaces/fachada.jpg" },
    { name: "Sala de aula de piano", img: "/spaces/piano.jpg" },
    { name: "Certificados", img: "/spaces/certificados.jpg" },
    { name: "Recepção", img: "/spaces/entrada.jpg" },
    { name: "Área externa", img: "/spaces/externa.jpg" },
    { name: "Sala de Musicalização", img: "/spaces/musicalizacao.jpg" },
    { name: "Sala de Instrumentos", img: "/spaces/instrumentos.jpg" },
    { name: "Relaxamento", img: "/spaces/relaxamento.jpg" },
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

        {/* --- CARROSSEL DE IMAGENS ATUALIZADO --- */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, FreeMode]}
            navigation={true}
            freeMode={true}
            spaceBetween={24} // Aumentei um pouco o espaço entre as fotos maiores
            grabCursor={true}
            breakpoints={{
              320: { slidesPerView: 1.1 },
              640: { slidesPerView: 1.8 },
              768: { slidesPerView: 2.2 },
              // Antes era 4, agora são 3. Isso força as imagens a ficarem bem maiores no PC!
              1024: { slidesPerView: 3 },
            }}
            className="w-full pb-12"
          >
            {spaces.map((space, index) => (
              <SwiperSlide key={index}>
                {/* O onClick foi movido para o container pai para facilitar o clique */}
                <div
                  className="group flex flex-col items-center select-none cursor-pointer"
                  onClick={() => setSelectedImage(space.img)}
                >

                  {/* Container da Imagem */}
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-mara-orange shadow-lg transition-colors duration-300 relative bg-gray-800">
                    <img
                      src={space.img}
                      alt={space.name}

                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                    />
                  </div>

                  {/* Título da imagem ganha um brilho branco no hover */}
                  <h3 className="mt-5 text-mara-orange font-bold text-center text-base md:text-lg px-2 transition-colors group-hover:text-white">
                    {space.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      {/* ---------------- MODAL LIGHTBOX ---------------- */}
      {mounted && selectedImage && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-mara-orange transition-colors bg-black/50 rounded-full p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>

          <img
            src={selectedImage}
            alt="Espaço ampliado"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] transform transition-transform scale-100 animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </section>
  );
}
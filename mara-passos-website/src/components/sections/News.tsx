"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion'; // IMPORTAÇÃO ADICIONADA
import { newsData } from '../../app/data/news';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  fullText?: string;
  link?: string;
}

export default function News() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false); // NOVO ESTADO

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedNews]);

  // Função para fechar tudo com segurança
  const handleClose = () => {
    setSelectedNews(null);
    setIsImageExpanded(false);
  };

  return (
    <section id="noticias" className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
          Novidades no Estúdio
        </h2>

        {/* CARROSSEL */}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet custom-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active custom-pagination-bullet-active'
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full max-w-5xl rounded-2xl shadow-2xl border-2 border-orange-500 overflow-hidden"
        >
          {newsData.map((news: NewsItem) => (
            <SwiperSlide key={news.id}>
              <div className="relative w-full h-[400px] md:h-[500px] group">
                <img
                  src={news.image}
                  alt={news.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end items-center p-6 md:p-12 text-center pb-16">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
                    {news.title}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-lg mb-6 line-clamp-2 max-w-2xl relative z-10">
                    {news.description}
                  </p>

                  <button
                    onClick={() => setSelectedNews(news)}
                    className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors w-max shadow-lg relative z-10 cursor-pointer"
                  >
                    Ler a matéria completa
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* MODAL ANIMADO COM ANIMATE PRESENCE */}
        {mounted && createPortal(
          <AnimatePresence>
            {selectedNews && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
              >
                {/* Background Escuro (Backdrop) */}
                <div
                  className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                  onClick={handleClose}
                ></div>

                {/* Container do Modal */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-gray-950/90 backdrop-blur-2xl border border-orange-500/50 rounded-2xl w-[95vw] max-w-7xl h-auto md:h-[80vh] min-h-[60vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative z-10"
                  onClick={(e) => e.stopPropagation()}
                >

                  {/* Lado Esquerdo: Imagem com funcionalidade de Expandir */}
                  <div
                    className="w-full md:w-[55%] h-64 md:h-full relative bg-black flex items-center justify-center cursor-zoom-in group overflow-hidden"
                    onClick={() => setIsImageExpanded(true)}
                  >
                    <img
                      src={selectedNews.image}
                      alt={selectedNews.title}
                      className="w-full h-full object-contain p-2 md:p-4 transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay de Hover para indicar que é clicável */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-orange-500/90 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg backdrop-blur-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                        Expandir Imagem
                      </span>
                    </div>
                  </div>

                  {/* Lado Direito: Textos */}
                  <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar relative z-10">

                    {/* Botão de Fechar Principal (X) */}
                    <button
                      onClick={handleClose}
                      className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/80 hover:bg-orange-500 text-white rounded-full flex items-center justify-center transition-colors border border-white/20 hover:border-orange-500 cursor-pointer"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>

                    <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-8 drop-shadow-md mt-4 pr-10">
                      {selectedNews.title}
                    </h3>

                    <div className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 space-y-6 font-light">
                      <p>{selectedNews.fullText || selectedNews.description}</p>
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/10">
                      {selectedNews.link && (
                        <a
                          href={selectedNews.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 text-orange-400 hover:text-orange-300 transition-colors font-bold text-lg group"
                        >
                          Ver postagem original no Instagram
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                </motion.div>

                {/* IMAGEM EXPANDIDA (FULLSCREEN) */}
                <AnimatePresence>
                  {isImageExpanded && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", damping: 25 }}
                      className="absolute inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
                      onClick={() => setIsImageExpanded(false)}
                    >
                      <button
                        onClick={() => setIsImageExpanded(false)}
                        className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-orange-500 text-white rounded-full flex items-center justify-center transition-colors border border-white/20"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>

                      <img
                        src={selectedNews.image}
                        alt={selectedNews.title}
                        className="max-w-full max-h-[90vh] object-contain drop-shadow-2xl"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
}
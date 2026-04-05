"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
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

        {/* MODAL EXPANDIDO */}
        {mounted && selectedNews && createPortal(
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300"
            onClick={() => setSelectedNews(null)} 
          >
            <div 
              className="bg-gray-950/90 backdrop-blur-2xl border border-orange-500/50 rounded-2xl w-[95vw] max-w-7xl h-auto md:h-[80vh] min-h-[60vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
              onClick={(e) => e.stopPropagation()} 
            >
              
              {/* Lado Esquerdo: Imagem (Agora com 55% da largura e object-contain) */}
              <div className="w-full md:w-[55%] h-64 md:h-full relative bg-black flex items-center justify-center">
                <img 
                  src={selectedNews.image} 
                  alt={selectedNews.title} 
                  /* object-contain garante que a foto apareça 100% sem cortes */
                  className="w-full h-full object-contain p-2 md:p-4"
                />
              </div>

              {/* Lado Direito: Textos (Agora com 45% da largura) */}
              <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar relative z-10">
                
                {/* Botão de Fechar (X) - Movido para dentro do container de texto para não ser bloqueado */}
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/80 hover:bg-orange-500 text-white rounded-full flex items-center justify-center transition-colors border border-white/20 hover:border-orange-500 cursor-pointer"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                {/* Margem extra na direita (pr-10) para o texto não encostar no botão X */}
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

            </div>
          </div>,
          document.body
        )}

      </div>
    </section>
  );
}
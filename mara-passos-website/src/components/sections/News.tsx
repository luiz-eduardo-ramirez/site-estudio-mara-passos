"use client";

import React from 'react';
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
  link?: string;
}

export default function News() {
  const instagramUrl = "https://www.instagram.com/estudiomarapassos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

  return (
    <section id="noticias" className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
          Novidades no Estúdio
        </h2>

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
          // Adicionada a borda laranja aqui no container principal do Swiper
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
                  
                  {/* Botão Laranja redirecionando para o Instagram */}
                  <a 
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors w-max shadow-lg relative z-10"
                  >
                    Saber mais
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
"use client";

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Playfair_Display } from 'next/font/google';
import { ArrowRight, Music2 } from 'lucide-react';
import { newsData, type NewsItem } from '../../app/data/news';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export default function News() {
  return (
    <section id="noticias" className="py-20 md:py-28 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-mara-orange text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            <Music2 size={14} aria-hidden="true" />
            Fique por dentro
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Novidades no <span className="text-mara-orange">Estúdio</span>
          </h2>
        </div>
      </div>

      {/* CARROSSEL FULL-BLEED — a imagem ocupa toda a largura da tela, alinhado à borda real do viewport */}
      <div className="relative w-full">
        <Swiper
          spaceBetween={0}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet custom-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active custom-pagination-bullet-active',
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="news-swiper w-full"
        >
          {newsData.map((news: NewsItem) => (
            <SwiperSlide key={news.id}>
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] group overflow-hidden bg-mara-gray">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="100vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-20">
                  <div className="max-w-2xl">
                    <h3 className={`${playfair.className} text-2xl sm:text-3xl md:text-5xl font-bold italic text-white mb-3 sm:mb-4 leading-[1.15] drop-shadow-md`}>
                      {news.title}
                    </h3>
                    <p className="text-gray-200/90 text-sm sm:text-base md:text-lg mb-5 sm:mb-8 line-clamp-2 font-light leading-relaxed max-w-xl">
                      {news.description}
                    </p>

                    <Link
                      href={`/noticias/${news.slug}`}
                      className="group/cta inline-flex items-center gap-2 py-3 text-white text-sm sm:text-base font-semibold uppercase tracking-wide border-b-2 border-mara-orange hover:text-mara-orange transition-colors"
                    >
                      Ler a matéria completa
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover/cta:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Playfair_Display } from 'next/font/google';
import { ArrowRight, ChevronLeft, ChevronRight, Music2 } from 'lucide-react';
import { newsData, type NewsItem } from '../../app/data/news';
import Image from 'next/image';

import 'swiper/css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export default function News() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);

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

      <div className="mx-auto w-full max-w-6xl px-4">
        <Swiper
          spaceBetween={24}
          rewind
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActive(s.realIndex)}
          className="news-swiper w-full"
        >
          {newsData.map((news: NewsItem, index) => (
            <SwiperSlide key={news.id} className="!h-auto">
              {/*
               * Imagem e texto em painéis separados: as artes das notícias são cartazes
               * com texto próprio, e o título sobreposto disputava espaço com elas.
               */}
              <article className="group grid h-full overflow-hidden rounded-2xl border border-white/10 bg-mara-gray lg:grid-cols-[1.35fr_1fr]">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[26rem] overflow-hidden bg-black">
                  {/* Fundo desfocado da própria arte preenche as sobras sem cortar o cartaz */}
                  <Image
                    src={news.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    className="object-cover scale-110 blur-2xl opacity-40"
                    sizes="(min-width: 1024px) 640px, 100vw"
                    priority={index === 0}
                  />
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 640px, 100vw"
                    priority={index === 0}
                  />
                </div>

                <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10">
                  <span className="text-mara-orange text-xs font-semibold tracking-[0.25em] uppercase">
                    {news.category ?? 'Novidades'}
                  </span>
                  <h3 className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl font-bold italic text-white leading-[1.15] text-balance`}>
                    {news.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3 lg:line-clamp-4">
                    {news.description}
                  </p>

                  <Link
                    href={`/noticias/${news.slug}`}
                    className="group/cta mt-2 inline-flex w-fit items-center gap-2 py-3 text-white text-sm sm:text-base font-semibold uppercase tracking-wide border-b-2 border-mara-orange hover:text-mara-orange transition-colors"
                  >
                    Ler a matéria completa
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover/cta:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controles fora da imagem, para nunca cobrirem a arte nem o texto */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            aria-label="Notícia anterior"
            className="news-nav-btn"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-1">
            {newsData.map((news, index) => (
              <button
                key={news.id}
                type="button"
                onClick={() => swiper?.slideTo(index)}
                aria-label={`Ir para a notícia ${index + 1}: ${news.title}`}
                aria-current={active === index ? 'true' : undefined}
                className="news-dot"
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            aria-label="Próxima notícia"
            className="news-nav-btn"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

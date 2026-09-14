import Link from 'next/link';
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';
import { playfair } from '../../lib/fonts';

type ArticleHeroProps = {
  title: string;
  category?: string;
  dateISO?: string;
  dateLabel: string | null;
  readingTime: number;
};

export default function ArticleHero({
  title,
  category,
  dateISO,
  dateLabel,
  readingTime,
}: ArticleHeroProps) {
  return (
    <header className="relative">
      {/* Brilho laranja difuso atrás do título — puramente decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[380px] w-[min(760px,120%)] rounded-full bg-mara-orange/20 blur-[130px]"
      />

      <div className="relative animate-fade-in-up">
        <Link
          href="/#noticias"
          className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-gray-400 hover:text-mara-orange focus-visible:text-mara-orange transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mara-orange"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Voltar para as notícias
        </Link>

        <p className="mt-8 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-mara-orange">
          {category ?? 'Novidades'}
        </p>

        <h1
          className={`${playfair.className} mt-5 text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-white leading-[1.1] text-balance max-w-[20ch]`}
        >
          {title}
        </h1>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
          {dateLabel && (
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={15} aria-hidden="true" />
              <time dateTime={dateISO}>{dateLabel}</time>
            </span>
          )}
          <span className="inline-flex items-center gap-2">
            <Clock size={15} aria-hidden="true" />
            {readingTime} min de leitura
          </span>
        </div>

        <div aria-hidden="true" className="mt-8 flex items-center gap-3">
          <span className="h-px w-16 bg-mara-orange" />
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </div>
    </header>
  );
}

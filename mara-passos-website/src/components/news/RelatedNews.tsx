import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { playfair } from '../../lib/fonts';
import type { NewsItem } from '../../app/data/news';

type RelatedNewsProps = {
  items: NewsItem[];
};

export default function RelatedNews({ items }: RelatedNewsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="leia-tambem" className="mt-16 md:mt-24">
      <div className="flex items-center gap-4 mb-8">
        <h2
          id="leia-tambem"
          className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-mara-orange whitespace-nowrap"
        >
          Leia também
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/noticias/${item.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-mara-gray hover:border-mara-orange/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mara-orange"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-black">
              <Image
                src={item.image}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3
                className={`${playfair.className} text-lg md:text-xl font-bold italic text-white leading-snug text-pretty`}
              >
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed line-clamp-3">
                {item.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mara-orange">
                Ler matéria
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

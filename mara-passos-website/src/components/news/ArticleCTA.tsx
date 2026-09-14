"use client";

import { MessageCircle } from 'lucide-react';
import { playfair } from '../../lib/fonts';

const NUMERO_WHATSAPP = '5511972405722';

type JanelaComGtag = Window & {
  gtag?: (comando: string, evento: string, parametros?: Record<string, string>) => void;
};

type ArticleCTAProps = {
  newsTitle: string;
};

export default function ArticleCTA({ newsTitle }: ArticleCTAProps) {
  const mensagem = `Olá! Vi a notícia "${newsTitle}" no site do Estúdio Mara Passos e gostaria de saber mais sobre as aulas.`;
  const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

  const registrarClique = () => {
    const janela = window as JanelaComGtag;
    if (typeof janela.gtag === 'function') {
      janela.gtag('event', 'lead_whatsapp', { origem: 'noticia' });
    }
  };

  return (
    <section className="mt-16 md:mt-24 rounded-2xl md:rounded-3xl border border-mara-orange/25 bg-gradient-to-br from-mara-orange/12 to-transparent p-8 md:p-12">
      <h2 className={`${playfair.className} text-2xl md:text-3xl font-bold italic text-white text-balance`}>
        Quer fazer parte do próximo capítulo?
      </h2>
      <p className="mt-4 text-gray-300 leading-relaxed max-w-[60ch]">
        Agende uma aula experimental e conheça o estúdio de pertinho. É só mandar uma mensagem
        que a gente encontra o melhor horário para você.
      </p>

      <a
        href={urlWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={registrarClique}
        className="mt-8 inline-flex items-center gap-3 min-h-12 px-7 rounded-full bg-mara-orange text-white font-bold hover:bg-mara-orange/90 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mara-orange"
      >
        <MessageCircle size={20} aria-hidden="true" />
        Agendar aula experimental
      </a>
    </section>
  );
}

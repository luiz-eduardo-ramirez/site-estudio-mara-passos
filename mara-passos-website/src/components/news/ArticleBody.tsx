import { Fragment } from 'react';
import { playfair } from '../../lib/fonts';

type ArticleBodyProps = {
  paragraphs: string[];
  quote?: string;
};

function PullQuote({ children }: { children: string }) {
  return (
    <blockquote className="my-10 md:my-12 border-l-2 border-mara-orange pl-6 md:pl-8">
      <p
        className={`${playfair.className} text-xl sm:text-2xl md:text-3xl italic font-semibold text-white leading-snug text-pretty`}
      >
        {children}
      </p>
    </blockquote>
  );
}

/**
 * Corpo da matéria em medida de leitura (~68 caracteres por linha).
 * O primeiro parágrafo vira lead com capitular; a frase de destaque, quando existir,
 * entra depois do terceiro parágrafo.
 */
export default function ArticleBody({ paragraphs, quote }: ArticleBodyProps) {
  const posicaoDaCitacao = quote ? Math.min(3, paragraphs.length) : -1;

  return (
    <div className="max-w-[68ch]">
      {paragraphs.map((paragraph, index) => (
        <Fragment key={index}>
          {index === posicaoDaCitacao && quote && <PullQuote>{quote}</PullQuote>}

          {index === 0 ? (
            <p
              className={`${playfair.className} text-lg sm:text-xl md:text-2xl text-white/90 leading-[1.6] text-pretty first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[3.5em] first-letter:font-bold first-letter:leading-[0.75] first-letter:text-mara-orange`}
            >
              {paragraph}
            </p>
          ) : (
            <p className="mt-6 text-base sm:text-lg text-gray-300 leading-[1.8] text-pretty">
              {paragraph}
            </p>
          )}
        </Fragment>
      ))}

      {quote && posicaoDaCitacao >= paragraphs.length && <PullQuote>{quote}</PullQuote>}
    </div>
  );
}

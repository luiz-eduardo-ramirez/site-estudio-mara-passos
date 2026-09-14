import Image from 'next/image';
import type { ImageSize } from '../../lib/imageSize';

type ArticleFigureProps = {
  src: string;
  alt: string;
  caption?: string;
  /** Dimensões reais do arquivo, lidas em tempo de build. */
  size: ImageSize | null;
};

const MOLDURA_BASE = 'relative w-full overflow-hidden rounded-2xl';

/**
 * Imagem principal da matéria — largura total no mobile, coluna lateral no desktop.
 *
 * Quando as dimensões do arquivo são conhecidas, a moldura assume a proporção exata
 * da imagem: ela preenche tudo, sem corte e sem faixas sobrando nas laterais.
 * Se a leitura falhar (formato não reconhecido), caímos numa proporção fixa com a
 * própria imagem desfocada ao fundo para não deixar tarja preta.
 */
export default function ArticleFigure({ src, alt, caption, size }: ArticleFigureProps) {
  return (
    <figure>
      {size ? (
        <div className={MOLDURA_BASE} style={{ aspectRatio: `${size.width} / ${size.height}` }}>
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 345px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className={`${MOLDURA_BASE} aspect-[4/3] sm:aspect-[16/10] lg:aspect-square border border-white/10 bg-mara-gray`}>
          <Image
            src={src}
            alt=""
            aria-hidden="true"
            fill
            sizes="64px"
            className="object-cover scale-125 blur-2xl opacity-40"
          />
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 345px"
            className="relative object-contain"
          />
        </div>
      )}

      {caption && (
        <figcaption className="mt-4 text-sm text-gray-400 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

import { Playfair_Display } from 'next/font/google';

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  // Expõe --font-playfair além do .className já usado pelas páginas de notícia.
  // A página /links precisa da família dentro de <text> de um SVG, onde aplicar
  // uma classe não é prático. Adição pura: nada do que já existe muda.
  variable: '--font-playfair',
});

import { Playfair_Display } from 'next/font/google';

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

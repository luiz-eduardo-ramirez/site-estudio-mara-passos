import { Metadata } from 'next';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Instruments from '../../components/sections/Instruments';
import { instrumentsList } from '../../data/instrumentsList';

export const metadata: Metadata = {
  title: 'Cursos de Música na Lapa | Estúdio Mara Passos',
  description: 'Conheça nossos cursos de piano, violão, canto, musicalização e muito mais no Estúdio Mara Passos em São Paulo.',
};
export default function CursosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 min-h-screen">
        <Instruments />
      </main>
      <Footer />
    </>
  );
}

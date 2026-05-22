import { Metadata } from 'next';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import AboutUs from '../../components/sections/AboutUs';

export const metadata: Metadata = {
  title: 'Quem Somos | Estúdio Mara Passos - Escola de Música em São Paulo',
  description: 'Descubra a história e a missão do Estúdio Mara Passos, uma escola de música com metodologia lúdica, curativa e acolhedora em São Paulo.',
};

export default function SobreNosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 min-h-screen">
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}

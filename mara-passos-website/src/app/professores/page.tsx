import { Metadata } from 'next';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Teachers from '../../components/sections/Teachers';

export const metadata: Metadata = {
  title: 'Professores de Música em São Paulo | Estúdio Mara Passos',
  description: 'Conheça nossa equipe de professores de música altamente qualificados e experientes no Estúdio Mara Passos.',
};

export default function ProfessoresPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 min-h-screen">
        <Teachers />
      </main>
      <Footer />
    </>
  );
}

import { Metadata } from 'next';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Instruments from '../../components/sections/Instruments';
import { instrumentsList } from '../../data/instrumentsList';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const cursoParam = sp?.curso;
  const curso = Array.isArray(cursoParam) ? cursoParam[0] : cursoParam;

  if (curso) {
    const instrument = instrumentsList.find(inst => inst.nome === curso);
    if (instrument) {
      return {
        title: `Aulas de ${instrument.nome} em São Paulo | Estúdio Mara Passos`,
        description: instrument.detalhes,
      };
    }
  }

  return {
    title: 'Cursos de Música em São Paulo | Estúdio Mara Passos',
    description: 'Conheça nossos cursos de piano, violão, canto, musicalização e muito mais no Estúdio Mara Passos em São Paulo.',
  };
}

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

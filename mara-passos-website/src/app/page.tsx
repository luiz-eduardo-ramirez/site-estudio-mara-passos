import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import Instruments from "../components/sections/Instruments";
import AboutUs from "../components/sections/AboutUs";
import About from "../components/sections/About";
import Spaces from "../components/sections/Spaces";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
import Teachers from "../components/sections/Teachers";
import ScrollReveal from "../components/layout/ScrollReveal";
import FloatingNotes from "./FloatingNotes";
import News from "../components/sections/News";
import Presentation from "../components/sections/Presentation";
import StudentPortal from "../components/sections/StudentPortal";
import FAQ from "../components/sections/FAQ"; // 1. Importa apenas o componente
import { faqData } from "../components/sections/faqData";// 2. Importa os dados do novo arquivo (ajuste o caminho se necessário)
import ChatbotLocal from "../app/Chatbot";
import SocialButtons from "../components/layout/SocialButtons";
import { Metadata } from 'next';
import { instrumentsList } from '../data/instrumentsList';

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
    title: "Estúdio Musical Mara Passos",
    description: "Escola de música com metodologia lúdica, curativa e acolhedora. Cursos de piano, violão, canto, musicalização e muito mais.",
  };
}

export default async function Home({ searchParams }: Props) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    // 3. Tipagem explícita adicionada ao 'item' para resolver o erro 7006
    "mainEntity": faqData.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <FloatingNotes />

      <main>
        <Hero />
        <ScrollReveal><News /></ScrollReveal>
        <Presentation />
        <ScrollReveal><About /></ScrollReveal>
        <ScrollReveal><Instruments /></ScrollReveal>
        <StudentPortal />
        <Teachers />
        <ScrollReveal><Spaces /></ScrollReveal>
        <ScrollReveal><AboutUs /></ScrollReveal>
        <ScrollReveal><Testimonials /></ScrollReveal>
        <ScrollReveal><FAQ /></ScrollReveal>
        <ScrollReveal><Contact /></ScrollReveal>
      </main>

      <Footer />
      <SocialButtons />
      <ChatbotLocal /> {/* 2. Renderize o componente aqui */}
    </>
  );
}
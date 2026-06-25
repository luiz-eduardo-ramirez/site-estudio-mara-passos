import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import ScrollReveal from "../components/layout/ScrollReveal";
import FloatingNotes from "./FloatingNotes";
import SocialButtons from "../components/layout/SocialButtons";
import dynamic from "next/dynamic";
import ChatbotWrapper from "../app/ChatbotWrapper";

const News = dynamic(() => import("../components/sections/News"));
const Presentation = dynamic(() => import("../components/sections/Presentation"));
const About = dynamic(() => import("../components/sections/About"));
const Instruments = dynamic(() => import("../components/sections/Instruments"));
const StudentPortal = dynamic(() => import("../components/sections/StudentPortal"));
const Teachers = dynamic(() => import("../components/sections/Teachers"));
const Spaces = dynamic(() => import("../components/sections/Spaces"));
const AboutUs = dynamic(() => import("../components/sections/AboutUs"));
const Testimonials = dynamic(() => import("../components/sections/Testimonials"));
const FAQ = dynamic(() => import("../components/sections/FAQ"));
const Contact = dynamic(() => import("../components/sections/Contact"));

import { faqData } from "../components/sections/faqData";
import { Metadata } from 'next';
import { instrumentsList } from '../data/instrumentsList';

export const metadata: Metadata = {
  title: "Estúdio Musical Mara Passos",
  description: "Escola de música com metodologia lúdica, curativa e acolhedora. Cursos de piano, violão, canto, musicalização e muito mais.",
  alternates: {
    canonical: "https://estudiomusicalmarapassos.com.br",
  }
};

export default function Home() {
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

        <ScrollReveal><Instruments /></ScrollReveal>
        <StudentPortal />

        <ScrollReveal><Spaces /></ScrollReveal>

        <Teachers />

        <ScrollReveal><FAQ /></ScrollReveal>

        <ScrollReveal><AboutUs /></ScrollReveal>
        <Presentation />
        <ScrollReveal><About /></ScrollReveal>
        
        <ScrollReveal><Testimonials /></ScrollReveal>

        <ScrollReveal><Contact /></ScrollReveal>
      </main>

      <Footer />
      <SocialButtons />
      <ChatbotWrapper /> {/* 2. Renderize o componente aqui */}
    </>
  );
}
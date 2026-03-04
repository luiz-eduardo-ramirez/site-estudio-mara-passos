import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import Instruments from "../components/sections/Instruments";
import About from "../components/sections/About";
import Spaces from "../components/sections/Spaces";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
import Teachers from "../components/sections/Teachers";
import ScrollReveal from "../components/layout/ScrollReveal";
import FloatingNotes from "../components/layout/FloatingNotes"; // Importação normal!

export default function Home() {
  return (
    <>
      <Navbar />
      <FloatingNotes /> 
      
      <main>
        <Hero />
        <ScrollReveal><About /></ScrollReveal>
        <ScrollReveal><Instruments /></ScrollReveal>
        <ScrollReveal><Teachers /></ScrollReveal>
        <ScrollReveal><Spaces /></ScrollReveal>
        <ScrollReveal><Testimonials /></ScrollReveal>
        <ScrollReveal><Contact /></ScrollReveal>
      </main>
      
      <Footer />
    </>
  );
}
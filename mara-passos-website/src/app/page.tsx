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
import ChatbotLocal from "../app/Chatbot";
import SocialButtons from "../components/layout/SocialButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <FloatingNotes />

      <main>
        <Hero />
        <ScrollReveal><News /></ScrollReveal>
        <Presentation />
        <ScrollReveal><About /></ScrollReveal>
        <ScrollReveal><Instruments /></ScrollReveal>
        <Teachers />
        <ScrollReveal><Spaces /></ScrollReveal>
        <ScrollReveal><AboutUs /></ScrollReveal>
        <ScrollReveal><Testimonials /></ScrollReveal>
        <ScrollReveal><Contact /></ScrollReveal>
      </main>

      <Footer />
      <SocialButtons />
      <ChatbotLocal /> {/* 2. Renderize o componente aqui */}
    </>
  );
}
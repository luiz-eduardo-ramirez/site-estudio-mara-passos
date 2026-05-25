"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, HelpCircle, Brain, Music, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Contact from "../../components/sections/Contact";
import SocialButtons from "../../components/layout/SocialButtons";
import Navbar from "../../components/layout/Navbar";

export default function AulasDePiano() {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollToForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const element = document.getElementById('agendamento');
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = window.innerWidth > 768 ? 320 : 280;
            carouselRef.current.scrollBy({ 
                left: direction === 'left' ? -scrollAmount : scrollAmount, 
                behavior: 'smooth' 
            });
        }
    };

    return (
        <main className="bg-[#0a0a0a] min-h-screen text-white pb-24 relative overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Course",
                    "name": "Aulas de Piano",
                    "description": "Aprenda piano com uma metodologia que respeita seu tempo. Do iniciante ao avançado, no Estúdio Mara Passos você encontra o ambiente ideal para evoluir.",
                    "provider": {
                        "@type": "MusicSchool",
                        "name": "Estúdio Musical Mara Passos",
                        "sameAs": "https://estudiomusicalmarapassos.com.br"
                    },
                    "courseCode": "CURSO-PIANO",
                    "hasCourseInstance": {
                        "@type": "CourseInstance",
                        "courseMode": "Onsite",
                        "location": {
                            "@type": "Place",
                            "name": "Estúdio Musical Mara Passos",
                            "address": "Rua Cuevas 206, Lapa, SP"
                        }
                    }
                })}}
            />

            {/* NAVEGAÇÃO SUPERIOR */}
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative w-full pt-40 pb-32 mb-24 flex flex-col items-center justify-center min-h-[85vh] overflow-hidden">
                <video 
                    src="/hero-bg.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                
                <motion.header 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-6 max-w-5xl text-center relative z-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mara-orange/10 text-mara-orange rounded-full text-sm font-semibold mb-6 border border-mara-orange/20">
                        <span className="uppercase tracking-wider text-xs font-bold">Vagas Limitadas</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight tracking-tight drop-shadow-lg">
                        Aulas de Piano na <br />
                        <span className="text-mara-orange">Lapa</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                        Aprenda piano com uma metodologia que respeita seu tempo. Do iniciante ao avançado, no Estúdio Mara Passos você encontra o ambiente ideal para evoluir.
                    </p>

                    <button
                        onClick={scrollToForm}
                        className="bg-mara-orange text-white px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(242,101,34,0.3)] hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300"
                    >
                        Agendar Minha Aula Experimental
                    </button>
                </motion.header>
            </section>

            {/* CONTEÚDO TÉCNICO */}
            <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-6 max-w-6xl mb-32"
            >
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative bg-neutral-900 ring-1 ring-white/10">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/pv1RpR_RdbI"
                                title="Aulas de Piano - Estúdio Mara Passos"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="absolute -inset-4 bg-mara-orange/10 blur-[60px] -z-10 opacity-50 transition-opacity duration-500 group-hover:opacity-70"></div>
                    </div>

                    <div className="w-full lg:w-1/2 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold">Diferenciais do nosso curso</h2>

                        <div className="grid gap-6">
                            {[
                                { title: "Instrutores Qualificados", text: "Professores graduados e com vasta experiência no ensino de piano popular e erudito." },
                                { title: "Currículo Estruturado", text: "Organização clara para você perceber sua evolução a cada aula, sem pular etapas essenciais." },
                                { title: "Aulas Individuais", text: "Foco total na sua técnica, postura e repertório preferido. O professor adapta-se ao seu ritmo." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
                                    <CheckCircle className="text-mara-orange shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-bold mb-2 text-gray-100">{item.title}</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* SEÇÃO SLOGAN & FILOSOFIA */}
            <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-b from-transparent via-mara-orange/5 to-transparent py-24 mb-32"
            >
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <Sparkles className="text-mara-orange mx-auto mb-6" size={36} />
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8">
                        "Descubra o Poder da Música"
                    </h2>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-10">
                        A alma do Estúdio Mara Passos consiste em provar que <span className="text-mara-orange font-semibold">a música é para todas as idades</span>. Mais do que tocar um instrumento, aprender piano estimula conexões neurais profundas, melhora a concentração e contribui ativamente para o desenvolvimento cerebral.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 text-gray-300 text-base font-medium">
                        <div className="flex items-center gap-2"><Brain className="text-mara-orange" size={22} /> Estimula o Foco</div>
                        <div className="flex items-center gap-2"><Music className="text-mara-orange" size={22} /> Para Todas as Idades</div>
                        <div className="flex items-center gap-2"><CheckCircle className="text-mara-orange" size={22} /> Bem-estar Mental</div>
                    </div>
                </div>
            </motion.section>

            {/* SEÇÃO DE PROVA SOCIAL - CARROSSEL ELEGANTE */}
            <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full mb-32 relative"
            >
                <div className="container mx-auto px-6 text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">A Evolução dos Nossos Alunos</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">Veja na prática os resultados da nossa metodologia com alunos reais.</p>
                </div>

                <div className="relative max-w-[1400px] mx-auto px-6">
                    {/* Botão Anterior */}
                    <button 
                        onClick={() => scrollCarousel('left')}
                        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-mara-orange text-white w-12 h-12 rounded-full items-center justify-center backdrop-blur-md border border-white/10 transition-all"
                        aria-label="Ver vídeo anterior"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Container do Carrossel */}
                    <div 
                        ref={carouselRef}
                        className="flex overflow-x-auto gap-4 md:gap-6 pb-8 pt-4 snap-x snap-mandatory scrollbar-hide items-center"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {[
                            { src: "/piano-1.mp4", poster: "/piano-1-poster.jpg" },
                            { src: "/piano-2.mp4", poster: "/piano-2-poster.jpg" },
                            { src: "/piano-3.mp4", poster: "/piano-3-poster.jpg" },
                            { src: "/piano-4.mp4", poster: "/piano-4-poster.jpg" },
                            { src: "/piano-5.mp4", poster: "/piano-5-poster.jpg" }
                        ].map((video, i) => (
                            <div 
                                key={i} 
                                className="relative w-[260px] sm:w-[280px] md:w-[320px] shrink-0 snap-center bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 hover:border-mara-orange/50 transition-all group aspect-[9/16] shadow-xl"
                            >
                                <video 
                                    src={video.src}
                                    poster={video.poster}
                                    className="video-player absolute inset-0 w-full h-full object-cover"
                                    controls
                                    preload="metadata"
                                    playsInline
                                />
                            </div>
                        ))}
                    </div>

                    {/* Botão Seguinte */}
                    <button 
                        onClick={() => scrollCarousel('right')}
                        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-mara-orange text-white w-12 h-12 rounded-full items-center justify-center backdrop-blur-md border border-white/10 transition-all"
                        aria-label="Ver próximo vídeo"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </motion.section>

            {/* IMAGENS DO ESTÚDIO */}
            <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-6 max-w-6xl mb-32"
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Conheça o Nosso Espaço na Lapa</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">Um ambiente totalmente climatizado, acústico e equipado com os melhores instrumentos para o seu aprendizado.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative aspect-video md:aspect-auto md:h-80 rounded-3xl overflow-hidden group border border-white/10 shadow-lg">
                        <Image 
                            src="/spaces/entrada.jpg"
                            alt="Sala de Piano Estúdio Mara Passos" 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="relative aspect-video md:aspect-auto md:h-80 rounded-3xl overflow-hidden group border border-white/10 shadow-lg">
                        <Image 
                            src="/spaces/instrumentos.jpg"
                            alt="Nossos Pianos" 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="relative aspect-video md:aspect-auto md:h-80 rounded-3xl overflow-hidden group border border-white/10 shadow-lg">
                        <Image 
                            src="/spaces/relaxamento.jpg"
                            alt="Ambiente de Aulas Lapa" 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
            </motion.section>

            {/* SEÇÃO DE QUEBRA DE OBJEÇÕES (FAQ) */}
            <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-6 max-w-4xl mb-32"
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Dúvidas Frequentes</h2>
                    <p className="text-gray-300 text-lg">Tudo o que precisa de saber para dar o primeiro passo sem receios.</p>
                </div>

                <div className="grid gap-6">
                    {[
                        { q: "Preciso ter um piano em casa para começar?", a: "Não! Nas primeiras fases do curso, pode praticar utilizando a infraestrutura do nosso estúdio ou até começar com um teclado eletrónico simples em casa. Nós damos-lhe todo o suporte e orientação para quando decidir adquirir o seu." },
                        { q: "Sou adulto e nunca toquei. Ainda vou a tempo de aprender?", a: "Absolutamente. A maior parte dos nossos alunos começou do zero na idade adulta. A nossa metodologia é focada na prática e respeita o ritmo biológico de cada pessoa, provando que a música não tem idade." },
                        { q: "Como funciona a aula experimental gratuita?", a: "É um encontro presencial de 30 a 45 minutos onde conhece o professor, visita as salas, faz o seu primeiro contacto prático com o piano e avaliamos os seus objetivos musicais. É 100% sem compromisso!" },
                        { q: "As aulas são em grupo ou individuais?", a: "As nossas aulas são estritamente individuais. Dessa forma, o professor consegue focar-se a 100% na sua postura, técnica e no repertório musical que mais gosta (seja clássico ou popular)." }
                    ].map((item, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 flex gap-5 items-start hover:bg-white/10 transition-colors">
                            <HelpCircle className="text-mara-orange shrink-0 mt-1" size={26} />
                            <div>
                                <h3 className="text-xl font-bold mb-3 text-white">{item.q}</h3>
                                <p className="text-gray-300 text-base leading-relaxed">{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* SEÇÃO DO FORMULÁRIO */}
            <div id="agendamento" className="scroll-mt-32">
                <Contact />
            </div>

            <SocialButtons />

            {/* Estilos Globais Extra */}
            <style jsx global>{`
                /* Esconder a barra de rolagem no carrossel e manter funcional */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                
                /* Forçar o comportamento cover no modo ecrã inteiro (Fullscreen API) */
                .video-player:fullscreen {
                    object-fit: cover !important;
                    aspect-ratio: 9/16 !important;
                }
                
                .video-player:-webkit-full-screen {
                    object-fit: cover !important;
                    aspect-ratio: 9/16 !important;
                }
            `}</style>
        </main>
    );
}
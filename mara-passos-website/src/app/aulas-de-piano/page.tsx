"use client";

import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Contact from "../../components/sections/Contact"; // Ajuste o caminho conforme sua pasta

export default function AulasDePiano() {

    const scrollToForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const element = document.getElementById('agendamento');
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <main className="bg-[#0a0a0a] min-h-screen text-white pb-24 relative">

            {/* NAVEGAÇÃO SUPERIOR */}
            <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-center container mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all group"
                >
                    <ArrowLeft size={16} className="text-gray-400 group-hover:text-white transition-colors group-hover:-translate-x-1" />
                    Voltar para o site principal
                </Link>
            </div>

            {/* HERO SECTION */}
            <header className="container mx-auto px-6 max-w-5xl text-center mb-20 pt-32">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mara-orange/10 text-mara-orange rounded-full text-sm font-semibold mb-6 border border-mara-orange/20">
                    <span className="uppercase tracking-wider text-xs font-bold">Vagas Limitadas</span>
                </div>

                <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                    Aulas de Piano em <br />
                    <span className="text-mara-orange">São Paulo</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Aprenda piano com uma metodologia que respeita seu tempo. Do iniciante ao avançado, no Estúdio Mara Passos você encontra o ambiente ideal para evoluir.
                </p>

                <button
                    onClick={scrollToForm}
                    className="bg-mara-orange text-white px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(242,101,34,0.3)] hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300"
                >
                    Agendar Minha Aula Experimental
                </button>
            </header>

            {/* CONTEÚDO TÉCNICO */}
            <section className="container mx-auto px-6 max-w-6xl mb-24">
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
                        <div className="absolute -inset-4 bg-mara-orange/10 blur-[60px] -z-10 opacity-50"></div>
                    </div>

                    <div className="w-full lg:w-1/2 space-y-8">
                        <h2 className="text-3xl font-bold">Diferenciais do nosso curso</h2>

                        <div className="grid gap-6">
                            {[
                                { title: "Instrutores Qualificados", text: "Professores graduados e com vasta experiência no ensino de piano popular e erudito." },
                                { title: "Currículo Estruturado", text: "Organização clara para você perceber sua evolução a cada aula, sem pular etapas essenciais." },
                                { title: "Aulas Individuais", text: "Foco total na sua técnica, postura e repertório preferido. O professor adapta-se ao seu ritmo." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                    <CheckCircle className="text-mara-orange shrink-0" size={24} />
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                        <p className="text-gray-400 text-sm">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SEÇÃO DO FORMULÁRIO (Âncora do Scroll) */}
            {/* Agora o componente Contact é renderizado de forma livre, sem estar preso em outra caixa */}
            <div id="agendamento" className="scroll-mt-24">
                <Contact />
            </div>

        </main>
    );
}
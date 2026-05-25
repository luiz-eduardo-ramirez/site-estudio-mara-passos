"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Smartphone, CreditCard, FileSignature, History } from "lucide-react";

export default function StudentPortal() {
    return (
        <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-6 max-w-6xl my-32"
        >
            <div className="bg-gradient-to-br from-neutral-900 to-[#140d0a] rounded-[2.5rem] p-8 md:p-14 border border-mara-orange/20 shadow-2xl overflow-hidden relative">
                
                {/* Elemento de background decorativo */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-mara-orange/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                    
                    {/* Texto e Benefícios */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-gray-200 rounded-full text-sm font-semibold border border-white/10">
                            <Smartphone size={16} className="text-mara-orange" />
                            <span className="uppercase tracking-wider text-xs font-bold">Tecnologia Exclusiva</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
                            Seu aprendizado na <span className="text-mara-orange">palma da mão</span>
                        </h2>

                        <p className="text-gray-300 text-lg leading-relaxed">
                            Diga adeus às confusões de agenda pelo WhatsApp. Nossos alunos têm acesso a um <strong>Portal Exclusivo</strong> para gerenciar 100% da sua jornada musical com total autonomia e transparência.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-5 pt-4">
                            {[
                                { icon: CalendarDays, title: "Agenda Inteligente", desc: "Visualize suas aulas em lista ou calendário." },
                                { icon: History, title: "Reagendamentos", desc: "Cancele ou remarque com 24h de antecedência." },
                                { icon: CreditCard, title: "Pagamento Facilitado", desc: "Pague via Pix e consulte seu histórico na hora." },
                                { icon: FileSignature, title: "Contratos Digitais", desc: "Segurança jurídica gerada pelo próprio sistema." }
                            ].map((feature, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="bg-mara-orange/20 p-2 rounded-lg shrink-0">
                                        <feature.icon className="text-mara-orange" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-100 text-sm mb-1">{feature.title}</h4>
                                        <p className="text-xs text-gray-400 leading-relaxed">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mockup do Sistema */}
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="w-full rounded-2xl overflow-hidden shadow-2xl relative bg-neutral-950 ring-1 ring-white/10 transform transition-transform duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(242,101,34,0.15)]">
                            {/* Barra estilo navegador da Apple */}
                            <div className="h-8 bg-neutral-900 border-b border-white/5 flex items-center px-4 gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                            </div>
                            
                            {/* CORREÇÃO AQUI: Fundo escuro e imagem sem cortes */}
                            <div className="relative w-full bg-[#0d0a09] flex justify-center items-center">
                                <Image 
                                    src="/images/portal.png" // Substitua pelo caminho correto da sua nova imagem
                                    alt="Dashboard do Portal do Aluno Estúdio Mara Passos" 
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.section>
    );
}  
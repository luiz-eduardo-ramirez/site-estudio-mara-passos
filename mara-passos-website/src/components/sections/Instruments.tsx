"use client";

import { useState, useEffect, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link'; // Importação do Link adicionada
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { instrumentsList } from '../../data/instrumentsList';

function InstrumentsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedInst, setSelectedInst] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [filtro, setFiltro] = useState("Todos");
  const [isExpanded, setIsExpanded] = useState(false);
  
  const categorias = ["Todos", "Teclas", "Cordas", "Sopro", "Percussão", "Voz", "Prática em Grupo", "Teoria e Inicialização"];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        router.push('/#instrumentos', { scroll: false });
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen, router]);

  // Escuta mudanças na URL para abrir o modal
  useEffect(() => {
    const cursoUrl = searchParams.get('curso');
    if (cursoUrl) {
      const inst = instrumentsList.find(i => i.nome === cursoUrl);
      if (inst) {
        setSelectedInst(inst);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  const closeModal = () => {
    setIsModalOpen(false);
    router.push('/#instrumentos', { scroll: false });
  };

  return (
    <>
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Conheça nossos <span className="text-mara-orange italic font-light">Cursos</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
          Uma experiência musical imersiva com instrumentos e práticas para todas as idades e níveis.
        </p>
      </div>

      {/* Renderização das Abas de Categoria */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16 relative z-10">
        {categorias.map(cat => {
          const isActive = filtro === cat;
          return (
            <button 
              key={cat}
              onClick={() => { setFiltro(cat); setIsExpanded(true); }}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-mara-orange rounded-full -z-10 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        <AnimatePresence mode="popLayout">
          {(isExpanded || filtro !== "Todos" ? instrumentsList.filter(inst => filtro === "Todos" || inst.categoria === filtro) : []).map((inst) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              key={inst.nome}
              onClick={() => {
                setSelectedInst(inst);
                setIsModalOpen(true);
                router.push(`/?curso=${encodeURIComponent(inst.nome)}#instrumentos`, { scroll: false });
              }}
              className="relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer group bg-[#151515] shadow-lg border border-white/5 hover:border-mara-orange/50 transition-colors duration-500"
            >
              {inst.slug && (
                <Link href={inst.slug} className="sr-only">
                  Acessar página completa de {inst.nome}
                </Link>
              )}

              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={inst.imagem} 
                  alt={inst.nome} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 md:translate-y-12 group-hover:translate-y-0">
                  <div className="w-14 h-14 bg-mara-orange/20 backdrop-blur-md border border-mara-orange/30 rounded-2xl flex items-center justify-center mb-6 text-mara-orange group-hover:scale-110 transition-transform duration-500">
                    <inst.icone size={28} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{inst.nome}</h3>
                  <div className="md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">{inst.desc}</p>
                    <span className="inline-flex items-center text-mara-orange text-sm font-semibold uppercase tracking-wider">
                      Saber mais 
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Indicador para expandir/recolher */}
      {filtro === "Todos" && (
        <div className="flex justify-center mt-16 relative z-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-mara-orange/50 transition-all duration-300"
          >
            {isExpanded ? (
              <>
                <span>Ocultar Cursos</span>
                <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              </>
            ) : (
              <>
                <span>Descobrir todos os Cursos</span>
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </>
            )}
          </button>
        </div>
      )}

      {/* Modal Editorial */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && selectedInst && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/70 backdrop-blur-xl"
            >
              <div className="absolute inset-0" onClick={closeModal}></div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}
                className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 w-full max-w-6xl h-full max-h-[85vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-30 text-white/50 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md p-3 rounded-full transition-all duration-300"
                >
                  <X size={24} />
                </button>

                {/* Coluna da Imagem */}
                <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden shrink-0">
                  <Image
                    src={selectedInst.imagem}
                    alt={selectedInst.nome}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a]/90 hidden md:block"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent md:hidden"></div>
                </div>

                {/* Coluna de Conteúdo */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}>
                  <div className="w-14 h-14 bg-mara-orange/10 border border-mara-orange/20 text-mara-orange rounded-2xl flex items-center justify-center mb-8 shrink-0">
                    <selectedInst.icone size={32} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-mara-orange text-sm font-semibold tracking-widest uppercase mb-2">Curso de</h4>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{selectedInst.nome}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-10 font-light">
                      {selectedInst.detalhes}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-white/10">
                    <a
                      href="#agendamentos"
                      onClick={closeModal}
                      className="flex-1 bg-mara-orange text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-orange-500 transition-colors shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
                    >
                      Agendar Aula
                    </a>

                    {selectedInst.slug && (
                      <Link
                        href={selectedInst.slug}
                        onClick={closeModal}
                        className="flex-1 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-white/10 transition-colors"
                      >
                        Metodologia
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default function Instruments() {
  return (
    <section id="instrumentos" className="py-32 bg-mara-gray relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="w-full px-4 md:px-8">
        <Suspense fallback={<div className="text-white text-center py-20">Carregando cursos...</div>}>
          <InstrumentsContent />
        </Suspense>
      </div>
    </section>
  );
}
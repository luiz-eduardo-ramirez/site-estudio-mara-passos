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
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

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
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Conheça nossos <span className="text-mara-orange">Cursos</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Oferecemos uma variedade incrível de instrumentos e práticas para todas as idades e níveis. Venha descobrir qual combina mais com você!
        </p>
      </div>

      {/* Renderização das Abas de Categoria */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categorias.map(cat => (
          <button 
            key={cat}
            onClick={() => { setFiltro(cat); setIsExpanded(true); }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filtro === cat ? 'bg-mara-orange text-white' : 'bg-transparent border border-white/20 text-gray-400 hover:border-mara-orange hover:text-mara-orange'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {(isExpanded || filtro !== "Todos" ? instrumentsList.filter(inst => filtro === "Todos" || inst.categoria === filtro) : []).map((inst) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              key={inst.nome}
              onClick={() => {
                setSelectedInst(inst);
                setIsModalOpen(true);
                router.push(`/?curso=${encodeURIComponent(inst.nome)}#instrumentos`, { scroll: false });
              }}
              className="bg-mara-dark p-6 rounded-2xl border border-white/5 hover:border-mara-orange/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl flex flex-col items-start cursor-pointer relative"
            >
              {/* O Pulo do Gato: Link invisível para o bot do Google ler e indexar */}
              {inst.slug && (
                <Link href={inst.slug} className="sr-only">
                  Acessar página completa de {inst.nome}
                </Link>
              )}

              <div className="text-mara-orange mb-4">
                <div className="w-12 h-12 bg-mara-orange/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <inst.icone size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{inst.nome}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{inst.desc}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Indicador para expandir/recolher */}
      {filtro === "Todos" && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-3 bg-mara-orange text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all hover:scale-105 shadow-lg"
          >
            {isExpanded ? (
              <>
                <span>Recolher Cursos</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              </>
            ) : (
              <>
                <span>Ver Todos os Cursos</span>
                <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </>
            )}
          </button>
        </div>
      )}

      {/* Modal com Framer Motion */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && selectedInst && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <div className="absolute inset-0" onClick={closeModal}></div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="bg-[#151515] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-20 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-all"
                >
                  <X size={24} />
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-[500px] bg-neutral-800 relative overflow-hidden">
                  <Image
                    src={selectedInst.imagem}
                    alt={selectedInst.nome}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent md:from-transparent to-transparent"></div>

                  <div
                    className="absolute bottom-0 left-0 w-full pt-8 pb-4 px-4 md:px-6 bg-black/80 flex justify-end items-end text-white font-sans"
                    style={{ clipPath: 'polygon(0 25%, 100% 0, 100% 100%, 0 100%)' }}
                  >
                    <div className="text-right mr-3 md:mr-4">
                      <p className="text-xs md:text-sm text-gray-200 mt-1 leading-tight">Rua Cuevas, 206 &bull; Lapa</p>
                    </div>

                    <Image
                      src="/logo-transparente.webp"
                      alt="Mara Passos"
                      width={160}
                      height={64}
                      className="h-12 md:h-16 w-auto object-contain"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-mara-orange/10 text-mara-orange rounded-lg flex items-center justify-center mb-6">
                    <selectedInst.icone size={28} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{selectedInst.nome}</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {selectedInst.detalhes}
                  </p>

                  {/* NOVO BLOCO DE BOTÕES - Híbrido com Link de SEO */}
                  <div className="flex flex-col gap-3">
                    <a
                      href="#agendamentos"
                      onClick={closeModal}
                      className="bg-mara-orange text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-orange-600 transition-colors w-full"
                    >
                      Agendar Aula Experimental
                    </a>

                    {selectedInst.slug && (
                      <Link
                        href={selectedInst.slug}
                        onClick={closeModal}
                        className="bg-transparent border-2 border-mara-orange text-mara-orange px-6 py-3 rounded-lg font-bold text-center hover:bg-mara-orange/10 transition-colors w-full"
                      >
                        Ver Metodologia Completa
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
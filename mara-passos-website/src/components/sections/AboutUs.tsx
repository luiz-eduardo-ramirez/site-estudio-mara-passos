"use client";

import React from 'react';
import Image from 'next/image';
import { Heart, Scale, Music } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutUs() {
  const historiaExemplo = `O Estúdio Musical e Cultural Mara Passos nasceu de um sonho acalentado por mais de 30 anos: o de criar um espaço onde o ensino de música não fosse apenas sobre notas e partituras, mas sobre amor, acolhimento e transformação. Sob a liderança inspiradora de Mara Ferreira Lugli, nossa missão é extrair o melhor de cada aluno, transformando a paixão pela música em uma habilidade para a vida toda. Acreditamos no ensino musical curativo e acolhedor, onde o ritmo de cada um é respeitado e o aprendizado é uma jornada lúdica e cheia de significado.`;

  return (
    <section id="sobre-nos" className="py-24 md:py-32 bg-mara-gray relative overflow-hidden z-10">
      
      {/* Elemento de fundo decorativo sutil (brilho) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mara-orange/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Cabeçalho da Seção Animado */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nossa <span className="text-mara-orange">História</span>, Sua <span className="text-mara-orange">Jornada</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Uma vida dedicada ao ensino musical, um sonho transformado em lar para sua paixão.
          </p>
        </motion.div>

        {/* Container Principal: Sem altura fixa, adaptável ao conteúdo */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] w-full max-w-6xl mx-auto overflow-hidden flex flex-col lg:flex-row shadow-2xl relative"
        >
          
          {/* Lado Esquerdo: Imagem (Agora cobre o espaço de forma elegante) */}
          <div className="w-full lg:w-5/12 relative min-h-[350px] lg:min-h-auto bg-black flex items-center justify-center overflow-hidden group">
            {/* Máscara de gradiente para suavizar a borda no desktop */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111111]/90 via-transparent to-transparent z-10 pointer-events-none"></div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src="/mara-passos-tocando.webp"
                alt="Mara Passos tocando piano" 
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </motion.div>
          </div>

          {/* Lado Direito: Textos (Sem Scrollbar, com muito padding) */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-7/12 p-10 lg:p-16 flex flex-col justify-center relative z-20 text-left"
          >
            
            <motion.div variants={fadeUpItem} className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-mara-orange/10 flex items-center justify-center shrink-0">
                  <Heart className="text-mara-orange" size={24} />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  O Sonho da Mara:<br/> Um Encontro com a Música
                </h3>
            </motion.div>
            
            <div className="text-gray-300 text-lg lg:text-xl leading-relaxed space-y-6 font-light">
              <motion.p variants={fadeUpItem}>
                <span className="flex items-center gap-2 mb-4 text-mara-orange font-medium text-base tracking-wider uppercase">
                    <Scale size={18}/>
                    Metodologia Acolhedora
                </span>
                &quot;{historiaExemplo}&quot;
              </motion.p>

              <motion.p variants={fadeUpItem}>
                Hoje, somos mais que uma escola; somos uma família musical que celebra cada nota conquistada e cada aluno que descobre a sua própria voz.
              </motion.p>
            </div>
            
            <motion.div variants={fadeUpItem} className="mt-12 pt-8 border-t border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-gray-400 font-medium">
                      Descubra como nossa paixão pode guiar a sua.
                  </p>
                  <a 
                      href="https://www.instagram.com/estudiomarapassos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-mara-orange text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 group"
                  >
                      <Music size={18} className="text-mara-orange group-hover:text-white transition-colors" />
                      Venha nos conhecer
                  </a>
                </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
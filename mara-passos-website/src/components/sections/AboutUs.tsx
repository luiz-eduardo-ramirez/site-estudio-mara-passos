"use client";

import React from 'react';
import Image from 'next/image';
import { Heart, Scale } from 'lucide-react'; // Ícones para ilustrar a história

export default function AboutUs() {
  // OBS: O texto abaixo é um EXEMPLO. Você deve editá-lo com a história real da escola.
  const historiaExemplo = `O Estúdio Musical e Cultural Mara Passos nasceu de um sonho acalentado por mais de 30 anos: o de criar um espaço onde o ensino de música não fosse apenas sobre notas e partituras, mas sobre amor, acolhimento e transformação. Sob a liderança inspiradora de Mara Ferreira Lugli, nossa missão é extrair o melhor de cada aluno, transformando a paixão pela música em uma habilidade para a vida toda. Acreditamos no ensino musical curativo e acolhedor, onde o ritmo de cada um é respeitado e o aprendizado é uma jornada lúdica e cheia de significado. Hoje, somos mais que uma escola; somos uma família musical que celebra cada nota conquistada e cada aluno que descobre a sua própria voz.`;

  return (
    <section id="sobre-nos" className="py-24 bg-mara-gray relative overflow-hidden z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Nossa <span className="text-mara-orange">História</span>, Sua <span className="text-mara-orange">Jornada</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Uma vida dedicada ao ensino musical, um sonho transformado em lar para sua paixão.
          </p>
        </div>

        {/* --- NOVO LAYOUT EXPANDIDO COM EFEITO GLASS --- */}
        <div 
          className="bg-black/70 backdrop-blur-xl border border-orange-500/30 rounded-2xl w-full max-w-7xl h-auto md:h-[80vh] min-h-[60vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
        >
          
          {/* Lado Esquerdo: Imagem (Expandida e com object-contain) */}
          <div className="w-full md:w-[55%] h-64 md:h-full relative bg-black flex items-center justify-center">
            <Image 
              src="/mara-passos-tocando.png" // Nome da imagem gerada abaixo
              alt="Mara Passos tocando piano com expressão acolhedora e luzes aconchegantes" 
              fill
              className="object-contain p-4 md:p-8"
              sizes="(max-width: 768px) 100vw, 55vw"
              priority
            />
          </div>

          {/* Lado Direito: Textos (Com fundo transparente) */}
          <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar relative z-10 text-left">
            
            <div className="flex items-center gap-4 mb-8">
                <Heart className="text-mara-orange" size={28} />
                <h3 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md pr-10">
                  O Sonho da Mara: Um Encontro com a Música
                </h3>
            </div>
            
            <div className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 space-y-6 font-light">
              <p>
                {/* Ícone de música placeholder */}
                <span className="flex items-center gap-2 mb-2 text-mara-orange">
                    <Scale size={20}/>
                    Metodologia única, acolhedora e lúdica.
                </span>
                &quot;{historiaExemplo}&quot;
              </p>
            </div>
            
            <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-gray-300">
                    Descubra como nossa paixão pode guiar a sua.
                    <a 
                        href="https://www.instagram.com/estudiomarapassos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block ml-2 text-orange-400 hover:text-orange-300 font-bold transition-colors"
                    >
                        Venha nos conhecer!
                    </a>
                </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
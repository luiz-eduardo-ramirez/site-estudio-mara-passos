"use client";

import { useState } from "react";
import { X } from "lucide-react"; // Removido o ZoomIn das importações

export default function Spaces() {
  // Estado para controlar qual imagem está aberta no Modal (null = modal fechado)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const spaces = [
    { name: "Estúdio Mara Passos", img: "/spaces/fachada.jpg" },
    { name: "Sala de aula de piano", img: "/spaces/piano.jpg" },
    { name: "Certificados", img: "/spaces/certificados.jpg" },
    { name: "Recepção", img: "/spaces/recepcao.jpg" },
    { name: "Área externa", img: "/spaces/externa.jpg" },
    { name: "Sala de Musicalização", img: "/spaces/musicalizacao.jpg" },
    { name: "Sala de Instrumentos", img: "/spaces/instrumentos.jpg" },
    { name: "Relaxamento da musicalização infantil", img: "/spaces/relaxamento.jpg" },
  ];

  return (
    <section id="espacos" className="py-24 bg-mara-gray relative">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Conheça nossos <span className="text-mara-orange">espaços</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ambientes climatizados, equipados e preparados com muito carinho para o seu desenvolvimento.
          </p>
        </div>

        {/* Grid de Imagens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {spaces.map((space, index) => (
            <div key={index} className="group flex flex-col items-center">
              
              {/* Container da Imagem com clique habilitado */}
              <div 
                className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group-hover:border-mara-orange transition-all duration-500 relative bg-black cursor-pointer"
                onClick={() => setSelectedImage(space.img)} // Abre a imagem no clique
              >
                
                {/* Ícone de Lupa REMOVIDO daqui */}

                <img 
                  src={space.img} 
                  alt={space.name}
                  // Ajustada a opacidade no hover (group-hover:opacity-100) para clarear a imagem
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0 relative z-10"
                />
                
              </div>
              <h3 className="mt-4 text-mara-orange font-bold text-center text-sm md:text-base px-2">
                {space.name}
              </h3>
            </div>
          ))}
        </div>

      </div>

      {/* ---------------- MODAL LIGHTBOX ---------------- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)} // Fecha ao clicar fora da imagem
        >
          {/* Botão de Fechar */}
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-mara-orange transition-colors bg-black/50 rounded-full p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>

          {/* Imagem Ampliada */}
          <img 
            src={selectedImage} 
            alt="Espaço ampliado" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] transform transition-transform scale-100 animate-zoom-in"
            onClick={(e) => e.stopPropagation()} // Impede que clicar na imagem feche o modal
          />
        </div>
      )}
    </section>
  );
}
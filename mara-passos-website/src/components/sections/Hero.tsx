"use function"; // Obrigatório agora, pois a animação acontece no navegador do usuário
"use client";

import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  return (
    <section id="inicio" className="relative w-full h-screen flex items-center justify-center overflow-hidden">

      {/* Vídeo de Fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-bg.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
        {/* Fallback caso o navegador não suporte vídeo */}
        Seu navegador não suporta a reprodução de vídeos.
      </video>

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-mara-dark/80"></div>

      {/* Conteúdo Central */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-16 animate-fade-in-up">

        {/* Título com Efeito de Digitação */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight min-h-[120px] md:min-h-0">
          Aulas de{' '}
          <TypeAnimation
            sequence={[
              'Bateria', 2000,          // Digita Bateria, espera 2s
              'Guitarra', 2000,         // Apaga, digita Guitarra, espera 2s
              'Piano', 2000,
              'Canto', 2000,
              'Violão', 2000,
              'Musicalização', 2000,
              'Saxofone', 2000,
            ]}
            wrapper="span"
            speed={50} // Velocidade da digitação
            deletionSpeed={50} // Velocidade apagando
            repeat={Infinity} // Fica em loop para sempre
            className="text-mara-orange"
            cursor={true} // Mantém o cursor piscando idêntico ao WP
          />
          <br className="hidden md:block" />
          {' '}no Estúdio Mara Passos
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-3xl">
          Junte-se a uma comunidade vibrante de amantes da música, faça novas amizades e explore todo o potencial da sua paixão. Estamos ansiosos para recebê-lo aqui e ajudá-lo a descobrir o músico excepcional que há em você!
        </p>

        {/* Usando a tag <a> padrão do HTML para âncoras na mesma página */}
        <a
          href="#agendamentos"
          className="bg-mara-orange hover:bg-[#e05a1d] active:scale-[0.98] focus:ring-4 focus:ring-orange-500/50 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,102,0,0.4)]"
        >
          AGENDAR AULA EXPERIMENTAL
        </a>
      </div>
    </section>
  );
}
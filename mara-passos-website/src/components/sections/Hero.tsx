"use client";

import { TypeAnimation } from 'react-type-animation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [tocar, setTocar] = useState(false);

  useEffect(() => {
    // O vídeo (16 MB) toca em computadores, iPhones e iPads e em Androids atuais.
    // Fica só o quadro estático em Android de entrada/antigo (pouca memória ou
    // poucos núcleos), em quem pediu menos movimento e em quem ligou economia de dados.
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };

    const androidFraco =
      /Android/i.test(nav.userAgent) &&
      ((nav.deviceMemory ?? 8) <= 4 || (nav.hardwareConcurrency ?? 8) <= 4);

    const avaliar = () =>
      setTocar(!semMovimento.matches && !androidFraco && !nav.connection?.saveData);

    avaliar();
    semMovimento.addEventListener("change", avaliar);
    return () => semMovimento.removeEventListener("change", avaliar);
  }, []);

  return (
    <section id="inicio" className="relative w-full h-screen flex items-center justify-center overflow-hidden">

      {/* Quadro do próprio vídeo (0:00): é o LCP e o pôster, sem salto visual quando o vídeo entra */}
      <Image
        src="/hero-poster.webp"
        alt="Menino tocando piano de cauda, com notas musicais luminosas no ar"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {tocar && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/hero-poster.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      )}

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
            preRenderFirstString // "Bateria" já vai no HTML do servidor: o título pinta sem esperar a hidratação
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
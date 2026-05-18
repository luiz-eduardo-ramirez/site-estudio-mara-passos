"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export default function Presentation() {
  return (
    <section id="apresentacao" className="py-32 bg-black relative overflow-hidden">
      {/* Divisor superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 relative group"
          >
            {/* Aspect ratio container for 16:9 video */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl relative bg-[#0b0b0b] ring-2 ring-white/5 group-hover:ring-mara-orange/50 transition-all duration-500">
              <iframe
                className="w-full h-full object-cover"
                src="https://www.youtube.com/embed/DW4umfFhkt0"
                title="Veja como foi a apresentação do Estúdio"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Decorative background glow */}
            <div className="absolute -inset-4 bg-mara-orange/20 blur-[50px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem]"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mara-orange/10 text-mara-orange rounded-full text-sm font-semibold mb-6 border border-mara-orange/20">
              <PlayCircle size={16} />
              <span className="uppercase tracking-wider text-xs">Eventos Especiais</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Apresentação da  <span className="text-mara-orange">nossa turma</span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
              A magia acontece quando o talento encontra o palco. Todos os anos, nossos alunos se reúnem para apresentar seus avanços e compartilhar com o mundo o amor pela música que cultivamos em sala de aula.
            </p>

            <p className="text-gray-400/80 leading-relaxed mb-10 text-base">
              Acompanhe os melhores momentos dos nossos últimos recitais. Veja a energia contagiante, a emoção das famílias e o resultado de um ano incrível de estudos. A música que transforma, na prática!
            </p>

            <a
              href="#instrumentos"
              className="bg-mara-orange text-white px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(242,101,34,0.3)] hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300 inline-block"
            >
              Prepare-se para o Próximo!
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

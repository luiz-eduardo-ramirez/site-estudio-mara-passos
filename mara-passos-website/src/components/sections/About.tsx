import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-mara-dark">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center gap-16">
        
        {/* Lado Esquerdo - Imagem com detalhe criativo */}
        <div className="w-full md:w-1/2 relative flex justify-center">
          {/* Fundo decorativo laranja */}
          <div className="absolute bg-mara-orange rounded-full w-64 h-64 md:w-96 md:h-96 transform -translate-x-4 translate-y-4 -z-10 opacity-80"></div>
          
          {/* Fundo pontilhado (Grid pattern) simulando os pontos brancos do WP */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:20px_20px] opacity-10 w-full h-full rounded-lg"></div>

          {/* Imagem da Mara (Salve a foto na pasta public/ como mara-passos.jpg) */}
          <div className="relative z-10 w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-mara-dark shadow-2xl bg-gray-800 flex items-center justify-center">
             <Image 
               src="/mara-passos.png" 
               alt="Mara Passos" 
               fill
               className="object-cover"
               sizes="(max-width: 768px) 256px, 384px"
             />
          </div>
        </div>

        {/* Lado Direito - Textos e Botão */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Visite nosso <span className="text-mara-orange">estúdio!</span>
          </h2>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Aulas de música aqui no Estúdio Mara Passos são uma ótima maneira de aprender e aprimorar suas habilidades musicais em um ambiente acolhedor.
          </p>
          
          <ul className="space-y-5 mb-10">
            <li className="flex items-start gap-4 text-gray-300">
              <CheckCircle2 className="text-mara-orange shrink-0 mt-1" size={24} />
              <span className="font-medium">Instrutores qualificados e experientes.</span>
            </li>
            <li className="flex items-start gap-4 text-gray-300">
              <CheckCircle2 className="text-mara-orange shrink-0 mt-1" size={24} />
              <span className="font-medium">Currículo Estruturado permitindo que o aluno aprenda gradualmente.</span>
            </li>
            <li className="flex items-start gap-4 text-gray-300">
              <CheckCircle2 className="text-mara-orange shrink-0 mt-1" size={24} />
              <span className="font-medium">Aulas exclusivas e individuais.</span>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="#agendamentos" 
              className="bg-mara-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition-transform hover:-translate-y-1 shadow-lg w-full sm:w-auto text-center"
            >
              AGENDAR AULA EXPERIMENTAL
            </Link>
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <i className="bi bi-calendar-check"></i> Fale com a gente!
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
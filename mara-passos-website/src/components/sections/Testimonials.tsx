import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const depoimentos = [
    {
      nome: "Micheli Varino",
      texto: "Você é uma professora querida, amiga e incentivadora, com certeza faz parte desse sonho. Muito obrigada por todo apoio e dedicação. Você realmente é um exemplo a ser seguido 👏🏻❤️",
      foto: "/testimonials/micheli.jpg"
    },
    {
      nome: "Marcelo Passareli",
      texto: "Parabéns @estudiomarapassos pelo trabalho, que muitas vezes é silencioso, mas sempre transforma vidas. ❤️🎹",
      foto: "/testimonials/marcelo.jpg"
    },
    {
      nome: "Laise Polonio",
      texto: "Mara! Uma professora muito especial! Nasceu para ensinar, de maneira leve, lúdica e amorosa. Ensino musical curativo! Desejo muito sucesso a você e ao Estúdio!",
      foto: "/testimonials/laise.jpg"
    },
    {
      nome: "Thais Bianchi",
      texto: "Maravilhoso! Meu filho de 9 anos aprendeu a tocar piano rapidinho, super se interessou pela música e pelo método da Mara. Ela tem muito jeito para ensinar e paciência.",
      foto: "/testimonials/thais.png"
    },
    {
      nome: "Eduardo Henrique",
      texto: "Profissionais muito competentes e prestativos, recomendo muito!",
      foto: "/testimonials/eduardo.png"
    },
    {
      nome: "Patricia Aparecida Simao",
      texto: "Parabéns, você merece, por tanta dedicação e por saber dar tanto amor às crianças. Lembro como adorava estudar com você há 30 anos atrás ou mais rs. Sucesso sempre.",
      foto: "/testimonials/patricia.jpg"
    }
  ];

  return (
    <section id="depoimentos" className="py-24 bg-mara-dark">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mara-orange mb-4">
            O que estão dizendo sobre nós
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {depoimentos.map((dep, index) => (
            <div 
              key={index} 
              className="bg-[#0b0b0b] border border-mara-orange rounded-2xl p-8 relative flex flex-col justify-between hover:shadow-[0_0_15px_rgba(242,101,34,0.15)] transition-shadow duration-300"
            >
              {/* Aspas decorativas */}
              <Quote className="absolute top-6 right-8 text-mara-orange opacity-40" size={40} />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-800 border-2 border-mara-orange/50 shrink-0">
                  <Image src={dep.foto} alt={dep.nome} fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <h4 className="text-mara-orange font-bold text-lg">{dep.nome}</h4>
                  <div className="flex text-yellow-500 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" className="mr-0.5" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-mara-orange/80 italic text-sm md:text-base leading-relaxed">
                &quot;{dep.texto}&quot;
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
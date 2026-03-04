import { Mic, Music, Activity, Speaker, Headphones, Users, BookOpen, LayoutGrid, Smile } from 'lucide-react';

export default function Instruments() {
  <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      ></div>
  const instrumentsList = [
    { nome: "Baixo", desc: "Aprenda as linhas de grave, ritmo e harmonia.", icone: Headphones },
    { nome: "Bateria", desc: "Desenvolva sua coordenação motora e rítmica.", icone: Activity },
    { nome: "Canto", desc: "Técnicas vocais, respiração e afinação.", icone: Mic },
    { nome: "Flauta Doce", desc: "Excelente iniciação melódica de sopro.", icone: Music },
    { nome: "Flauta Transversal", desc: "Técnica clássica e popular com leveza.", icone: Music },
    { nome: "Guitarra", desc: "Riffs, solos, pedais e muita atitude.", icone: Headphones },
    { nome: "Música de Câmara", desc: "Toque em pequenos grupos eruditos.", icone: Users },
    { nome: "Musicalização - Adultos", desc: "Desenvolva sua percepção musical.", icone: Speaker },
    { nome: "Musicalização - Infantil", desc: "O primeiro contato de forma lúdica e amorosa.", icone: Smile },
    { nome: "Piano", desc: "O clássico das teclas com técnica apurada.", icone: LayoutGrid },
    { nome: "Prática de Conjunto", desc: "Aprenda a dinâmica de tocar em banda.", icone: Users },
    { nome: "Saxofone", desc: "Aulas práticas de sopro e improvisação.", icone: Music },
    { nome: "Teclado", desc: "Versatilidade, arranjos e ritmos nas teclas.", icone: LayoutGrid },
    { nome: "Teoria Musical", desc: "A base teórica e leitura de partituras.", icone: BookOpen },
    { nome: "Ukelelê", desc: "Prático, divertido e fácil de aprender.", icone: Music },
    { nome: "Violão", desc: "Acordes, dedilhados e repertório popular.", icone: Headphones },
    { nome: "Violino", desc: "A arte e elegância das cordas friccionadas.", icone: Music },
  ];

  return (
    <section id="instrumentos" className="py-24 bg-mara-gray">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Conheça nossos <span className="text-mara-orange">Cursos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Oferecemos uma variedade incrível de instrumentos e práticas para todas as idades e níveis. Venha descobrir qual combina mais com você!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {instrumentsList.map((inst, index) => (
            <div 
              key={index} 
              className="bg-mara-dark p-6 rounded-2xl border border-white/5 hover:border-mara-orange/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl flex flex-col items-start"
            >
              <div className="text-mara-orange mb-4">
                <div className="w-12 h-12 bg-mara-orange/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <inst.icone size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{inst.nome}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{inst.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
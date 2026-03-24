"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Mic, Music, Activity, Speaker, Headphones, Users, BookOpen, LayoutGrid, Smile, X, CirclePlay } from 'lucide-react';

// Mocks gerados com textos focados em ensino lúdico e acolhedor
const instrumentsList = [
  { nome: "Baixo", desc: "Aprenda as linhas de grave, ritmo e harmonia.", detalhes: "O baixo é o coração do ritmo! Em nossas aulas, você aprenderá a criar grooves envolventes, dominar técnicas como pizzicato e slap, e entender a função essencial do baixo na música, tudo no seu próprio ritmo.", icone: Headphones, imagem: "/images/baixo.png " },
  { nome: "Bateria", desc: "Desenvolva sua coordenação motora e rítmica.", detalhes: "Libere sua energia e desenvolva a coordenação motora de forma lúdica. Nossas aulas de bateria focam na independência dos membros, leitura rítmica e aplicação em diversos estilos musicais.", icone: Activity, imagem: "/images/bateria.png" },
  { nome: "Canto", desc: "Técnicas vocais, respiração e afinação.", detalhes: "Descubra a sua própria voz em um ambiente acolhedor. Trabalhamos respiração, afinação, impostação e repertório, ajudando você a cantar com saúde vocal e muita emoção.", icone: Mic, imagem: "/images/canto.png" },
  { nome: "Flauta Doce", desc: "Excelente iniciação melódica de sopro.", detalhes: "Um instrumento doce e perfeito para a primeira iniciação melódica. Desenvolvemos o sopro suave, a leitura de notas e a musicalidade de forma curativa e leve.", icone: Music, imagem: "/images/flauta-doce.png" },
  { nome: "Flauta Transversal", desc: "Técnica clássica e popular com leveza.", detalhes: "Explore a sonoridade elegante da flauta transversal. O curso aborda embocadura, respiração diafragmática e repertório que vai do erudito ao popular.", icone: Music, imagem: "/images/flauta-transversal.png" },
  { nome: "Guitarra", desc: "Riffs, solos, pedais e muita atitude.", detalhes: "Das bases aos grandes solos! Aprenda técnicas de palhetada, bends, harmonia aplicada e como timbrar seu instrumento para encontrar a sua própria identidade sonora.", icone: Headphones, imagem: "/images/guitarra.png" },
  { nome: "Música de Câmara", desc: "Toque em pequenos grupos eruditos.", detalhes: "A arte de tocar junto. Neste curso, unimos alunos para executar peças clássicas em pequenos grupos, desenvolvendo a escuta ativa e a sensibilidade de tocar em conjunto.", icone: Users, imagem: "/images/musica-camara.png" },
  { nome: "Musicalização - Adultos", desc: "Desenvolva sua percepção musical.", detalhes: "Nunca é tarde para viver a música! Um curso pensado para adultos destravarem sua percepção rítmica e melódica através de vivências práticas, sem a pressão do desempenho perfeito.", icone: Speaker, imagem: "/images/musicalizacao-adulto.jpg" },
  { nome: "Musicalização - Infantil", desc: "O primeiro contato de forma lúdica e amorosa.", detalhes: "O despertar para o som. Com jogos, histórias e instrumentos de percussão, introduzimos as crianças ao universo musical de forma lúdica, estimulando a cognição e a criatividade.", icone: Smile, imagem: "/images/musicalizacao-infantil.jpg" },
  { nome: "Pandeiro", desc: "O coração do samba e do chorinho.", detalhes: "Com o Professor Rafael, aprenda o passo a passo dos ritmos brasileiros. Uma didática excelente para dominar as levadas de samba, choro e explorar toda a riqueza percussiva do pandeiro.", icone: CirclePlay, imagem: "/images/pandeiro.jpg" },
  { nome: "Piano", desc: "O clássico das teclas com técnica apurada.", detalhes: "Aulas de piano com foco curativo e acolhedor. Do erudito ao popular, respeitamos o gosto musical de cada aluno, trabalhando leitura à primeira vista, técnica e expressão emocional.", icone: LayoutGrid, imagem: "/images/piano.jpg" },
  { nome: "Prática de Conjunto", desc: "Aprenda a dinâmica de tocar em banda.", detalhes: "Junte-se a outros alunos e forme uma banda! Aqui você aprende na prática como ouvir os outros instrumentos, manter o ritmo em grupo e a dinâmica de um ensaio real.", icone: Users, imagem: "/images/pratica-conjunto.jpg" },
  { nome: "Saxofone", desc: "Aulas práticas de sopro e improvisação.", detalhes: "Domine a embocadura e a expressividade do saxofone. O curso abrange técnica de sopro, leitura de partituras e introdução à improvisação no jazz e música popular.", icone: Music, imagem: "/images/saxofone.jpg" },
  { nome: "Teclado", desc: "Versatilidade, arranjos e ritmos nas teclas.", detalhes: "Explore a versatilidade dos timbres e ritmos automáticos. Focado na música popular, o curso de teclado ensina a criar arranjos completos com as duas mãos de forma prática.", icone: LayoutGrid, imagem: "/images/teclado.jpg" },
  { nome: "Teoria Musical", desc: "A base teórica e leitura de partituras.", detalhes: "Desmistificando a partitura! Aprenda as regras que formam a música de um jeito leve. Harmonia, percepção, escalas e ditados musicais para fortalecer sua base como músico.", icone: BookOpen, imagem: "/images/teoria.jpg" },
  { nome: "Ukelelê", desc: "Prático, divertido e fácil de aprender.", detalhes: "O instrumento perfeito para quem quer resultados rápidos e divertidos. Aprenda acordes práticos, batidas variadas e comece a tocar suas músicas favoritas em poucas semanas.", icone: Music, imagem: "/images/ukelele.jpg" },
  { nome: "Violão", desc: "Acordes, dedilhados e repertório popular.", detalhes: "Do primeiro acorde à fluência no braço do instrumento. Nossas aulas de violão são adaptáveis ao seu estilo preferido, focando em dedilhados, batidas e harmonia prática.", icone: Headphones, imagem: "/images/violao.jpg" },
  { nome: "Violino", desc: "A arte e elegância das cordas friccionadas.", detalhes: "Com uma metodologia paciente e atenciosa, guiamos você pelos desafios da afinação, postura correta e manuseio do arco, revelando a beleza e a emoção do violino.", icone: Music, imagem: "/images/violino.jpg" },
];

function InstrumentsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedInst, setSelectedInst] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setTimeout(() => setSelectedInst(null), 300); // Dá tempo para a animação de saída (se houver)
    router.push('/#instrumentos', { scroll: false }); // Remove a query string da URL
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {instrumentsList.map((inst, index) => (
          <div 
            key={index} 
            onClick={() => {
              setSelectedInst(inst);
              setIsModalOpen(true);
              router.push(`/?curso=${encodeURIComponent(inst.nome)}#instrumentos`, { scroll: false });
            }}
            className="bg-mara-dark p-6 rounded-2xl border border-white/5 hover:border-mara-orange/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl flex flex-col items-start cursor-pointer"
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

      {/* Modal */}
      {isModalOpen && selectedInst && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          {/* Overlay invisível para fechar ao clicar fora */}
          <div className="absolute inset-0" onClick={closeModal}></div>
          
          <div className="bg-[#151515] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-all"
            >
              <X size={24} />
            </button>

            {/* Imagem Placeholder */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-neutral-800 relative">
              <img 
                src={selectedInst.imagem} 
                alt={selectedInst.nome} 
                className="w-full h-full object-cover"
                // Fallback de erro de imagem para o hero-bg
                onError={(e) => {
                  e.currentTarget.src = "/hero-bg.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515] md:from-transparent to-transparent"></div>
            </div>

            {/* Conteúdo */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="w-12 h-12 bg-mara-orange/10 text-mara-orange rounded-lg flex items-center justify-center mb-6">
                <selectedInst.icone size={28} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">{selectedInst.nome}</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                {selectedInst.detalhes}
              </p>
              
              <a 
                href="#contato" 
                onClick={closeModal}
                className="bg-mara-orange text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-orange-600 transition-colors inline-block w-full md:w-auto"
              >
                Agendar Aula Experimental
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Envolvemos o componente principal em um Suspense por causa do useSearchParams
export default function Instruments() {
  return (
    <section id="instrumentos" className="py-24 bg-mara-gray relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <Suspense fallback={<div className="text-white text-center py-20">Carregando cursos...</div>}>
          <InstrumentsContent />
        </Suspense>
      </div>
    </section>
  );
}
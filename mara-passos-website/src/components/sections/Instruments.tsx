"use client";

import { useState, useEffect, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link'; // Importação do Link adicionada
import Image from 'next/image';
import { Mic, Music, Activity, Speaker, Headphones, Users, BookOpen, LayoutGrid, Smile, X, CirclePlay } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Adicionada a propriedade "slug" apenas no Piano por enquanto
const instrumentsList = [
  { nome: "Baixo", categoria: "Cordas", desc: "Aprenda as linhas de grave, ritmo e harmonia.", detalhes: "O baixo é o coração do ritmo! Em nossas aulas, você aprenderá a criar grooves envolventes, dominar técnicas como pizzicato e slap, e entender a função essencial do baixo na música, tudo no seu próprio ritmo.", icone: Headphones, imagem: "/images/baixo.png" },
  { nome: "Bateria", categoria: "Percussão", desc: "Desenvolva sua coordenação motora e rítmica.", detalhes: "Libere sua energia e desenvolva a coordenação motora de forma lúdica. Nossas aulas de bateria focam na independência dos membros, leitura rítmica e aplicação em diversos estilos musicais.", icone: Activity, imagem: "/images/bateria.png" },
  { nome: "Canto", categoria: "Voz", desc: "Técnicas vocais, respiração e afinação.", detalhes: "Descubra a sua própria voz em um ambiente acolhedor. Trabalhamos respiração, afinação, impostação e repertório, ajudando você a cantar com saúde vocal e muita emoção.", icone: Mic, imagem: "/images/canto.png" },
  { nome: "Flauta Doce", categoria: "Sopro", desc: "Excelente iniciação melódica de sopro.", detalhes: "Um instrumento doce e perfeito para a primeira iniciação melódica. Desenvolvemos o sopro suave, a leitura de notas e a musicalidade de forma curativa e leve.", icone: Music, imagem: "/images/flauta-doce.png" },
  { nome: "Flauta Transversal", categoria: "Sopro", desc: "Técnica clássica e popular com leveza.", detalhes: "Explore a sonoridade elegante da flauta transversal. O curso aborda embocadura, respiração diafragmática e repertório que vai do erudito ao popular.", icone: Music, imagem: "/images/flauta-transversal.png" },
  { nome: "Guitarra", categoria: "Cordas", desc: "Riffs, solos, pedais e muita atitude.", detalhes: "Das bases aos grandes solos! Aprenda técnicas de palhetada, bends, harmonia aplicada e como timbrar seu instrumento para encontrar a sua própria identidade sonora.", icone: Headphones, imagem: "/images/guitarra.png" },
  { nome: "Música de Câmara", categoria: "Prática em Grupo", desc: "Toque em pequenos grupos eruditos.", detalhes: "A arte de tocar junto. Neste curso, unimos alunos para executar peças clássicas em pequenos grupos, desenvolvendo a escuta ativa e a sensibilidade de tocar em conjunto.", icone: Users, imagem: "/images/musica-camara.png" },
  { nome: "Musicalização - Adultos", categoria: "Teoria e Inicialização", desc: "Desenvolva sua percepção musical.", detalhes: "Nunca é tarde para viver a música! Um curso pensado para adultos destravarem sua percepção rítmica e melódica através de vivências práticas, sem a pressão do desempenho perfeito.", icone: Speaker, imagem: "/images/musicalizacao-adulto.png" },
  { nome: "Musicalização - Infantil", categoria: "Teoria e Inicialização", desc: "O primeiro contato de forma lúdica e amorosa.", detalhes: "O despertar para o som. Com jogos, histórias e instrumentos de percussão, introduzimos as crianças ao universo musical de forma lúdica, estimulando a cognição e a criatividade.", icone: Smile, imagem: "/images/musicalizacao-infantil.png" },
  { nome: "Pandeiro", categoria: "Percussão", desc: "O coração do samba e do chorinho.", detalhes: "Com o Professor Rafael, aprenda o passo a passo dos ritmos brasileiros. Uma didática excelente para dominar as levadas de samba, choro e explorar toda a riqueza percussiva do pandeiro.", icone: CirclePlay, imagem: "/images/pandeiro.png" },
  {
    nome: "Piano",
    categoria: "Teclas",
    slug: "/aulas-de-piano", // Rota para o Google ler
    desc: "O clássico das teclas com técnica apurada.",
    detalhes: "Aulas de piano com foco curativo e acolhedor. Do erudito ao popular, respeitamos o gosto musical de cada aluno, trabalhando leitura à primeira vista, técnica e expressão emocional.",
    icone: LayoutGrid,
    imagem: "/images/piano.png"
  },
  { nome: "Prática de Conjunto", categoria: "Prática em Grupo", desc: "Aprenda a dinâmica de tocar em banda.", detalhes: "Junte-se a outros alunos e forme uma banda! Aqui você aprende na prática como ouvir os outros instrumentos, manter o ritmo em grupo e a dinâmica de um ensaio real.", icone: Users, imagem: "/images/pratica-conjunto.png" },
  { nome: "Saxofone", categoria: "Sopro", desc: "Aulas práticas de sopro e improvisação.", detalhes: "Domine a embocadura e a expressividade do saxofone. O curso abrange técnica de sopro, leitura de partituras e introdução à improvisação no jazz e música popular.", icone: Music, imagem: "/images/saxofone.png" },
  { nome: "Teclado", categoria: "Teclas", desc: "Versatilidade, arranjos e ritmos nas teclas.", detalhes: "Explore a versatilidade dos timbres e ritmos automáticos. Focado na música popular, o curso de teclado ensina a criar arranjos completos com as duas mãos de forma prática.", icone: LayoutGrid, imagem: "/images/teclado.png" },
  { nome: "Teoria Musical", categoria: "Teoria e Inicialização", desc: "A base teórica e leitura de partituras.", detalhes: "Desmistificando a partitura! Aprenda as regras que formam a música de um jeito leve. Harmonia, percepção, escalas e ditados musicais para fortalecer sua base como músico.", icone: BookOpen, imagem: "/images/teoria.png" },
  { nome: "Ukelelê", categoria: "Cordas", desc: "Prático, divertido e fácil de aprender.", detalhes: "O instrumento perfeito para quem quer resultados rápidos e divertidos. Aprenda acordes práticos, batidas variadas e comece a tocar suas músicas favoritas em poucas semanas.", icone: Music, imagem: "/images/ukelele.png" },
  { nome: "Violão", categoria: "Cordas", desc: "Acordes, dedilhados e repertório popular.", detalhes: "Do primeiro acorde à fluência no braço do instrumento. Nossas aulas de violão são adaptáveis ao seu estilo preferido, focando em dedilhados, batidas e harmonia prática.", icone: Headphones, imagem: "/images/violao.png" },
  { nome: "Violino", categoria: "Cordas", desc: "A arte e elegância das cordas friccionadas.", detalhes: "Com uma metodologia paciente e atenciosa, guiamos você pelos desafios da afinação, postura correta e manuseio do arco, revelando a beleza e a emoção do violino.", icone: Music, imagem: "/images/violino.png" },
];

function InstrumentsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedInst, setSelectedInst] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [filtro, setFiltro] = useState("Todos");
  
  const categorias = ["Todos", "Teclas", "Cordas", "Sopro", "Percussão", "Voz", "Prática em Grupo", "Teoria e Inicialização"];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

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
    router.push('/#instrumentos', { scroll: false });
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

      {/* Renderização das Abas de Categoria */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categorias.map(cat => (
          <button 
            key={cat}
            onClick={() => setFiltro(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filtro === cat ? 'bg-mara-orange text-white' : 'bg-transparent border border-white/20 text-gray-400 hover:border-mara-orange hover:text-mara-orange'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {instrumentsList.filter(inst => filtro === "Todos" || inst.categoria === filtro).map((inst) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              key={inst.nome}
              onClick={() => {
                setSelectedInst(inst);
                setIsModalOpen(true);
                router.push(`/?curso=${encodeURIComponent(inst.nome)}#instrumentos`, { scroll: false });
              }}
              className="bg-mara-dark p-6 rounded-2xl border border-white/5 hover:border-mara-orange/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl flex flex-col items-start cursor-pointer relative"
            >
              {/* O Pulo do Gato: Link invisível para o bot do Google ler e indexar */}
              {inst.slug && (
                <Link href={inst.slug} className="sr-only">
                  Acessar página completa de {inst.nome}
                </Link>
              )}

              <div className="text-mara-orange mb-4">
                <div className="w-12 h-12 bg-mara-orange/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <inst.icone size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{inst.nome}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{inst.desc}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal com Framer Motion */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && selectedInst && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <div className="absolute inset-0" onClick={closeModal}></div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="bg-[#151515] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-20 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-all"
                >
                  <X size={24} />
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-[500px] bg-neutral-800 relative overflow-hidden">
                  <Image
                    src={selectedInst.imagem}
                    alt={selectedInst.nome}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent md:from-transparent to-transparent"></div>

                  <div
                    className="absolute bottom-0 left-0 w-full pt-8 pb-4 px-4 md:px-6 bg-black/80 flex justify-end items-end text-white font-sans"
                    style={{ clipPath: 'polygon(0 25%, 100% 0, 100% 100%, 0 100%)' }}
                  >
                    <div className="text-right mr-3 md:mr-4">
                      <p className="text-xs md:text-sm text-gray-200 mt-1 leading-tight">Rua Cuevas, 206 &bull; Lapa</p>
                    </div>

                    <Image
                      src="/logo-transparente.png"
                      alt="Mara Passos"
                      width={160}
                      height={64}
                      className="h-12 md:h-16 w-auto object-contain"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-mara-orange/10 text-mara-orange rounded-lg flex items-center justify-center mb-6">
                    <selectedInst.icone size={28} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{selectedInst.nome}</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {selectedInst.detalhes}
                  </p>

                  {/* NOVO BLOCO DE BOTÕES - Híbrido com Link de SEO */}
                  <div className="flex flex-col gap-3">
                    <a
                      href="#agendamentos"
                      onClick={closeModal}
                      className="bg-mara-orange text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-orange-600 transition-colors w-full"
                    >
                      Agendar Aula Experimental
                    </a>

                    {selectedInst.slug && (
                      <Link
                        href={selectedInst.slug}
                        onClick={closeModal}
                        className="bg-transparent border-2 border-mara-orange text-mara-orange px-6 py-3 rounded-lg font-bold text-center hover:bg-mara-orange/10 transition-colors w-full"
                      >
                        Ver Metodologia Completa
                      </Link>
                    )}
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default function Instruments() {
  return (
    <section id="instrumentos" className="py-32 bg-mara-gray relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="container mx-auto px-6 max-w-6xl">
        <Suspense fallback={<div className="text-white text-center py-20">Carregando cursos...</div>}>
          <InstrumentsContent />
        </Suspense>
      </div>
    </section>
  );
}
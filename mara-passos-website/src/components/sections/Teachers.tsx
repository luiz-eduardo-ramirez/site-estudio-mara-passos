import { Award, Music } from 'lucide-react';

export default function Teachers() {
  // Lista de professores
  const teachersList = [
    {
      id: 1,
      nome: "Mara Ferreira Lugli",
      especialidade: "Diretora, Piano e Musicalização",
      bio: "Com mais de 30 anos de dedicação ao ensino musical, Mara desenvolveu uma metodologia única, lúdica e acolhedora. Seu foco é o ensino musical curativo, extraindo o melhor de cada aluno e transformando a paixão pela música em uma habilidade para a vida toda.",
      foto: "/teachers/mara-passos.png" 
    },
    {
      id: 2,
      nome: "Amanda Ferreira Lugli",
      especialidade: "Piano, Musicalização e Teoria Musical",
      bio: "Professora de piano, com muitos anos de experiência com alunos de todas as idades. A Amanda tem uma vasta experiência em ensinar e ensina desde os primeiros acordes até técnicas avançadas de improvisação, sempre respeitando o ritmo e o gosto musical de cada aluno.",
      foto: "/teachers/amanda.png"
    },
    {
      id: 3,
      nome: "Rodrigo Alencar",
      especialidade: "Violão, Guitarra e Baixo",
      bio: "Especialista em cordas com vasta experiência em palcos e estúdios. Ensina desde os primeiros acordes até técnicas avançadas de improvisação, sempre respeitando o ritmo e o gosto musical de cada aluno.",
      foto: "/teachers/rodrigo.png"
    },
    {
      id: 4,
      nome: "Professor Rafael",
      especialidade: "Pandeiro, Chorinhos e Sambas",
      bio: "Novidade no Estúdio! Agora teremos aulas de pandeiro, ministradas pelo Professor Rafael! Venha aprender chorinhos e sambas, além de muito mais! O Professor Rafael tem uma excelente didática. Através do passo a passo torna o aprendizado mais fácil. Vale a pena conferir!",
      foto: "/teachers/rafael.png"
    }
  ];

  return (
    <section id="professores" className="py-24 bg-[#0b0b0b]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Nossos <span className="text-mara-orange">Professores</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Uma equipe de profissionais apaixonados por música, prontos para guiar você em cada nota da sua jornada.
          </p>
        </div>

        {/* Lista de Professores */}
        <div className="space-y-24">
          {teachersList.map((teacher, index) => {
            // Lógica para alternar os lados (Zig-Zag)
            const isEven = index % 2 === 0;

            return (
              <div 
                key={teacher.id} 
                className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Imagem do Professor */}
                <div className="w-full md:w-1/2 flex justify-center">
                  {/* Adicionado 'group' aqui para ativar o hover dos filhos */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group cursor-pointer">
                    
                    {/* Borda decorativa laranja */}
                    <div className={`absolute inset-0 border-2 border-mara-orange rounded-2xl transform ${isEven ? 'translate-x-4 translate-y-4' : '-translate-x-4 translate-y-4'} -z-10 transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0`}></div>
                    
                    {/* Foto principal (Agora com Zoom colorida) */}
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-800 shadow-2xl relative z-0">
                      <img 
                        src={teacher.foto} 
                        alt={teacher.nome} 
                        /* Removido o grayscale e adicionado group-hover:scale-110 para o zoom */
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                {/* Textos do Professor */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <div className={`flex items-center gap-3 mb-2 justify-center ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                    <Award className="text-mara-orange" size={24} />
                    <h3 className="text-3xl font-bold text-white">{teacher.nome}</h3>
                  </div>
                  
                  <div className={`flex items-center gap-2 mb-6 justify-center ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                    <Music className="text-gray-400" size={18} />
                    <span className="text-mara-orange font-medium uppercase tracking-wider text-sm">
                      {teacher.especialidade}
                    </span>
                  </div>
                  
                  <p className={`text-gray-300 text-lg leading-relaxed ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    &quot;{teacher.bio}&quot;
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
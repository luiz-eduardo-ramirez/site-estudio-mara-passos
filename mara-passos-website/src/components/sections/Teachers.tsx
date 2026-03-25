import { Award, Music } from 'lucide-react';
import Link from 'next/link';

export default function Teachers() {
  const teachersList = [
    {
      id: 1,
      nome: "Mara Alexandre Ferreira Lugli",
      especialidades: ["Piano", "Musicalização - Infantil", "Flauta Doce"],
      bio: "Sócia Fundadora e Diretora do Estúdio Musical e Cultural Mara Passos. Formada em Curso Superior de Piano Erudito pelo Conservatório Dramático e Musical de São Paulo. Possui cursos complementares em Musicalização Infantil e é Pós-Graduada em Musicoterapia na Faculdade Paulista de Artes. Também é formada pelo Curso Sopro Novo de Flautas Doce da Yamaha.",
      foto: "/teachers/mara.jpeg" 
    },
    {
      id: 2,
      nome: "Amanda Ferreira Lugli",
      especialidades: ["Piano", "Musicalização - Infantil", "Flauta Doce"],
      bio: "Sócia e estudante de Piano Clássico e Popular há 22 anos, Amanda atua no Estúdio desde sua abertura. Com experiência em diversos instrumentos e como Professora Assistente de Musicalização, conta com um vasto repertório. Atualmente aprimora sua Técnica Pianística Avançada e estuda Canto.",
      foto: "/teachers/amanda.png"
    },
    {
      id: 3,
      nome: "Rafael Velez de Sousa",
      especialidades: ["Pandeiro", "Piano", "Violão", "Bateria"],
      bio: "Graduado em Licenciatura em Música pela UNESP, Rafael aprimora seus estudos em Piano e Violão na EMESP. Com forte base percussiva, estudou bateria em Escolas de Samba e especializou-se em Pandeiro no SESC Vila Mariana e no Coletivo S Pandeiro. Traz toda a riqueza do ritmo brasileiro para suas aulas.",
      foto: "/teachers/rafael.jpeg"
    },
    {
      id: 4,
      nome: "Vanessa Nunes da Silva",
      especialidades: ["Canto"],
      bio: "Formada em Canto Lírico pela FMU/FAAM, com especialização em Educação Musical, Psicopedagogia e Arteterapia. Atuou como cantora do Coral Paulistano do Teatro Municipal. Atualmente é licenciada do método “Full-Voice”, unindo conhecimentos da ciência da voz com uma visão técnico-musical e musicoterápica.",
      foto: "/teachers/vanessa.jpeg" // Ajuste o nome do arquivo se necessário
    },
    {
      id: 5,
      nome: "Rodrigo Alencar da Silva",
      especialidades: ["Violão", "Guitarra", "Baixo"],
      bio: "Formado em Licenciatura em Música pela FPA e em Guitarra pela Fundação das Artes de São Caetano do Sul. Com vasta experiência no ensino musical desde 2007, Rodrigo transita com facilidade entre o Violão Erudito, Jazz, Música Brasileira e Heavy Metal, com grande abrangência de estilos musicais.",
      foto: "/teachers/rodrigo.jpeg"
    },
    {
      id: 6,
      nome: "Reinaldo Aparecido Rodrigues",
      especialidades: ["Bateria", "Piano", "Teclado", "Violino"], // Violoncelo foi alterado para Violino provisoriamente para dar match com os cursos
      bio: "Com formação internacional na Escola Drum Tech em Londres, Reinaldo possui extensa bagagem musical. Estudou percussão erudita básica, piano erudito e popular, além de violoncelo em instituições renomadas como o Conservatório Carlos Gomes e a ULM, aprendendo com grandes mestres da música.",
      foto: "/teachers/reinaldo.jpeg" // Ajuste o nome do arquivo se necessário
    },
    {
      id: 7,
      nome: "Márcia Kiyomi Toshmitsu Ekami",
      especialidades: ["Piano", "Flauta Transversal", "Flauta Doce", "Musicalização - Infantil"],
      bio: "Formada em Piano Erudito pelo Conservatório Dramático e Musical de São Paulo. Leciona Flauta Transversal e possui formação pelo Curso Sopro Novo de Flautas Doce da Yamaha. Com cursos complementares em Musicalização Infantil, Márcia também desenvolveu trabalho de Canto Coral em diversos coros da Capital e atualmente é integrante do Zimana no CoralUsp.",
      foto: "/teachers/marcia.jpeg" // Ajuste o nome do arquivo se necessário
    },
  ];

  return (
    <section id="professores" className="py-24 bg-[#0b0b0b]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Nossos <span className="text-mara-orange">Professores</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Uma equipe de profissionais apaixonados por música, prontos para guiar você em cada nota da sua jornada.
          </p>
        </div>

        <div className="space-y-24">
          {teachersList.map((teacher, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={teacher.id} 
                className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group cursor-pointer">
                    <div className={`absolute inset-0 border-2 border-mara-orange rounded-2xl transform ${isEven ? 'translate-x-4 translate-y-4' : '-translate-x-4 translate-y-4'} -z-10 transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0`}></div>
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-800 shadow-2xl relative z-0">
                      <img 
                        src={teacher.foto} 
                        alt={teacher.nome} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 text-center md:text-left">
                  <div className={`flex items-center gap-3 mb-4 justify-center ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                    <Award className="text-mara-orange" size={24} />
                    <h3 className="text-3xl font-bold text-white">{teacher.nome}</h3>
                  </div>
                  
                  {/* Botões interativos para as especialidades */}
                  <div className={`flex flex-wrap items-center gap-2 mb-6 justify-center ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                    <Music className="text-gray-400" size={18} />
                    {teacher.especialidades.map((esp, i) => (
                      <Link 
                        key={i}
                        href={`/?curso=${encodeURIComponent(esp)}#instrumentos`}
                        className="bg-mara-orange/10 text-mara-orange hover:bg-mara-orange hover:text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-sm"
                      >
                        {esp}
                      </Link>
                    ))}
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
"use client";

import { useState } from 'react';
import { Award } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

function TeacherCard({ teacher, index }: { teacher: any, index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="flex flex-col bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:bg-[#1a1a1a] hover:border-mara-orange/20 transition-all duration-500 group shadow-xl"
    >
      {/* Contêiner de Imagem Dedicado: Formato de Retrato Perfeito */}
      <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden shrink-0">
        <Image 
          src={teacher.foto} 
          alt={teacher.nome} 
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay sutil na base da imagem para o nome */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10 opacity-70"></div>
      </div>

      {/* Seção de Conteúdo: Alinhamento Equilibrado à Esquerda */}
      <div className="flex flex-col p-8 md:p-10 z-20 flex-grow text-left">
        {/* Nome e Ícone juntos */}
        <div className="flex items-center gap-3 mb-6">
          <Award className="text-mara-orange shrink-0" size={24} />
          <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {teacher.nome}
          </h3>
        </div>
        
        {/* Habilidades agrupadas */}
        <div className="flex flex-wrap justify-start items-center gap-2 mb-8">
          {teacher.especialidades.map((esp: string, i: number) => (
            <Link 
              key={i}
              href={`/?curso=${encodeURIComponent(esp)}#instrumentos`}
              className="bg-mara-orange/10 text-mara-orange border border-mara-orange/20 hover:bg-mara-orange/20 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
            >
              {esp}
            </Link>
          ))}
        </div>
        
        {/* Bio e Botão */}
        <div className="flex-grow">
          <p className={`text-gray-300 text-sm md:text-base leading-relaxed ${!isExpanded ? 'line-clamp-4' : ''}`}>
            &quot;{teacher.bio}&quot;
          </p>
        </div>
        
        <div className="mt-8">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-mara-orange text-sm font-semibold hover:text-white transition-colors duration-300"
          >
            {isExpanded ? 'Ler menos' : 'Ler mais'}
            {/* Ícone de seta para baixo ou cima sutil */}
            <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Teachers() {
  const teachersList = [
    {
      id: 1,
      nome: "Mara Alexandre Ferreira Lugli",
      especialidades: ["Piano", "Musicalização - Infantil", "Flauta Doce"],
      bio: "Sócia Fundadora e Diretora do Estúdio Musical e Cultural Mara Passos. Formada em Curso Superior de Piano Erudito pelo Conservatório Dramático e Musical de São Paulo. Possui cursos complementares em Musicalização Infantil e é Pós-Graduada em Musicoterapia na Faculdade Paulista de Artes. Também é formada pelo Curso Sopro Novo de Flautas Doce da Yamaha.",
      foto: "/teachers/mara.webp" 
    },
    {
      id: 2,
      nome: "Amanda Ferreira Lugli",
      especialidades: ["Piano", "Musicalização - Infantil", "Flauta Doce"],
      bio: "Sócia e estudante de Piano Clássico e Popular há 22 anos, Amanda atua no Estúdio desde sua abertura. Com experiência em diversos instrumentos e como Professora Assistente de Musicalização, conta com um vasto repertório. Atualmente aprimora sua Técnica Pianística Avançada e estuda Canto.",
      foto: "/teachers/amanda.webp"
    },
    {
      id: 3,
      nome: "Rafael Velez de Sousa",
      especialidades: ["Pandeiro", "Piano", "Violão", "Bateria"],
      bio: "Graduado em Licenciatura em Música pela UNESP, Rafael aprimora seus estudos em Piano e Violão na EMESP. Com forte base percussiva, estudou bateria em Escolas de Samba e especializou-se em Pandeiro no SESC Vila Mariana e no Coletivo S Pandeiro. Traz toda a riqueza do ritmo brasileiro para suas aulas.",
      foto: "/teachers/rafael.webp"
    },
    {
      id: 4,
      nome: "Vanessa Nunes da Silva",
      especialidades: ["Canto"],
      bio: "Formada em Canto Lírico pela FMU/FAAM, com especialização em Educação Musical, Psicopedagogia e Arteterapia. Atuou como cantora do Coral Paulistano do Teatro Municipal. Atualmente é licenciada do método “Full-Voice”, unindo conhecimentos da ciência da voz com uma visão técnico-musical e musicoterápica.",
      foto: "/teachers/vanessa.webp" // Ajuste o nome do arquivo se necessário
    },
    {
      id: 5,
      nome: "Rodrigo Alencar da Silva",
      especialidades: ["Violão", "Guitarra", "Baixo"],
      bio: "Formado em Licenciatura em Música pela FPA e em Guitarra pela Fundação das Artes de São Caetano do Sul. Com vasta experiência no ensino musical desde 2007, Rodrigo transita com facilidade entre o Violão Erudito, Jazz, Música Brasileira e Heavy Metal, com grande abrangência de estilos musicais.",
      foto: "/teachers/rodrigo.webp"
    },
    {
      id: 6,
      nome: "Reinaldo Aparecido Rodrigues",
      especialidades: ["Bateria", "Piano", "Teclado", "Violino"], // Violoncelo foi alterado para Violino provisoriamente para dar match com os cursos
      bio: "Com formação internacional na Escola Drum Tech em Londres, Reinaldo possui extensa bagagem musical. Estudou percussão erudita básica, piano erudito e popular, além de violoncelo em instituições renomadas como o Conservatório Carlos Gomes e a ULM, aprendendo com grandes mestres da música.",
      foto: "/teachers/reinaldo.webp" // Ajuste o nome do arquivo se necessário
    },
    {
      id: 7,
      nome: "Márcia Kiyomi Toshmitsu Ekami",
      especialidades: ["Piano", "Flauta Transversal", "Flauta Doce", "Musicalização - Infantil"],
      bio: "Formada em Piano Erudito pelo Conservatório Dramático e Musical de São Paulo. Leciona Flauta Transversal e possui formação pelo Curso Sopro Novo de Flautas Doce da Yamaha. Com cursos complementares em Musicalização Infantil, Márcia também desenvolveu trabalho de Canto Coral em diversos coros da Capital e atualmente é integrante do Zimana no CoralUsp.",
      foto: "/teachers/marcia.webp" // Ajuste o nome do arquivo se necessário
    },
  ];

  return (
    <section id="professores" className="py-32 bg-[#0b0b0b] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Nossos <span className="text-mara-orange">Professores</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Uma equipe de profissionais apaixonados por música, prontos para guiar você em cada nota da sua jornada.
            Nossos professores trazem anos de experiência e dedicação para ajudar você a atingir seus objetivos musicais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {teachersList.map((teacher, index) => (
            <TeacherCard key={teacher.id} teacher={teacher} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
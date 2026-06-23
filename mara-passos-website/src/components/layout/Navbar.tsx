"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Cursos', href: '#instrumentos' },
    { name: 'Professores', href: '#professores' },
    { name: 'Espaços', href: '#espacos' },
    { name: 'Quem somos', href: '#sobre-nos' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Dúvidas', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? 'bg-black/95 backdrop-blur-md shadow-2xl py-2'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/#inicio" className="flex items-center gap-3 z-50 group">
          <div className={`relative transition-all duration-500 ${isScrolled ? 'scale-90' : 'scale-110'}`}>
            <Image
              src="/logo.webp"
              alt="Estúdio Mara Passos"
              width={150}
              height={50}
              priority={true}
              className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_0_8px_rgba(242,101,34,0.2)]"
            />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-[3px] text-gray-400">Estúdio Musical</span>
            <span className="text-lg font-bold text-white tracking-tighter">
              MARA <span className="text-mara-orange">PASSOS</span>
            </span>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden xl:flex items-center gap-6">
          <div className="flex items-center gap-6 pr-6 border-r border-white/10">
            <Link href="/#inicio" className="text-xs font-semibold uppercase tracking-widest text-gray-300 hover:text-mara-orange transition-colors relative group">
              Início
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mara-orange transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/#instrumentos" className="text-xs font-semibold uppercase tracking-widest text-gray-300 hover:text-mara-orange transition-colors relative group">
              Cursos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mara-orange transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/#espacos" className="text-xs font-semibold uppercase tracking-widest text-gray-300 hover:text-mara-orange transition-colors relative group">
              Espaços
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mara-orange transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/#professores" className="text-xs font-semibold uppercase tracking-widest text-gray-300 hover:text-mara-orange transition-colors relative group">
              Professores
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mara-orange transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/#faq" className="text-xs font-semibold uppercase tracking-widest text-gray-300 hover:text-mara-orange transition-colors relative group">
              Dúvidas Frequentes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mara-orange transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/#sobre-nos" className="text-xs font-semibold uppercase tracking-widest text-gray-300 hover:text-mara-orange transition-colors relative group">
              Quem Somos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mara-orange transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/#agendamentos" className="text-xs font-semibold uppercase tracking-widest text-gray-300 hover:text-mara-orange transition-colors relative group">
              Contato
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mara-orange transition-all group-hover:w-full"></span>
            </Link>
          </div>

          <div className="flex items-center gap-4 pl-2">
            <Link
              href="https://portal.estudiomusicalmarapassos.com.br"
              target="_blank"
              className="flex items-center gap-2 text-white border border-white/20 hover:border-mara-orange hover:text-mara-orange px-5 py-2 rounded-full font-bold text-xs transition-all"
            >
              <User size={14} />
              Portal do Aluno
            </Link>

            <Link
              href="/#agendamentos"
              className="bg-mara-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold text-xs transition-all hover:scale-105 shadow-[0_5px_15px_rgba(242,101,34,0.3)]"
            >
              Agendar Aula Experimental
            </Link>
          </div>
        </nav>

        {/* BOTÃO PIANO HAMBURGUER MOBILE */}
        <button
          className="xl:hidden text-white z-50 p-2 focus:outline-none group"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Abrir menu"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="relative w-full h-full flex flex-col justify-between">
              {/* Tecla Branca 1 (Topo) */}
              <span className={`block w-full h-[6px] bg-white rounded-sm transition-all duration-300 shadow-[0_2px_0_rgba(255,255,255,0.4)] ${isMobileOpen ? 'rotate-45 translate-y-[11px] shadow-none bg-mara-orange' : 'hover:translate-y-[2px] hover:shadow-none'}`}></span>

              {/* Tecla Preta 1 */}
              <span className={`absolute top-[4px] left-[6px] w-[5px] h-[10px] bg-mara-orange z-10 rounded-b-sm transition-all duration-300 ${isMobileOpen ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'}`}></span>

              {/* Tecla Branca 2 (Meio) */}
              <span className={`block w-full h-[6px] bg-white rounded-sm transition-all duration-300 shadow-[0_2px_0_rgba(255,255,255,0.4)] ${isMobileOpen ? 'opacity-0 translate-x-4' : 'opacity-100 hover:translate-y-[2px] hover:shadow-none'}`}></span>

              {/* Tecla Preta 2 */}
              <span className={`absolute bottom-[10px] right-[6px] w-[5px] h-[10px] bg-mara-orange z-10 rounded-b-sm transition-all duration-300 ${isMobileOpen ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'}`}></span>

              {/* Tecla Branca 3 (Baixo) */}
              <span className={`block w-full h-[6px] bg-white rounded-sm transition-all duration-300 shadow-[0_2px_0_rgba(255,255,255,0.4)] ${isMobileOpen ? '-rotate-45 -translate-y-[11px] shadow-none bg-mara-orange' : 'hover:translate-y-[2px] hover:shadow-none'}`}></span>
            </div>
          </div>
        </button>

        {/* MENU MOBILE */}
        <div className={`
          fixed top-0 right-0 h-screen w-full md:w-80 bg-black/95 backdrop-blur-xl transform transition-transform duration-500 ease-in-out flex flex-col pt-24 px-8 pb-8 z-40
          ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}
          xl:hidden
        `}>
          
          <div className="flex-1 overflow-y-auto">
            {/* Seção 1: Navegação Principal */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Navegação</h3>
              <div className="grid grid-cols-2 gap-y-5 gap-x-2">
                <Link href="/#inicio" onClick={() => setIsMobileOpen(false)} className="text-base font-semibold text-white hover:text-mara-orange transition-colors">Início</Link>
                <Link href="/#instrumentos" onClick={() => setIsMobileOpen(false)} className="text-base font-semibold text-white hover:text-mara-orange transition-colors">Cursos</Link>
                <Link href="/#professores" onClick={() => setIsMobileOpen(false)} className="text-base font-semibold text-white hover:text-mara-orange transition-colors">Professores</Link>
                <Link href="/#faq" onClick={() => setIsMobileOpen(false)} className="text-base font-semibold text-white hover:text-mara-orange transition-colors">Dúvidas</Link>
              </div>
            </div>

            {/* Seção 2: Institucional */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">O Estúdio</h3>
              <div className="grid grid-cols-2 gap-y-5 gap-x-2">
                <Link href="/#sobre" onClick={() => setIsMobileOpen(false)} className="text-base font-semibold text-white hover:text-mara-orange transition-colors">Sobre</Link>
                <Link href="/#espacos" onClick={() => setIsMobileOpen(false)} className="text-base font-semibold text-white hover:text-mara-orange transition-colors">Espaços</Link>
                <Link href="/#sobre-nos" onClick={() => setIsMobileOpen(false)} className="text-base font-semibold text-white hover:text-mara-orange transition-colors">Quem Somos</Link>
                <Link href="/#depoimentos" onClick={() => setIsMobileOpen(false)} className="text-base font-semibold text-white hover:text-mara-orange transition-colors">Depoimentos</Link>
              </div>
            </div>
          </div>

          {/* Conversion Zone Fixa na Base */}
          <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="https://portal.estudiomusicalmarapassos.com.br"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-2 border border-white/20 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-white/5 transition-colors"
            >
              <User size={16} />
              Portal do Aluno
            </Link>
            <Link
              href="/#agendamentos"
              onClick={() => setIsMobileOpen(false)}
              className="bg-mara-orange text-center text-white py-3.5 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(242,101,34,0.4)] hover:scale-105 transition-all"
            >
              Agendar Aula Experimental
            </Link>
          </div>

        </div>

      </div>
    </header>
  );
}
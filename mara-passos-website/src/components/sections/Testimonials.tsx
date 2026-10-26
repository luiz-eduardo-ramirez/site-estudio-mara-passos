'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CXtPj2O5LkDBEAI/review';

const depoimentos = [
  {
    nome: "Alcina Liserre",
    texto: "A Mara é maravilhosa, excelente escola de música !!!",
    destaque: "excelente escola de música !!!"
  },
  {
    nome: "Cristiane Otani",
    texto: "Excelente escola, minha filha está amando as aulas de piano da professora Amanda! Recomendo.",
    destaque: "minha filha está amando as aulas de piano"
  },
  {
    nome: "Patrícia Bortoluzzi",
    texto: "A minha filha faz aula de piano e musicalização na escola e nós gostamos muito! Os professores são atenciosos e cuidadosos com as crianças. Um carinho especial para a Mara, que é sempre muito dedicada e acolhedora. Ela tem uma didática excelente com crianças e, quando precisa corrigir, faz isso de uma forma leve. É um ambiente leve e gostoso. Recomendo!",
    destaque: "dedicada e acolhedora."
  },
  {
    nome: "Maria Eugênia Zorzetto",
    texto: "Eu adoro o estúdio. Comecei a fazer aulas de piano com a Mara em janeiro de 2021, e desde então virei fã. Ela é uma ótima professora, com boa didática, paciência e alegria. Recomendo de olhos fechados!!! Eles também oferecem aulas de musicalização, canto e outros instrumentos.",
    destaque: "Recomendo de olhos fechados!!!"
  },
  {
    nome: "Micheli Varino",
    texto: "Você é uma professora querida, amiga e incentivadora, com certeza faz parte desse sonho. Muito obrigada por todo apoio e dedicação. Você realmente é um exemplo a ser seguido 👏🏻❤️",
    destaque: "professora querida, amiga e incentivadora"
  },
  {
    nome: "Marcelo Passareli",
    texto: "Parabéns @estudiomarapassos pelo trabalho, que muitas vezes é silencioso, mas sempre transforma vidas. ❤️🎹",
    destaque: "sempre transforma vidas."
  },
  {
    nome: "Laise Polonio",
    texto: "Mara! Uma professora muito especial! Nasceu para ensinar, de maneira leve, lúdica e amorosa. Ensino musical curativo! Desejo muito sucesso a você e ao Estúdio!",
    destaque: "Ensino musical curativo!"
  },
  {
    nome: "Thais Bianchi",
    texto: "Maravilhoso! Meu filho de 9 anos aprendeu a tocar piano rapidinho, super se interessou pela música e pelo método da Mara. Ela tem muito jeito para ensinar e paciência.",
    destaque: "aprendeu a tocar piano rapidinho,"
  },
  {
    nome: "Eduardo Henrique",
    texto: "Profissionais muito competentes e prestativos, recomendo muito!",
    destaque: "muito competentes e prestativos,"
  },
  {
    nome: "Patricia Aparecida Simao",
    texto: "Parabéns, você merece, por tanta dedicação e por saber dar tanto amor às crianças. Lembro como adorava estudar com você há 30 anos atrás ou mais rs. Sucesso sempre.",
    destaque: "tanto amor às crianças."
  }
];

function iniciais(nome: string) {
  const p = nome.split(' ');
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
}

function RevealText({ texto, destaque, reduce }: { texto: string; destaque: string; reduce: boolean }) {
  const inicio = texto.indexOf(destaque);
  const fim = inicio + destaque.length;

  // Posição de cada palavra no texto original, para saber se cai no trecho destacado
  let cursor = 0;
  const palavras = texto.split(' ').map((palavra) => {
    const pos = texto.indexOf(palavra, cursor);
    cursor = pos + palavra.length;
    return { palavra, destacada: inicio >= 0 && pos >= inicio && pos < fim };
  });

  return (
    <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug md:leading-tight text-white">
      {palavras.map(({ palavra, destacada }, i) => (
        <span key={i}>
          <motion.span
            initial={reduce ? false : { opacity: 0.12, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.05, ease: 'easeOut' }}
            className={`inline-block ${destacada ? 'text-mara-orange' : ''}`}
          >
            {palavra}
          </motion.span>{' '}
        </span>
      ))}
    </p>
  );
}

export default function Testimonials() {
  const [atual, setAtual] = useState(0);
  const reduce = useReducedMotion() ?? false;
  const dep = depoimentos[atual];
  const total = depoimentos.length;

  const anterior = () => setAtual((a) => (a - 1 + total) % total);
  const proximo = () => setAtual((a) => (a + 1) % total);

  return (
    <section id="depoimentos" className="py-24 bg-mara-dark overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-mara-orange mb-4">
            O que estão dizendo sobre nós
          </h2>
        </div>

        <div className="relative rounded-3xl border border-mara-orange/30 bg-gradient-to-br from-mara-gray via-[#0b0b0b] to-mara-dark px-6 sm:px-12 md:px-16 pt-14 md:pt-20 pb-8">
          {/* Aspas gigantes ao fundo */}
          <Quote
            aria-hidden
            className="pointer-events-none absolute -top-2 left-4 md:left-10 text-mara-orange opacity-15 w-32 h-32 md:w-56 md:h-56 rotate-180"
            strokeWidth={1.5}
            fill="currentColor"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-mara-orange/10 blur-3xl"
          />

          <div className="relative min-h-[260px] md:min-h-[300px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={atual}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="max-w-4xl"
              >
                <RevealText texto={dep.texto} destaque={dep.destaque} reduce={reduce} />
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="relative mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                aria-hidden
                className="w-14 h-14 rounded-full bg-gradient-to-br from-mara-orange to-orange-700 text-white font-bold text-lg flex items-center justify-center shrink-0"
              >
                {iniciais(dep.nome)}
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">{dep.nome}</h4>
                <div className="flex text-yellow-500 mt-1" aria-label="5 estrelas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" className="mr-0.5" />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={anterior}
                aria-label="Depoimento anterior"
                className="w-12 h-12 rounded-full border border-mara-orange/50 text-mara-orange flex items-center justify-center hover:bg-mara-orange hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <span className="text-white/60 text-sm tabular-nums">
                <span className="text-white font-bold">{atual + 1}</span> / {total}
              </span>
              <button
                type="button"
                onClick={proximo}
                aria-label="Próximo depoimento"
                className="w-12 h-12 rounded-full bg-mara-orange text-white flex items-center justify-center hover:brightness-110 transition"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-mara-orange px-8 py-4 font-bold text-mara-orange hover:bg-mara-orange hover:text-white transition-colors"
          >
            <Star size={20} fill="currentColor" />
            Avalie-nos no Google
          </a>
        </div>

      </div>
    </section>
  );
}

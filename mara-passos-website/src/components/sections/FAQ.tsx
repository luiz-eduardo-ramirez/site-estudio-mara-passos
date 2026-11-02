'use client';

import React, { useState } from 'react';
import Reveal from '../layout/Reveal';
import { faqData } from './faqData';

export default function FAQ() {
  // Estado para controlar qual pergunta está aberta
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    // Se clicar na que já está aberta, ela fecha. Se clicar em outra, abre a nova e fecha a anterior.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 max-w-4xl">
        <Reveal
          as="h2"
          y={-20}
          className="text-3xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Perguntas <span className="text-mara-orange">Frequentes</span>
        </Reveal>

        <Reveal stagger className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-neutral-900 border border-white/10 rounded-lg overflow-hidden"
              >
                <button
                  id={`faq-btn-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 cursor-pointer text-left text-lg font-semibold text-white hover:text-mara-orange transition-colors focus:outline-none"
                >
                  {item.question}
                  <span
                    className="text-mara-orange flex-shrink-0 ml-4 inline-flex transition-transform duration-300 ease-in-out"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </button>

                {/*
                  Acordeão pela técnica de grid-rows (0fr → 1fr): anima a altura
                  sem precisar medir "height: auto" nem de JS, e mantém a resposta
                  sempre no DOM (bom para busca/leitor de tela). O bloco
                  prefers-reduced-motion em globals.css zera a transição.
                */}
                <div
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

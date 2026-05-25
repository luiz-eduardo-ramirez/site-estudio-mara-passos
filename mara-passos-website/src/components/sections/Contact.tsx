"use client";

import { useState, useRef } from "react";
import { CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sucesso'>('idle');
  const [aceitouTermos, setAceitouTermos] = useState(false);

  // COLOQUE O NÚMERO DO WHATSAPP DO ESTÚDIO AQUI (Apenas números, com 55 e DDD)
  const NUMERO_WHATSAPP = "5511972405722";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Captura os dados preenchidos no formulário
    const formData = new FormData(e.currentTarget);
    const nome = formData.get('user_name');
    const telefone = formData.get('user_phone');
    const instrumento = formData.get('instrumento');

    // Monta a mensagem que vai chegar pronta no WhatsApp do Estúdio
    const mensagem = `Olá,meu nome é ${nome} e gostaria de agendar uma aula experimental de ${instrumento}.\n\nMeu telefone para contato é: ${telefone}\n\n*Regra de cancelamento:* Se eu faltar sem avisar com 24h de antecedência, não poderei repor a aula.\n\n *Confirmo que estou ciente da regra de cancelamento: se eu faltar sem avisar com 24h de antecedência, não poderei repor a aula.*\n\nAguardo o retorno para definirmos o melhor horário!`;

    // Cria o link do WhatsApp com a mensagem codificada (para aceitar espaços e acentos)
    const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    // Dispara o evento de conversão do GA4
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'lead_whatsapp', { origem: 'spa_contato' });
    }

    // Abre o WhatsApp em uma nova aba
    window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');

    // Limpa o formulário e mostra mensagem de sucesso na tela
    form.current?.reset();
    setAceitouTermos(false);
    setStatus('sucesso');

    // Esconde a mensagem de sucesso depois de 5 segundos
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="agendamentos" className="py-32 bg-mara-gray relative">
      {/* Divisor superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="container mx-auto px-6 max-w-6xl flex flex-col lg:flex-row items-center gap-12">

        {/* Formulário (Lado Esquerdo) */}
        <div className="w-full lg:w-1/2 bg-[#0b0b0b] rounded-2xl p-8 md:p-12 shadow-2xl border border-white/5 relative">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-mara-orange mb-4">
              Entre em contato conosco e agende sua aula experimental!
            </h2>
            <p className="text-gray-400 text-sm">
              Desperte sua paixão pela música! Nunca é tarde para começar, a hora é agora. Venha marcar sua aula experimental gratuita com a gente.
            </p>
          </div>

          <form ref={form} onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-mara-orange font-bold text-sm mb-2">Nome *</label>
              <input
                type="text"
                name="user_name"
                required
                placeholder="Digite o seu nome completo..."
                className="w-full bg-white text-black rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-mara-orange transition-shadow"
              />
            </div>

            <div>
              <label className="block text-mara-orange font-bold text-sm mb-2">Telefone *</label>
              <input
                type="tel"
                name="user_phone"
                required
                maxLength={15}
                placeholder="(11) 90000-0000"
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, ""); // Remove não-números
                  v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses no DDD
                  v = v.replace(/(\d)(\d{4})$/, "$1-$2");    // Coloca hífen no meio do número
                  e.target.value = v;
                }}
                className="w-full bg-white text-black rounded-full px-5 py-3 focus:outline-none focus:ring-4 focus:ring-mara-orange/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-mara-orange font-bold text-sm mb-2">Aula de *</label>
              <select
                name="instrumento"
                required
                defaultValue=""
                className="w-full bg-white text-black rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-mara-orange transition-shadow appearance-none cursor-pointer"
              >
                <option value="" disabled>Selecione o instrumento/curso...</option>
                <option value="Baixo">Baixo</option>
                <option value="Bateria">Bateria</option>
                <option value="Canto">Canto</option>
                <option value="Flauta Doce">Flauta Doce</option>
                <option value="Flauta Transversal">Flauta Transversal</option>
                <option value="Guitarra">Guitarra</option>
                <option value="Música de Câmara">Música de Câmara</option>
                <option value="Musicalização - Adultos">Musicalização - Adultos</option>
                <option value="Musicalização - Infantil">Musicalização - Infantil</option>
                <option value="Piano">Piano</option>
                <option value="Prática de Conjunto">Prática de Conjunto</option>
                <option value="Saxofone">Saxofone</option>
                <option value="Teclado">Teclado</option>
                <option value="Teoria Musical">Teoria Musical</option>
                <option value="Ukelelê">Ukelelê</option>
                <option value="Violão">Violão</option>
                <option value="Violino">Violino</option>
              </select>
            </div>

            {/* CHECKBOX DE TERMOS E CONDIÇÕES */}
            <div className="flex items-start gap-3 mt-8 mb-6 p-4 bg-red-900/10 border border-red-500/20 rounded-xl">
              <input
                type="checkbox"
                id="termos-experimental"
                name="termos_experimental"
                required
                checked={aceitouTermos}
                onChange={(e) => setAceitouTermos(e.target.checked)}
                className="mt-1 w-5 h-5 accent-mara-orange cursor-pointer shrink-0 rounded border-gray-600 focus:ring-mara-orange"
              />
              <label htmlFor="termos-experimental" className="text-gray-300 text-xs md:text-sm cursor-pointer leading-relaxed">
                Estou ciente de que a aula experimental é um horário reservado exclusivamente para mim. <strong className="text-white">Em caso de falta ou cancelamento sem aviso prévio de 24h, não será possível reagendar ou repor a aula.</strong>
              </label>
            </div>

            {/* Mensagem de Feedback */}
            {status === 'sucesso' && (
              <div className="flex items-center gap-2 text-green-500 font-bold bg-green-500/10 p-3 rounded-lg animate-fade-in-up">
                <CheckCircle2 size={20} />
                <span>Redirecionando para o WhatsApp...</span>
              </div>
            )}

            {/* O Botão agora avisa que vai para o WhatsApp */}
            <button
              type="submit"
              disabled={!aceitouTermos}
              className={`w-full font-bold py-4 rounded-full mt-4 transition-all flex justify-center items-center gap-2
                ${!aceitouTermos
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed opacity-60'
                  : 'bg-mara-orange hover:bg-orange-600 active:scale-[0.98] focus:ring-4 focus:ring-orange-500/50 text-white hover:shadow-[0_8px_25px_rgba(242,101,34,0.4)]'
                }
              `}
            >
              Pedir Agendamento no WhatsApp
            </button>
          </form>
        </div>

        {/* Imagem (Lado Direito) */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white transform hover:scale-105 transition-transform duration-500">
            <img
              src="/contact-image.jpg"
              alt="Hora de escolher sua música"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
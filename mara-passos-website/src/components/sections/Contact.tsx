"use client";

import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sucesso' | 'erro'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setStatus('idle');

    if (form.current) {
      // Substitua as strings abaixo pelas SUAS chaves do EmailJS
      emailjs.sendForm(
        'SEU_SERVICE_ID',     // Ex: service_xxxxx
        'SEU_TEMPLATE_ID',    // Ex: template_xxxxx
        form.current,
        'SUA_PUBLIC_KEY'      // Ex: xxxx_xxxxxx_xxxxx
      )
      .then((result) => {
          console.log('Sucesso:', result.text);
          setStatus('sucesso');
          form.current?.reset(); // Limpa o formulário
      }, (error) => {
          console.log('Erro:', error.text);
          setStatus('erro');
      })
      .finally(() => {
          setEnviando(false);
          // Oculta a mensagem de sucesso após 5 segundos
          setTimeout(() => setStatus('idle'), 5000);
      });
    }
  };

  return (
    <section id="agendamentos" className="py-24 bg-mara-gray">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col lg:flex-row items-center gap-12">
        
        {/* Formulário (Lado Esquerdo) */}
        <div className="w-full lg:w-1/2 bg-[#0b0b0b] rounded-2xl p-8 md:p-12 shadow-2xl border border-white/5 relative overflow-hidden">
          
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
                name="user_name" // OBRIGATÓRIO: Tem que bater com a variável do EmailJS
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
                placeholder="Digite o seu telefone (WhatsApp)..." 
                className="w-full bg-white text-black rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-mara-orange transition-shadow"
              />
            </div>

            <div>
              <label className="block text-mara-orange font-bold text-sm mb-2">E-mail *</label>
              <input 
                type="email" 
                name="user_email"
                required
                placeholder="Digite o seu e-mail..." 
                className="w-full bg-white text-black rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-mara-orange transition-shadow"
              />
            </div>

            <div>
              <label className="block text-mara-orange font-bold text-sm mb-2">Aula de *</label>
              <select 
                name="instrumento"
                required
                className="w-full bg-white text-black rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-mara-orange transition-shadow appearance-none cursor-pointer"
              >
                <option value="">Selecione o instrumento/curso...</option>
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

            {/* Mensagens de Feedback */}
            {status === 'sucesso' && (
              <div className="flex items-center gap-2 text-green-500 font-bold bg-green-500/10 p-3 rounded-lg animate-fade-in-up">
                <CheckCircle2 size={20} />
                <span>Solicitação enviada com sucesso!</span>
              </div>
            )}

            {status === 'erro' && (
              <div className="flex items-center gap-2 text-red-500 font-bold bg-red-500/10 p-3 rounded-lg animate-fade-in-up">
                <AlertCircle size={20} />
                <span>Erro ao enviar. Tente novamente mais tarde.</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={enviando}
              className="w-full bg-mara-orange hover:bg-orange-600 text-white font-bold py-4 rounded-full mt-4 transition-all hover:shadow-[0_0_15px_rgba(242,101,34,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {enviando ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </>
              ) : "Pedir Agendamento"}
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
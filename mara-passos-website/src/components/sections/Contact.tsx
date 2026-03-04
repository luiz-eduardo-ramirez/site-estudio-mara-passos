"use client";

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setStatus('idle');

    emailjs
      .sendForm(
        'service_0tttmp7',        // <-- SEU SERVICE ID (Já preenchido da sua imagem)
        'template_jpi3zxl',       // <-- COLOQUE SEU TEMPLATE ID AQUI
        form.current,
        '81S8wcvhcpphSm55R'         // <-- COLOQUE SUA PUBLIC KEY AQUI
      )
      .then(
        () => {
          setStatus('success');
          setIsSubmitting(false);
          form.current?.reset(); // Limpa o formulário após enviar
          
          // Volta o status ao normal após 5 segundos
          setTimeout(() => setStatus('idle'), 5000);
        },
        (error) => {
          console.error('FAILED...', error.text);
          setStatus('error');
          setIsSubmitting(false);
        }
      );
  };

  return (
    <section id="agendamentos" className="py-24 bg-black relative">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Agende sua <span className="text-mara-orange">Aula Experimental</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dê o primeiro passo na sua jornada musical! Preencha o formulário abaixo e nossa equipe entrará em contato pelo WhatsApp para agendar o melhor horário.
          </p>
        </div>

        <div className="bg-mara-gray/50 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm max-w-3xl mx-auto">
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Nome Completo</label>
                <input 
                  type="text" 
                  name="user_name" 
                  required 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mara-orange focus:ring-1 focus:ring-mara-orange transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">WhatsApp</label>
                <input 
                  type="tel" 
                  name="user_phone" 
                  required 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mara-orange focus:ring-1 focus:ring-mara-orange transition-colors"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">E-mail</label>
                <input 
                  type="email" 
                  name="user_email" 
                  required 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mara-orange focus:ring-1 focus:ring-mara-orange transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              {/* Instrumento */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Instrumento de Interesse</label>
                <select 
                  name="instrument" 
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mara-orange focus:ring-1 focus:ring-mara-orange transition-colors appearance-none"
                >
                  <option value="" disabled selected>Selecione um curso...</option>
                  <option value="Piano">Piano</option>
                  <option value="Violão / Guitarra">Violão / Guitarra</option>
                  <option value="Canto">Canto</option>
                  <option value="Bateria">Bateria</option>
                  <option value="Musicalização Infantil">Musicalização Infantil</option>
                  <option value="Pandeiro">Pandeiro</option>
                </select>
              </div>
            </div>

            {/* Mensagem */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300">Mensagem (Opcional)</label>
              <textarea 
                name="message" 
                rows={4}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mara-orange focus:ring-1 focus:ring-mara-orange transition-colors resize-none"
                placeholder="Qual o seu nível de experiência? Tem preferência de horário?"
              ></textarea>
            </div>

            {/* Botão Enviar e Feedback */}
            <div className="pt-4 flex flex-col items-center gap-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-mara-orange hover:bg-[#e05a1d] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(242,101,34,0.4)]"
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar Agendamento'}
                {!isSubmitting && <Send size={20} />}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 font-medium animate-fade-in-up">
                  <CheckCircle size={20} />
                  <span>Mensagem enviada! Entraremos em contato em breve.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 font-medium animate-fade-in-up">
                  <AlertCircle size={20} />
                  <span>Erro ao enviar. Tente nos chamar direto no WhatsApp.</span>
                </div>
              )}
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
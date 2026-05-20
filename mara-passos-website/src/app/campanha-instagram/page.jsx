"use client";

import { useState, useRef } from "react";
import { CheckCircle2, Download, BookOpen, Loader2 } from 'lucide-react';

export default function CampanhaInstagram() {
  const form = useRef(null);
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);

  // COLOQUE O NÚMERO DO WHATSAPP DO ESTÚDIO AQUI
  const NUMERO_WHATSAPP = "5511972405722";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    const formData = new FormData(e.currentTarget);
    const nome = formData.get('nome');
    const telefone = formData.get('whatsapp');
    const instrumento = formData.get('instrumento');

    // 1. Monta a mensagem e abre o WhatsApp IMEDIATAMENTE (evita bloqueadores de pop-up)
    const mensagem = `Olá! Vim do Instagram. Meu nome é ${nome} e gostaria de agendar uma aula experimental de ${instrumento}.\n\nMeu telefone é: ${telefone}\n\nAguardo o retorno para definirmos o melhor horário!`;
    const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank');

    // 2. Envia os dados para o e-mail em background (Registro do Lead)
    try {
      formData.append("_captcha", "false");
      formData.append("_subject", "Novo Lead do Instagram - Ebook!");
      
      // Substitua SEU_EMAIL_AQUI pelo email do estúdio
      await fetch("https://formsubmit.co/ajax/estudiomapassos@gmail.com", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Erro ao enviar cópia por e-mail:", error);
      // Não damos alert aqui para não estragar a experiência, 
      // o principal (WhatsApp) já funcionou!
    }

    // 3. Libera o eBook na tela atual
    setEnviado(true);
    setCarregando(false);
    form.current?.reset();
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center py-20 lg:py-32 overflow-hidden">
      
      {/* VÍDEO DE FUNDO */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY ESCURO SOBRE O VÍDEO */}
      <div className="absolute inset-0 bg-mara-dark/85 z-10"></div>
      
      {/* CONTEÚDO PRINCIPAL (z-20 para ficar acima do overlay) */}
      <div className="container mx-auto px-6 max-w-6xl flex flex-col lg:flex-row items-center gap-12 relative z-20">

        <div className="w-full lg:w-1/2 bg-[#0b0b0b]/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10 relative">
          
          {!enviado ? (
            <>
              <div className="text-center mb-8 animate-fade-in-up">
                <h1 className="text-3xl md:text-4xl font-black text-mara-orange mb-4 leading-tight">
                  Aula Experimental + eBook Gratuito
                </h1>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Agende a sua aula diretamente pelo WhatsApp e <strong className="text-white">libere instantaneamente</strong> o seu material exclusivo do Estúdio.
                </p>
              </div>

              <form ref={form} onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                
                <div>
                  <label className="block text-mara-orange font-bold text-sm mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    name="nome"
                    required
                    placeholder="Digite o seu nome..."
                    className="w-full bg-white text-black rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-mara-orange transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-mara-orange font-bold text-sm mb-2">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="seu.melhor@email.com"
                    className="w-full bg-white text-black rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-mara-orange transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-mara-orange font-bold text-sm mb-2">WhatsApp *</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    maxLength={15}
                    placeholder="(11) 90000-0000"
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, ""); 
                      v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); 
                      v = v.replace(/(\d)(\d{4})$/, "$1-$2");    
                      e.target.value = v;
                    }}
                    className="w-full bg-white text-black rounded-full px-5 py-3 focus:outline-none focus:ring-4 focus:ring-mara-orange/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-mara-orange font-bold text-sm mb-2">Qual instrumento deseja aprender? *</label>
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

                <div className="flex items-start gap-3 mt-8 mb-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <input
                    type="checkbox"
                    id="termos-ebook"
                    required
                    checked={aceitouTermos}
                    onChange={(e) => setAceitouTermos(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-mara-orange cursor-pointer shrink-0 rounded border-gray-600 focus:ring-mara-orange"
                  />
                  <label htmlFor="termos-ebook" className="text-gray-300 text-xs md:text-sm cursor-pointer leading-relaxed">
                    Estou ciente de que a aula experimental é um horário reservado exclusivamente para mim. <strong className="text-white">Em caso de falta ou cancelamento sem aviso prévio de 24h, não será possível reagendar ou repor a aula.</strong>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!aceitouTermos || carregando}
                  className={`w-full font-bold py-4 rounded-full mt-4 transition-all flex justify-center items-center gap-2
                    ${!aceitouTermos || carregando
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed opacity-60'
                      : 'bg-mara-orange hover:bg-orange-600 active:scale-[0.98] focus:ring-4 focus:ring-orange-500/50 text-white hover:shadow-[0_8px_25px_rgba(242,101,34,0.4)]'
                    }
                  `}
                >
                  {carregando ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Abrindo WhatsApp...</>
                  ) : (
                    <><BookOpen className="w-5 h-5" /> Falar no WhatsApp e Ganhar eBook</>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* TELA DE SUCESSO E DOWNLOAD */
            <div className="text-center py-8 animate-fade-in-up">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4">WhatsApp Aberto!</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Nossa equipe já está disponível na outra aba para agendar o seu horário.
                <br /><br />
                Enquanto falamos por lá, clique no botão abaixo para baixar o seu presente:
              </p>
              
              <a 
                href="/ebook-estudio-mara-passos.pdf" 
                download="eBook-Mara-Passos.pdf"
                className="w-full inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold py-4 rounded-full transition-all shadow-[0_8px_25px_rgba(16,185,129,0.3)]"
              >
                <Download className="w-5 h-5" /> Baixar Meu eBook Agora
              </a>
            </div>
          )}
        </div>

        {/* Lado Direito: Imagem da Campanha / Mockup do eBook */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative w-full max-w-md aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-white/10 transform hover:scale-[1.02] transition-transform duration-500">
            <img
              src="/ebook.png"
              alt="Baixe o eBook exclusivo do Estúdio Mara Passos"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-mara-orange text-white text-xs font-black px-4 py-2 rounded-full shadow-lg uppercase tracking-wider">
              100% Gratuito
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
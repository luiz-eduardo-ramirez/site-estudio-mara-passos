'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já deu o consentimento
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Pequeno delay para não aparecer instantaneamente
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-fade-in-up">
      <div className="max-w-5xl mx-auto bg-[#141414]/90 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-center md:text-left">
          <p className="text-[#E5E5E5] text-sm md:text-base leading-relaxed">
            Nós utilizamos cookies para melhorar sua experiência e analisar nosso tráfego. 
            Ao continuar navegando, você concorda com nosso uso de cookies. 
            Consulte nossa{' '}
            <Link 
              href="/privacidade" 
              className="text-[#f26522] hover:text-orange-400 underline underline-offset-4 transition-colors"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleAccept}
            className="w-full md:w-auto px-8 py-3 bg-[#f26522] hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95"
          >
            Aceitar Cookies
          </button>
        </div>
      </div>
    </div>
  );
}

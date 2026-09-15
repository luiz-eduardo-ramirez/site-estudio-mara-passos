'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CONSENT_EVENT, CONSENT_KEY, readConsent } from './ConsentGate';

/**
 * Banner de consentimento. A decisão tomada aqui controla de fato o
 * carregamento do Google Analytics e do Meta Pixel — ver ConsentGate, que ouve
 * CONSENT_EVENT e só monta as duas ferramentas após o aceite.
 */
export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Quem já aceitou antes continua aceito: a chave é a mesma de sempre
    if (readConsent()) return;

    // Pequeno delay para não aparecer instantaneamente
    const timer = setTimeout(() => setShowBanner(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const decide = (value: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Armazenamento bloqueado: sem registro, o banner volta na próxima visita
    }
    // Avisa o ConsentGate na mesma renderização, sem exigir recarregar a página
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-4 animate-fade-in-up"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-xl border border-white/10 bg-[#141414]/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:gap-5">
        <p className="flex-1 text-center text-[13px] leading-snug text-[#E5E5E5] sm:text-left">
          Usamos cookies para analisar o tráfego e melhorar sua experiência.{' '}
          <Link
            href="/privacidade"
            className="text-[#f26522] underline underline-offset-2 transition-colors hover:text-orange-400"
          >
            Política de Privacidade
          </Link>
        </p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => decide('rejected')}
            className="min-h-[44px] flex-1 rounded-full border border-white/20 px-5 text-sm font-semibold text-[#E5E5E5] transition-colors hover:border-white/40 hover:text-white active:scale-95 sm:flex-none"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            className="min-h-[44px] flex-1 rounded-full bg-[#f26522] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-orange-600 active:scale-95 sm:flex-none"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, useSyncExternalStore } from 'react';
import { AlertCircle, Check, Instagram, Link2, Share2 } from 'lucide-react';

type ShareBarProps = {
  title: string;
  description: string;
  instagramUrl?: string;
};

type EstadoCopia = 'idle' | 'copiado' | 'erro';

const BOTAO =
  'inline-flex items-center gap-2 min-h-11 px-5 rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-gray-200 hover:border-mara-orange hover:text-mara-orange transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mara-orange';

/** Fallback para navegadores que bloqueiam a Clipboard API. */
function copiarComSelecao(texto: string): boolean {
  const campo = document.createElement('textarea');
  campo.value = texto;
  campo.setAttribute('readonly', '');
  campo.style.position = 'fixed';
  campo.style.opacity = '0';
  document.body.appendChild(campo);
  campo.select();

  let sucesso = false;
  try {
    sucesso = document.execCommand('copy');
  } catch {
    sucesso = false;
  }

  document.body.removeChild(campo);
  return sucesso;
}

/** A API de compartilhamento só existe no cliente; no servidor assumimos que não há. */
const inscreverSemMudancas = () => () => {};
const temShareNoCliente = () => typeof navigator.share === 'function';
const temShareNoServidor = () => false;

export default function ShareBar({ title, description, instagramUrl }: ShareBarProps) {
  const [copia, setCopia] = useState<EstadoCopia>('idle');
  const temShareNativo = useSyncExternalStore(
    inscreverSemMudancas,
    temShareNoCliente,
    temShareNoServidor
  );

  useEffect(() => {
    if (copia === 'idle') return;
    const timer = setTimeout(() => setCopia('idle'), 3000);
    return () => clearTimeout(timer);
  }, [copia]);

  const compartilhar = async () => {
    try {
      await navigator.share({ title, text: description, url: window.location.href });
    } catch {
      // O usuário cancelou o compartilhamento — nada a fazer.
    }
  };

  const copiarLink = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setCopia('copiado');
      return;
    } catch {
      // A Clipboard API pode estar bloqueada; tentamos o método antigo abaixo.
    }

    setCopia(copiarComSelecao(url) ? 'copiado' : 'erro');
  };

  const rotuloCopia =
    copia === 'copiado' ? 'Link copiado' : copia === 'erro' ? 'Copie da barra de endereço' : 'Copiar link';

  return (
    <div className="mt-12 md:mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 mr-1">
        Compartilhar
      </span>

      {temShareNativo && (
        <button type="button" onClick={compartilhar} className={BOTAO}>
          <Share2 size={16} aria-hidden="true" />
          Compartilhar
        </button>
      )}

      <button type="button" onClick={copiarLink} className={BOTAO}>
        {copia === 'copiado' && <Check size={16} className="text-mara-orange" aria-hidden="true" />}
        {copia === 'erro' && <AlertCircle size={16} className="text-mara-orange" aria-hidden="true" />}
        {copia === 'idle' && <Link2 size={16} aria-hidden="true" />}
        {rotuloCopia}
      </button>

      {instagramUrl && (
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={BOTAO}>
          <Instagram size={16} aria-hidden="true" />
          Ver no Instagram
        </a>
      )}

      <span aria-live="polite" className="sr-only">
        {copia === 'copiado' && 'Link da notícia copiado para a área de transferência.'}
        {copia === 'erro' && 'Não foi possível copiar automaticamente. Copie o endereço da barra do navegador.'}
      </span>
    </div>
  );
}

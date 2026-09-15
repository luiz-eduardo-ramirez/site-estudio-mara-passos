"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import MetaPixel from "../MetaPixel";

export const CONSENT_KEY = "cookie-consent";
export const CONSENT_EVENT = "cookie-consent-change";

export type Consent = "accepted" | "rejected" | null;

export function readConsent(): Consent {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    // Navegação privada ou armazenamento bloqueado: trata como sem decisão
    return null;
  }
}

/**
 * Carrega Google Analytics e Meta Pixel somente depois do aceite explícito.
 *
 * Antes existia um botão "Aceitar" que apenas escondia o banner: as duas
 * ferramentas subiam no layout raiz e já disparavam PageView na primeira
 * renderização, independentemente de qualquer clique. Com a opção de recusar,
 * o consentimento precisa de fato controlar o carregamento — é o que este
 * componente faz.
 *
 * Consequência esperada: visitantes que recusarem, ou que saírem sem decidir,
 * não são mais contabilizados.
 */
export default function ConsentGate() {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    setConsent(readConsent());

    // Reage à decisão no mesmo carregamento, sem exigir recarregar a página
    const sync = () => setConsent(readConsent());
    window.addEventListener(CONSENT_EVENT, sync);
    // 'storage' cobre o caso de outra aba do site registrar a decisão
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (consent !== "accepted") return null;

  return (
    <>
      <MetaPixel />
      <GoogleAnalytics gaId="G-YTK6JLQJBG" />
    </>
  );
}

"use client";

/*
 * Ponto único de entrada do GSAP no site.
 *
 * Importa o núcleo e os plugins e os registra uma só vez, logo no primeiro
 * import no navegador. Todo componente que anima puxa o gsap daqui — nunca de
 * "gsap" direto — para garantir que ScrollTrigger, Flip e o useGSAP já estejam
 * registrados antes do primeiro uso. O registro roda só no cliente: no servidor
 * (RSC) o módulo é importado, mas o typeof window segura o registerPlugin.
 *
 * ScrollTrigger, Flip e SplitText são gratuitos a partir do GSAP 3.13.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);
}

export { gsap, ScrollTrigger, Flip, useGSAP };

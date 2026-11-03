"use client";

/*
 * Ponto único de entrada do GSAP no site.
 *
 * Todo componente que anima puxa o gsap daqui — nunca de "gsap" direto — para
 * manter um só lugar de configuração. Hoje o site usa só o núcleo do GSAP e o
 * hook useGSAP (limpeza automática no unmount, inclusive no StrictMode do React
 * 19). As reveals por rolagem usam IntersectionObserver (ver Reveal.tsx), então
 * não precisamos do ScrollTrigger nem de outros plugins — e o bundle fica menor.
 */
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export { gsap, useGSAP };

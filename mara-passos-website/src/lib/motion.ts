/*
 * Tokens de movimento do site inteiro.
 *
 * Um só lugar para durações, eases e parâmetros de reveal, para que todas as
 * animações tenham o mesmo ritmo. Arquivo puro (sem "use client" nem gsap),
 * então pode ser importado tanto por componentes cliente quanto por utilidades.
 *
 * Regras que moram aqui, da skill de UI:
 * - saída mais curta que a entrada (exit ≈ 55% da base), para parecer responsivo;
 * - offset de reveal pequeno (lê como fade, não como "pulo");
 * - stagger curto, para listas não ficarem arrastadas.
 */
export const EASE = {
  /** Saída elegante, com desaceleração longa — o ease padrão das reveals. */
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
  expoInOut: "expo.inOut",
  /** Entrada cinematográfica: arranque rápido e pouso muito longo. */
  cine: "expo.out",
} as const;

export const DUR = {
  fast: 0.3,
  base: 0.7,
  slow: 0.9,
  exit: 0.3,
  /** Duração das entradas cinematográficas. */
  cine: 1.1,
} as const;

export const REVEAL = {
  y: 32,
  stagger: 0.09,
  /** Stagger entre linhas de texto. */
  lineStagger: 0.08,
  /** Stagger entre cards. */
  cardStagger: 0.12,
  start: "top 85%",
} as const;

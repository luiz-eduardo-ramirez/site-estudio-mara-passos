"use client";

import { LazyMotion } from "framer-motion";

// Carrega os recursos do Framer Motion depois da hidratação, fora do bundle inicial.
// domMax (e não domAnimation) porque Instruments usa layoutId na animação do filtro.
const carregarRecursos = () =>
  import("./motionFeatures").then((modulo) => modulo.default);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={carregarRecursos}>{children}</LazyMotion>;
}

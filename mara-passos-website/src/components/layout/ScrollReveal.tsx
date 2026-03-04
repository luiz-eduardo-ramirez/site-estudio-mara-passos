"use client";

import { motion } from "framer-motion";

export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Começa invisível e 50px para baixo
      whileInView={{ opacity: 1, y: 0 }} // Quando aparece na tela, fica visível e sobe
      viewport={{ once: true, margin: "-100px" }} // Só anima uma vez, e espera entrar 100px na tela
      transition={{ duration: 0.7, ease: "easeOut" }} // Suavidade
    >
      {children}
    </motion.div>
  );
}
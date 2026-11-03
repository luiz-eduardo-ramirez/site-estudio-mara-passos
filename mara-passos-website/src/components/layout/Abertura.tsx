"use client";

import { useEffect, useState } from "react";

/*
 * Abertura animada — a mesma tela de carregamento do Portal do Aluno.
 *
 * O visual e os tempos são cópia fiel do #abertura do index.html do portal; o
 * CSS (classes .ab-*) mora em globals.css. Aqui fica só o controle em React,
 * equivalente aos scripts inline do portal:
 *  - o script no <head> (ver layout) já marcou o <html> com .com-abertura (para
 *    a tela aparecer já na primeira pintura, sem lampejo) e, fora do
 *    prefers-reduced-motion, .abertura-animada (para a entrada animar);
 *  - este componente solta a entrada (.abertura-rodando) depois de dois quadros,
 *    espera a entrada terminar, dispara a saída (.saindo) e então desmonta.
 *
 * A entrada: teclas brancas sobem, pretas descem, os fios se desenham em
 * laranja, o nome aparece e a barra laranja faz vaivém. A saída sobe como a
 * tampa de um piano. Em prefers-reduced-motion a marca aparece pronta e só some.
 */
const ENTRADA_MS = 1550;
const SAIDA_MS = 800;

export default function Abertura() {
  const [visivel, setVisivel] = useState(true);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    // Sem a classe no <html>, o script do <head> decidiu não mostrar a abertura
    // (ex.: ambiente sem o preparo) — nada a fazer.
    if (!html.classList.contains("com-abertura")) {
      setVisivel(false);
      return;
    }

    const reduzido =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const entrada = reduzido ? 0 : ENTRADA_MS;
    const saida = reduzido ? 250 : SAIDA_MS;

    // Solta a entrada quando a página já começou a ser desenhada (dois quadros).
    const raf1 = requestAnimationFrame(() =>
      requestAnimationFrame(() => html.classList.add("abertura-rodando")),
    );

    const tSaida = window.setTimeout(() => {
      setSaindo(true);
      const tFim = window.setTimeout(() => {
        setVisivel(false);
        html.classList.remove("com-abertura", "abertura-animada", "abertura-rodando");
      }, saida);
      // guarda para limpeza
      (html as unknown as { _tFim?: number })._tFim = tFim;
    }, entrada);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(tSaida);
      const g = html as unknown as { _tFim?: number };
      if (g._tFim) clearTimeout(g._tFim);
    };
  }, []);

  if (!visivel) return null;

  return (
    <div id="abertura" className={saindo ? "saindo" : undefined} aria-hidden="true">
      <div className="ab-cena">
        {/* As teclas do "m", nas proporções da logo */}
        <div className="ab-marca">
          <i className="ab-branca ab-b1" />
          <i className="ab-branca ab-b2" />
          <i className="ab-branca ab-b3" />
          <i className="ab-fio ab-f1" />
          <i className="ab-fio ab-f2" />
          <i className="ab-preta ab-p1" />
          <i className="ab-preta ab-p2" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ab-nome" src="/splash/mara-passos-nome.png" alt="" width={698} height={95} />
          <span className="ab-barra" />
        </div>
      </div>
    </div>
  );
}

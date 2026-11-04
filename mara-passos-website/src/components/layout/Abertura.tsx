"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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
 *
 * Transição de página: o layout raiz nunca remonta na navegação do App Router,
 * então a abertura só tocava no primeiro carregamento. Links marcados com
 * data-transicao (ex.: "Ler a matéria" das notícias) são interceptados aqui: a
 * tela da logo cobre a página NA HORA do clique — o que também esconde o tempo
 * de carregar a rota —, a navegação roda por baixo, e a tampa só sobe quando a
 * rota nova chegou e a marca teve tempo de se montar.
 */
const ENTRADA_MS = 1550;
const SAIDA_MS = 800;
// Na transição a logo não precisa do ciclo inteiro (a barra de carregamento só
// entra aos 1,5s): basta o "m" montado e o nome aparecendo.
const TRANSICAO_MIN_MS = 1250;
// Rede de segurança: se a rota nunca chegar, a tampa sobe mesmo assim.
const TRANSICAO_MAX_MS = 8000;

type Html = HTMLElement & { _tFim?: number };

const reduzido = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Abertura() {
  const [visivel, setVisivel] = useState(true);
  const [saindo, setSaindo] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Estado da transição (refs: o listener de clique vive fora do ciclo de render).
  const ocupado = useRef(true); // true durante a abertura inicial
  const origem = useRef<string | null>(null); // pathname de onde a transição partiu
  const minimoOk = useRef(false);
  const pathnameRef = useRef(pathname);
  const timers = useRef<number[]>([]);

  pathnameRef.current = pathname;

  const limparTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  const sair = (saida: number) => {
    const html = document.documentElement as Html;
    setSaindo(true);
    timers.current.push(
      window.setTimeout(() => {
        setVisivel(false);
        html.classList.remove("com-abertura", "abertura-animada", "abertura-rodando");
        origem.current = null;
        ocupado.current = false;
      }, saida),
    );
  };

  // Abertura inicial (primeiro carregamento).
  useEffect(() => {
    const html = document.documentElement as Html;
    // Sem a classe no <html>, o script do <head> decidiu não mostrar a abertura
    // (ex.: ambiente sem o preparo) — nada a fazer.
    if (!html.classList.contains("com-abertura")) {
      setVisivel(false);
      ocupado.current = false;
      return;
    }

    const rapido = reduzido();
    const entrada = rapido ? 0 : ENTRADA_MS;
    const saida = rapido ? 250 : SAIDA_MS;

    // Solta a entrada quando a página já começou a ser desenhada (dois quadros).
    const raf1 = requestAnimationFrame(() =>
      requestAnimationFrame(() => html.classList.add("abertura-rodando")),
    );

    const tSaida = window.setTimeout(() => sair(saida), entrada);
    timers.current.push(tSaida);

    return () => {
      cancelAnimationFrame(raf1);
      limparTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Transição de página: intercepta os links marcados com data-transicao.
  useEffect(() => {
    if (reduzido()) return;

    const tentarSair = () => {
      if (origem.current === null) return;
      if (!minimoOk.current) return;
      if (pathnameRef.current === origem.current) return; // rota nova ainda não chegou
      origem.current = null;
      sair(SAIDA_MS);
    };

    const aoClicar = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (ocupado.current) return;

      const alvo = e.target;
      if (!(alvo instanceof Element)) return;
      const a = alvo.closest("a[data-transicao]");
      if (!(a instanceof HTMLAnchorElement)) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;

      const destino = new URL(a.href, window.location.href);
      if (destino.origin !== window.location.origin) return;
      if (destino.pathname === window.location.pathname) return;

      // Mata a navegação do next/link (ele desiste ao ver defaultPrevented) para
      // sermos nós a navegar, já com a tela da logo por cima.
      e.preventDefault();

      const html = document.documentElement as Html;
      ocupado.current = true;
      minimoOk.current = false;
      origem.current = pathnameRef.current;
      limparTimers();

      html.classList.add("com-abertura", "abertura-animada");
      html.classList.remove("abertura-rodando");
      setSaindo(false);
      setVisivel(true); // remonta o #abertura: as animações CSS recomeçam do zero

      requestAnimationFrame(() =>
        requestAnimationFrame(() => html.classList.add("abertura-rodando")),
      );

      router.push(destino.pathname + destino.search + destino.hash);

      timers.current.push(
        window.setTimeout(() => {
          minimoOk.current = true;
          tentarSair();
        }, TRANSICAO_MIN_MS),
      );
      timers.current.push(
        window.setTimeout(() => {
          minimoOk.current = true;
          if (origem.current !== null) {
            origem.current = null;
            sair(SAIDA_MS);
          }
        }, TRANSICAO_MAX_MS),
      );
    };

    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // A rota nova chegou: se o tempo mínimo da logo já passou, a tampa sobe.
  useEffect(() => {
    if (origem.current === null || !minimoOk.current) return;
    if (pathname === origem.current) return;
    origem.current = null;
    sair(SAIDA_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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

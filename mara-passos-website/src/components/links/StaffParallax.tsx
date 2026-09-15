"use client";

import { useEffect, useRef } from "react";

/**
 * Pentagrama em parallax: três pautas em profundidades diferentes que se
 * separam conforme o ponteiro se move.
 *
 * O ponteiro alimenta duas custom properties (--px e --py, ambas em -1..1) no
 * elemento raiz; o deslocamento de cada camada é puro CSS. Nada de estado do
 * React, então mover o mouse não dispara nenhum render — só a composição do
 * navegador, que roda fora da thread principal.
 *
 * Onde não há ponteiro fino (celular, que é a origem da maior parte do tráfego
 * de link na bio) as camadas ganham uma deriva autônoma lenta via animação CSS.
 * Sob prefers-reduced-motion nada se move.
 */
export default function StaffParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!window.matchMedia("(pointer: fine)").matches) {
      el.dataset.drift = "on";
      return;
    }

    // Alvo (tx, ty) vindo do ponteiro e posição corrente (cx, cy) que o persegue.
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const tick = () => {
      // Interpolação: o fundo chega ao alvo com atraso, o que suaviza o gesto
      cx += (tx - cx) * 0.075;
      cy += (ty - cy) * 0.075;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));

      raf =
        Math.abs(tx - cx) > 0.0005 || Math.abs(ty - cy) > 0.0005
          ? requestAnimationFrame(tick)
          : 0;
    };

    const onMove = (event: PointerEvent) => {
      tx = (event.clientX / window.innerWidth - 0.5) * 2;
      ty = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="lt-staff absolute inset-0">
      <Staff className="lt-staff-far" top="11%" opacity={0.075} scale={0.82}>
        <TimeSignature x={200} />
        <Note x={300} line={3} />
        <Note x={352} line={2} flag />
        <Note x={470} line={4} hollow />
        <Sharp x={560} line={3} />
        <Note x={640} line={2} />
        <Beam x={760} lines={[4, 3]} />
        <Note x={930} line={3} hollow />
        <Note x={1030} line={1} flag />
      </Staff>

      <Staff className="lt-staff-mid" top="44%" opacity={0.095} scale={1}>
        <Note x={175} line={2} flag />
        <Beam x={210} lines={[3, 4]} />
        <Flat x={380} line={2} />
        <Note x={450} line={3} />
        <Note x={545} line={4} hollow />
        <Beam x={660} lines={[2, 3]} />
        <Note x={830} line={1} />
        <Sharp x={910} line={3} />
        <Note x={1000} line={3} flag />
        <Note x={1020} line={2} hollow />
      </Staff>

      <Staff className="lt-staff-near" top="76%" opacity={0.11} scale={1.18}>
        <TimeSignature x={185} />
        <Note x={250} line={4} />
        <Beam x={350} lines={[3, 2]} />
        <Note x={520} line={3} hollow />
        <Flat x={610} line={4} />
        <Note x={690} line={2} flag />
        <Note x={800} line={3} />
        <Beam x={900} lines={[4, 4]} />
        <Note x={1000} line={2} hollow />
      </Staff>
    </div>
  );
}

/* ---------- Peças do desenho ---------- */

// A pauta ocupa y=20..100 do viewBox; cada "line" 1..5 é um espaço da pauta.
const STAFF_TOP = 20;
const STAFF_GAP = 20;
const yOf = (line: number) => STAFF_TOP + (5 - line) * STAFF_GAP;

function Staff({
  children,
  className,
  top,
  opacity,
  scale,
}: {
  children: React.ReactNode;
  className: string;
  top: string;
  opacity: number;
  scale: number;
}) {
  return (
    // Wrapper externo: só o deslocamento de parallax, para não disputar a
    // propriedade transform com o -translate-x-1/2 que centraliza a pauta.
    <div className={`absolute inset-0 ${className}`}>
      <div
        className="absolute left-1/2 w-[135%] max-w-none -translate-x-1/2"
        style={{ top, opacity }}
      >
        <svg
          viewBox="0 0 1200 190"
          className="h-auto w-full text-mara-orange"
          style={{ transform: `scale(${scale})` }}
          fill="none"
        >
          {/* As cinco linhas da pauta */}
          {[1, 2, 3, 4, 5].map((line) => (
            <line
              key={line}
              x1="0"
              x2="1200"
              y1={yOf(line)}
              y2={yOf(line)}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          ))}
          {children}
        </svg>
      </div>
    </div>
  );
}

/** Cabeça de nota oval inclinada, com haste — e bandeirola quando `flag`. */
function Note({
  x,
  line,
  hollow,
  flag,
}: {
  x: number;
  line: number;
  hollow?: boolean;
  flag?: boolean;
}) {
  const y = yOf(line);
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse
        rx="10"
        ry="7"
        transform="rotate(-22)"
        fill={hollow ? "none" : "currentColor"}
        stroke="currentColor"
        strokeWidth={hollow ? 2.6 : 0}
      />
      <rect x="8.4" y="-40" width="2.6" height="40" fill="currentColor" />
      {flag && (
        <path
          d="M11 -40c13 8 15 19 10 29 1-11-3-17-10-21z"
          fill="currentColor"
        />
      )}
    </g>
  );
}

/** Par de colcheias unidas pela barra — o desenho que mais "lê" como partitura. */
function Beam({ x, lines }: { x: number; lines: [number, number] }) {
  const [a, b] = lines;
  const ya = yOf(a);
  const yb = yOf(b);
  const dx = 78;
  return (
    <g transform={`translate(${x} 0)`}>
      <ellipse cx="0" cy={ya} rx="10" ry="7" transform={`rotate(-22 0 ${ya})`} fill="currentColor" />
      <rect x="8.4" y={ya - 44} width="2.6" height="44" fill="currentColor" />
      <ellipse cx={dx} cy={yb} rx="10" ry="7" transform={`rotate(-22 ${dx} ${yb})`} fill="currentColor" />
      <rect x={dx + 8.4} y={yb - 44} width="2.6" height="44" fill="currentColor" />
      <path
        d={`M8.4 ${ya - 44} L${dx + 11} ${yb - 44} L${dx + 11} ${yb - 36} L8.4 ${ya - 36} Z`}
        fill="currentColor"
      />
    </g>
  );
}

function Sharp({ x, line }: { x: number; line: number }) {
  const y = yOf(line);
  return (
    <g
      transform={`translate(${x} ${y})`}
      stroke="currentColor"
      strokeLinecap="round"
    >
      <line x1="-5" y1="-15" x2="-5" y2="13" strokeWidth="2.2" />
      <line x1="5" y1="-18" x2="5" y2="10" strokeWidth="2.2" />
      <line x1="-11" y1="-5" x2="11" y2="-8.5" strokeWidth="3" />
      <line x1="-11" y1="5" x2="11" y2="1.5" strokeWidth="3" />
    </g>
  );
}

function Flat({ x, line }: { x: number; line: number }) {
  const y = yOf(line);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-1.3" y="-26" width="2.6" height="34" fill="currentColor" />
      <path
        d="M1.3 -4c10-7 13 1 10 6-2 4-6 6-10 8z"
        fill="currentColor"
      />
    </g>
  );
}

/**
 * Fórmula de compasso, composta na Playfair Display da própria página.
 *
 * Substitui a clave de sol: uma clave exige uma espiral que, desenhada à mão em
 * path, sai parecendo um cifrão. A fórmula de compasso é igualmente inequívoca
 * numa pauta e resolve-se com tipografia, que aqui já está carregada.
 */
function TimeSignature({ x }: { x: number }) {
  const common = {
    x,
    textAnchor: "middle" as const,
    dominantBaseline: "central" as const,
    fill: "currentColor",
    style: { fontFamily: "var(--font-playfair), ui-serif, Georgia, serif" },
    fontSize: 46,
    fontWeight: 700,
  };
  return (
    <g>
      {/* Numerador entre as linhas 5 e 3; denominador entre as linhas 3 e 1 */}
      <text {...common} y={yOf(4)}>
        4
      </text>
      <text {...common} y={yOf(2)}>
        4
      </text>
    </g>
  );
}

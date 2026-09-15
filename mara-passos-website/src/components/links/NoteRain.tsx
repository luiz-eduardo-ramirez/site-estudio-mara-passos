/**
 * Chuva de notas: glifos musicais espalhados em três profundidades que sobem
 * conforme a página rola.
 *
 * O repertório (♪ ♫ ♩ ♬ ♭ ♮ ♯) e a opacidade são os mesmos do site
 * institucional, que roda esse motivo no `floatUp`: quem vem do Instagram para
 * o link e do link para o site vê o mesmo fundo na jornada inteira.
 *
 * Não é Client Component. As posições saem de um gerador com semente fixa, de
 * modo que o desenho é sempre o mesmo, e todo o movimento é CSS preso à
 * rolagem — nenhum byte de JavaScript vai para o navegador por causa daqui.
 */

const GLYPHS = ["♪", "♫", "♩", "♬", "♭", "♮", "♯"] as const;

/** Mulberry32: PRNG de 32 bits, determinístico a partir da semente. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Quanto mais perto, maior e mais rápido. `depth` alimenta --d, que o CSS
 * multiplica pela distância que a camada percorre ao longo da rolagem.
 */
const DEPTHS = [
  { depth: 0.3, count: 5, min: 15, max: 22 },
  { depth: 0.62, count: 4, min: 25, max: 35 },
  { depth: 1, count: 4, min: 38, max: 56 },
];

// A semente é o CNPJ do estúdio — um número com procedência em vez de um
// literal qualquer. Trocá-lo redesenha a chuva inteira.
const roll = seeded(20049762);

const LAYERS = DEPTHS.map(({ depth, count, min, max }) => ({
  depth,
  notes: Array.from({ length: count }, (_, i) => ({
    key: `${depth}-${i}`,
    glyph: GLYPHS[Math.floor(roll() * GLYPHS.length)],
    // Fora das bordas exatas, para nenhum glifo nascer colado no canto
    x: `${(4 + roll() * 92).toFixed(1)}%`,
    // Concentrados na metade de baixo: é de lá que eles sobem
    y: `${(30 + roll() * 74).toFixed(1)}%`,
    size: `${(min + roll() * (max - min)).toFixed(0)}px`,
    // Atraso negativo: o balanço já começa no meio, sem partida sincronizada
    delay: `${-(roll() * 9).toFixed(2)}s`,
    sway: `${(7 + roll() * 6).toFixed(1)}s`,
  })),
}));

export default function NoteRain() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {LAYERS.map(({ depth, notes }) => (
        <div
          key={depth}
          className="lt-rain-depth"
          style={{ "--d": depth } as React.CSSProperties}
        >
          {notes.map((note) => (
            <span
              key={note.key}
              className="lt-note"
              style={
                {
                  "--x": note.x,
                  "--y": note.y,
                  "--sz": note.size,
                  "--delay": note.delay,
                  "--sway": note.sway,
                } as React.CSSProperties
              }
            >
              {note.glyph}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

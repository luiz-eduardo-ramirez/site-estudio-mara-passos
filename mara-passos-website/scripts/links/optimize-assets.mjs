/**
 * Gera as imagens da página /links a partir dos originais que já estão em
 * public/ — não depende de baixar nada nem de nenhuma pasta externa.
 *
 *   npm i -D sharp                        (o site não traz sharp por padrão)
 *   node scripts/links/optimize-assets.mjs
 *
 * É idempotente: rodar de novo apenas recria os mesmos arquivos.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// fileURLToPath resolve o %20 de caminhos com espaço (ex.: C:\Users\Luiz Eduardo)
const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const PUB = `${ROOT}public/`;
const OUT = `${PUB}links/`;
const TOOLS = `${ROOT}scripts/links/`;

await mkdir(`${OUT}cards`, { recursive: true });

/*
 * Emblema: recorta do logo apenas o "M" de teclas de piano, sem os wordmarks —
 * o cabeçalho compõe o nome em Playfair, e repetir o wordmark ao lado do
 * emblema ficaria redundante.
 *
 * Medido no original 1072x1144: o M ocupa exatamente x:199-892, y:155-848. O
 * respiro de 24px é o máximo que cabe sem tocar "Estúdio musical e cultural"
 * (termina em y≈125) nem "Mara Passos" (começa em y≈900).
 */
const M = { left: 199, top: 155, side: 693 };
const PAD = 24;
const emblem = () =>
  sharp(`${PUB}logo.webp`).extract({
    left: M.left - PAD,
    top: M.top - PAD,
    width: M.side + PAD * 2,
    height: M.side + PAD * 2,
  });

await emblem().resize(320, 320).webp({ quality: 92 }).toFile(`${OUT}emblem.webp`);

// O Satori não decodifica WebP: o preview social precisa deste PNG
await emblem().resize(220, 220).png().toFile(`${TOOLS}emblem-og.png`);

/*
 * Miniaturas quadradas 320x320 — cobrem 3x do tamanho exibido (~88px).
 *
 * O hero-bg.webp do site não serve aqui: apesar do alt prometer alunos, é o
 * próprio logo sobre madeira, e duplicaria o emblema do cabeçalho. A sala de
 * instrumentos comunica melhor "cursos e professores".
 */
const thumbs = [
  ["spaces/instrumentos.webp", "cards/cursos.webp", "attention"],
  ["images/portal.webp", "cards/portal.webp", "centre"],
  ["spaces/fachada.webp", "cards/fachada.webp", "attention"],
];

for (const [src, dest, position] of thumbs) {
  await sharp(`${PUB}${src}`)
    .resize(320, 320, { fit: "cover", position })
    .webp({ quality: 80 })
    .toFile(`${OUT}${dest}`);
}

console.log("Imagens da página /links geradas em public/links/");

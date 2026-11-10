/*
 * Gera as imagens Open Graph (1200×630 JPG) das páginas de curso a partir das
 * fotos de /public/images. Uso, na pasta mara-passos-website:
 *
 *   node scripts/og/generate-og-courses.mjs            # todos os cursos
 *   node scripts/og/generate-og-courses.mjs aulas-de-baixo
 *
 * `recorte` é a região (em pixels da foto original: top, height e, opcional,
 * left e width) que vira o enquadramento 1,9:1; sem ele, usa o corte
 * automático por "atenção". A razão width:height deve ficar perto de 1,9.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const cursos = {
  "aulas-de-baixo": { foto: "baixo.webp", recorte: { top: 280, height: 1086 } },
  // O recorte termina acima da marca d'água no canto inferior direito da foto.
  // Idem: o recorte fica acima da marca d'água no canto inferior direito.
  // Foto menor (1061 px de largura): o recorte sobe um pouco para 1200 px.
  // Foto de 992 px de largura: ampliada para 1200 px (fica um pouco macia).
  // Mesma foto da Musicalização para Adultos, mas só o quadro com as figuras rítmicas
  // (sem o rosto e sem o texto gravado), para a OG não repetir a outra página.
  "aulas-de-teoria-musical": { foto: "teoria.webp", recorte: { left: 540, top: 430, width: 1516, height: 796 } },
  "aulas-de-musicalizacao-infantil": { foto: "musicalizacao-infantil.webp", recorte: { top: 70, height: 521 } },
  // A foto traz o texto "Música como forma de expressão" gravado; o recorte o mantém.
  "aulas-de-musicalizacao-para-adultos": { foto: "musicalizacao-adulto.webp", recorte: { top: 50, height: 1079 } },
  "aulas-de-flauta-doce": { foto: "flauta-doce.webp", recorte: { top: 440, height: 1104 } },
  // Foto de 1053 px de largura: ampliada um pouco para 1200 px.
  "aulas-de-flauta-transversal": { foto: "flauta-transversal.webp", recorte: { top: 250, height: 553 } },
  "aulas-de-saxofone": { foto: "saxofone.webp", recorte: { top: 105, height: 557 } },
  "aulas-de-pandeiro": { foto: "pandeiro.webp", recorte: { top: 400, height: 1058 } },
  "aulas-de-canto": { foto: "canto.webp", recorte: { top: 560, height: 991 } },
  "aulas-de-teclado": { foto: "teclado.webp", recorte: { top: 540, height: 1076 } },
  "aulas-de-ukulele": { foto: "ukelele.webp", recorte: { top: 400, height: 1104 } },
  "aulas-de-guitarra": { foto: "guitarra.webp", recorte: { top: 153, height: 1243 } },
};

const filtro = process.argv.slice(2);

for (const [slug, { foto, recorte }] of Object.entries(cursos)) {
  if (filtro.length && !filtro.includes(slug)) continue;

  const origem = path.join(raiz, "public/images", foto);
  const destino = path.join(raiz, "public/og", `${slug}.jpg`);

  let img = sharp(origem);
  if (recorte) {
    const { width } = await img.metadata();
    // `left` e `width` são opcionais: sem eles, o recorte pega a largura toda.
    img = img.extract({
      left: recorte.left ?? 0,
      top: recorte.top,
      width: recorte.width ?? width,
      height: recorte.height,
    });
  }
  const info = await img
    .resize(1200, 630, { fit: "cover", position: recorte ? "centre" : "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destino);

  console.log(`${slug}.jpg  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}

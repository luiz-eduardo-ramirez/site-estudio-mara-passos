import fs from 'node:fs';
import path from 'node:path';

export type ImageSize = { width: number; height: number };

/**
 * Lê as dimensões de um WebP em public/ direto do cabeçalho do arquivo.
 * Roda só em tempo de build (as páginas de notícia são estáticas), então evita
 * hardcodar proporção na página e mantém a moldura colada na imagem real.
 * Retorna null se o formato não for reconhecido — quem chama decide o fallback.
 */
export function getPublicImageSize(publicPath: string): ImageSize | null {
  try {
    const arquivo = path.join(process.cwd(), 'public', publicPath.replace(/^\/+/, ''));
    return lerWebp(fs.readFileSync(arquivo));
  } catch {
    return null;
  }
}

function lerWebp(buffer: Buffer): ImageSize | null {
  if (buffer.length < 30) return null;
  if (buffer.toString('ascii', 0, 4) !== 'RIFF') return null;
  if (buffer.toString('ascii', 8, 12) !== 'WEBP') return null;

  const formato = buffer.toString('ascii', 12, 16);

  // Lossy: as dimensões vêm logo depois do sync code 0x9D012A.
  if (formato === 'VP8 ') {
    const sync = buffer.indexOf(Buffer.from([0x9d, 0x01, 0x2a]), 20);
    if (sync === -1 || sync + 7 > buffer.length) return null;
    return {
      width: buffer.readUInt16LE(sync + 3) & 0x3fff,
      height: buffer.readUInt16LE(sync + 5) & 0x3fff,
    };
  }

  // Lossless: 14 bits para cada dimensão, empacotados a partir do byte 21.
  if (formato === 'VP8L') {
    if (buffer[20] !== 0x2f) return null;
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }

  // Estendido (com alpha/animação): dimensões do canvas em 24 bits.
  if (formato === 'VP8X') {
    return {
      width: buffer.readUIntLE(24, 3) + 1,
      height: buffer.readUIntLE(27, 3) + 1,
    };
  }

  return null;
}

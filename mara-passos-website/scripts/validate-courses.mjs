/*
 * Confere as páginas de curso (src/app/<slug>/data.ts) contra as regras do
 * projeto. Uso, na pasta mara-passos-website:
 *
 *   node scripts/validate-courses.mjs
 *
 * Lê os arquivos como texto (sem executar TypeScript) e sai com código 1 se
 * achar qualquer violação. Checa, por curso: slug igual à pasta; título até 60
 * e descrição até 160 caracteres; título e descrição únicos; imagens (OG e
 * herói) existentes; FAQ com 6+ perguntas; `instrumento` igual ao nome em
 * instrumentsList.ts; ids de professores existentes em teachersList.ts; entrada
 * no sitemap. E, no sentido inverso: todo curso de instrumentsList.ts com
 * `slug` tem pasta e página.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ler = (p) => fs.readFileSync(path.join(raiz, p), "utf8");
const existe = (p) => fs.existsSync(path.join(raiz, p));

const erros = [];
const erro = (curso, msg) => erros.push(`${curso}: ${msg}`);

const instrumentos = ler("src/data/instrumentsList.ts");
const nomes = new Map(
  [...instrumentos.matchAll(/nome:\s*"([^"]+)"(?:,\s*categoria:\s*"[^"]*")?(?:,\s*slug:\s*"([^"]+)")?/g)].map((m) => [m[1], m[2] ?? null]),
);
const idsProfessores = new Set([...ler("src/data/teachersList.ts").matchAll(/\bid:\s*(\d+)/g)].map((m) => Number(m[1])));
const sitemap = ler("src/app/sitemap.ts");

const pastas = fs
  .readdirSync(path.join(raiz, "src/app"), { withFileTypes: true })
  .filter((d) => d.isDirectory() && existe(`src/app/${d.name}/data.ts`) && ler(`src/app/${d.name}/data.ts`).includes("CourseConfig"))
  .map((d) => d.name);

const titulos = new Map();
const descricoes = new Map();

for (const pasta of pastas) {
  const t = ler(`src/app/${pasta}/data.ts`);
  const campo = (re) => t.match(re)?.[1];
  const slug = campo(/slug:\s*"([^"]+)"/);
  const instrumento = campo(/instrumento:\s*"([^"]+)"/);
  const titulo = campo(/titulo:\s*"([^"]+)"/);
  const descricao = campo(/descricao:\s*\n?\s*"([^"]+)"/);
  const og = campo(/ogImagem:\s*"([^"]+)"/);
  const heroImg = campo(/imagem:\s*"([^"]+)"/);

  if (slug !== pasta) erro(pasta, `slug "${slug}" diferente da pasta`);
  if (!titulo) erro(pasta, "sem seo.titulo");
  else {
    if (titulo.length > 60) erro(pasta, `título com ${titulo.length} caracteres (máx. 60)`);
    if (!titulo.endsWith("| Estúdio Mara Passos")) erro(pasta, "título não termina em '| Estúdio Mara Passos'");
    if (titulos.has(titulo)) erro(pasta, `título repetido (também em ${titulos.get(titulo)})`);
    titulos.set(titulo, pasta);
  }
  if (!descricao) erro(pasta, "sem seo.descricao");
  else {
    if (descricao.length > 160) erro(pasta, `descrição com ${descricao.length} caracteres (máx. 160)`);
    if (descricoes.has(descricao)) erro(pasta, `descrição repetida (também em ${descricoes.get(descricao)})`);
    descricoes.set(descricao, pasta);
  }
  if (!og || !existe(`public${og}`)) erro(pasta, `imagem OG ausente (${og})`);
  if (!heroImg || !existe(`public${heroImg}`)) erro(pasta, `imagem do herói ausente (${heroImg})`);

  const perguntas = (t.match(/pergunta:/g) ?? []).length;
  if (perguntas < 6) erro(pasta, `FAQ com ${perguntas} perguntas (mín. 6)`);

  if (!nomes.has(instrumento)) erro(pasta, `instrumento "${instrumento}" não existe em instrumentsList.ts`);
  else if (nomes.get(instrumento) !== `/${slug}`) erro(pasta, `card "${instrumento}" não aponta para /${slug}`);

  for (const [, id] of t.matchAll(/professores:\s*\[([^\]]*)\]/g).next().value?.[1].matchAll(/id:\s*(\d+)/g) ?? []) {
    if (!idsProfessores.has(Number(id))) erro(pasta, `professor id ${id} não existe em teachersList.ts`);
  }

  if (!sitemap.includes(`./${pasta}/data`)) erro(pasta, "fora do sitemap.ts");
  for (const arq of ["layout.tsx", "page.tsx"]) if (!existe(`src/app/${pasta}/${arq}`)) erro(pasta, `falta ${arq}`);
}

for (const [nome, slug] of nomes) {
  if (slug && !pastas.includes(slug.slice(1))) erro(nome, `card aponta para ${slug}, mas não há página`);
}

console.log(`${pastas.length} páginas de curso conferidas.`);
if (erros.length) {
  console.log(`\n${erros.length} problema(s):`);
  for (const e of erros) console.log(`- ${e}`);
  process.exit(1);
}
console.log("Tudo certo.");

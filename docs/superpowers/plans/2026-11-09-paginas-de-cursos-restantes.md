# Páginas de cursos restantes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar as 14 páginas de curso que ainda não existem, no mesmo molde de `/aulas-de-violao`, e deixar sitemap, cards de `/cursos`, rodapé e `llm.txt` apontando para todas.

**Architecture:** Nada de estrutura nova: cada curso é uma pasta em `src/app/<slug>/` com `data.ts` (um `CourseConfig`), `layout.tsx` (`buildCourseMetadata`) e `page.tsx` (`<CoursePage curso={…} />`), exatamente como `aulas-de-violao`. Uma tarefa prévia ajusta o molde para cursos sem professor cadastrado e cria um validador de configs; depois as páginas entram em 4 lotes, cada um fechando com sitemap + `slug` em `instrumentsList.ts`.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, lucide-react, sharp (já instalado, para as imagens OG), `npx tsx` (sob demanda, sem instalar) para o validador.

**Spec:** não há spec; o molde é `mara-passos-website/src/app/aulas-de-violao/` + `src/components/course/{types,CoursePage,metadata}.ts(x)`. Referência de formato do plano anterior: `docs/superpowers/plans/2026-11-09-scroll-reveal-cinematico.md`.

**Verificação:** o projeto não tem framework de testes (não criar um). Cada tarefa é verificada com o validador `scripts/validate-courses.ts`, `npx tsc --noEmit`, `npm run lint` (na pasta `mara-passos-website`) e, ao fim de cada lote, `preview_start` (`mara-passos-dev`, porta 3000) com leitura de console + screenshot de uma página do lote.

## Global Constraints

- Caminhos relativos a `mara-passos-website/`. Comentários e nomes em português, como no código existente.
- **Conteúdo só do que o site já afirma**: descrição em `src/data/instrumentsList.ts`, bios/especialidades em `src/data/teachersList.ts`, idades em `src/components/sections/faqData.ts` (musicalização desde 6 meses; Piano/Bateria ~5 anos; Guitarra, Violão e Canto a partir de 7 anos), regras da aula experimental (30–45 min, gratuita, remarcar com 24 h de antecedência). Nada de preço, duração de curso, certificado ou método inventado. Onde o site não diz a idade, o FAQ diz que o professor orienta na aula experimental.
- Endereço/telefone sempre via `ENDERECO` e `TELEFONE_EXIBIDO` de `src/data/studio.ts`.
- `seo.titulo` ≤ 60 caracteres e termina em `| Estúdio Mara Passos`; `seo.descricao` ≤ 160 caracteres; `ogImagem` = `/og/<slug>.jpg` (1200×630, JPG).
- Hero usa `/images/<instrumento>.webp` já existente; vídeo de fundo é o padrão `/hero-bg.mp4` (não definir `hero.video`).
- Slug é a pasta da rota e o `slug` do `CourseConfig`; o link em `instrumentsList.ts` é `"/" + slug`.
- Tailwind v4: não usar a classe `container` para limitar largura.
- Sitemap: cada página nova entra em `cursos` com `atualizadoEm: '2026-11-09'` (data honesta, mesma do commit); `/cursos` também ganha `2026-11-09`.
- Commitar só os arquivos de cada tarefa; mensagens em português, terminando com a linha `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.

## Decisões que o plano assume (corrigir antes de executar, se discordar)

| Curso | Slug | Professores (`teachersList.id`) |
|---|---|---|
| Baixo | `aulas-de-baixo` | 5 Rodrigo |
| Guitarra | `aulas-de-guitarra` | 5 Rodrigo, 3 Rafael |
| Ukelelê | `aulas-de-ukulele` (grafia buscada no Google; `instrumento`/H1 seguem "Ukelelê" do site) | 5 Rodrigo |
| Teclado | `aulas-de-teclado` | 6 Reinaldo, 7 Márcia, 1 Mara |
| Canto | `aulas-de-canto` | 4 Vanessa |
| Pandeiro | `aulas-de-pandeiro` | 3 Rafael |
| Saxofone | `aulas-de-saxofone` | nenhum |
| Flauta Doce | `aulas-de-flauta-doce` | 1 Mara, 7 Márcia |
| Flauta Transversal | `aulas-de-flauta-transversal` | 1 Mara, 7 Márcia |
| Musicalização Infantil | `aulas-de-musicalizacao-infantil` | 1 Mara, 7 Márcia |
| Musicalização Adultos | `aulas-de-musicalizacao-para-adultos` | 1 Mara, 7 Márcia |
| Teoria Musical | `aulas-de-teoria-musical` | 1 Mara |
| Música de Câmara | `musica-de-camara` | 1 Mara, 7 Márcia |
| Prática de Conjunto | `pratica-de-conjunto` | 5 Rodrigo |

- **Professores definidos pelo estúdio** (tabela acima; atualizada em 2026-11-10). Só o **Saxofone** segue sem professor (decisão do estúdio: deixar sem nenhum). Música de Câmara passou a ter Mara e Márcia. Em vez de inventar bio, o molde aceita `equipe` opcional (já implementado): sem ela, a seção Professores não aparece e o JSON-LD omite `instructor`. Basta indicar o professor depois e acrescentar `equipe`.
- **Fonte única:** `src/data/teachersList.ts` foi alinhado à tabela em 2026-11-10 (as novas especialidades entram ao fim de cada lista; o cartão da home mostra só as 3 primeiras, então a home não muda). Amanda (id 2) não foi alterada.
- **Amanda (id 2)** deixou de aparecer nas flautas e na Musicalização Infantil, conforme a tabela.
- Nos cursos de grupo/teoria, o `instrumento` do formulário é o nome do curso (valor do `<select>` do `Contact`); confirmar na Task 1 que o `<select>` aceita todos os 14 nomes.

## Review Focus

- Curso sem `equipe`: a página não pode quebrar nem deixar seção vazia/âncora morta (`#professores`) no menu da página; JSON-LD sem `instructor: []`.
- `instrumento` que não existe no `<select>` do formulário de contato: o lead chegaria com o campo em branco/errado; esperado: todo `instrumento` é uma opção válida.
- Slug duplicado, pasta ≠ slug, OG inexistente ou professor `id` inexistente: página 404, sitemap com URL morta ou card sem foto; esperado: o validador falha antes do build.
- Texto que promete idade/estilo não afirmado pelo site (ex.: idade mínima de Saxofone, Ukelelê): esperado: FAQ remete à aula experimental.
- Título/descrição acima do limite ou duplicados entre páginas (canibalização no Google): esperado: validador acusa.

---

### Task 1: Molde aceita curso sem equipe + validador de configs

**Files:**
- Modify: `src/components/course/types.ts` (`equipe` passa a `equipe?:`)
- Modify: `src/components/course/CoursePage.tsx` (bloco `<Teachers …/>` ~linha 326, `montarJsonLd`, e qualquer link/âncora para `#professores`)
- Create: `scripts/validate-courses.ts`
- Test: o próprio `scripts/validate-courses.ts` (rodado com `npx tsx scripts/validate-courses.ts`)

**Interfaces:**
- Consumes: `CourseConfig` (`types.ts`), `teachersList` (`src/data/teachersList.ts`), `instrumentsList` (`src/data/instrumentsList.ts`).
- Produces: `CourseConfig.equipe?: {...}` (opcional); `validate-courses.ts` — lê `src/app/*/data.ts` que exporte um `CourseConfig` (descoberta por glob de pastas com `data.ts` + `layout.tsx`), imprime uma linha por violação e sai com código 1 se houver alguma.

- [ ] **Step 1: Escrever o validador (falha primeiro)** com as checagens: `slug` == nome da pasta; slugs únicos; `seo.titulo` ≤ 60 e termina em `| Estúdio Mara Passos`; `seo.descricao` ≤ 160; títulos e descrições únicos entre páginas; `existsSync("public"+ogImagem)`; `existsSync("public"+hero.imagem)`; todo `equipe.professores[].id` existe em `teachersList`; `faq.length >= 6`; `galeria.length >= 4`; `instrumento` ∈ opções do `<select>` do `Contact` (exportar essa lista de `Contact.tsx` se hoje for inline, p.ex. `export const INSTRUMENTOS_FORMULARIO`); para cada `instrumentsList` com `slug`, existe a pasta correspondente.
- [ ] **Step 2: Rodar** `npx tsx scripts/validate-courses.ts` — esperado: passa para as 4 páginas atuais (piano, bateria, violino, violão); se acusar algo, corrigir a página existente só se for erro real.
- [ ] **Step 3: Tornar `equipe` opcional** em `types.ts`; em `CoursePage.tsx` renderizar `<Teachers>` só quando `curso.equipe` existe, omitir `hasCourseInstance.instructor` quando não há professores, e esconder qualquer item de navegação interna que aponte para `#professores`.
- [ ] **Step 4: Verificar** `npx tsc --noEmit` e `npm run lint`; abrir `/aulas-de-violao` no preview e conferir que continua idêntica (seção Professores presente, console limpo).
- [ ] **Step 5: Commit** — `feat: molde de curso aceita equipe opcional e validador de configs`.

---

### Task 2: Imagens OG dos 14 cursos

**Files:**
- Create: `scripts/og/generate-og-courses.mjs`
- Create: `public/og/<slug>.jpg` × 14

**Interfaces:**
- Consumes: `/images/<instrumento>.webp` (mesmo arquivo do hero de cada curso); tabela de slugs acima.
- Produces: `public/og/<slug>.jpg` 1200×630 para cada slug da tabela (Task 3–6 referenciam em `seo.ogImagem`).

- [ ] **Step 1: Olhar `public/og/aulas-de-violao.jpg`** (Read) e replicar o enquadramento/qualidade (JPG, ~100 KB).
- [ ] **Step 2: Implementar** `generate-og-courses.mjs`: mapa `slug → arquivo da imagem` e `sharp(...).resize(1200, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 82, mozjpeg: true })`. Para Musicalização Adultos/Infantil, Teoria, Câmara e Prática use as respectivas imagens em `public/images/`.
- [ ] **Step 3: Rodar** `node scripts/og/generate-og-courses.mjs`; esperado: 14 arquivos criados, cada um 1200×630 e < 200 KB (`node -e` com `sharp().metadata()` ou `ls -l`).
- [ ] **Step 4: Olhar 3 amostras** (Read nas imagens) para garantir que o assunto da foto não foi cortado; ajustar `position` por curso se preciso.
- [ ] **Step 5: Commit** — `feat: imagens OG dos cursos restantes`.

---

### Task 3: Lote A — cordas: Baixo, Guitarra, Ukelelê

**Files:**
- Create: `src/app/aulas-de-baixo/{data.ts,layout.tsx,page.tsx}`, idem `aulas-de-guitarra`, `aulas-de-ukulele`
- Modify: `src/app/sitemap.ts` (3 imports + 3 linhas em `cursos`), `src/data/instrumentsList.ts` (campo `slug` em Baixo, Guitarra, Ukelelê)

**Interfaces:**
- Consumes: `CourseConfig`, `buildCourseMetadata`, `CoursePage` (como em `aulas-de-violao`); exports `baixo`, `guitarra`, `ukulele`.
- Produces: rotas `/aulas-de-baixo`, `/aulas-de-guitarra`, `/aulas-de-ukulele`.

- [ ] **Step 1: Criar `layout.tsx` e `page.tsx` de cada pasta** copiando os de violão com troca do export/import (`export const metadata = buildCourseMetadata(baixo)`; nomes de componente `BaixoLayout`/`AulasDeBaixo` etc.).
- [ ] **Step 2: Escrever cada `data.ts`** seguindo a ordem de seções e o estilo de `aulas-de-violao/data.ts`, com os valores abaixo:
  - **Baixo** (`instrumento: "Baixo"`): conteúdo de `instrumentsList` ("coração do ritmo", grooves, pizzicato e slap, função do baixo na música); professor Rodrigo (id 5); hero `/images/baixo.webp`; diferenciais: formação do Rodrigo (Licenciatura FPA, guitarra em São Caetano, ensino desde 2007), estilos, evolução sem pressão; FAQ de idade **sem** afirmar idade mínima (o site só cita Guitarra/Violão/Canto) → "o professor orienta na aula experimental"; `equipe.professores: [{ id: 5 }]`.
  - **Guitarra** (`"Guitarra"`): riffs, solos, palhetada, bends, harmonia aplicada, timbrar; equipe `[{ id: 5 }, { id: 3 }]` (Rodrigo e Rafael), cita Jazz/Heavy Metal da bio do Rodrigo; FAQ de idade "a partir dos 7 anos" (faqData); hero `/images/guitarra.webp`.
  - **Ukelelê** (`"Ukelelê"`, slug `aulas-de-ukulele`, keywords incluem "aulas de ukulele na Lapa" e "ukelelê"): acordes práticos, batidas variadas, tocar músicas favoritas em poucas semanas; equipe `[{ id: 5 }]` (Rodrigo); FAQ de idade → aula experimental; hero `/images/ukelele.webp`.
  - Todos: `faq` com 9 perguntas no formato do violão (instrumento próprio, do zero, estilos, primeiras aulas, idade, aula experimental, remarcar, individual, onde/como agendar); `galeria` = as 6 fotos de `/spaces/` do violão (trocar `instrumentos.webp` por foto coerente quando fizer sentido); `diferenciais.midia` = imagem de `/spaces/`.
- [ ] **Step 3: Registrar** as três em `sitemap.ts` (`atualizadoEm: '2026-11-09'`), atualizar `/cursos` para `'2026-11-09'` (já é) e acrescentar `slug: "/aulas-de-…"` nas três entradas de `instrumentsList.ts`.
- [ ] **Step 4: Rodar** `npx tsx scripts/validate-courses.ts`, `npx tsc --noEmit`, `npm run lint` — esperado: sem violações.
- [ ] **Step 5: Preview**: `preview_start`, abrir `/aulas-de-ukulele` e `/aulas-de-guitarra`; `read_console_messages` sem erros; conferir que `/cursos` mostra o botão de página nos 3 cards; screenshot de uma.
- [ ] **Step 6: Commit** — `feat: paginas de aulas de baixo, guitarra e ukulele`.

---

### Task 4: Lote B — teclas, voz e percussão/sopro solo: Teclado, Canto, Pandeiro, Saxofone

**Files:**
- Create: pastas `aulas-de-teclado`, `aulas-de-canto`, `aulas-de-pandeiro`, `aulas-de-saxofone` (3 arquivos cada)
- Modify: `src/app/sitemap.ts`, `src/data/instrumentsList.ts`

**Interfaces:**
- Consumes: igual à Task 3. Produces: exports `teclado`, `canto`, `pandeiro`, `saxofone`.

- [ ] **Step 1: `layout.tsx`/`page.tsx`** como na Task 3.
- [ ] **Step 2: `data.ts`** de cada um:
  - **Teclado**: timbres, ritmos automáticos, arranjos completos com as duas mãos, foco em música popular; equipe `[{ id: 6 }, { id: 7 }, { id: 1 }]` (Reinaldo, Márcia e Mara; Reinaldo: formação Drum Tech Londres, piano erudito/popular); hero `/images/teclado.webp`; idade → aula experimental.
  - **Canto**: respiração, afinação, impostação, repertório, saúde vocal; Vanessa (id 4: Canto Lírico FMU/FAAM, Coral Paulistano, método Full-Voice); idade "a partir dos 7 anos" (faqData); hero `/images/canto.webp`; `diferenciais` pode usar `/spaces/` de sala interna.
  - **Pandeiro**: levadas de samba e choro, ritmos brasileiros passo a passo; Rafael (id 3: pandeiro no SESC Vila Mariana e Coletivo S Pandeiro, escolas de samba); hero `/images/pandeiro.webp`.
  - **Saxofone**: embocadura, expressividade, leitura de partitura, introdução à improvisação em jazz e música popular; **sem `equipe`**; hero `/images/saxofone.webp`.
  - Mesmo formato de FAQ/galeria/passos da Task 3; títulos de `faqTitulo`/`localizacao` no padrão "… na Lapa, em São Paulo".
- [ ] **Step 3: Registrar** em `sitemap.ts` e `instrumentsList.ts` (`slug` nas quatro entradas).
- [ ] **Step 4: Validar** (`validate-courses`, `tsc`, `lint`).
- [ ] **Step 5: Preview** de `/aulas-de-saxofone` (sem equipe) e `/aulas-de-canto`; console limpo; screenshot.
- [ ] **Step 6: Commit** — `feat: paginas de aulas de teclado, canto, pandeiro e saxofone`.

---

### Task 5: Lote C — flautas: Flauta Doce e Flauta Transversal

**Files:**
- Create: `src/app/aulas-de-flauta-doce/*`, `src/app/aulas-de-flauta-transversal/*`
- Modify: `src/app/sitemap.ts`, `src/data/instrumentsList.ts`

**Interfaces:** exports `flautaDoce`, `flautaTransversal`.

- [ ] **Step 1: `layout.tsx`/`page.tsx`.**
- [ ] **Step 2: `data.ts`:**
  - **Flauta Doce** (`instrumento: "Flauta Doce"`): primeira iniciação melódica, sopro suave, leitura de notas; equipe `[{ id: 1 }, { id: 7 }]` (Mara e Márcia citam o curso Sopro Novo de Flautas Doce da Yamaha — usar isso nos diferenciais); idade → aula experimental.
  - **Flauta Transversal**: embocadura, respiração diafragmática, repertório erudito ao popular; equipe `[{ id: 1 }, { id: 7 }]` (Mara e Márcia); hero `/images/flauta-transversal.webp`.
- [ ] **Step 3: Registrar** em sitemap e `instrumentsList.ts`.
- [ ] **Step 4: Validar.**
- [ ] **Step 5: Preview** das duas; console limpo.
- [ ] **Step 6: Commit** — `feat: paginas de aulas de flauta doce e transversal`.

---

### Task 6: Lote D — musicalização, teoria e grupos

**Files:**
- Create: `src/app/aulas-de-musicalizacao-infantil/*`, `aulas-de-musicalizacao-para-adultos/*`, `aulas-de-teoria-musical/*`, `musica-de-camara/*`, `pratica-de-conjunto/*`
- Modify: `src/app/sitemap.ts`, `src/data/instrumentsList.ts`

**Interfaces:** exports `musicalizacaoInfantil`, `musicalizacaoAdultos`, `teoriaMusical`, `musicaDeCamara`, `praticaDeConjunto`.

- [ ] **Step 1: `layout.tsx`/`page.tsx`.**
- [ ] **Step 2: `data.ts`** (aqui "instrumento" é o nome do curso; usar o valor exato do `<select>`; `schema.prerequisitos` "Nenhum"; hero fatos sem "instrumento", p.ex. "Para todas as idades"):
  - **Musicalização Infantil**: jogos, histórias e percussão, cognição e criatividade, **bebês a partir de 6 meses** (faqData); equipe `[1, 7]`; `filosofia` reaproveita "a música é para todas as idades".
  - **Musicalização Adultos**: "nunca é tarde", percepção rítmica e melódica, vivências práticas sem pressão do desempenho perfeito; equipe `[1, 7]` (Mara e Márcia).
  - **Teoria Musical**: partitura sem mistério, harmonia, percepção, escalas, ditados musicais; equipe `[1]` (Mara).
  - **Música de Câmara**: tocar junto, peças clássicas em pequenos grupos, escuta ativa; **sem `equipe`**; FAQ explica que é prática em grupo e que o professor orienta em qual turma entrar na aula experimental (não afirmar pré-requisito de nível).
  - **Prática de Conjunto**: formar banda, ouvir os outros instrumentos, manter o ritmo em grupo, dinâmica de ensaio real; equipe `[5]` (Rodrigo); mesma ressalva de FAQ.
  - FAQ "individuais ou em grupo?" muda nos cursos de grupo: responder só o que o site afirma (Câmara/Prática = em grupo; Infantil/Adultos/Teoria → confirmar formato na aula experimental). **Marcar no commit/PR** que o formato (turma × individual) dos cursos de grupo precisa ser confirmado pela Mara antes de publicar.
- [ ] **Step 3: Registrar** em sitemap e `instrumentsList.ts`.
- [ ] **Step 4: Validar.**
- [ ] **Step 5: Preview** de uma página com equipe (Infantil) e uma sem (Prática de Conjunto); console limpo.
- [ ] **Step 6: Commit** — `feat: paginas de musicalizacao, teoria, musica de camara e pratica de conjunto`.

---

### Task 7: Rodapé, llm.txt, sitemap final e build

**Files:**
- Modify: `src/components/layout/Footer.tsx` (coluna "Links Úteis", linhas 54–57)
- Modify: `public/llm.txt` (seção "Cursos e Instrumentos Oferecidos")
- Modify: `src/app/sitemap.ts` (conferência final)

**Interfaces:** Consumes: todos os `slug` das Tasks 3–6 (via `instrumentsList.ts`).

- [ ] **Step 1: Rodapé**: 18 links soltos estouram a coluna. Trocar os 4 links de curso por um único "Todos os cursos" (`/cursos`) e uma coluna/lista "Aulas" gerada de `instrumentsList.filter(i => i.slug)` (ordem alfabética), em duas colunas no `md+`; manter o estilo dos links atuais.
- [ ] **Step 2: `llm.txt`**: acrescentar a URL `https://estudiomusicalmarapassos.com.br/<slug>` ao lado de cada instrumento que agora tem página (incluindo piano, bateria, violino e violão, que hoje não têm).
- [ ] **Step 3: Sitemap**: conferir que `cursos` tem 18 entradas e nenhuma duplicada; `curl http://localhost:3000/sitemap.xml` (dev) lista as 18 URLs de curso + home + 4 páginas + notícias, todas com `lastmod`.
- [ ] **Step 4: Verificação final**: `npx tsx scripts/validate-courses.ts`, `npx tsc --noEmit`, `npm run lint`, `npm run build` (esperado: 18 rotas `/aulas-de-*`/curso estáticas, sem erro). Abrir 1 página por lote em 375 px e 1280 px (`resize_window`), console limpo.
- [ ] **Step 5: Commit** — `feat: rodape, llm.txt e sitemap com todas as paginas de curso`.

---

## Self-Review

- **Cobertura:** os 14 instrumentos de `instrumentsList.ts` sem `slug` têm tarefa (3: 3, 4: 4, 5: 2, 6: 5); sitemap em cada lote + conferência final; molde para curso sem equipe (Task 1).
- **Consistência:** exports e slugs conferem com a tabela de decisões; `equipe` opcional definido na Task 1 e usado nas Tasks 3–6.
- **Proporção:** o plano evita reproduzir os `data.ts` (≈200 linhas cada); o implementador segue o molde do violão e só recebe do plano os fatos específicos de cada curso.
- **Risco principal:** textos de cursos de grupo/teoria (formato, idade) dependem de confirmação da Mara; o plano manda remeter à aula experimental em vez de afirmar.

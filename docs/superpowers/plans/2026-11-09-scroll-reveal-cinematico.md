# Scroll reveal cinematográfico Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dar a cada seção da home uma entrada cinematográfica própria, com parallax/zoom ligados ao scroll onde fizer sentido.

**Architecture:** Duas camadas. (1) `<Reveal>` (IntersectionObserver + GSAP) ganha variantes de entrada (máscara, texto por linhas, wipe direcional, rotateX, linha desenhada). (2) Um novo `<Parallax>` usa ScrollTrigger com `scrub` só para imagens. As seções dinâmicas chamam um refresh do ScrollTrigger ao montar.

**Tech Stack:** Next.js 16, React 19, GSAP 3.15 (`gsap`, `gsap/ScrollTrigger`, `gsap/SplitText`, `@gsap/react`), Tailwind v4, Lenis.

**Spec:** `docs/superpowers/specs/2026-11-09-scroll-reveal-cinematico-design.md`

**Verificação:** o projeto não tem framework de testes. Cada tarefa é verificada com `npx tsc --noEmit`, `npm run lint` (na pasta `mara-passos-website`) e inspeção no navegador via `preview_start` (leitura de console + screenshot). Não criar infraestrutura de testes só para isso.

## Global Constraints

- Todo GSAP entra por `src/lib/gsap.ts`; nunca `import ... from "gsap"` direto em componentes.
- Tokens de movimento só em `src/lib/motion.ts`.
- `prefers-reduced-motion: reduce` → nenhum `opacity:0` aplicado, nenhum ScrollTrigger criado (conteúdo nasce visível).
- Estado inicial dentro de `useGSAP` (antes da pintura); sem JS o conteúdo fica visível.
- Parallax e blur desligados em telas `< 768px` (`matchMedia("(max-width: 767px)")`).
- Usar `useGSAP` com `{ scope }` para limpeza no unmount (StrictMode).
- Tailwind v4: não usar a classe `container` para limitar largura (ver memória do projeto); usar `max-w-*` + `mx-auto`.
- Há alterações não commitadas em Spaces, Teachers, StudentPortal, FAQ e outras; **não reverter**, editar por cima delas e commitar só os arquivos tocados por cada tarefa.
- Idioma de comentários e nomes de variáveis: português, como no código existente.
- O site já usa Lenis (interpola o `scrollTop` real): ScrollTrigger funciona sem sincronização extra.

## Review Focus

- Seção `next/dynamic` monta depois e empurra o layout → gatilhos de scrub defasados; esperado: parallax continua alinhado após `ScrollTrigger.refresh()`.
- Âncora (`#agendamentos`, `#instrumentos`) rolando para uma seção cujo reveal ainda não disparou; esperado: seção fica visível ao chegar, sem ficar invisível.
- `prefers-reduced-motion`: esperado conteúdo 100% visível e sem transformações presas.
- Texto dividido por linhas redimensionando a janela; esperado: sem linhas quebradas/cortadas (SplitText com `autoSplit`).
- Navegar para outra rota e voltar (unmount/mount); esperado: sem ScrollTriggers órfãos nem elementos presos com `opacity:0`.

---

### Task 1: Fundação — tokens, plugins e refresh

**Files:**
- Modify: `mara-passos-website/src/lib/motion.ts`
- Modify: `mara-passos-website/src/lib/gsap.ts`

**Interfaces:**
- Produces:
  - `EASE.cine: "expo.out"`, `DUR.cine: 1.1`, `REVEAL.lineStagger: 0.08`, `REVEAL.cardStagger: 0.12` em `motion.ts`.
  - `gsap.ts` exporta `{ gsap, useGSAP, ScrollTrigger, SplitText }` (plugins já registrados) e `refreshScroll(): void` (debounce de ~150ms que chama `ScrollTrigger.refresh()`).
  - `usarMovimentoCompleto(): boolean` — `true` só quando não há reduced-motion **e** a tela é `>= 768px`; seguro para chamar só dentro de `useGSAP`/efeitos.

- [ ] **Step 1:** Em `motion.ts`, acrescentar os tokens acima sem alterar os existentes.
- [ ] **Step 2:** Em `gsap.ts`, importar `gsap/ScrollTrigger` e `gsap/SplitText`, chamar `gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)` e implementar `refreshScroll` e `usarMovimentoCompleto` com os contratos acima. Atualizar o comentário do arquivo (já não é "só núcleo").
- [ ] **Step 3:** `npx tsc --noEmit` e `npm run lint` → sem erros.
- [ ] **Step 4:** Commit: `git add src/lib/motion.ts src/lib/gsap.ts` → `feat: tokens cinematográficos e plugins GSAP`.

### Task 2: Variantes do `<Reveal>`

**Files:**
- Modify: `mara-passos-website/src/components/layout/Reveal.tsx`

**Interfaces:**
- Consumes: `EASE.cine`, `DUR.cine`, `REVEAL.lineStagger`, `SplitText` (Task 1).
- Produces (props novas, todas opcionais, as atuais não mudam):
  - `mask?: boolean` — o alvo sobe (`yPercent: 110 → 0`) de dentro de um wrapper `overflow:hidden`.
  - `lines?: boolean` — divide o texto do elemento em linhas (`SplitText`, `type: "lines"`, `mask: "lines"`, `autoSplit: true`) e as anima em stagger.
  - `clip?: boolean | "left" | "right" | "bottom"` — `true` mantém o wipe atual (da esquerda); strings escolhem a origem do `clip-path`.
  - `rotateX?: number` — rotação 3D inicial (com `transformPerspective: 800`), desfeita na entrada.
  - `line?: boolean` — um filho com `data-reveal-line` anima `scaleX 0 → 1` (origem esquerda).
  - `cine?: boolean` — usa `EASE.cine` e `DUR.cine` em vez dos tokens base.

- [ ] **Step 1:** Implementar as props acima em `Reveal.tsx`, mantendo `IntersectionObserver` como gatilho e a saída antecipada em reduced-motion. Em `lines`, reverter o SplitText no `onComplete`/cleanup (`split.revert()`).
- [ ] **Step 2:** Atualizar o comentário de uso no topo do arquivo com as novas props.
- [ ] **Step 3:** Em uma seção qualquer já existente (ex.: `FAQ`), usar temporariamente `lines`/`mask` no título, rodar `npm run dev` via `preview_start`, rolar e confirmar no navegador que o título entra por linhas sem erro de console; remover o uso temporário.
- [ ] **Step 4:** `npx tsc --noEmit` e `npm run lint` → sem erros.
- [ ] **Step 5:** Commit: `feat: variantes cinematográficas do Reveal`.

### Task 3: `<Parallax>` e refresh de seções dinâmicas

**Files:**
- Create: `mara-passos-website/src/components/layout/Parallax.tsx`
- Modify: `mara-passos-website/src/components/layout/Reveal.tsx` (chamar `refreshScroll()` após o reveal disparar)

**Interfaces:**
- Consumes: `ScrollTrigger`, `usarMovimentoCompleto`, `refreshScroll` (Task 1).
- Produces: `export default function Parallax(props: { children: ReactNode; className?: string; zoom?: number; shift?: number; invert?: boolean }): JSX.Element`
  - Wrapper `overflow-hidden` com um filho interno animado: `scale: zoom → 1` (padrão `zoom = 1.15`) e `yPercent: -shift → shift` (padrão `shift = 8`, sinal invertido com `invert`), `scrub: 1`, gatilho = wrapper (`start: "top bottom"`, `end: "bottom top"`).
  - Sem movimento completo: renderiza apenas os filhos, sem transformações.

- [ ] **Step 1:** Criar `Parallax.tsx` conforme o contrato, usando `useGSAP({ scope })` e `ScrollTrigger` com `invalidateOnRefresh: true`.
- [ ] **Step 2:** No `Reveal`, ao disparar `revelar()`, chamar `refreshScroll()` (as seções dinâmicas mudam a altura da página).
- [ ] **Step 3:** `npx tsc --noEmit` e `npm run lint` → sem erros.
- [ ] **Step 4:** Commit: `feat: componente Parallax com scrub`.

### Task 4: Hero

**Files:**
- Modify: `mara-passos-website/src/components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `Parallax` (Task 3), `Reveal` com `mask`/`cine` (Task 2).

- [ ] **Step 1:** Envolver a imagem de pôster e o vídeo (mesmo wrapper de fundo) em `Parallax` (`zoom 1.15`, `shift 6`); o overlay escuro fica fora.
- [ ] **Step 2:** Trocar `animate-fade-in-up` do bloco de conteúdo por `Reveal` em stagger com `mask cine`: parágrafo e botão sobem de máscara em sequência. **Não dividir o `<h1>`**: ele tem `TypeAnimation` e dividir por linhas quebraria a digitação (decisão do plano); o `h1` entra com a máscara inteira.
- [ ] **Step 3:** Verificar no navegador (desktop e `resize_window` mobile): hero visível, sem salto no LCP, vídeo/pôster com zoom suave. `npx tsc --noEmit`.
- [ ] **Step 4:** Commit: `feat: hero com zoom, parallax e entrada em máscara`.

### Task 5: Notícias e Instrumentos

**Files:**
- Modify: `mara-passos-website/src/components/sections/News.tsx`
- Modify: `mara-passos-website/src/components/sections/Instruments.tsx`
- Modify: `mara-passos-website/src/app/page.tsx` (remover o `ScrollReveal` externo dessas duas seções só se a animação interna passar a cobri-las)

- [ ] **Step 1:** Ler `News.tsx` (timeline já existente nas linhas ~102 e os efeitos de mouse ~162) e `Instruments.tsx` (~54 e ~97). Não quebrar o efeito de mouse nem a pílula ativa.
- [ ] **Step 2 (News):** Cards entram com wipe `clip` horizontal (origem alternada esquerda/direita) em stagger `REVEAL.cardStagger`; imagens internas envolvidas por `Parallax` (`zoom 1.1`, `shift 5`).
- [ ] **Step 3 (Instruments):** A grade (`gsap.from(grid.children…)` já existente) passa a entrar em cascata a partir do centro (`stagger: { each: REVEAL.stagger, from: "center", grid: "auto" }`) com `rotateX: 18`, `y: 40`, `ease: EASE.cine`.
- [ ] **Step 4:** Verificar no navegador rolando até as duas seções; console sem erros. `npx tsc --noEmit`, `npm run lint`.
- [ ] **Step 5:** Commit: `feat: entradas cinematográficas em Notícias e Instrumentos`.

### Task 6: Espaços e Professores

**Files:**
- Modify: `mara-passos-website/src/components/sections/Spaces.tsx`
- Modify: `mara-passos-website/src/components/sections/Teachers.tsx`

- [ ] **Step 1:** Ler os dois arquivos (têm alterações não commitadas e a gaveta de professores com animações próprias em ~209-229; não tocar nelas).
- [ ] **Step 2 (Spaces):** Título com `lines cine`. Cada foto: `Reveal clip` com origem alternada (`left`/`right` por índice par/ímpar) e a imagem dentro em `Parallax` (`zoom 1.2`, `shift 6`).
- [ ] **Step 3 (Teachers):** Título com `lines` + um filho `data-reveal-line` (`line`). Cards em `stagger` com `rotateX` leve (8) e a foto entra com `blur` (blur→nítida) — só em telas `>= 768px`.
- [ ] **Step 4:** Verificar no navegador, incluindo abrir/fechar a gaveta de professores (sem regressão). `npx tsc --noEmit`, `npm run lint`.
- [ ] **Step 5:** Commit: `feat: entradas cinematográficas em Espaços e Professores`.

### Task 7: Portal do Aluno e FAQ

**Files:**
- Modify: `mara-passos-website/src/components/sections/StudentPortal.tsx`
- Modify: `mara-passos-website/src/components/sections/FAQ.tsx`

- [ ] **Step 1 (Portal):** **Desvio do spec**: a seção já é uma pilha de painéis `sticky` dirigida por scroll (linhas ~85-93 e ~113). Não adicionar o efeito "expande de card menor" por cima disso. Em vez disso: o bloco de intro usa `lines cine` no título/parágrafo, e cada painel entra com `Reveal` `rotateX 10 cine` apenas na primeira aparição, sem interferir no `top`/`zIndex` sticky.
- [ ] **Step 2 (FAQ):** Título com `lines`; cada item da lista (`Reveal stagger`) ganha uma divisória `data-reveal-line` que se desenha antes do texto. A abertura da resposta (altura + fade) é ajuste de CSS/GSAP no componente existente, sem mudar a acessibilidade (`aria-expanded` atual).
- [ ] **Step 3:** Verificar no navegador: painéis do Portal continuam empilhando; FAQ abre/fecha. `npx tsc --noEmit`, `npm run lint`.
- [ ] **Step 4:** Commit: `feat: entradas cinematográficas no Portal do Aluno e FAQ`.

### Task 8: Sobre nós, Apresentação e Sobre

**Files:**
- Modify: `mara-passos-website/src/components/sections/AboutUs.tsx`
- Modify: `mara-passos-website/src/components/sections/Presentation.tsx`
- Modify: `mara-passos-website/src/components/sections/About.tsx`

- [ ] **Step 1:** Ler `Presentation.tsx` (dois `Reveal` em ~14 e ~35).
- [ ] **Step 2 (AboutUs):** Título `lines cine`; no card, a imagem em `Parallax` (`invert`, `zoom 1.15`) e o painel de texto entra de `x: 60` enquanto a imagem entra de `x: -60` (wipe `clip` da esquerda), encontrando-se no centro.
- [ ] **Step 3 (Presentation):** Mesma ideia de lados opostos usando os dois `Reveal` existentes (`x` com sinais opostos, `cine`).
- [ ] **Step 4 (About):** `About` é componente de servidor (sem `"use client"`); o `ScrollReveal` externo continua. Dentro dele, manter servidor e envolver só a foto circular em `Parallax` e a lista com `Reveal stagger`. Sem contadores (a seção não tem números; decisão registrada no spec).
- [ ] **Step 4b:** Se envolver a imagem exigir `"use client"` no `About`, fazer via wrappers client (`Reveal`/`Parallax` já são client), sem converter o arquivo inteiro.
- [ ] **Step 5:** Verificar no navegador. `npx tsc --noEmit`, `npm run lint`.
- [ ] **Step 6:** Commit: `feat: entradas cinematográficas em Sobre nós, Apresentação e Sobre`.

### Task 9: Depoimentos e Contato

**Files:**
- Modify: `mara-passos-website/src/components/sections/Testimonials.tsx`
- Modify: `mara-passos-website/src/components/sections/Contact.tsx`

- [ ] **Step 1:** Ler `Testimonials.tsx` (`gsap.from(alvos…)` em ~90 e `RevealText` em ~151; preservar a lógica do carrossel).
- [ ] **Step 2 (Testimonials):** Cards entram com `scale 0.92 → 1`, `y 40`, `EASE.cine`; a aspa decorativa faz um "pop" com `ease: "back.out(1.7)"`.
- [ ] **Step 3 (Contact):** Título com `mask cine`; os campos do formulário em `Reveal stagger` (sobem um a um); o botão de envio faz um pulso único (`scale 1 → 1.04 → 1`) ao fim da entrada. Não alterar `handleSubmit`, o `id="agendamentos"` nem os `scroll-mt-*`.
- [ ] **Step 4:** Verificar no navegador, inclusive rolar até `#agendamentos` pelo botão do Hero (âncora via Lenis). `npx tsc --noEmit`, `npm run lint`.
- [ ] **Step 5:** Commit: `feat: entradas cinematográficas em Depoimentos e Contato`.

### Task 10: Verificação final

- [ ] **Step 1:** `npx tsc --noEmit` e `npm run lint` na pasta `mara-passos-website` → sem erros novos.
- [ ] **Step 2:** `npm run build` → compila sem erros.
- [ ] **Step 3:** No navegador (`preview_start`): rolar a home inteira em desktop e em mobile (`resize_window` preset mobile), confirmar que nenhuma seção fica invisível, que `read_console_messages` não tem erros e que o parallax está desligado no mobile.
- [ ] **Step 4:** Emular reduced-motion (`javascript_tool`/DevTools) e confirmar conteúdo 100% visível.
- [ ] **Step 5:** Clicar âncoras do menu (`#instrumentos`, `#agendamentos`) e conferir que o destino fica visível; navegar para outra página e voltar à home sem elementos presos.
- [ ] **Step 6:** Reportar o resultado de cada checagem, com o que não foi possível verificar.

## Autoavaliação

- **Cobertura do spec:** tokens (T1), variantes de Reveal (T2), Parallax/refresh (T3), todas as seções da tabela (T4–T9), reduced-motion/mobile (Global Constraints + T10). O desvio do Portal está declarado em T7.
- **Consistência de tipos:** `usarMovimentoCompleto`, `refreshScroll`, `Parallax` e as props de `Reveal` têm um só nome nas tarefas.

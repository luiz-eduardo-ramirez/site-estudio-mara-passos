# Plano de refatoração de animações — GSAP + ScrollTrigger

> Objetivo: trocar o motor de animação do site para **GSAP + ScrollTrigger**,
> deixar o bundle mais leve, a rolagem mais fluida em celulares/aparelhos
> intermediários e adicionar uma **transição entre páginas**. Mantém a
> acessibilidade (`prefers-reduced-motion`) e o comportamento atual visível.

---

## 1. Diagnóstico atual

**Motor de animação:** `framer-motion@12` (carregado via `LazyMotion` + `domMax`,
fora do bundle inicial) em 13 componentes. **Rolagem suave:** `lenis@1.3`
(fica — integra com GSAP). CSS já tem animações de ambiente (`@keyframes`
`floatUp`, `lt-*` da `/links`) e um bloco `prefers-reduced-motion` global.

Usos de framer-motion mapeados, por complexidade de migração:

| Tipo | Arquivos | Dificuldade p/ GSAP |
|---|---|---|
| **Scroll reveal simples** (`whileInView` fade/slide) | [`ScrollReveal.tsx`](mara-passos-website/src/components/layout/ScrollReveal.tsx), [`AboutUs.tsx`](mara-passos-website/src/components/sections/AboutUs.tsx), [`Presentation.tsx`](mara-passos-website/src/components/sections/Presentation.tsx), [`StudentPortal.tsx`](mara-passos-website/src/components/sections/StudentPortal.tsx), [`Teachers.tsx`](mara-passos-website/src/components/sections/Teachers.tsx) | **Baixa** — é o ponto forte do ScrollTrigger |
| **Stagger de filhos** (`staggerContainer`/`variants`) | [`AboutUs.tsx`](mara-passos-website/src/components/sections/AboutUs.tsx), [`FAQ.tsx`](mara-passos-website/src/components/sections/FAQ.tsx) | **Baixa** |
| **Modais/overlays** (`AnimatePresence` enter/exit) | [`Spaces.tsx`](mara-passos-website/src/components/sections/Spaces.tsx), [`SocialButtons.tsx`](mara-passos-website/src/components/layout/SocialButtons.tsx), [`Chatbot.tsx`](mara-passos-website/src/app/Chatbot.tsx), [`FAQ.tsx`](mara-passos-website/src/components/sections/FAQ.tsx), [`Testimonials.tsx`](mara-passos-website/src/components/sections/Testimonials.tsx) | **Média** — exige um hook de "presença" (GSAP não adia o unmount do React) |
| **Layout compartilhado** (`layoutId`, `layout`, `popLayout`) | [`Instruments.tsx`](mara-passos-website/src/components/sections/Instruments.tsx) | **Alta** — pílula do filtro + reflow do grid; usa GSAP **Flip** |

**Por que trocar (e por que fica mais leve/responsivo):** hoje as reveals passam
por IntersectionObserver + re-render do React a cada entrada. GSAP anima o DOM
direto (transform/opacity, fora do ciclo de render do React) → menos re-renders,
mais suave no mobile. Consolidar em **um motor** (remover o bundle `domMax` do
framer, que é o mais pesado) reduz o JS de animação. O ScrollTrigger ainda
sincroniza com a Lenis num único `requestAnimationFrame`, corrigindo o acoplamento
entre rolagem suave e animações por scroll.

> ⚠️ **Nota honesta de escopo.** Se mantivermos framer-motion **e** GSAP ao mesmo
> tempo, o site fica **mais pesado**, não mais leve. Por isso o plano recomendado
> é **remover o framer-motion por completo**. As migrações de risco são só duas —
> a pílula do filtro e o reflow do grid de [`Instruments.tsx`](mara-passos-website/src/components/sections/Instruments.tsx). Se o custo delas não compensar,
> a alternativa é a **Fase 5-B** (manter só essas duas em framer com o bundle leve
> `domAnimation`), descrita adiante.

---

## 2. Princípios de animação (da skill de UI)

- **Só `transform` e `opacity`.** Nunca animar `width/height/top/left` (evita
  reflow/CLS). Posição = `x/y/xPercent/yPercent`.
- **Offsets pequenos** nas reveals (8–24px) — lê como fade, não como "pulo".
- **Saída mais rápida que a entrada** (~60–70%) para parecer responsivo.
- **Stagger curto**: 0.03–0.08s por item; no máximo ~8 itens por sequência.
- **Tokens de movimento unificados** (durações/eases num só lugar) para o site
  inteiro ter o mesmo ritmo.
- **`prefers-reduced-motion`**: renderizar o **estado final** imediatamente
  (via `gsap.matchMedia`), nunca só acelerar.
- **Nada bloqueia input**; animações de rota não travam a navegação.

**Tokens propostos** (um arquivo `src/lib/motion.ts`):

```ts
export const EASE = { out: "power2.out", inOut: "power2.inOut", expo: "expo.out" };
export const DUR  = { fast: 0.3, base: 0.5, slow: 0.7, exit: 0.3 };
export const REVEAL = { y: 24, stagger: 0.08, start: "top 85%" };
```

---

## 3. Dependências

```bash
npm i gsap @gsap/react
npm uninstall framer-motion   # só ao fim da Fase 5 (ver rollback)
```

- `gsap` 3.13+ — **ScrollTrigger, Flip e SplitText são gratuitos** nesta versão.
- `@gsap/react` — hook `useGSAP()` com cleanup automático no unmount (essencial
  no React 19 + StrictMode; substitui o `useEffect` manual).
- **`lenis` permanece.** **`swiper` permanece** (carrosséis). O CSS de ambiente
  (`floatUp`, `lt-*`) **permanece** — não é framer.

---

## 4. Infra base (fundação — Fase 1)

### 4.1 Registro + integração ScrollTrigger ⇄ Lenis
Substituir o [`MotionProvider.tsx`](mara-passos-website/src/components/layout/MotionProvider.tsx) (framer) por um `GsapProvider` client que:
1. registra `gsap.registerPlugin(ScrollTrigger)` uma vez;
2. conecta a Lenis ao ScrollTrigger dentro do [`SmoothScroll.tsx`](mara-passos-website/src/components/layout/SmoothScroll.tsx):

```ts
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

   Assim a Lenis passa a rodar **no ticker do GSAP** (um só RAF) e o ScrollTrigger
   lê a posição interpolada correta. Em `prefers-reduced-motion` a Lenis não é
   criada (como hoje) e o ScrollTrigger usa o scroll nativo — sem mudança.

### 4.2 Reduced-motion central
Um helper `withMotion(cb)` baseado em `gsap.matchMedia()`:
```ts
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => { /* animações */ });
// quem pediu menos movimento vê o estado final (sem opacity:0 preso)
```
Regra de ouro: **o HTML renderiza visível por padrão**; a animação só começa a
partir do estado final. Nada de conteúdo `opacity:0` sem JS (SEO/no-JS/reduced).

---

## 5. Migração por tipo

### 5.1 Sistema de scroll reveal declarativo (substitui `ScrollReveal` + `whileInView`)
Um único hook/wrapper que varre atributos `data-reveal` dentro de um escopo,
evitando reescrever cada seção na mão:

```tsx
// useReveal.ts — chamado uma vez no <main> ou por seção
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      const kids = el.hasAttribute("data-reveal-stagger")
        ? el.children : [el];
      gsap.from(kids, {
        opacity: 0, y: REVEAL.y, duration: DUR.base, ease: EASE.out,
        stagger: REVEAL.stagger,
        scrollTrigger: { trigger: el, start: REVEAL.start,
          toggleActions: "play none none reverse" },
      });
    });
  });
}, { scope: mainRef });
```

- No [`page.tsx`](mara-passos-website/src/app/page.tsx): remover os `<ScrollReveal>…</ScrollReveal>` e marcar as
  seções com `data-reveal` (ou manter um wrapper fino que só injeta o atributo).
- `AboutUs`/`FAQ`: trocar `variants` por `data-reveal data-reveal-stagger` no
  container; os `<m.div>`/`<m.p>` viram `<div>`/`<p>` comuns.
- `AboutUs` tem `whileHover={{scale:1.05}}` na imagem → vira `transition` CSS
  (`group-hover:scale-105`), que já é o padrão do resto do arquivo.

### 5.2 Modais/overlays com entrada **e saída** (`AnimatePresence`)
GSAP não segura o unmount do React. Criar um hook `useGsapPresence(open)` que
mantém o nó montado durante a saída:

```ts
// retorna { render, ref }; quando open→false, toca o tween de saída e só
// então deixa de renderizar (setState no onComplete).
```
Padrão por componente:
- **Overlay/backdrop**: `fromTo(opacity 0→1)` na entrada; saída `to(opacity 0,
  dur: DUR.exit)`.
- **Painel** (`Spaces`, `Instruments` modal): `fromTo({opacity:0, y:30,
  scale:0.95} → {opacity:1, y:0, scale:1})`, `ease: EASE.out`; saída espelhada e
  mais curta. Manter `document.body.overflow='hidden'` + `lenis.stop()` como hoje.
- **SocialButtons / Chatbot** (lista que abre): stagger curto nos itens na
  entrada; saída simples em bloco.
- Fechar por `Esc`/clique no backdrop continua igual (só passa a disparar a saída
  animada antes de desmontar).

### 5.3 Instruments — os dois casos de risco
- **Pílula do filtro (`layoutId="activeFilterBg"`)** → **GSAP Flip**: ao trocar
  de categoria, `Flip.getState` do elemento da pílula, mover o nó para o botão
  ativo e `Flip.from(state, { duration: .4, ease: EASE.inOut })`. Alternativa mais
  simples e robusta: uma única pílula posicionada por `transform` calculado a
  partir do `offsetLeft/offsetWidth` do botão ativo (sem Flip, sem reflow).
  **Recomendo a alternativa por `transform`** — mais leve e previsível.
- **Grid com `layout` + `popLayout` + `exit`** (reflow ao filtrar) → `Flip` no
  container: `const s = Flip.getState(cards); // muda a lista; Flip.from(s, {...,
  onEnter: fade-in, onLeave: fade-out })`. É o uso canônico do Flip e cobre
  entrada/saída/reposição numa tacada.

### 5.4 Hero e micro-interações
Revisar o `Hero.tsx` (vídeo + `react-type-animation`): a datilografia fica (não é
framer). Se houver `m.*` de entrada, vira timeline GSAP no mount. Hovers/press em
botões permanecem em **CSS** (`transition`) — não precisa de JS.

---

## 6. Transição entre páginas (feature nova — Fase 4)

Padrão **Standard** (overlay wipe), que é o mais seguro no App Router e não
depende de elemento compartilhado entre rotas:

1. **Overlay persistente** montado no **layout root** (fora do `children`), para
   sobreviver à troca de rota. Cor sólida da marca (`#f26522`/preto).
2. Um componente client `<PageTransition>` que intercepta a navegação:
   - interceptar cliques em `<Link>`/`<a>` internos (como o `AncorasSuaves` já
     faz para âncoras) → `e.preventDefault()`, tocar a **saída** do overlay
     (`yPercent 100→0`, `power2.inOut`, ~0.4s), depois `router.push(href)`;
   - ao mudar o `pathname` (`usePathname`), tocar a **entrada** (`yPercent
     0→-100`), revelando a página nova.
3. **Teto de tempo**: a saída nunca passa de ~0.45s; se o destino demorar,
   mostra um indicador leve — nunca prender a navegação no fetch.
4. **Acessibilidade**: após a troca, mover foco para `#main-content` (o site já
   tem o alvo e o skip-link); em `prefers-reduced-motion`, **sem overlay** —
   navegação direta. `overlay` com `transform` (compositor), nunca `top/height`.
5. **Escopo**: começar pelas rotas reais do site (`/`, `/cursos`,
   `/professores`, `/sobre-nos`, `/aulas-de-*`, `/noticias/*`, `/links`).
   Checar que não conflita com a rolagem de âncora da home (mesma origem +
   mesmo pathname = âncora, trata como hoje; pathname diferente = transição).

> Variação opcional (Fase 6, se quiserem): transição de **elemento
> compartilhado** com Flip (ex.: card do curso → hero da página do curso) usando
> `data-flip-id` igual nas duas telas. Fica para depois — um par por navegação,
> só onde agrega.

---

## 7. Fases de entrega (incremental e testável)

Cada fase compila, roda e é revisável isoladamente. Sugiro um branch por fase.

| Fase | Entrega | Risco |
|---|---|---|
| **1. Fundação** | `gsap`+`@gsap/react`, `GsapProvider`, Lenis⇄ScrollTrigger, `motion.ts`, `useReveal` | Baixo |
| **2. Reveals** | Migrar `ScrollReveal` + as 5 seções `whileInView`/stagger; remover `<ScrollReveal>` do `page.tsx` | Baixo |
| **3. Overlays** | `useGsapPresence`; migrar `Spaces`, `SocialButtons`, `Chatbot`, `FAQ`, `Testimonials` | Médio |
| **4. Transição de página** | `<PageTransition>` + overlay no layout root | Médio |
| **5. Instruments** | Filtro (transform) + grid (Flip) + modal | Alto |
| **5-fim. Limpeza** | `npm uninstall framer-motion`; remover `MotionProvider`/`motionFeatures` | — |
| **6 (opcional)** | SplitText no título do Hero; Flip de elemento compartilhado | Baixo |

**Rollback:** framer-motion só sai no fim da Fase 5. Se Instruments não fechar a
tempo, aplica-se a **Fase 5-B**: manter `Instruments` em framer, mas trocar
`domMax`→`domAnimation` no `MotionProvider` (bundle bem menor) — o resto do site
já estará 100% GSAP. Fica mais leve que hoje, só não "um motor só".

---

## 8. Checklist de verificação (antes de considerar pronto)

- [ ] 375px e paisagem: sem scroll horizontal, reveals sem "pulo".
- [ ] `prefers-reduced-motion`: tudo visível, sem overlay de rota, sem Lenis.
- [ ] Sem `opacity:0` preso se o JS falhar (conteúdo indexável).
- [ ] Modais: travam a página (overflow+`lenis.stop`), fecham no `Esc`/backdrop,
      saída animada antes do unmount; foco volta ao gatilho.
- [ ] Transição de rota: foco vai pro `#main-content`; âncoras da home intactas;
      nada preso em fetch lento.
- [ ] `useGSAP({scope})` em tudo (cleanup no StrictMode do React 19).
- [ ] Só `transform`/`opacity` animados; `markers:false` em produção.
- [ ] Bundle: conferir que `framer-motion` saiu do build (`next build` + análise).

---

## 9. Decisões em aberto (preciso do seu aval)

1. **Remover o framer-motion por completo** (recomendado, mais leve) **ou** manter
   só o `Instruments` nele via `domAnimation` (Fase 5-B, mais seguro)?
2. **Estilo da transição de página**: overlay sólido da marca (recomendado) ou
   um crossfade mais discreto?
3. Quer que eu **execute a Fase 1 agora** ou prefere revisar este plano antes?

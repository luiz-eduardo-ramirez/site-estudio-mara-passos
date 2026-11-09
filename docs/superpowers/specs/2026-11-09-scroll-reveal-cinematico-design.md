# Scroll reveal cinematográfico — design

Data: 2026-11-09 · Projeto: mara-passos-website (Next.js + GSAP)

## Intenção e porquê

As animações de scroll reveal atuais são simples: quase todas as seções usam o
mesmo `<Reveal>` (fade + subida de 32px, `power3.out`, 0,7s). O pedido é elaborar
animações novas, mais fluidas, **de intensidade cinematográfica**, com uma
"assinatura" diferente para cada seção.

## Objetivos

- Cada seção da home ganha uma entrada própria e reconhecível.
- Movimento mais fluido: curvas `expo.out`, durações ~1s, stagger coreografado.
- Efeitos ligados ao scroll (parallax, zoom de imagem, expansão do Portal do Aluno).
- Continuar respeitando `prefers-reduced-motion` (conteúdo nasce visível).

## Não-objetivos / anti-objetivos

- Não reescrever o site com timelines pinadas por seção (abordagem C descartada).
- Não pode haver seção presa invisível (bug que motivou o `IntersectionObserver`).
- Não pode haver jank no celular nem quebra da navegação por âncoras (`HashScroll`).
- Sem JS ou para crawlers, o conteúdo continua visível.

## Restrições

- Todo GSAP entra por `src/lib/gsap.ts`; tokens de movimento em `src/lib/motion.ts`.
- As seções da home são montadas via `next/dynamic` depois da primeira pintura,
  empurrando as demais; posições de ScrollTrigger calculadas cedo ficam defasadas.
- Usar `useGSAP` para limpeza automática (StrictMode do React 19).
- Existem alterações não commitadas em Spaces, Teachers, StudentPortal e FAQ;
  o trabalho deve partir delas, sem desfazê-las.

## Abordagens consideradas

- **A. Só estender o `<Reveal>`**: simples, mas sem parallax/scrub; não chega ao
  cinematográfico.
- **B. Duas camadas (escolhida)**: `Reveal` + `IntersectionObserver` para entradas;
  ScrollTrigger só onde o efeito acompanha o scroll.
- **C. Reescrita com timelines/pin/scrub**: mais ousada, mas risco alto (seções
  dinâmicas, mobile, âncoras) e volume de trabalho maior.

Escolha do usuário: **B**.

## Design

### Tokens (`motion.ts`)
- Novo ease de entrada cinematográfica (`expo.out`) como padrão de reveals novas;
  `DUR.cine` ≈ 1,1s; stagger de palavras/linhas ≈ 0,06s.

### Camada 1 — entradas (`Reveal`, IntersectionObserver)
Novas variantes, opt-in, mantendo as props atuais:
- `mask`: conteúdo sobe de dentro de uma máscara (overflow hidden).
- `lines` / `words`: título dividido em palavras/linhas, cada uma entra em stagger
  com máscara.
- `counter`: contagem animada de números.
- `clip` existente ganha direção (esquerda/direita/baixo) para wipes alternados.
- `rotateX` opcional para cascata 3D de cards.
- `line`: linha decorativa que se desenha via `scaleX`.

### Camada 2 — scroll (ScrollTrigger, só onde necessário)
- Registrar ScrollTrigger em `lib/gsap.ts`.
- `<Parallax>`: imagem interna com zoom (1,15→1 ou 1,2→1) e deslocamento Y com
  `scrub`, em sentido diferente do card.
- `useScrubReveal`: hook para o bloco do Portal do Aluno (expande de card menor,
  scale + `border-radius`).
- Chamar `ScrollTrigger.refresh()` quando uma seção dinâmica monta (e após carga
  de imagens), para evitar gatilhos defasados.
- Parallax e blur desativados/atenuados em telas pequenas e em reduced-motion.

### Assinatura por seção
| Seção | Animação |
|---|---|
| Hero | Título palavra a palavra com máscara; fundo com zoom lento + parallax |
| Notícias | Cards em wipe horizontal (clip) com stagger; parallax interno nas imagens |
| Instrumentos | Cascata a partir do centro com `rotateX` 3D; destaque ativo desliza |
| Espaços | Fotos reveladas por clip de lados alternados; zoom + parallax na imagem |
| Professores | Cards em cascata, foto blur→nítida; linha do título desenhada |
| Portal do Aluno | Já é uma pilha sticky dirigida por scroll; fica como está. Só título por linhas e entrada dos painéis (ajustado no plano) |
| FAQ | Itens em linha com divisória desenhada; resposta abre com altura + fade |
| Sobre nós / Apresentação | Texto e imagem de lados opostos; texto por linhas; parallax inverso |
| Sobre | Contadores animados + destaques em stagger |
| Depoimentos | Cards entram de profundidade (scale 0,92→1 + y); aspas com `back.out` |
| Contato | Título por máscara; campos sobem um a um; pulso suave no botão |

## Decisões tomadas pelo assistente (marcadas como minhas)
- Escopo: todas as seções da home (o usuário não restringiu).
- Páginas de curso e `privacidade` ficam fora desta primeira entrega.
- Fonte de dados dos contadores (Sobre) será lida do conteúdo existente; se não
  houver números, usa-se apenas stagger.

## Deixado ao construtor
- Valores finos de timing/offset por seção, ajustados vendo no navegador.
- Nomes finais dos props e da API do `useScrubReveal`.
- Verificação visual em desktop e mobile (resize) e checagem de console.

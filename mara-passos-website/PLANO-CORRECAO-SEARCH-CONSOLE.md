# Plano de correção — Google Search Console

Site: https://estudiomusicalmarapassos.com.br · Análise de 20/10/2026
(código do repositório + testes `curl` com user-agent do Googlebot no site em produção)

> **Sobre o repositório google/skills:** ele não tem nenhuma skill de SEO ou Search Console
> (só Cloud, Ads, Analytics, Firebase etc.). A única útil aqui é
> `developers/retrieving-developer-knowledge` (consultar a documentação oficial do Google).
> Por isso o plano se baseia na documentação do Search Console e no que foi medido no site.

## 1. Resumo: o que é erro de verdade e o que é normal

| Relatório | Págs. | Veredito | Prioridade |
|---|---|---|---|
| Bloqueada por robots.txt (aviso) | 1 | **Erro real** — URL do portal no sitemap, bloqueada por `Disallow: /` | Alta |
| Bloqueada por 403 | 4 | **Erro real** — quase certamente o subdomínio `portal.` | Alta |
| Não encontrado (404) | 6 | Em parte legítimo (páginas removidas). Redirecionar só o que tem valor | Média |
| Rastreada – não indexada | 3 | Sinal de qualidade/conteúdo fino. Tratar depois de limpar o resto | Média |
| Duplicada sem canônica escolhida | 1 | Provavelmente já corrigido (commit `d88c324`) — só validar | Baixa |
| Alternativa com canônica correta | 8 | **Normal** (variantes www/http/barra final/utm). Sem ação | — |
| Com redirecionamento | 2 | **Normal** (`/index.html`, `/politica-de-privacidade`, www). Sem ação | — |
| Detectada – não indexada | 3 | Já "Aprovado". Sem ação | — |

Nada disso derruba o site principal: as 9 páginas importantes respondem 200, têm `<link rel="canonical">`
correto e entram no sitemap. O problema se concentra no **portal** e em **URLs antigas**.

## 2. Diagnóstico (o que foi medido)

**Site principal — saudável**
- `/`, `/cursos`, `/professores`, `/sobre-nos`, `/privacidade`, `/links`, `/aulas-de-piano|bateria|violino` e as 3 notícias: 200, canonical correto, sem `noindex`.
- `robots.txt` livre (`Allow: /`) e aponta para o sitemap. Sitemap válido com 12 URLs.
- Redirecionamentos corretos: `www`→sem www (308), `http`→`https` (301), `/index.html`→`/` (308), barra final removida (308).
- Googlebot, Googlebot-Image, mobile, AdsBot e InspectionTool recebem 200. **Não há bloqueio de WAF no site principal.**

**Portal (`portal.estudiomusicalmarapassos.com.br`) — origem da maioria dos erros**
- `robots.txt` do portal é `Disallow: /` (intencional, para login).
- Mas o **sitemap do site principal lista `https://portal.../login`** (`src/app/sitemap.ts`, linha da lista `paginas`).
  Isso é inválido por dois motivos: sitemap só pode listar URLs do próprio host, e a URL listada está bloqueada.
  → é o "Indexada, mas bloqueada pelo robots.txt" (o Google descobriu o link no menu/rodapé e indexou sem poder ler).
- O portal é uma SPA que responde **200 para qualquer caminho** (`/qualquer-coisa-xyz`, `/sitemap.xml`, `/dashboard`) — soft-404 — e **403 em `/assets/`**.
  → o `Disallow: /` não impede a indexação das URLs já descobertas; e o 403 vem desse servidor.

**404 — URLs removidas do site (confirmadas 404 hoje)**
- `/campanha-instagram` (commit `e9b6840`)
- `/ebook-estudio-mara-passos.pdf` (mesmo commit)
- `/links/r/<slug>` (commit `41dfe33`, route handler removido)
- `/teachers/*.jpeg` (substituídos por `.webp`)
- `/noticias` (listagem) — **não existe** (404), mas a rota "pai" de `/noticias/<slug>` é uma URL óbvia que alguém/algo pode acessar.
- Notícias removidas (apresentação de maio etc.) e URLs do sitemap antigo (`/sitemap.xml` estático apagado em `690e04f`).

> Para fechar a lista exata de 404 e 403, abra cada linha no relatório (Páginas → motivo → "Examinar URL") e
> exporte. Os candidatos acima cobrem as causas, mas os URLs exatos só o Search Console mostra.

## 3. Plano de ação

### Fase 1 — Correções de código/configuração (fazer agora)

1. **Tirar o portal do sitemap** — `src/app/sitemap.ts`: remover a linha `https://portal.estudiomusicalmarapassos.com.br/login`.
   Sitemap só com URLs do próprio domínio.
2. **Criar a listagem `/noticias`** (ou redirecionar para `/#noticias`): hoje é 404.
   Opção simples em `next.config.ts`: `{ source: '/noticias', destination: '/#noticias', permanent: true }`.
3. **Redirecionar 404 com valor** em `next.config.ts` (301):
   - `/campanha-instagram` → `/cursos` (ou `/`)
   - `/ebook-estudio-mara-passos.pdf` → `/`
   - `/links/r/:slug` → `/links`
   - Demais 404 sem substituto natural: **deixe em 404/410**. Isso é correto e não prejudica o site.
4. **Revisar `/links` (página "link na bio")**: tem pouco texto, não está no sitemap e provavelmente é uma das 3
   "Rastreadas – não indexadas". Recomendo `robots: { index: false, follow: true }` em `src/app/links/page.tsx`,
   já que ela não deve disputar busca (canal de campanha, não de SEO).
5. **Canônica**: a home já tem (`src/app/page.tsx`). Só garantir que nenhuma rota nova fique sem `alternates.canonical`.
6. **Páginas de notícias**: o sitemap omite `lastmod` nas 3 notícias (campo `date` vazio). Preencher `date` em `src/app/data/news.ts`.

### Fase 2 — Portal (projeto separado, fora deste repositório)

1. Fazer o portal responder **404 de verdade** para rotas inexistentes (hoje 200 em tudo).
2. O 403 em `/assets/` (listagem de diretório) é esperado; confirme só que os arquivos `.js/.css` abrem para o Googlebot (Inspeção de URL → "Testar URL ao vivo" → recursos).
3. **Desindexar o portal corretamente**: `Disallow` sozinho não remove da busca. Sequência segura:
   a. Adicionar `<meta name="robots" content="noindex">` (ou header `X-Robots-Tag: noindex`) e **liberar temporariamente o robots.txt** para o Google ler a tag;
   b. Aguardar a página sair do índice (acompanhe em Páginas);
   c. Só então voltar para `Disallow: /`.
   Alternativa rápida: ferramenta **Remoções** do Search Console para ocultar a URL por ~6 meses.
4. Lembrar do histórico: o portal já sofreu >2.000 requisições/min do Googlebot — mantenha o `robots.txt` e considere rate-limit/cache no Cloudflare.

### Fase 3 — Validação no Search Console (depois do deploy)

1. Deploy (`npm run deploy`) e verificar `https://estudiomusicalmarapassos.com.br/sitemap.xml` sem a URL do portal.
2. Em Sitemaps: reenviar `sitemap.xml`.
3. Clicar **"Validar correção"** em: 404, 403, duplicada, bloqueada por robots. Os de 404 e 403 já estão "Iniciada".
4. **Inspeção de URL → Solicitar indexação** para as 3 páginas de curso, `/cursos`, `/professores` e `/sobre-nos`.
5. Não precisa fazer nada nos itens "alternativa com canônica correta" e "com redirecionamento".

### Fase 4 — Indexação das "Rastreadas – não indexadas" (2–4 semanas)

- Identificar as 3 URLs no relatório. Se forem `/links` ou `/privacidade`: `noindex` é aceitável.
- Se forem notícias/cursos: aumentar profundidade de conteúdo (≥ 300 palavras únicas, FAQ, depoimentos), linkar
  entre si (hoje o `/aulas-de-*` não linka `/noticias/*`) e adicionar links dos cards da home para as notícias.
- Adicionar `Breadcrumb` + `FAQPage`/`Course` JSON-LD nas páginas de curso (a home só tem `MusicSchool`).

## 4. Checklist de verificação

```bash
# sitemap sem portal
curl -s https://estudiomusicalmarapassos.com.br/sitemap.xml | grep -c portal      # esperado: 0
# redirects novos
for p in /noticias /campanha-instagram /ebook-estudio-mara-passos.pdf /links/r/site; do
  curl -s -o /dev/null -w "$p %{http_code} %{redirect_url}\n" https://estudiomusicalmarapassos.com.br$p; done
# portal: rota inexistente deve ser 404
curl -s -o /dev/null -w "%{http_code}\n" https://portal.estudiomusicalmarapassos.com.br/xyz-inexistente
```

## 5. O que NÃO fazer
- Não redirecionar todos os 404 para a home (vira soft-404).
- Não colocar `noindex` + `Disallow` ao mesmo tempo (o Google não lê o `noindex`).
- Não tentar "corrigir" alternativas canônicas/redirecionamentos — são o comportamento esperado.

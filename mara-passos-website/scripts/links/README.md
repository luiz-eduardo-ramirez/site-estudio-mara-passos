# Ferramentas da página /links

Isto não faz parte do build. São scripts para rodar à mão quando as imagens da
página `/links` precisarem ser refeitas.

## Regenerar as imagens

```
npm i -D sharp
node scripts/links/optimize-assets.mjs
```

Lê os originais que já estão em `public/` e escreve em `public/links/`. É
idempotente: sem mudar os originais, gera exatamente os mesmos arquivos.

O script carrega as medidas do recorte do emblema — o "M" de teclas de piano
ocupa `x:199-892, y:155-848` no `logo.webp` original de 1072x1144. Esses
números foram obtidos medindo a densidade de branco por linha da imagem; se o
logo mudar, precisam ser medidos de novo.

## Regenerar o preview social

`opengraph-image.reference.tsx` é o gerador da imagem que hoje está salva em
`src/app/links/opengraph-image.png`, junto com as fontes que ele usa.

**Não recoloque esse arquivo dentro de `src/app/`.** Ele lê as fontes do disco
com `readFile`, e o Cloudflare Workers não tem filesystem — a página quebraria
em produção. Pior: como Route/Metadata handler dinâmico, ele também faria o
`@cloudflare/next-on-pages` recusar o build inteiro, e o Pages continuaria
servindo a versão anterior sem avisar (foi o que aconteceu uma vez).

Para refazer a imagem, rode o gerador num projeto Next à parte, exporte o PNG e
copie o resultado para `src/app/links/opengraph-image.png`. O preview muda
raramente; o custo de manter isso fora do build compensa.

As fontes em `fonts/` são instâncias estáticas — o Satori não interpola eixos de
variable fonts, por isso não servem os arquivos variáveis que o `next/font` usa.

# 🎵 Estúdio Mara Passos - Website

Bem-vindo ao repositório oficial do website do **Estúdio Mara Passos**, uma escola de música dedicada a oferecer a melhor experiência em aprendizado musical. Este projeto consiste em uma interface moderna, responsiva e altamente interativa, desenvolvida com as mais recentes tecnologias do ecossistema React.

---

## 💻 Sobre o Projeto

O site atua como a vitrine digital da escola de música, permitindo que futuros alunos conheçam as instalações, os professores, os cursos (como aulas de piano) e a metodologia do estúdio. Conta com animações fluidas baseadas no scroll do usuário e uma navegação intuitiva que visa atrair e converter novos alunos. Além disso, as mensagens de novos alunos interessados podem ser enviadas diretamente por um formulário de contato integrado.

## ✨ Funcionalidades e Seções

O projeto é projetado no formato híbrido (Landing Page + Sub-páginas como a de aulas específicas) e é composto pelas seguintes seções:

- **Hero**: Seção inicial de impacto.
- **Novidades (News)**: Últimas notícias do estúdio.
- **Apresentações (Presentation)**: Área de mídia com vídeos de apresentações.
- **Sobre Nós (About / About Us)**: História do estúdio e nossa missão na educação musical.
- **Cursos e Instrumentos (Instruments)**: Apresentação interativa dos instrumentos ensinados (ex: Aulas de Piano).
- **Corpo Docente (Teachers)**: Perfil de nossos professores.
- **Estrutura (Spaces)**: Apresentação visual das nossas salas de aula e ambiente.
- **Depoimentos (Testimonials)**: Histórias de sucesso em carrossel.
- **Contato (Contact)**: Formulário funcional para contato, disparando e-mails pela integração com o `EmailJS`.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as melhores ferramentas e tecnologias modernas focadas em performance e UI/UX:

- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router.
- **[React 19](https://react.dev/)** - Biblioteca JavaScript para construção da interface de usuário.
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework utilitário de CSS para estilização ágil e responsiva.
- **[Framer Motion](https://www.framer.com/motion/)** - Motor de animações utilizado nos efeitos de revelar ao rolar (ScrollReveal) e em micro-interações (como notas musicais flutuantes).
- **[Swiper](https://swiperjs.com/)** - Biblioteca principal para os carrosséis da plataforma.
- **[Lucide React](https://lucide.dev/)** - Ícones limpos e minimalistas.
- **[React Type Animation](https://github.com/maxmarinich/react-type-animation)** - Animação realista de digitação de texto.
- **[EmailJS](https://www.emailjs.com/)** - Serviço de backend-as-a-service (BaaS) para lidar com o envio dos formulários de contato diretamente via navegador.
- **TypeScript** - Superconjunto do JavaScript que adiciona tipagem estática.

## 🚀 Como Executar Localmente

Siga os passos abaixo para configurar e executar a aplicação em sua máquina:

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/en/) instalado (Recomenda-se versão 20+).
- Gerenciador de pacotes (`npm`, `yarn`, ou `pnpm`).

### 2. Instalação
Clone o projeto na sua máquina e instale as dependências.

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta do projeto
cd mara-passos-website

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Executando o Servidor de Desenvolvimento

Após as instalações concluírem, você poderá iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### Variáveis de Ambiente
Caso precise testar o formulário de Contato propriamente, será necessário criar um arquivo `.env.local` na raiz e preencher com as credenciais do seu serviço **EmailJS**. Consulte a seção respectiva do componente `Contact.tsx` para avaliar as chaves exigidas (como *service_id*, *template_id* e *public_key*).

---

## 📂 Estrutura de Diretórios Básica

As partes mais importantes da arquitetura do projeto estão contidas em `src`:

```
src/
 ├── app/               # Rotas e layouts do Next.js (App Router)
 │    ├── aulas-de-piano/ # Rota detalhada de um curso.
 │    ├── globals.css   # Variáveis CSS e imports do Tailwind
 │    ├── page.tsx      # Landing page principal
 │    └── ...
 ├── components/
 │    ├── layout/       # Componentes gerais da estrutura (Navbar, Footer, Animações GLOBAIS)
 │    └── sections/     # Todas as diferentes seções contidas na Landing Page
```

## ☁️ Deploy

A maneira mais fácil de publicar a sua aplicação em produção é através da plataforma [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), criadora do Next.js. Verifique as configurações de Build (`npm run build`). Lembre-se de configurar devidamente as Variáveis de Ambiente nas opções de "Environment Variables" da sua hospedagem.

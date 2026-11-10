import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Clock,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import dynamic from "next/dynamic";
import Contact from "../sections/Contact";
import SocialButtons from "../layout/SocialButtons";
import HeroMedia from "./HeroMedia";

/** Vídeo de fundo de todo curso que não define o seu em `hero.video`. */
const VIDEO_HERO_PADRAO = "/hero-bg.mp4";
import Reveal from "../layout/Reveal";
import PassosMotion from "./motion/PassosMotion";
import FilosofiaMotion from "./motion/FilosofiaMotion";
import VideoCarousel from "./VideoCarousel";
import YouTubeFacade from "./YouTubeFacade";
const FAQ = dynamic(() => import("../sections/FAQ"));
const Spaces = dynamic(() => import("../sections/Spaces"));
const StudentPortal = dynamic(() => import("../sections/StudentPortal"));
const Teachers = dynamic(() => import("../sections/Teachers"));

import { teachersList } from "../../data/teachersList";
import {
  ENDERECO,
  LINK_MAPA,
  NOME_ESTUDIO,
  SITE_URL,
  TELEFONE_EXIBIDO,
  linkWhatsApp,
} from "../../data/studio";
import type { CourseConfig } from "./types";

/*
 * Template das páginas de curso. O conteúdo vem de um CourseConfig; aqui só
 * vive a estrutura — a mesma para todos os instrumentos, para que o visitante
 * (e o Google) encontre cada informação sempre no mesmo lugar.
 */

const cartao =
  "rounded-2xl border border-white/10 bg-white/5 transition-colors hover:border-white/20";

function Secao({
  id,
  rotulo,
  titulo,
  intro,
  children,
}: {
  id: string;
  rotulo?: string;
  titulo: React.ReactNode;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="mb-28 w-full scroll-mt-28 px-4 md:mb-36"
    >
      <div className="reveal mx-auto mb-12 max-w-3xl text-center">
        {rotulo && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-mara-orange">
            {rotulo}
          </p>
        )}
        <h2
          id={`${id}-titulo`}
          className="text-balance text-3xl font-bold leading-tight md:text-5xl"
        >
          {titulo}
        </h2>
        {intro && (
          <p className="mt-5 text-lg leading-relaxed text-gray-300">{intro}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function montarJsonLd(c: CourseConfig, professores: readonly { nome: string }[]) {
  const pageUrl = `${SITE_URL}/${c.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${pageUrl}#curso`,
        name: c.nomeCurso,
        description: c.schema.descricao,
        url: pageUrl,
        inLanguage: "pt-BR",
        educationalLevel: c.schema.nivel,
        coursePrerequisites: c.schema.prerequisitos,
        provider: {
          "@type": "MusicSchool",
          "@id": SITE_URL,
          name: NOME_ESTUDIO,
          url: SITE_URL,
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Onsite",
          ...(professores.length
            ? { instructor: professores.map((p) => ({ "@type": "Person", name: p.nome })) }
            : {}),
          location: {
            "@type": "Place",
            name: NOME_ESTUDIO,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Rua Cuevas, 206",
              addressLocality: "São Paulo",
              addressRegion: "SP",
              postalCode: "05076-050",
              addressCountry: "BR",
            },
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: c.faq.map((p) => ({
          "@type": "Question",
          name: p.pergunta,
          acceptedAnswer: { "@type": "Answer", text: p.resposta },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Cursos", item: `${SITE_URL}/cursos` },
          { "@type": "ListItem", position: 3, name: c.nomeCurso, item: pageUrl },
        ],
      },
    ],
  };
}

export default function CoursePage({ curso: c }: { curso: CourseConfig }) {
  /* A equipe vem da fonte única (a mesma da home); o curso só escolhe quem. */
  const professores = (c.equipe?.professores ?? []).flatMap(({ id }) => {
    const t = teachersList.find((p) => p.id === id);
    return t ? [t] : [];
  });

  const jsonLd = montarJsonLd(c, professores);
  const whatsapp = linkWhatsApp(c.instrumento);

  return (
    <>
      <script
        type="application/ld+json"
        // "<" escapado para que nenhum texto dos dados consiga fechar a tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="relative min-h-screen overflow-x-clip bg-[#0a0a0a] text-white outline-none"
      >
        {/* ---------- HERÓI ---------- */}
        <section
          aria-labelledby="hero-titulo"
          className="relative isolate mb-16 flex min-h-[85svh] flex-col items-center justify-center overflow-hidden pb-20 pt-36 md:mb-24"
        >
          <HeroMedia imagem={c.hero.imagem} video={c.hero.video ?? VIDEO_HERO_PADRAO}posicao={c.hero.posicao} />

          <div className="relative w-full px-4 text-center">
            <nav aria-label="Você está em" className="mb-8 text-sm text-gray-300">
              <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <li>
                  <Link href="/" className="rounded px-1 py-1 hover:text-mara-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-mara-orange">
                    Início
                  </Link>
                </li>
                <li aria-hidden="true" className="text-gray-500">/</li>
                <li>
                  <Link href="/cursos" className="rounded px-1 py-1 hover:text-mara-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-mara-orange">
                    Cursos
                  </Link>
                </li>
                <li aria-hidden="true" className="text-gray-500">/</li>
                <li aria-current="page" className="px-1 py-1 font-semibold text-white">
                  {c.breadcrumb}
                </li>
              </ol>
            </nav>

            <h1
              id="hero-titulo"
              className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight drop-shadow-lg md:text-7xl"
            >
              {c.hero.h1} <span className="text-mara-orange">Lapa</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-200 drop-shadow-md md:text-xl">
              {c.hero.texto}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#agendamentos"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-mara-orange px-9 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(242,101,34,0.3)] transition-all duration-300 hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-safe:hover:-translate-y-1"
              >
                Agendar aula experimental
                <ArrowRight size={20} aria-hidden="true" />
              </a>
              <a
                href="#espacos"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-mara-orange hover:text-mara-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Conhecer o estúdio
              </a>
            </div>

            <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
              {c.hero.fatos.map(({ icone: Icone, texto }) => (
                <li
                  key={texto}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-3 py-4 text-sm font-medium text-gray-100 backdrop-blur-sm"
                >
                  <Icone className="text-mara-orange" size={22} aria-hidden="true" />
                  {texto}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- DIFERENCIAIS ---------- */}
        <Secao id="diferenciais" rotulo="Nosso curso" titulo={c.diferenciais.titulo}>
          <div className="reveal grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="group relative">
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl ring-1 ring-white/10">
                {c.diferenciais.midia.tipo === "youtube" ? (
                  <YouTubeFacade
                    id={c.diferenciais.midia.id}
                    titulo={c.diferenciais.midia.titulo}
                  />
                ) : (
                  <Image
                    src={c.diferenciais.midia.src}
                    alt={c.diferenciais.midia.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: c.diferenciais.midia.posicao ?? "center" }}
                  />
                )}
              </div>
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 bg-mara-orange/10 opacity-50 blur-[60px] transition-opacity duration-500 group-hover:opacity-70"
              />
            </div>

            <ul className="grid gap-5">
              {c.diferenciais.itens.map((item) => (
                <li key={item.titulo} className={`flex gap-4 p-6 ${cartao}`}>
                  <CircleCheck
                    className="mt-1 shrink-0 text-mara-orange"
                    size={24}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-gray-100">{item.titulo}</h3>
                    <p className="text-base leading-relaxed text-gray-300">{item.texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Secao>

        {/* ---------- COMO COMEÇAR ---------- */}
        <Secao
          id="como-comecar"
          rotulo="Passo a passo"
          titulo={c.passosTitulo}
          intro="Do primeiro contato à primeira música, em três passos simples."
        >
          {/* O movimento (pauta + nota) vive em PassosMotion; aqui só a estrutura. */}
          <PassosMotion>
            <ol className="grid gap-6 md:grid-cols-3">
              {c.passos.map((passo, i) => (
                <li
                  key={passo.titulo}
                  data-passo
                  className="reveal group/passo"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <div
                    data-passo-cartao
                    className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 transition-[border-color,box-shadow] duration-500 hover:border-white/20 group-data-[ativo=true]/passo:border-mara-orange/60 group-data-[ativo=true]/passo:shadow-[0_0_40px_rgba(242,101,34,0.18)]"
                  >
                    <span
                      data-passo-numero
                      aria-hidden="true"
                      className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-mara-orange/15 text-xl font-bold text-mara-orange ring-1 ring-mara-orange/30 transition-colors duration-500 group-data-[ativo=true]/passo:bg-mara-orange group-data-[ativo=true]/passo:text-white"
                    >
                      {/* Anel que se preenche quando a nota da pauta se aproxima. */}
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        className="pointer-events-none absolute -inset-1 -rotate-90"
                      >
                        <circle
                          data-passo-aro
                          cx="28"
                          cy="28"
                          r="26"
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="stroke-mara-orange"
                        />
                      </svg>
                      {i + 1}
                    </span>
                    <h3 className="mb-3 text-xl font-bold">{passo.titulo}</h3>
                    <p className="text-base leading-relaxed text-gray-300">{passo.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </PassosMotion>
          <p className="reveal mt-10 text-center">
            <a
              href="#agendamentos"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-mara-orange/50 px-7 py-3 font-semibold text-mara-orange transition-colors hover:bg-mara-orange hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mara-orange"
            >
              Quero agendar minha aula
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </p>
        </Secao>

        {/* ---------- PROFESSORES ---------- */}
        {c.equipe && professores.length > 0 && (
          <Teachers
            professores={professores}
            titulo={c.equipe.titulo}
            intro={c.equipe.intro}
          />
        )}

        {/* ---------- PORTAL DO ALUNO ---------- */}
        <StudentPortal />

        {/* ---------- FILOSOFIA ---------- */}
        <FilosofiaMotion
          labelledBy="filosofia-titulo"
          className="relative mb-28 overflow-hidden bg-gradient-to-b from-transparent via-mara-orange/5 to-transparent py-20 md:mb-36 md:py-28"
        >
          {/* Fundo (só desktop): halo laranja e duas linhas de texto vazado que correm em sentidos opostos. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden select-none md:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                data-fil="halo"
                className="h-[80%] w-[70%] bg-[radial-gradient(closest-side,rgba(242,101,34,0.22),transparent)]"
              />
            </div>
            {(["fundo-a", "fundo-b"] as const).map((nome) => (
              <div
                key={nome}
                data-fil={nome}
                className={`absolute left-0 whitespace-nowrap text-[length:16vw] font-black uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)] ${
                  nome === "fundo-a" ? "top-[4%]" : "bottom-[4%]"
                }`}
              >
                {`${c.filosofia.destaque} · `.repeat(3)}
              </div>
            ))}
          </div>

          <div className="relative w-full px-4 text-center">
            <Sparkles
              data-fil="icone"
              className="mx-auto mb-6 text-mara-orange"
              size={36}
              aria-hidden="true"
            />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-mara-orange">
              Descubra o poder da música
            </p>
            <Reveal
              as="h2"
              lines
              cine
              id="filosofia-titulo"
              className="mb-8 text-balance text-3xl font-extrabold tracking-tight md:text-5xl"
            >
              {c.filosofia.titulo}
            </Reveal>
            <p data-fil="texto" className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-200 md:text-2xl">
              {c.filosofia.antes}{" "}
              <span className="font-semibold text-mara-orange">{c.filosofia.destaque}</span>
              {c.filosofia.depois}
            </p>
            <ul
              data-fil="beneficios"
              className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-base font-medium text-gray-200"
            >
              {c.filosofia.beneficios.map(({ icone: Icone, texto }) => (
                <li key={texto} className="flex items-center gap-2">
                  <Icone className="text-mara-orange" size={22} aria-hidden="true" />
                  {texto}
                </li>
              ))}
            </ul>
          </div>
        </FilosofiaMotion>

        {/* ---------- VÍDEOS DOS ALUNOS (só se o curso tiver) ---------- */}
        {c.videos && (
          <section
            id="alunos"
            aria-labelledby="alunos-titulo"
            className="reveal relative mb-28 w-full scroll-mt-28 md:mb-36"
          >
            <div className="mb-12 w-full px-4 text-center">
              <h2 id="alunos-titulo" className="mb-4 text-balance text-3xl font-bold md:text-5xl">
                {c.videos.titulo}
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">{c.videos.intro}</p>
            </div>
            <VideoCarousel videos={c.videos.itens} rotulo={c.videos.alt} />
          </section>
        )}

        {/* ---------- O ESTÚDIO ---------- */}
        <Spaces
          fotos={c.galeria.map((f) => ({ img: f.src, alt: f.alt }))}
          titulo={
            <>
              Conheça nosso <span className="text-mara-orange">estúdio na Lapa</span>
            </>
          }
          intro="Ambiente climatizado, acústico e equipado com bons instrumentos para o seu aprendizado."
        />

        {/* ---------- FAQ ---------- */}
        <FAQ
          items={c.faq.map((p) => ({ question: p.pergunta, answer: p.resposta }))}
          titulo={c.faqTitulo}
          intro="Tudo o que você precisa saber para dar o primeiro passo sem receios."
        />

        {/* ---------- ONDE FICA ---------- */}
        <Secao
          id="como-chegar"
          rotulo="Localização"
          titulo={c.localizacao.titulo}
          intro={c.localizacao.intro}
        >
          <div className="reveal grid gap-4 sm:grid-cols-3">
            <address className={`flex flex-col items-start gap-3 p-6 not-italic ${cartao}`}>
              <MapPin className="text-mara-orange" size={24} aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Endereço</span>
              <span className="text-base leading-relaxed text-gray-100">{ENDERECO}</span>
              <a
                href={LINK_MAPA}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex min-h-11 items-center gap-1 font-semibold text-mara-orange underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-mara-orange"
              >
                Como chegar<span className="sr-only"> (abre o Google Maps em nova aba)</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </address>

            <div className={`flex flex-col items-start gap-3 p-6 ${cartao}`}>
              <MessageCircle className="text-mara-orange" size={24} aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-wider text-gray-400">WhatsApp</span>
              <span className="text-base text-gray-100">{TELEFONE_EXIBIDO}</span>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex min-h-11 items-center gap-1 font-semibold text-mara-orange underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-mara-orange"
              >
                Chamar agora<span className="sr-only"> (abre o WhatsApp em nova aba)</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <div className={`flex flex-col items-start gap-3 p-6 ${cartao}`}>
              <Clock className="text-mara-orange" size={24} aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Aula experimental</span>
              <span className="text-base leading-relaxed text-gray-100">
                Gratuita, com 30 a 45 minutos e sem compromisso.
              </span>
              <a
                href="#agendamentos"
                className="mt-auto inline-flex min-h-11 items-center gap-1 font-semibold text-mara-orange underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-mara-orange"
              >
                Agendar<ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </Secao>

        {/* ---------- FORMULÁRIO ---------- */}
        <Contact defaultInstrument={c.instrumento} />

        <SocialButtons />
      </main>

      <Footer />
    </>
  );
}

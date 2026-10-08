import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  Clock,
  CreditCard,
  FileSignature,
  GraduationCap,
  History,
  MapPin,
  MessageCircle,
  Music,
  Smartphone,
  Sparkles,
  UserRound,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Contact from "../../components/sections/Contact";
import SocialButtons from "../../components/layout/SocialButtons";
import HeroMedia from "./components/HeroMedia";
import VideoCarousel from "./components/VideoCarousel";
import YouTubeFacade from "./components/YouTubeFacade";
import {
  ENDERECO,
  LINK_MAPA,
  LINK_WHATSAPP,
  PAGE_URL,
  SITE_URL,
  TELEFONE_EXIBIDO,
  YOUTUBE_ID,
  diferenciais,
  galeria,
  passos,
  perguntas,
  portalRecursos,
  professores,
  videosAlunos,
} from "./data";

/* ---------- Dados estruturados ---------- */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "@id": `${PAGE_URL}#curso`,
      name: "Aulas de Piano",
      description:
        "Aulas individuais de piano, do erudito ao popular, para iniciantes e alunos avançados, de crianças a adultos, no Estúdio Musical Mara Passos, na Lapa, em São Paulo.",
      url: PAGE_URL,
      inLanguage: "pt-BR",
      educationalLevel: "Iniciante ao avançado",
      coursePrerequisites: "Nenhum. Não é preciso ter tocado antes.",
      provider: {
        "@type": "MusicSchool",
        "@id": SITE_URL,
        name: "Estúdio Musical Mara Passos",
        url: SITE_URL,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        instructor: professores.map((p) => ({ "@type": "Person", name: p.nome })),
        location: {
          "@type": "Place",
          name: "Estúdio Musical Mara Passos",
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
      "@id": `${PAGE_URL}#faq`,
      mainEntity: perguntas.map((p) => ({
        "@type": "Question",
        name: p.pergunta,
        acceptedAnswer: { "@type": "Answer", text: p.resposta },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Cursos", item: `${SITE_URL}/cursos` },
        { "@type": "ListItem", position: 3, name: "Aulas de Piano", item: PAGE_URL },
      ],
    },
  ],
};

/* ---------- Peças de layout ---------- */

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

const fatos = [
  { icone: MapPin, texto: "Presencial na Lapa" },
  { icone: UserRound, texto: "Aulas individuais" },
  { icone: Music, texto: "Do erudito ao popular" },
  { icone: GraduationCap, texto: "Do iniciante ao avançado" },
] as const;

const beneficios = [
  { icone: Brain, texto: "Estimula o foco" },
  { icone: Music, texto: "Para todas as idades" },
  { icone: CircleCheck, texto: "Bem-estar mental" },
] as const;

const iconesPortal = [CalendarDays, History, CreditCard, FileSignature] as const;

export default function AulasDePiano() {
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
          <HeroMedia />

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
                  Aulas de piano
                </li>
              </ol>
            </nav>

            <h1
              id="hero-titulo"
              className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight drop-shadow-lg md:text-7xl"
            >
              Aulas de Piano na <span className="text-mara-orange">Lapa</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-200 drop-shadow-md md:text-xl">
              Aprenda piano com uma metodologia que respeita seu tempo. Do iniciante ao avançado,
              no Estúdio Mara Passos você encontra o ambiente ideal para evoluir.
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
                href="#espaco"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-mara-orange hover:text-mara-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Conhecer o estúdio
              </a>
            </div>

            <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
              {fatos.map(({ icone: Icone, texto }) => (
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
        <Secao
          id="diferenciais"
          rotulo="Nosso curso"
          titulo="Por que aprender piano no Estúdio Mara Passos"
        >
          <div className="reveal grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="group relative">
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl ring-1 ring-white/10">
                <YouTubeFacade
                  id={YOUTUBE_ID}
                  titulo="Aulas de piano no Estúdio Mara Passos"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 bg-mara-orange/10 opacity-50 blur-[60px] transition-opacity duration-500 group-hover:opacity-70"
              />
            </div>

            <ul className="grid gap-5">
              {diferenciais.map((item) => (
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
          titulo="Como começar suas aulas de piano"
          intro="Do primeiro contato à primeira música, em três passos simples."
        >
          <ol className="grid gap-6 md:grid-cols-3">
            {passos.map((passo, i) => (
              <li
                key={passo.titulo}
                className={`reveal relative p-8 ${cartao}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-mara-orange/15 text-xl font-bold text-mara-orange ring-1 ring-mara-orange/30"
                >
                  {i + 1}
                </span>
                <h3 className="mb-3 text-xl font-bold">{passo.titulo}</h3>
                <p className="text-base leading-relaxed text-gray-300">{passo.texto}</p>
              </li>
            ))}
          </ol>
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
        <Secao
          id="professores-de-piano"
          rotulo="Equipe"
          titulo="Professores de piano"
          intro="Aulas conduzidas por Mara e Amanda, com formação em piano e o cuidado de quem ensina com acolhimento."
        >
          <ul className="grid gap-6 xl:grid-cols-2">
            {professores.map((prof, i) => (
              <li
                key={prof.nome}
                className="reveal group flex overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-colors hover:border-mara-orange/40"
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="relative aspect-[3/4] w-36 shrink-0 overflow-hidden sm:w-52 lg:w-64">
                  <Image
                    src={prof.foto}
                    alt={`${prof.nome}, ${prof.papel.toLowerCase()} do Estúdio Mara Passos`}
                    fill
                    sizes="(max-width: 640px) 144px, (max-width: 1024px) 208px, 256px"
                    className="object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-8">
                  <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">{prof.nome}</h3>
                  <p className="mt-1 text-sm font-semibold text-mara-orange">{prof.papel}</p>
                  <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">{prof.bio}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="reveal mt-10 text-center">
            <Link
              href="/professores"
              className="inline-flex items-center gap-2 text-base font-semibold text-gray-200 underline decoration-mara-orange decoration-2 underline-offset-8 transition-colors hover:text-mara-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mara-orange"
            >
              Conheça toda a equipe
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
        </Secao>

        {/* ---------- PORTAL DO ALUNO ---------- */}
        <section
          id="portal-do-aluno"
          aria-labelledby="portal-titulo"
          className="reveal mb-28 w-full scroll-mt-28 px-4 md:mb-36"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-mara-orange/20 bg-gradient-to-br from-neutral-900 to-[#140d0a] p-8 shadow-2xl md:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-mara-orange/10 blur-[100px]"
            />

            <div className="relative z-10 flex flex-col items-center gap-12 lg:flex-row">
              <div className="w-full space-y-8 lg:w-1/2">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-200">
                  <Smartphone size={16} className="text-mara-orange" aria-hidden="true" />
                  Tecnologia exclusiva
                </p>

                <h2
                  id="portal-titulo"
                  className="text-balance text-3xl font-bold leading-tight md:text-4xl"
                >
                  Seu aprendizado na <span className="text-mara-orange">palma da mão</span>
                </h2>

                <p className="text-lg leading-relaxed text-gray-300">
                  Diga adeus às confusões de agenda pelo WhatsApp. Nossos alunos têm acesso a um{" "}
                  <strong className="text-white">Portal exclusivo</strong> para gerenciar 100% da
                  jornada musical com autonomia e transparência.
                </p>

                <ul className="grid gap-5 pt-2 sm:grid-cols-2">
                  {portalRecursos.map((item, i) => {
                    const Icone = iconesPortal[i];
                    return (
                      <li key={item.titulo} className="flex items-start gap-4">
                        <span className="shrink-0 rounded-lg bg-mara-orange/20 p-2">
                          <Icone className="text-mara-orange" size={20} aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="mb-1 text-sm font-bold text-gray-100">{item.titulo}</h3>
                          <p className="text-sm leading-relaxed text-gray-300">{item.texto}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="group w-full lg:w-1/2">
                <div className="overflow-hidden rounded-2xl bg-neutral-950 shadow-2xl ring-1 ring-white/10 transition-transform duration-700 motion-safe:group-hover:-translate-y-2">
                  <div
                    aria-hidden="true"
                    className="flex h-8 items-center gap-2 border-b border-white/5 bg-neutral-900 px-4"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  {/* Abaixo da dobra: sem priority, o LCP é o herói. Proporção
                      3:2 reservada pelo width/height evita deslocamento. */}
                  <Image
                    src="/images/portal.webp"
                    alt="Painel do Portal do Aluno do Estúdio Mara Passos, com agenda de aulas e pagamentos"
                    width={1200}
                    height={800}
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FILOSOFIA ---------- */}
        <section
          aria-labelledby="filosofia-titulo"
          className="reveal mb-28 bg-gradient-to-b from-transparent via-mara-orange/5 to-transparent py-20 md:mb-36 md:py-24"
        >
          <div className="w-full px-4 text-center">
            <Sparkles className="mx-auto mb-6 text-mara-orange" size={36} aria-hidden="true" />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-mara-orange">
              Descubra o poder da música
            </p>
            <h2
              id="filosofia-titulo"
              className="mb-8 text-balance text-3xl font-extrabold tracking-tight md:text-5xl"
            >
              Piano para todas as idades
            </h2>
            <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-200">
              A alma do Estúdio Mara Passos é provar que{" "}
              <span className="font-semibold text-mara-orange">a música é para todas as idades</span>.
              Mais do que tocar um instrumento, aprender piano estimula conexões neurais profundas,
              melhora a concentração e contribui para o desenvolvimento cerebral.
            </p>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-base font-medium text-gray-200">
              {beneficios.map(({ icone: Icone, texto }) => (
                <li key={texto} className="flex items-center gap-2">
                  <Icone className="text-mara-orange" size={22} aria-hidden="true" />
                  {texto}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- VÍDEOS DOS ALUNOS ---------- */}
        <section
          id="alunos"
          aria-labelledby="alunos-titulo"
          className="reveal relative mb-28 w-full scroll-mt-28 md:mb-36"
        >
          <div className="mb-12 w-full px-4 text-center">
            <h2 id="alunos-titulo" className="mb-4 text-balance text-3xl font-bold md:text-5xl">
              A evolução dos nossos alunos
            </h2>
            <p className="text-lg leading-relaxed text-gray-300">
              Veja na prática os resultados da nossa metodologia com alunos reais.
            </p>
          </div>
          <VideoCarousel videos={videosAlunos} />
        </section>

        {/* ---------- O ESTÚDIO ---------- */}
        <Secao
          id="espaco"
          rotulo="O espaço"
          titulo="Conheça nosso estúdio na Lapa"
          intro="Ambiente climatizado, acústico e equipado com bons instrumentos para o seu aprendizado."
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {galeria.map((foto, i) => (
              <li
                key={foto.src}
                className="reveal group relative aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-900 shadow-lg"
                style={{ "--i": i % 3 } as React.CSSProperties}
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                />
              </li>
            ))}
          </ul>
        </Secao>

        {/* ---------- FAQ ---------- */}
        <Secao
          id="faq"
          rotulo="Dúvidas"
          titulo="Perguntas frequentes sobre aulas de piano"
          intro="Tudo o que você precisa saber para dar o primeiro passo sem receios."
        >
          <div className="grid gap-4">
            {perguntas.map((item, i) => (
              <details
                key={item.pergunta}
                className={`reveal group ${cartao} open:border-mara-orange/30 open:bg-white/[0.07]`}
                style={{ "--i": i % 4 } as React.CSSProperties}
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 text-left text-lg font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mara-orange md:px-7 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold">{item.pergunta}</h3>
                  <ChevronDown
                    className="shrink-0 text-mara-orange transition-transform duration-300 group-open:rotate-180"
                    size={24}
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-6 text-base leading-relaxed text-gray-300 md:px-7">
                  {item.resposta}
                </p>
              </details>
            ))}
          </div>
        </Secao>

        {/* ---------- ONDE FICA ---------- */}
        <Secao
          id="como-chegar"
          rotulo="Localização"
          titulo="Aulas de piano na Lapa, em São Paulo"
          intro="Venha conhecer as salas, o piano e os professores antes de decidir."
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
                href={LINK_WHATSAPP}
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
        <Contact defaultInstrument="Piano" />

        <SocialButtons />
      </main>

      <Footer />
    </>
  );
}

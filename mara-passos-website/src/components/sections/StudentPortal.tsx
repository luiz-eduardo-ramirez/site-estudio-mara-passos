"use client";

import { useRef } from "react";
import Image from "next/image";
import Reveal from "../layout/Reveal";
import { gsap, useGSAP } from "../../lib/gsap";
import {
  CalendarDays,
  Smartphone,
  CreditCard,
  FileSignature,
  History,
  ClipboardCheck,
  Mail,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

type Recurso = {
  icon: LucideIcon;
  title: string;
  desc: string;
  destaque?: boolean;
};

const recursos: Recurso[] = [
  { icon: CalendarDays, title: "Agenda Inteligente", desc: "Visualize suas aulas em lista ou calendário, sempre à mão.", destaque: true },
  { icon: History, title: "Reagendamentos", desc: "Cancele ou remarque com 24h de antecedência, sem depender da secretaria." },
  { icon: CreditCard, title: "Pagamento Facilitado", desc: "Pague via Pix e consulte todo o seu histórico financeiro na hora." },
  { icon: ClipboardCheck, title: "Controle de Frequência", desc: "Acompanhe presenças e faltas de cada aula em tempo real.", destaque: true },
  { icon: Mail, title: "Mensageria por E-mail", desc: "Lembretes, avisos e confirmações direto na sua caixa de entrada." },
  { icon: BookOpen, title: "Materiais Didáticos", desc: "Partituras, exercícios e apostilas para baixar quando quiser.", destaque: true },
  { icon: FileSignature, title: "Contratos Digitais", desc: "Segurança jurídica gerada pelo próprio sistema, sem papelada." },
];

const TOPO_BASE = 110; // folga do cabeçalho fixo
const DEGRAU = 16; // quanto cada painel repousa mais abaixo (deixa a borda do anterior à mostra)

/*
 * Portal do aluno — painéis que se empilham com o scroll.
 *
 * Cada recurso é um painel "sticky" que, ao rolar, fixa no topo; o próximo sobe
 * e o cobre, de modo que os painéis se acumulam como um baralho. Cada um repousa
 * um degrau mais abaixo (DEGRAU), então a borda colorida do anterior fica à
 * mostra — a sobreposição em camadas da referência.
 *
 * O GSAP dá o acabamento: conforme um painel é coberto pelo seguinte, ele encolhe
 * e escurece um pouco (profundidade). O progresso vem da posição real do próximo
 * painel na tela (lida no scroll; a Lenis move o scrollTop real, então o mesmo
 * listener serve com ou sem rolagem suave). Em prefers-reduced-motion não há
 * encolhimento — os painéis só se empilham.
 */
export default function StudentPortal() {
  const pilhaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pilha = pilhaRef.current;
      if (!pilha) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const paineis = Array.from(pilha.querySelectorAll<HTMLElement>("[data-painel]"));

      const atualizar = () => {
        for (let i = 0; i < paineis.length; i++) {
          const proximo = paineis[i + 1];
          if (!proximo) {
            gsap.set(paineis[i], { scale: 1, filter: "brightness(1)" });
            continue;
          }
          const repousoProximo = TOPO_BASE + (i + 1) * DEGRAU;
          const topoProximo = proximo.getBoundingClientRect().top;
          const alcance = window.innerHeight - repousoProximo;
          const prog =
            alcance > 0 ? gsap.utils.clamp(0, 1, (window.innerHeight - topoProximo) / alcance) : 0;
          gsap.set(paineis[i], {
            scale: 1 - prog * 0.07,
            filter: `brightness(${1 - prog * 0.35})`,
            transformOrigin: "50% 0%",
          });
        }
      };

      atualizar();
      window.addEventListener("scroll", atualizar, { passive: true });
      window.addEventListener("resize", atualizar);
      return () => {
        window.removeEventListener("scroll", atualizar);
        window.removeEventListener("resize", atualizar);
      };
    },
    { scope: pilhaRef },
  );

  return (
    <section id="portal-do-aluno" className="mx-auto my-28 max-w-2xl px-6">
      {/* Intro */}
      <Reveal stagger mask cine className="mb-12 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm font-semibold text-gray-200">
          <Smartphone size={16} className="text-mara-orange" />
          <span className="text-xs font-bold uppercase tracking-wider">Tecnologia Exclusiva</span>
        </div>
        <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl">
          Seu aprendizado na <span className="text-mara-orange">palma da mão</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-300">
          Nossos alunos têm um <strong>Portal Exclusivo</strong> para gerenciar 100% da jornada
          musical. Role e veja tudo o que ele faz por você.
        </p>
      </Reveal>

      {/* Pilha de painéis */}
      <div ref={pilhaRef} className="relative flex flex-col gap-5 pb-[12vh]">
        {recursos.map((r, i) => (
          <div
            key={r.title}
            data-painel
            style={{ top: `${TOPO_BASE + i * DEGRAU}px`, zIndex: i + 1 }}
            className={`sticky flex min-h-[7rem] items-center gap-4 overflow-hidden rounded-2xl border p-5 shadow-2xl will-change-transform md:gap-5 md:p-6 ${
              r.destaque
                ? "border-orange-300/30 bg-gradient-to-br from-mara-orange to-orange-600 text-white"
                : "border-white/10 bg-gradient-to-br from-neutral-800 to-[#15110e] text-white"
            }`}
          >
            {/* Número grande ao fundo */}
            <span className="pointer-events-none absolute -right-2 -top-3 text-6xl font-black tabular-nums text-white/10">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span
              className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                r.destaque ? "bg-white/20 text-white" : "bg-mara-orange/15 text-mara-orange"
              }`}
            >
              <r.icon size={20} />
            </span>

            <div className="relative">
              <h3 className="text-base font-bold md:text-lg">{r.title}</h3>
              <p className={`mt-1 text-sm leading-relaxed ${r.destaque ? "text-white/85" : "text-gray-400"}`}>
                {r.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Painel final: o mockup do sistema fecha a pilha */}
        <div
          data-painel
          style={{ top: `${TOPO_BASE + recursos.length * DEGRAU}px`, zIndex: recursos.length + 1 }}
          className="sticky overflow-hidden rounded-2xl border border-mara-orange/25 bg-neutral-950 shadow-2xl will-change-transform"
        >
          <div className="flex h-9 items-center gap-2 border-b border-white/5 bg-neutral-900 px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
          <Image
            src="/images/portal.webp"
            alt="Dashboard do Portal do Aluno Estúdio Mara Passos"
            width={1200}
            height={800}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

/**
 * Seletor de curso do formulário de agendamento.
 *
 * Substitui o <select> nativo, cuja lista aberta não aceita estilo nem
 * animação: é o sistema que a desenha (branca no Windows, roleta no iOS).
 * Aqui a lista é nossa — fundo escuro, texto laranja e uma abertura suave.
 *
 * Segue o padrão "select-only combobox" do WAI-ARIA: o foco fica sempre no
 * botão e a opção destacada é anunciada por aria-activedescendant. Teclado:
 * setas, Home/End, Enter/Espaço para escolher, Esc para fechar e letras para
 * pular até o curso que começa com elas (como no select nativo).
 *
 * O valor viaja num <input type="hidden" name={name}>, então o FormData do
 * formulário continua lendo "instrumento" como antes. Como um campo oculto
 * não participa da validação nativa, quem confere se há curso escolhido é o
 * onSubmit do formulário, que liga `invalid` aqui.
 */
type Props = {
  id: string;
  name: string;
  options: string[];
  value: string;
  onChange: (valor: string) => void;
  placeholder?: string;
  invalid?: boolean;
  /** Muda a cada tentativa de envio inválida: abre a lista e foca o botão. */
  openSignal?: number;
};

// Compara sem acento e sem caixa, para "v" achar "Violão" e "u" achar "Ukelelê".
const normalizar = (t: string) =>
  t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function CourseSelect({
  id,
  name,
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  invalid = false,
  openSignal = 0,
}: Props) {
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState(-1);
  const [paraCima, setParaCima] = useState(false);
  const raizRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const listaRef = useRef<HTMLUListElement>(null);
  const busca = useRef<{ texto: string; timer?: ReturnType<typeof setTimeout> }>({ texto: "" });
  const listaId = useId();
  const idOpcao = (i: number) => `${listaId}-op-${i}`;

  const indiceSelecionado = options.indexOf(value);

  const abrir = (indice = indiceSelecionado >= 0 ? indiceSelecionado : 0) => {
    // Abre para cima quando falta espaço abaixo do botão (fim da tela no
    // celular) e sobra acima; a lista tem até 288px (max-h-72) + a folga.
    const caixa = botaoRef.current?.getBoundingClientRect();
    if (caixa) {
      const abaixo = window.innerHeight - caixa.bottom;
      setParaCima(abaixo < 300 && caixa.top > abaixo);
    }
    setAtivo(indice);
    setAberto(true);
  };

  const fechar = () => setAberto(false);

  const escolher = (i: number) => {
    if (i < 0 || i >= options.length) return;
    onChange(options[i]);
    fechar();
  };

  // Fecha ao clicar fora.
  useEffect(() => {
    if (!aberto) return;
    const aoTocar = (e: PointerEvent) => {
      if (!raizRef.current?.contains(e.target as Node)) fechar();
    };
    document.addEventListener("pointerdown", aoTocar);
    return () => document.removeEventListener("pointerdown", aoTocar);
  }, [aberto]);

  // Envio sem curso: abre a lista e devolve o foco ao botão.
  useEffect(() => {
    if (!openSignal) return;
    botaoRef.current?.focus();
    abrir();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSignal]);

  // Mantém a opção destacada à vista dentro da lista. Mexe só no scrollTop
  // da lista — scrollIntoView arrastaria a página junto.
  useEffect(() => {
    const lista = listaRef.current;
    const item = lista?.children[ativo] as HTMLElement | undefined;
    if (!aberto || !lista || !item) return;
    const topo = item.offsetTop;
    const base = topo + item.offsetHeight;
    if (topo < lista.scrollTop) lista.scrollTop = topo - 6;
    else if (base > lista.scrollTop + lista.clientHeight) {
      lista.scrollTop = base - lista.clientHeight + 6;
    }
  }, [ativo, aberto]);

  // Ao abrir, o curso já escolhido aparece no meio da lista, e não colado na
  // borda. Vem depois do efeito acima para prevalecer sobre ele.
  useEffect(() => {
    const lista = listaRef.current;
    const item = lista?.children[ativo] as HTMLElement | undefined;
    if (!aberto || !lista || !item) return;
    lista.scrollTop = item.offsetTop - (lista.clientHeight - item.offsetHeight) / 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aberto]);

  const buscarPorLetra = (letra: string) => {
    clearTimeout(busca.current.timer);
    busca.current.texto += normalizar(letra);
    busca.current.timer = setTimeout(() => (busca.current.texto = ""), 600);

    const texto = busca.current.texto;
    const atual = aberto ? ativo : indiceSelecionado;
    // Uma letra só (ou a mesma repetida) pula para o PRÓXIMO curso com ela,
    // percorrendo "Flauta Doce" → "Flauta Transversal"; várias letras
    // diferentes refinam a busca a partir do curso atual.
    const repetida = [...texto].every((c) => c === texto[0]);
    const alvo = repetida ? texto[0] : texto;
    const inicio = repetida ? atual + 1 : Math.max(atual, 0);
    const ordem = [...options.keys()].map((k) => (k + inicio) % options.length);
    const achado = ordem.find((i) => normalizar(options[i]).startsWith(alvo));
    if (achado === undefined) return;
    if (aberto) setAtivo(achado);
    else onChange(options[achado]);
  };

  const aoTeclar = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const ultimo = options.length - 1;

    if (!aberto) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        abrir();
      } else if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        abrir(e.key === "Home" ? 0 : ultimo);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        buscarPorLetra(e.key);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setAtivo((i) => Math.min(i + 1, ultimo));
        break;
      case "ArrowUp":
        e.preventDefault();
        setAtivo((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setAtivo(0);
        break;
      case "End":
        e.preventDefault();
        setAtivo(ultimo);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        escolher(ativo);
        break;
      case "Escape":
        e.preventDefault();
        fechar();
        break;
      case "Tab":
        fechar();
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          buscarPorLetra(e.key);
        }
    }
  };

  return (
    <div ref={raizRef} className="relative">
      <input type="hidden" name={name} value={value} />

      <button
        ref={botaoRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={aberto}
        aria-controls={listaId}
        aria-required="true"
        aria-invalid={invalid || undefined}
        aria-activedescendant={aberto && ativo >= 0 ? idOpcao(ativo) : undefined}
        onClick={() => (aberto ? fechar() : abrir())}
        onKeyDown={aoTeclar}
        className={`w-full flex items-center justify-between gap-3 bg-white rounded-full px-5 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 transition-shadow
          ${invalid ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-mara-orange"}
          ${aberto ? "ring-2 ring-mara-orange" : ""}`}
      >
        <span className={`truncate ${value ? "text-black" : "text-gray-500"}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={20}
          aria-hidden="true"
          className={`shrink-0 text-mara-orange transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${aberto ? "rotate-180" : ""}`}
        />
      </button>

      {/*
        A lista fica sempre montada e só muda de estado, para que a transição
        corra nos dois sentidos. O visibility entra na transição de propósito:
        ao fechar ela só vira hidden no fim do fade, e enquanto fechada a lista
        sai da ordem de leitura e não recebe clique.

        data-lenis-prevent deixa a roda do mouse rolar a lista, e não a página
        (a Lenis intercepta a roda em todo o site). O onMouseDown impede que o
        clique numa opção tire o foco do botão.
      */}
      <ul
        ref={listaRef}
        id={listaId}
        role="listbox"
        aria-labelledby={id}
        tabIndex={-1}
        data-lenis-prevent
        onMouseDown={(e) => e.preventDefault()}
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(242,101,34,0.6) transparent" }}
        className={`absolute left-0 right-0 z-30 max-h-72 overflow-y-auto overscroll-contain rounded-2xl
          border border-mara-orange/30 bg-[#161616] p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.65)]
          transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          motion-reduce:transition-none
          ${paraCima ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top"}
          ${aberto
            ? "visible opacity-100 translate-y-0 scale-100"
            : `invisible pointer-events-none opacity-0 scale-[0.97] ${paraCima ? "translate-y-2" : "-translate-y-2"}`}`}
      >
        {options.map((opcao, i) => {
          const selecionado = opcao === value;
          const destacado = i === ativo;
          return (
            <li
              key={opcao}
              id={idOpcao(i)}
              role="option"
              aria-selected={selecionado}
              onMouseEnter={() => setAtivo(i)}
              onClick={() => escolher(i)}
              className={`flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 cursor-pointer
                font-semibold tracking-wide text-mara-orange transition-colors duration-150
                ${destacado ? "bg-mara-orange/15 text-[#ff8a4d]" : ""}
                ${selecionado ? "bg-mara-orange/20" : ""}`}
            >
              <span>{opcao}</span>
              {selecionado && <Check size={18} aria-hidden="true" className="shrink-0" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

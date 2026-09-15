import { PRIMARY_CTA, hrefFor } from "../../data/links";

/**
 * Conversão principal da página. Branco sobre #f26522 rende 3,15:1 de contraste,
 * razão que só satisfaz o WCAG AA na faixa de "texto grande" — definida como
 * 14pt bold, ou seja 18,66px. Daí os 19px em peso 700: abaixo disso o botão
 * reprovaria no critério 1.4.3.
 */
export default function PrimaryCta({ index }: { index: number }) {
  return (
    <a
      href={hrefFor(PRIMARY_CTA)}
      target="_blank"
      rel="noopener noreferrer"
      className="lt-rise group flex min-h-[60px] w-full items-center justify-center gap-2 rounded-full bg-mara-orange px-6 py-4 text-[19px] font-bold text-white shadow-[0_14px_36px_-14px_rgba(242,101,34,0.85)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#d4551a] hover:shadow-[0_18px_44px_-14px_rgba(242,101,34,0.95)] active:translate-y-0"
      style={{ "--i": index } as React.CSSProperties}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[18px] w-[18px]"
        aria-hidden="true"
      >
        <rect x="3.5" y="5" width="17" height="16" rx="3" />
        <path d="M3.5 10h17M8.5 3v4M15.5 3v4" />
      </svg>
      {PRIMARY_CTA.label}
    </a>
  );
}

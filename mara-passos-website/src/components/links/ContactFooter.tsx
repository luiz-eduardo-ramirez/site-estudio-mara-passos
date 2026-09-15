import { CONTACT, MAPS_URL } from "../../data/links";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-[15px] w-[15px] shrink-0 text-mara-orange",
  "aria-hidden": true as const,
};

export default function ContactFooter({ index }: { index: number }) {
  return (
    <footer
      className="lt-rise-view mt-12 flex flex-col items-center gap-5 text-center"
      style={{ "--i": index } as React.CSSProperties}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9ca3af]">
        Contato
      </p>

      {/* gap-1 porque cada link já carrega 44px de altura mínima de toque */}
      <ul className="flex flex-col items-center gap-1 text-[0.82rem] text-mara-text">
        <li>
          <a
            href={CONTACT.phoneHref}
            className="inline-flex min-h-[44px] items-center gap-2.5 px-3 transition-colors hover:text-mara-orange"
          >
            <svg {...iconProps}>
              <path d="M5 4h3.2l1.6 4-2 1.4a12 12 0 0 0 5.8 5.8l1.4-2 4 1.6V19a1.6 1.6 0 0 1-1.7 1.6A15.4 15.4 0 0 1 3.4 5.7 1.6 1.6 0 0 1 5 4Z" />
            </svg>
            {CONTACT.phone}
          </a>
        </li>
        <li>
          <a
            href={CONTACT.emailHref}
            className="inline-flex min-h-[44px] items-center gap-2.5 break-all px-3 transition-colors hover:text-mara-orange"
          >
            <svg {...iconProps}>
              <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
              <path d="m3.8 7 7.3 5.3a1.5 1.5 0 0 0 1.8 0L20.2 7" />
            </svg>
            {CONTACT.email}
          </a>
        </li>
        <li>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2.5 px-3 transition-colors hover:text-mara-orange"
          >
            <svg {...iconProps}>
              <path d="M20 10.2c0 5.1-6.4 10.3-8 10.3s-8-5.2-8-10.3a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.9" />
            </svg>
            {CONTACT.address}
          </a>
        </li>
      </ul>

      <p className="mt-2 max-w-[34ch] text-[0.66rem] leading-relaxed text-[#9ca3af]/80">
        © {new Date().getFullYear()} Estúdio Musical e Cultural Mara Passos
        <br />
        CNPJ {CONTACT.cnpj}
      </p>
    </footer>
  );
}

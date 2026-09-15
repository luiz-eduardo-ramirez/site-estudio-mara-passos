import Image from "next/image";

/**
 * O logo original traz os wordmarks "Estúdio musical e cultural" e "Mara Passos"
 * embutidos. Aqui usamos apenas o emblema recortado — o M de teclas de piano —
 * para que o nome possa ser composto em Playfair Display sem repetição visual.
 */
export default function ProfileHeader() {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="lt-rise relative" style={{ "--i": 0 } as React.CSSProperties}>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 scale-[1.6] rounded-full opacity-50 blur-2xl"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(242,101,34,0.28) 0%, rgba(242,101,34,0) 72%)",
          }}
        />
        <Image
          src="/links/emblem.webp"
          alt="Estúdio Musical e Cultural Mara Passos"
          width={96}
          height={96}
          priority
          className="h-24 w-24 rounded-2xl border border-white/12 object-cover shadow-[0_10px_40px_-12px_rgba(0,0,0,0.9)]"
        />
      </div>

      <p
        className="lt-rise mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-mara-orange"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        Estúdio Musical e Cultural
      </p>

      <h1
        className="lt-rise mt-2 font-[family-name:var(--font-playfair)] text-[41px] font-bold leading-[1.05] tracking-[-0.02em] text-white"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        Mara Passos
      </h1>

      <div
        className="lt-rise mt-5 h-px w-10 bg-mara-orange"
        style={{ "--i": 3 } as React.CSSProperties}
      />

      <p
        className="lt-rise mt-5 max-w-[30ch] text-[14px] leading-relaxed text-mara-text"
        style={{ "--i": 4 } as React.CSSProperties}
      >
        Escola de música com metodologia lúdica, curativa e acolhedora.
      </p>
    </header>
  );
}

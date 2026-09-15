import type { IconName } from "../../data/links";

type Props = { name: IconName; className?: string };

export default function Icon({ name, className }: Props) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  if (name === "instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <rect x="3" y="3" width="18" height="18" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M14.5 8.5V6.9c0-.75.17-1.13 1.33-1.13h1.42V3.1A19 19 0 0 0 15.1 3c-2.1 0-3.5 1.28-3.5 3.63V8.5H9.2v2.9h2.4V21h3.1v-9.6h2.42l.36-2.9H14.5Z" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path
        d="M20 10.2c0 5.1-6.4 10.3-8 10.3s-8-5.2-8-10.3a8 8 0 1 1 16 0Z"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.9" />
    </svg>
  );
}

export function Chevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

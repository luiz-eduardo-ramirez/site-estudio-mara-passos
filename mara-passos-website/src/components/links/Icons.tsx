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

  if (name === "google") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M21.35 11.1H12.18v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.19-7.27 3.1 0 4.91 1.97 4.91 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z" />
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

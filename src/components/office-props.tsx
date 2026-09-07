type Agent = "claude" | "chatgpt";
type PropProps = { className?: string };

const ink = "#737568";

export function OfficeDesk({
  agent,
  className,
}: PropProps & { agent: Agent }) {
  const accent = agent === "claude" ? "#ac704d" : "#517a60";
  const screen = agent === "claude" ? "#efcfad" : "#c3d8bc";

  return (
    <svg
      viewBox="0 0 130 100"
      width="130"
      height="100"
      className={className}
      fill="none"
      stroke={ink}
      strokeWidth="1"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="65" cy="88" rx="49" ry="7" fill="#697357" opacity=".06" stroke="none" />
      {/* Head-on perspective: the near edge faces the chair below the desk. */}
      <path d="M27 39v39h3V39M100 39v39h3V39" fill="#d1d2c4" />
      <path d="M15 66v26h4V66M111 66v26h4V66" fill="#d1d2c4" />
      <path d="M19 84h92" stroke="#b8bcb0" />
      <path d="M9 65h112v6H9Z" fill="#d8d4c0" />
      <path d="m24 36 82 0 15 29H9Z" fill="#ece8d8" />
      <path d="M14 63h102" stroke="#f8f8f2" />
      {/* Screen, stand, keyboard, and seated robot share the x=65 centerline. */}
      <path d="M61 42h8v11h-8Z" fill="#c9cbbd" />
      <path d="m55 51 20 0 5 5H50Z" fill="#dddccf" />
      <path d="m37 12 3-4h50l3 4v31l-3 3H40l-3-3Z" fill="#c5c7ba" />
      <path d="M37 12h56v31H37Z" fill="#e7e7db" />
      <path d="M43 17h44v20H43Z" fill={screen} stroke={accent} />
      <path d="m47 22 3 2-3 2m7 0h9" stroke={accent} strokeWidth="1.5" />
      <path data-terminal-code="1" d="M47 30h12m4 0h14" stroke={accent} />
      <path data-terminal-code="2" d="M47 33h6m4 0h10" stroke={accent} />
      <path data-terminal-cursor d="M73 32h4v3h-4Z" fill={accent} stroke="none" />
      <path d="M82 40h4" stroke={accent} />
      {/* The keyboard's long edge is parallel to the worker's shoulders. */}
      <path d="m45 57 40 0 5 7H40Z" fill="#f8f8f2" />
      <path d="M46 59h38m-40 3h42m-35-4v3m6-3v3m6-3v3m6-3v3m6-3v3m6-3v3" stroke="#b2b6a7" />
      <path d="m93 49 12 0 6 11H97Z" fill="#f8f8f2" />
      <path d="M93 49h3l5 11h-4Z" fill={accent} stroke="none" />
      <path d="M98 52h6m-4 3h6" stroke="#bec0b3" />
      <path d="M31 49h3c4 0 4 5 0 5h-2" />
      <path d="M24 48v8c0 3 8 3 8 0v-8" fill="#f8f8f2" />
      <ellipse cx="28" cy="48" rx="4" ry="2" fill="#f8f8f2" />
      <path d="M26 48h4" stroke={accent} />
    </svg>
  );
}

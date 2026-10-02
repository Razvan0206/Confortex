import logo from "@/content/logo.json";

// Vector redraw of the client's 223x40 px PNG logo (scripts/build-logo.py): same snowflake and wordmark, crisp at any size.
// ponytail: a redraw, not the client's master file; Arimo letterforms approximate the original lettering. Upgrade: swap in the vector master when the client sends it.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${logo.w} ${logo.h}`} role="img" aria-label="Confortex" className={className}>
      <path d={logo.flake} fill="none" stroke="currentColor" strokeWidth="2.1" />
      <path d={logo.white} fill="currentColor" />
      <path d={logo.red} fill="var(--color-brand)" />
    </svg>
  );
}

import type { ReactNode } from "react";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export const btnGhostLight =
  "inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/60 px-7 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary";
export const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-full border border-primary px-7 py-4 text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground";

export function SectionHead({ eyebrow, title, text, light }: { eyebrow: string; title: ReactNode; text?: string; light?: boolean }) {
  return (
    <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-3xl">
        <p className={`eyebrow ${light ? "text-sand" : "text-accent"}`}>{eyebrow}</p>
        <h2 className={`display mt-4 text-4xl md:text-6xl ${light ? "text-primary-foreground" : "text-primary"}`}>{title}</h2>
      </div>
      {text && <p className={`max-w-sm ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{text}</p>}
    </div>
  );
}

export function EmptyPanel({ title, text, children }: { title: string; text: string; children?: ReactNode }) {
  return (
    <div className="reveal mt-12 flex flex-col items-start gap-6 border border-border bg-card p-8 md:flex-row md:items-center md:justify-between md:p-12">
      <div className="max-w-xl">
        <p className="display text-2xl text-primary md:text-3xl">{title}</p>
        <p className="mt-3 text-muted-foreground">{text}</p>
      </div>
      {children}
    </div>
  );
}

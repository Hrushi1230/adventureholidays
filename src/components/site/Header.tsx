import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { exploreNav, nav } from "@/lib/site";

export function Header({ solidAlways = false }: { solidAlways?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = solidAlways || scrolled || open;
  const tone = solid ? "text-foreground" : "text-primary-foreground";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "bg-background/90 py-3 shadow-soft backdrop-blur-md" : "py-5 md:py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="/#home" className={`flex shrink-0 flex-col leading-none ${solid ? "text-primary" : "text-primary-foreground"}`}>
          <span className="display text-xl md:text-2xl">Adventure</span>
          <span className="eyebrow mt-1 text-[0.6rem] text-accent">Holiday</span>
        </a>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className={`flex gap-7 text-sm font-medium ${tone}`}>
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} className="py-1 transition-colors hover:text-accent">{n.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className={`hidden items-center gap-1 border-l pl-4 xl:flex ${solid ? "border-border" : "border-primary-foreground/30"}`}>
            {exploreNav.map((n) => (
              <a key={n.href} href={n.href} className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:text-accent ${tone}`}>{n.label}</a>
            ))}
          </div>
          <a href="/#plan" className="hidden rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex">
            Plan Your Tour
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className={`grid h-11 w-11 place-items-center rounded-full xl:hidden ${solid ? "text-primary" : "text-primary-foreground"}`}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="animate-fade fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto bg-background px-6 pb-10 pt-6 xl:hidden">
          <p className="eyebrow text-[0.6rem] text-muted-foreground">Main</p>
          <ul className="mt-2">
            {nav.map((n, i) => (
              <li key={n.href} className="animate-rise" style={{ animationDelay: `${i * 40}ms` }}>
                <a href={n.href} onClick={() => setOpen(false)} className="display block border-b border-border py-3 text-2xl text-primary">{n.label}</a>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-8 text-[0.6rem] text-muted-foreground">Explore</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {exploreNav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border border-border bg-card px-4 py-4 text-sm font-semibold text-primary">{n.label}</a>
            ))}
          </div>
          <a href="/#plan" onClick={() => setOpen(false)} className="mt-8 flex w-full justify-center rounded-full bg-accent py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground">
            Plan Your Tour
          </a>
        </div>
      )}
    </header>
  );
}

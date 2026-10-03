import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";

export function Header() {
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
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-background/85 py-3 shadow-soft backdrop-blur-md" : "py-5 md:py-7"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#home" className={`flex flex-col leading-none ${solid ? "text-primary" : "text-primary-foreground"}`}>
          <span className="display text-xl md:text-2xl">Adventure</span>
          <span className="eyebrow mt-1 text-[0.6rem] text-accent">Holiday</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className={`flex gap-9 text-sm font-semibold ${solid ? "text-foreground" : "text-primary-foreground"}`}>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="relative py-1 transition-colors hover:text-accent">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Plan Your Trip
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${solid ? "text-primary" : "text-primary-foreground"}`}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade fixed inset-x-0 bottom-0 top-[68px] bg-background px-6 pt-8 lg:hidden">
          <ul className="space-y-1">
            {nav.map((n, i) => (
              <li key={n.href} className="animate-rise" style={{ animationDelay: `${i * 50}ms` }}>
                <a href={n.href} onClick={() => setOpen(false)} className="display block border-b border-border py-4 text-3xl text-primary">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 flex w-full justify-center rounded-full bg-accent py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground"
          >
            Plan Your Trip
          </a>
        </div>
      )}
    </header>
  );
}

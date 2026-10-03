import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { exploreNav, nav } from "@/lib/site";
import logo from "@/assets/adventure-holiday-logo.png.asset.json";
import { Button } from "@/components/ui/button";

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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : previousOverflow;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = solidAlways || scrolled || open;
  const tone = solid && !open ? "text-foreground" : "text-primary-foreground";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${open ? "bg-primary py-3" : solid ? "bg-background/90 py-3 shadow-soft backdrop-blur-md" : "py-5 md:py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="/#home" aria-label="Adventure Holiday home" className={`flex shrink-0 items-center gap-3 ${solid && !open ? "text-primary" : "text-primary-foreground"}`}>
          <img src={logo.url} alt="Adventure Holiday logo" width={48} height={48} className="h-11 w-11 md:h-12 md:w-12" />
          <span className="display whitespace-nowrap text-lg leading-none sm:inline xl:hidden 2xl:inline">Adventure Holiday</span>
        </a>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className={`flex gap-5 whitespace-nowrap text-sm font-medium 2xl:gap-7 ${tone}`}>
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} className="py-1 transition-colors hover:text-accent">{n.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className={`hidden items-center gap-1 border-l pl-4 xl:flex ${solid ? "border-border" : "border-primary-foreground/30"}`}>
            {exploreNav.map((n) => (
              <a key={n.href} href={n.href} className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:text-accent ${tone}`}>{n.label}</a>
            ))}
          </div>
          <a href="/#plan" className="hidden whitespace-nowrap rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex">
            Plan Your Tour
          </a>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className={`h-11 w-11 rounded-full xl:hidden ${solid && !open ? "text-primary hover:bg-primary/10 hover:text-primary" : "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="animate-fade fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto bg-primary text-primary-foreground xl:hidden">
          <div className="mx-auto flex min-h-full max-w-3xl flex-col px-5 pb-8 pt-6 sm:px-8 sm:pt-10">
            <div className="flex items-center gap-3 border-b border-primary-foreground/20 pb-4">
              <span className="h-px w-8 bg-accent" />
              <p className="eyebrow text-[0.6rem] text-sand">Explore Adventure Holiday</p>
            </div>

            <nav aria-label="Mobile primary" className="mt-2">
              <ul>
                {nav.map((n, i) => (
                  <li key={n.href} className="animate-rise" style={{ animationDelay: `${i * 45}ms` }}>
                    <a href={n.href} onClick={() => setOpen(false)} className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-2 border-b border-primary-foreground/15 py-3.5 sm:py-4">
                      <span className="text-[0.62rem] font-bold text-sand">{String(i + 1).padStart(2, "0")}</span>
                      <span className="display min-w-0 text-[1.65rem] leading-none sm:text-3xl">{n.label}</span>
                      <ArrowRight className="h-4 w-4 text-sand transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {exploreNav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="group border border-primary-foreground/25 p-4 transition-colors hover:bg-primary-foreground/10">
                  <span className="eyebrow block text-[0.55rem] text-sand">Experience</span>
                  <span className="mt-2 flex items-center justify-between gap-2 text-sm font-semibold">
                    {n.label}<ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>

            <a href="/#plan" onClick={() => setOpen(false)} className="mt-5 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-accent px-6 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:-translate-y-0.5">
              Plan Your Tour <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-5 text-center text-xs text-primary-foreground/60">Domestic &amp; International Tours · From Bhubaneswar</p>
          </div>
        </div>
      )}
    </header>
  );
}

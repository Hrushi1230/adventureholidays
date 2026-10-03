import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import { images } from "@/lib/site";
import { formatTourDateRange, getFeaturedUpcomingTour, statusLabel, tourWhatsappHref, type Tour } from "@/lib/tours";

const KEY = (t: Tour) => `ah-tour-spotlight-dismissed:${t.id}`;
const DAY = 24 * 60 * 60 * 1000;
const SHOW_DELAY = 1000;
const EXIT_MS = 500;

function wasDismissed(t: Tour) {
  try {
    const at = Number(localStorage.getItem(KEY(t)));
    return Number.isFinite(at) && at > 0 && Date.now() - at < DAY;
  } catch {
    return false;
  }
}

/** Homepage-only, non-modal reminder for the featured/nearest upcoming departure. */
export function UpcomingTourSpotlight({ tour = getFeaturedUpcomingTour() }: { tour?: Tour }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!tour || wasDismissed(tour)) return;
    const t = window.setTimeout(() => {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    }, SHOW_DELAY);
    return () => window.clearTimeout(t);
  }, [tour]);

  // Hide floating call/WhatsApp buttons on phones while visible.
  useEffect(() => {
    const root = document.documentElement;
    if (mounted) root.dataset["spotlight"] = "open";
    return () => { delete root.dataset["spotlight"]; };
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function dismiss() {
    if (!tour) return;
    try { localStorage.setItem(KEY(tour), String(Date.now())); } catch { /* ignore */ }
    setOpen(false);
    window.setTimeout(() => setMounted(false), EXIT_MS);
  }

  if (!tour || !mounted) return null;

  const soldOut = tour.status === "sold-out";
  const date = formatTourDateRange(tour);
  const meta = [tour.duration, tour.departureFrom && `From ${tour.departureFrom}`].filter(Boolean).join(" · ");

  return (
    <aside
      aria-label="Upcoming tour"
      data-state={open ? "open" : "closed"}
      className="fixed inset-x-3 z-50 max-h-[58svh] overflow-y-auto rounded-2xl border border-border bg-card text-card-foreground shadow-soft transition-[opacity,transform] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] data-[state=closed]:translate-y-[110%] data-[state=closed]:opacity-0 motion-reduce:!translate-y-0 motion-reduce:!scale-100 sm:inset-x-4 md:inset-x-auto md:right-8 md:!bottom-24 md:max-h-none md:w-[420px] 2xl:w-[560px] md:overflow-hidden md:data-[state=closed]:translate-y-[18px] md:data-[state=closed]:scale-[0.98]"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 0.875rem)" }}
    >
      <div className="flex flex-col md:flex-row">
        <img src={tour.coverImage ?? images.hero} alt="" loading="lazy" className="h-36 w-full object-cover md:hidden 2xl:block 2xl:h-auto 2xl:w-44 2xl:shrink-0" />
        <div className="relative flex-1 p-5 md:p-6">
          <button type="button" onClick={dismiss} aria-label="Dismiss upcoming tour" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <X className="h-4 w-4" />
          </button>
          <p className="eyebrow pr-10 text-[0.6rem] text-accent">Upcoming Departure</p>
          <h2 className="display mt-2 pr-8 text-2xl text-primary md:text-[1.7rem]">{tour.title}</h2>
          {(date || meta) && (
            <p className="mt-2 text-sm text-muted-foreground">{[date, meta].filter(Boolean).join(" · ")}</p>
          )}
          <span className={`mt-3 inline-block rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest ${soldOut ? "bg-muted text-muted-foreground" : "bg-accent text-accent-foreground"}`}>{statusLabel[tour.status]}</span>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            {!soldOut && (
              <Link to="/tours/$slug" params={{ slug: tour.slug }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-xs font-bold uppercase tracking-widest text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                View Tour Details <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <a href={tourWhatsappHref(tour)} target="_blank" rel="noopener noreferrer" className={soldOut
              ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-xs font-bold uppercase tracking-widest text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              : "inline-flex min-h-12 items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"}>
              <MessageCircle className="h-4 w-4" /> {soldOut ? "Ask About Next Departure" : "Enquire on WhatsApp"}
            </a>
          </div>
          {soldOut && (
            <Link to="/tours/$slug" params={{ slug: tour.slug }} className="mt-2 inline-block text-xs text-muted-foreground underline-offset-4 hover:underline">View tour details</Link>
          )}
        </div>
      </div>
    </aside>
  );
}

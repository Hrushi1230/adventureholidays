import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, MapPin, MessageCircle, X } from "lucide-react";
import { formatTourDateRange, getFeaturedUpcomingTour, inr, statusLabel, tourWhatsappHref, type Tour } from "@/lib/tours";

const KEY = (t: Tour) => `ah-tour-spotlight-dismissed:${t.id}`;
const DAY = 24 * 60 * 60 * 1000;
const SHOW_DELAY = 1000;
const EXIT_MS = 650;

function wasDismissed(t: Tour) {
  try {
    const at = Number(localStorage.getItem(KEY(t)));
    return Number.isFinite(at) && at > 0 && Date.now() - at < DAY;
  } catch {
    return false;
  }
}

function shortRange(t: Tour) {
  if (!t.startDate) return "";
  const s = new Date(t.startDate + "T00:00:00");
  const e = t.endDate ? new Date(t.endDate + "T00:00:00") : null;
  const m = (d: Date) => d.toLocaleDateString("en-GB", { month: "short" });
  if (!e) return `${s.getDate()} ${m(s)}`;
  return s.getMonth() === e.getMonth() ? `${s.getDate()}–${e.getDate()} ${m(e)}` : `${s.getDate()} ${m(s)} – ${e.getDate()} ${m(e)}`;
}
const shortDuration = (d?: string) => d?.replace(/(\d+)\s*Days?\s*\/\s*(\d+)\s*Nights?/i, "$1D/$2N");

type Phase = "hidden" | "open" | "closing";

/** Homepage-only hanging fabric banner for the featured/nearest upcoming departure. */
export function UpcomingTourSpotlight({ tour = getFeaturedUpcomingTour() }: { tour?: Tour }) {
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    if (!tour || wasDismissed(tour)) return;
    const t = window.setTimeout(() => setPhase("open"), SHOW_DELAY);
    return () => window.clearTimeout(t);
  }, [tour]);

  useEffect(() => {
    if (phase !== "open") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function dismiss() {
    if (!tour) return;
    try { localStorage.setItem(KEY(tour), String(Date.now())); } catch { /* ignore */ }
    setPhase("closing");
    window.setTimeout(() => setPhase("hidden"), EXIT_MS);
  }

  if (!tour || phase === "hidden") return null;

  const soldOut = tour.status === "sold-out";
  const price = tour.pricing?.offerPrice ?? tour.pricing?.regularPrice;
  const priceNote = tour.pricing?.offerPrice ? tour.pricing.offerLabel?.replace(/^Special price for the /i, "Special price for ") : undefined;
  const primary = "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-5 text-[0.7rem] font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const secondary = "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary/30 bg-card/60 px-5 text-[0.7rem] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <aside aria-label="Upcoming tour" data-state={phase} className="banner-hang pointer-events-none absolute inset-x-0 top-0 z-40 flex justify-center">
      <div className="relative w-[calc(100vw-24px)] pt-[76px] md:w-[min(1180px,calc(100vw-48px))] md:pt-[100px]">
        {/* Ropes: 2 on phones, 4 on larger screens */}
        {[8, 30, 70, 92].map((left, i) => (
          <span key={left} aria-hidden className={`banner-rope ${i === 1 || i === 2 ? "hidden md:block" : ""}`} style={{ left: `${left}%` }} />
        ))}
        <div className="banner-cloth pointer-events-auto relative">
          {[8, 30, 70, 92].map((left, i) => (
            <span key={left} aria-hidden className={`banner-eyelet ${i === 1 || i === 2 ? "hidden md:block" : ""}`} style={{ left: `${left}%` }} />
          ))}
          <div className="banner-fabric relative px-4 pb-5 pt-4 md:px-7 md:pb-7 md:pt-6">
            <button type="button" onClick={dismiss} aria-label="Dismiss upcoming tour" className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:right-4 md:top-4">
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-4 md:gap-7">
              {tour.coverImage && (
                <img src={tour.coverImage} alt="" loading="lazy" className="hidden h-[110px] w-[124px] shrink-0 -rotate-3 border-[5px] border-card object-cover shadow-soft md:block" />
              )}

              <div className="min-w-0 flex-1 pr-10 md:pr-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="eyebrow text-[0.62rem] text-accent">Upcoming Departure</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-widest md:hidden ${soldOut ? "bg-muted text-muted-foreground" : "bg-accent text-accent-foreground"}`}>{statusLabel[tour.status]}</span>
                </div>
                <h2 className="display mt-1 truncate text-[1.45rem] text-primary md:mt-2 md:text-[2.1rem] lg:text-[2.4rem]">{tour.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground md:hidden">{[shortRange(tour), shortDuration(tour.duration)].filter(Boolean).join(" · ")}</p>
                <ul className="mt-2 hidden flex-wrap gap-x-5 gap-y-1 text-sm text-foreground/80 md:flex">
                  {tour.startDate && <li className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" />{formatTourDateRange(tour)}</li>}
                  {tour.duration && <li className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />{tour.duration}</li>}
                  {tour.departureFrom && <li className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />From {tour.departureFrom}</li>}
                </ul>
              </div>

              <div className="hidden shrink-0 lg:block lg:pr-12">
                <span className={`inline-block rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest ${soldOut ? "bg-muted text-muted-foreground" : "bg-accent text-accent-foreground"}`}>{statusLabel[tour.status]}</span>
                {price && <p className="mt-2 text-primary"><span className="text-2xl font-extrabold">{inr(price)}</span> <span className="text-sm">/ person</span></p>}
                {priceNote && <p className="text-[0.7rem] text-muted-foreground">{priceNote}</p>}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 md:mt-4 md:pl-[152px] lg:pl-0 lg:justify-end">
              {price && <p className="text-primary lg:hidden"><span className="text-lg font-extrabold">{inr(price)}</span> <span className="text-xs">/ person</span></p>}
              <div className="flex gap-2">
                {!soldOut && (
                  <Link to="/tours/$slug" params={{ slug: tour.slug }} className={primary}>View Tour <ArrowRight className="h-4 w-4" /></Link>
                )}
                <a href={tourWhatsappHref(tour)} target="_blank" rel="noopener noreferrer" className={soldOut ? primary : secondary}>
                  <MessageCircle className="h-4 w-4" /> {soldOut ? "Ask About Next Departure" : "WhatsApp"}
                </a>
              </div>
            </div>
          </div>
          <svg aria-hidden viewBox="0 0 1200 24" preserveAspectRatio="none" className="banner-edge block h-4 w-full md:h-6">
            <path d="M0 0H1200V8C1100 20 1000 4 900 12S700 22 600 12 400 2 300 13 100 20 0 9Z" fill="var(--canvas)" />
          </svg>
        </div>
      </div>
    </aside>
  );
}

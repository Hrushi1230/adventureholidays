import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, MapPin, MessageCircle, X } from "lucide-react";
import { formatTourDateRange, getFeaturedUpcomingTour, inr, statusLabel, tourWhatsappHref, type Tour } from "@/lib/tours";

const SHOW_DELAY = 1000;
const EXIT_MS = 780;

function shortRange(t: Tour) {
  if (!t.startDate) return "";
  const s = new Date(t.startDate + "T00:00:00");
  const e = t.endDate ? new Date(t.endDate + "T00:00:00") : null;
  const m = (d: Date) => d.toLocaleDateString("en-GB", { month: "short" });
  if (!e) return `${s.getDate()} ${m(s)}`;
  return s.getMonth() === e.getMonth()
    ? `${s.getDate()}–${e.getDate()} ${m(e)} ${e.getFullYear()}`
    : `${s.getDate()} ${m(s)} – ${e.getDate()} ${m(e)} ${e.getFullYear()}`;
}
const shortDuration = (d?: string) => d?.replace(/(\d+)\s*Days?\s*\/\s*(\d+)\s*Nights?/i, "$1D / $2N");

/* Cloth outline (viewBox 1200×260, stretched). Same command structure in every frame so SMIL can morph it. */
const shape = (l: number, c: number, r: number, j: number) =>
  `M14 16 C300 9 900 13 1186 15 C1193 90 1195 170 1188 ${222 + j} ` +
  `C1100 ${236 + r} 1010 ${214 + r} 900 ${228 + r} C780 ${246 + c} 690 ${238 + c} 600 ${247 + c} ` +
  `C500 ${253 + c} 410 ${232 + l} 300 ${240 + l} C190 ${248 + l} 90 ${226 + l} 10 ${232 - j} ` +
  `C5 170 7 90 14 16 Z`;
const FRAMES = [shape(0, 0, 0, 0), shape(5, -3, 2, 2), shape(-2, 4, -4, -1), shape(3, 1, 5, 1), shape(0, 0, 0, 0)];
const FLAT = shape(-12, -18, -12, -4);
const ROPES = [8, 31, 69, 92];

type Phase = "hidden" | "open" | "closing";

function useMedia(q: string) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return m;
}

function FabricSurface({ closing, small, still }: { closing: boolean; small: boolean; still: boolean }) {
  const animate = !closing && !still;
  return (
    <svg aria-hidden viewBox="0 0 1200 260" preserveAspectRatio="none" className="fabric-svg absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <filter id="cloth-wave" x="-3%" y="-6%" width="106%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.018" numOctaves={2} seed={3} result="noise">
            {animate && <animate attributeName="baseFrequency" dur="7s" repeatCount="indefinite" values="0.006 0.018;0.0075 0.015;0.005 0.02;0.006 0.018" />}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={closing || still ? 0 : small ? 4 : 7} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="cloth-shadow" x="-5%" y="-10%" width="110%" height="140%"><feGaussianBlur stdDeviation="9" /></filter>
        <linearGradient id="cloth-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.985 0.012 88)" />
          <stop offset="0.45" stopColor="var(--canvas)" />
          <stop offset="1" stopColor="oklch(0.9 0.03 80)" />
        </linearGradient>
        <linearGradient id="cloth-folds" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="oklch(0.4 0.03 70 / 0.07)" />
          <stop offset="0.18" stopColor="oklch(1 0 0 / 0)" />
          <stop offset="0.31" stopColor="oklch(1 0 0 / 0.12)" />
          <stop offset="0.5" stopColor="oklch(0.4 0.03 70 / 0.04)" />
          <stop offset="0.69" stopColor="oklch(1 0 0 / 0.12)" />
          <stop offset="0.85" stopColor="oklch(1 0 0 / 0)" />
          <stop offset="1" stopColor="oklch(0.4 0.03 70 / 0.08)" />
        </linearGradient>
        <pattern id="cloth-weave" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="1" fill="oklch(0.45 0.04 70 / 0.05)" />
          <rect width="1" height="4" fill="oklch(0.45 0.04 70 / 0.035)" />
        </pattern>
        <clipPath id="cloth-clip"><path d={closing ? FLAT : FRAMES[0]}>{animate && <animate attributeName="d" dur="6.5s" repeatCount="indefinite" values={FRAMES.join(";")} calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1;.45 0 .55 1" />}</path></clipPath>
      </defs>

      {/* soft contact shadow under the cloth */}
      <g transform="translate(0 16)" opacity="0.38" filter="url(#cloth-shadow)">
        <path d={closing ? FLAT : FRAMES[0]} fill="oklch(0.15 0.03 160)">
          {animate && <animate attributeName="d" dur="6.5s" begin="-0.4s" repeatCount="indefinite" values={FRAMES.join(";")} />}
        </path>
      </g>

      <g filter="url(#cloth-wave)">
        <g clipPath="url(#cloth-clip)">
          <rect width="1200" height="270" fill="url(#cloth-light)" />
          <rect width="1200" height="270" fill="url(#cloth-weave)" />
          <rect width="1200" height="270" fill="url(#cloth-folds)" />
          {ROPES.map((x) => (
            <ellipse key={x} cx={x * 12} cy="26" rx="46" ry="28" fill="oklch(1 0 0 / 0.22)" />
          ))}
          {/* hem line */}
          <rect y="16" width="1200" height="3" fill="oklch(0.6 0.03 80 / 0.2)" />
        </g>
      </g>
    </svg>
  );
}

/** Homepage-only hanging fabric banner for the featured/nearest upcoming departure. */
export function UpcomingTourSpotlight({ tour = getFeaturedUpcomingTour() }: { tour?: Tour }) {
  const [phase, setPhase] = useState<Phase>("hidden");
  const small = useMedia("(max-width: 767px)");
  const still = useMedia("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (!tour) return;
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
    if (!tour || phase === "closing") return;
    setPhase("closing");
    window.setTimeout(() => setPhase("hidden"), still ? 220 : EXIT_MS);
  }

  if (!tour || phase === "hidden") return null;

  const soldOut = tour.status === "sold-out";
  const price = tour.pricing?.offerPrice ?? tour.pricing?.regularPrice;
  const priceNote = tour.pricing?.offerPrice ? tour.pricing.offerLabel?.replace(/^Special price for the /i, "Special price for ") : undefined;
  const badge = `inline-block rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest ${soldOut ? "bg-muted text-muted-foreground" : "bg-accent text-accent-foreground"}`;
  const primary = "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-5 text-[0.7rem] font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-6";
  const secondary = "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary/40 px-5 text-[0.7rem] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-6";

  const ctas = (
    <div className="flex gap-2 md:gap-3">
      {!soldOut && (
        <Link to="/tours/$slug" params={{ slug: tour.slug }} className={primary}>View Tour <ArrowRight className="h-4 w-4" /></Link>
      )}
      <a href={tourWhatsappHref(tour)} target="_blank" rel="noopener noreferrer" className={soldOut ? primary : secondary}>
        <MessageCircle className="h-4 w-4" /> {soldOut ? "Ask About Next Departure" : "WhatsApp"}
      </a>
    </div>
  );

  return (
    <aside aria-label="Upcoming tour" data-state={phase} className="hanging-banner pointer-events-none absolute inset-x-0 top-0 z-40 flex justify-center">
      <div className="relative w-[calc(100vw-20px)] pt-[72px] md:w-[min(1240px,calc(100vw-80px))] md:pt-[92px]">
        {ROPES.map((left, i) => (
          <span key={left} aria-hidden className={`banner-rope ${i === 1 || i === 2 ? "hidden md:block" : ""}`} style={{ left: `${left}%`, animationDelay: `${i * -0.9}s` }} />
        ))}

        <div className="fabric-shell pointer-events-auto relative">
          <FabricSurface closing={phase === "closing"} small={small} still={still} />
          {ROPES.map((left, i) => (
            <span key={left} aria-hidden className={`banner-eyelet ${i === 1 || i === 2 ? "hidden md:block" : ""}`} style={{ left: `${left}%` }} />
          ))}

          <div className="banner-content relative px-5 pb-11 pt-7 md:min-h-[230px] md:px-10 md:pb-14 md:pt-9">
            <button type="button" onClick={dismiss} aria-label="Dismiss upcoming tour" className="absolute right-3 top-4 grid h-10 w-10 place-items-center rounded-full border border-primary/25 text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:right-6 md:top-6">
              <X className="h-4 w-4" />
            </button>

            {/* Phone layout */}
            <div className="md:hidden">
              <div className="flex gap-3 pr-11">
                {tour.coverImage && <img src={tour.coverImage} alt="" loading="lazy" className="h-16 w-16 shrink-0 -rotate-2 border-[3px] border-card object-cover shadow-soft" />}
                <div className="min-w-0">
                  <p className="eyebrow text-[0.6rem] text-accent">Upcoming Departure</p>
                  <h2 className="display mt-1 text-[1.3rem] leading-tight text-primary">{tour.title}</h2>
                  <p className="mt-0.5 text-xs text-foreground/75">{shortRange(tour)}</p>
                  <p className="text-xs text-foreground/75">{[shortDuration(tour.duration), tour.departureFrom && `From ${tour.departureFrom}`].filter(Boolean).join(" · ")}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className={badge}>{statusLabel[tour.status]}</span>
                {price && <p className="text-primary"><span className="text-lg font-extrabold">{inr(price)}</span> <span className="text-xs">/ person</span></p>}
              </div>
              <div className="mt-3">{ctas}</div>
            </div>

            {/* Desktop layout */}
            <div className="hidden items-center gap-8 md:flex lg:gap-10">
              {tour.coverImage && (
                <img src={tour.coverImage} alt="" loading="lazy" className="h-[125px] w-[140px] shrink-0 -rotate-2 border-[6px] border-card object-cover shadow-[0_14px_24px_-10px_oklch(0.2_0.03_160/0.45)] lg:h-[135px] lg:w-[155px]" />
              )}
              <div className="min-w-0 flex-1">
                <p className="eyebrow text-[0.7rem] text-accent">Upcoming Departure</p>
                <h2 className="display mt-2 whitespace-nowrap text-[clamp(2rem,2.8vw,3rem)] leading-none text-primary">{tour.title}</h2>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-[0.95rem] text-foreground/80">
                  {tour.startDate && <li className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" />{formatTourDateRange(tour)}</li>}
                  {tour.duration && <li className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />{tour.duration}</li>}
                  {tour.departureFrom && <li className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />From {tour.departureFrom}</li>}
                </ul>
              </div>
              <div className="shrink-0 pr-12 lg:pr-14">
                <span className={badge}>{statusLabel[tour.status]}</span>
                {price && <p className="mt-2 text-primary"><span className="text-[2rem] font-bold leading-none">{inr(price)}</span> <span className="text-base">/ person</span></p>}
                {priceNote && <p className="mt-1 max-w-[15rem] text-[0.8rem] text-muted-foreground">{priceNote}</p>}
                <div className="mt-4">{ctas}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

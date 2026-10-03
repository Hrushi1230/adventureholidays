import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatTourDateRange, getFeaturedUpcomingTour, getUpcomingTours, inr, statusLabel, tourWhatsappHref, type Tour } from "@/lib/tours";
import ornament from "@/assets/andaman-banner-ornament.png";
import "./upcoming-spotlight.css";

const SHOW_DELAY = 450;
const EXIT_MS = 900;
const SWAP_MS = 180;
const AUTO_MS = 7500;
const W = 1600;
const TOP = 26;
const BOTTOM = 324;

type Phase = "hidden" | "open" | "closing";
type Pt = [number, number];

/** Cloth outline from the V6 prototype: top breathing + travelling bottom "leher" + centre sag. */
function clothPaths(t: number, amp: number) {
  const n = 42;
  const top: Pt[] = [];
  const bottom: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const x = (W * i) / n;
    const u = x / W;
    const topWave = 3.2 * Math.sin(u * Math.PI * 2.15 + t * 0.56) + 1.15 * Math.sin(u * Math.PI * 5.1 - t * 0.33);
    const bottomWave =
      8.5 * Math.sin(u * Math.PI * 2.0 - t * 0.92) +
      3.4 * Math.sin(u * Math.PI * 4.35 - t * 0.51 + 1.2) +
      1.8 * Math.sin(u * Math.PI * 7.2 + t * 0.31);
    const sag = 8.5 * Math.sin((Math.PI * i) / n) ** 2;
    top.push([x, TOP + topWave * 0.46 * amp]);
    bottom.push([x, BOTTOM + sag + bottomWave * amp]);
  }
  const f = (p: Pt) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  const cloth = `M ${f(top[0]!)} ${top.slice(1).map((p) => `L ${f(p)}`).join(" ")} ${[...bottom].reverse().map((p) => `L ${f(p)}`).join(" ")} Z`;
  const line = (pts: Pt[]) => "M " + pts.map(f).join(" L ");
  return {
    cloth,
    seamTop: line(top.map((p, i) => [p[0], p[1] + 12 + Math.sin(i * 0.8 + t) * 0.5])),
    seamBottom: line(bottom.map((p, i) => [p[0], p[1] - 14 + Math.sin(i * 0.6 - t) * 0.7])),
  };
}

function ClothSvg({ closing, reduced }: { closing: boolean; reduced: boolean }) {
  const cloth = useRef<SVGPathElement>(null);
  const weave = useRef<SVGPathElement>(null);
  const grain = useRef<SVGPathElement>(null);
  const seamT = useRef<SVGPathElement>(null);
  const seamB = useRef<SVGPathElement>(null);
  const target = useRef(1);
  target.current = closing ? 0 : 1;

  useEffect(() => {
    let phase = 0;
    let amp = 1;
    let raf = 0;
    const draw = () => {
      const p = clothPaths(phase, amp);
      cloth.current?.setAttribute("d", p.cloth);
      weave.current?.setAttribute("d", p.cloth);
      grain.current?.setAttribute("d", p.cloth);
      seamT.current?.setAttribute("d", p.seamTop);
      seamB.current?.setAttribute("d", p.seamBottom);
    };
    const tick = () => {
      phase += 0.018;
      amp += (target.current - amp) * 0.035;
      draw();
      raf = requestAnimationFrame(tick);
    };
    draw();
    if (!reduced) raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const initial = clothPaths(0, 1);
  return (
    <svg className="ahb-cloth-svg" viewBox="0 0 1600 360" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="ahbClothFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf1de" />
          <stop offset="48%" stopColor="#f6ead4" />
          <stop offset="100%" stopColor="#ebd6b6" />
        </linearGradient>
        <pattern id="ahbWeave" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 0H8 M0 4H8" stroke="#6e5433" strokeOpacity=".035" strokeWidth="1" />
          <path d="M0 0V8 M4 0V8" stroke="#fff" strokeOpacity=".05" strokeWidth="1" />
        </pattern>
        <filter id="ahbClothTexture" x="-5%" y="-10%" width="110%" height="125%">
          <feTurbulence type="fractalNoise" baseFrequency=".012 .045" numOctaves={2} seed={11} result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" result="gray" />
          <feComponentTransfer in="gray" result="faint"><feFuncA type="table" tableValues="0 .11" /></feComponentTransfer>
          <feComposite in="faint" in2="SourceAlpha" operator="in" />
        </filter>
      </defs>
      <path ref={cloth} d={initial.cloth} className="ahb-cloth-main" fill="url(#ahbClothFill)" />
      <path ref={grain} d={initial.cloth} fill="#000" filter="url(#ahbClothTexture)" style={{ mixBlendMode: "multiply" }} />
      <path ref={weave} d={initial.cloth} fill="url(#ahbWeave)" opacity=".85" />
      <path ref={seamT} d={initial.seamTop} className="ahb-cloth-seam" />
      <path ref={seamB} d={initial.seamBottom} className="ahb-cloth-seam" />
    </svg>
  );
}

const Icon = {
  cal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></svg>,
};

const pad = (n: number) => String(n).padStart(2, "0");

const RANK: Record<string, number> = { "booking-open": 0, "few-seats": 1, "sold-out": 2 };
const DAY_MS = 24 * 60 * 60 * 1000;
const KEY = (id: string) => `ah-tour-spotlight-dismissed:${id}`;

/** Featured first, then booking-open → few-seats → sold-out, each by nearest date. No completed, no duplicates. */
export function spotlightTours(list?: Tour[]): Tour[] {
  const upcoming = getUpcomingTours(list);
  const featured = getFeaturedUpcomingTour(list);
  const time = (t: Tour) => (t.startDate ? new Date(t.startDate).getTime() : Number.MAX_SAFE_INTEGER);
  const rest = upcoming
    .filter((t) => t.id !== featured?.id)
    .sort((a, b) => (RANK[a.status] ?? 3) - (RANK[b.status] ?? 3) || time(a) - time(b));
  return featured ? [featured, ...rest] : rest;
}

function isDismissed(id: string): boolean {
  try {
    const v = Number(localStorage.getItem(KEY(id)));
    if (v && Date.now() - v < DAY_MS) return true;
    if (v) localStorage.removeItem(KEY(id));
  } catch { /* storage unavailable */ }
  return false;
}
function storeDismissed(id: string) {
  try { localStorage.setItem(KEY(id), String(Date.now())); } catch { /* ignore */ }
}

/**
 * Homepage-only hanging cloth banner. One physical cloth; with several upcoming tours only the
 * printed content changes. × dismisses the current tour for 24 hours.
 */
export function UpcomingTourSpotlight({ tour, tours: list }: { tour?: Tour; tours?: Tour[] }) {
  const all = useMemo(() => (tour ? [tour] : spotlightTours(list)), [tour, list]);
  const [phase, setPhase] = useState<Phase>("hidden");
  const [reduced, setReduced] = useState(false);
  const [dismissed, setDismissed] = useState<string[] | null>(null);
  const [index, setIndex] = useState(0);
  const [out, setOut] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const [animKey, setAnimKey] = useState(0);
  const interacted = useRef(false);

  const visible = dismissed ? all.filter((t) => !dismissed.includes(t.id)) : [];
  const i = visible.length ? Math.min(index, visible.length - 1) : 0;
  const current = visible[i];
  const multi = visible.length > 1;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setDismissed(all.filter((t) => isDismissed(t.id)).map((t) => t.id));
  }, [all]);

  const hasAny = visible.length > 0;
  useEffect(() => {
    if (!hasAny || phase !== "hidden") return;
    const t = window.setTimeout(() => setPhase("open"), SHOW_DELAY);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAny]);

  function swap(d: 1 | -1, next: () => void) {
    setDir(d);
    if (reduced) { next(); return; }
    setOut(true);
    window.setTimeout(() => { next(); setOut(false); setAnimKey((k) => k + 1); }, SWAP_MS);
  }
  const go = (d: 1 | -1) => swap(d, () => setIndex((x) => (x + d + visible.length) % visible.length));
  const userGo = (d: 1 | -1) => { interacted.current = true; go(d); };

  // Auto-advance: only with several tours, no interaction, visible tab, motion allowed.
  useEffect(() => {
    if (phase !== "open" || !multi || reduced) return;
    const id = window.setInterval(() => {
      if (!interacted.current && !document.hidden) go(1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  });

  useEffect(() => {
    if (phase !== "open") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function dismiss() {
    if (!current || phase !== "open") return;
    interacted.current = true;
    storeDismissed(current.id);
    if (multi) {
      swap(1, () => { setDismissed((d) => [...(d ?? []), current.id]); setIndex((x) => (x >= visible.length - 1 ? 0 : x)); });
      return;
    }
    setPhase("closing");
    window.setTimeout(() => { setDismissed((d) => [...(d ?? []), current.id]); setPhase("hidden"); }, reduced ? 240 : EXIT_MS);
  }

  if (!current || phase === "hidden") return null;

  const soldOut = current.status === "sold-out";
  const price = current.pricing?.offerPrice ?? current.pricing?.regularPrice;
  const offer = current.pricing?.offerPrice ? current.pricing.offerLabel?.replace(/^Special price for the /i, "Special price for ") : undefined;

  return (
    <div className={`ahb-anchor ${phase === "closing" ? "ahb-closing" : ""}`}>
      <aside aria-label="Upcoming tour" className={`ahb-stage ${reduced ? "is-reduced" : ""}`} onFocusCapture={() => { interacted.current = true; }}>
        <div className="ahb-ropes" aria-hidden="true">
          <div className="ahb-rope ahb-r1" />
          <div className="ahb-rope ahb-r2" />
          <div className="ahb-rope ahb-r3" />
          <div className="ahb-rope ahb-r4" />
        </div>
        <section className="ahb-hanger">
          <div className="ahb-cloth-wrap">
            <ClothSvg closing={phase === "closing"} reduced={reduced} />
          </div>
          <div key={animKey} className={`ahb-content ${out ? "is-out" : animKey ? "is-in" : ""}`} aria-live={multi ? "polite" : undefined}>
            {current.coverImage && (
              <div className="ahb-postcard" aria-hidden="true">
                <img src={current.coverImage} alt="" loading="lazy" />
                <img className="ahb-ornament" src={ornament} alt="" width={121} height={155} />
              </div>
            )}
            <div className="ahb-center">
              <div className="ahb-eyebrow-row">
                <span className="ahb-eyebrow">Upcoming Departure</span>
                {multi && (
                  <span className="ahb-nav">
                    <span className="ahb-count" aria-label={`Tour ${i + 1} of ${visible.length}`}>{pad(i + 1)} / {pad(visible.length)}</span>
                    <button type="button" className="ahb-arrow" onClick={() => userGo(-1)} aria-label="Previous upcoming tour">‹</button>
                    <button type="button" className="ahb-arrow" onClick={() => userGo(1)} aria-label="Next upcoming tour">›</button>
                  </span>
                )}
              </div>
              <h2 className="ahb-title">{current.title}</h2>
              <div className="ahb-meta" aria-label="Tour details">
                {current.startDate && <span>{Icon.cal}{formatTourDateRange(current)}</span>}
                {current.duration && <span>{Icon.clock}{current.duration}</span>}
                {current.departureFrom && <span>{Icon.pin}From {current.departureFrom}</span>}
              </div>
            </div>
            <div className="ahb-side">
              <span className="ahb-status">{statusLabel[current.status]}</span>
              {price && <div className="ahb-price"><strong>{inr(price)}</strong><small>/ person</small></div>}
              {offer && <div className="ahb-offer">{offer}</div>}
              <div className="ahb-actions">
                {!soldOut && (
                  <Link to="/tours/$slug" params={{ slug: current.slug }} className="ahb-btn ahb-btn-primary">View Tour <span aria-hidden>→</span></Link>
                )}
                <a href={tourWhatsappHref(current)} target="_blank" rel="noopener noreferrer" className={`ahb-btn ${soldOut ? "ahb-btn-primary" : "ahb-btn-outline"}`}>
                  {soldOut ? "Ask About Next Departure" : "WhatsApp"}
                </a>
              </div>
            </div>
          </div>
          <button type="button" className="ahb-close" onClick={dismiss} aria-label={`Dismiss ${current.title} announcement`}>×</button>
        </section>
      </aside>
    </div>
  );
}

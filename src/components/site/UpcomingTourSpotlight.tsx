import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatTourDateRange, getFeaturedUpcomingTour, inr, statusLabel, tourWhatsappHref, type Tour } from "@/lib/tours";
import "./upcoming-spotlight.css";

const SHOW_DELAY = 1000;
const EXIT_MS = 760;
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
  const cloth = `M ${f(top[0])} ${top.slice(1).map((p) => `L ${f(p)}`).join(" ")} ${[...bottom].reverse().map((p) => `L ${f(p)}`).join(" ")} Z`;
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

function Flower() {
  return (
    <svg className="ahb-mobile-flower" viewBox="0 0 80 64" aria-hidden="true">
      <g transform="translate(8 22) rotate(-18)">
        <ellipse cx="17" cy="12" rx="18" ry="6" fill="#2f7a45" />
        <ellipse cx="29" cy="20" rx="16" ry="5.5" fill="#4c9858" transform="rotate(28 29 20)" />
      </g>
      <g transform="translate(42 31)">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-11" rx="6" ry="14" fill="#fffaf0" transform={`rotate(${r})`} />
        ))}
        <circle r="5.5" fill="#f2b544" />
        <circle r="2.3" fill="#e28b20" />
      </g>
    </svg>
  );
}

const Icon = {
  cal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></svg>,
};

/** Homepage-only hanging cloth banner (React port of the V6 prototype) for the featured/nearest upcoming departure. */
export function UpcomingTourSpotlight({ tour = getFeaturedUpcomingTour() }: { tour?: Tour }) {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

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
    if (!tour || phase !== "open") return;
    setPhase("closing");
    window.setTimeout(() => setPhase("hidden"), reduced ? 240 : EXIT_MS);
  }

  if (!tour || phase === "hidden") return null;

  const soldOut = tour.status === "sold-out";
  const price = tour.pricing?.offerPrice ?? tour.pricing?.regularPrice;
  const offer = tour.pricing?.offerPrice ? tour.pricing.offerLabel?.replace(/^Special price for the /i, "Special price for ") : undefined;

  return (
    <div className="ahb-anchor">
      <aside aria-label="Upcoming tour" className={`ahb-stage ${reduced ? "is-reduced" : ""}`}>
        <section className={`ahb-hanger ${phase === "closing" ? "ahb-closing" : ""}`}>
          <div className="ahb-rope ahb-r1" />
          <div className="ahb-rope ahb-r2" />
          <div className="ahb-rope ahb-r3" />
          <div className="ahb-rope ahb-r4" />
          <div className="ahb-cloth-wrap">
            <ClothSvg closing={phase === "closing"} reduced={reduced} />
          </div>
          <div className="ahb-content">
            {tour.coverImage && (
              <div className="ahb-postcard" aria-hidden="true">
                <img src={tour.coverImage} alt="" loading="lazy" />
                <Flower />
              </div>
            )}
            <div className="ahb-center">
              <div className="ahb-eyebrow">Upcoming Departure</div>
              <h2 className="ahb-title">{tour.title}</h2>
              <div className="ahb-meta" aria-label="Tour details">
                {tour.startDate && <span>{Icon.cal}{formatTourDateRange(tour)}</span>}
                {tour.duration && <span>{Icon.clock}{tour.duration}</span>}
                {tour.departureFrom && <span>{Icon.pin}From {tour.departureFrom}</span>}
              </div>
            </div>
            <div className="ahb-side">
              <span className="ahb-status">{statusLabel[tour.status]}</span>
              {price && <div className="ahb-price"><strong>{inr(price)}</strong><small>/ person</small></div>}
              {offer && <div className="ahb-offer">{offer}</div>}
              <div className="ahb-actions">
                {!soldOut && (
                  <Link to="/tours/$slug" params={{ slug: tour.slug }} className="ahb-btn ahb-btn-primary">View Tour <span aria-hidden>→</span></Link>
                )}
                <a href={tourWhatsappHref(tour)} target="_blank" rel="noopener noreferrer" className={`ahb-btn ${soldOut ? "ahb-btn-primary" : "ahb-btn-outline"}`}>
                  {soldOut ? "Ask About Next Departure" : "WhatsApp"}
                </a>
              </div>
            </div>
          </div>
          <button type="button" className="ahb-close" onClick={dismiss} aria-label="Dismiss upcoming tour">×</button>
        </section>
      </aside>
    </div>
  );
}

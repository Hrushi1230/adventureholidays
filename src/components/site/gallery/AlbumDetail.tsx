import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { albumStats, formatAlbumDate, type GalleryPhoto, type TourAlbum } from "@/lib/gallery";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { FloatingActions } from "../FloatingActions";
import { btnGhostLight, btnOutline, btnPrimary } from "../ui";

const h2 = "display text-3xl text-primary md:text-5xl";

export function AlbumDetail({ a }: { a: TourAlbum }) {
  useReveal();
  const t = a.testimonial;
  const showVideo = t?.type === "video" && !!t.videoUrl;
  const showQuote = t?.type === "text" && !!t.quote;
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[80svh] items-end overflow-hidden">
          <img src={a.coverImage} alt={`${a.title} — Adventure Holiday completed tour`} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div className="hero-scrim absolute inset-0" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8">
            <p className="eyebrow animate-rise text-sand">Completed Tour</p>
            <h1 className="display animate-rise mt-4 max-w-4xl text-[2.6rem] text-primary-foreground sm:text-6xl lg:text-[5rem]" style={{ animationDelay: "120ms" }}>{a.title}</h1>
            <p className="animate-rise mt-4 text-primary-foreground/90 md:text-lg" style={{ animationDelay: "240ms" }}>
              {[formatAlbumDate(a.tourDate), a.destination, "Adventure Holiday"].filter(Boolean).join(" · ")}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="eyebrow text-muted-foreground">{albumStats(a).join(" · ")}</p>
          {a.shortDescription && <p className="mt-4 max-w-[65ch] text-muted-foreground md:text-lg">{a.shortDescription}</p>}
        </section>

        {!!a.photos.length && <PhotoStory title={a.title} photos={a.photos} />}

        {(showVideo || showQuote) && t && (
          <section className="bg-secondary py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-5 md:px-8">
              <p className="eyebrow text-accent">Traveller Story</p>
              {showVideo ? (
                <video src={t.videoUrl} poster={t.posterImage} controls preload="none" playsInline className="reveal mt-6 aspect-video w-full bg-foreground object-contain" />
              ) : (
                <blockquote className={`reveal mt-6 ${h2}`}>“{t.quote}”</blockquote>
              )}
              <p className="mt-5 text-sm">
                {t.clientName && <span className="font-semibold text-primary">{t.clientName} · </span>}
                <span className="text-muted-foreground">{a.title}, {formatAlbumDate(a.tourDate)}</span>
              </p>
            </div>
          </section>
        )}

        <section className="bg-primary py-16 text-primary-foreground md:py-24">
          <div className="reveal mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 md:px-8">
            <p className="eyebrow text-sand">Plan Your Next Journey</p>
            <h2 className="display text-3xl md:text-5xl">Travel privately or join one of our upcoming group departures.</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/" hash="upcoming" className={btnPrimary}>View Upcoming Tours</Link>
              <Link to="/" hash="plan" className={btnGhostLight}>Plan Your Tour</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

function PhotoStory({ title, photos }: { title: string; photos: GalleryPhoto[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const n = photos.length;
  const go = useCallback((d: number) => setActive((i) => (i === null ? i : (i + d + n) % n)), [n]);
  const open = (i: number) => { setActive(i); ref.current?.showModal(); };

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  const touchX = useRef<number | null>(null);
  const ctrl = "rounded-full bg-card p-3 text-primary focus-visible:outline-2 focus-visible:outline-accent";

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
      <h2 className={`reveal ${h2}`}>Photo Story</h2>
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <button key={p.src + i} type="button" onClick={() => open(i)} aria-label={`Open photo ${i + 1} of ${n}: ${p.alt}`} className="mb-4 block w-full break-inside-avoid overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading={i < 2 ? "eager" : "lazy"} decoding="async" className="h-auto w-full transition-transform duration-700 hover:scale-[1.03]" />
          </button>
        ))}
      </div>
      <dialog
        ref={ref}
        aria-label={`${title} photos`}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; }}
        onTouchEnd={(e) => {
          const s = touchX.current; const end = e.changedTouches[0]?.clientX;
          if (s !== null && end !== undefined && Math.abs(end - s) > 50) go(end < s ? 1 : -1);
          touchX.current = null;
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-foreground/95 p-0 backdrop:bg-foreground/90"
      >
        {active !== null && photos[active] && (
          <div className="flex h-full w-full items-center justify-center p-4 md:p-16" onClick={(e) => e.target === e.currentTarget && ref.current?.close()}>
            <img src={photos[active].src} alt={photos[active].alt} className="max-h-full max-w-full object-contain" />
            <p className="absolute left-4 top-4 rounded-full bg-card px-3 py-1.5 text-sm font-semibold text-primary" aria-live="polite">{active + 1} / {n}</p>
            <button type="button" onClick={() => ref.current?.close()} autoFocus aria-label="Close" className={`absolute right-4 top-4 ${ctrl}`}><X className="h-5 w-5" /></button>
            {n > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`absolute bottom-4 left-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 ${ctrl}`}><ChevronLeft className="h-6 w-6" /></button>
                <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`absolute bottom-4 right-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 ${ctrl}`}><ChevronRight className="h-6 w-6" /></button>
              </>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}

export function AlbumNotFound() {
  return (
    <>
      <Header solidAlways />
      <main className="mx-auto min-h-[70svh] max-w-7xl px-5 pb-24 pt-36 md:px-8 md:pt-44">
        <p className="eyebrow text-accent">Gallery</p>
        <h1 className="display mt-4 text-5xl text-primary md:text-7xl">Tour album not found.</h1>
        <p className="mt-6 max-w-xl text-muted-foreground md:text-lg">This tour memory may not have been published yet.</p>
        <Link to="/gallery" className={`${btnOutline} mt-10`}><ArrowLeft className="h-4 w-4" /> Back to Gallery</Link>
      </main>
      <Footer />
    </>
  );
}

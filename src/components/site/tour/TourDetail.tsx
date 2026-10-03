import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Images, MessageCircle, X } from "lucide-react";
import { images } from "@/lib/site";
import { categoryLabel, formatPrice, formatTourDateRange, isBookable, statusLabel, tourWhatsappHref, type Tour } from "@/lib/tours";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { FloatingActions } from "../FloatingActions";
import { btnGhostLight, btnOutline, btnPrimary } from "../ui";

const h2 = "display text-3xl text-primary md:text-5xl";

function TourCta({ t, light }: { t: Tour; light?: boolean }) {
  if (t.status === "completed") {
    return t.hasAlbum ? (
      // Album pages arrive with the gallery archive; URL format is fixed now.
      <a href={`/gallery/${t.slug}`} className={btnPrimary}><Images className="h-4 w-4" /> View Tour Memories</a>
    ) : null;
  }
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={tourWhatsappHref(t)} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
        <MessageCircle className="h-4 w-4" /> {t.status === "sold-out" ? "Ask About Next Departure" : "Enquire on WhatsApp"}
      </a>
      <Link to="/" hash="plan" className={light ? btnGhostLight : btnOutline}>Plan Your Tour</Link>
    </div>
  );
}

export function TourDetail({ t }: { t: Tour }) {
  useReveal();
  const dates = formatTourDateRange(t);
  const price = formatPrice(t.price);
  const overview = t.description ?? t.shortDescription;
  const facts = [
    ["Date", dates],
    ["Duration", t.duration],
    ["Departure From", t.departureFrom],
    ["Tour Type", categoryLabel[t.category]],
    ["Status", statusLabel[t.status]],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[85svh] items-end overflow-hidden">
          <img src={t.coverImage ?? images.hero} alt={`${t.title} — ${t.destination}`} width={1920} height={1088} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div className="hero-scrim absolute inset-0" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-32 md:px-8">
            <div className="animate-rise flex flex-wrap items-center gap-3">
              <p className="eyebrow text-sand">{categoryLabel[t.category]}</p>
              <span className={`rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest ${isBookable(t) ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{statusLabel[t.status]}</span>
            </div>
            <h1 className="display animate-rise mt-5 max-w-4xl text-[2.6rem] text-primary-foreground sm:text-6xl lg:text-[5rem]" style={{ animationDelay: "150ms" }}>{t.title}</h1>
            <p className="animate-rise mt-4 text-primary-foreground/90 md:text-lg" style={{ animationDelay: "300ms" }}>
              {[t.destination, t.stateOrRegion, dates].filter(Boolean).join(" · ")}
            </p>
            {price && <p className="display animate-rise mt-4 text-2xl text-sand" style={{ animationDelay: "380ms" }}>{price}</p>}
            <div className="animate-rise mt-8" style={{ animationDelay: "450ms" }}><TourCta t={t} light /></div>
          </div>
        </section>

        <section aria-label="Quick facts" className="border-b border-border bg-card">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-8 md:grid-cols-5 md:px-8">
            {facts.map(([k, v]) => (
              <div key={k} className="py-3 pr-4">
                <dt className="eyebrow text-[0.6rem] text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-semibold text-primary">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {overview && (
          <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <h2 className={`reveal ${h2}`}>Overview</h2>
            <p className="reveal mt-6 max-w-[65ch] whitespace-pre-line text-muted-foreground md:text-lg">{overview}</p>
          </section>
        )}

        {!!t.itinerary?.length && (
          <section className="bg-secondary py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-5 md:px-8">
              <h2 className={`reveal ${h2}`}>Itinerary</h2>
              <ol className="mt-10 border-l border-border">
                {[...t.itinerary].sort((a, b) => a.day - b.day).map((d) => (
                  <li key={d.day} className="reveal relative pb-10 pl-8 last:pb-0">
                    <span aria-hidden className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                    <p className="eyebrow text-[0.6rem] text-accent">Day {String(d.day).padStart(2, "0")}</p>
                    <h3 className="display mt-2 text-2xl text-primary">{d.title}</h3>
                    {d.description && <p className="mt-2 max-w-[65ch] text-muted-foreground">{d.description}</p>}
                    {!!d.places?.length && <p className="mt-2 text-sm text-primary/80">{d.places.join(" · ")}</p>}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {(!!t.inclusions?.length || !!t.exclusions?.length) && (
          <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
            {!!t.inclusions?.length && (
              <div className="reveal">
                <h2 className={h2}>Included</h2>
                <ul className="mt-6 space-y-3">{t.inclusions.map((i) => <li key={i} className="flex gap-3 text-primary"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />{i}</li>)}</ul>
              </div>
            )}
            {!!t.exclusions?.length && (
              <div className="reveal">
                <h2 className={h2}>Not Included</h2>
                <ul className="mt-6 space-y-3">{t.exclusions.map((i) => <li key={i} className="flex gap-3 text-muted-foreground"><X className="mt-1 h-4 w-4 shrink-0" aria-hidden />{i}</li>)}</ul>
              </div>
            )}
          </section>
        )}

        {!!t.gallery?.length && <TourGallery title={t.title} photos={t.gallery} />}

        {!!t.notes?.length && (
          <section className="mx-auto max-w-4xl px-5 py-16 md:px-8">
            <h2 className={`reveal ${h2}`}>Important Notes</h2>
            <ul className="reveal mt-6 list-disc space-y-2 pl-5 text-muted-foreground">{t.notes.map((n) => <li key={n}>{n}</li>)}</ul>
          </section>
        )}

        {t.status !== "completed" || t.hasAlbum ? (
          <section className="bg-primary py-16 text-primary-foreground md:py-24">
            <div className="reveal mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 md:px-8">
              <h2 className="display text-3xl md:text-5xl">{t.status === "sold-out" ? "This departure is sold out." : t.status === "completed" ? "Relive this journey." : "Ready to join this departure?"}</h2>
              <TourCta t={t} light />
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

function TourGallery({ title, photos }: { title: string; photos: string[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const open = (i: number) => { setActive(i); ref.current?.showModal(); };
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <h2 className={`reveal ${h2}`}>Tour Gallery</h2>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {photos.slice(0, 8).map((src, i) => (
          <button key={src} type="button" onClick={() => open(i)} className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-label={`Open photo ${i + 1} of ${title}`}>
            <img src={src} alt={`${title} photo ${i + 1}`} loading="lazy" decoding="async" className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105" />
          </button>
        ))}
      </div>
      <dialog ref={ref} onClose={() => setActive(null)} onClick={(e) => e.target === ref.current && ref.current?.close()} className="m-auto max-h-[90vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-foreground/85">
        {active !== null && (
          <div className="relative">
            <img src={photos[active]} alt={`${title} photo ${active + 1}`} className="max-h-[90vh] w-auto object-contain" />
            <button type="button" onClick={() => ref.current?.close()} autoFocus aria-label="Close photo" className="absolute right-3 top-3 rounded-full bg-card p-2 text-primary focus-visible:outline-2 focus-visible:outline-accent"><X className="h-5 w-5" /></button>
          </div>
        )}
      </dialog>
    </section>
  );
}

export function TourNotFound() {
  return (
    <>
      <Header solidAlways />
      <main className="mx-auto min-h-[70svh] max-w-7xl px-5 pb-24 pt-36 md:px-8 md:pt-44">
        <p className="eyebrow text-accent">Tour not found</p>
        <h1 className="display mt-4 text-5xl text-primary md:text-7xl">This departure isn't listed.</h1>
        <p className="mt-6 max-w-xl text-muted-foreground md:text-lg">It may have been renamed or removed. See current departures on the homepage.</p>
        <Link to="/" hash="upcoming" className={`${btnOutline} mt-10`}>View Upcoming Tours <ArrowRight className="h-4 w-4" /></Link>
      </main>
      <Footer />
    </>
  );
}

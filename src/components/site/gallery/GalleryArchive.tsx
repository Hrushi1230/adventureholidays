import { Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { getAlbumsNewestFirst, groupAlbumsByYearAndMonth } from "@/lib/gallery";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { FloatingActions } from "../FloatingActions";
import { btnOutline, btnPrimary } from "../ui";
import { AlbumCard } from "./AlbumCard";

export function GalleryArchive() {
  useReveal();
  const years = groupAlbumsByYearAndMonth();
  const newest = getAlbumsNewestFirst()[0];
  const yearNav = years.length > 1 && (
    <nav aria-label="Years" className="mt-10 flex flex-wrap gap-6 border-b border-border pb-4">
      {years.map((y) => <a key={y.year} href={`#y${y.year}`} className="display text-2xl text-primary/60 transition-colors hover:text-primary">{y.year}</a>)}
    </nav>
  );
  return (
    <>
      <Header solidAlways={!newest} />
      <main>
        {newest ? (
          <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-primary md:min-h-[78svh]">
            <img src={newest.coverImage} alt={`${newest.title} — Adventure Holiday completed tour`} fetchPriority="high" decoding="async" className="gallery-hero-img absolute inset-0 h-full w-full object-cover" />
            <div className="hero-scrim absolute inset-0" />
            <div className="card-scrim absolute inset-0" />
            <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-32 text-primary-foreground md:px-8 md:pb-20">
              <p className="eyebrow gallery-hero-text text-sand">Tour Memories</p>
              <h1 className="display gallery-hero-text mt-4 max-w-4xl text-5xl md:text-7xl" style={{ animationDelay: "120ms" }}>Journeys we've<br />completed together.</h1>
              <p className="gallery-hero-text mt-5 max-w-xl text-primary-foreground/85 md:text-lg" style={{ animationDelay: "220ms" }}>Real photographs from Adventure Holiday group journeys.</p>
              <a href="#archive" className={`${btnPrimary} gallery-hero-text mt-8`} style={{ animationDelay: "320ms" }}>Explore the archive <ArrowDown className="h-4 w-4" /></a>
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-7xl px-5 pb-12 pt-36 md:px-8 md:pb-16 md:pt-44">
            <p className="eyebrow animate-rise text-accent">Tour Memories</p>
            <h1 className="display animate-rise mt-4 max-w-4xl text-5xl text-primary md:text-7xl" style={{ animationDelay: "120ms" }}>Journeys we've completed together.</h1>
            <p className="animate-rise mt-6 max-w-xl text-muted-foreground md:text-lg" style={{ animationDelay: "240ms" }}>Browse photographs and traveller stories from completed Adventure Holiday tours.</p>
          </section>
        )}

        {years.length ? (
          <div id="archive" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-24 pt-10 md:px-8 md:pt-16">
            {yearNav}
            {years.map((y) => (
              <section key={y.year} id={`y${y.year}`} aria-labelledby={`yh${y.year}`} className="scroll-mt-28 pt-8">
                <h2 id={`yh${y.year}`} className="display text-6xl text-primary md:text-8xl">{y.year}</h2>
                {y.months.map((m) => (
                  <section key={m.month} aria-label={`${m.monthName} ${y.year}`} className="mt-10 md:mt-14">
                    <h3 className="eyebrow border-b border-border pb-3 text-accent">{m.monthName}</h3>
                    <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                      {m.albums.map((a) => <AlbumCard key={a.id} a={a} className="reveal" />)}
                    </div>
                  </section>
                ))}
              </section>
            ))}
          </div>
        ) : (
          <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
            <div className="border border-border bg-card p-8 md:p-14">
              <p className="display max-w-2xl text-3xl text-primary md:text-4xl">Our completed tour albums will appear here.</p>
              <p className="mt-4 max-w-xl text-muted-foreground">After every Adventure Holiday journey, photographs and traveller stories will be added to this archive.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/" hash="upcoming" className={btnPrimary}>View Upcoming Tours</Link>
                <Link to="/" hash="plan" className={btnOutline}>Plan Your Tour</Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

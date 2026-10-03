import { Link } from "@tanstack/react-router";
import { groupAlbumsByYearAndMonth } from "@/lib/gallery";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { FloatingActions } from "../FloatingActions";
import { btnOutline, btnPrimary } from "../ui";
import { AlbumCard } from "./AlbumCard";

export function GalleryArchive() {
  useReveal();
  const years = groupAlbumsByYearAndMonth();
  return (
    <>
      <Header solidAlways />
      <main>
        <section className="mx-auto max-w-7xl px-5 pb-12 pt-36 md:px-8 md:pb-16 md:pt-44">
          <p className="eyebrow animate-rise text-accent">Tour Memories</p>
          <h1 className="display animate-rise mt-4 max-w-4xl text-5xl text-primary md:text-7xl" style={{ animationDelay: "120ms" }}>Journeys we've completed together.</h1>
          <p className="animate-rise mt-6 max-w-xl text-muted-foreground md:text-lg" style={{ animationDelay: "240ms" }}>Browse photographs and traveller stories from completed Adventure Holiday tours.</p>
          {years.length > 1 && (
            <nav aria-label="Years" className="mt-10 flex flex-wrap gap-6 border-b border-border pb-4">
              {years.map((y) => <a key={y.year} href={`#y${y.year}`} className="display text-2xl text-primary/60 transition-colors hover:text-primary">{y.year}</a>)}
            </nav>
          )}
        </section>

        {years.length ? (
          <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
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

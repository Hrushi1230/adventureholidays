import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { albumStats, formatAlbumDate, getAlbumsNewestFirst, type TourAlbum } from "@/lib/gallery";
import { EmptyPanel, SectionHead, btnOutline } from "./ui";

function Poster({ a, featured, delay = 0, className = "" }: { a: TourAlbum; featured?: boolean; delay?: number; className?: string }) {
  return (
    <Link
      to="/gallery/$slug"
      params={{ slug: a.slug }}
      style={{ ["--d" as string]: `${delay}ms` }}
      className={`poster-reveal group relative block overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      <div className="poster-clip absolute inset-0">
      <img src={a.coverImage} alt={`${a.title} — Adventure Holiday completed tour`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="card-scrim absolute inset-0" />
      </div>
      <div className={`poster-text absolute inset-x-0 bottom-0 text-primary-foreground ${featured ? "p-6 md:p-10" : "p-5 md:p-6"}`}>
        <p className="eyebrow text-[0.6rem] text-sand">{featured ? "Recent Journey" : formatAlbumDate(a.tourDate, "short")}</p>
        <h3 className={`display mt-2 ${featured ? "text-3xl md:text-5xl" : "text-2xl"}`}>{a.title}</h3>
        {featured && (
          <p className="mt-3 text-sm text-primary-foreground/85">
            {formatAlbumDate(a.tourDate)}{a.destination ? ` · ${a.destination}` : ""} · {albumStats(a).join(" · ")}
          </p>
        )}
        <span className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest ${featured ? "mt-5 rounded-full bg-accent px-5 py-3 text-accent-foreground" : "mt-3"}`}>
          View Album <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function RecentTours() {
  const items = getAlbumsNewestFirst().slice(0, 3);
  const [featured, ...rest] = items;
  return (
    <section id="recent-tours" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Completed tours" title="Recent Journeys" />
        {featured ? (
          <div className="mt-12 grid gap-5 md:grid-cols-12 md:gap-6">
            <Poster a={featured} featured className="aspect-[4/5] sm:aspect-[4/3] md:col-span-8 md:aspect-auto md:h-[560px]" />
            {rest.length > 0 && (
              <div className="md:col-span-4">
                <p className="eyebrow mb-4 text-accent md:hidden">More Journeys</p>
                <div className="grid grid-cols-2 gap-4 md:h-[560px] md:grid-cols-1 md:grid-rows-2 md:gap-6">
                  {rest.map((a, i) => (
                    <Poster key={a.id} a={a} delay={100 + i * 100} className="aspect-[3/4] md:aspect-auto md:h-full" />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyPanel title="Tour memories coming soon." text="Photos and traveller stories from completed Adventure Holiday journeys will appear here." />
        )}
        <Link to="/gallery" className={`${btnOutline} mt-10`}>View Full Gallery <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}

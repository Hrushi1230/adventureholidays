import { ArrowRight, ArrowUpRight, Images, Quote } from "lucide-react";
import { completedToursPreview, formatDate } from "@/lib/site";
import { EmptyPanel, SectionHead, btnOutline } from "./ui";

export function RecentTours() {
  const items = completedToursPreview.slice(0, 4);
  return (
    <section id="recent-tours" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Completed tours" title="Recent Journeys" />
        {items.length ? (
          <div className="no-scrollbar -mx-5 mt-12 flex snap-x gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
            {items.map((t) => (
              <a key={t.id} href="/gallery" className="group relative block aspect-[4/5] w-[72vw] shrink-0 snap-start overflow-hidden md:w-auto">
                <img src={t.coverImage} alt={t.title} loading="lazy" width={800} height={1000} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="card-scrim absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
                  <p className="eyebrow text-[0.6rem] text-sand">{formatDate(t.tourDate)}</p>
                  <h3 className="display mt-2 text-xl">{t.title}</h3>
                  <p className="mt-2 flex gap-4 text-xs">
                    {t.photoCount && <span className="flex items-center gap-1"><Images className="h-3.5 w-3.5" />{t.photoCount} photos</span>}
                    {t.testimonialType && <span className="flex items-center gap-1"><Quote className="h-3.5 w-3.5" />Testimonial</span>}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest">View Album <ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <EmptyPanel title="Tour albums are on their way." text="Photo stories from recently completed Adventure Holiday journeys will be published here." />
        )}
        <a href="/gallery" className={`${btnOutline} mt-10`}>View Full Gallery <ArrowRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}

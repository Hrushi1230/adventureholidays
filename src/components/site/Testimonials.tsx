import { testimonials } from "@/lib/site";
import { EmptyPanel, SectionHead } from "./ui";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-card py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Testimonials" title="Travellers' Stories" />
        {testimonials.length ? (
          <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {testimonials.map((t) => (
              <figure key={t.id} className="w-[85vw] shrink-0 snap-center border border-border bg-background p-7 md:w-auto">
                {t.video ? (
                  <video src={t.video} controls preload="none" poster={t.photo} className="aspect-video w-full bg-muted object-cover" />
                ) : t.photo ? (
                  <img src={t.photo} alt={t.name} loading="lazy" width={96} height={96} className="h-14 w-14 rounded-full object-cover" />
                ) : null}
                {t.quote && <blockquote className="display mt-5 text-xl text-primary">“{t.quote}”</blockquote>}
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-primary">{t.name}</span>
                  {t.tour && <span className="text-muted-foreground"> · {t.tour}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <EmptyPanel title="Traveller stories are coming soon." text="Traveller stories from recent Adventure Holiday journeys will appear here." />
        )}
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { business, demoTestimonials, destinations, showTrustMetrics, testimonials, trustMetrics, type Testimonial } from "@/lib/site";
import { getAlbumTestimonials, getAlbumsNewestFirst } from "@/lib/gallery";

function allTestimonials(): Testimonial[] {
  const fromAlbums: Testimonial[] = getAlbumTestimonials().map(({ album, testimonial: t }) => ({
    id: `album-${album.id}`,
    name: t.clientName ?? "Adventure Holiday traveller",
    tour: album.title,
    ...(t.quote ? { quote: t.quote } : {}),
    ...(t.type === "video" && t.videoUrl ? { video: t.videoUrl } : {}),
    ...(t.posterImage ? { photo: t.posterImage } : {}),
  }));
  const seen = new Set<string>();
  return [...testimonials, ...fromAlbums].filter((t) => {
    const k = `${t.name}|${t.quote ?? ""}|${t.video ?? ""}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function Testimonials() {
  const [queryDemo, setQueryDemo] = useState(false);
  useEffect(() => {
    setQueryDemo(new URLSearchParams(window.location.search).get("trustDemo") === "1");
  }, []);
  const real = allTestimonials();
  const list = real.length ? real : import.meta.env.DEV ? demoTestimonials : [];
  const bg = getAlbumsNewestFirst()[0]?.coverImage;

  const verified = [
    { value: "MSME", label: "Registered", note: business.udyam },
    { value: String(destinations.length), label: "Destinations & regions" },
    { value: "Real", label: "Group tour archive" },
    { value: "BBSR", label: "Bhubaneswar based" },
  ];
  const demo = showTrustMetrics || queryDemo
    ? [
        { value: trustMetrics.yearsExperience, label: "Years experience" },
        { value: trustMetrics.reviews, label: "Reviews" },
        { value: `${trustMetrics.rating} ★`, label: "Rating" },
      ]
    : [];
  const metrics = [...demo, ...verified].slice(0, demo.length ? 4 : 4);

  return (
    <section id="testimonials" className="bg-card py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal max-w-3xl">
          <p className="eyebrow text-accent">Traveller Stories</p>
          <h2 className="display mt-4 text-4xl text-primary md:text-6xl">Real journeys.<br />Real people.<br />Real memories.</h2>
        </div>

        {list.length ? (
          <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {list.slice(0, 6).map((t) => (
              <figure key={t.id} className="reveal flex w-[86vw] shrink-0 snap-center flex-col border border-border bg-background p-7 md:w-auto">
                {t.video ? (
                  <video src={t.video} controls preload="none" poster={t.photo} className="aspect-video w-full bg-muted object-cover" />
                ) : (
                  <span aria-hidden className="display text-6xl leading-none text-accent">“</span>
                )}
                {t.quote && <blockquote className="display mt-4 text-xl text-primary">{t.quote}</blockquote>}
                <figcaption className="mt-auto flex items-center gap-3 pt-6 text-sm">
                  {t.photo && !t.video && <img src={t.photo} alt="" loading="lazy" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full object-cover" />}
                  <span className="min-w-0">
                    <span className="block font-semibold text-primary">{t.name}</span>
                    {t.tour && <span className="block text-muted-foreground">{t.tour}</span>}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="reveal relative mt-12 overflow-hidden bg-primary">
            {bg && <img src={bg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35" />}
            <div className="relative max-w-2xl p-8 md:p-14">
              <p className="display text-2xl text-primary-foreground md:text-4xl">Real client stories will appear here as they are added from completed tours.</p>
            </div>
          </div>
        )}

        <dl className="reveal mt-12 grid grid-cols-2 border-t border-border md:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={m.label} className={`border-b border-border py-6 md:border-b-0 md:py-8 ${i % 2 === 0 ? "pr-4" : "pl-4 border-l"} md:px-6 md:first:pl-0 ${i > 0 ? "md:border-l" : "md:border-l-0"}`}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="display block text-3xl text-primary md:text-4xl">{m.value}</span>
                <span className="eyebrow mt-2 block text-[0.6rem] text-muted-foreground">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        {demo.length > 0 && <p className="mt-3 text-xs text-muted-foreground">Preview only — demo figures are hidden on the live site until verified.</p>}
      </div>
    </section>
  );
}

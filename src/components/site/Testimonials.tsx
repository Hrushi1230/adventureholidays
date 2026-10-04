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
  const movingList = list.length > 1 ? [...list, ...list] : list;

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
    <section id="testimonials" className="scroll-mt-20 bg-card py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow text-accent">Traveller Stories</p>
          <h2 className="display mt-4 text-4xl text-primary md:text-6xl">Real journeys.<br />Real people.<br />Real memories.</h2>
        </div>

        {list.length ? (
          <div className="testimonial-marquee -mx-5 mt-12 overflow-hidden md:-mx-8" aria-label="Traveller reviews">
            <div className="testimonial-track flex w-max gap-4 px-5 md:gap-6 md:px-8">
              {movingList.map((t, index) => (
                <figure key={`${t.id}-${index}`} className="flex w-[82vw] max-w-[360px] shrink-0 flex-col border border-border bg-background p-7 shadow-soft md:w-[360px]" aria-hidden={index >= list.length || undefined}>
                  <div className="flex items-center justify-between gap-4">
                    <span aria-label={`${t.rating ?? 5} out of 5 stars`} className="text-lg leading-none text-accent">{"★".repeat(t.rating ?? 5)}</span>
                    <span aria-hidden className="display text-5xl leading-none text-accent/40">“</span>
                  </div>
                  {t.quote && <blockquote className="mt-5 text-base leading-7 text-primary">{t.quote}</blockquote>}
                  <figcaption className="mt-auto border-t border-border pt-5 text-sm">
                    <span className="block font-bold text-primary">{t.name}</span>
                    {t.tour && <span className="mt-1 block text-muted-foreground">{t.tour}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative mt-12 overflow-hidden bg-primary">
            {bg && <img src={bg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35" />}
            <div className="relative max-w-2xl p-8 md:p-14">
              <p className="display text-2xl text-primary-foreground md:text-4xl">Real client stories will appear here as they are added from completed tours.</p>
            </div>
          </div>
        )}

        <dl className="mt-12 grid grid-cols-2 border-t border-border md:grid-cols-4">
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

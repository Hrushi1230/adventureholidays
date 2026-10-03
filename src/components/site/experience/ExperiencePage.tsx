import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { experienceWhatsappHref, visibleTestimonials, type Experience } from "@/lib/experiences";
import { useReveal } from "@/hooks/use-reveal";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { FloatingActions } from "../FloatingActions";
import { PhotoStory } from "../gallery/AlbumDetail";
import { btnGhostLight, btnOutline, btnPrimary } from "../ui";

type Mood = "calm" | "bright";
type CrossLink = { eyebrow: string; title: string; text: string; cta: string; to: "/rural-camps" | "/picnic-point"; img?: string };

const h2 = "display text-3xl text-primary md:text-5xl";

/** Shared, data-driven page for Rural Camps (calm) and Picnic Point (bright). */
export function ExperiencePage({ e, mood, intro, cross }: { e: Experience; mood: Mood; intro: string; cross: CrossLink }) {
  useReveal();
  const wa = experienceWhatsappHref(e);
  const calm = mood === "calm";
  const tests = visibleTestimonials(e);
  const videos = (e.videos ?? []).filter((v) => v.url);
  const features = e.features ?? [];
  const highlights = e.highlights ?? [];
  const suitable = e.suitableFor ?? [];
  const hasPhotos = e.gallery.length > 0;

  const Enquire = ({ light }: { light?: boolean }) => (
    <a href={wa} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
      <MessageCircle className="h-4 w-4" /> {e.enquiryLabel ?? `Enquire About ${e.title}`}
      <span className="sr-only">{light ? "" : ""} (opens WhatsApp)</span>
    </a>
  );

  return (
    <>
      <Header />
      <main>
        <section className={`relative flex items-end overflow-hidden ${calm ? "min-h-[85svh] md:min-h-[95svh]" : "min-h-[75svh] md:min-h-[85svh]"}`}>
          {e.heroImage && <img src={e.heroImage} alt={e.heroIsPlaceholder ? "" : `${e.title} by Adventure Holiday`} fetchPriority="high" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />}
          <div className="hero-scrim absolute inset-0" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-20">
            <p className="eyebrow animate-rise text-sand">{e.eyebrow}</p>
            <h1 className={`display animate-rise mt-4 text-primary-foreground ${calm ? "text-6xl md:text-[6.5rem]" : "text-5xl md:text-8xl"}`} style={{ animationDelay: "120ms" }}>{e.title}</h1>
            {e.shortDescription && <p className="animate-rise mt-5 max-w-xl text-primary-foreground/90 md:text-lg" style={{ animationDelay: "240ms" }}>{e.shortDescription}</p>}
            <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "360ms" }}>
              <Enquire light />
              {hasPhotos && <a href="#photos" className={btnGhostLight}>View Photos</a>}
            </div>
          </div>
        </section>

        <section className={calm ? "mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28" : "bg-accent/10 py-14 md:py-20"}>
          {calm ? (
            <>
              <h2 className={`reveal ${h2}`}>{intro}</h2>
              {e.description && <p className="reveal max-w-[60ch] text-muted-foreground md:text-lg">{e.description}</p>}
            </>
          ) : (
            <div className="reveal mx-auto max-w-7xl px-5 md:px-8">
              <h2 className={h2}>{intro}</h2>
              {e.description && <p className="mt-4 max-w-[55ch] text-muted-foreground md:text-lg">{e.description}</p>}
            </div>
          )}
        </section>

        {(!!features.length || !!highlights.length) && (
          <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
            <h2 className={`reveal ${h2}`}>{calm ? "The Experience" : "What to Expect"}</h2>
            {!!features.length && (
              <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {features.map((f) => (
                  <div key={f.title} className="reveal bg-background p-6 md:p-8">
                    <h3 className="display text-2xl text-primary">{f.title}</h3>
                    {f.description && <p className="mt-2 text-muted-foreground">{f.description}</p>}
                  </div>
                ))}
              </div>
            )}
            {!!highlights.length && <ul className="mt-8 flex flex-wrap gap-3">{highlights.map((h) => <li key={h} className="rounded-full border border-border px-4 py-2 text-sm text-primary">{h}</li>)}</ul>}
          </section>
        )}

        {hasPhotos ? (
          <div id="photos" className="scroll-mt-24"><PhotoStory title={e.title} photos={e.gallery} heading={calm ? "Photo Story" : "Picnic Moments"} /></div>
        ) : (
          <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
            <div className="reveal border border-border bg-card p-8 md:p-12">
              <p className="eyebrow text-accent">Real moments coming soon</p>
              <p className="mt-3 max-w-xl text-muted-foreground">We're preparing photographs and stories from Adventure Holiday's {e.title}.</p>
            </div>
          </section>
        )}

        {!!videos.length && (
          <section className="bg-secondary py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-5 md:px-8">
              <h2 className={`reveal ${h2}`}>{calm ? "Experience the Camp" : "Video Moments"}</h2>
              <div className="mt-8 grid gap-8">
                {videos.map((v) => (
                  <figure key={v.url} className="reveal">
                    <video src={v.url} poster={v.poster} controls preload="none" playsInline className="aspect-video w-full bg-foreground object-contain" />
                    {v.title && <figcaption className="mt-3 text-sm text-muted-foreground">{v.title}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {!!suitable.length && (
          <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <h2 className={`reveal ${h2}`}>{calm ? "Who It's For" : "Great For"}</h2>
            <ul className="mt-8 flex flex-wrap gap-3">{suitable.map((s) => <li key={s} className={`rounded-full px-5 py-3 font-semibold ${calm ? "border border-primary text-primary" : "bg-accent text-accent-foreground"}`}>{s}</li>)}</ul>
          </section>
        )}

        {!!tests.length && (
          <section className="bg-card py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <h2 className={`reveal ${h2}`}>Traveller Stories</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {tests.map((t) => (
                  <figure key={t.id} className="reveal border border-border bg-background p-6 md:p-8">
                    {t.videoUrl && <video src={t.videoUrl} poster={t.posterImage} controls preload="none" playsInline className="aspect-video w-full bg-foreground object-contain" />}
                    {t.quote && <blockquote className="display mt-4 text-xl text-primary">“{t.quote}”</blockquote>}
                    {t.clientName && <figcaption className="mt-4 text-sm font-semibold text-primary">{t.clientName}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-primary py-16 text-primary-foreground md:py-24">
          <div className="reveal mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 md:px-8">
            <p className="eyebrow text-sand">{calm ? "Enquire" : "Plan Your Picnic"}</p>
            <h2 className="display max-w-3xl text-3xl md:text-5xl">{calm ? "Tell us your dates and group size." : "Pick a date, bring your people."}</h2>
            <p className="max-w-xl text-primary-foreground/80">Message us on WhatsApp — we'll reply with details and availability.</p>
            <Enquire light />
          </div>
        </section>

        <section className="relative flex min-h-[50svh] items-end overflow-hidden">
          {cross.img && <img src={cross.img} alt="" loading="lazy" width={1280} height={960} className="absolute inset-0 h-full w-full object-cover" />}
          <div className="hero-scrim absolute inset-0" />
          <div className="reveal relative mx-auto w-full max-w-7xl px-5 py-14 md:px-8">
            <p className="eyebrow text-sand">{cross.eyebrow}</p>
            <h2 className="display mt-3 text-4xl text-primary-foreground md:text-6xl">{cross.title}</h2>
            <p className="mt-3 max-w-md text-primary-foreground/85">{cross.text}</p>
            <Link to={cross.to} className={`${btnGhostLight} mt-6`}>{cross.cta} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

export { btnOutline };

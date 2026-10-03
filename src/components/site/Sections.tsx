import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, Compass, HeartHandshake, Map, MessageCircle, Phone, Sparkles, X, ChevronLeft, ChevronRight, Instagram, Facebook, Youtube, BedDouble } from "lucide-react";
import { contact, destinations, gallery, images, nav, tours } from "@/lib/site";
import { useParallax } from "@/hooks/use-reveal";

const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:-translate-y-0.5";
const btnGhostLight = "inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/60 px-7 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary";

export function Hero() {
  const ref = useRef<HTMLImageElement>(null);
  useParallax(ref, 0.25);
  return (
    <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0 animate-hero-zoom">
        <img ref={ref} src={images.hero} alt="Trekkers at sunrise on a Himalayan ridge" width={1920} height={1088} className="h-full w-full object-cover object-[60%_center]" />
      </div>
      <div className="hero-scrim absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
        <p className="eyebrow animate-rise text-sand" style={{ animationDelay: "200ms" }}>
          Adventure Holiday • Explore • Experience • Remember
        </p>
        <h1 className="display animate-rise mt-5 max-w-4xl text-[2.7rem] text-primary-foreground sm:text-6xl lg:text-[5.6rem]" style={{ animationDelay: "350ms" }}>
          Your next adventure <em className="font-normal italic text-sand">starts here</em>
        </h1>
        <p className="animate-rise mt-6 max-w-xl text-base text-primary-foreground/90 md:text-lg" style={{ animationDelay: "550ms" }}>
          Discover unforgettable journeys, beautiful destinations and experiences made for travellers who want more than just a holiday.
        </p>
        <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "750ms" }}>
          <a href="#tours" className={btnPrimary}>Explore Tours <ArrowRight className="h-4 w-4" /></a>
          <a href="#contact" className={btnGhostLight}>Plan Your Trip</a>
        </div>
      </div>
      <div className="animate-float absolute bottom-24 right-28 hidden items-center gap-3 rounded-full bg-background/90 py-2 pl-2 pr-5 shadow-soft backdrop-blur md:flex">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><Compass className="h-4 w-4" /></span>
        <span className="text-xs font-semibold text-primary">Himalayan sunrise trail</span>
      </div>
    </section>
  );
}

export function Intro() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 md:px-8">
        <div className="reveal md:col-span-6 md:pt-10">
          <p className="eyebrow text-accent">Travel beyond the ordinary</p>
          <h2 className="display mt-5 text-4xl text-primary md:text-6xl">Some journeys become memories for a lifetime.</h2>
          <p className="mt-7 max-w-md text-muted-foreground md:text-lg">
            Adventure Holiday plans journeys around how you want to feel — curious, free, rested or thrilled. From quiet backwaters to high mountain trails, we shape each trip with care so you can simply show up and explore.
          </p>
          <a href="#about" className="mt-8 inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-sm font-bold uppercase tracking-widest text-primary">
            Our approach <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="relative md:col-span-6">
          <div className="reveal ml-auto aspect-[4/5] w-[78%] overflow-hidden">
            <img src={images.kerala} alt="Kerala houseboat among palms" loading="lazy" width={1024} height={1280} className="h-full w-full object-cover" />
          </div>
          <div className="reveal absolute -bottom-10 left-0 aspect-square w-[48%] overflow-hidden border-8 border-background shadow-soft" style={{ transitionDelay: "200ms" }}>
            <img src={images.kashmir} alt="Shikara on Dal Lake" loading="lazy" width={1280} height={960} className="h-full w-full object-cover" />
          </div>
          <span className="display absolute -top-6 left-4 text-7xl text-sand md:text-9xl" aria-hidden>“</span>
        </div>
      </div>
    </section>
  );
}

export function Tours() {
  const [feature, ...rest] = tours;
  return (
    <section id="tours" className="bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-accent">Tours</p>
            <h2 className="display mt-4 text-4xl text-primary md:text-6xl">Find your next journey</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">Explore experiences designed for different kinds of travellers.</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <TourCard t={feature!} className="aspect-[4/5] sm:aspect-[16/11] lg:col-span-7 lg:aspect-auto lg:min-h-[640px]" big />
          <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 lg:col-span-5 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:px-0">
            {rest.map((t) => (
              <TourCard key={t.title} t={t} className="aspect-[3/4] w-[75vw] shrink-0 snap-start sm:w-[45vw] lg:w-auto" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TourCard({ t, className = "", big }: { t: (typeof tours)[number]; className?: string; big?: boolean }) {
  return (
    <a href="#contact" className={`reveal group relative block overflow-hidden ${className}`}>
      <img src={t.img} alt={`${t.title} — ${t.place}`} loading="lazy" width={t.w} height={t.h} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
      <div className="card-scrim absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <p className="eyebrow text-[0.62rem] text-sand">{t.place}</p>
        <h3 className={`display mt-2 text-primary-foreground ${big ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"}`}>{t.title}</h3>
        {big && <p className="mt-3 max-w-md text-primary-foreground/85">{t.text}</p>}
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-foreground">
          View Tour <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}

export function Destinations() {
  return (
    <section id="destinations" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal max-w-2xl">
          <p className="eyebrow text-accent">Destinations</p>
          <h2 className="display mt-4 text-4xl text-primary md:text-6xl">Places worth exploring</h2>
        </div>
        <div className="mt-14 grid auto-rows-[260px] grid-cols-1 gap-4 md:auto-rows-[240px] md:grid-cols-12">
          {destinations.map((d) => (
            <a key={d.name} href="#contact" className={`reveal group relative overflow-hidden ${d.span}`}>
              <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
              <div className="card-scrim absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <h3 className="display text-2xl text-primary-foreground md:text-3xl">{d.name}</h3>
                  <p className="mt-1 text-sm text-primary-foreground/85">{d.text}</p>
                </div>
                <span className="eyebrow shrink-0 rounded-full bg-background/90 px-4 py-2 text-[0.6rem] text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">Explore</span>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Also exploring South India and more — tell us where you'd like to go.</p>
      </div>
    </section>
  );
}

const benefits = [
  { icon: Map, title: "Thoughtful Journeys", text: "Itineraries shaped around your pace, interests and the season." },
  { icon: BedDouble, title: "Comfortable Travel", text: "Stays and transfers chosen so the journey feels as good as the destination." },
  { icon: HeartHandshake, title: "Personal Assistance", text: "A real person to talk to before, during and after your trip." },
  { icon: Sparkles, title: "Memorable Experiences", text: "Moments planned with care — the kind you keep talking about." },
];

export function WhyUs() {
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-12">
        <div className="reveal lg:col-span-4">
          <p className="eyebrow text-accent">Why Adventure Holiday</p>
          <h2 className="display mt-4 text-4xl text-primary md:text-5xl">Travel with confidence</h2>
        </div>
        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
          {benefits.map((b, i) => (
            <li key={b.title} className="reveal border-t border-primary/20 pt-6" style={{ transitionDelay: `${i * 100}ms` }}>
              <b.icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
              <h3 className="display mt-5 text-2xl text-primary">{b.title}</h3>
              <p className="mt-2 text-secondary-foreground/80">{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", title: "Choose Your Destination", text: "Browse places and tour styles that spark your curiosity." },
  { n: "02", title: "Tell Us Your Plan", text: "Share dates, group size and the kind of trip you imagine." },
  { n: "03", title: "We Plan Your Journey", text: "We shape an itinerary around you and refine it together." },
  { n: "04", title: "Start Exploring", text: "Pack your bags — the road is ready when you are." },
];

export function Process() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal text-center">
          <p className="eyebrow text-accent">How it works</p>
          <h2 className="display mt-4 text-4xl text-primary md:text-6xl">From dream to journey</h2>
        </div>
        <ol className="relative mt-16 grid gap-12 md:grid-cols-4 md:gap-8">
          <div className="absolute left-[22px] top-0 h-full w-px border-l border-dashed border-accent/60 md:left-0 md:top-[22px] md:h-px md:w-full md:border-l-0 md:border-t" aria-hidden />
          {steps.map((s, i) => (
            <li key={s.n} className="reveal relative pl-16 md:pl-0" style={{ transitionDelay: `${i * 150}ms` }}>
              <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground md:relative">{s.n}</span>
              <h3 className="display mt-0 text-2xl text-primary md:mt-7">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Feature() {
  const ref = useRef<HTMLImageElement>(null);
  useParallax(ref, 0.18);
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden">
      <img ref={ref} src={images.rafting} alt="Friends rafting through white water" loading="lazy" width={1280} height={960} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-overlay/55" />
      <div className="reveal relative mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
        <h2 className="display text-5xl text-primary-foreground md:text-8xl">
          Go further.<br /><span className="text-sand">See more.</span><br />Feel more.
        </h2>
        <p className="mt-7 max-w-md text-primary-foreground/90 md:text-lg">New rivers, new trails, new people. Step outside the familiar and come home with stories that stay.</p>
        <a href="#tours" className={`${btnPrimary} mt-9`}>Start Exploring <ArrowRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}

export function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  useEffect(() => {
    if (idx === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => (i! + 1) % gallery.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i! - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [idx]);

  return (
    <section id="gallery" className="bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal flex items-end justify-between">
          <div>
            <p className="eyebrow text-accent">Gallery</p>
            <h2 className="display mt-4 text-4xl text-primary md:text-6xl">Moments from the road</h2>
          </div>
        </div>
        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {gallery.map((g, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`reveal group relative overflow-hidden ${g.cls}`} aria-label={`Open image: ${g.alt}`}>
              <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-overlay/0 transition-colors group-hover:bg-overlay/20" />
            </button>
          ))}
        </div>
      </div>
      {idx !== null && (
        <div role="dialog" aria-modal="true" aria-label="Image viewer" className="animate-fade fixed inset-0 z-[60] flex items-center justify-center bg-overlay/95 p-4" onClick={() => setIdx(null)}>
          <img key={idx} src={gallery[idx]!.src} alt={gallery[idx]!.alt} className="animate-rise max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          <p className="absolute bottom-6 left-0 right-0 text-center text-sm text-primary-foreground/80">{gallery[idx]!.alt}</p>
          <button aria-label="Close" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setIdx(null)}><X /></button>
          <button aria-label="Previous" className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-primary-foreground hover:bg-primary-foreground/10" onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + gallery.length) % gallery.length); }}><ChevronLeft /></button>
          <button aria-label="Next" className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-primary-foreground hover:bg-primary-foreground/10" onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % gallery.length); }}><ChevronRight /></button>
        </div>
      )}
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="reveal aspect-[4/5] overflow-hidden">
          <img src={images.northeast} alt="Family crossing a living root bridge" loading="lazy" width={1024} height={1280} className="h-full w-full object-cover" />
        </div>
        <div className="reveal">
          <p className="eyebrow text-accent">About Adventure Holiday</p>
          <h2 className="display mt-4 text-4xl text-primary md:text-5xl">Journeys planned with heart, for travellers with curiosity.</h2>
          <p className="mt-6 text-muted-foreground md:text-lg">
            [Placeholder] Adventure Holiday is a travel company creating holiday and adventure experiences across India and beyond. Replace this paragraph with the company's own story when it's ready.
          </p>
          <ul className="mt-8 space-y-4">
            {["Trips tailored to families, couples, friends and groups", "Destinations from mountains to beaches to heritage cities", "Support from first enquiry to journey's end"].map((p) => (
              <li key={p} className="flex gap-3 text-foreground"><span className="mt-2 h-1.5 w-6 shrink-0 bg-accent" />{p}</li>
            ))}
          </ul>
          <a href="#contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5">Know More <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  const ref = useRef<HTMLImageElement>(null);
  useParallax(ref, 0.15);
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <img ref={ref} src={images.goa} alt="Sunset over a palm-lined beach" loading="lazy" width={1280} height={960} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-overlay/45" />
      <div className="reveal relative mx-auto max-w-3xl px-5 text-center">
        <h2 className="display text-4xl text-primary-foreground md:text-6xl">Ready to plan your next adventure?</h2>
        <p className="mx-auto mt-6 max-w-lg text-primary-foreground/90 md:text-lg">Tell us where you want to go. We'll help turn the idea into a journey.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#contact" className={btnPrimary}>Plan Your Trip</a>
          <a href="#tours" className={btnGhostLight}>Explore Tours</a>
        </div>
      </div>
    </section>
  );
}

const field = "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-0";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-12">
        <div className="reveal lg:col-span-4">
          <p className="eyebrow text-accent">Enquiry</p>
          <h2 className="display mt-4 text-4xl text-primary md:text-5xl">Let's plan your journey</h2>
          <dl className="mt-10 space-y-6 text-sm">
            <div><dt className="eyebrow text-[0.6rem] text-muted-foreground">Phone</dt><dd className="mt-1 text-lg text-primary">{contact.phone}</dd></div>
            <div><dt className="eyebrow text-[0.6rem] text-muted-foreground">Email</dt><dd className="mt-1 text-lg text-primary">{contact.email}</dd></div>
            <div><dt className="eyebrow text-[0.6rem] text-muted-foreground">Office</dt><dd className="mt-1 text-lg text-primary">{contact.address}</dd></div>
          </dl>
          <p className="mt-6 text-xs text-muted-foreground">Contact details shown are placeholders.</p>
        </div>
        <form
          className="reveal grid gap-6 bg-card p-6 shadow-soft sm:grid-cols-2 md:p-10 lg:col-span-8"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          {[
            { id: "name", label: "Name", type: "text", auto: "name" },
            { id: "phone", label: "Phone Number", type: "tel", auto: "tel" },
            { id: "email", label: "Email", type: "email", auto: "email" },
            { id: "destination", label: "Destination", type: "text" },
            { id: "date", label: "Travel Date", type: "date" },
            { id: "travellers", label: "Number of Travellers", type: "number" },
          ].map((f) => (
            <label key={f.id} className="block">
              <span className="eyebrow text-[0.6rem] text-muted-foreground">{f.label}</span>
              <input id={f.id} name={f.id} type={f.type} autoComplete={f.auto} min={f.type === "number" ? 1 : undefined} required={["name", "phone"].includes(f.id)} className={field} />
            </label>
          ))}
          <label className="block sm:col-span-2">
            <span className="eyebrow text-[0.6rem] text-muted-foreground">Message</span>
            <textarea name="message" rows={4} className={`${field} resize-none`} />
          </label>
          <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center">
            <button type="submit" className={btnPrimary}>Send Enquiry <ArrowRight className="h-4 w-4" /></button>
            {sent && <p role="status" className="text-sm text-primary">Thanks — this demo form isn't connected yet.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const s = contact.socials;
  return (
    <footer className="bg-primary py-16 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="display text-3xl">Adventure <span className="text-accent">Holiday</span></p>
          <p className="mt-4 max-w-sm text-primary-foreground/75">Memorable holiday and adventure experiences across India and beyond.</p>
          <div className="mt-6 flex gap-3">
            {[{ I: Instagram, h: s.instagram, l: "Instagram" }, { I: Facebook, h: s.facebook, l: "Facebook" }, { I: Youtube, h: s.youtube, l: "YouTube" }, { I: MessageCircle, h: s.whatsapp, l: "WhatsApp" }].map(({ I, h, l }) => (
              <a key={l} href={h} aria-label={l} className="grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/25 transition-colors hover:bg-accent hover:border-accent"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow text-[0.62rem] text-sand">Quick Links</p>
          <ul className="mt-5 space-y-3 text-primary-foreground/80">
            {nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-accent">{n.label}</a></li>)}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="eyebrow text-[0.62rem] text-sand">Get in touch</p>
          <p className="mt-5 text-primary-foreground/80">{contact.phone}<br />{contact.email}</p>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-primary-foreground/15 px-5 pt-6 text-xs text-primary-foreground/60 sm:flex-row md:px-8">
        <p>© {new Date().getFullYear()} Adventure Holiday. All rights reserved.</p>
        <div className="flex gap-6"><a href="#" className="hover:text-accent">Privacy Policy</a><a href="#" className="hover:text-accent">Terms &amp; Conditions</a></div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a href={contact.whatsappHref} aria-label="Chat on WhatsApp (placeholder)" className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"><MessageCircle /></a>
      <a href={contact.phoneHref} aria-label="Call us (placeholder)" className="grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5"><Phone /></a>
    </div>
  );
}

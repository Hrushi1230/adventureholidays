import { SectionHead } from "./ui";

const segments = [
  { n: "01", title: "Group Tours — India", text: "Scheduled group journeys across India.", href: "#group-tours" },
  { n: "02", title: "Group Tours — Odisha", text: "Group journeys exploring Odisha.", href: "#odisha" },
  { n: "03", title: "Private Tours & Packages", text: "Flexible travel for couples, families, friends and private groups.", href: "#private" },
  { n: "04", title: "Domestic & International Tours", text: "Travel planning across India plus international tours on request.", href: "#plan" },
];

export function TourSegments() {
  return (
    <section id="segments" className="bg-card py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="What we operate" title="Travel with Adventure Holiday" />
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((s, i) => (
            <a key={s.n} href={s.href} className="reveal group flex flex-col bg-card p-7 transition-colors hover:bg-secondary md:p-8" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="display text-4xl text-accent">{s.n}</span>
              <h3 className="display mt-8 text-2xl text-primary">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.text}</p>
              <span className="mt-6 h-px w-10 bg-accent transition-all group-hover:w-20" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

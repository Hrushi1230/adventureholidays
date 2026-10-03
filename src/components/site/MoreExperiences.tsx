import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { picnicPoint, ruralCamps, type Experience } from "@/lib/experiences";

function ExperiencePanel({ experience, to, cta }: { experience: Experience; to: "/rural-camps" | "/picnic-point"; cta: string }) {
  return (
    <Link to={to} className="reveal group relative flex min-h-[58svh] items-end overflow-hidden bg-primary focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-accent md:min-h-[620px]">
      {experience.heroImage && (
        <img
          src={experience.heroImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        />
      )}
      <div className="card-scrim absolute inset-0" />
      <div className="relative p-6 text-primary-foreground md:p-10 lg:p-12">
        <p className="eyebrow text-sand">{experience.eyebrow}</p>
        <h3 className="display mt-3 text-4xl md:text-5xl">{experience.title}</h3>
        {experience.shortDescription && <p className="mt-4 max-w-md text-sm text-primary-foreground/85 md:text-base">{experience.shortDescription}</p>}
        <span className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function MoreExperiences() {
  return (
    <section id="more-experiences" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal max-w-3xl">
          <p className="eyebrow text-accent">More from Adventure Holiday</p>
          <h2 className="display mt-4 text-4xl text-primary md:text-6xl">Two ways to spend time beyond a tour.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
          <ExperiencePanel experience={ruralCamps} to="/rural-camps" cta="Explore Rural Camps" />
          <ExperiencePanel experience={picnicPoint} to="/picnic-point" cta="Explore Picnic Point" />
        </div>
      </div>
    </section>
  );
}
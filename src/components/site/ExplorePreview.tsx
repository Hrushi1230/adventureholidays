import { ArrowRight } from "lucide-react";
import { btnGhostLight } from "./ui";

/** Full-width teaser used by Rural Camps and Picnic Point previews. */
export function ExplorePreview({ id, eyebrow, title, text, cta, href, img, alt }: {
  id: string; eyebrow: string; title: string; text: string; cta: string; href: string; img: string; alt: string;
}) {
  return (
    <section id={id} className="relative flex min-h-[70svh] items-end overflow-hidden">
      <img src={img} alt={alt} loading="lazy" width={1280} height={960} className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-scrim absolute inset-0" />
      <div className="reveal relative mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <p className="eyebrow text-sand">{eyebrow}</p>
        <h2 className="display mt-4 text-5xl text-primary-foreground md:text-7xl">{title}</h2>
        <p className="mt-4 max-w-md text-primary-foreground/85">{text}</p>
        <a href={href} className={`${btnGhostLight} mt-8`}>{cta} <ArrowRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}

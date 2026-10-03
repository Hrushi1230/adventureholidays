import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getAlbumsNewestFirst } from "@/lib/gallery";
import { communityHref, images } from "@/lib/site";
import { useParallax } from "@/hooks/use-reveal";
import { btnGhostLight, btnPrimary } from "./ui";

export function UpcomingHero() {
  const ref = useRef<HTMLImageElement>(null);
  useParallax(ref, 0.2);
  const brandImage = getAlbumsNewestFirst()[0]?.coverImage ?? images.hero;

  return (
    <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0 animate-hero-zoom">
        <img ref={ref} src={brandImage} alt="Adventure Holiday travellers on a completed group journey" width={1920} height={1088} fetchPriority="high" className="h-full w-full object-cover object-center" />
      </div>
      <div className="hero-scrim absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-8" style={{ paddingTop: "max(10rem, var(--ahb-clearance, 0px))", transition: "padding-top 600ms cubic-bezier(.4,0,.2,1)" }}>
        <p className="eyebrow animate-rise text-sand" style={{ animationDelay: "100ms" }}>Adventure Holiday</p>
        <h1 className="display animate-rise mt-4 max-w-5xl text-[2.15rem] text-primary-foreground sm:text-6xl lg:text-[4.2rem]" style={{ animationDelay: "220ms" }}>
          <span className="block whitespace-nowrap">Group Tours.</span>
          <span className="block whitespace-nowrap">Private Journeys.</span>
          <span className="block whitespace-nowrap text-sand">Adventure Holiday.</span>
        </h1>
        <p className="animate-rise mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/90 md:text-lg" style={{ animationDelay: "340ms" }}>
          <span className="block">Domestic &amp; International Tours</span>
          <span className="block">From Bhubaneswar</span>
        </p>
        <div className="animate-rise mt-7 flex flex-col items-start gap-4 md:mt-5 md:flex-row md:items-center" style={{ animationDelay: "460ms" }}>
          <a href="#plan" className={btnPrimary}>Plan Your Tour <ArrowRight className="h-4 w-4" /></a>
          <a href="#upcoming" className={`${btnGhostLight} border-0 px-1 py-2`}>View Upcoming Tours <ArrowRight className="h-4 w-4" /></a>
          <a href={communityHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-1 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground/85 transition-colors hover:text-sand">
            Join WhatsApp Group <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

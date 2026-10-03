import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { communityHref, images } from "@/lib/site";
import { formatTourDateRange, getFeaturedUpcomingTour, statusLabel } from "@/lib/tours";
import { useParallax } from "@/hooks/use-reveal";
import { btnGhostLight, btnPrimary } from "./ui";

export function UpcomingHero() {
  const ref = useRef<HTMLImageElement>(null);
  useParallax(ref, 0.2);
  const tour = getFeaturedUpcomingTour();

  return (
    <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0 animate-hero-zoom">
        <img ref={ref} src={tour?.coverImage ?? images.hero} alt={tour ? tour.title : "Travellers at sunrise on a Himalayan ridge"} width={1920} height={1088} fetchPriority="high" className="h-full w-full object-cover object-[60%_center]" />
      </div>
      <div className="hero-scrim absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-28 pt-32 md:px-8 md:pb-24">
        {tour ? (
          <>
            <div className="animate-rise flex flex-wrap items-center gap-3" style={{ animationDelay: "150ms" }}>
              <p className="eyebrow text-sand">Next Group Departure</p>
              <span className="rounded-full bg-accent px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-accent-foreground">{statusLabel[tour.status]}</span>
            </div>
            <h1 className="display animate-rise mt-5 max-w-4xl text-[2.6rem] text-primary-foreground sm:text-6xl lg:text-[5.4rem]" style={{ animationDelay: "300ms" }}>{tour.title}</h1>
            <ul className="animate-rise mt-6 flex flex-wrap gap-x-6 gap-y-2 text-primary-foreground/90" style={{ animationDelay: "450ms" }}>
              {tour.startDate && <li className="flex items-center gap-2"><Calendar className="h-4 w-4" />{formatTourDateRange(tour)}</li>}
              {tour.duration && <li className="flex items-center gap-2"><Clock className="h-4 w-4" />{tour.duration}</li>}
              {tour.departureFrom && <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />From {tour.departureFrom}</li>}
            </ul>
            <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "600ms" }}>
              <Link to="/tours/$slug" params={{ slug: tour.slug }} className={btnPrimary}>View Tour Details <ArrowRight className="h-4 w-4" /></Link>
              <a href="#plan" className={btnGhostLight}>Enquire Now</a>
            </div>
          </>
        ) : (
          <>
            <p className="eyebrow animate-rise text-sand" style={{ animationDelay: "150ms" }}>Upcoming Group Tours</p>
            <h1 className="display animate-rise mt-5 max-w-4xl text-[2.6rem] text-primary-foreground sm:text-6xl lg:text-[5.4rem]" style={{ animationDelay: "300ms" }}>
              New departures are <em className="font-normal italic text-sand">being announced.</em>
            </h1>
            <p className="animate-rise mt-6 max-w-xl text-base text-primary-foreground/90 md:text-lg" style={{ animationDelay: "450ms" }}>
              Get the latest group-tour dates directly on WhatsApp.
            </p>
            <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "600ms" }}>
              <a href={communityHref} target="_blank" rel="noopener noreferrer" className={btnPrimary}>Join Our Travel Community <ArrowRight className="h-4 w-4" /></a>
              <a href="#plan" className={btnGhostLight}>Plan Your Tour</a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

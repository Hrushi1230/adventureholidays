import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { communityHref, images } from "@/lib/site";
import { formatTourDate, getUpcomingTours, statusLabel, type Tour } from "@/lib/tours";
import { EmptyPanel, SectionHead, btnPrimary } from "./ui";

function DepartureRow({ t }: { t: Tour }) {
  const soldOut = t.status === "sold-out";
  return (
    <Link to="/tours/$slug" params={{ slug: t.slug }} className="group flex w-[80vw] max-w-sm shrink-0 snap-start items-center gap-4 border border-border bg-card p-3 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:w-auto md:max-w-none">
      <img src={t.coverImage ?? images.hero} alt="" loading="lazy" className="h-20 w-20 shrink-0 object-cover" />
      <div className="min-w-0 flex-1">
        <p className="eyebrow text-[0.6rem] text-accent">{formatTourDate(t.startDate) ?? "Date TBA"}</p>
        <p className="display mt-1 truncate text-xl text-primary">{t.destination}</p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className={`text-[0.65rem] font-bold uppercase tracking-widest ${soldOut ? "text-muted-foreground" : "text-primary"}`}>{statusLabel[t.status]}</span>
          <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-widest text-primary">View <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
        </div>
      </div>
    </Link>
  );
}

export function UpcomingDepartures() {
  const upcomingTours = getUpcomingTours();
  return (
    <section id="upcoming" className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Upcoming departures" title="Join our upcoming group journeys." text="Browse every scheduled group departure." />
        {upcomingTours.length ? (
          <>
            <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
              {upcomingTours.map((t) => <DepartureRow key={t.id} t={t} />)}
            </div>
            <div className="reveal mt-8 grid gap-4 border-t border-border pt-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="min-w-0">
                <p className="display text-xl text-primary">Want new tour announcements first?</p>
                <p className="mt-1 text-sm text-muted-foreground">Get new group-tour dates in the official Adventure Holiday WhatsApp group.</p>
              </div>
              <a href={communityHref} target="_blank" rel="noopener noreferrer" className={btnPrimary}>Get Tour Updates on WhatsApp <ArrowRight className="h-4 w-4" /></a>
            </div>
          </>
        ) : (
          <EmptyPanel title="New departures are being planned." text="Join our WhatsApp travel community to receive upcoming tour announcements.">
            <a href={communityHref} target="_blank" rel="noopener noreferrer" className={btnPrimary}>Get Tour Updates on WhatsApp <ArrowRight className="h-4 w-4" /></a>
          </EmptyPanel>
        )}
      </div>
    </section>
  );
}

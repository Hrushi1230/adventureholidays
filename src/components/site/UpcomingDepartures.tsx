import { ArrowRight } from "lucide-react";
import { communityHref } from "@/lib/site";
import { getUpcomingTours } from "@/lib/tours";
import { TourCard } from "./TourCard";
import { EmptyPanel, SectionHead, btnPrimary } from "./ui";

export function UpcomingDepartures() {
  const upcomingTours = getUpcomingTours();
  return (
    <section id="upcoming" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Book now" title="Upcoming Departures" text="Confirmed group departures open for booking." />
        {upcomingTours.length ? (
          <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {upcomingTours.map((t) => <TourCard key={t.id} t={t} className="w-[78vw] shrink-0 snap-start md:w-auto" />)}
          </div>
        ) : (
          <EmptyPanel title="New departures are being planned." text="Join our WhatsApp travel community to receive upcoming tour announcements.">
            <a href={communityHref} target="_blank" rel="noopener noreferrer" className={btnPrimary}>Join Our Group <ArrowRight className="h-4 w-4" /></a>
          </EmptyPanel>
        )}
      </div>
    </section>
  );
}

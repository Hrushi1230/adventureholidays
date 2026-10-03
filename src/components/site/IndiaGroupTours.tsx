import { ArrowRight } from "lucide-react";
import { images, upcomingTours } from "@/lib/site";
import { TourCard } from "./TourCard";
import { btnPrimary } from "./ui";

export function IndiaGroupTours() {
  const tours = upcomingTours.filter((t) => t.segment !== "odisha");
  return (
    <section id="group-tours" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow text-accent">Group Tours</p>
          <h2 className="display mt-4 text-4xl text-primary md:text-6xl">Group Tours Across India</h2>
          <p className="mt-6 max-w-md text-muted-foreground md:text-lg">
            Travel with a group on scheduled Adventure Holiday departures. New group tours are announced periodically.
          </p>
          <a href="#upcoming" className={`${btnPrimary} mt-8`}>View Upcoming Tours <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="lg:col-span-7">
          {tours.length ? (
            <div className="grid gap-4 sm:grid-cols-2">{tours.slice(0, 2).map((t) => <TourCard key={t.id} t={t} />)}</div>
          ) : (
            <div className="reveal grid grid-cols-5 gap-4">
              <img src={images.kashmir} alt="Shikara on Dal Lake, Kashmir" loading="lazy" width={1280} height={960} className="col-span-3 aspect-[4/5] h-full w-full object-cover" />
              <img src={images.rajasthan} alt="Fort in Rajasthan" loading="lazy" width={1280} height={960} className="col-span-2 mt-12 aspect-[3/5] h-full w-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

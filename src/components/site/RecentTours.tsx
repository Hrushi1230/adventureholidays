import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getAlbumsNewestFirst } from "@/lib/gallery";
import { AlbumCard } from "./gallery/AlbumCard";
import { EmptyPanel, SectionHead, btnOutline } from "./ui";

export function RecentTours() {
  const items = getAlbumsNewestFirst().slice(0, 3);
  return (
    <section id="recent-tours" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Completed tours" title="Recent Journeys" />
        {items.length ? (
          <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0">
            {items.map((a) => <AlbumCard key={a.id} a={a} className="reveal w-[80vw] shrink-0 snap-start md:w-auto" />)}
          </div>
        ) : (
          <EmptyPanel title="Tour memories coming soon." text="Photos and traveller stories from completed Adventure Holiday journeys will appear here." />
        )}
        <Link to="/gallery" className={`${btnOutline} mt-10`}>View Full Gallery <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}

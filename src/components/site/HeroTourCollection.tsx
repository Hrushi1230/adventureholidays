import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, formatTourDateRange, getUpcomingTours, inr, isBookable, statusLabel } from "@/lib/tours";
import { TourBookingDialog } from "./TourBookingDialog";

export function HeroTourCollection() {
  const tours = getUpcomingTours();
  const [viewportRef, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", slidesToScroll: 1 });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const update = useCallback(() => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
    setSnaps(api.scrollSnapList());
    setCanPrevious(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, [api]);
  useEffect(() => {
    if (!api) return;
    update();
    api.on("select", update).on("reInit", update);
    return () => { api.off("select", update).off("reInit", update); };
  }, [api, update]);

  return (
    <div id="upcoming" className="hero-tour-area" aria-label="Upcoming group tours">
      {tours.length ? <>
        <div ref={viewportRef} className="hero-tour-viewport">
          <div className="hero-tour-track">
            {tours.map((tour) => {
              const amount = tour.pricing?.offerPrice ?? tour.pricing?.regularPrice;
              const price = amount !== undefined ? inr(amount) : formatPrice(tour.price);
              const dates = formatTourDateRange(tour);
              return <article key={tour.id} className="hero-tour-card">
                <div className="hero-tour-image">
                  {tour.coverImage ? <img src={tour.coverImage} alt={`${tour.title} — ${tour.destination}`} loading="eager" /> : <div className="hero-tour-image-placeholder"><Mountain size={36} aria-hidden /></div>}
                  <span className="hero-tour-status">{statusLabel[tour.status]}</span>
                </div>
                <div className="hero-tour-body">
                  <h2 className="hero-tour-title">{tour.title}</h2>
                  <div className="hero-tour-facts">
                    {dates && <span><CalendarDays aria-hidden />{dates}</span>}
                    {tour.duration && <span><Clock3 aria-hidden />{tour.duration}</span>}
                    {tour.departureFrom && <span><MapPin aria-hidden />From {tour.departureFrom}</span>}
                  </div>
                  <div className="hero-tour-price">{price ? <><strong>{price}</strong><small>/ person</small></> : <small>Enquire for pricing</small>}</div>
                  <div className="hero-tour-actions">
                    <Button asChild variant="outline" className="border-primary bg-card text-primary hover:bg-primary hover:text-primary-foreground"><Link to="/tours/$slug" params={{ slug: tour.slug }}>View Itinerary <ArrowRight aria-hidden /></Link></Button>
                    {isBookable(tour) && <TourBookingDialog tour={tour} className="bg-accent text-accent-foreground hover:bg-accent/90" />}
                  </div>
                </div>
              </article>;
            })}
          </div>
        </div>
        {snaps.length > 1 && <div className="hero-tour-controls">
          <Button variant="ghost" size="icon" className="rounded-full border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground" aria-label="Previous tour" disabled={!canPrevious} onClick={() => api?.scrollPrev()}><ArrowLeft /></Button>
          <div className="hero-tour-dots">{snaps.map((_, i) => <Button key={i} variant="ghost" className="hero-tour-dot" aria-label={`Show tour ${i + 1}`} aria-current={selected === i} onClick={() => api?.scrollTo(i)} />)}</div>
          <Button variant="ghost" size="icon" className="rounded-full border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground" aria-label="Next tour" disabled={!canNext} onClick={() => api?.scrollNext()}><ArrowRight /></Button>
        </div>}
      </> : <p className="py-8 text-sm">New departures are being planned.</p>}
    </div>
  );
}
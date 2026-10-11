import { ArrowRight, ArrowUpRight, Heart, MapPin, ShieldCheck, Users } from "lucide-react";
import heroAsset from "@/assets/adventure-holiday-hero.png.asset.json";
import { communityHref } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { HeroTourCollection } from "./HeroTourCollection";
import { btnPrimary } from "./ui";
import "./hero.css";

export function UpcomingHero() {
  return (
    <section id="home" className="booking-hero">
      <div className="booking-hero-background">
        <img src={heroAsset.url} alt="Hikers overlooking a turquoise alpine lake and mountain range" width={1365} height={768} fetchPriority="high" />
      </div>
      <div className="booking-hero-overlay" />
      <div className="booking-hero-inner">
        <p className="eyebrow mb-3 flex items-center gap-4 text-[0.6rem] text-primary-foreground">Upcoming Group Tours <span className="h-px w-16 bg-accent" /></p>
        <h1 className="booking-hero-heading animate-rise">
          Explore Incredible India<br />
          With <span className="text-accent">Adventure Holiday</span>
        </h1>
        <p className="booking-hero-intro text-primary-foreground/90">
          Curated group tours with fixed departures, experienced tour leaders and unforgettable travel experiences.
        </p>
        <div className="booking-hero-benefits">
          {[[Users, "Fixed Departure Tours"], [MapPin, "From Bhubaneswar"], [ShieldCheck, "Experienced Tour Team"], [Heart, "Safe & Comfortable Travel"]].map(([Icon, text]) => {
            const BenefitIcon = Icon as typeof Users;
            return <div key={String(text)} className="booking-hero-benefit"><span className="booking-hero-benefit-icon"><BenefitIcon size={17} aria-hidden /></span><span>{String(text)}</span></div>;
          })}
        </div>
        <HeroTourCollection />
        <div className="booking-hero-bottom">
          <Button asChild className={`${btnPrimary} h-12 hover:bg-accent/90`}><a href="#plan">Plan Your Tour <ArrowRight /></a></Button>
          <Button asChild variant="link" className="h-auto p-0 font-bold uppercase text-primary-foreground hover:text-accent"><a href="#upcoming">View Upcoming Tours <ArrowRight /></a></Button>
          <Button asChild variant="link" className="h-auto p-0 font-bold uppercase text-primary-foreground/85 hover:text-accent"><a href={communityHref} target="_blank" rel="noopener noreferrer">
            Join WhatsApp Group <ArrowUpRight className="h-4 w-4" />
          </a></Button>
        </div>
      </div>
    </section>
  );
}

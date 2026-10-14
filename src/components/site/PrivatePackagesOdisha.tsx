import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { getPrivateDestination } from "@/lib/private-packages";
import "./private/private-packages.css";

export function PrivatePackagesOdisha() {
  const destination = getPrivateDestination("odisha");
  if (!destination) return null;
  return (
    <section id="private-odisha" className="private-explorer border-t border-border bg-background" aria-labelledby="private-odisha-title">
      <div className="private-container">
        <p className="eyebrow text-accent">Explore Our Home State</p>
        <h2 id="private-odisha-title" className="private-heading mt-3">Discover Odisha, Your Way.</h2>
        <p className="private-intro">Explore beautiful destinations across Odisha with private journeys tailored to you.</p>
        <div className="odisha-grid">
          {destination.places.map((place) => {
            const available = place.status === "available";
            return (
              <Link key={place.slug} to="/private-packages/$destination/places/$place" params={{ destination: destination.slug, place: place.slug }} className={`destination-tile odisha-tile${available ? " odisha-tile-available" : ""}`} aria-label={`${place.name} — ${available ? "Available" : "Coming Soon"}`}>
                {place.image ? <img src={place.image} alt={`${place.name}, Odisha scenery`} width={480} height={270} loading="lazy" decoding="async" /> : <div className="destination-placeholder"><MapPin size={28} aria-hidden /></div>}
                <span className={`odisha-badge${available ? " odisha-badge-available" : ""}`}>{available ? "Available" : "Coming Soon"}</span>
                <span className="destination-label"><span className="destination-name min-w-0">{place.name}</span><ArrowUpRight className="destination-arrow" aria-hidden /></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

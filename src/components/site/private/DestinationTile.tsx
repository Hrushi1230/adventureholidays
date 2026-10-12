import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { type PrivateDestination } from "@/lib/private-packages";
import "./private-packages.css";

export function DestinationTile({ destination }: { destination: PrivateDestination }) {
  return <Link to="/private-packages/$destination" params={{ destination: destination.slug }} className="destination-tile" aria-label={`Explore ${destination.name}`}>
    {destination.coverImage ? <img src={destination.coverImage} alt={destination.imageAlt} width={480} height={270} loading="lazy" decoding="async" /> : <div className="destination-placeholder"><MapPin size={30} aria-hidden /></div>}
    <span className="destination-label"><span className="destination-name min-w-0">{destination.name}<span className="destination-explore">Explore</span></span><ArrowUpRight className="destination-arrow" aria-hidden /></span>
  </Link>;
}
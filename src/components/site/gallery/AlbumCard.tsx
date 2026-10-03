import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { albumStats, formatAlbumDate, type TourAlbum } from "@/lib/gallery";

export function AlbumCard({ a, className = "" }: { a: TourAlbum; className?: string }) {
  return (
    <Link to="/gallery/$slug" params={{ slug: a.slug }} className={`group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={a.coverImage} alt={`${a.title} — Adventure Holiday completed tour`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
      </div>
      <div className="pt-4">
        <p className="eyebrow text-[0.6rem] text-accent">{formatAlbumDate(a.tourDate)}{a.destination ? ` · ${a.destination}` : ""}</p>
        <h3 className="display mt-2 text-2xl text-primary">{a.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{albumStats(a).join(" · ")}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary">View Album <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
      </div>
    </Link>
  );
}

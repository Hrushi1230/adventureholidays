import { ArrowUpRight } from "lucide-react";
import { formatDate, statusLabel, type UpcomingTour } from "@/lib/site";

export function TourCard({ t, className = "" }: { t: UpcomingTour; className?: string }) {
  return (
    // Detail pages arrive in the next pass; slug anchor keeps links stable.
    <a href={`#tour-${t.slug}`} id={`tour-${t.slug}`} className={`group relative block aspect-[3/4] overflow-hidden ${className}`}>
      <img src={t.coverImage} alt={t.title} loading="lazy" width={960} height={1280} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
      <div className="card-scrim absolute inset-0" />
      <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest ${t.status === "sold-out" ? "bg-muted text-muted-foreground" : "bg-accent text-accent-foreground"}`}>{statusLabel[t.status]}</span>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="eyebrow text-[0.6rem] text-sand">{t.destination}</p>
        <h3 className="display mt-2 text-2xl text-primary-foreground">{t.title}</h3>
        <p className="mt-2 text-sm text-primary-foreground/85">{[formatDate(t.startDate), t.duration].filter(Boolean).join(" · ")}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-foreground">View Details <ArrowUpRight className="h-4 w-4" /></span>
      </div>
    </a>
  );
}

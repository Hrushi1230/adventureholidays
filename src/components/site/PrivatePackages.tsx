import { ArrowRight } from "lucide-react";
import { destinations, images, openEnquiry } from "@/lib/site";
import { btnPrimary } from "./ui";

export function PrivatePackages() {
  return (
    <section id="private" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow text-accent">Private Packages</p>
          <h2 className="display mt-4 text-4xl text-primary md:text-5xl">Private tours across {destinations.length} destinations &amp; regions</h2>
          <p className="mt-6 max-w-md text-muted-foreground md:text-lg">Plan a trip around your dates, your people and your preferred destination.</p>
          <button type="button" onClick={() => openEnquiry("Private Tour")} className={`${btnPrimary} mt-8`}>Plan a Private Tour <ArrowRight className="h-4 w-4" /></button>
          <img src={images.kerala} alt="Houseboat on the Kerala backwaters" loading="lazy" width={1024} height={1280} className="mt-10 hidden aspect-[4/3] w-full object-cover lg:block" />
        </div>
        <ol className="reveal grid grid-cols-1 content-start gap-x-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <li key={d} className="group flex items-baseline gap-3 border-b border-border py-4">
              <span className="w-6 text-xs tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="display text-xl text-primary transition-colors group-hover:text-accent">{d}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

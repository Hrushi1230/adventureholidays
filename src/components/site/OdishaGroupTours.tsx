import { ArrowRight } from "lucide-react";
import { images, openEnquiry } from "@/lib/site";
import { btnPrimary } from "./ui";

export function OdishaGroupTours() {
  return (
    <section id="odisha" className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div className="reveal order-2 lg:order-1">
          <img src={images.odisha} alt="Carved stone wheel of the Konark Sun Temple, Odisha" loading="lazy" width={1024} height={1280} className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]" />
        </div>
        <div className="reveal order-1 lg:order-2">
          <p className="eyebrow text-sand">Home state</p>
          <h2 className="display mt-4 text-4xl md:text-6xl">Group Tours Within Odisha</h2>
          <p className="mt-6 max-w-md text-primary-foreground/85 md:text-lg">Explore Odisha through scheduled group journeys by Adventure Holiday.</p>
          <button type="button" onClick={() => openEnquiry("Group Tour")} className={`${btnPrimary} mt-8`}>Ask About Odisha Tours <ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}

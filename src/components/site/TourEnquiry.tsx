import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { business, whatsappLink, type TourType } from "@/lib/site";
import { btnPrimary } from "./ui";

const field = "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-0";
const label = "eyebrow text-[0.6rem] text-muted-foreground";

export function TourEnquiry() {
  const [type, setType] = useState<TourType>("Group Tour");
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const on = (e: Event) => setType((e as CustomEvent<TourType>).detail);
    window.addEventListener("ah:tour-type", on);
    return () => window.removeEventListener("ah:tour-type", on);
  }, []);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim() || "-";
    const text = [
      "Hello Adventure Holiday,",
      "",
      `Name: ${v("name")}`,
      `Phone: ${v("phone")}`,
      `Destination: ${v("destination")}`,
      `Travel Date: ${v("date")}`,
      `Tour Type: ${type}`,
      `Message: ${v("message")}`,
      "",
      "I would like to enquire about this tour.",
    ].join("\n");
    window.open(whatsappLink(text), "_blank", "noopener");
    setOpened(true);
  }

  return (
    <section id="plan" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="reveal lg:col-span-4">
          <p className="eyebrow text-accent">Enquiry</p>
          <h2 className="display mt-4 text-4xl text-primary md:text-5xl">Plan Your Tour</h2>
          <p className="mt-5 text-muted-foreground">Send your details and we'll reply on WhatsApp.</p>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className={label}>Call</dt>
              <dd className="mt-1"><a href={business.phoneHref} className="flex items-center gap-2 text-lg text-primary hover:text-accent"><Phone className="h-4 w-4" />{business.phone}</a></dd>
            </div>
            <div>
              <dt className={label}>Office</dt>
              <dd className="mt-1 text-primary">{business.address.join(", ")}</dd>
              <dd><a href={business.mapsHref} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent"><MapPin className="h-4 w-4" />Get Directions</a></dd>
            </div>
          </dl>
        </div>
        <form onSubmit={submit} className="reveal grid gap-6 bg-card p-6 shadow-soft sm:grid-cols-2 md:p-10 lg:col-span-8">
          <label className="block"><span className={label}>Name *</span><input name="name" required autoComplete="name" className={field} /></label>
          <label className="block"><span className={label}>Phone Number *</span><input name="phone" type="tel" inputMode="tel" required autoComplete="tel" className={field} /></label>
          <label className="block"><span className={label}>Destination</span><input name="destination" className={field} /></label>
          <label className="block"><span className={label}>Travel Date</span><input name="date" type="date" className={field} /></label>
          <fieldset className="sm:col-span-2">
            <legend className={label}>Tour Type</legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {(["Group Tour", "Private Tour"] as const).map((t) => (
                <label key={t} className={`cursor-pointer rounded-full border px-5 py-3 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${type === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-primary"}`}>
                  <input type="radio" name="tourType" value={t} checked={type === t} onChange={() => setType(t)} className="sr-only" />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="block sm:col-span-2"><span className={label}>Message</span><textarea name="message" rows={4} className={`${field} resize-none`} /></label>
          <div className="flex flex-col items-start gap-4 sm:col-span-2">
            <button type="submit" className={`${btnPrimary} w-full sm:w-auto`}>Send Inquiry <ArrowRight className="h-4 w-4" /></button>
            <p role="status" className="text-sm text-muted-foreground">
              {opened ? "WhatsApp opened with your enquiry — press send there to reach us." : "Your enquiry opens in WhatsApp, ready to send."}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

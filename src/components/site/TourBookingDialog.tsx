import { useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTourDateRange, inr, type Tour } from "@/lib/tours";
import { whatsappLink } from "@/lib/site";

const field = "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-0";
const label = "eyebrow text-[0.58rem] text-muted-foreground";

export function TourBookingDialog({ tour, className }: { tour: Tour; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim() || "-";
    const date = formatTourDateRange(tour);
    const price = tour.pricing?.offerPrice ?? tour.pricing?.regularPrice;
    const message = [
      "Hello Adventure Holiday,",
      "",
      `I would like to book the ${tour.title}.`,
      ...(date ? [`Travel Date: ${date}`] : []),
      ...(price ? [`Package Price: ${inr(price)} per person`] : []),
      "",
      `Name: ${value("name")}`,
      `Phone: ${value("phone")}`,
      `Number of Travellers: ${value("travellers")}`,
      `Message: ${value("message")}`,
      "",
      "Please share the next booking steps.",
    ].join("\n");

    window.open(whatsappLink(message), "_blank", "noopener");
    dialogRef.current?.close();
  }

  return (
    <>
      <Button type="button" className={className} onClick={() => dialogRef.current?.showModal()}>Book Now <ArrowRight aria-hidden /></Button>
      <dialog
        ref={dialogRef}
        onClick={(event) => event.target === dialogRef.current && dialogRef.current?.close()}
        className="m-auto max-h-[92svh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto border border-border bg-card p-6 text-foreground shadow-soft backdrop:bg-overlay/80 sm:p-8"
      >
        <Button type="button" variant="ghost" size="icon" aria-label="Close booking form" onClick={() => dialogRef.current?.close()} className="absolute right-3 top-3 rounded-full text-muted-foreground">
          <X aria-hidden />
        </Button>
        <div className="pr-8 text-left">
          <p className="eyebrow text-accent">Booking request</p>
          <h2 className="display mt-2 text-3xl text-primary sm:text-4xl">{tour.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">Share a few details, then send your request directly on WhatsApp.</p>
        </div>
        <form onSubmit={submit} className="mt-3 grid gap-6 sm:grid-cols-2">
          <label className="block"><span className={label}>Name *</span><input name="name" required autoComplete="name" className={field} /></label>
          <label className="block"><span className={label}>Phone Number *</span><input name="phone" type="tel" inputMode="tel" required autoComplete="tel" className={field} /></label>
          <label className="block sm:col-span-2"><span className={label}>Number of Travellers *</span><input name="travellers" type="number" min="1" required className={field} /></label>
          <label className="block sm:col-span-2"><span className={label}>Message</span><textarea name="message" rows={3} className={`${field} resize-none`} /></label>
          <Button type="submit" size="lg" className="h-12 rounded-full px-7 sm:col-span-2 sm:w-fit">Continue to WhatsApp <ArrowRight aria-hidden /></Button>
        </form>
      </dialog>
    </>
  );
}
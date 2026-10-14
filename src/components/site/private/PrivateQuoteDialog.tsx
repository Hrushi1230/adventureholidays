import { useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { privateDestinations, privateQuoteHref } from "@/lib/private-packages";
import "./private-packages.css";

export function PrivateQuoteDialog({ destination, selection, label = "Get Customized Quote", className }: { destination?: string | undefined; selection?: string | undefined; label?: string | undefined; className?: string | undefined }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [handoff, setHandoff] = useState<string>();
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const href = privateQuoteHref({ name: value("name"), phone: value("phone"), destination: value("destination"), selection,
      travelDates: value("travelDates"), travellers: value("travellers"), pickupCity: value("pickupCity"), requirements: value("requirements") });
    setHandoff(href);
    window.open(href, "_blank", "noopener,noreferrer");
  }
  return <>
    <Button className={className} onClick={() => { setHandoff(undefined); dialog.current?.showModal(); }}>{label}<ArrowRight aria-hidden /></Button>
    <dialog ref={dialog} className="private-quote-dialog" aria-labelledby="private-quote-title" onClick={(event) => { if (event.target === dialog.current) dialog.current?.close(); }}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0"><p className="eyebrow text-accent">Private journey enquiry</p><h2 id="private-quote-title" className="private-heading mt-2">{destination ?? "Your private journey"}</h2>{selection && <p className="private-intro">{selection}</p>}</div>
        <Button variant="ghost" size="icon" className="shrink-0" aria-label="Close quotation form" onClick={() => dialog.current?.close()}><X /></Button>
      </div>
      <form onSubmit={submit} className="private-form">
        <label><span className="private-field-label">Customer name *</span><input className="private-field" name="name" autoComplete="name" required /></label>
        <label><span className="private-field-label">Contact number *</span><input className="private-field" name="phone" type="tel" autoComplete="tel" required /></label>
        <label><span className="private-field-label">Destination *</span><select className="private-field" name="destination" defaultValue={destination ?? ""} required><option value="" disabled>Select destination</option>{privateDestinations.map((item) => <option key={item.slug}>{item.name}</option>)}</select></label>
        <label><span className="private-field-label">Preferred travel dates *</span><input className="private-field" name="travelDates" placeholder="Dates or preferred date range" required /></label>
        <label><span className="private-field-label">Number of travellers *</span><input className="private-field" name="travellers" type="number" min="1" step="1" required /></label>
        <label><span className="private-field-label">Pickup city *</span><input className="private-field" name="pickupCity" autoComplete="address-level2" required /></label>
        <label className="sm:col-span-2"><span className="private-field-label">Optional requirements</span><textarea className="private-field" name="requirements" rows={2} /></label>
        <div className="sm:col-span-2"><Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Continue to WhatsApp<ArrowRight aria-hidden /></Button>
          {handoff && <p className="mt-3 text-sm text-muted-foreground">Your enquiry is ready. <Button asChild variant="link" className="h-auto p-0"><a href={handoff} target="_blank" rel="noopener noreferrer">Open WhatsApp</a></Button></p>}
        </div>
      </form>
    </dialog>
  </>;
}
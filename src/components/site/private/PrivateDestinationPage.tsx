import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type PrivateDestination, type PrivatePackage, type PrivatePlace } from "@/lib/private-packages";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { FloatingActions } from "../FloatingActions";
import { PrivateQuoteDialog } from "./PrivateQuoteDialog";
import { PrivateQuoteForm } from "./PrivateQuoteForm";
import { PhotoCredits } from "./PhotoCredits";
import "./private-packages.css";

export function AllDestinationsBack() {
  return <Button asChild variant="link" className="h-auto px-0"><Link to="/" hash="private"><ArrowLeft />Back to All Destinations</Link></Button>;
}
export function PrivatePageFrame({ children }: { children: React.ReactNode }) {
  return <><Header solidAlways /><main className="pt-24">{children}</main><Footer /><FloatingActions /></>;
}
export function PrivateHero({ destination, title, description, selection }: { destination: PrivateDestination; title?: string | undefined; description?: string | undefined; selection?: string | undefined }) {
  const place = destination.places.find((item) => item.name === selection);
  const image = place?.image ?? destination.coverImage;
  return <section className="private-hero">
    {image && <img className="private-hero-media" src={image} alt={place?.image ? `${place.name} destination scenery` : destination.imageAlt} width={1280} height={640} fetchPriority="high" />}
    <div className="private-container private-hero-content">
      <nav className="private-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/" hash="private">Private Packages India</Link><span>/</span>{selection ? <><Link to="/private-packages/$destination" params={{ destination: destination.slug }}>{destination.name}</Link><span>/</span><span>{selection}</span></> : <span>{destination.name}</span>}</nav>
      <p className="eyebrow text-sand">Private Journeys</p><h1 className="private-page-title mt-2">{title ?? destination.name}</h1>
      {description && <p className="mt-3 max-w-2xl text-sm leading-relaxed">{description}</p>}
    </div>
  </section>;
}
export function PlaceGrid({ destination }: { destination: PrivateDestination }) {
  return <div className="private-places">{destination.places.map((place) => <article key={place.slug} className="private-place">
    {place.image ? <img className="private-place-media" src={place.image} alt={`${place.name} destination scenery`} loading="lazy" width={480} height={270} /> : <div className="private-place-media destination-placeholder"><MapPin aria-hidden size={28} /></div>}
    <div className="private-place-body">
      <p className={`private-status ${place.status === "coming-soon" ? "text-muted-foreground" : place.status === "available" ? "private-status-available" : ""}`}>{place.status === "coming-soon" ? "Coming Soon" : place.status === "available" ? "Available on enquiry" : "Destination discovery"}</p>
      <h3 className="mt-2 font-display text-xl text-primary">{place.name}</h3>
      {place.description && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{place.description}</p>}
      {place.status !== "coming-soon" && <Button asChild variant="link" className="mt-2 h-auto px-0 text-xs"><Link to="/private-packages/$destination/places/$place" params={{ destination: destination.slug, place: place.slug }}>Explore {place.name}<ArrowRight /></Link></Button>}
    </div>
  </article>)}</div>;
}
function Packages({ destination, packages, selection }: { destination: PrivateDestination; packages: PrivatePackage[]; selection?: string | undefined }) {
  if (!packages.length) return null;
  return <section className="private-page-band"><div className="private-container"><h2 className="private-heading">Private Packages</h2><div className="mt-6 grid gap-5 md:grid-cols-2">{packages.map((pkg) => <article key={pkg.slug} className="rounded-lg border border-border bg-card p-6">
    <h3 className="font-display text-2xl text-primary">{pkg.title}</h3>{pkg.duration && <p className="mt-2 text-sm">{pkg.duration}</p>}{pkg.pickupCity && <p className="mt-2 text-sm">Pickup: {pkg.pickupCity}</p>}{pkg.places?.length ? <p className="private-intro">{pkg.places.join(" · ")}</p> : null}
    <div className="mt-4 flex flex-wrap gap-3"><Button asChild variant="outline"><Link to="/private-packages/$destination/packages/$package" params={{ destination: destination.slug, package: pkg.slug }}>View Itinerary<ArrowRight /></Link></Button><PrivateQuoteDialog destination={destination.name} selection={pkg.title} /></div>
  </article>)}</div></div></section>;
}
export function PrivateDestinationPage({ destination }: { destination: PrivateDestination }) {
  return <PrivatePageFrame><PrivateHero destination={destination} description={destination.description} /><PrivateQuoteForm destination={destination.name} />
    <section className="private-page-band"><div className="private-container"><AllDestinationsBack /><h2 className="private-heading mt-6">Explore Main Places</h2>
      {destination.places.length ? <><p className="private-intro">{destination.name === "Odisha" ? "Koraput is available on enquiry. Four more private destinations are coming soon." : "Places to discover in your preferred destination. Private itineraries and availability are confirmed on enquiry."}</p><PlaceGrid destination={destination} /></> : <div className="mt-5 border-b border-border pb-6"><p className="text-sm leading-relaxed text-muted-foreground">Have a favourite place in {destination.name}? Share it with us to explore a private itinerary.</p><PrivateQuoteDialog destination={destination.name} label="Enquire About Places" className="mt-4 bg-transparent text-primary shadow-none hover:bg-secondary" /></div>}
    </div></section><Packages destination={destination} packages={destination.packages} /><PhotoCredits destination={destination} /></PrivatePageFrame>;
}
export function PrivatePlacePage({ destination, place }: { destination: PrivateDestination; place: PrivatePlace }) {
  return <PrivatePageFrame><PrivateHero destination={destination} title={`${place.name} Private Journeys`} description={place.description} selection={place.name} /><PrivateQuoteForm destination={destination.name} selection={place.name} />
    <div className="private-container private-page-band"><Button asChild variant="link" className="px-0"><Link to="/private-packages/$destination" params={{ destination: destination.slug }}><ArrowLeft />Back to {destination.name}</Link></Button>
      <h2 className="private-heading mt-5">{place.status === "coming-soon" ? "Coming Soon" : place.status === "available" ? "Your customized itinerary" : `Discover ${place.name}`}</h2><p className="private-intro">{place.status === "coming-soon" ? "Private package details will be shared once available." : place.status === "available" ? "Request the current itinerary, places covered, transport, pickup, accommodation and group-size pricing from our team." : "A destination discovery option, not a confirmed package. Share your preferred dates and group size to enquire about a customized itinerary."}</p></div>
    {place.status !== "coming-soon" && <Packages destination={destination} packages={destination.packages.filter((pkg) => pkg.placeSlug === place.slug)} selection={place.name} />}<PhotoCredits destination={destination} />
  </PrivatePageFrame>;
}
export function PrivatePackagePage({ destination, pkg }: { destination: PrivateDestination; pkg: PrivatePackage }) {
  return <PrivatePageFrame><PrivateHero destination={destination} title={pkg.title} selection={pkg.title} /><PrivateQuoteForm destination={destination.name} selection={pkg.title} />
    <div className="private-container private-page-band"><Button asChild variant="link" className="px-0"><Link to="/private-packages/$destination" params={{ destination: destination.slug }}><ArrowLeft />Back to {destination.name}</Link></Button>
      <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">{pkg.duration && <p>Duration: {pkg.duration}</p>}{pkg.pickupCity && <p>Pickup: {pkg.pickupCity}</p>}{pkg.transport && <p>Transport: {pkg.transport}</p>}{pkg.accommodation && <p>Accommodation: {pkg.accommodation}</p>}</div>
      {pkg.places?.length ? <section className="mt-8"><h2 className="private-heading">Places Covered</h2><p className="private-intro">{pkg.places.join(" · ")}</p></section> : null}
      {pkg.itinerary?.length ? <section className="mt-8"><h2 className="private-heading">Day-wise Itinerary</h2>{pkg.itinerary.map((day) => <article className="border-b border-border py-5" key={day.day}><p className="eyebrow text-accent">Day {day.day}</p><h3 className="mt-2 font-display text-2xl text-primary">{day.title}</h3>{day.description && <p className="private-intro">{day.description}</p>}</article>)}</section> : null}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">{(["inclusions", "exclusions"] as const).map((key) => pkg[key]?.length ? <section key={key}><h2 className="font-display text-2xl capitalize text-primary">{key}</h2><ul className="mt-3 list-inside list-disc space-y-2 text-sm">{pkg[key]?.map((item) => <li key={item}>{item}</li>)}</ul></section> : null)}</div>
      {pkg.pricing?.length ? <section className="mt-8"><h2 className="private-heading">Group-size Pricing</h2><dl className="mt-4">{pkg.pricing.map((tier) => <div className="flex justify-between gap-4 border-b border-border py-3" key={tier.travellers}><dt>{tier.travellers}</dt><dd>₹{tier.total.toLocaleString("en-IN")} total</dd></div>)}</dl></section> : null}
    </div><PhotoCredits destination={destination} /></PrivatePageFrame>;
}
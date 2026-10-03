import { Facebook, Instagram, MapPin, Phone, Youtube } from "lucide-react";
import { business } from "@/lib/site";

const links = [
  { label: "Upcoming Tours", href: "/#upcoming" },
  { label: "Group Tours", href: "/#group-tours" },
  { label: "Private Packages", href: "/#private" },
  { label: "Gallery", href: "/gallery" },
  { label: "Rural Camps", href: "/rural-camps" },
  { label: "Picnic Point", href: "/picnic-point" },
  { label: "Contact", href: "/#plan" },
];

export function Footer() {
  const s = business.socials;
  return (
    <footer className="bg-primary pb-28 pt-16 text-primary-foreground md:pb-12">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="display text-3xl">Adventure <span className="text-accent">Holiday</span></p>
          <p className="mt-4 max-w-sm text-primary-foreground/75">{business.services.join(" · ")}</p>
          <p className="mt-2 text-sm text-primary-foreground/60">Owner: {business.owner}</p>
          <div className="mt-6 flex gap-3">
            {[{ I: Facebook, h: s.facebook, l: "Facebook" }, { I: Instagram, h: s.instagram, l: "Instagram" }, { I: Youtube, h: s.youtube, l: "YouTube" }].map(({ I, h, l }) => (
              <a key={l} href={h} target="_blank" rel="noopener noreferrer" aria-label={l} className="grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/25 transition-colors hover:border-accent hover:bg-accent"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow text-[0.62rem] text-sand">Explore</p>
          <ul className="mt-5 space-y-3 text-primary-foreground/80">
            {links.map((n) => <li key={n.href}><a href={n.href} className="hover:text-accent">{n.label}</a></li>)}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="eyebrow text-[0.62rem] text-sand">Office</p>
          <address className="mt-5 not-italic text-primary-foreground/80">{business.name}<br />{business.address.map((a) => <span key={a}>{a}<br /></span>)}</address>
          <a href={business.mapsHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent"><MapPin className="h-4 w-4" />Get Directions</a>
          <a href={business.phoneHref} className="mt-4 flex items-center gap-2 text-primary-foreground/90 hover:text-accent"><Phone className="h-4 w-4" />{business.phone}</a>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-primary-foreground/15 px-5 pt-6 text-xs text-primary-foreground/60 sm:flex-row md:px-8">
        <p>© {new Date().getFullYear()} Adventure Holiday. All rights reserved.</p>
        <p>Registered MSME · {business.udyam}</p>
      </div>
    </footer>
  );
}

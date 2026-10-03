// Single source of truth for Adventure Holiday business data.
// Update arrays below as real tours, albums and testimonials become available —
// components render honest empty states while they are empty.
import hero from "@/assets/hero.jpg";
import kerala from "@/assets/kerala.jpg";
import rajasthan from "@/assets/rajasthan.jpg";
import rafting from "@/assets/rafting.jpg";
import goa from "@/assets/goa.jpg";
import odisha from "@/assets/odisha.jpg";
import kashmir from "@/assets/kashmir.jpg";
import northeast from "@/assets/northeast.jpg";

export const images = { hero, kerala, rajasthan, rafting, goa, odisha, kashmir, northeast };

const PHONE = "9937524018";

export const business = {
  name: "Adventure Holiday",
  owner: "Manas Sahoo",
  phone: "+91 99375 24018",
  phoneHref: `tel:+91${PHONE}`,
  whatsappNumber: `91${PHONE}`,
  whatsappHref: `https://wa.me/91${PHONE}`,
  // TODO: Verify client email before publishing (supplied as "gmai.com"). Not displayed.
  email: "adventureholidaytour@gmai.com",
  address: ["L-213, Phase-3, Dumuduma", "Bhubaneswar, Odisha – 751019"],
  mapsHref: "https://maps.app.goo.gl/ncVZjUZBG6BS6meSA",
  udyam: "UDYAM-OD-19-0109058",
  services: ["Domestic Tours", "International Tours", "Group Tours", "Private Tours"],
  socials: {
    facebook: "https://www.facebook.com/adventureholidayofficial/",
    instagram: "https://www.instagram.com/adventure__holiday",
    youtube: "https://www.youtube.com/@AdventureHoliday",
  },
  // WhatsApp community invite URL — not supplied yet. Join Group stays hidden while empty.
  whatsappGroupInvite: "",
};

export function whatsappLink(text: string) {
  return `${business.whatsappHref}?text=${encodeURIComponent(text)}`;
}

/** Where "join our community" CTAs go: the invite if supplied, else a direct WhatsApp request. */
export const communityHref =
  business.whatsappGroupInvite ||
  whatsappLink("Hello Adventure Holiday, please share upcoming group tour announcements with me.");

export const nav = [
  { label: "Home", href: "/#home" },
  { label: "Upcoming Tours", href: "/#upcoming" },
  { label: "Group Tours", href: "/#group-tours" },
  { label: "Private Packages", href: "/#private" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/#testimonials" },
];

export const exploreNav = [
  { label: "Rural Camps", href: "/rural-camps" },
  { label: "Picnic Point", href: "/picnic-point" },
];

export const destinations = [
  "Kashmir", "Himachal Pradesh", "Uttarakhand", "Gujarat", "Maharashtra", "Madhya Pradesh",
  "Kerala", "Karnataka", "Tamil Nadu", "Rajasthan", "Andaman", "Assam", "Meghalaya",
  "Arunachal Pradesh", "Sikkim", "Uttar Pradesh", "Delhi", "Punjab", "Odisha",
] as const;

export type TourStatus = "booking-open" | "few-seats" | "sold-out";
export const statusLabel: Record<TourStatus, string> = {
  "booking-open": "Booking Open",
  "few-seats": "Few Seats",
  "sold-out": "Sold Out",
};

export type UpcomingTour = {
  id: string;
  slug: string;
  title: string;
  destination: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  departureFrom?: string;
  status: TourStatus;
  coverImage: string;
  featured?: boolean;
  segment?: "india" | "odisha";
};

// Add only confirmed departures here.
export const upcomingTours: UpcomingTour[] = [];

export type CompletedTour = {
  id: string;
  slug: string;
  title: string;
  tourDate: string;
  coverImage: string;
  photoCount?: number;
  testimonialType?: "text" | "video";
};

// Add only real completed tours here.
export const completedToursPreview: CompletedTour[] = [];

export type Testimonial = {
  id: string;
  name: string;
  tour?: string;
  date?: string;
  quote?: string;
  video?: string;
  photo?: string;
};

// Add only authentic client testimonials here.
export const testimonials: Testimonial[] = [];

export function formatDate(d?: string) {
  if (!d) return undefined;
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export type TourType = "Group Tour" | "Private Tour";

/** Scroll to the enquiry form and preselect a tour type. */
export function openEnquiry(type?: TourType) {
  if (type) window.dispatchEvent(new CustomEvent<TourType>("ah:tour-type", { detail: type }));
  document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" });
}

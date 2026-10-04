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
  whatsappGroupInvite: "https://chat.whatsapp.com/C6QUaWa4QPTIjq4NOR5j95?mode",
};

export function whatsappLink(text: string) {
  return `${business.whatsappHref}?text=${encodeURIComponent(text)}`;
}

/** Official Adventure Holiday WhatsApp group invite. */
export const communityHref = business.whatsappGroupInvite;

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

// Scheduled group departures live in src/lib/tours.ts.


// Completed-tour albums live in src/lib/gallery.ts.

export type Testimonial = {
  id: string;
  name: string;
  rating?: number;
  tour?: string;
  date?: string;
  quote?: string;
  video?: string;
  photo?: string;
};

// Authentic client reviews supplied as Google review screenshots. Profile photos are intentionally omitted.
export const testimonials: Testimonial[] = [
  {
    id: "review-dkm",
    name: "D K M",
    rating: 5,
    quote: "Thank you Adventure Holiday and Manas babu for making our dream vacation a reality with your impeccable planning and attention to detail. I recommend Adventure Holiday to Odia travellers for their care and detailed planning.",
  },
  {
    id: "review-swapnil-gudu",
    name: "Swapnil Gudu",
    rating: 5,
    tour: "Kashmir trip",
    quote: "Had a great experience with the team managing my parents’ Kashmir trip. Everything was handled smoothly with professionalism and care. I truly appreciate the seamless coordination and support throughout—highly recommended!",
  },
  {
    id: "review-goutam-goswami",
    name: "Goutam Goswami",
    rating: 5,
    quote: "First time with Adventure Holiday and had the most amazing time ever. I would love to travel with them again soon.",
  },
  {
    id: "review-sahu-ajit",
    name: "Sahu Ajit",
    rating: 5,
    tour: "Shimla Manali tour",
    quote: "Amazing experience with Adventure Holiday Bhubaneswar! They curated a high-quality Shimla Manali experience at an economical price. The 24/7 support made us feel safe and cared for, and the accommodation and transportation were top-notch.",
  },
  {
    id: "review-sibaram-panigrahi",
    name: "Sibaram Panigrahi",
    rating: 5,
    quote: "Very nicely arranged. The tour operator was mindful of everyone’s comfort and brought the group together. We started as strangers and ended with lots of happy moments.",
  },
  {
    id: "review-biswannath-mohanty",
    name: "Biswannath Mohanty",
    rating: 5,
    tour: "Kashmir trip",
    quote: "A very good experience on our Kashmir trip. Everyone was cooperative, the food was good, and the overall experience was very enjoyable.",
  },
];

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

// TEMPORARY DEMO SOCIAL PROOF.
// Replace with verified client metrics before production launch, then set demoOnly: false.
export const trustMetrics = {
  demoOnly: true,
  yearsExperience: "10+",
  reviews: "100+",
  rating: "4.8",
};

/** Demo metrics render only in development while unverified. */
export const showTrustMetrics = !trustMetrics.demoOnly || import.meta.env.DEV;

// DEVELOPMENT-ONLY layout fixtures. Never rendered in production builds.
export const demoTestimonials: Testimonial[] = [
  { id: "demo-1", name: "Demo Traveller", tour: "Layout preview", quote: "Demo testimonial for layout preview only." },
  { id: "demo-2", name: "Demo Traveller", tour: "Layout preview", quote: "Demo testimonial for layout preview only." },
  { id: "demo-3", name: "Demo Traveller", tour: "Layout preview", quote: "Demo testimonial for layout preview only." },
];

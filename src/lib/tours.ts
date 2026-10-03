// Single source of truth for scheduled group departures.
// Add ONE object to `tours` and it powers the homepage hero (when featured),
// Upcoming Departures, its /tours/{slug} page, WhatsApp enquiry, SEO and status.
// Only add confirmed departures — never placeholder dates, prices or itineraries.
import { whatsappLink } from "./site";

export type TourStatus = "booking-open" | "few-seats" | "sold-out" | "completed";
export type TourCategory = "group-india" | "group-odisha";

export type TourItineraryDay = {
  day: number;
  title: string;
  description?: string;
  places?: string[];
  nightStay?: string;
};

export type TourPricing = {
  regularPrice?: number;
  offerPrice?: number;
  offerLabel?: string;
  advanceAmount?: number;
  /** Use `amount` for a fixed rupee figure or `value` for text like "Full Package Price". */
  childPricing?: { label: string; amount?: number; value?: string }[];
};

export type Tour = {
  id: string;
  /** Readable, stable URL slug, e.g. "andaman-group-tour-november-2026". */
  slug: string;
  title: string;
  destination: string;
  stateOrRegion?: string;
  category: TourCategory;
  /** ISO date, e.g. "2026-11-02". */
  startDate?: string;
  endDate?: string;
  duration?: string;
  departureFrom?: string;
  status: TourStatus;
  featured?: boolean;
  shortDescription?: string;
  description?: string;
  /** Leave unset until authentic destination media exists; UI falls back to the site hero. */
  coverImage?: string;
  gallery?: string[];
  price?: { amount?: number; currency?: "INR"; label?: string };
  pricing?: TourPricing;
  route?: string[];
  placesCovered?: string[];
  itinerary?: TourItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  cancellationPolicy?: { title: string; description: string }[];
  /** Tour-specific booking contact. Only set whatsappNumber when confirmed. */
  bookingContact?: { name: string; phone: string; phoneHref?: string; whatsappNumber?: string };
  notes?: string[];
  seoTitle?: string;
  seoDescription?: string;
  contactMessage?: string;
  /** Set when a completed tour has a published album at /gallery/{slug}. */
  hasAlbum?: boolean;
};

// Add only confirmed departures here.
export const tours: Tour[] = [
  {
    id: "andaman-nov-2026",
    slug: "andaman-group-tour-november-2026",
    title: "Andaman Group Tour",
    destination: "Andaman",
    category: "group-india",
    startDate: "2026-11-02",
    endDate: "2026-11-08",
    duration: "7 Days / 6 Nights",
    departureFrom: "Bhubaneswar",
    status: "booking-open",
    featured: true,
    shortDescription: "A 7-day group journey from Bhubaneswar through Port Blair, Havelock and Neil Island, covering Andaman's major beaches, islands and historic attractions.",
    // coverImage: awaiting authentic Andaman photo — set one URL here when supplied.
    seoTitle: "Andaman Group Tour — 2–8 November 2026 | Adventure Holiday",
    seoDescription: "7-day Andaman group tour from Bhubaneswar covering Port Blair, Havelock, Neil Island, North Bay and Ross Island with Adventure Holiday.",
    route: ["Bhubaneswar", "Port Blair", "Havelock", "Neil Island", "Port Blair", "Bhubaneswar"],
    pricing: {
      regularPrice: 60500,
      offerPrice: 55500,
      offerLabel: "Special price for the first 20 bookings",
      advanceAmount: 30000,
      childPricing: [
        { label: "0–2 Years", amount: 6000 },
        { label: "2–7 Years", amount: 40000 },
        { label: "Above 7 Years", value: "Full Package Price" },
      ],
    },
    placesCovered: [
      "Cellular Jail",
      "Corbyn's Cove Beach",
      "Radhanagar Beach — Havelock",
      "Elephant Beach — Havelock",
      "Bharatpur Beach — Neil Island",
      "Natural Rock Bridge / Howrah Bridge — Neil Island",
      "Laxmanpur Beach — Neil Island",
      "North Bay Island",
      "Ross Island",
      "Aberdeen Bazaar / Sagarika Emporium",
    ],
    itinerary: [
      { day: 1, title: "Bhubaneswar → Port Blair", description: "Arrival at Port Blair, hotel check-in, Cellular Jail, Corbyn's Cove Beach and the Cellular Jail Light & Sound Show.", places: ["Cellular Jail", "Corbyn's Cove Beach"], nightStay: "Port Blair" },
      { day: 2, title: "Port Blair → Havelock", description: "Ferry to Havelock, hotel check-in, visit Radhanagar Beach and enjoy the sunset.", places: ["Radhanagar Beach"], nightStay: "Havelock" },
      { day: 3, title: "Havelock — Elephant Beach", description: "Visit Elephant Beach. Snorkelling, glass-bottom boat rides and other water sports are optional and are not included in the package price.", places: ["Elephant Beach"], nightStay: "Havelock" },
      { day: 4, title: "Havelock → Neil Island", description: "Ferry to Neil Island followed by Bharatpur Beach, Natural Rock Bridge / Howrah Bridge and Laxmanpur Beach for sunset.", places: ["Bharatpur Beach", "Natural Rock Bridge / Howrah Bridge", "Laxmanpur Beach"], nightStay: "Neil Island" },
      { day: 5, title: "Neil Island → Port Blair", description: "Morning beach visit, ferry to Port Blair, hotel check-in and evening shopping at Aberdeen Bazaar / Sagarika Emporium.", places: ["Aberdeen Bazaar", "Sagarika Emporium"], nightStay: "Port Blair" },
      { day: 6, title: "North Bay + Ross Island", description: "Visit North Bay Island and Ross Island. Scuba diving, sea walk, snorkelling, glass-bottom boat rides and other water sports are optional and are not included in the package price.", places: ["North Bay Island", "Ross Island"], nightStay: "Port Blair" },
      { day: 7, title: "Port Blair → Bhubaneswar", description: "Breakfast, airport transfer and return flight to Bhubaneswar." },
    ],
    inclusions: [
      "Two-way flight tickets: Bhubaneswar → Port Blair → Bhubaneswar",
      "6 nights hotel accommodation: 3 nights Port Blair, 2 nights Havelock, 1 night Neil Island",
      "Breakfast and dinner throughout the tour",
      "Airport / hotel / jetty pick-up and drop",
      "Point-to-point vehicle service for sightseeing",
      "Inter-island ferry tickets",
      "All applicable entry fees",
      "Cellular Jail Light & Sound Show",
    ],
    exclusions: [
      "Lunch meals",
      "Water sports and adventure activities: scuba diving, sea walk, snorkelling, parasailing, jet ski, glass-bottom boat and other optional activities",
      "Anything not specifically mentioned under Package Inclusions",
    ],
    cancellationPolicy: [
      { title: "More than 10 days before the tour", description: "50% of the advance amount will be deducted. The remaining advance amount will be refunded." },
      { title: "Within 10 days of the tour", description: "No refund will be applicable." },
    ],
    bookingContact: { name: "Amiya Mishra", phone: "63708 99039", phoneHref: "tel:+916370899039" },
  },
];

export const statusLabel: Record<TourStatus, string> = {
  "booking-open": "Booking Open",
  "few-seats": "Few Seats",
  "sold-out": "Sold Out",
  completed: "Completed",
};

export const categoryLabel: Record<TourCategory, string> = {
  "group-india": "Group Tour",
  "group-odisha": "Odisha Group Tour",
};

/** Parse an ISO date as a local calendar day (avoids timezone shifts). */
function parseISO(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y ?? NaN, (m ?? 1) - 1, day ?? 1);
}

export function formatTourDate(d?: string) {
  if (!d) return undefined;
  const date = parseISO(d);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function formatTourDateRange(t: Pick<Tour, "startDate" | "endDate">) {
  const s = formatTourDate(t.startDate);
  const e = formatTourDate(t.endDate);
  return s && e ? `${s} – ${e}` : s;
}

export const inr = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export function formatPrice(p?: Tour["price"]) {
  if (!p) return undefined;
  if (typeof p.amount === "number") {
    const amt = new Intl.NumberFormat("en-IN", { style: "currency", currency: p.currency ?? "INR", maximumFractionDigits: 0 }).format(p.amount);
    return p.label ? `${amt} ${p.label}` : amt;
  }
  return p.label;
}

const byStart = (a: Tour, b: Tour) => {
  if (!a.startDate) return b.startDate ? 1 : 0;
  if (!b.startDate) return -1;
  return parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime();
};

export const isBookable = (t: Tour) => t.status === "booking-open" || t.status === "few-seats";

// `status` is authoritative: a tour leaves "upcoming" only when marked completed.
export function getUpcomingTours(list: Tour[] = tours) {
  return list.filter((t) => t.status !== "completed").sort(byStart);
}

export function getFeaturedUpcomingTour(list: Tour[] = tours) {
  const upcoming = getUpcomingTours(list);
  return upcoming.find((t) => t.featured) ?? upcoming[0];
}

export function getTourBySlug(slug: string, list: Tour[] = tours) {
  return list.find((t) => t.slug === slug);
}

export const getIndiaGroupTours = (list: Tour[] = tours) => getUpcomingTours(list).filter((t) => t.category === "group-india");
export const getOdishaGroupTours = (list: Tour[] = tours) => getUpcomingTours(list).filter((t) => t.category === "group-odisha");
export const getCompletedTours = (list: Tour[] = tours) => list.filter((t) => t.status === "completed").sort((a, b) => byStart(b, a));

export function tourEnquiryText(t: Tour) {
  if (t.status === "sold-out") {
    return [
      "Hello Adventure Holiday,",
      "",
      `I saw the ${t.title} tour, but this departure is sold out.`,
      "Please let me know about the next available departure.",
    ].join("\n");
  }
  if (t.contactMessage) return t.contactMessage;
  const date = formatTourDateRange(t);
  const offer = t.pricing?.offerPrice ?? t.pricing?.regularPrice;
  return [
    "Hello Adventure Holiday,",
    "",
    "I would like to enquire about:",
    "",
    `Tour: ${t.title}`,
    `Destination: ${t.destination}`,
    ...(date ? [`Travel Date: ${date}`] : []),
    ...(offer ? [`${t.pricing?.offerPrice ? "Special " : ""}Package Price: ${inr(offer)} per person`] : []),
    "",
    "Name:",
    "Number of Travellers:",
    "",
    "Please share the booking details.",
  ].join("\n");
}

export const tourWhatsappHref = (t: Tour) => whatsappLink(tourEnquiryText(t));

// Editorial reminder only — never shown to customers.
if (import.meta.env.DEV) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (const t of tours) {
    if (isBookable(t) && t.startDate && parseISO(t.startDate) < today) {
      console.warn(`[tours] "${t.slug}" is ${t.status} but its start date ${t.startDate} has passed. Update its status.`);
    }
  }
}

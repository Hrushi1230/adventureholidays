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
  coverImage?: string;
  gallery?: string[];
  price?: { amount?: number; currency?: "INR"; label?: string };
  itinerary?: TourItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  notes?: string[];
  contactMessage?: string;
  /** Set when a completed tour has a published album at /gallery/{slug}. */
  hasAlbum?: boolean;
};

// Add only confirmed departures here.
export const tours: Tour[] = [];

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
  return new Date(y, (m ?? 1) - 1, day ?? 1);
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
  const date = formatTourDate(t.startDate);
  return [
    "Hello Adventure Holiday,",
    "",
    "I would like to enquire about:",
    "",
    `Tour: ${t.title}`,
    `Destination: ${t.destination}`,
    ...(date ? [`Travel Date: ${date}`] : []),
    "",
    "Name:",
    "Number of Travellers:",
    "",
    "Please share the tour details and booking information.",
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

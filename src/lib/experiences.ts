// Single source of truth for the Rural Camps and Picnic Point business segments.
// Fill in real material here — /rural-camps, /picnic-point, homepage previews,
// WhatsApp text and SEO all derive from it. Empty fields hide their sections.
// Media fields are plain URLs (local import, CDN or object storage).
// Never add unconfirmed facilities, activities, prices, capacities or reviews.
import { images, whatsappLink } from "./site";

export type ExperiencePhoto = { src: string; alt: string; width?: number; height?: number };
export type ExperienceVideo = { url: string; poster?: string; title?: string };
export type ExperienceTestimonial = { id: string; clientName?: string; quote?: string; videoUrl?: string; posterImage?: string; photo?: string };
export type ExperienceFeature = { title: string; description?: string; icon?: string };

export type ExperienceId = "rural-camps" | "picnic-point";

export type Experience = {
  id: ExperienceId;
  title: string;
  eyebrow?: string;
  shortDescription?: string;
  description?: string;
  heroImage?: string;
  /** True while heroImage is a stand-in, not authentic media. */
  heroIsPlaceholder?: boolean;
  heroVideo?: string;
  locationName?: string;
  mapsUrl?: string;
  gallery: ExperiencePhoto[];
  videos?: ExperienceVideo[];
  features?: ExperienceFeature[];
  suitableFor?: string[];
  highlights?: string[];
  testimonials?: ExperienceTestimonial[];
  enquiryLabel?: string;
};

export const ruralCamps: Experience = {
  id: "rural-camps",
  title: "Rural Camps",
  eyebrow: "Adventure Holiday Experience",
  shortDescription: "Step away from the city and spend time closer to nature.",
  description:
    "Adventure Holiday's Rural Camps are designed for travellers and groups looking to step away from the city and enjoy a more grounded outdoor experience.",
  // Stand-in image — replace with an authentic Rural Camps photo.
  heroImage: images.northeast,
  heroIsPlaceholder: true,
  gallery: [],
  videos: [],
  features: [],
  suitableFor: [],
  highlights: [],
  testimonials: [],
  enquiryLabel: "Enquire About Rural Camps",
};

export const picnicPoint: Experience = {
  id: "picnic-point",
  title: "Picnic Point",
  eyebrow: "Adventure Holiday Day Outing",
  shortDescription: "Plan an easy day out with your group.",
  description: "A simple day away for your family, friends or group — planned directly with Adventure Holiday.",
  // Stand-in image — replace with an authentic Picnic Point photo.
  heroImage: images.rafting,
  heroIsPlaceholder: true,
  gallery: [],
  videos: [],
  features: [],
  suitableFor: [],
  highlights: [],
  testimonials: [],
  enquiryLabel: "Plan Your Picnic",
};

export const experiences: Record<ExperienceId, Experience> = { "rural-camps": ruralCamps, "picnic-point": picnicPoint };

export function experienceEnquiryText(e: Pick<Experience, "title">) {
  return [
    "Hello Adventure Holiday,",
    "",
    `I would like to enquire about ${e.title}.`,
    "",
    "Name:",
    "Preferred Date:",
    "Number of People:",
    "Message:",
  ].join("\n");
}

export const experienceWhatsappHref = (e: Pick<Experience, "title">) => whatsappLink(experienceEnquiryText(e));

/** Testimonials with something real to show (a quote or a video). */
export const visibleTestimonials = (e: Experience) => (e.testimonials ?? []).filter((t) => t.quote || t.videoUrl);

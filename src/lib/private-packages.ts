import { destinations, images, whatsappLink } from "./site";
import { tourAlbums } from "./gallery";
import andaman from "@/assets/andaman-tour-cover.jpg";

export type PrivatePlace = { name: string; slug: string; description?: string; image?: string; status?: "available" | "coming-soon" };
export type PrivatePackage = {
  slug: string; title: string; placeSlug?: string; duration?: string; places?: string[]; pickupCity?: string;
  transport?: string; accommodation?: string; itinerary?: { day: number; title: string; description?: string }[];
  inclusions?: string[]; exclusions?: string[]; pricing?: { travellers: string; total: number }[];
};
export type PrivateDestination = { name: string; slug: string; coverImage?: string; imageAlt: string; description?: string; places: PrivatePlace[]; packages: PrivatePackage[] };
const archive = (destination: string) => tourAlbums.find((album) => album.destination === destination)?.coverImage;
const covers: Record<string, string | undefined> = {
  Kashmir: archive("Kashmir") ?? images.kashmir,
  "Himachal Pradesh": archive("Himachal Pradesh"), Uttarakhand: images.rafting,
  Gujarat: archive("Gujarat"), Kerala: images.kerala, "Tamil Nadu": archive("Tamil Nadu"),
  Rajasthan: archive("Rajasthan") ?? images.rajasthan, Andaman: andaman,
  "Uttar Pradesh": archive("Agra"), Delhi: archive("Delhi"), Punjab: archive("Amritsar"), Odisha: images.odisha,
};
const odishaPlaces: PrivatePlace[] = [
  { name: "Koraput", slug: "koraput", status: "available", description: "Private journeys available on enquiry. Request the current itinerary and group-size pricing." },
  ...["Phulbani", "Sambalpur", "Bhubaneswar", "Puri"].map((name): PrivatePlace => ({ name, slug: name.toLowerCase(), status: "coming-soon" })),
];
export const privateDestinations: PrivateDestination[] = destinations.map((name) => ({
  name, slug: name.toLowerCase().replaceAll(" ", "-"), coverImage: covers[name], imageAlt: `${name} destination scenery`,
  description: name === "Odisha" ? "Explore private journeys in Odisha, with Koraput available on enquiry and more destinations to come." : undefined,
  places: name === "Odisha" ? odishaPlaces : [], packages: [],
}));
export const getPrivateDestination = (slug: string) => privateDestinations.find((destination) => destination.slug === slug);
export const getPrivatePackage = (destination: PrivateDestination, slug: string) => destination.packages.find((pkg) => pkg.slug === slug);
export type PrivateQuote = { name: string; phone: string; destination: string; selection?: string; travelDates: string; travellers: string; pickupCity: string; requirements?: string };
export function privateQuoteText(quote: PrivateQuote) {
  return ["Hello Adventure Holiday,", "", `I want to plan a private trip to ${quote.destination}.`,
    ...(quote.selection ? [`Preferred place/package: ${quote.selection}`] : []), "",
    `Name: ${quote.name}`, `Contact number: ${quote.phone}`, `Travel dates: ${quote.travelDates}`,
    `Travellers: ${quote.travellers}`, `Pickup city: ${quote.pickupCity}`,
    ...(quote.requirements ? [`Requirements: ${quote.requirements}`] : []), "",
    "Please share a customized itinerary and group-size pricing. This is a quotation enquiry."].join("\n");
}
export const privateQuoteHref = (quote: PrivateQuote) => whatsappLink(privateQuoteText(quote));
// Single source of truth for completed-tour media albums.
// Add ONE object to `tourAlbums` and it powers /gallery (year → month archive),
// /gallery/{slug}, the homepage Recent Journeys preview and album SEO.
// Media fields accept any URL (local import, CDN, object storage) — keep large
// photo sets and testimonial videos off the repo where possible.
// Add only authentic albums: real photos, real dates, real traveller stories.

export type GalleryPhoto = {
  src: string;
  /** Describe what is actually in the photo, from supplied context. */
  alt: string;
  width?: number;
  height?: number;
};

export type TourTestimonial = {
  type: "video" | "text";
  clientName?: string;
  quote?: string;
  /** External/CDN URL recommended. */
  videoUrl?: string;
  posterImage?: string;
};

export type TourAlbum = {
  id: string;
  /** Stable URL slug, e.g. "madhya-pradesh-tour-september-2026". */
  slug: string;
  title: string;
  destination?: string;
  /** ISO YYYY-MM-DD. */
  tourDate: string;
  coverImage: string;
  shortDescription?: string;
  photos: GalleryPhoto[];
  testimonial?: TourTestimonial;
  /** Slug of the matching Tour in src/lib/tours.ts, if any. */
  relatedTourSlug?: string;
  featured?: boolean;
};

// Add only real completed tours here.
import ayodhyajan202601 from "@/assets/gallery/ayodhya-jan-2026/ayodhya-jan-2026-01.webp.asset.json";
import ayodhyajan202602 from "@/assets/gallery/ayodhya-jan-2026/ayodhya-jan-2026-02.webp.asset.json";
import ayodhyajan202603 from "@/assets/gallery/ayodhya-jan-2026/ayodhya-jan-2026-03.webp.asset.json";
import ayodhyajan202604 from "@/assets/gallery/ayodhya-jan-2026/ayodhya-jan-2026-04.webp.asset.json";
import ayodhyajan202605 from "@/assets/gallery/ayodhya-jan-2026/ayodhya-jan-2026-05.webp.asset.json";
import ayodhyajan202606 from "@/assets/gallery/ayodhya-jan-2026/ayodhya-jan-2026-06.webp.asset.json";
import ayodhyajan202607 from "@/assets/gallery/ayodhya-jan-2026/ayodhya-jan-2026-07.webp.asset.json";
import ayodhyajan202608 from "@/assets/gallery/ayodhya-jan-2026/ayodhya-jan-2026-08.webp.asset.json";
import ayodhyajan202609 from "@/assets/gallery/ayodhya-jan-2026/ayodhya-jan-2026-09.webp.asset.json";
import ayodhyajan202610 from "@/assets/gallery/ayodhya-jan-2026/ayodhya-jan-2026-10.webp.asset.json";
import delhijan202601 from "@/assets/gallery/delhi-jan-2026/delhi-jan-2026-01.webp.asset.json";
import delhijan202602 from "@/assets/gallery/delhi-jan-2026/delhi-jan-2026-02.webp.asset.json";
import delhijan202603 from "@/assets/gallery/delhi-jan-2026/delhi-jan-2026-03.webp.asset.json";
import delhijan202604 from "@/assets/gallery/delhi-jan-2026/delhi-jan-2026-04.webp.asset.json";
import delhijan202605 from "@/assets/gallery/delhi-jan-2026/delhi-jan-2026-05.webp.asset.json";
import delhijan202606 from "@/assets/gallery/delhi-jan-2026/delhi-jan-2026-06.webp.asset.json";
import delhijan202607 from "@/assets/gallery/delhi-jan-2026/delhi-jan-2026-07.webp.asset.json";
import delhijan202608 from "@/assets/gallery/delhi-jan-2026/delhi-jan-2026-08.webp.asset.json";
import amritsarmar202601 from "@/assets/gallery/amritsar-mar-2026/amritsar-mar-2026-01.webp.asset.json";
import amritsarmar202602 from "@/assets/gallery/amritsar-mar-2026/amritsar-mar-2026-02.webp.asset.json";
import amritsarmar202603 from "@/assets/gallery/amritsar-mar-2026/amritsar-mar-2026-03.webp.asset.json";
import amritsarmar202604 from "@/assets/gallery/amritsar-mar-2026/amritsar-mar-2026-04.webp.asset.json";
import gujaratapr202601 from "@/assets/gallery/gujarat-apr-2026/gujarat-apr-2026-01.webp.asset.json";
import gujaratapr202602 from "@/assets/gallery/gujarat-apr-2026/gujarat-apr-2026-02.webp.asset.json";
import gujaratapr202603 from "@/assets/gallery/gujarat-apr-2026/gujarat-apr-2026-03.webp.asset.json";
import gujaratapr202604 from "@/assets/gallery/gujarat-apr-2026/gujarat-apr-2026-04.webp.asset.json";
import gujaratapr202605 from "@/assets/gallery/gujarat-apr-2026/gujarat-apr-2026-05.webp.asset.json";
import gujaratapr202606 from "@/assets/gallery/gujarat-apr-2026/gujarat-apr-2026-06.webp.asset.json";
import gujaratapr202607 from "@/assets/gallery/gujarat-apr-2026/gujarat-apr-2026-07.webp.asset.json";
import gujaratapr202608 from "@/assets/gallery/gujarat-apr-2026/gujarat-apr-2026-08.webp.asset.json";
import gujaratapr202609 from "@/assets/gallery/gujarat-apr-2026/gujarat-apr-2026-09.webp.asset.json";
import gujaratapr202610 from "@/assets/gallery/gujarat-apr-2026/gujarat-apr-2026-10.webp.asset.json";
import himachalapr202601 from "@/assets/gallery/himachal-apr-2026/himachal-apr-2026-01.webp.asset.json";
import himachalapr202602 from "@/assets/gallery/himachal-apr-2026/himachal-apr-2026-02.webp.asset.json";
import himachalapr202603 from "@/assets/gallery/himachal-apr-2026/himachal-apr-2026-03.webp.asset.json";
import himachalapr202604 from "@/assets/gallery/himachal-apr-2026/himachal-apr-2026-04.webp.asset.json";
import himachalapr202605 from "@/assets/gallery/himachal-apr-2026/himachal-apr-2026-05.webp.asset.json";
import himachalapr202606 from "@/assets/gallery/himachal-apr-2026/himachal-apr-2026-06.webp.asset.json";
import himachalapr202607 from "@/assets/gallery/himachal-apr-2026/himachal-apr-2026-07.webp.asset.json";
import himachalapr202608 from "@/assets/gallery/himachal-apr-2026/himachal-apr-2026-08.webp.asset.json";
import himachalapr202609 from "@/assets/gallery/himachal-apr-2026/himachal-apr-2026-09.webp.asset.json";
import himachalapr202610 from "@/assets/gallery/himachal-apr-2026/himachal-apr-2026-10.webp.asset.json";
import kashmirmay202601 from "@/assets/gallery/kashmir-may-2026/kashmir-may-2026-01.webp.asset.json";
import kashmirmay202602 from "@/assets/gallery/kashmir-may-2026/kashmir-may-2026-02.webp.asset.json";
import kashmirmay202603 from "@/assets/gallery/kashmir-may-2026/kashmir-may-2026-03.webp.asset.json";
import kashmirmay202604 from "@/assets/gallery/kashmir-may-2026/kashmir-may-2026-04.webp.asset.json";
import kashmirmay202605 from "@/assets/gallery/kashmir-may-2026/kashmir-may-2026-05.webp.asset.json";
import kashmirmay202606 from "@/assets/gallery/kashmir-may-2026/kashmir-may-2026-06.webp.asset.json";
import kashmirmay202607 from "@/assets/gallery/kashmir-may-2026/kashmir-may-2026-07.webp.asset.json";
import kashmirmay202608 from "@/assets/gallery/kashmir-may-2026/kashmir-may-2026-08.webp.asset.json";
import kashmirmay202609 from "@/assets/gallery/kashmir-may-2026/kashmir-may-2026-09.webp.asset.json";
import kashmirmay202610 from "@/assets/gallery/kashmir-may-2026/kashmir-may-2026-10.webp.asset.json";
import gujaratjul202601 from "@/assets/gallery/gujarat-jul-2026/gujarat-jul-2026-01.webp.asset.json";
import gujaratjul202602 from "@/assets/gallery/gujarat-jul-2026/gujarat-jul-2026-02.webp.asset.json";
import gujaratjul202603 from "@/assets/gallery/gujarat-jul-2026/gujarat-jul-2026-03.webp.asset.json";
import gujaratjul202604 from "@/assets/gallery/gujarat-jul-2026/gujarat-jul-2026-04.webp.asset.json";
import gujaratjul202605 from "@/assets/gallery/gujarat-jul-2026/gujarat-jul-2026-05.webp.asset.json";
import gujaratjul202606 from "@/assets/gallery/gujarat-jul-2026/gujarat-jul-2026-06.webp.asset.json";
import gujaratjul202607 from "@/assets/gallery/gujarat-jul-2026/gujarat-jul-2026-07.webp.asset.json";
import himachalaug202601 from "@/assets/gallery/himachal-aug-2026/himachal-aug-2026-01.webp.asset.json";
import himachalaug202602 from "@/assets/gallery/himachal-aug-2026/himachal-aug-2026-02.webp.asset.json";
import himachalaug202603 from "@/assets/gallery/himachal-aug-2026/himachal-aug-2026-03.webp.asset.json";
import himachalaug202604 from "@/assets/gallery/himachal-aug-2026/himachal-aug-2026-04.webp.asset.json";
import himachalaug202605 from "@/assets/gallery/himachal-aug-2026/himachal-aug-2026-05.webp.asset.json";
import himachalaug202606 from "@/assets/gallery/himachal-aug-2026/himachal-aug-2026-06.webp.asset.json";
import himachalaug202607 from "@/assets/gallery/himachal-aug-2026/himachal-aug-2026-07.webp.asset.json";
import himachalaug202608 from "@/assets/gallery/himachal-aug-2026/himachal-aug-2026-08.webp.asset.json";
import himachalaug202609 from "@/assets/gallery/himachal-aug-2026/himachal-aug-2026-09.webp.asset.json";
import himachalaug202610 from "@/assets/gallery/himachal-aug-2026/himachal-aug-2026-10.webp.asset.json";
import kashmiraug202601 from "@/assets/gallery/kashmir-aug-2026/kashmir-aug-2026-01.webp.asset.json";
import kashmiraug202602 from "@/assets/gallery/kashmir-aug-2026/kashmir-aug-2026-02.webp.asset.json";
import kashmiraug202603 from "@/assets/gallery/kashmir-aug-2026/kashmir-aug-2026-03.webp.asset.json";
import kashmiraug202604 from "@/assets/gallery/kashmir-aug-2026/kashmir-aug-2026-04.webp.asset.json";
import kashmiraug202605 from "@/assets/gallery/kashmir-aug-2026/kashmir-aug-2026-05.webp.asset.json";
import kashmiraug202606 from "@/assets/gallery/kashmir-aug-2026/kashmir-aug-2026-06.webp.asset.json";
import kashmiraug202607 from "@/assets/gallery/kashmir-aug-2026/kashmir-aug-2026-07.webp.asset.json";
import kashmiraug202608 from "@/assets/gallery/kashmir-aug-2026/kashmir-aug-2026-08.webp.asset.json";
import kashmiraug202609 from "@/assets/gallery/kashmir-aug-2026/kashmir-aug-2026-09.webp.asset.json";
import kashmiraug202610 from "@/assets/gallery/kashmir-aug-2026/kashmir-aug-2026-10.webp.asset.json";

/**
 * TEMPORARY DEMO DATES.
 * The client supplied authentic tour photos but not verified historical dates.
 * Replace these dates before production launch.
 */
export const tourAlbums: TourAlbum[] = [
  {
    id: "ayodhya-group-tour-january-2026",
    slug: "ayodhya-group-tour-january-2026",
    title: "Ayodhya Group Tour",
    destination: "Ayodhya",
    tourDate: "2026-01-12",
    coverImage: ayodhyajan202610.url,
    photos: [
    { src: ayodhyajan202601.url, alt: "Adventure Holiday group during the Ayodhya tour", width: 1600, height: 1200 },
    { src: ayodhyajan202602.url, alt: "Adventure Holiday group during the Ayodhya tour", width: 1600, height: 1200 },
    { src: ayodhyajan202603.url, alt: "Adventure Holiday group during the Ayodhya tour", width: 1600, height: 1200 },
    { src: ayodhyajan202604.url, alt: "Adventure Holiday group during the Ayodhya tour", width: 1600, height: 1200 },
    { src: ayodhyajan202605.url, alt: "Adventure Holiday group during the Ayodhya tour", width: 1600, height: 1200 },
    { src: ayodhyajan202606.url, alt: "Adventure Holiday group during the Ayodhya tour", width: 1600, height: 1200 },
    { src: ayodhyajan202607.url, alt: "Adventure Holiday group during the Ayodhya tour", width: 1600, height: 1200 },
    { src: ayodhyajan202608.url, alt: "Adventure Holiday group during the Ayodhya tour", width: 1600, height: 1200 },
    { src: ayodhyajan202609.url, alt: "Adventure Holiday group during the Ayodhya tour", width: 1600, height: 1200 },
    { src: ayodhyajan202610.url, alt: "Adventure Holiday group during the Ayodhya tour", width: 1600, height: 1200 },
    ],
  },
  {
    id: "delhi-group-tour-january-2026",
    slug: "delhi-group-tour-january-2026",
    title: "Delhi Group Tour",
    destination: "Delhi",
    tourDate: "2026-01-28",
    coverImage: delhijan202604.url,
    photos: [
    { src: delhijan202601.url, alt: "Adventure Holiday group during the Delhi tour", width: 1600, height: 1200 },
    { src: delhijan202602.url, alt: "Adventure Holiday group during the Delhi tour", width: 1600, height: 1200 },
    { src: delhijan202603.url, alt: "Adventure Holiday group during the Delhi tour", width: 1600, height: 1200 },
    { src: delhijan202604.url, alt: "Adventure Holiday group during the Delhi tour", width: 1600, height: 1200 },
    { src: delhijan202605.url, alt: "Adventure Holiday group during the Delhi tour", width: 1600, height: 1200 },
    { src: delhijan202606.url, alt: "Adventure Holiday group during the Delhi tour", width: 1600, height: 1200 },
    { src: delhijan202607.url, alt: "Adventure Holiday group during the Delhi tour", width: 1600, height: 1200 },
    { src: delhijan202608.url, alt: "Adventure Holiday group during the Delhi tour", width: 1600, height: 1200 },
    ],
  },
  {
    id: "amritsar-group-tour-march-2026",
    slug: "amritsar-group-tour-march-2026",
    title: "Amritsar Group Tour",
    destination: "Amritsar",
    tourDate: "2026-03-21",
    coverImage: amritsarmar202602.url,
    photos: [
    { src: amritsarmar202601.url, alt: "Adventure Holiday group during the Amritsar tour", width: 1600, height: 1200 },
    { src: amritsarmar202602.url, alt: "Adventure Holiday group during the Amritsar tour", width: 1600, height: 1200 },
    { src: amritsarmar202603.url, alt: "Adventure Holiday group during the Amritsar tour", width: 1600, height: 1200 },
    { src: amritsarmar202604.url, alt: "Adventure Holiday group during the Amritsar tour", width: 1600, height: 1200 },
    ],
  },
  {
    id: "gujarat-group-tour-april-2026",
    slug: "gujarat-group-tour-april-2026",
    title: "Gujarat Group Tour",
    destination: "Gujarat",
    tourDate: "2026-04-11",
    coverImage: gujaratapr202609.url,
    photos: [
    { src: gujaratapr202601.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratapr202602.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratapr202603.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratapr202604.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratapr202605.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratapr202606.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratapr202607.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratapr202608.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratapr202609.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratapr202610.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    ],
  },
  {
    id: "himachal-pradesh-group-tour-april-2026",
    slug: "himachal-pradesh-group-tour-april-2026",
    title: "Himachal Pradesh Group Tour",
    destination: "Himachal Pradesh",
    tourDate: "2026-04-27",
    coverImage: himachalapr202607.url,
    photos: [
    { src: himachalapr202601.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalapr202602.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalapr202603.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalapr202604.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalapr202605.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalapr202606.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalapr202607.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalapr202608.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalapr202609.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalapr202610.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    ],
  },
  {
    id: "kashmir-group-tour-may-2026",
    slug: "kashmir-group-tour-may-2026",
    title: "Kashmir Group Tour",
    destination: "Kashmir",
    tourDate: "2026-05-12",
    coverImage: kashmirmay202601.url,
    photos: [
    { src: kashmirmay202601.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1204 },
    { src: kashmirmay202602.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1204 },
    { src: kashmirmay202603.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1204 },
    { src: kashmirmay202604.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 967 },
    { src: kashmirmay202605.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1204 },
    { src: kashmirmay202606.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    { src: kashmirmay202607.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    { src: kashmirmay202608.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1204 },
    { src: kashmirmay202609.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1204 },
    { src: kashmirmay202610.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    ],
  },
  {
    id: "gujarat-group-tour-july-2026",
    slug: "gujarat-group-tour-july-2026",
    title: "Gujarat Group Tour",
    destination: "Gujarat",
    tourDate: "2026-07-24",
    coverImage: gujaratjul202606.url,
    photos: [
    { src: gujaratjul202601.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratjul202602.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratjul202603.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratjul202604.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratjul202605.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratjul202606.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    { src: gujaratjul202607.url, alt: "Adventure Holiday group during the Gujarat tour", width: 1600, height: 1200 },
    ],
  },
  {
    id: "himachal-pradesh-group-tour-august-2026",
    slug: "himachal-pradesh-group-tour-august-2026",
    title: "Himachal Pradesh Group Tour",
    destination: "Himachal Pradesh",
    tourDate: "2026-08-16",
    coverImage: himachalaug202602.url,
    photos: [
    { src: himachalaug202601.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalaug202602.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalaug202603.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalaug202604.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalaug202605.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalaug202606.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalaug202607.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalaug202608.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalaug202609.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    { src: himachalaug202610.url, alt: "Adventure Holiday group during the Himachal Pradesh tour", width: 1600, height: 900 },
    ],
  },
  {
    id: "kashmir-group-tour-august-2026",
    slug: "kashmir-group-tour-august-2026",
    title: "Kashmir Group Tour",
    destination: "Kashmir",
    tourDate: "2026-08-30",
    coverImage: kashmiraug202604.url,
    photos: [
    { src: kashmiraug202601.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    { src: kashmiraug202602.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    { src: kashmiraug202603.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    { src: kashmiraug202604.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    { src: kashmiraug202605.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    { src: kashmiraug202606.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    { src: kashmiraug202607.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    { src: kashmiraug202608.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    { src: kashmiraug202609.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    { src: kashmiraug202610.url, alt: "Adventure Holiday group during the Kashmir tour", width: 1600, height: 1200 },
    ],
  },
];

function parseISO(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y ?? NaN, (m ?? 1) - 1, day ?? 1);
}

export function formatAlbumDate(d: string, month: "long" | "short" = "long") {
  const date = parseISO(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-IN", { day: "numeric", month, year: "numeric" });
}

export const getAlbumsNewestFirst = (list: TourAlbum[] = tourAlbums) =>
  [...list].sort((a, b) => b.tourDate.localeCompare(a.tourDate));

export const getAlbumBySlug = (slug: string, list: TourAlbum[] = tourAlbums) => list.find((a) => a.slug === slug);

export const getAlbumForTour = (tourSlug: string, list: TourAlbum[] = tourAlbums) =>
  list.find((a) => a.relatedTourSlug === tourSlug || a.slug === tourSlug);

export const getFeaturedAlbums = (list: TourAlbum[] = tourAlbums) => getAlbumsNewestFirst(list).filter((a) => a.featured);

export const getAlbumTestimonials = (list: TourAlbum[] = tourAlbums) =>
  getAlbumsNewestFirst(list).flatMap((a) => (a.testimonial ? [{ album: a, testimonial: a.testimonial }] : []));

export type AlbumMonthGroup = { month: number; monthName: string; albums: TourAlbum[] };
export type AlbumYearGroup = { year: number; months: AlbumMonthGroup[] };

/** Newest year → newest month → newest tour. Only months with albums appear. */
export function groupAlbumsByYearAndMonth(list: TourAlbum[] = tourAlbums): AlbumYearGroup[] {
  const years: AlbumYearGroup[] = [];
  for (const a of getAlbumsNewestFirst(list)) {
    const d = parseISO(a.tourDate);
    const year = d.getFullYear();
    const month = d.getMonth();
    let y = years.find((g) => g.year === year);
    if (!y) years.push((y = { year, months: [] }));
    let m = y.months.find((g) => g.month === month);
    if (!m) y.months.push((m = { month, monthName: d.toLocaleDateString("en-IN", { month: "long" }), albums: [] }));
    m.albums.push(a);
  }
  return years;
}

export function albumStats(a: TourAlbum) {
  const parts = [`${a.photos.length} ${a.photos.length === 1 ? "Photo" : "Photos"}`];
  if (a.testimonial?.type === "video" && a.testimonial.videoUrl) parts.push("Video Story");
  else if (a.testimonial?.type === "text" && a.testimonial.quote) parts.push("Traveller Story");
  return parts;
}

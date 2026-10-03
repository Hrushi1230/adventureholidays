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
export const tourAlbums: TourAlbum[] = [];

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

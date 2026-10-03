import { describe, expect, it } from "vitest";
import { getAlbumBySlug, getAlbumForTour, getAlbumTestimonials, getAlbumsNewestFirst, groupAlbumsByYearAndMonth, type TourAlbum } from "@/lib/gallery";

// Test fixture only — never production content.
const a = (slug: string, tourDate: string, extra: Partial<TourAlbum> = {}): TourAlbum => ({ id: slug, slug, title: slug, tourDate, coverImage: "x.jpg", photos: [], ...extra });
const fixture = [a("aug", "2026-08-10"), a("sep-12", "2026-09-12"), a("old", "2025-12-01", { relatedTourSlug: "t-old" }), a("sep-25", "2026-09-25", { testimonial: { type: "text", quote: "q" } })];

describe("gallery helpers", () => {
  it("sorts newest first", () => {
    expect(getAlbumsNewestFirst(fixture).map((x) => x.slug)).toEqual(["sep-25", "sep-12", "aug", "old"]);
  });
  it("groups by year and month, newest first", () => {
    const g = groupAlbumsByYearAndMonth(fixture);
    expect(g.map((y) => y.year)).toEqual([2026, 2025]);
    expect(g[0]!.months.map((m) => m.monthName)).toEqual(["September", "August"]);
    expect(g[0]!.months[0]!.albums.map((x) => x.slug)).toEqual(["sep-25", "sep-12"]);
  });
  it("looks up by slug and related tour", () => {
    expect(getAlbumBySlug("aug", fixture)?.slug).toBe("aug");
    expect(getAlbumBySlug("nope", fixture)).toBeUndefined();
    expect(getAlbumForTour("t-old", fixture)?.slug).toBe("old");
    expect(getAlbumTestimonials(fixture)).toHaveLength(1);
  });
  it("handles an empty archive", () => {
    expect(groupAlbumsByYearAndMonth([])).toEqual([]);
    expect(getAlbumsNewestFirst([])).toEqual([]);
  });
});

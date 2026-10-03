import { describe, expect, it } from "vitest";
import { getCompletedTours, getFeaturedUpcomingTour, getTourBySlug, getUpcomingTours, tourEnquiryText, type Tour } from "@/lib/tours";

// Test fixture only — never production content.
const fixture: Tour[] = [
  { id: "c", slug: "late", title: "Late", destination: "X", category: "group-india", startDate: "2026-12-20", status: "sold-out" },
  { id: "a", slug: "early", title: "Early", destination: "Y", category: "group-odisha", startDate: "2026-11-02", status: "booking-open" },
  { id: "d", slug: "done", title: "Done", destination: "Z", category: "group-india", startDate: "2025-01-01", status: "completed" },
  { id: "b", slug: "feat", title: "Feat", destination: "W", category: "group-india", startDate: "2026-12-01", status: "few-seats", featured: true },
];

describe("tour helpers", () => {
  it("sorts upcoming chronologically and excludes completed", () => {
    expect(getUpcomingTours(fixture).map((t) => t.slug)).toEqual(["early", "feat", "late"]);
    expect(getCompletedTours(fixture).map((t) => t.slug)).toEqual(["done"]);
  });
  it("prefers featured, else nearest", () => {
    expect(getFeaturedUpcomingTour(fixture)?.slug).toBe("feat");
    expect(getFeaturedUpcomingTour(fixture.filter((t) => !t.featured))?.slug).toBe("early");
    expect(getFeaturedUpcomingTour([])).toBeUndefined();
  });
  it("finds by slug and builds enquiry text", () => {
    expect(getTourBySlug("nope", fixture)).toBeUndefined();
    expect(tourEnquiryText(fixture[1]!)).toContain("Travel Date: 2 Nov 2026");
    expect(tourEnquiryText(fixture[0]!)).toContain("sold out");
  });
});

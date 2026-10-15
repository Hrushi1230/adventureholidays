import { describe, expect, it } from "vitest";
import { getCompletedTours, getFeaturedUpcomingTour, getTourBySlug, getUpcomingTours, isBookable, tourEnquiryText, type Tour } from "@/lib/tours";

// Test fixture only — never production content.
const fixture: Tour[] = [
  { id: "c", slug: "late", title: "Late", destination: "X", category: "group-india", startDate: "2026-12-20", status: "sold-out" },
  { id: "a", slug: "early", title: "Early", destination: "Y", category: "group-odisha", startDate: "2026-11-02", status: "booking-open" },
  { id: "d", slug: "done", title: "Done", destination: "Z", category: "group-india", startDate: "2025-01-01", status: "completed" },
  { id: "b", slug: "feat", title: "Feat", destination: "W", category: "group-india", startDate: "2026-12-01", status: "few-seats", featured: true },
];

describe("tour helpers", () => {
  it("keeps Andaman visible but closes its bookings", () => {
    const andaman = getTourBySlug("andaman-group-tour-november-2026");
    expect(andaman?.status).toBe("booking-closed");
    if (!andaman) throw new Error("Andaman departure missing");
    expect(isBookable(andaman)).toBe(false);
    expect(getUpcomingTours()).toContain(andaman);
    expect(tourEnquiryText(andaman)).toContain("bookings for this departure are closed");
    expect(tourEnquiryText(andaman)).toContain("next available departure");
  });
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
    const early = fixture[1];
    const soldOut = fixture[0];
    if (!early || !soldOut) throw new Error("Missing fixtures");
    expect(tourEnquiryText(early)).toContain("Travel Date: 2 Nov 2026");
    expect(tourEnquiryText(soldOut)).toContain("sold out");
  });
});

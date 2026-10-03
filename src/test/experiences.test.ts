import { describe, expect, it } from "vitest";
import { experienceEnquiryText, experienceWhatsappHref, picnicPoint, ruralCamps, visibleTestimonials, type Experience } from "@/lib/experiences";

describe("experiences", () => {
  it("builds page-specific WhatsApp enquiries", () => {
    expect(experienceEnquiryText(ruralCamps)).toContain("I would like to enquire about Rural Camps.");
    expect(experienceEnquiryText(picnicPoint)).toContain("enquire about Picnic Point.");
    const href = experienceWhatsappHref(picnicPoint);
    expect(href.startsWith("https://wa.me/919937524018?text=")).toBe(true);
    expect(decodeURIComponent(href.split("text=")[1]!)).toContain("Number of People:");
  });
  it("ships no invented content", () => {
    for (const e of [ruralCamps, picnicPoint]) {
      expect(e.gallery).toEqual([]);
      expect(e.testimonials).toEqual([]);
      expect(e.features).toEqual([]);
    }
  });
  it("hides empty testimonials (fixture)", () => {
    const f: Experience = { ...ruralCamps, testimonials: [{ id: "a" }, { id: "b", quote: "q" }] };
    expect(visibleTestimonials(f).map((t) => t.id)).toEqual(["b"]);
    expect(visibleTestimonials({ ...ruralCamps, testimonials: undefined })).toEqual([]);
  });
});

import { describe, expect, it } from "vitest";
import { destinations, business } from "@/lib/site";
import { getPrivateDestination, privateDestinations, privateQuoteHref, privateQuoteText } from "@/lib/private-packages";

describe("private destination content rules", () => {
  it("keeps exactly the existing 19 destination labels", () => {
    expect(privateDestinations.map((item) => item.name)).toEqual([...destinations]);
    expect(privateDestinations).toHaveLength(19);
    expect(new Set(privateDestinations.map((item) => item.slug)).size).toBe(19);
  });
  it("makes only Koraput available and marks the four planned Odisha places coming soon", () => {
    expect(getPrivateDestination("odisha")?.places.map(({ name, status }) => ({ name, status }))).toEqual([
      { name: "Koraput", status: "available" }, { name: "Phulbani", status: "coming-soon" },
      { name: "Sambalpur", status: "coming-soon" }, { name: "Bhubaneswar", status: "coming-soon" }, { name: "Puri", status: "coming-soon" },
    ]);
  });
  it("publishes no invented private package itineraries", () => {
    expect(privateDestinations.flatMap((destination) => destination.packages)).toEqual([]);
  });
  it("includes the customer's requirements in a quotation enquiry to the official WhatsApp", () => {
    const quote = { name: "Test Traveller", phone: "9000000000", destination: "Odisha", selection: "Koraput", travelDates: "21–23 December 2026", travellers: "4", pickupCity: "Bhubaneswar", requirements: "Family trip" };
    const text = privateQuoteText(quote);
    for (const value of Object.values(quote)) expect(text).toContain(value);
    expect(text).toContain("This is a quotation enquiry.");
    expect(privateQuoteHref(quote).split("?")[0]).toBe(business.whatsappHref);
  });
});
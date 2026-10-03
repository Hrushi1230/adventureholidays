import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { readFileSync } from "node:fs";
import type { Tour } from "@/lib/tours";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, params, children, ...rest }: any) => (
    <a href={to.replace("$slug", params.slug)} {...rest}>{children}</a>
  ),
}));

import { UpcomingTourSpotlight } from "@/components/site/UpcomingTourSpotlight";

const base: Tour = { id: "t1", slug: "andaman-nov-2026", title: "Andaman Escape", destination: "Andaman", category: "group-india", status: "booking-open", startDate: "2026-11-02" };

beforeEach(() => { vi.useFakeTimers(); localStorage.clear(); });
afterEach(() => vi.useRealTimers());
const advance = () => act(() => { vi.advanceTimersByTime(1500); });

describe("UpcomingTourSpotlight", () => {
  it("defaults to the featured production tour", () => {
    render(<UpcomingTourSpotlight />);
    advance();
    expect(screen.getByRole("complementary", { name: "Upcoming tour" })).toHaveTextContent("Andaman Group Tour");
  });
  it("shows the given tour with a detail link", () => {
    render(<UpcomingTourSpotlight tour={base} />);
    advance();
    expect(screen.getByRole("complementary", { name: "Upcoming tour" })).toHaveTextContent("Andaman Escape");
    expect(screen.getByRole("link", { name: /view tour details/i })).toHaveAttribute("href", "/tours/andaman-nov-2026");
  });
  it("dismisses and remembers", () => {
    render(<UpcomingTourSpotlight tour={base} />);
    advance();
    fireEvent.click(screen.getByRole("button", { name: "Dismiss upcoming tour" }));
    advance();
    expect(screen.queryByRole("complementary")).toBeNull();
    expect(localStorage.getItem("ah-tour-spotlight-dismissed:t1")).toBeTruthy();
  });
  it("sold-out uses next-departure wording", () => {
    render(<UpcomingTourSpotlight tour={{ ...base, status: "sold-out" }} />);
    advance();
    expect(screen.getByRole("link", { name: /ask about next departure/i })).toBeInTheDocument();
    expect(screen.queryByText(/book now/i)).toBeNull();
  });
  it("is mounted on the homepage only", () => {
    expect(readFileSync("src/routes/index.tsx", "utf8")).toContain("<UpcomingTourSpotlight");
    for (const f of ["gallery.index", "gallery.$slug", "rural-camps", "picnic-point", "tours.$slug"]) {
      expect(readFileSync(`src/routes/${f}.tsx`, "utf8")).not.toContain("UpcomingTourSpotlight");
    }
  });
});

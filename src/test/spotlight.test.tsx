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
    for (const l of screen.getAllByRole("link", { name: /^view tour/i })) expect(l).toHaveAttribute("href", "/tours/andaman-nov-2026");
  });
  it("dismisses but shows again on the next visit", () => {
    const { unmount } = render(<UpcomingTourSpotlight tour={base} />);
    advance();
    fireEvent.click(screen.getByRole("button", { name: "Dismiss Andaman Escape announcement" }));
    advance();
    expect(screen.queryByRole("complementary")).toBeNull();
    unmount();
    render(<UpcomingTourSpotlight tour={base} />);
    advance();
    expect(screen.getByRole("complementary", { name: "Upcoming tour" })).toBeInTheDocument();
  });
  it("sold-out uses next-departure wording", () => {
    render(<UpcomingTourSpotlight tour={{ ...base, status: "sold-out" }} />);
    advance();
    expect(screen.getAllByRole("link", { name: /ask about next departure/i })[0]).toBeInTheDocument();
    expect(screen.queryByText(/book now/i)).toBeNull();
  });
  it("cycles and dismisses several tours inside one cloth", () => {
    const list: Tour[] = [base, { ...base, id: "t2", slug: "k", title: "Kashmir Trip", startDate: "2026-12-01" }, { ...base, id: "t3", slug: "e", title: "Kerala Trip", startDate: "2027-01-01" }];
    render(<UpcomingTourSpotlight tours={list} />);
    advance();
    expect(screen.getAllByRole("complementary")).toHaveLength(1);
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next upcoming tour" })); advance();
    expect(screen.getByRole("heading")).toHaveTextContent("Kashmir Trip");
    fireEvent.click(screen.getByRole("button", { name: "Dismiss Kashmir Trip announcement" })); advance();
    expect(screen.getByText("02 / 02")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^Dismiss .* announcement$/ })); advance();
    expect(screen.queryByText(/\/ 0/)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /^Dismiss .* announcement$/ })); advance();
    expect(screen.queryByRole("complementary")).toBeNull();
  });
  it("is mounted on the homepage only", () => {
    expect(readFileSync("src/routes/index.tsx", "utf8")).toContain("<UpcomingTourSpotlight");
    for (const f of ["gallery.index", "gallery.$slug", "rural-camps", "picnic-point", "tours.$slug"]) {
      expect(readFileSync(`src/routes/${f}.tsx`, "utf8")).not.toContain("UpcomingTourSpotlight");
    }
  });
});

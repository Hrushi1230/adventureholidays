import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { UpcomingHero } from "@/components/site/UpcomingHero";
import { UpcomingDepartures } from "@/components/site/UpcomingDepartures";
import { TourSegments } from "@/components/site/TourSegments";
import { IndiaGroupTours } from "@/components/site/IndiaGroupTours";
import { OdishaGroupTours } from "@/components/site/OdishaGroupTours";
import { PrivatePackages } from "@/components/site/PrivatePackages";
import { RecentTours } from "@/components/site/RecentTours";
import { Testimonials } from "@/components/site/Testimonials";
import { TourEnquiry } from "@/components/site/TourEnquiry";
import { RuralCampsPreview } from "@/components/site/RuralCampsPreview";
import { PicnicPointPreview } from "@/components/site/PicnicPointPreview";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";
import { useReveal } from "@/hooks/use-reveal";

const title = "Adventure Holiday | Group & Private Tours from Bhubaneswar";
const description = "Adventure Holiday offers domestic and international tours, scheduled group tours and private holiday packages from Bhubaneswar, Odisha.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <UpcomingHero />
        <UpcomingDepartures />
        <TourSegments />
        <IndiaGroupTours />
        <OdishaGroupTours />
        <PrivatePackages />
        <RecentTours />
        <Testimonials />
        <TourEnquiry />
        <RuralCampsPreview />
        <PicnicPointPreview />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

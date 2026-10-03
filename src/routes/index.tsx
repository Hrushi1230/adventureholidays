import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { About, Contact, Destinations, Feature, FinalCta, FloatingActions, Footer, Gallery, Hero, Intro, Process, Tours, WhyUs } from "@/components/site/Sections";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adventure Holiday — Tours, Destinations & Holiday Packages" },
      { name: "description", content: "Adventure Holiday plans memorable adventure tours, family holidays and getaways across India. Explore destinations and plan your trip." },
      { property: "og:title", content: "Adventure Holiday — Your next adventure starts here" },
      { property: "og:description", content: "Adventure tours, family holidays and getaways across India, planned with care." },
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
        <Hero />
        <Intro />
        <Tours />
        <Destinations />
        <WhyUs />
        <Process />
        <Feature />
        <Gallery />
        <About />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

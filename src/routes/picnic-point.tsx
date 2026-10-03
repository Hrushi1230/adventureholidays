import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/picnic-point")({
  head: () => ({
    meta: [
      { title: "Picnic Point | Adventure Holiday" },
      { name: "description", content: "Picnic Point by Adventure Holiday, Bhubaneswar — details coming soon." },
      { property: "og:title", content: "Picnic Point | Adventure Holiday" },
      { property: "og:description", content: "Picnic Point by Adventure Holiday — details coming soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PageShell eyebrow="Also explore" title="Picnic Point" text="Full details of Adventure Holiday Picnic Point are coming soon. Call or WhatsApp us to know more." />,
});

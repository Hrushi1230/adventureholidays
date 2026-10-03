import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Tour Gallery | Adventure Holiday" },
      { name: "description", content: "Photo albums from completed Adventure Holiday group and private tours." },
      { property: "og:title", content: "Tour Gallery | Adventure Holiday" },
      { property: "og:description", content: "Photo albums from completed Adventure Holiday tours." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PageShell eyebrow="Gallery" title="Tour Gallery" text="Albums from completed Adventure Holiday journeys will be published here soon." />,
});

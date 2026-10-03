import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/rural-camps")({
  head: () => ({
    meta: [
      { title: "Rural Camps | Adventure Holiday" },
      { name: "description", content: "Rural Camps by Adventure Holiday, Bhubaneswar — details coming soon." },
      { property: "og:title", content: "Rural Camps | Adventure Holiday" },
      { property: "og:description", content: "Rural Camps by Adventure Holiday — details coming soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PageShell eyebrow="Also explore" title="Rural Camps" text="Full details of Adventure Holiday Rural Camps are coming soon. Call or WhatsApp us to know more." />,
});

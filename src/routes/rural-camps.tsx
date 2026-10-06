import { createFileRoute } from "@tanstack/react-router";
import { ruralCamps, picnicPoint } from "@/lib/experiences";
import { ExperiencePage } from "@/components/site/experience/ExperiencePage";

const description = "Explore the Rural Camps experience by Adventure Holiday and enquire directly for your group.";
const image = ruralCamps.heroImage?.startsWith("https://") && !ruralCamps.heroIsPlaceholder ? ruralCamps.heroImage : undefined;

export const Route = createFileRoute("/rural-camps")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Rural Camps | Adventure Holiday" },
      { name: "description", content: description },
      { property: "og:title", content: "Rural Camps | Adventure Holiday" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://adventureholiday.co.in/rural-camps" },
      ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
    ],
    links: [{ rel: "canonical", href: "https://adventureholiday.co.in/rural-camps" }],
  }),
  component: () => (
    <ExperiencePage
      e={ruralCamps}
      mood="calm"
      intro="A different way to spend time outdoors."
      cross={{ eyebrow: "Also Explore", title: picnicPoint.title, text: picnicPoint.shortDescription ?? "", cta: "Explore Picnic Point", to: "/picnic-point", img: picnicPoint.heroImage }}
    />
  ),
});

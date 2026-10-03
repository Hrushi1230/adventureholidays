import { createFileRoute } from "@tanstack/react-router";
import { picnicPoint, ruralCamps } from "@/lib/experiences";
import { ExperiencePage } from "@/components/site/experience/ExperiencePage";

const description = "Plan a picnic or group day outing with Adventure Holiday.";
const image = picnicPoint.heroImage?.startsWith("https://") && !picnicPoint.heroIsPlaceholder ? picnicPoint.heroImage : undefined;

export const Route = createFileRoute("/picnic-point")({
  head: () => ({
    meta: [
      { title: "Picnic Point | Adventure Holiday" },
      { name: "description", content: description },
      { property: "og:title", content: "Picnic Point | Adventure Holiday" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
    ],
  }),
  component: () => (
    <ExperiencePage
      e={picnicPoint}
      mood="bright"
      intro="A day out, made easy."
      cross={{ eyebrow: "Stay a Little Longer", title: ruralCamps.title, text: ruralCamps.shortDescription ?? "", cta: "Explore Rural Camps", to: "/rural-camps", img: ruralCamps.heroImage }}
    />
  ),
});

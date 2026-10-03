import { createFileRoute } from "@tanstack/react-router";
import { GalleryArchive } from "@/components/site/gallery/GalleryArchive";

export const Route = createFileRoute("/gallery/")({
  head: () => ({
    meta: [
      { title: "Tour Memories — Gallery | Adventure Holiday" },
      { name: "description", content: "Photographs and traveller stories from completed Adventure Holiday group tours, organised by year and month." },
      { property: "og:title", content: "Tour Memories — Gallery | Adventure Holiday" },
      { property: "og:description", content: "Photographs and traveller stories from completed Adventure Holiday tours." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryArchive,
});

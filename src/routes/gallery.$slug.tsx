import { createFileRoute, notFound } from "@tanstack/react-router";
import { formatAlbumDate, getAlbumBySlug } from "@/lib/gallery";
import { AlbumDetail, AlbumNotFound } from "@/components/site/gallery/AlbumDetail";

export const Route = createFileRoute("/gallery/$slug")({
  loader: ({ params }) => {
    const album = getAlbumBySlug(params.slug);
    if (!album) throw notFound();
    return { album };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Tour album not found | Adventure Holiday" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.album;
    const title = `${a.title} — ${formatAlbumDate(a.tourDate)} | Adventure Holiday`;
    const description = a.shortDescription ?? `Photos and traveller stories from the ${a.title} completed by Adventure Holiday on ${formatAlbumDate(a.tourDate)}.`;
    const image = a.coverImage.startsWith("https://") ? a.coverImage : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
      ],
    };
  },
  notFoundComponent: AlbumNotFound,
  component: AlbumPage,
});

function AlbumPage() {
  const { album } = Route.useLoaderData();
  return <AlbumDetail a={album} />;
}

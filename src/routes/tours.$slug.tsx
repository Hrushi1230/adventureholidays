import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTourBySlug } from "@/lib/tours";
import { TourDetail, TourNotFound } from "@/components/site/tour/TourDetail";

export const Route = createFileRoute("/tours/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const tour = getTourBySlug(params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Tour not found | Adventure Holiday" }, { name: "robots", content: "noindex" }] };
    }
    const t = loaderData.tour;
    const title = t.seoTitle ?? `${t.title} | Adventure Holiday`;
    const description = t.seoDescription ?? t.shortDescription ?? `View details and enquire about ${t.title} with Adventure Holiday, Bhubaneswar.`;
    const image = t.coverImage?.startsWith("https://") ? t.coverImage : undefined;
    const url = `https://adventureholiday.co.in/tours/${params.slug}`;
    return {
      links: [{ rel: "canonical", href: url }],
      meta: [
        { property: "og:url", content: url },
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
      ],
    };
  },
  notFoundComponent: TourNotFound,
  component: TourPage,
});

function TourPage() {
  const { tour } = Route.useLoaderData();
  return <TourDetail t={tour} />;
}

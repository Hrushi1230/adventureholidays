import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPrivateDestination } from "@/lib/private-packages";
import { privateHead } from "@/lib/private-seo";
import { PrivatePlacePage } from "@/components/site/private/PrivateDestinationPage";

export const Route = createFileRoute("/private-packages/$destination/places/$place")({
  staticData: { sitemap: true },
  loader: ({ params }) => { const destination = getPrivateDestination(params.destination); const place = destination?.places.find((item) => item.slug === params.place); if (!destination || !place) throw notFound(); return { destination, place }; },
  head: ({ loaderData, params }) => loaderData ? privateHead(`${loaderData.place.name} Private Journeys | Adventure Holiday`, loaderData.place.description ?? `Explore ${loaderData.place.name} private journey enquiries with Adventure Holiday.`, `/private-packages/${params.destination}/places/${params.place}`, loaderData.place.image ?? loaderData.destination.coverImage) : { meta: [{ title: "Place unavailable | Adventure Holiday" }, { name: "robots", content: "noindex" }] },
  component: Place,
});
function Place() { const { destination, place } = Route.useLoaderData(); return <PrivatePlacePage destination={destination} place={place} />; }
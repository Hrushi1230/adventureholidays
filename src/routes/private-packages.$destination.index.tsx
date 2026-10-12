import { createFileRoute } from "@tanstack/react-router";
import { getPrivateDestination } from "@/lib/private-packages";
import { privateHead } from "@/lib/private-seo";
import { PrivateDestinationPage } from "@/components/site/private/PrivateDestinationPage";

export const Route = createFileRoute("/private-packages/$destination/")({
  staticData: { sitemap: true },
  head: ({ params }) => { const destination = getPrivateDestination(params.destination); return destination ? privateHead(`${destination.name} Private Packages | Adventure Holiday`, destination.description ?? `Plan a customized private journey to ${destination.name} with Adventure Holiday. Enquire about preferred places, travel dates and group-size pricing.`, `/private-packages/${destination.slug}`, destination.coverImage) : { meta: [{ title: "Destination unavailable | Adventure Holiday" }, { name: "robots", content: "noindex" }] }; },
  component: Destination,
});
function Destination() { const { destination } = Route.parentRoute.useLoaderData(); return <PrivateDestinationPage destination={destination} />; }
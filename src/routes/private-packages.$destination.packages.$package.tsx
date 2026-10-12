import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPrivateDestination, getPrivatePackage } from "@/lib/private-packages";
import { privateHead } from "@/lib/private-seo";
import { PrivatePackagePage } from "@/components/site/private/PrivateDestinationPage";

export const Route = createFileRoute("/private-packages/$destination/packages/$package")({
  staticData: { sitemap: true },
  loader: ({ params }) => { const destination = getPrivateDestination(params.destination); const pkg = destination && getPrivatePackage(destination, params.package); if (!destination || !pkg) throw notFound(); return { destination, pkg }; },
  head: ({ params, loaderData }) => loaderData ? privateHead(`${loaderData.pkg.title} | Adventure Holiday`, `View ${loaderData.pkg.title} itinerary and request a customized quotation from Adventure Holiday.`, `/private-packages/${params.destination}/packages/${params.package}`, loaderData.destination.coverImage) : { meta: [{ title: "Package unavailable | Adventure Holiday" }, { name: "robots", content: "noindex" }] },
  component: Package,
});
function Package() { const { destination, pkg } = Route.useLoaderData(); return <PrivatePackagePage destination={destination} pkg={pkg} />; }
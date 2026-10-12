import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { isSitemapRouteIncluded, sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";
import { tours } from "@/lib/tours";
import { tourAlbums } from "@/lib/gallery";
import { privateDestinations } from "@/lib/private-packages";

const BASE_URL = "https://adventureholiday.co.in";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));
        const add = (routeId: "/tours/$slug" | "/gallery/$slug", to: "/tours/$slug" | "/gallery/$slug", slugs: string[]) => {
          if (!isSitemapRouteIncluded(router.routesById[routeId])) return;
          for (const slug of slugs) {
            const location = router.buildLocation({ to, params: { slug }, search: () => ({}), hash: "" });
            const path = sitemapPathForLocation(router, location, routeId);
            if (path) entries.push({ path });
          }
        };
        add("/tours/$slug", "/tours/$slug", tours.map((t) => t.slug));
        add("/gallery/$slug", "/gallery/$slug", tourAlbums.map((a) => a.slug));
        for (const destination of privateDestinations) {
          entries.push({ path: `/private-packages/${destination.slug}` });
          for (const place of destination.places.filter((place) => place.status !== "coming-soon")) {
            entries.push({ path: `/private-packages/${destination.slug}/places/${place.slug}` });
          }
          for (const pkg of destination.packages) entries.push({ path: `/private-packages/${destination.slug}/packages/${pkg.slug}` });
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});

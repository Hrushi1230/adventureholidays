import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { getPrivateDestination } from "@/lib/private-packages";

export const Route = createFileRoute("/private-packages/$destination")({
  staticData: { sitemap: false },
  loader: ({ params }) => { const destination = getPrivateDestination(params.destination); if (!destination) throw notFound(); return { destination }; },
  component: Outlet,
});
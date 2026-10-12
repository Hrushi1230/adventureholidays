import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPrivateDestination } from "@/lib/private-packages";
import { PlaceGrid } from "./private/PrivateDestinationPage";

export function PrivatePackagesOdisha() {
  const destination = getPrivateDestination("odisha");
  if (!destination) return null;
  return <section id="private-odisha" className="private-explorer border-t border-border bg-background"><div className="private-container">
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:justify-between"><div className="min-w-0"><p className="eyebrow text-accent">Closer to home</p><h2 className="private-heading mt-3">Private Packages Odisha</h2></div><Button asChild variant="ghost" size="icon" className="shrink-0" aria-label="Explore Odisha private packages"><Link to="/private-packages/$destination" params={{ destination: destination.slug }}><ArrowRight /></Link></Button></div>
    <PlaceGrid destination={destination} />
  </div></section>;
}
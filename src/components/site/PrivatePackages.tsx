import { privateDestinations } from "@/lib/private-packages";
import { DestinationTile } from "./private/DestinationTile";
import { PrivateQuoteDialog } from "./private/PrivateQuoteDialog";

export function PrivatePackages() {
  return (
    <section id="private" className="private-explorer bg-background" aria-labelledby="private-explorer-title">
      <div className="private-container">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-accent">Curated Private Journeys</p>
            <h2 id="private-explorer-title" className="private-heading mt-3">Explore India, Your Way.</h2>
            <p className="private-intro">Discover 19 incredible destinations. Choose your favourite place and let us craft your private journey.</p>
          </div>
          <PrivateQuoteDialog label="Customize Your Plan" className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90" />
        </div>
        <div className="destination-grid">{privateDestinations.map((destination) => <DestinationTile key={destination.slug} destination={destination} />)}</div>
        <div className="private-custom"><span>Your dates. Your people. Your journey.</span><PrivateQuoteDialog label="Plan a Custom Journey" className="bg-transparent text-primary shadow-none hover:bg-secondary" /></div>
      </div>
    </section>
  );
}

import { privateDestinations } from "@/lib/private-packages";
import { DestinationTile } from "./private/DestinationTile";
import { PrivateQuoteDialog } from "./private/PrivateQuoteDialog";

export function PrivatePackages() {
  return (
    <section id="private" className="private-explorer bg-background" aria-labelledby="private-explorer-title">
      <div className="private-container">
        <p className="eyebrow text-accent">Curated Private Journeys</p>
        <h2 id="private-explorer-title" className="private-heading mt-3">Explore India, Your Way.</h2>
        <p className="private-intro">Discover 19 incredible destinations. Choose your favourite place and let us craft your private journey.</p>
        <div className="destination-grid">{privateDestinations.map((destination) => <DestinationTile key={destination.slug} destination={destination} />)}</div>
        <div className="private-custom"><span>Your dates. Your people. Your journey.</span><PrivateQuoteDialog label="Plan a Custom Journey" className="bg-transparent text-primary shadow-none hover:bg-secondary" /></div>
      </div>
    </section>
  );
}

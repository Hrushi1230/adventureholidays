import { images } from "@/lib/site";
import { ExplorePreview } from "./ExplorePreview";

// Temporary image — replace with authentic Rural Camps media when supplied.
export function RuralCampsPreview() {
  return <ExplorePreview id="rural-camps" eyebrow="Also explore" title="Rural Camps" text="Stays close to nature, by Adventure Holiday." cta="Explore Rural Camps" href="/rural-camps" img={images.northeast} alt="Forest trail in the hills" />;
}

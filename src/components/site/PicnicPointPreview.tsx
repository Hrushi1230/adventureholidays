import { images } from "@/lib/site";
import { ExplorePreview } from "./ExplorePreview";

// Temporary image — replace with authentic Picnic Point media when supplied.
export function PicnicPointPreview() {
  return <ExplorePreview id="picnic-point" eyebrow="Also explore" title="Picnic Point" text="Day outings by Adventure Holiday." cta="Explore Picnic Point" href="/picnic-point" img={images.rafting} alt="Friends on a river outing" />;
}

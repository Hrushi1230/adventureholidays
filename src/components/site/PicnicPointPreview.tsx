import { picnicPoint } from "@/lib/experiences";
import { ExplorePreview } from "./ExplorePreview";

export function PicnicPointPreview() {
  return <ExplorePreview id="picnic-point" eyebrow="Also explore" title={picnicPoint.title} text={picnicPoint.shortDescription ?? ""} cta="Explore Picnic Point" href="/picnic-point" img={picnicPoint.heroImage ?? ""} alt="" />;
}

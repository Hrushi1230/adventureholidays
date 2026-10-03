import { ruralCamps } from "@/lib/experiences";
import { ExplorePreview } from "./ExplorePreview";

export function RuralCampsPreview() {
  return <ExplorePreview id="rural-camps" eyebrow="Also explore" title={ruralCamps.title} text={ruralCamps.shortDescription ?? ""} cta="Explore Rural Camps" href="/rural-camps" img={ruralCamps.heroImage ?? ""} alt="" />;
}

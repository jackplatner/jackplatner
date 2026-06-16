import CollectionGrid from "../components/CollectionGrid";
import { stills } from "../data/stills";

export default function StillsPage() {
  return <CollectionGrid items={stills} basePath="/stills" />;
}

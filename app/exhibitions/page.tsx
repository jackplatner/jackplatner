import CollectionGrid from "../components/CollectionGrid";
import { exhibitions } from "../data/exhibitions";

export default function ExhibitionsPage() {
  return <CollectionGrid items={exhibitions} basePath="/exhibitions" />;
}

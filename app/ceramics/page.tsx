import CollectionGrid from "../components/CollectionGrid";
import { ceramics } from "../data/ceramics";

export default function CeramicsPage() {
  return <CollectionGrid items={ceramics} basePath="/ceramics" />;
}

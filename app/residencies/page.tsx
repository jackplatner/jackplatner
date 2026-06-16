import CollectionGrid from "../components/CollectionGrid";
import { residencies } from "../data/residencies";

export default function ResidenciesPage() {
  return <CollectionGrid items={residencies} basePath="/residencies" />;
}

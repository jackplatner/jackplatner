import CollectionGrid from "../components/CollectionGrid";
import { getCollection } from "../lib/sanity/queries";

export default async function ResidenciesPage() {
  const items = await getCollection("residencies");
  return <CollectionGrid items={items} basePath="/residencies" />;
}

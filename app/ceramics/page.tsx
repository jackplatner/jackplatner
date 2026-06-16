import CollectionGrid from "../components/CollectionGrid";
import { getCollection } from "../lib/sanity/queries";

export default async function CeramicsPage() {
  const items = await getCollection("ceramics");
  return <CollectionGrid items={items} basePath="/ceramics" />;
}

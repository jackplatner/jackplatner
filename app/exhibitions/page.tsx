import CollectionGrid from "../components/CollectionGrid";
import { getCollection } from "../lib/sanity/queries";

export default async function ExhibitionsPage() {
  const items = await getCollection("exhibitions");
  return <CollectionGrid items={items} basePath="/exhibitions" />;
}

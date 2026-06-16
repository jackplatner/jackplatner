import CollectionGrid from "../components/CollectionGrid";
import { getCollection } from "../lib/sanity/queries";

export default async function ProjectsPage() {
  const items = await getCollection("projects");
  return <CollectionGrid items={items} basePath="/projects" />;
}

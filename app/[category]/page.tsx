import { notFound } from "next/navigation";
import CollectionGrid from "../components/CollectionGrid";
import { getCollection } from "../lib/sanity/queries";
import { categoryIds } from "../lib/sanity/categories";

export function generateStaticParams() {
  return categoryIds.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!categoryIds.includes(category)) notFound();
  const items = await getCollection(category);
  return <CollectionGrid items={items} basePath={`/${category}`} />;
}

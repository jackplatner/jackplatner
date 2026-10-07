import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionGrid from "../components/CollectionGrid";
import { getCollection } from "../lib/sanity/queries";
import { categoryIds, categoryLabel } from "../lib/sanity/categories";
import { pageMetadata } from "../lib/seo/site";

export function generateStaticParams() {
  return categoryIds.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return pageMetadata({ title: categoryLabel(category), path: `/${category}` });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!categoryIds.includes(category)) notFound();
  const items = await getCollection(category);
  return (
    <CollectionGrid
      items={items}
      basePath={`/${category}`}
      heading={categoryLabel(category)}
    />
  );
}

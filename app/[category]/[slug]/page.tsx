import ProjectDetail from "../../components/ProjectDetail";
import { getAllProjectParams, getCollection } from "../../lib/sanity/queries";
import { categoryLabel } from "../../lib/sanity/categories";

export async function generateStaticParams() {
  const params = await getAllProjectParams();
  return params.map(({ category, slug }) => ({ category, slug }));
}

export default async function CategoryProjectPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const items = await getCollection(category);
  return (
    <ProjectDetail
      items={items}
      basePath={`/${category}`}
      backLabel={categoryLabel(category)}
      slug={slug}
    />
  );
}

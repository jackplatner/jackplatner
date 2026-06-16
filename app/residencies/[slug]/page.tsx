import ProjectDetail from "../../components/ProjectDetail";
import { getCollection, getCollectionSlugs } from "../../lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs("residencies");
  return slugs.map((slug) => ({ slug }));
}

export default async function ResidencyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = await getCollection("residencies");
  return (
    <ProjectDetail
      items={items}
      basePath="/residencies"
      backLabel="Residencies"
      slug={slug}
    />
  );
}

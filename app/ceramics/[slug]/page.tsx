import ProjectDetail from "../../components/ProjectDetail";
import { getCollection, getCollectionSlugs } from "../../lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs("ceramics");
  return slugs.map((slug) => ({ slug }));
}

export default async function CeramicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = await getCollection("ceramics");
  return (
    <ProjectDetail
      items={items}
      basePath="/ceramics"
      backLabel="Ceramics"
      slug={slug}
    />
  );
}

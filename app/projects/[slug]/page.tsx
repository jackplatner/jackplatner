import ProjectDetail from "../../components/ProjectDetail";
import { getCollection, getCollectionSlugs } from "../../lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs("projects");
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = await getCollection("projects");
  return (
    <ProjectDetail
      items={items}
      basePath="/projects"
      backLabel="Projects"
      slug={slug}
    />
  );
}

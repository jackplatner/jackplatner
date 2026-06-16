import ProjectDetail from "../../components/ProjectDetail";
import { ceramics } from "../../data/ceramics";

export function generateStaticParams() {
  return ceramics.map((s) => ({ slug: s.slug }));
}

export default async function CeramicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <ProjectDetail
      items={ceramics}
      basePath="/ceramics"
      backLabel="Ceramics"
      slug={slug}
    />
  );
}

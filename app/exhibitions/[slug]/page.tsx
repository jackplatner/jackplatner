import ProjectDetail from "../../components/ProjectDetail";
import { exhibitions } from "../../data/exhibitions";

export function generateStaticParams() {
  return exhibitions.map((s) => ({ slug: s.slug }));
}

export default async function ExhibitionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <ProjectDetail
      items={exhibitions}
      basePath="/exhibitions"
      backLabel="Exhibitions"
      slug={slug}
    />
  );
}

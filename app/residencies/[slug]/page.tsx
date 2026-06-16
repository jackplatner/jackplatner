import ProjectDetail from "../../components/ProjectDetail";
import { residencies } from "../../data/residencies";

export function generateStaticParams() {
  return residencies.map((s) => ({ slug: s.slug }));
}

export default async function ResidencyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <ProjectDetail
      items={residencies}
      basePath="/residencies"
      backLabel="Residencies"
      slug={slug}
    />
  );
}

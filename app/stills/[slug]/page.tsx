import { notFound } from "next/navigation";
import { stills } from "../../data/stills";
import ProjectView from "./ProjectView";

export function generateStaticParams() {
  return stills.map((s) => ({ slug: s.slug }));
}

export default async function StillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = stills.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const project = stills[index];
  const prev = stills[(index - 1 + stills.length) % stills.length];
  const next = stills[(index + 1) % stills.length];

  return (
    <main className="project-page">
      <ProjectView
        images={project.images}
        prevSlug={prev.slug}
        nextSlug={next.slug}
      />
    </main>
  );
}

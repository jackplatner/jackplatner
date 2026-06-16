import { notFound } from "next/navigation";
import ProjectView from "./ProjectView";
import type { Project } from "../data/types";

export default function ProjectDetail({
  items,
  basePath,
  backLabel,
  slug,
}: {
  items: Project[];
  basePath: string;
  backLabel: string;
  slug: string;
}) {
  const index = items.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const project = items[index];
  const prev = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];

  return (
    <main className="project-page">
      <ProjectView
        images={project.images}
        basePath={basePath}
        backLabel={backLabel}
        prevSlug={prev.slug}
        nextSlug={next.slug}
      />
    </main>
  );
}

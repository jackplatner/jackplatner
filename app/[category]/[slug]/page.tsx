import type { Metadata } from "next";
import ProjectDetail from "../../components/ProjectDetail";
import JsonLd from "../../components/JsonLd";
import { getAllProjectParams, getCollection } from "../../lib/sanity/queries";
import { categoryLabel } from "../../lib/sanity/categories";
import { absoluteUrl, pageMetadata, siteUrl, truncate } from "../../lib/seo/site";

type Params = Promise<{ category: string; slug: string }>;

export async function generateStaticParams() {
  const params = await getAllProjectParams();
  return params.map(({ category, slug }) => ({ category, slug }));
}

async function findProject(category: string, slug: string) {
  const items = await getCollection(category);
  return items.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category, slug } = await params;
  const project = await findProject(category, slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.description ? truncate(project.description) : undefined,
    path: `/${category}/${slug}`,
    type: "article",
  });
}

export default async function CategoryProjectPage({ params }: { params: Params }) {
  const { category, slug } = await params;
  const items = await getCollection(category);
  const project = items.find((item) => item.slug === slug);
  const label = categoryLabel(category);
  return (
    <>
      {project && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CreativeWork",
                "@id": `${absoluteUrl(`/${category}/${slug}`)}#work`,
                name: project.title,
                url: absoluteUrl(`/${category}/${slug}`),
                ...(project.description ? { description: project.description } : {}),
                image: project.images.map((image) => image.src),
                creator: { "@id": `${siteUrl}/#person` },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                  { "@type": "ListItem", position: 2, name: label, item: absoluteUrl(`/${category}`) },
                  { "@type": "ListItem", position: 3, name: project.title },
                ],
              },
            ],
          }}
        />
      )}
      <ProjectDetail items={items} basePath={`/${category}`} backLabel={label} slug={slug} />
    </>
  );
}

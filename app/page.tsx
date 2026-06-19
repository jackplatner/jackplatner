import CardStrip from "./components/CardStrip";
import { getHomepageProjects } from "./lib/sanity/queries";

export default async function Home() {
  const items = await getHomepageProjects();
  const projects = items.map((s) => ({
    title: s.title,
    description: s.description,
    image: s.images[0].src,
    width: s.images[0].width,
    height: s.images[0].height,
    href: `/${s.category}/${s.slug}`,
  }));
  return <CardStrip projects={projects} />;
}

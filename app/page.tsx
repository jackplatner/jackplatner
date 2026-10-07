import CardStrip from "./components/CardStrip";
import { getHomepageProjects } from "./lib/sanity/queries";
import { getSiteName } from "./lib/seo/site";

export default async function Home() {
  const [items, name] = await Promise.all([getHomepageProjects(), getSiteName()]);
  const projects = items.map((s) => ({
    title: s.title,
    subtitle: s.subtitle,
    image: s.images[0].src,
    alt: s.images[0].alt || s.title,
    width: s.images[0].width,
    height: s.images[0].height,
    href: `/${s.category}/${s.slug}`,
  }));
  return (
    <>
      <h1 className="sr-only">{name}</h1>
      <CardStrip projects={projects} />
    </>
  );
}

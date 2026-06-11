import CardStrip from "./components/CardStrip";
import { stills } from "./data/stills";

const projects = stills.map((s) => ({
  title: s.title,
  description: s.description,
  image: s.images[0].src,
  width: s.images[0].width,
  height: s.images[0].height,
  href: `/stills/${s.slug}`,
}));

export default function Home() {
  return <CardStrip projects={projects} />;
}

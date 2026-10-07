import Image from "next/image";
import Link from "next/link";
import type { Project } from "../data/types";

export default function CollectionGrid({
  items,
  basePath,
  heading,
}: {
  items: Project[];
  basePath: string;
  heading: string;
}) {
  return (
    <main className="stills">
      <h1 className="sr-only">{heading}</h1>
      <div className="stills-grid">
        {items.map(({ title, slug, images }) => (
          <Link key={slug} href={`${basePath}/${slug}`} className="stills-item">
            <Image
              src={images[0].src}
              alt={images[0].alt || ""}
              width={images[0].width}
              height={images[0].height}
              sizes="(max-width: 48rem) 50vw, (max-width: 64rem) 33vw, 20vw"
              style={{ width: "100%", height: "auto" }}
            />
            <p className="stills-item__title">{title}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

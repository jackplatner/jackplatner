import Image from "next/image";
import Link from "next/link";
import type { Project } from "../data/types";

export default function CollectionGrid({
  items,
  basePath,
}: {
  items: Project[];
  basePath: string;
}) {
  return (
    <main className="stills">
      <div className="stills-grid">
        {items.map(({ title, slug, images }) => (
          <Link key={slug} href={`${basePath}/${slug}`} className="stills-item">
            <Image
              src={images[0].src}
              alt=""
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

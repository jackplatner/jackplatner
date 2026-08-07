import Image from "next/image";
import Link from "next/link";
import type { ProjectImage } from "../data/types";

export default function ProjectView({
  images,
  title,
  description,
  basePath,
  backLabel,
  prevSlug,
  nextSlug,
}: {
  images: ProjectImage[];
  title: string;
  description: string | null;
  basePath: string;
  backLabel: string;
  prevSlug: string;
  nextSlug: string;
}) {
  return (
    <>
      <div className="stack">
        {images.map((image, i) => (
          <section key={i} className="stack__slide">
            <Image
              className="stack__image"
              src={image.src}
              alt={image.alt || ""}
              width={image.width}
              height={image.height}
              sizes="100vw"
              priority={i === 0}
            />
          </section>
        ))}
      </div>

      {description && (
        <div id="info" className="info">
          <div className="info__panel">
            <h2 className="info__title">{title}</h2>
            <p className="info__body">{description}</p>
          </div>
          <div className="info__bar">
            <a href="#" className="info__btn">Close</a>
          </div>
        </div>
      )}

      <footer className="project__footer">
        <Link href={basePath} className="project__back">← {backLabel}</Link>
        {description && <a href="#info" className="project__info">Info</a>}
        <div className="project__nav">
          <Link href={`${basePath}/${prevSlug}`}>Prev</Link>
          <Link href={`${basePath}/${nextSlug}`}>Next</Link>
        </div>
      </footer>
    </>
  );
}

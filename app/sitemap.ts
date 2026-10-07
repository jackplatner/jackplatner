import type { MetadataRoute } from "next";
import { absoluteUrl } from "./lib/seo/site";
import { categoryIds } from "./lib/sanity/categories";
import { getAllProjectParams } from "./lib/sanity/queries";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjectParams();
  const staticPaths = ["/", ...categoryIds.map((id) => `/${id}`), "/contact"];
  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...projects.map(({ category, slug, updatedAt }) => ({
      url: absoluteUrl(`/${category}/${slug}`),
      lastModified: updatedAt,
    })),
  ];
}

import { client, hasSanity } from "./client";
import type { Project } from "../../data/types";

export const categoryBasePath: Record<string, string> = {
  projects: "/projects",
  residencies: "/residencies",
  exhibitions: "/exhibitions",
  ceramics: "/ceramics",
};

export interface HomeProject extends Project {
  category: string;
}

const imageProjection = `images[]{
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "alt": coalesce(alt, "")
}`;

export async function getCollection(category: string): Promise<Project[]> {
  if (!hasSanity) return [];
  return client.fetch(
    `*[_type == "project" && category == $category] | order(orderRank) {
      "slug": slug.current,
      title,
      description,
      ${imageProjection}
    }`,
    { category },
  );
}

export async function getHomepageProjects(): Promise<HomeProject[]> {
  if (!hasSanity) return [];
  return client.fetch(
    `*[_type == "project" && showOnHomepage == true] | order(orderRank) {
      "slug": slug.current,
      title,
      description,
      category,
      ${imageProjection}
    }`,
  );
}

export async function getCollectionSlugs(category: string): Promise<string[]> {
  if (!hasSanity) return [];
  return client.fetch(
    `*[_type == "project" && category == $category && defined(slug.current)].slug.current`,
    { category },
  );
}

export interface ContactContent {
  heading: string | null;
  intro: string | null;
  links: { label: string; url: string }[];
}

export async function getContact(): Promise<ContactContent | null> {
  if (!hasSanity) return null;
  return client.fetch(
    `*[_type == "contactPage"][0]{ heading, intro, links[]{ label, url } }`,
  );
}

export interface SiteSettings {
  name: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!hasSanity) return null;
  return client.fetch(
    `*[_type == "siteSettings"][0]{ name, seoTitle, seoDescription }`,
  );
}

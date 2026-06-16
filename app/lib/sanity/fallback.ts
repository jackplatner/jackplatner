import type { Project } from "../../data/types";
import type { ContactContent, HomeProject, SiteSettings } from "./queries";

const unbound14: Project = {
  slug: "unbound14",
  title: "Unbound 14",
  description: "Ceramic + Camera",
  images: [
    { src: "/unbound14/Ceramic+Camera.jpg.webp", width: 2500, height: 1617 },
    { src: "/unbound14/Ceramic+Camera-5.jpg.webp", width: 2500, height: 1708 },
    { src: "/unbound14/Ceramic+Camera-12.jpg.webp", width: 2500, height: 1667 },
    { src: "/unbound14/Ceramic+Camera-17.jpg.webp", width: 2500, height: 1667 },
    { src: "/unbound14/Ceramic+Camera-20.jpg.webp", width: 2500, height: 1667 },
    { src: "/unbound14/Ceramic+Camera-24.jpg.webp", width: 2500, height: 1667 },
    { src: "/unbound14/Ceramic+Camera-25.jpg.webp", width: 2500, height: 1667 },
  ],
};

const vermont: Project = {
  slug: "vermont-studio-center",
  title: "Vermont Studio Center",
  description: "Residency",
  images: [
    { src: "/vermont-studio-center/1.jpg", width: 1080, height: 1253 },
    { src: "/vermont-studio-center/2.jpg", width: 1080, height: 1254 },
    { src: "/vermont-studio-center/3.jpg", width: 1080, height: 1253 },
    { src: "/vermont-studio-center/4.jpg", width: 1080, height: 1253 },
    { src: "/vermont-studio-center/5.jpg", width: 1080, height: 1253 },
    { src: "/vermont-studio-center/6.jpg", width: 1080, height: 1254 },
  ],
};

const visionary: Project = {
  slug: "visionary-project-award",
  title: "Visionary Project Award",
  description: "Award",
  images: [{ src: "/visionary-project-award/1.jpg", width: 1080, height: 1301 }],
};

export const fallbackCollections: Record<string, Project[]> = {
  projects: [unbound14, vermont, visionary],
  residencies: [{ ...vermont, description: "Johnson, VT" }],
  exhibitions: [{ ...visionary, description: "Group Exhibition" }],
  ceramics: [unbound14],
};

export const fallbackHomepage: HomeProject[] = fallbackCollections.projects.map(
  (item) => ({ ...item, category: "projects" }),
);

export const fallbackContact: ContactContent = {
  heading: "Contact",
  intro: "For prints, commissions, and inquiries.",
  links: [
    { label: "Email", url: "mailto:hello@jackplatner.com" },
    { label: "Instagram", url: "https://instagram.com/jackplatner" },
  ],
};

export const fallbackSettings: SiteSettings = {
  name: "Jack Platner",
  seoTitle: "Jack Platner",
  seoDescription: "Photographer",
};

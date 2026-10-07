import type { Metadata } from "next";
import { getSiteSettings } from "../sanity/queries";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://jackplatner.com"
).replace(/\/$/, "");

export const defaultName = "Jack Platner";

export const defaultTitle = "Jack Platner — New York City Photographer";

export const defaultDescription =
  "Jack Platner is a New York City-based photographer working across weddings, editorial, and documentary projects, on both film and digital.";

export const biography =
  "Jack Platner is a New York City-based photographer originally from Malibu, California. His portfolio spans weddings, editorial assignments, and documentary projects. Working with both film and digital formats, Jack approaches each wedding as a storytelling experience, crafting images that feel both intimate and refined. With a calm, attentive presence reminiscent of an old friend, he strives to help couples feel completely at ease in front of the camera. Drawing on over a decade of experience lighting for fashion and advertising, Jack brings a sophisticated understanding of how light can shape portraits and transform a setting. His work has appeared in Vogue, The New York Times, Rolling Stone, Over the Moon, and other leading publications.";

export const specialties = [
  "Wedding photography",
  "Editorial photography",
  "Documentary photography",
  "Portrait photography",
  "Film photography",
  "Digital photography",
];

export const brandColors = { ink: "#28282a", paper: "#f7f4ef" };

export async function getSiteName(): Promise<string> {
  const settings = await getSiteSettings();
  return settings?.name || defaultName;
}

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export function truncate(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

const shareImage = { url: "/opengraph-image", width: 1200, height: 630, alt: defaultName };

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description?: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const text = description ? { description } : {};
  return {
    title,
    ...text,
    alternates: { canonical: path },
    openGraph: { type, title, url: path, images: [shareImage], ...text },
    twitter: { card: "summary_large_image", title, images: [shareImage], ...text },
  };
}

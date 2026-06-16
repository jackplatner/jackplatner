import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env. Set SANITY_STUDIO_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID) and SANITY_API_WRITE_TOKEN.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

const publicDir = path.join(process.cwd(), "public");

const data = {
  projects: [
    {
      slug: "unbound14",
      title: "Unbound 14",
      description: "Ceramic + Camera",
      images: [
        "/unbound14/Ceramic+Camera.jpg.webp",
        "/unbound14/Ceramic+Camera-5.jpg.webp",
        "/unbound14/Ceramic+Camera-12.jpg.webp",
        "/unbound14/Ceramic+Camera-17.jpg.webp",
        "/unbound14/Ceramic+Camera-20.jpg.webp",
        "/unbound14/Ceramic+Camera-24.jpg.webp",
        "/unbound14/Ceramic+Camera-25.jpg.webp",
      ],
    },
    {
      slug: "vermont-studio-center",
      title: "Vermont Studio Center",
      description: "Residency",
      images: [
        "/vermont-studio-center/1.jpg",
        "/vermont-studio-center/2.jpg",
        "/vermont-studio-center/3.jpg",
        "/vermont-studio-center/4.jpg",
        "/vermont-studio-center/5.jpg",
        "/vermont-studio-center/6.jpg",
      ],
    },
    {
      slug: "visionary-project-award",
      title: "Visionary Project Award",
      description: "Award",
      images: ["/visionary-project-award/1.jpg"],
    },
  ],
  residencies: [
    {
      slug: "vermont-studio-center",
      title: "Vermont Studio Center",
      description: "Johnson, VT",
      images: [
        "/vermont-studio-center/1.jpg",
        "/vermont-studio-center/2.jpg",
        "/vermont-studio-center/3.jpg",
        "/vermont-studio-center/4.jpg",
        "/vermont-studio-center/5.jpg",
        "/vermont-studio-center/6.jpg",
      ],
    },
  ],
  exhibitions: [
    {
      slug: "visionary-project-award",
      title: "Visionary Project Award",
      description: "Group Exhibition",
      images: ["/visionary-project-award/1.jpg"],
    },
  ],
  ceramics: [
    {
      slug: "unbound14",
      title: "Unbound 14",
      description: "Ceramic + Camera",
      images: [
        "/unbound14/Ceramic+Camera.jpg.webp",
        "/unbound14/Ceramic+Camera-5.jpg.webp",
        "/unbound14/Ceramic+Camera-12.jpg.webp",
        "/unbound14/Ceramic+Camera-17.jpg.webp",
        "/unbound14/Ceramic+Camera-20.jpg.webp",
        "/unbound14/Ceramic+Camera-24.jpg.webp",
        "/unbound14/Ceramic+Camera-25.jpg.webp",
      ],
    },
  ],
};

const assetCache = new Map();

async function uploadImage(relPath) {
  if (assetCache.has(relPath)) return assetCache.get(relPath);
  const filePath = path.join(publicDir, relPath);
  const filename = path.basename(relPath);
  const asset = await client.assets.upload(
    "image",
    createReadStream(filePath),
    { filename },
  );
  assetCache.set(relPath, asset._id);
  return asset._id;
}

async function run() {
  for (const [category, items] of Object.entries(data)) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const images = [];
      for (const relPath of item.images) {
        const assetId = await uploadImage(relPath);
        images.push({
          _type: "image",
          _key: randomUUID(),
          asset: { _type: "reference", _ref: assetId },
        });
      }
      const doc = {
        _id: `project-${category}-${item.slug}`,
        _type: "project",
        title: item.title,
        slug: { _type: "slug", current: item.slug },
        category,
        description: item.description,
        images,
        orderRank: String(i).padStart(6, "0"),
      };
      await client.createOrReplace(doc);
      console.log(`Seeded ${category}/${item.slug}`);
    }
  }

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: "Jack Platner",
    seoTitle: "Jack Platner",
    seoDescription: "Photographer",
  });
  console.log("Seeded siteSettings");

  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    heading: "Contact",
    intro: "For prints, commissions, and inquiries.",
    links: [
      {
        _key: randomUUID(),
        label: "Email",
        url: "mailto:hello@jackplatner.com",
      },
      {
        _key: randomUUID(),
        label: "Instagram",
        url: "https://instagram.com/jackplatner",
      },
    ],
  });
  console.log("Seeded contactPage");

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

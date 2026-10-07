import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import Nav from "./components/Nav";
import JsonLd from "./components/JsonLd";
import { getContactLinks, getSiteSettings } from "./lib/sanity/queries";
import {
  biography,
  defaultDescription,
  defaultName,
  defaultTitle,
  siteUrl,
  specialties,
} from "./lib/seo/site";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const name = settings?.name || defaultName;
  const title = settings?.seoTitle || defaultTitle;
  const description = settings?.seoDescription || defaultDescription;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s — ${name}` },
    description,
    applicationName: name,
    authors: [{ name, url: siteUrl }],
    creator: name,
    keywords: [
      name,
      "New York City photographer",
      "NYC wedding photographer",
      ...specialties,
    ],
    alternates: { canonical: "/" },
    robots: { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type: "website",
      siteName: name,
      title,
      description,
      url: "/",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

async function SiteJsonLd() {
  const settings = await getSiteSettings();
  const name = settings?.name || defaultName;
  const links = await getContactLinks();
  const profiles = links.map(({ url }) => url).filter((url) => url.startsWith("http"));
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name,
            inLanguage: "en",
            publisher: { "@id": `${siteUrl}/#person` },
          },
          {
            "@type": "Person",
            "@id": `${siteUrl}/#person`,
            name,
            url: siteUrl,
            jobTitle: "Photographer",
            description: biography,
            homeLocation: { "@type": "Place", name: "New York City" },
            knowsAbout: specialties,
            ...(profiles.length ? { sameAs: profiles } : {}),
          },
        ],
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body>
        <SiteJsonLd />
        <Nav />
        {children}
      </body>
    </html>
  );
}

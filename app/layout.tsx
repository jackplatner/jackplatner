import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import Nav from "./components/Nav";
import { getSiteSettings } from "./lib/sanity/queries";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings?.seoTitle || settings?.name || "Jack Platner",
    description: settings?.seoDescription || "Photographer",
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound__inner">
        <h1 className="notfound__code">404</h1>
        <p className="notfound__text">This page could not be found.</p>
        <Link href="/" className="notfound__home">← Home</Link>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound__inner">
        <p className="notfound__code">404</p>
        <p className="notfound__text">This page could not be found.</p>
        <Link href="/" className="notfound__home">← Home</Link>
      </div>
    </main>
  );
}

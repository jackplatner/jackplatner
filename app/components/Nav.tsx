import Link from "next/link";
import { getSiteSettings } from "../lib/sanity/queries";
import { categories } from "../lib/sanity/categories";

const links = [
  ...categories.map(({ id, label }) => ({ label, href: `/${id}` })),
  { label: "Contact", href: "/contact" },
];

export default async function Nav() {
  const settings = await getSiteSettings();
  const name = settings?.name || "Jack Platner";
  return (
    <nav className="nav">
      <Link href="/" className="nav__logo">{name}</Link>
      <ul className="nav__links">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className="nav__link">
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import Link from "next/link";
import { getSiteSettings } from "../lib/sanity/queries";

const links = [
  { label: "Projects", href: "/projects" },
  { label: "Residencies", href: "/residencies" },
  { label: "Exhibitions", href: "/exhibitions" },
  { label: "Ceramics", href: "/ceramics" },
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

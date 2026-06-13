import Link from "next/link";

const links = [
  { label: "Projects", href: "/stills" },
  { label: "Residencies", href: "#" },
  { label: "Exhibitions", href: "#" },
  { label: "Ceramics", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="nav__logo">Jack Platner</Link>
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

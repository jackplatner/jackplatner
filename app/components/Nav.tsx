import Link from "next/link";

const links = [
  { label: "Portraits and Fashion", href: "/stills" },
  { label: "Ceramic Cameras", href: "/stills/unbound14" },
  { label: "Functional Ceramics", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="nav__logo">Jack Platner</Link>
      <ul className="nav__links">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className="nav__link" data-label={label}>
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

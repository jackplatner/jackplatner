const links = [
  { label: "Email", href: "mailto:hello@jackplatner.com" },
  { label: "Instagram", href: "https://instagram.com/jackplatner" },
];

export default function ContactPage() {
  return (
    <main className="contact">
      <div className="contact__inner">
        <h1 className="contact__heading">Contact</h1>
        <p className="contact__intro">
          For prints, commissions, and inquiries.
        </p>
        <ul className="contact__links">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="contact__link"
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span className="contact__link-label">{label}</span>
                <span className="contact__link-value">
                  {href.replace(/^mailto:|^https?:\/\//, "")}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

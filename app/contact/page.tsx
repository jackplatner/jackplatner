import { getContact } from "../lib/sanity/queries";

const fallbackLinks = [
  { label: "Email", url: "mailto:hello@jackplatner.com" },
  { label: "Instagram", url: "https://instagram.com/jackplatner" },
];

export default async function ContactPage() {
  const contact = await getContact();
  const heading = contact?.heading || "Contact";
  const intro = contact?.intro || "For prints, commissions, and inquiries.";
  const links = contact?.links?.length ? contact.links : fallbackLinks;

  return (
    <main className="contact">
      <div className="contact__inner">
        <h1 className="contact__heading">{heading}</h1>
        <p className="contact__intro">{intro}</p>
        <ul className="contact__links">
          {links.map(({ label, url }) => (
            <li key={label}>
              <a
                href={url}
                className="contact__link"
                target={url.startsWith("http") ? "_blank" : undefined}
                rel={url.startsWith("http") ? "noreferrer" : undefined}
              >
                <span className="contact__link-label">{label}</span>
                <span className="contact__link-value">
                  {url.replace(/^mailto:|^tel:|^https?:\/\//, "")}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

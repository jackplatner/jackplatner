import type { Metadata } from "next";
import { getContact, getContactLinks } from "../lib/sanity/queries";
import { pageMetadata, truncate } from "../lib/seo/site";

const defaultHeading = "Contact";
const defaultIntro = "For prints, commissions, and inquiries.";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact();
  const title = contact?.heading || defaultHeading;
  const description = truncate(contact?.intro || defaultIntro);
  return pageMetadata({ title, description, path: "/contact" });
}

export default async function ContactPage() {
  const contact = await getContact();
  const heading = contact?.heading || defaultHeading;
  const intro = contact?.intro || defaultIntro;
  const links = await getContactLinks();

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

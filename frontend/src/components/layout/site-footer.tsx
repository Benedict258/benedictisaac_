import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";
import { navLinks, site, socials } from "@/data/site";

const footerSocials = [
  { label: "X", icon: Twitter, href: socials.find((s) => s.icon === "twitter")?.href },
  { label: "GitHub", icon: Github, href: socials.find((s) => s.icon === "github")?.href },
  { label: "LinkedIn", icon: Linkedin, href: socials.find((s) => s.icon === "linkedin")?.href },
];

export function SiteFooter() {
  return (
    <footer className="border-t pb-6 pt-12">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <Link to="/" className="inline-flex min-h-11 items-center text-xl font-bold">
            {site.name}
          </Link>
          <ul className="flex list-none gap-3">
            {footerSocials.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer" className="mt-6 border-t pt-6">
          <ul className="flex list-none flex-wrap gap-x-2 gap-y-1">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="inline-flex min-h-11 items-center px-2 text-sm text-primary-text underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-4 text-sm text-muted-foreground">
          Copyright {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

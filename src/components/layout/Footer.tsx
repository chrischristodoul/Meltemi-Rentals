import Link from "next/link";
import { primaryNav, site } from "@/data/site";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-[color:var(--color-line)] bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-semibold text-[color:var(--color-ink)]">
            {site.name}
          </p>
          <p className="mt-2 text-sm text-[color:var(--color-ink-muted)]">
            {site.tagline}
            <br />
            {site.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--color-ink-soft)]">
            Site
          </p>
          <ul className="mt-3 space-y-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[color:var(--color-ink)] hover:text-[color:var(--color-brand-700)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--color-ink-soft)]">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="text-[color:var(--color-ink)] hover:text-[color:var(--color-brand-700)]"
              >
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-[color:var(--color-ink)] hover:text-[color:var(--color-brand-700)]"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-[color:var(--color-line)]">
        <Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 py-5 text-xs text-[color:var(--color-ink-muted)]">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Made in Kos.</p>
        </Container>
      </div>
    </footer>
  );
}

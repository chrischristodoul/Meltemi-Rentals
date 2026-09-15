import { site } from "@/data/site";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--color-line)] bg-white">
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-start md:justify-between md:py-10">
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
        <div className="flex flex-col gap-2 text-xs text-[color:var(--color-ink-muted)] md:mt-1 md:items-end">
          <p className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand-500)]"
            />
            Available daily · 09:00–22:00
          </p>
          <p>
            <a
              href={`tel:${site.phone.replace(/\s+/g, "")}`}
              className="text-[color:var(--color-ink)] hover:text-[color:var(--color-brand-700)]"
            >
              {site.phone}
            </a>
            <span aria-hidden="true"> · </span>
            <a
              href={`mailto:${site.email}`}
              className="text-[color:var(--color-ink)] hover:text-[color:var(--color-brand-700)]"
            >
              {site.email}
            </a>
          </p>
          <p className="text-[color:var(--color-ink-soft)]">
            (Demo placeholder — real details to be added.)
          </p>
        </div>
      </Container>

      <div className="border-t border-[color:var(--color-line)]">
        <Container className="flex flex-col items-start justify-between gap-1 py-4 text-xs text-[color:var(--color-ink-muted)] md:flex-row md:items-center md:py-5">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Made in Kos.</p>
        </Container>
      </div>
    </footer>
  );
}

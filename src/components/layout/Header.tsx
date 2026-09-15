import Link from "next/link";
import { primaryNav, site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

const headerNav = primaryNav.filter((item) => item.href !== "/request");

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-line)] bg-[color:var(--color-bg)]">
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold tracking-tight text-[color:var(--color-ink)]"
          aria-label={`${site.name} home`}
        >
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--color-brand-500)]"
          />
          <span>{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {headerNav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${site.phone.replace(/\s+/g, "")}`}
            className="text-sm text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-brand-700)]"
          >
            {site.phone}
          </a>
          <Button href="/request" size="md">
            Request a car
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}

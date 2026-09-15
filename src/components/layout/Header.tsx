import Link from "next/link";
import { site } from "@/data/site";
import { Container } from "./Container";
import { NavMenu } from "./NavMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-line)] bg-[color:var(--color-bg)]">
      <Container className="flex h-14 items-center justify-between md:h-16">
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

        <NavMenu />
      </Container>
    </header>
  );
}

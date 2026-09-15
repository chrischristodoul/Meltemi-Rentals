"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { href: string; children: ReactNode };

export function NavLink({ href, children }: Props) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center rounded-[var(--radius-md)] px-3 py-2 text-sm transition-colors",
        active
          ? "text-[color:var(--color-brand-700)] font-medium"
          : "text-[color:var(--color-ink)] hover:text-[color:var(--color-brand-700)]",
      )}
    >
      {children}
    </Link>
  );
}

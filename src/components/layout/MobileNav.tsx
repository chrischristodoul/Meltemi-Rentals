"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, site } from "@/data/site";
import { cn } from "@/lib/cn";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const openTrigger = openRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      openTrigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={openRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-dialog"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-brand-50)]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-nav-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 md:hidden"
        >
          <div
            className="absolute inset-0 bg-[color:var(--color-ink)]/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(320px,86vw)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[color:var(--color-line)]">
              <span className="font-semibold">{site.name}</span>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-brand-50)]"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <nav aria-label="Primary" className="flex-1 overflow-y-auto py-2">
              <ul className="flex flex-col">
                {primaryNav.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block px-5 py-3 text-base",
                          active
                            ? "text-[color:var(--color-brand-700)] font-medium"
                            : "text-[color:var(--color-ink)]",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="border-t border-[color:var(--color-line)] px-5 py-4 text-sm text-[color:var(--color-ink-muted)]">
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="block text-[color:var(--color-ink)] font-medium"
              >
                {site.phone}
              </a>
              <span>24/7 phone support</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

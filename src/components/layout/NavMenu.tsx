"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav } from "@/data/site";
import { cn } from "@/lib/cn";

const REQUEST_HREF = "/request";

export function NavMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[color:var(--color-ink)] transition-colors hover:text-[color:var(--color-brand-700)]"
      >
        <HamburgerIcon open={open} />
      </button>

      {open ? (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-label="Site navigation"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 origin-top-right overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-line)] bg-white animate-[nav-in_120ms_ease-out]"
          style={{ boxShadow: "0 10px 30px rgba(14, 42, 61, 0.10)" }}
        >
          <ul className="py-1">
            {primaryNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const isPrimary = item.href === REQUEST_HREF;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    role="menuitem"
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex min-h-[44px] items-center justify-between gap-3 px-4 text-sm transition-colors",
                      isPrimary
                        ? "font-semibold text-[color:var(--color-brand-700)] hover:bg-[color:var(--color-brand-50)]"
                        : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-bg-alt)]",
                      active &&
                        (isPrimary
                          ? "bg-[color:var(--color-brand-50)]"
                          : "bg-[color:var(--color-bg-alt)]"),
                    )}
                  >
                    <span>{item.label}</span>
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand-500)]"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  // Three lines that morph into an X on open — pure CSS, respects prefers-reduced-motion.
  return (
    <span
      aria-hidden="true"
      className="relative block h-4 w-6"
    >
      <span
        className={cn(
          "absolute left-0 h-[1.75px] w-full rounded-sm bg-current transition-all duration-150 ease-out",
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 h-[1.75px] w-full -translate-y-1/2 rounded-sm bg-current transition-opacity duration-150 ease-out",
          open ? "opacity-0" : "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-[1.75px] w-full rounded-sm bg-current transition-all duration-150 ease-out",
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
        )}
      />
    </span>
  );
}

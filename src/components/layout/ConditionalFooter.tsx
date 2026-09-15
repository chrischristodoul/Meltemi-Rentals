"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

/**
 * Renders the site footer on every route except `/request`, where the page
 * is intentionally focused on the rental request form.
 */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/request") return null;
  return <Footer />;
}

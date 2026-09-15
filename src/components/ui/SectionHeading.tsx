import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  id,
  className,
}: Props) {
  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.14em] text-[color:var(--color-brand-700)]">
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className={cn(
          Tag === "h1"
            ? "text-[length:var(--step-h1)]"
            : "text-[length:var(--step-h2)]",
        )}
      >
        {title}
      </Tag>
      {lead ? (
        <p className="mt-4 text-base md:text-lg text-[color:var(--color-ink-muted)]">
          {lead}
        </p>
      ) : null}
    </header>
  );
}

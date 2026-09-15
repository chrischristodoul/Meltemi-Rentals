import { cn } from "@/lib/cn";
import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";

type Props = {
  children: ReactNode;
  as?: ElementType;
  tone?: "default" | "alt";
  className?: string;
  containerClassName?: string;
  id?: string;
  "aria-labelledby"?: string;
};

export function Section({
  children,
  as: Tag = "section",
  tone = "default",
  className,
  containerClassName,
  id,
  ...rest
}: Props) {
  return (
    <Tag
      id={id}
      className={cn(
        "py-14 md:py-20",
        tone === "alt" && "bg-[color:var(--color-bg-alt)]",
        className,
      )}
      {...rest}
    >
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}

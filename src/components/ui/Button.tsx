import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium " +
  "transition-colors duration-150 select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-brand-600)] " +
  "disabled:opacity-60 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  md: "min-h-[44px] px-5 text-[15px]",
  lg: "min-h-[52px] px-6 text-base md:text-[17px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-brand-600)] text-white hover:bg-[color:var(--color-brand-700)] active:bg-[color:var(--color-brand-800)]",
  secondary:
    "bg-white text-[color:var(--color-ink)] border border-[color:var(--color-line-strong)] hover:border-[color:var(--color-brand-600)] hover:text-[color:var(--color-brand-700)]",
  ghost:
    "bg-transparent text-[color:var(--color-ink)] hover:bg-[color:var(--color-brand-50)] hover:text-[color:var(--color-brand-700)]",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props;
    void _v; void _s; void _c; void _ch;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  void _v; void _s; void _c; void _ch;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

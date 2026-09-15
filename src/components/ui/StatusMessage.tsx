import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "info" | "success" | "error";

type Props = {
  tone?: Tone;
  title?: string;
  children: ReactNode;
  className?: string;
};

const styles: Record<Tone, string> = {
  info:
    "border-[color:var(--color-brand-100)] bg-[color:var(--color-brand-50)] text-[color:var(--color-brand-800)]",
  success:
    "border-[#bfe3d1] bg-[#eaf6ee] text-[color:var(--color-success)]",
  error:
    "border-[#ecc8c8] bg-[#fbeeee] text-[color:var(--color-danger)]",
};

const role: Record<Tone, "status" | "alert"> = {
  info: "status",
  success: "status",
  error: "alert",
};

export function StatusMessage({
  tone = "info",
  title,
  children,
  className,
}: Props) {
  return (
    <div
      role={role[tone]}
      aria-live={tone === "error" ? "assertive" : "polite"}
      className={cn(
        "rounded-[var(--radius-md)] border px-4 py-3 text-sm",
        styles[tone],
        className,
      )}
    >
      {title ? <p className="font-semibold">{title}</p> : null}
      <div className={cn(title && "mt-1")}>{children}</div>
    </div>
  );
}

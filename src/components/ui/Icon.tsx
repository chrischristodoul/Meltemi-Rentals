import type { ReactElement, SVGProps } from "react";

export type IconName =
  | "shield"
  | "zero"
  | "user-plus"
  | "plane"
  | "fuel"
  | "phone"
  | "card-off"
  | "check"
  | "map";

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

const paths: Record<IconName, ReactElement> = {
  shield: (
    <path
      d="M12 3l8 3v6c0 4.5-3.4 8.5-8 9-4.6-.5-8-4.5-8-9V6l8-3z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  zero: (
    <>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  "user-plus": (
    <>
      <circle cx="10" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path
        d="M4.5 19c.7-2.8 3-4.5 5.5-4.5s4.8 1.7 5.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M18 8v5M15.5 10.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  plane: (
    <path
      d="M3 13l7-1 4-7 2 1-2 6 5-.5 1.5-2 1.5.7-2 3.6 2 3.6-1.5.7-1.5-2-5-.5 2 6-2 1-4-7-7-1v-1z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  fuel: (
    <>
      <path
        d="M5 20V6a2 2 0 012-2h6a2 2 0 012 2v14"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path d="M4 20h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M15 9h2a2 2 0 012 2v5a1.5 1.5 0 003 0v-6l-2-2"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
  phone: (
    <path
      d="M5 4h3l2 5-2 1a10 10 0 006 6l1-2 5 2v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "card-off": (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  check: (
    <path
      d="M5 12l4 4 10-10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  map: (
    <>
      <path
        d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
};

export function Icon({ name, size = 20, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

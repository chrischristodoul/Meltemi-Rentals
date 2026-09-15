export const site = {
  name: "Meltemi Rentals",
  tagline: "Kos car rental, done properly.",
  description:
    "Small independent car rental in Kos, Greece. Transparent all-inclusive pricing, full insurance with zero excess, airport pickup and 24/7 phone support.",
  location: "Kos, Greece",
  phone: "+30 000 000 0000",
  email: "hello@meltemirentals.gr",
  url: "https://meltemirentals.example",
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Cars", href: "/cars" },
  { label: "Request a car", href: "/request" },
];

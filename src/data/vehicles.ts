export type VehicleCategory =
  | "economy"
  | "compact"
  | "compact-suv"
  | "premium";

export type Transmission = "manual" | "automatic";
export type Fuel = "petrol" | "diesel" | "hybrid";

export type DateRange = { from: string; to: string }; // ISO YYYY-MM-DD, inclusive

export type Vehicle = {
  id: string;
  /** URL slug — used in /request?category=<slug>. Matches VehicleCategory. */
  categorySlug: VehicleCategory;
  categoryLabel: string;
  /** Realistic model name shown on the card. */
  name: string;
  seats: number;
  luggage: number;
  transmission: Transmission;
  fuel: Fuel;
  features: string[];
  description: string;
  /** All-inclusive daily price for July (peak). */
  pricePerDayEUR: number;
  /** Optional real photo path under /public/cars. When absent, a CSS placeholder renders. */
  image?: string;
  /** Local, static unavailable ranges. Prototype only — no real inventory backend. */
  unavailable: DateRange[];
};

export const vehicles: Vehicle[] = [
  {
    id: "picanto",
    categorySlug: "economy",
    categoryLabel: "Small / Economy",
    name: "Kia Picanto",
    seats: 4,
    luggage: 2,
    transmission: "manual",
    fuel: "petrol",
    features: ["Air conditioning", "Bluetooth", "5 doors", "USB"],
    description:
      "Nimble and easy to park — the perfect small car for Kos Town and coastal roads.",
    pricePerDayEUR: 35,
    image: "/images/car-economy.webp",
    unavailable: [
      { from: "2026-07-14", to: "2026-07-22" },
      { from: "2026-10-10", to: "2026-10-18" },
    ],
  },
  {
    id: "polo",
    categorySlug: "compact",
    categoryLabel: "Compact",
    name: "Volkswagen Polo",
    seats: 5,
    luggage: 3,
    transmission: "manual",
    fuel: "petrol",
    features: [
      "Air conditioning",
      "Bluetooth",
      "Cruise control",
      "Rear parking sensors",
    ],
    description:
      "Comfortable and refined for longer drives across the island with a bit more space.",
    pricePerDayEUR: 42,
    image: "/images/car-compact.webp",
    unavailable: [
      { from: "2026-08-01", to: "2026-08-10" },
      { from: "2026-09-05", to: "2026-09-08" },
    ],
  },
  {
    id: "vitara",
    categorySlug: "compact-suv",
    categoryLabel: "Compact SUV",
    name: "Suzuki Vitara",
    seats: 5,
    luggage: 3,
    transmission: "manual",
    fuel: "petrol",
    features: [
      "Air conditioning",
      "Higher ground clearance",
      "Bluetooth",
      "Roof rails",
    ],
    description:
      "Higher ride and roomy boot — a good pick for mountain villages and families.",
    pricePerDayEUR: 50,
    image: "/images/car-suv.webp",
    unavailable: [{ from: "2026-07-25", to: "2026-08-05" }],
  },
  {
    id: "corolla-hybrid",
    categorySlug: "premium",
    categoryLabel: "Premium Automatic",
    name: "Toyota Corolla Hybrid",
    seats: 5,
    luggage: 3,
    transmission: "automatic",
    fuel: "hybrid",
    features: [
      "Automatic transmission",
      "Hybrid — very low fuel use",
      "Adaptive cruise",
      "Reversing camera",
    ],
    description:
      "Automatic, hybrid and quiet — a comfortable step up for long days behind the wheel.",
    pricePerDayEUR: 55,
    image: "/images/car-premium.webp",
    unavailable: [
      { from: "2026-07-10", to: "2026-07-16" },
      { from: "2026-11-01", to: "2026-11-08" },
    ],
  },
];

/**
 * Returns true if the vehicle has no unavailable range overlapping [from, to].
 * Uses plain string comparison — safe for ISO YYYY-MM-DD dates.
 */
export function isVehicleAvailable(
  vehicle: Vehicle,
  from: string,
  to: string,
): boolean {
  if (!from || !to) return true;
  return !vehicle.unavailable.some(
    (range) => !(range.to < from || range.from > to),
  );
}

export function findVehicleByCategory(
  slug: string,
): Vehicle | undefined {
  return vehicles.find((v) => v.categorySlug === slug);
}

/** Category options presented to the visitor in the request form. */
export const categoryOptions: ReadonlyArray<{
  slug: VehicleCategory;
  label: string;
}> = [
  { slug: "economy", label: "Economy" },
  { slug: "compact", label: "Compact" },
  { slug: "compact-suv", label: "Compact SUV" },
  { slug: "premium", label: "Automatic / Premium Compact" },
];

export function isCategorySlug(v: string): v is VehicleCategory {
  return categoryOptions.some((c) => c.slug === v);
}

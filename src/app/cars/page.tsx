import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CarsBrowser } from "@/components/cars/CarsBrowser";
import { vehicles } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Cars",
  description:
    "Browse the Meltemi Rentals fleet in Kos and check general availability for your dates.",
};

export default function CarsPage() {
  return (
    <Section as="div">
      <SectionHeading
        as="h1"
        eyebrow="Our fleet"
        title="Choose your car"
        lead="Four categories to cover most trips in Kos — from a nimble city car to an automatic hybrid. Every rental is all-inclusive."
      />
      <div className="mt-10">
        <CarsBrowser vehicles={vehicles} />
      </div>
    </Section>
  );
}

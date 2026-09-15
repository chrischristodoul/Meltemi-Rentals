import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RequestForm } from "@/components/request/RequestForm";
import { findVehicleByCategory, isCategorySlug } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Request a car",
  description:
    "Send a rental request to Meltemi Rentals in Kos. This is not an instant booking — we'll contact you to confirm availability and the final price.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
function safeDate(v: string | undefined): string | undefined {
  return v && ISO_DATE.test(v) ? v : undefined;
}

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const rawCategory = first(params.category);
  const category =
    rawCategory && isCategorySlug(rawCategory) ? rawCategory : undefined;
  const from = safeDate(first(params.from));
  const to = safeDate(first(params.to));

  const preselected = category ? findVehicleByCategory(category) : undefined;

  return (
    <Section as="div">
      <SectionHeading
        as="h1"
        title="Request a car"
        lead="Tell us your dates and we'll get back to you to confirm availability and the final price — usually within a few hours."
      />

      {preselected ? (
        <div className="mt-6 max-w-2xl rounded-[var(--radius-md)] border border-[color:var(--color-brand-100)] bg-[color:var(--color-brand-50)] px-4 py-3 text-sm text-[color:var(--color-brand-800)]">
          Preselected: <strong>{preselected.categoryLabel}</strong> —{" "}
          {preselected.name}, €{preselected.pricePerDayEUR}/day all-inclusive.
          You can change the category below.
        </div>
      ) : null}

      <div className="mt-8">
        <RequestForm
          defaultCategory={category}
          defaultFrom={from}
          defaultTo={to}
        />
      </div>
    </Section>
  );
}

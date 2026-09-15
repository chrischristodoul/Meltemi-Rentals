import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Car rental in Kos — transparent, all-inclusive pricing",
  description:
    "Meltemi Rentals: independent car rental in Kos. From €35/day all-inclusive — full insurance, zero excess, second driver, airport pickup and 24/7 support.",
};

type Included = { icon: IconName; title: string; body: string };

const included: Included[] = [
  {
    icon: "shield",
    title: "Full insurance",
    body: "Comprehensive cover included on every rental — no upgrade required.",
  },
  {
    icon: "zero",
    title: "€0 excess",
    body: "No damage excess to worry about. What's covered is fully covered.",
  },
  {
    icon: "user-plus",
    title: "Second driver",
    body: "Share the driving with a partner or friend, at no extra charge.",
  },
  {
    icon: "plane",
    title: "Airport pickup & drop-off",
    body: "We meet you at Kos airport and take the car back when you leave.",
  },
  {
    icon: "fuel",
    title: "Full-to-full fuel",
    body: "You get the car full. Return it full. No fuel service charges.",
  },
  {
    icon: "phone",
    title: "24/7 support",
    body: "A real person on the phone whenever you need us during your rental.",
  },
  {
    icon: "card-off",
    title: "No credit card deposit",
    body: "No large hold on your card at pickup — nothing frozen for weeks.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <IncludedSection />
      <PricingSection />
      <ExploreKosSection />
      <FinalCta />
    </>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative border-b border-[color:var(--color-line)]"
    >
      <Container className="grid gap-10 py-12 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-[color:var(--color-brand-700)]">
            Car rental · Kos, Greece
          </p>
          <h1
            id="hero-title"
            className="mt-3 text-[length:var(--step-display)] font-semibold leading-[1.05]"
          >
            Your car. Your holiday. No surprises.
          </h1>
          <p className="mt-5 text-lg text-[color:var(--color-ink-muted)]">
            From{" "}
            <span className="font-semibold text-[color:var(--color-ink)]">
              €35/day
            </span>{" "}
            — the price you see is the price you pay.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {[
              "Full insurance",
              "€0 excess",
              "Second driver",
              "Airport pickup & drop-off",
              "Full-to-full fuel",
              "24/7 support",
              "No credit card deposit",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Icon
                  name="check"
                  className="mt-1 text-[color:var(--color-brand-600)]"
                  size={16}
                />
                <span className="text-[color:var(--color-ink)]">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/cars" size="lg">
              Explore our cars
            </Button>
            <Button href="/request" variant="secondary" size="lg">
              Request a car
            </Button>
          </div>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}

/**
 * Art-directed hero — separate crops for portrait mobile vs. wide desktop.
 * Uses next/image's getImageProps so each source is served through the
 * optimizer (WebP/AVIF, sized to the viewport). Only the matching <source>
 * is fetched by the browser.
 */
function HeroVisual() {
  const common = { alt: "", priority: true, quality: 82 } as const;

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: "/images/hero-desktop.webp",
    width: 1800,
    height: 750,
    sizes: "(min-width: 1024px) 45vw, (min-width: 768px) 100vw, 0px",
  });

  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({
    ...common,
    src: "/images/hero-mobile.webp",
    width: 900,
    height: 1200,
    sizes: "(max-width: 767px) 100vw, 0px",
  });

  return (
    <div
      className="relative order-first w-full overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-line)] bg-[color:var(--color-bg-alt)] aspect-[3/4] md:aspect-[16/9] lg:order-none lg:aspect-[4/3]"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
        {/* Decorative — the hero copy adjacent conveys the meaning. */}
        <img
          {...imgProps}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      <div className="absolute inset-x-5 bottom-5 rounded-[var(--radius-md)] border border-[color:var(--color-line)] bg-white p-4 shadow-[var(--shadow-card)] md:inset-x-6 md:bottom-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-brand-700)]">
          July · small car
        </p>
        <p className="mt-1.5 text-[26px] font-semibold leading-none tracking-tight text-[color:var(--color-ink)]">
          €35
          <span className="ml-1 text-sm font-normal text-[color:var(--color-ink-muted)]">
            / day, all-in
          </span>
        </p>
        <p className="mt-2 text-xs text-[color:var(--color-ink-muted)]">
          Insurance, zero excess, airport pickup — included.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Everything included ---------------- */

function IncludedSection() {
  return (
    <Section aria-labelledby="included-title">
      <SectionHeading
        id="included-title"
        eyebrow="Everything included"
        title="One price. Nothing extra to worry about."
        lead="Every Meltemi rental comes with the essentials that most companies charge for separately."
      />

      <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {included.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand-50)] text-[color:var(--color-brand-700)]">
              <Icon name={item.icon} />
            </span>
            <div>
              <h3 className="text-base font-semibold text-[color:var(--color-ink)]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------- Transparent pricing ---------------- */

function PricingSection() {
  return (
    <Section tone="alt" aria-labelledby="pricing-title">
      <SectionHeading
        id="pricing-title"
        eyebrow="Transparent pricing"
        title="Don't compare the starting price. Compare the final price."
        lead="Advertised daily prices can look very different from the total you pay at the desk. Insurance, damage excess, deposits and airport charges are often added on top. We show the full price up front."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {/* Meltemi — final price */}
        <article className="relative flex flex-col rounded-[var(--radius-lg)] border-2 border-[color:var(--color-brand-500)] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[color:var(--color-brand-50)] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[color:var(--color-brand-700)]">
            Meltemi Rentals
          </span>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight text-[color:var(--color-ink)]">
              €35
            </span>
            <span className="text-lg text-[color:var(--color-ink-muted)]">
              / day
            </span>
          </p>
          <p className="mt-2 text-sm font-medium text-[color:var(--color-brand-700)]">
            Final price
          </p>
          <p className="mt-4 text-sm text-[color:var(--color-ink-muted)]">
            Includes insurance, €0 excess, second driver, airport pickup &amp;
            drop-off, full-to-full fuel and 24/7 support.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {[
              "Full insurance",
              "€0 damage excess",
              "Second driver",
              "Airport pickup & drop-off",
              "24/7 support",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Icon
                  name="check"
                  className="mt-1 text-[color:var(--color-brand-600)]"
                  size={16}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Advertised starting price */}
        <article className="relative flex flex-col rounded-[var(--radius-lg)] border border-[color:var(--color-line)] bg-white p-6 md:p-8">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[color:var(--color-bg-alt)] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[color:var(--color-ink-muted)]">
            Advertised starting price
          </span>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight text-[color:var(--color-ink-muted)]">
              €8
            </span>
            <span className="text-lg text-[color:var(--color-ink-muted)]">
              / day<span aria-hidden="true">*</span>
            </span>
          </p>
          <p className="mt-2 text-sm font-medium text-[color:var(--color-ink-muted)]">
            Starting price
          </p>
          <p className="mt-4 text-sm text-[color:var(--color-ink-muted)]">
            Additional mandatory costs may include insurance, damage excess or
            deposit and airport charges. Depending on the rental terms, the
            final cost can reach approximately{" "}
            <span className="font-semibold text-[color:var(--color-ink)]">
              €48/day
            </span>
            .
          </p>
          <dl className="mt-5 divide-y divide-[color:var(--color-line)] border-t border-[color:var(--color-line)] text-sm">
            {[
              ["Basic daily rate", "€8"],
              ["Insurance / excess reduction", "often added"],
              ["Deposit hold on card", "often required"],
              ["Airport fee", "often added"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 py-2"
              >
                <dt className="text-[color:var(--color-ink-muted)]">{k}</dt>
                <dd className="text-[color:var(--color-ink)]">{v}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>

      <p className="mt-6 max-w-2xl text-xs text-[color:var(--color-ink-muted)]">
        <span aria-hidden="true">* </span>Illustrative figures based on
        commonly advertised starting prices for small cars in Kos in July. The
        final price you pay depends on the specific rental company and terms.
      </p>
    </Section>
  );
}

/* ---------------- Explore Kos ---------------- */

function ExploreKosSection() {
  return (
    <Section aria-labelledby="kos-title">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <KosVisual />
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-[color:var(--color-brand-700)]">
            Explore Kos
          </p>
          <h2
            id="kos-title"
            className="mt-3 text-[length:var(--step-h1)] font-semibold"
          >
            More freedom to explore Kos.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-muted)]">
            From quiet beaches on the south coast to mountain villages and
            historic sites inland, having your own car makes it easier to
            discover more of the island — on your own schedule, without
            waiting for a bus.
          </p>
          <ul className="mt-5 grid gap-2 text-sm">
            {[
              "Quiet beaches away from the main resorts",
              "Mountain villages like Zia and Pyli",
              "Ancient sites and everyday tavernas",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Icon
                  name="map"
                  className="mt-0.5 text-[color:var(--color-brand-600)]"
                  size={16}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/cars">See the cars</Button>
            <Button href="/request" variant="secondary">
              Request a car
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function KosVisual() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-line)] bg-[color:var(--color-bg-alt)]">
      <Image
        src="/images/kos-explore.webp"
        alt="A quiet Kos coastline — the kind of spot easier to reach with your own car."
        fill
        sizes="(min-width: 1024px) 45vw, (min-width: 640px) 90vw, 100vw"
        loading="lazy"
        quality={78}
        className="object-cover"
      />
    </div>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCta() {
  return (
    <Section tone="alt" aria-labelledby="final-cta-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="final-cta-title"
          className="text-[length:var(--step-h1)] font-semibold"
        >
          Ready to explore Kos?
        </h2>
        <p className="mt-3 text-[color:var(--color-ink-muted)]">
          Choose your car and send us your rental request. We&apos;ll confirm
          availability and the final price — usually within a few hours.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/request" size="lg">
            Request a car
          </Button>
          <Link
            href="/cars"
            className="inline-flex min-h-[44px] items-center px-2 text-[color:var(--color-brand-700)] hover:text-[color:var(--color-brand-800)]"
          >
            or browse the fleet →
          </Link>
        </div>
      </div>
    </Section>
  );
}

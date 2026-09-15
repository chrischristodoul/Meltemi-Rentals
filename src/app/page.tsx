import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Car rental in Kos — transparent, all-inclusive pricing",
  description:
    "Meltemi Rentals: independent car rental in Kos. €35/day all-inclusive — full insurance, €0 excess, second driver, airport pickup and 24/7 support. No credit card deposit.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PricingSection />
      <ReviewsSection />
      <ExploreKosSection />
      <FinalCta />
    </>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const common = { alt: "", priority: true, quality: 82 } as const;

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: "/images/hero-desktop.webp",
    width: 1800,
    height: 900,
    sizes: "(min-width: 768px) 100vw, 0px",
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
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-[color:var(--color-line)]"
    >
      {/* Full-bleed background image — art-directed per breakpoint. */}
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
        <img
          {...imgProps}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      </picture>

      {/* Light wash so ink text stays legible while the photograph clearly reads
          as the hero background. Softer top-to-bottom on mobile; stronger on the
          left (behind the copy) on desktop so more of the image shows on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[color:var(--color-bg)]/75 via-[color:var(--color-bg)]/45 to-[color:var(--color-bg)]/25 md:bg-gradient-to-r md:from-[color:var(--color-bg)]/85 md:via-[color:var(--color-bg)]/50 md:to-[color:var(--color-bg)]/10"
      />

      <Container className="py-12 md:py-20 lg:py-24">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--color-brand-700)]">
            Car rental · Kos, Greece
          </p>
          <h1
            id="hero-title"
            className="mt-2 text-[length:var(--step-h1)] font-semibold leading-[1.1] md:text-[length:var(--step-display)]"
          >
            Your car. Your holiday. No surprises.
          </h1>

          <p className="mt-6 text-[38px] font-semibold leading-none tracking-tight text-[color:var(--color-ink)] md:text-[44px]">
            €35<span className="text-[color:var(--color-ink-muted)] font-normal">/day</span>
          </p>
          <p className="mt-3 text-[15px] text-[color:var(--color-ink)] md:text-base">
            Everything you need, included.
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[color:var(--color-ink-muted)]">
            <li>Full insurance</li>
            <li aria-hidden="true" className="text-[color:var(--color-ink-soft)]">·</li>
            <li>€0 excess</li>
            <li aria-hidden="true" className="text-[color:var(--color-ink-soft)]">·</li>
            <li>Airport pickup</li>
            <li aria-hidden="true" className="text-[color:var(--color-ink-soft)]">·</li>
            <li>Second driver</li>
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/cars" size="lg">
              Explore our cars
            </Button>
            <Button href="/request" variant="secondary" size="lg">
              Request a car
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Transparent pricing ---------------- */

function PricingSection() {
  return (
    <Section tone="alt" aria-labelledby="pricing-title">
      <SectionHeading
        id="pricing-title"
        eyebrow="Transparent pricing"
        title="Compare the final price, not just the starting price."
        lead="Advertised daily prices can look very different from the total you pay at the desk. We show the full price up front."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* Meltemi — final price */}
        <article className="flex flex-col rounded-[var(--radius-lg)] border-2 border-[color:var(--color-brand-500)] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
          <span className="inline-flex w-fit items-center rounded-full bg-[color:var(--color-brand-50)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--color-brand-700)]">
            Meltemi
          </span>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight text-[color:var(--color-ink)]">
              €35/day
            </span>
          </p>
          <p className="mt-2 text-sm font-medium text-[color:var(--color-brand-700)]">
            Final price
          </p>
          <p className="mt-4 text-sm text-[color:var(--color-ink-muted)]">
            Full insurance · €0 excess · second driver · airport pickup ·
            full-to-full fuel · 24/7 support · no credit card deposit.
          </p>
        </article>

        {/* Advertised starting price */}
        <article className="flex flex-col rounded-[var(--radius-lg)] border border-[color:var(--color-line)] bg-white p-6 md:p-8">
          <span className="inline-flex w-fit items-center rounded-full bg-[color:var(--color-bg-alt)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--color-ink-muted)]">
            Advertised starting price
          </span>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight text-[color:var(--color-ink-muted)]">
              from €8/day
              <span aria-hidden="true" className="text-3xl">
                *
              </span>
            </span>
          </p>
          <p className="mt-2 text-sm font-medium text-[color:var(--color-ink-muted)]">
            Starting price
          </p>
          <p className="mt-4 text-sm text-[color:var(--color-ink-muted)]">
            Additional mandatory costs may apply depending on the rental terms
            — for example insurance, damage excess or deposit and airport
            charges. The final daily cost can end up considerably higher
            (around €48/day is not unusual).
          </p>
        </article>
      </div>

      <p className="mt-5 max-w-2xl text-xs text-[color:var(--color-ink-muted)]">
        <span aria-hidden="true">* </span>Illustrative figure based on
        commonly advertised starting prices for small cars in Kos in July. The
        final price you pay depends on the specific rental company and terms.
      </p>
    </Section>
  );
}

/* ---------------- Trust + FAQ ---------------- */

/**
 * DEMO TESTIMONIALS — prototype only.
 *
 * These entries are sample copy shaped to demonstrate how real reviews will
 * render. Replace with real customer submissions when the site starts
 * collecting them. Do not present these as verified reviews.
 */
type DemoReview = {
  quote: string;
  name: string;
  place: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

const demoReviews: DemoReview[] = [
  {
    quote:
      "The €35 price was exactly what we paid. Airport pickup was easy and there were no unexpected charges.",
    name: "Costas",
    place: "Athens",
    rating: 5,
  },
  {
    quote:
      "We picked up the car at the airport and everything was straightforward. Having a second driver included made a big difference.",
    name: "Marta",
    place: "Warsaw",
    rating: 5,
  },
  {
    quote:
      "Small car, easy to park in Kos Town, and the whole process was much simpler than the cheaper offers we were comparing.",
    name: "James",
    place: "Manchester",
    rating: 5,
  },
];

function ReviewsSection() {
  return (
    <Section aria-labelledby="reviews-title">
      <SectionHeading
        id="reviews-title"
        eyebrow="Customer feedback"
        title="What our guests say."
        lead="A few notes from people who have rented with Meltemi."
      />

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {demoReviews.map((r) => (
          <li
            key={r.name + r.quote.slice(0, 12)}
            className="flex flex-col rounded-[var(--radius-lg)] border border-[color:var(--color-line)] bg-white p-6"
          >
            <Stars rating={r.rating} />
            <blockquote className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-ink)]">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <p className="mt-5 text-sm text-[color:var(--color-ink-muted)]">
              <span className="font-medium text-[color:var(--color-ink)]">
                {r.name}
              </span>
              <span aria-hidden="true"> · </span>
              <span>{r.place}</span>
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-[color:var(--color-ink-soft)]">
        Sample feedback shown while we collect verified reviews from recent
        rentals.
      </p>
    </Section>
  );
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <p
      aria-label={`${filled} out of 5 stars`}
      className="flex gap-0.5 text-[color:var(--color-brand-600)]"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} filled={i < filled} />
      ))}
    </p>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9L12 2.6z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------- Explore Kos ---------------- */

function ExploreKosSection() {
  return (
    <Section tone="alt" aria-labelledby="kos-title">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)]">
          <Image
            src="/images/kos-explore.webp"
            alt="A quiet stretch of Kos coastline at dusk."
            fill
            sizes="(min-width: 1024px) 45vw, (min-width: 640px) 90vw, 100vw"
            loading="lazy"
            quality={78}
            className="object-cover"
            style={{ objectPosition: "100% 60%" }}
          />
          {/* Soft top-left mask to hide the third-party watermark on the source asset.
              Matches the pale sky tone so a light-on-light watermark disappears rather
              than being contrasted by the mask. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(180px 110px at 0% 0%, rgba(180,205,225,0.98), rgba(180,205,225,0.65) 45%, transparent 75%)",
            }}
          />
        </div>
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--color-brand-700)]">
            Explore Kos
          </p>
          <h2
            id="kos-title"
            className="mt-2 text-[length:var(--step-h1)] font-semibold"
          >
            More freedom to explore the island.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-muted)]">
            Quiet beaches on the south coast, mountain villages like Zia and
            Pyli, ancient sites and everyday tavernas — having your own car
            makes it easier to reach them on your own schedule.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="bg-[color:var(--color-ink)] text-white"
    >
      <Container className="py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="final-cta-title"
            className="text-[length:var(--step-h1)] font-semibold leading-[1.1] tracking-tight text-white"
          >
            Ready when you are. Kos is waiting.
          </h2>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            Pick your dates and your car — we&rsquo;ll handle the rest.
          </p>
          <div className="mt-7 flex justify-center">
            <Link
              href="/request"
              className="inline-flex min-h-[52px] items-center justify-center rounded-[var(--radius-md)] bg-white px-7 text-base font-medium text-[color:var(--color-ink)] transition-colors duration-150 hover:bg-[color:var(--color-brand-50)] hover:text-[color:var(--color-brand-800)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-[17px]"
            >
              Request a car
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

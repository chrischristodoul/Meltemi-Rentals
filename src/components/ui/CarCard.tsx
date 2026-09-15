import Image from "next/image";
import type { Vehicle } from "@/data/vehicles";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Icon } from "./Icon";

type Props = {
  vehicle: Vehicle;
  /** Optional pickup/return dates carried through to the request page. */
  dates?: { from: string; to: string };
  /** Availability against the current filter. Omit if no dates selected yet. */
  status?: "available" | "unavailable";
  priority?: boolean;
  className?: string;
};

const transmissionLabel: Record<Vehicle["transmission"], string> = {
  manual: "Manual",
  automatic: "Automatic",
};

const fuelLabel: Record<Vehicle["fuel"], string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  hybrid: "Hybrid",
};

export function CarCard({
  vehicle,
  dates,
  status,
  priority = false,
  className,
}: Props) {
  const unavailable = status === "unavailable";

  const requestParams = new URLSearchParams({ category: vehicle.categorySlug });
  if (dates?.from && dates?.to) {
    requestParams.set("from", dates.from);
    requestParams.set("to", dates.to);
  }
  const requestHref = `/request?${requestParams.toString()}`;

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-line)] bg-white transition-shadow duration-150 hover:shadow-[var(--shadow-card)]",
        unavailable && "opacity-80",
        className,
      )}
    >
      <CarImage vehicle={vehicle} priority={priority} muted={unavailable} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--color-brand-700)]">
              {vehicle.categoryLabel}
            </p>
            <h3 className="mt-1 text-lg font-semibold">{vehicle.name}</h3>
          </div>
          <p className="shrink-0 text-right">
            <span className="text-[22px] font-semibold leading-none tracking-tight text-[color:var(--color-ink)]">
              €{vehicle.pricePerDayEUR}/day
            </span>
            <span className="mt-1 block text-[11px] text-[color:var(--color-ink-muted)]">
              all-inclusive
            </span>
          </p>
        </div>

        {status ? (
          <AvailabilityBadge status={status} className="mt-3" />
        ) : null}

        <p className="mt-3 text-sm text-[color:var(--color-ink-muted)]">
          {vehicle.description}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <Spec label="Passengers" value={`${vehicle.seats}`} />
          <Spec
            label="Luggage"
            value={`${vehicle.luggage} bag${vehicle.luggage === 1 ? "" : "s"}`}
          />
          <Spec label="Gearbox" value={transmissionLabel[vehicle.transmission]} />
          <Spec label="Fuel" value={fuelLabel[vehicle.fuel]} />
        </dl>

        {vehicle.features.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {vehicle.features.map((f) => (
              <li
                key={f}
                className="inline-flex items-center rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-2.5 py-1 text-xs text-[color:var(--color-ink-muted)]"
              >
                {f}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 pt-5 border-t border-[color:var(--color-line)]">
          {unavailable ? (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex min-h-[44px] w-full cursor-not-allowed items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--color-line-strong)] bg-[color:var(--color-bg)] px-5 text-[15px] font-medium text-[color:var(--color-ink-muted)]"
            >
              Not available for these dates
            </button>
          ) : (
            <Button href={requestHref} className="w-full">
              Request this car
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-[color:var(--color-ink-soft)]">
        {label}
      </dt>
      <dd className="mt-0.5 text-[color:var(--color-ink)]">{value}</dd>
    </div>
  );
}

function AvailabilityBadge({
  status,
  className,
}: {
  status: "available" | "unavailable";
  className?: string;
}) {
  if (status === "available") {
    return (
      <p
        className={cn(
          "inline-flex w-fit items-center gap-1.5 rounded-full bg-[#eaf6ee] px-2.5 py-1 text-xs font-medium text-[color:var(--color-success)]",
          className,
        )}
      >
        <Icon name="check" size={14} />
        Available for these dates
      </p>
    );
  }
  return (
    <p
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full bg-[#fbeeee] px-2.5 py-1 text-xs font-medium text-[color:var(--color-danger)]",
        className,
      )}
    >
      Not available for these dates
    </p>
  );
}

/**
 * Renders the car photo when a real image is provided at vehicle.image;
 * otherwise a lightweight CSS placeholder. Replace by dropping JPGs into
 * /public/cars/<file> and setting vehicle.image accordingly.
 */
function CarImage({
  vehicle,
  priority,
  muted,
}: {
  vehicle: Vehicle;
  priority: boolean;
  muted: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-bg-alt)]",
        muted && "grayscale",
      )}
    >
      {vehicle.image ? (
        <Image
          src={vehicle.image}
          alt={`${vehicle.name} — ${vehicle.categoryLabel}`}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 80% at 80% 10%, #d5ecec 0%, #edf4f5 55%, #f6f2ea 100%)",
          }}
        />
      )}
    </div>
  );
}

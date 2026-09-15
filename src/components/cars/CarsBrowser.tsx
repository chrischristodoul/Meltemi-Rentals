"use client";

import { useId, useMemo, useState } from "react";
import { CarCard } from "@/components/ui/CarCard";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { isVehicleAvailable, type Vehicle } from "@/data/vehicles";

type Props = { vehicles: Vehicle[] };

type Filter =
  | { kind: "none" }
  | { kind: "invalid"; message: string }
  | { kind: "valid"; from: string; to: string };

function todayIso(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function CarsBrowser({ vehicles }: Props) {
  const pickupId = useId();
  const returnId = useId();
  const errId = useId();

  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [filter, setFilter] = useState<Filter>({ kind: "none" });

  const min = todayIso();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pickup || !returnDate) {
      setFilter({
        kind: "invalid",
        message: "Please choose both a pickup and a return date.",
      });
      return;
    }
    if (returnDate <= pickup) {
      setFilter({
        kind: "invalid",
        message: "The return date must be after the pickup date.",
      });
      return;
    }
    setFilter({ kind: "valid", from: pickup, to: returnDate });
  }

  function handleClear() {
    setPickup("");
    setReturnDate("");
    setFilter({ kind: "none" });
  }

  const active = filter.kind === "valid" ? filter : null;

  const rows = useMemo(() => {
    return vehicles.map((v) => ({
      vehicle: v,
      status: active
        ? isVehicleAvailable(v, active.from, active.to)
          ? ("available" as const)
          : ("unavailable" as const)
        : undefined,
    }));
  }, [vehicles, active]);

  const availableCount = active
    ? rows.filter((r) => r.status === "available").length
    : null;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        aria-labelledby="filter-title"
        className="rounded-[var(--radius-lg)] border border-[color:var(--color-line)] bg-white p-5 shadow-[var(--shadow-card)] md:p-6"
      >
        <h2
          id="filter-title"
          className="text-base font-semibold text-[color:var(--color-ink)]"
        >
          Check general availability
        </h2>
        <p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">
          Prototype: availability is based on our local planning data. We&apos;ll
          confirm the final availability when you send a request.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={pickupId} className="text-sm font-medium">
              Pick-up date
            </label>
            <input
              id={pickupId}
              type="date"
              value={pickup}
              min={min}
              onChange={(e) => setPickup(e.target.value)}
              aria-invalid={filter.kind === "invalid" ? true : undefined}
              aria-describedby={filter.kind === "invalid" ? errId : undefined}
              className="min-h-[44px] w-full rounded-[var(--radius-md)] border border-[color:var(--color-line-strong)] bg-white px-3.5 py-2.5 text-base text-[color:var(--color-ink)] focus:border-[color:var(--color-brand-600)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-500)]/40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={returnId} className="text-sm font-medium">
              Return date
            </label>
            <input
              id={returnId}
              type="date"
              value={returnDate}
              min={pickup || min}
              onChange={(e) => setReturnDate(e.target.value)}
              aria-invalid={filter.kind === "invalid" ? true : undefined}
              aria-describedby={filter.kind === "invalid" ? errId : undefined}
              className="min-h-[44px] w-full rounded-[var(--radius-md)] border border-[color:var(--color-line-strong)] bg-white px-3.5 py-2.5 text-base text-[color:var(--color-ink)] focus:border-[color:var(--color-brand-600)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-500)]/40"
            />
          </div>

          <div className="flex gap-2 md:justify-end">
            <button
              type="submit"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-brand-600)] px-5 text-[15px] font-medium text-white hover:bg-[color:var(--color-brand-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-brand-600)]"
            >
              Check availability
            </button>
            {active ? (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--color-line-strong)] bg-white px-4 text-sm font-medium text-[color:var(--color-ink)] hover:border-[color:var(--color-brand-600)] hover:text-[color:var(--color-brand-700)]"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>

        {filter.kind === "invalid" ? (
          <p
            id={errId}
            role="alert"
            className="mt-3 text-sm text-[color:var(--color-danger)]"
          >
            {filter.message}
          </p>
        ) : null}
      </form>

      {active ? (
        <div className="mt-6" aria-live="polite">
          <StatusMessage
            tone={
              availableCount && availableCount > 0 ? "info" : "error"
            }
          >
            {availableCount && availableCount > 0
              ? `${availableCount} of ${vehicles.length} vehicles are available from ${formatDate(active.from)} to ${formatDate(active.to)}.`
              : `No vehicles are available from ${formatDate(active.from)} to ${formatDate(active.to)}. Try different dates.`}
          </StatusMessage>
        </div>
      ) : null}

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {rows.map(({ vehicle, status }, i) => (
          <li key={vehicle.id}>
            <CarCard
              vehicle={vehicle}
              status={status}
              dates={
                active ? { from: active.from, to: active.to } : undefined
              }
              priority={i < 2}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

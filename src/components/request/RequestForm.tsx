"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { Icon } from "@/components/ui/Icon";
import { categoryOptions, isCategorySlug } from "@/data/vehicles";

type Values = {
  fullName: string;
  email: string;
  pickup: string;
  returnDate: string;
  category: string;
};

type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

type Status = "idle" | "submitting" | "success" | "server-error";

type Props = {
  defaultCategory?: string;
  defaultFrom?: string;
  defaultTo?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function todayIso(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.fullName.trim()) e.fullName = "Please enter your full name.";
  if (!v.email.trim()) {
    e.email = "Please enter your email.";
  } else if (!EMAIL_RE.test(v.email.trim())) {
    e.email = "Please enter a valid email address.";
  }
  if (!v.pickup) e.pickup = "Please choose a pickup date.";
  if (!v.returnDate) {
    e.returnDate = "Please choose a return date.";
  } else if (v.pickup && v.returnDate <= v.pickup) {
    e.returnDate = "The return date must be after the pickup date.";
  }
  if (!v.category) {
    e.category = "Please choose a car category.";
  } else if (!isCategorySlug(v.category)) {
    e.category = "Please choose a valid car category.";
  }
  return e;
}

export function RequestForm({
  defaultCategory,
  defaultFrom,
  defaultTo,
}: Props) {
  const initialCategory =
    defaultCategory && isCategorySlug(defaultCategory) ? defaultCategory : "";

  const [values, setValues] = useState<Values>({
    fullName: "",
    email: "",
    pickup: defaultFrom ?? "",
    returnDate: defaultTo ?? "",
    category: initialCategory,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState<string>("");

  function update<K extends Field>(k: K, v: string) {
    setValues((prev) => {
      const next = { ...prev, [k]: v };
      if (errors[k] || (k === "pickup" && errors.returnDate)) {
        const nextErrors = validate(next);
        setErrors((prevErr) => ({
          ...prevErr,
          [k]: nextErrors[k],
          ...(k === "pickup" ? { returnDate: nextErrors.returnDate } : {}),
        }));
      }
      return next;
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setServerMsg("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.fullName.trim(),
          email: values.email.trim(),
          pickupDate: values.pickup,
          returnDate: values.returnDate,
          category: values.category,
        }),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      setServerMsg(
        "We couldn't send your request just now. Please try again in a moment, or call us to send your request by phone.",
      );
      setStatus("server-error");
    } catch {
      setServerMsg(
        "We couldn't reach our servers. Please check your connection and try again.",
      );
      setStatus("server-error");
    }
  }

  if (status === "success") {
    return <SuccessState />;
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby="form-help"
      className="max-w-2xl"
    >
      {status === "server-error" ? (
        <StatusMessage tone="error" title="Request couldn't be sent" className="mb-6">
          {serverMsg}
        </StatusMessage>
      ) : null}

      <div className="grid gap-5">
        <FormField
          label="Full name"
          required
          value={values.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          error={errors.fullName}
          autoComplete="name"
          placeholder="e.g. Maria Papadopoulou"
        />

        <FormField
          label="Email"
          type="email"
          required
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Pick-up date"
            type="date"
            required
            value={values.pickup}
            min={todayIso()}
            onChange={(e) => update("pickup", e.target.value)}
            error={errors.pickup}
          />

          <FormField
            label="Return date"
            type="date"
            required
            value={values.returnDate}
            min={values.pickup || todayIso()}
            onChange={(e) => update("returnDate", e.target.value)}
            error={errors.returnDate}
          />
        </div>

        <FormField
          as="select"
          label="Car category"
          required
          value={values.category}
          onChange={(e) => update("category", e.target.value)}
          error={errors.category}
        >
          <option value="" disabled>
            Choose a category
          </option>
          {categoryOptions.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </FormField>
      </div>

      <p
        id="form-help"
        className="mt-6 text-sm text-[color:var(--color-ink-muted)]"
      >
        This is a request, not an instant booking. Meltemi Rentals will contact
        you shortly to confirm availability and the final rental details.
      </p>

      <div className="mt-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[color:var(--color-brand-600)] px-6 text-base font-medium text-white hover:bg-[color:var(--color-brand-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Spinner />
              Sending request…
            </>
          ) : (
            "Send rental request"
          )}
        </button>
      </div>
    </form>
  );
}

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M21 12a9 9 0 00-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function SuccessState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="max-w-2xl rounded-[var(--radius-lg)] border border-[#bfe3d1] bg-[#eaf6ee] p-6 md:p-8"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[color:var(--color-success)]">
        <Icon name="check" size={22} />
      </span>
      <h2 className="mt-4 text-[length:var(--step-h2)] font-semibold text-[color:var(--color-ink)]">
        Request received
      </h2>
      <p className="mt-3 text-[color:var(--color-ink-muted)]">
        Thank you. Meltemi Rentals will contact you shortly to confirm
        availability and the final rental details. Please check your inbox —
        including the spam folder — for our reply.
      </p>
    </div>
  );
}

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { categoryOptions, isCategorySlug } from "@/data/vehicles";

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  email?: unknown;
  pickupDate?: unknown;
  returnDate?: unknown;
  category?: unknown;
};

type FieldErrors = Partial<
  Record<"name" | "email" | "pickupDate" | "returnDate" | "category", string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const NAME_MIN = 2;
const NAME_MAX = 100;

function isStr(v: unknown): v is string {
  return typeof v === "string";
}

function validate(body: Payload): {
  ok: true;
  data: {
    name: string;
    email: string;
    pickupDate: string;
    returnDate: string;
    category: string;
    categoryLabel: string;
  };
} | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};

  const name = isStr(body.name) ? body.name.trim() : "";
  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < NAME_MIN || name.length > NAME_MAX) {
    errors.name = `Name must be between ${NAME_MIN} and ${NAME_MAX} characters.`;
  }

  const email = isStr(body.email) ? body.email.trim() : "";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(email) || email.length > 254) {
    errors.email = "A valid email is required.";
  }

  const pickupDate = isStr(body.pickupDate) ? body.pickupDate : "";
  if (!pickupDate) {
    errors.pickupDate = "Pickup date is required.";
  } else if (!ISO_DATE_RE.test(pickupDate)) {
    errors.pickupDate = "Pickup date must be in YYYY-MM-DD format.";
  }

  const returnDate = isStr(body.returnDate) ? body.returnDate : "";
  if (!returnDate) {
    errors.returnDate = "Return date is required.";
  } else if (!ISO_DATE_RE.test(returnDate)) {
    errors.returnDate = "Return date must be in YYYY-MM-DD format.";
  } else if (pickupDate && ISO_DATE_RE.test(pickupDate) && returnDate <= pickupDate) {
    errors.returnDate = "Return date must be after the pickup date.";
  }

  const category = isStr(body.category) ? body.category : "";
  const categoryMatch = categoryOptions.find((c) => c.slug === category);
  if (!category) {
    errors.category = "Category is required.";
  } else if (!isCategorySlug(category) || !categoryMatch) {
    errors.category = "Category is not one of the allowed values.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      pickupDate,
      returnDate,
      category,
      categoryLabel: categoryMatch!.label,
    },
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Validation failed.", fieldErrors: result.errors },
      { status: 400 },
    );
  }
  const { name, email, pickupDate, returnDate, category, categoryLabel } =
    result.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RENTAL_REQUEST_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error(
      "[api/request] Missing env: RESEND_API_KEY / RENTAL_REQUEST_EMAIL / RESEND_FROM_EMAIL",
    );
    return NextResponse.json(
      { error: "Email service is not configured on the server." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const timestamp = new Date().toISOString();

  const textBody = [
    "New rental request",
    "",
    "Customer:",
    `Name:  ${name}`,
    `Email: ${email}`,
    "",
    "Rental dates:",
    `Pick-up: ${pickupDate}`,
    `Return:  ${returnDate}`,
    "",
    "Requested category:",
    `${categoryLabel} (${category})`,
    "",
    `Received: ${timestamp}`,
  ].join("\n");

  const htmlBody = `
<!doctype html>
<html><body style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color:#0e2a3d; line-height:1.5;">
  <h2 style="margin:0 0 12px;">New rental request</h2>
  <h3 style="margin:16px 0 6px;">Customer</h3>
  <p style="margin:0;">
    <strong>Name:</strong> ${escapeHtml(name)}<br>
    <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
  </p>
  <h3 style="margin:16px 0 6px;">Rental dates</h3>
  <p style="margin:0;">
    <strong>Pick-up:</strong> ${escapeHtml(pickupDate)}<br>
    <strong>Return:</strong> ${escapeHtml(returnDate)}
  </p>
  <h3 style="margin:16px 0 6px;">Requested category</h3>
  <p style="margin:0;">${escapeHtml(categoryLabel)} <span style="color:#5b6b77;">(${escapeHtml(category)})</span></p>
  <p style="margin:20px 0 0; color:#5b6b77; font-size:12px;">Received: ${escapeHtml(timestamp)}</p>
</body></html>`;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: "New Car Rental Request — Meltemi Rentals",
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("[api/request] Resend error:", error);
      return NextResponse.json(
        { error: "Email delivery failed." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[api/request] Unexpected error:", err);
    return NextResponse.json(
      { error: "Email delivery failed." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

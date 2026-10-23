import { NextResponse } from "next/server";
import { z } from "zod";

const short = (max: number) => z.string().trim().max(max);
const schema = z
  .object({
    type: z.enum(["custom-piece", "ongoing-supply"]),
    name: short(120).min(2),
    businessName: short(160),
    email: z.string().trim().email().max(254),
    phone: short(32),
    location: short(160).min(2),
    species: short(160).min(2),
    dimensions: short(160),
    units: z.enum(["inches", "centimeters"]),
    orientation: z.enum(["not-sure", "wall", "tabletop", "upright", "floor"]),
    shape: short(240),
    quantity: short(120).min(1),
    timing: short(160),
    cadence: z.enum(["as-needed", "monthly", "quarterly", "other"]),
    exclusive: z.boolean(),
    details: short(1800),
    website: short(200),
  })
  .superRefine((value, context) => {
    if (value.type === "ongoing-supply" && value.businessName.length < 2)
      context.addIssue({
        code: "custom",
        path: ["businessName"],
        message: "Add your studio or business name.",
      });
  });
const recentSubmissions = new Map<string, number[]>();
const windowMs = 10 * 60 * 1000;

export async function POST(request: Request) {
  // Enforce the actual body size as well as Content-Length, which may be absent.
  if (Number(request.headers.get("content-length") || 0) > 12000)
    return NextResponse.json(
      { error: "The inquiry is too large." },
      { status: 413 },
    );
  const body = await request.text();
  if (new TextEncoder().encode(body).length > 12000)
    return NextResponse.json(
      { error: "The inquiry is too large." },
      { status: 413 },
    );
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: "Check the inquiry fields." },
      { status: 400 },
    );
  }
  const parsed = schema.safeParse(payload);
  if (!parsed.success)
    return NextResponse.json(
      {
        error:
          "Please check your contact, destination, display, and quantity details.",
      },
      { status: 400 },
    );
  const inquiry = parsed.data;
  if (inquiry.website)
    return NextResponse.json(
      { error: "Unable to send this inquiry." },
      { status: 400 },
    );
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  const destination = process.env.WHOLESALE_APPLICATION_ALERT_EMAIL;
  if (!apiKey || !sender || !destination)
    return NextResponse.json(
      {
        error:
          "Your inquiry has not been sent. The form is temporarily unavailable; please keep your details and try again later.",
      },
      { status: 503 },
    );
  const key =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const now = Date.now();
  for (const [ip, times] of recentSubmissions)
    if (times.every((time) => now - time >= windowMs))
      recentSubmissions.delete(ip);
  const recent = (recentSubmissions.get(key) || []).filter(
    (time) => now - time < windowMs,
  );
  if (recent.length >= 4)
    return NextResponse.json(
      { error: "Please wait a few minutes before sending another inquiry." },
      { status: 429 },
    );
  recentSubmissions.set(key, [...recent, now]);
  const kind =
    inquiry.type === "ongoing-supply"
      ? "Taxidermy studio supply"
      : "Custom taxidermy piece";
  const message = [
    kind,
    `Name: ${inquiry.name}`,
    `Business: ${inquiry.businessName || "Not provided"}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "Not provided"}`,
    `Destination: ${inquiry.location}`,
    `Species / display: ${inquiry.species}`,
    `Length × width × height / sizes: ${inquiry.dimensions || "Not provided"} (${inquiry.units})`,
    `Orientation: ${inquiry.orientation}`,
    `Shape: ${inquiry.shape || "Not provided"}`,
    `Quantity: ${inquiry.quantity}`,
    `Timing: ${inquiry.timing || "Not provided"}`,
    ...(inquiry.type === "ongoing-supply"
      ? [
          `Cadence: ${inquiry.cadence}`,
          `Exclusive supplier discussion: ${inquiry.exclusive ? "Interested" : "Not requested"}`,
        ]
      : []),
    `Lookout notes: ${inquiry.details || "None"}`,
  ].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [destination],
        reply_to: inquiry.email,
        subject: `${kind} — ${inquiry.businessName || inquiry.name}`,
        text: message,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok)
      return NextResponse.json(
        { error: "Your inquiry could not be sent. Please try again shortly." },
        { status: 503 },
      );
  } catch {
    return NextResponse.json(
      { error: "Your inquiry could not be sent. Please try again shortly." },
      { status: 503 },
    );
  }
  return NextResponse.json({ success: true });
}

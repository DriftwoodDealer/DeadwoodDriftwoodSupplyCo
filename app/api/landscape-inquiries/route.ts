import { NextResponse } from "next/server";
import { z } from "zod";

const recentSubmissions = new Map<string, number[]>();
const windowMs = 10 * 60 * 1000;
const submissionLimit = 4;

function isRateLimited(request: Request) {
  const key = request.headers.get("x-vercel-forwarded-for")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
  const now = Date.now();
  const recent = (recentSubmissions.get(key) || []).filter((timestamp) => now - timestamp < windowMs);
  if (recent.length >= submissionLimit) {
    recentSubmissions.set(key, recent);
    return true;
  }
  recent.push(now);
  recentSubmissions.set(key, recent);
  return false;
}

const inquirySchema = z.object({
  type: z.enum(["custom-piece", "ongoing-supply"]),
  name: z.string().trim().min(2).max(120),
  businessName: z.string().trim().max(160),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(32),
  location: z.string().trim().min(2).max(160),
  projectType: z.enum(["garden", "entry", "water-feature", "commercial", "other"]),
  dimensions: z.string().trim().max(160),
  addons: z.array(z.enum(["House number", "Longitude and latitude", "Company name"])).max(3),
  plaqueDetails: z.string().trim().max(300),
  cadence: z.enum(["as-needed", "monthly", "seasonal", "other"]),
  details: z.string().trim().max(1800),
  website: z.string().max(200),
}).superRefine((inquiry, context) => {
  if (inquiry.type === "ongoing-supply" && inquiry.businessName.length < 2) {
    context.addIssue({ code: "custom", path: ["businessName"], message: "Add your business name." });
  }
});

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 12_000) {
    return NextResponse.json({ error: "The inquiry is too large to submit." }, { status: 413 });
  }

  const parsed = inquirySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Check the inquiry fields." }, { status: 400 });
  }

  const inquiry = parsed.data;
  if (inquiry.website) return NextResponse.json({ success: true });
  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Please wait a few minutes before sending another inquiry." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  const destination = process.env.WHOLESALE_APPLICATION_ALERT_EMAIL;
  if (!apiKey || !sender || !destination) {
    return NextResponse.json({ error: "The inquiry form is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  const kindLabel = inquiry.type === "custom-piece" ? "Custom landscape piece" : "Ongoing landscape supply";
  const message = [
    `New ${kindLabel.toLowerCase()} inquiry`,
    "",
    `Name: ${inquiry.name}`,
    ...(inquiry.businessName ? [`Business: ${inquiry.businessName}`] : []),
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "Not provided"}`,
    `Project location: ${inquiry.location}`,
    ...(inquiry.type === "custom-piece" ? [
      `Project type: ${inquiry.projectType}`,
      `Approximate dimensions: ${inquiry.dimensions || "Not provided"}`,
      `Plaque options: ${inquiry.addons.join(", ") || "None selected"}`,
      `Plaque details: ${inquiry.plaqueDetails || "Not provided"}`,
    ] : [
      `Sourcing cadence: ${inquiry.cadence}`,
      `Typical size or quantity: ${inquiry.dimensions || "Not provided"}`,
    ]),
    "",
    `Additional details: ${inquiry.details || "None provided"}`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: [destination],
        reply_to: inquiry.email,
        subject: `${kindLabel} — ${inquiry.type === "ongoing-supply" ? inquiry.businessName : inquiry.name}`,
        text: message,
      }),
    });
    if (!response.ok) {
      console.error("Landscape inquiry email failed:", response.status);
      return NextResponse.json({ error: "We couldn’t send your inquiry right now. Please try again shortly." }, { status: 503 });
    }
  } catch (error) {
    console.error("Landscape inquiry email failed:", error);
    return NextResponse.json({ error: "We couldn’t send your inquiry right now. Please try again shortly." }, { status: 503 });
  }

  return NextResponse.json({ success: true });
}

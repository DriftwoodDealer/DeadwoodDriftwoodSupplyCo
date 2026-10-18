import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const recentSubmissions = new Map<string, number[]>();
const submissionWindowMs = 10 * 60 * 1000;
const submissionLimit = 3;

function isRateLimited(request: Request) {
  const clientId = request.headers.get("x-vercel-forwarded-for")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
  const now = Date.now();
  const recent = (recentSubmissions.get(clientId) || []).filter((timestamp) => now - timestamp < submissionWindowMs);
  if (recent.length >= submissionLimit) {
    recentSubmissions.set(clientId, recent);
    return true;
  }
  recent.push(now);
  recentSubmissions.set(clientId, recent);
  return false;
}

const applicationSchema = z.object({
  businessName: z.string().trim().min(2).max(160),
  contactName: z.string().trim().min(2).max(120),
  businessType: z.enum([
    "retail-shop",
    "reptile-aquarium",
    "builder-installer",
    "taxidermy-studio",
    "landscape-design",
    "other",
  ]),
  email: z.union([z.string().trim().email().max(254), z.literal("")]),
  phone: z.string().trim().max(32),
  preferredContact: z.enum(["email", "phone"]),
  location: z.string().trim().min(2).max(240),
  websites: z.array(z.string().url().max(2048)).max(10),
  socialProfiles: z.array(z.object({
    platform: z.enum(["instagram", "facebook", "tiktok", "linkedin", "other"]),
    url: z.string().url().max(2048),
  })).max(10),
  wholesaleInterest: z.string().trim().max(2000),
  honeypot: z.string().max(200),
  consent: z.literal(true),
}).superRefine((application, context) => {
  if (application.preferredContact === "email" && !application.email) {
    context.addIssue({ code: "custom", path: ["email"], message: "Add your email address so we can contact you." });
  }
  if (application.preferredContact === "phone" && !application.phone) {
    context.addIssue({ code: "custom", path: ["phone"], message: "Add your phone number so we can contact you." });
  }
});

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ error: "The application is too large to submit." }, { status: 413 });
  }

  const parsed = applicationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Check the application fields." }, { status: 400 });
  }

  const application = parsed.data;
  if (application.honeypot) {
    return NextResponse.json({ success: true });
  }
  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Please wait a few minutes before submitting another application." }, { status: 429 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Applications are temporarily unavailable. Please contact us directly." }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("wholesale_applications")
    .insert({
      business_name: application.businessName,
      contact_name: application.contactName,
      business_type: application.businessType,
      email: application.email || null,
      phone: application.phone || null,
      preferred_contact: application.preferredContact,
      business_location: application.location,
      websites: application.websites,
      social_profiles: application.socialProfiles,
      wholesale_interest: application.wholesaleInterest || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Could not save wholesale application:", error?.message || "No row returned");
    return NextResponse.json({ error: "We couldn’t save your application. Please try again shortly." }, { status: 503 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  const destination = process.env.WHOLESALE_APPLICATION_ALERT_EMAIL;
  if (resendKey && sender && destination) {
    const message = [
      `New trade application: ${application.businessName}`,
      `Contact: ${application.contactName}`,
      `Preferred contact: ${application.preferredContact}`,
      `Email: ${application.email || "Not provided"}`,
      `Phone: ${application.phone || "Not provided"}`,
      `Business type: ${application.businessType}`,
      `Location: ${application.location}`,
      `Websites: ${application.websites.join(", ") || "Not provided"}`,
      `Social profiles: ${application.socialProfiles.map(({ platform, url }) => `${platform}: ${url}`).join(", ") || "Not provided"}`,
      `Supply needs: ${application.wholesaleInterest || "Not provided"}`,
      `Review application: ${process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin}/admin/wholesale`,
    ].join("\n");

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: sender, to: [destination], subject: `New trade application — ${application.businessName}`, text: message }),
      });
      if (!response.ok) console.error("Wholesale application alert email failed:", response.status);
    } catch (notificationError) {
      console.error("Wholesale application alert email failed:", notificationError);
    }
  }

  return NextResponse.json({ success: true });
}

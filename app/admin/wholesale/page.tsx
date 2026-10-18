import { createClient } from "@/lib/supabase/server";
import { updateWholesaleApplication } from "./actions";

const statuses = [
  { value: "new", label: "New" },
  { value: "reviewing", label: "Reviewing" },
  { value: "approved", label: "Approved" },
  { value: "declined", label: "Declined" },
] as const;

const businessTypeLabels: Record<string, string> = {
  "retail-shop": "Retail shop or showroom",
  "reptile-aquarium": "Reptile, aquarium, or habitat professional",
  "builder-installer": "Builder or installer",
  "taxidermy-studio": "Taxidermy or art studio",
  "landscape-design": "Landscape or interior design",
  other: "Another established business",
};

export default async function WholesaleApplicationsPage() {
  const supabase = await createClient();
  const { data, error } = supabase
    ? await supabase
        .from("wholesale_applications")
        .select("id, business_name, contact_name, business_type, email, phone, preferred_contact, business_location, websites, social_profiles, wholesale_interest, review_status, created_at")
        .order("created_at", { ascending: false })
    : { data: null, error: { message: "Supabase is not configured." } };

  return (
    <section className="page-shell admin-shell-root wholesale-admin-page">
      <header className="wholesale-admin-heading">
        <div>
          <p className="eyebrow">Trade review</p>
          <h1 className="section-heading">Business applications</h1>
          <p className="section-copy">Review each business and decide whether to continue the conversation.</p>
        </div>
        <span className="wholesale-admin-count">{data?.length || 0} application{data?.length === 1 ? "" : "s"}</span>
      </header>

      {error ? (
        <div className="wholesale-admin-empty">
          <h2>Application storage isn’t ready yet.</h2>
          <p>Apply the wholesale applications migration in Supabase, then reload this page.</p>
        </div>
      ) : data?.length ? (
        <div className="wholesale-admin-list">
          {data.map((application) => (
            <article className="wholesale-admin-card" key={application.id}>
              <div className="wholesale-admin-card-head">
                <div>
                  <p className="eyebrow">{businessTypeLabels[application.business_type] || application.business_type}</p>
                  <h2>{application.business_name}</h2>
                  <p className="wholesale-admin-contact">{application.contact_name} · {new Date(application.created_at).toLocaleDateString()}</p>
                </div>
                <form action={updateWholesaleApplication} className="wholesale-status-form">
                  <input type="hidden" name="id" value={application.id} />
                  <label className="wholesale-sr-only" htmlFor={`status-${application.id}`}>Application review status</label>
                  <select id={`status-${application.id}`} name="status" defaultValue={application.review_status}>
                    {statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                  </select>
                  <button type="submit" className="button">Save status</button>
                </form>
              </div>
              <div className="wholesale-admin-details">
                <div><strong>Preferred contact</strong><span>{application.preferred_contact === "phone" ? application.phone || "Phone not provided" : application.email || "Email not provided"}</span></div>
                <div><strong>Business location</strong><span>{application.business_location}</span></div>
                {application.websites?.length > 0 && <div><strong>Websites</strong><span>{application.websites.map((url: string) => <a key={url} href={url} target="_blank" rel="noreferrer">{url}</a>)}</span></div>}
                {application.social_profiles?.length > 0 && <div><strong>Social profiles</strong><span>{application.social_profiles.map((profile: { platform: string; url: string }) => <a key={`${profile.platform}-${profile.url}`} href={profile.url} target="_blank" rel="noreferrer">{profile.platform}: {profile.url}</a>)}</span></div>}
                {application.wholesale_interest && <div className="wholesale-admin-interest"><strong>What they’re looking for</strong><p>{application.wholesale_interest}</p></div>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="wholesale-admin-empty">
          <h2>No applications yet.</h2>
          <p>New trade applications will appear here for review.</p>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { InfoCard, Callout, DataTable } from "@/components/handbook/UIComponents";
import { BarChart } from "@/components/handbook/Charts";

const techStackCosts = [
  { label: "Cloud (AWS/GCP)", value: 50 },
  { label: "Dev Tools", value: 15 },
  { label: "Analytics", value: 10 },
  { label: "Security", value: 12 },
  { label: "Support/CRM", value: 8 },
  { label: "Others", value: 5 },
];

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState<"tech" | "security" | "processes" | "vendors">("tech");

  return (
    <HandbookLayout currentSection="operations">
      <div className="space-y-10">
        <header>
          <h1 className="font-display text-4xl text-foreground">Operations & Infrastructure</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
            Building scalable infrastructure, security practices, and operational processes 
            for your B2B SaaS startup.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["tech", "security", "processes", "vendors"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "tech" ? "Tech Stack" : tab === "security" ? "Security" : tab === "processes" ? "Processes" : "Vendors"}
            </button>
          ))}
        </div>

        {activeTab === "tech" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Recommended Tech Stack (2025)</h2>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <InfoCard title="Frontend" icon="🖥️" variant="info">
                  <ul className="text-sm space-y-1">
                    <li><span className="font-medium">Framework:</span> Next.js / React</li>
                    <li><span className="font-medium">Styling:</span> Tailwind CSS</li>
                    <li><span className="font-medium">State:</span> Zustand / React Query</li>
                    <li><span className="font-medium">UI:</span> shadcn/ui / Radix</li>
                  </ul>
                </InfoCard>

                <InfoCard title="Backend" icon="⚙️" variant="info">
                  <ul className="text-sm space-y-1">
                    <li><span className="font-medium">Runtime:</span> Node.js / Python</li>
                    <li><span className="font-medium">Framework:</span> Express / FastAPI</li>
                    <li><span className="font-medium">API:</span> REST / GraphQL / tRPC</li>
                    <li><span className="font-medium">Auth:</span> NextAuth / Clerk / Auth0</li>
                  </ul>
                </InfoCard>

                <InfoCard title="Database" icon="🗄️" variant="info">
                  <ul className="text-sm space-y-1">
                    <li><span className="font-medium">Primary:</span> PostgreSQL (Supabase/Neon)</li>
                    <li><span className="font-medium">Cache:</span> Redis (Upstash)</li>
                    <li><span className="font-medium">Search:</span> Typesense / Algolia</li>
                    <li><span className="font-medium">ORM:</span> Prisma / Drizzle</li>
                  </ul>
                </InfoCard>

                <InfoCard title="Infrastructure" icon="☁️" variant="info">
                  <ul className="text-sm space-y-1">
                    <li><span className="font-medium">Hosting:</span> Vercel / AWS / GCP</li>
                    <li><span className="font-medium">CDN:</span> Cloudflare</li>
                    <li><span className="font-medium">Storage:</span> S3 / R2</li>
                    <li><span className="font-medium">Containers:</span> Docker / K8s</li>
                  </ul>
                </InfoCard>

                <InfoCard title="DevOps" icon="🔧" variant="info">
                  <ul className="text-sm space-y-1">
                    <li><span className="font-medium">CI/CD:</span> GitHub Actions</li>
                    <li><span className="font-medium">IaC:</span> Terraform / Pulumi</li>
                    <li><span className="font-medium">Monitoring:</span> Datadog / Grafana</li>
                    <li><span className="font-medium">Logging:</span> LogTail / Axiom</li>
                  </ul>
                </InfoCard>

                <InfoCard title="Analytics" icon="📊" variant="info">
                  <ul className="text-sm space-y-1">
                    <li><span className="font-medium">Product:</span> PostHog / Mixpanel</li>
                    <li><span className="font-medium">Error:</span> Sentry</li>
                    <li><span className="font-medium">Performance:</span> Vercel Analytics</li>
                    <li><span className="font-medium">BI:</span> Metabase / Looker</li>
                  </ul>
                </InfoCard>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Monthly Tech Costs by Stage</h2>
              <DataTable 
                headers={["Category", "Pre-Seed", "Seed", "Series A"]}
                rows={[
                  ["Cloud Infrastructure", "₹10-30K", "₹50K-2L", "₹2-10L"],
                  ["Dev Tools (GitHub, etc.)", "₹5-10K", "₹15-30K", "₹50K-1L"],
                  ["Monitoring & Analytics", "₹0-5K", "₹10-30K", "₹50K-1.5L"],
                  ["Security Tools", "₹0-5K", "₹10-20K", "₹30K-1L"],
                  ["Third-party APIs", "₹5-15K", "₹20-50K", "₹50K-2L"],
                  ["Total", "₹20-65K", "₹1-3.5L", "₹4-16L"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Tech Spend Distribution</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <BarChart data={techStackCosts} height={250} />
                <p className="text-sm text-muted-foreground mt-4">
                  Typical percentage breakdown for Series A SaaS company. 
                  Cloud costs dominate — optimize early.
                </p>
              </div>
            </section>

            <Callout type="tip" title="Startup Credits">
              Most cloud providers offer startup credits: AWS Activate ($100K), GCP for Startups ($100K), 
              Azure for Startups ($150K). Apply through accelerators or VCs for better deals.
            </Callout>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Security Fundamentals</h2>
              
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg mb-4">Security Checklist by Stage</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="font-medium text-foreground mb-2">Pre-Seed (Basics)</div>
                    <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><span>☐</span> HTTPS everywhere (SSL/TLS)</li>
                      <li className="flex gap-2"><span>☐</span> Password hashing (bcrypt/argon2)</li>
                      <li className="flex gap-2"><span>☐</span> Environment variables for secrets</li>
                      <li className="flex gap-2"><span>☐</span> 2FA for admin accounts</li>
                      <li className="flex gap-2"><span>☐</span> Basic input validation</li>
                      <li className="flex gap-2"><span>☐</span> SQL injection prevention</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-medium text-foreground mb-2">Seed (Growing)</div>
                    <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><span>☐</span> Role-based access control (RBAC)</li>
                      <li className="flex gap-2"><span>☐</span> Audit logging</li>
                      <li className="flex gap-2"><span>☐</span> Secret management (Vault/AWS Secrets)</li>
                      <li className="flex gap-2"><span>☐</span> Rate limiting</li>
                      <li className="flex gap-2"><span>☐</span> Dependency vulnerability scanning</li>
                      <li className="flex gap-2"><span>☐</span> Backup & recovery testing</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-medium text-foreground mb-2">Series A (Enterprise Ready)</div>
                    <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                      <li className="flex gap-2"><span>☐</span> SOC 2 Type II certification</li>
                      <li className="flex gap-2"><span>☐</span> Penetration testing (annual)</li>
                      <li className="flex gap-2"><span>☐</span> SSO/SAML support</li>
                      <li className="flex gap-2"><span>☐</span> Data encryption at rest</li>
                      <li className="flex gap-2"><span>☐</span> Incident response plan</li>
                      <li className="flex gap-2"><span>☐</span> Security training for employees</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">SOC 2 Compliance</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="SOC 2 Type I" icon="📋" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">What:</span> Point-in-time audit</li>
                    <li><span className="font-medium">Duration:</span> 2-3 months</li>
                    <li><span className="font-medium">Cost:</span> ₹8-15L</li>
                    <li><span className="font-medium">When:</span> First enterprise deal</li>
                  </ul>
                </InfoCard>
                <InfoCard title="SOC 2 Type II" icon="🔒" variant="success">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">What:</span> 6-12 month observation period</li>
                    <li><span className="font-medium">Duration:</span> 6-12 months</li>
                    <li><span className="font-medium">Cost:</span> ₹15-30L</li>
                    <li><span className="font-medium">When:</span> Series A / Enterprise focus</li>
                  </ul>
                </InfoCard>
              </div>

              <Callout type="tip" title="SOC 2 Automation Tools">
                Use Vanta, Drata, or Secureframe to automate SOC 2 compliance. 
                They reduce audit time by 50%+ and cost ₹5-15L/year.
              </Callout>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Enterprise Security Requirements</h2>
              <DataTable 
                headers={["Feature", "SMB", "Mid-Market", "Enterprise"]}
                rows={[
                  ["SSO (SAML/OIDC)", "Nice-to-have", "Required", "Required"],
                  ["SOC 2", "Not required", "Type I ok", "Type II required"],
                  ["Data Residency", "Not required", "Sometimes", "Often required"],
                  ["Audit Logs", "Basic", "Detailed", "Exportable"],
                  ["SLA", "Best effort", "99.9%", "99.99%+"],
                  ["Pen Test Report", "Not required", "Sometimes", "Required"],
                ]}
              />
            </section>
          </div>
        )}

        {activeTab === "processes" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Engineering Processes</h2>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Development Workflow</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• <span className="font-medium text-foreground">Branching:</span> Git Flow or Trunk-based</li>
                    <li>• <span className="font-medium text-foreground">PR Reviews:</span> 1-2 approvals required</li>
                    <li>• <span className="font-medium text-foreground">CI/CD:</span> Automated tests + deploy</li>
                    <li>• <span className="font-medium text-foreground">Environments:</span> Dev → Staging → Prod</li>
                    <li>• <span className="font-medium text-foreground">Feature Flags:</span> LaunchDarkly / Unleash</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Sprint Cadence</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• <span className="font-medium text-foreground">Sprint Length:</span> 1-2 weeks typical</li>
                    <li>• <span className="font-medium text-foreground">Planning:</span> Monday morning</li>
                    <li>• <span className="font-medium text-foreground">Standups:</span> Daily async or 15 min sync</li>
                    <li>• <span className="font-medium text-foreground">Retros:</span> End of sprint</li>
                    <li>• <span className="font-medium text-foreground">Demos:</span> Friday (stakeholders)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Incident Management</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">Incident Severity Levels</h3>
                <DataTable 
                  headers={["Severity", "Impact", "Response Time", "Example"]}
                  rows={[
                    ["P0 (Critical)", "Complete outage", "< 15 mins", "Production down, data loss"],
                    ["P1 (High)", "Major feature broken", "< 1 hour", "Payments failing, auth broken"],
                    ["P2 (Medium)", "Feature degraded", "< 4 hours", "Slow performance, minor bugs"],
                    ["P3 (Low)", "Minor issue", "< 24 hours", "UI glitch, edge case bug"],
                  ]}
                />
              </div>

              <div className="bg-card rounded-xl border border-border p-6 mt-4">
                <h3 className="font-semibold mb-3">Incident Response Checklist</h3>
                <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span>1.</span> Acknowledge and assign owner</li>
                  <li className="flex gap-2"><span>2.</span> Assess severity level</li>
                  <li className="flex gap-2"><span>3.</span> Communicate status (internal/external)</li>
                  <li className="flex gap-2"><span>4.</span> Mitigate/resolve the issue</li>
                  <li className="flex gap-2"><span>5.</span> Verify fix in production</li>
                  <li className="flex gap-2"><span>6.</span> Post-mortem within 48 hours</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Support Operations</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="Support Tiers" icon="🎧" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Tier 1:</span> Self-serve (docs, chatbot)</li>
                    <li><span className="font-medium">Tier 2:</span> Support agents (email, chat)</li>
                    <li><span className="font-medium">Tier 3:</span> Technical specialists</li>
                    <li><span className="font-medium">Tier 4:</span> Engineering escalation</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Key Metrics" icon="📈" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">FRT:</span> First Response Time (&lt; 4 hrs)</li>
                    <li><span className="font-medium">TTR:</span> Time to Resolution (&lt; 24 hrs)</li>
                    <li><span className="font-medium">CSAT:</span> Customer Satisfaction (&gt; 90%)</li>
                    <li><span className="font-medium">Deflection:</span> Self-serve rate (&gt; 60%)</li>
                  </ul>
                </InfoCard>
              </div>
            </section>
          </div>
        )}

        {activeTab === "vendors" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Essential SaaS Tools</h2>
              
              <DataTable 
                headers={["Category", "Tool Options", "Monthly Cost (Startup)"]}
                rows={[
                  ["CRM", "HubSpot, Pipedrive, Freshsales", "Free - ₹15K"],
                  ["Support", "Intercom, Freshdesk, Zendesk", "₹5K - ₹30K"],
                  ["Communication", "Slack, Discord, Teams", "Free - ₹10K"],
                  ["Project Management", "Linear, Jira, Notion", "Free - ₹20K"],
                  ["Docs", "Notion, Confluence, Slite", "Free - ₹10K"],
                  ["HR/Payroll", "Razorpay Payroll, Keka, Zoho People", "₹3K - ₹15K"],
                  ["Accounting", "Zoho Books, QuickBooks", "₹1K - ₹5K"],
                  ["Email", "Resend, Sendgrid, Postmark", "Free - ₹10K"],
                  ["Analytics", "Mixpanel, Amplitude, PostHog", "Free - ₹30K"],
                  ["Error Tracking", "Sentry, BugSnag", "Free - ₹15K"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">India-Specific Vendors</h2>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Payments</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Razorpay (most popular)</li>
                    <li>• Cashfree</li>
                    <li>• PayU</li>
                    <li>• Stripe (for international)</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Banking</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Razorpay X (business banking)</li>
                    <li>• Open (neobank)</li>
                    <li>• Jupiter Business</li>
                    <li>• HDFC Current Account</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Compliance</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• ClearTax (GST, ITR)</li>
                    <li>• Razorpay Payroll</li>
                    <li>• Zoho Payroll</li>
                    <li>• LegalKart (legal docs)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Vendor Evaluation Criteria</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Must Evaluate</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>☐ Pricing model and scalability</li>
                      <li>☐ Integration capabilities (APIs)</li>
                      <li>☐ Data export options</li>
                      <li>☐ Support quality and response time</li>
                      <li>☐ Security certifications</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Red Flags</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>❌ Long-term contracts required</li>
                      <li>❌ No data export functionality</li>
                      <li>❌ Hidden fees or usage limits</li>
                      <li>❌ Poor documentation</li>
                      <li>❌ No startup discounts</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Callout type="tip" title="Negotiate Everything">
                Most B2B SaaS vendors offer 30-50% startup discounts. Always ask for annual billing discounts, 
                extended trials, and startup programs. The worst they can say is no.
              </Callout>
            </section>

            <section className="bg-primary/5 rounded-xl border border-primary/20 p-6">
              <h2 className="font-display text-xl text-foreground mb-4">Recommended Stack for Pre-Seed</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Start with free tiers and upgrade as you grow. Monthly cost: ₹0-20K
              </p>
              <div className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium text-foreground">Hosting:</span> Vercel/Railway (free tier)
                </div>
                <div>
                  <span className="font-medium text-foreground">Database:</span> Supabase/Neon (free tier)
                </div>
                <div>
                  <span className="font-medium text-foreground">Auth:</span> NextAuth/Supabase Auth (free)
                </div>
                <div>
                  <span className="font-medium text-foreground">Email:</span> Resend (free tier)
                </div>
                <div>
                  <span className="font-medium text-foreground">Analytics:</span> PostHog (free tier)
                </div>
                <div>
                  <span className="font-medium text-foreground">CRM:</span> HubSpot (free tier)
                </div>
                <div>
                  <span className="font-medium text-foreground">Support:</span> Crisp (free tier)
                </div>
                <div>
                  <span className="font-medium text-foreground">Docs:</span> Notion (free for startups)
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </HandbookLayout>
  );
}

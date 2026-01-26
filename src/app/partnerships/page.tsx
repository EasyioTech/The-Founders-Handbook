"use client";

import { useState } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { InfoCard, Callout, DataTable, StageCard, FormulaBox } from "@/components/handbook/UIComponents";
import { FunnelChart, PieChart } from "@/components/handbook/Charts";

const partnershipTypes = [
  { label: "Technology", value: 30 },
  { label: "Channel/Reseller", value: 25 },
  { label: "Integration", value: 20 },
  { label: "Strategic", value: 15 },
  { label: "Co-Marketing", value: 10 },
];

const partnerFunnel = [
  { label: "Identified", value: 100 },
  { label: "Contacted", value: 60 },
  { label: "Meeting", value: 30 },
  { label: "Negotiating", value: 15 },
  { label: "Signed", value: 8 },
];

export default function PartnershipsPage() {
  const [activeTab, setActiveTab] = useState<"strategy" | "types" | "process" | "management">("strategy");

  return (
    <HandbookLayout currentSection="partnerships">
      <div className="space-y-10">
        <header>
          <h1 className="font-display text-4xl text-foreground">BD & Partnerships</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
            Building strategic partnerships, channel programs, and business development
            motions that accelerate growth and expand market reach.
          </p>
        </header>

        <Callout type="important" title="Partnerships = Leverage">
          The right partnerships can 10x your distribution without 10x-ing your team.
          But bad partnerships consume resources and distract from core business.
          Be selective — say no to most, commit fully to few.
        </Callout>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["strategy", "types", "process", "management"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "strategy" ? "BD Strategy" : tab === "types" ? "Partnership Types" : tab === "process" ? "Deal Process" : "Partner Management"}
            </button>
          ))}
        </div>

        {activeTab === "strategy" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">When to Invest in BD</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="Right Time for BD" icon="✓" variant="success">
                  <ul className="text-sm space-y-2">
                    <li>• Product-market fit achieved</li>
                    <li>• Clear value prop for partners</li>
                    <li>• Resources to support partners</li>
                    <li>• Repeatable sales motion exists</li>
                    <li>• Market timing is right</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Too Early If..." icon="⚠" variant="warning">
                  <ul className="text-sm space-y-2">
                    <li>• Still iterating on product</li>
                    <li>• No proven sales playbook</li>
                    <li>• Can&apos;t measure partner value</li>
                    <li>• No bandwidth to support</li>
                    <li>• Chasing vanity logos</li>
                  </ul>
                </InfoCard>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">BD Resource Allocation by Stage</h2>
              <DataTable 
                headers={["Stage", "BD Focus", "Team Size", "% of GTM Effort"]}
                rows={[
                  ["Pre-PMF", "No formal BD. Focus on product.", "0", "0%"],
                  ["Post-PMF", "1-2 strategic partnerships", "0-1 (founder-led)", "5-10%"],
                  ["Series A", "Channel pilots, key integrations", "1-2", "10-15%"],
                  ["Series B", "Scale channel, ecosystem play", "3-5", "15-25%"],
                  ["Series C+", "Platform strategy, global partners", "5-10+", "20-30%"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Partnership Mix (Typical B2B SaaS)</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-card rounded-xl border border-border p-6">
                  <PieChart data={partnershipTypes} />
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-4">Revenue Attribution</h3>
                  <ul className="text-sm text-muted-foreground space-y-3">
                    <li><span className="font-medium text-foreground">Mature SaaS:</span> 20-40% of revenue through partners</li>
                    <li><span className="font-medium text-foreground">Early Stage:</span> Focus on 1-2 types first</li>
                    <li><span className="font-medium text-foreground">Best Practice:</span> Don&apos;t spread thin across all types</li>
                    <li><span className="font-medium text-foreground">India:</span> SI/Reseller partnerships often dominant</li>
                  </ul>
                </div>
              </div>
            </section>

            <FormulaBox
              title="Partner ROI Calculation"
              formula="Partner ROI = (Revenue from Partner - Partner Costs) ÷ Partner Costs × 100"
              example="₹50L revenue, ₹15L costs = (50-15)/15 × 100 = 233% ROI"
            />
          </div>
        )}

        {activeTab === "types" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Partnership Categories</h2>
              
              <StageCard number={1} title="Technology Partnerships" subtitle="Joint product capabilities">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">What It Is</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Native integrations</li>
                      <li>• API partnerships</li>
                      <li>• OEM/white-label deals</li>
                      <li>• Platform ecosystem membership</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Examples</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Salesforce AppExchange listing</li>
                      <li>• Slack app marketplace</li>
                      <li>• AWS/Azure/GCP partner</li>
                      <li>• Zoho/Freshworks integrations</li>
                    </ul>
                  </div>
                </div>
              </StageCard>

              <StageCard number={2} title="Channel/Reseller Partnerships" subtitle="Distribution & sales">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">What It Is</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Value-added resellers (VARs)</li>
                      <li>• System integrators (SIs)</li>
                      <li>• Managed service providers</li>
                      <li>• Distributors</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">India-Specific</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• TCS, Infosys, Wipro as SI partners</li>
                      <li>• Regional IT distributors</li>
                      <li>• Industry-specific consultants</li>
                      <li>• CA/CS firms for finance tools</li>
                    </ul>
                  </div>
                </div>
              </StageCard>

              <StageCard number={3} title="Strategic/Alliance Partnerships" subtitle="Market expansion">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">What It Is</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Go-to-market alliances</li>
                      <li>• Co-selling agreements</li>
                      <li>• Joint ventures</li>
                      <li>• Exclusive territory deals</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">When to Pursue</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Entering new geography</li>
                      <li>• Adjacent market expansion</li>
                      <li>• Competing with giants</li>
                      <li>• Bundling complementary products</li>
                    </ul>
                  </div>
                </div>
              </StageCard>

              <StageCard number={4} title="Co-Marketing Partnerships" subtitle="Shared audience growth">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Activities</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Joint webinars & events</li>
                      <li>• Co-branded content</li>
                      <li>• Mutual promotion</li>
                      <li>• Shared case studies</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Best For</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Same ICP, different products</li>
                      <li>• Complementary solutions</li>
                      <li>• Brand building stage</li>
                      <li>• Content marketing leverage</li>
                    </ul>
                  </div>
                </div>
              </StageCard>
            </section>
          </div>
        )}

        {activeTab === "process" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Partnership Funnel</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <FunnelChart stages={partnerFunnel} />
                <p className="text-sm text-muted-foreground mt-4">
                  Typical conversion rates for outbound partner development. Inbound/referral 
                  partnerships convert 2-3x better at each stage.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Deal Process Stages</h2>
              <DataTable 
                headers={["Stage", "Activities", "Duration", "Key Outputs"]}
                rows={[
                  ["Discovery", "Research, identify stakeholders, initial outreach", "1-2 weeks", "Partner brief, contact map"],
                  ["Qualification", "Discovery call, fit assessment, opportunity sizing", "2-4 weeks", "Partnership scorecard"],
                  ["Solution Design", "Technical review, joint value prop, pilot scope", "2-6 weeks", "Solution architecture, pilot plan"],
                  ["Negotiation", "Terms discussion, legal review, commercial model", "4-8 weeks", "Term sheet, draft agreement"],
                  ["Contracting", "Legal redlines, approvals, signature", "2-6 weeks", "Signed partnership agreement"],
                  ["Onboarding", "Training, enablement, launch planning", "2-4 weeks", "Partner certified, GTM ready"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Partnership Agreement Essentials</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-3">Commercial Terms</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li><span className="font-medium text-foreground">Revenue Share:</span> 10-30% for referral, 20-40% for reseller</li>
                      <li><span className="font-medium text-foreground">Minimums:</span> Quarterly/annual commitments</li>
                      <li><span className="font-medium text-foreground">Exclusivity:</span> Territory, segment, or time-limited</li>
                      <li><span className="font-medium text-foreground">MDF:</span> Marketing development funds for joint activities</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-3">Operational Terms</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li><span className="font-medium text-foreground">Lead Registration:</span> Process and protection period</li>
                      <li><span className="font-medium text-foreground">Support:</span> Tier 1/2/3 responsibility split</li>
                      <li><span className="font-medium text-foreground">Training:</span> Certification requirements</li>
                      <li><span className="font-medium text-foreground">Reporting:</span> Metrics, frequency, format</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <Callout type="tip" title="Start Small, Scale Fast">
              Don&apos;t sign big exclusive deals upfront. Start with a pilot — 
              3-6 months, limited scope, clear success metrics. Only expand 
              when both sides have proven value. It&apos;s easier to give more 
              than to take back.
            </Callout>
          </div>
        )}

        {activeTab === "management" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Partner Tiering</h2>
              <DataTable 
                headers={["Tier", "Criteria", "Benefits", "Your Investment"]}
                rows={[
                  ["Platinum", "₹1Cr+ ARR, certified team, co-sell", "Highest margins, MDF, exec sponsor", "Dedicated PAM, quarterly reviews"],
                  ["Gold", "₹25-100L ARR, 2+ certified, active pipeline", "Better margins, co-marketing, leads", "Monthly calls, training access"],
                  ["Silver", "₹5-25L ARR, 1 certified, growing", "Standard margins, portal access", "Quarterly check-ins, self-serve"],
                  ["Registered", "New partner, in onboarding", "Base margins, basic support", "Onboarding program only"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Partner Success Metrics</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Revenue Metrics</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Partner-sourced ARR</li>
                    <li>• Partner-influenced ARR</li>
                    <li>• Average deal size</li>
                    <li>• Revenue per partner</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Pipeline Metrics</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Leads registered</li>
                    <li>• Pipeline value</li>
                    <li>• Win rate vs direct</li>
                    <li>• Sales cycle length</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Health Metrics</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Active partners (%)</li>
                    <li>• Certifications completed</li>
                    <li>• Partner NPS</li>
                    <li>• Customer retention via partner</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Partner Enablement Program</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-3">Training & Certification</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Product training (self-paced + live)</li>
                      <li>• Sales certification program</li>
                      <li>• Technical certification</li>
                      <li>• Regular product update sessions</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-3">Sales Enablement</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Co-branded collateral</li>
                      <li>• Demo environments</li>
                      <li>• Competitive battlecards</li>
                      <li>• Pricing & proposal tools</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Partner Communication Cadence</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="All Partners" icon="📢" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Monthly:</span> Newsletter, product updates</li>
                    <li><span className="font-medium">Quarterly:</span> Partner webinar, roadmap preview</li>
                    <li><span className="font-medium">Annually:</span> Partner summit, awards</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Strategic Partners" icon="🤝" variant="success">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Weekly:</span> Pipeline review, deal support</li>
                    <li><span className="font-medium">Monthly:</span> Business review, planning</li>
                    <li><span className="font-medium">Quarterly:</span> Executive alignment, strategy</li>
                  </ul>
                </InfoCard>
              </div>
            </section>

            <Callout type="warning" title="Partner Portal is Non-Negotiable">
              Once you have 5+ active partners, invest in a partner portal.
              Self-service deal registration, training, collateral, and reporting
              saves your team 10+ hours/week and improves partner experience dramatically.
            </Callout>
          </div>
        )}
      </div>
    </HandbookLayout>
  );
}

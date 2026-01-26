"use client";

import { useState } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { InfoCard, StageCard, Callout, DataTable, FormulaBox } from "@/components/handbook/UIComponents";
import { BarChart, FunnelChart } from "@/components/handbook/Charts";

const channelEffectiveness = [
  { label: "Content Marketing", value: 85 },
  { label: "LinkedIn Outbound", value: 78 },
  { label: "Referrals", value: 92 },
  { label: "Paid Ads", value: 45 },
  { label: "Events/Webinars", value: 70 },
  { label: "Cold Email", value: 35 },
];

const salesFunnel = [
  { label: "Website Visitors", value: 10000 },
  { label: "Leads (MQLs)", value: 500 },
  { label: "SQLs", value: 150 },
  { label: "Demos Booked", value: 75 },
  { label: "Proposals Sent", value: 40 },
  { label: "Closed Won", value: 20 },
];

export default function GTMPage() {
  const [selectedMotion, setSelectedMotion] = useState<"plg" | "sales" | "hybrid">("hybrid");

  return (
    <HandbookLayout currentSection="gtm">
      <div className="space-y-10">
        <header>
          <h1 className="font-display text-4xl text-foreground">Go-to-Market Strategy</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
            Building repeatable, scalable customer acquisition for Indian B2B SaaS — 
            from your first 10 customers to 1000+.
          </p>
        </header>

        <Callout type="important" title="India GTM Reality Check">
          Indian B2B SaaS companies often start with US/global markets (70%+ revenue) while 
          keeping engineering in India. Your GTM strategy must account for timezone differences, 
          payment preferences, and enterprise buying cycles that can be 6-12 months.
        </Callout>

        <section>
          <h2 className="font-display text-2xl text-foreground mb-6">Choose Your GTM Motion</h2>
          
          <div className="flex gap-2 mb-6">
            {(["plg", "sales", "hybrid"] as const).map((motion) => (
              <button
                key={motion}
                onClick={() => setSelectedMotion(motion)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedMotion === motion 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {motion === "plg" ? "Product-Led Growth" : motion === "sales" ? "Sales-Led" : "Hybrid"}
              </button>
            ))}
          </div>

          {selectedMotion === "plg" && (
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h3 className="font-semibold text-lg">Product-Led Growth (PLG)</h3>
              <p className="text-muted-foreground">
                Users discover, try, and buy your product with minimal sales involvement.
                Best for: ACV &lt; ₹5L ($6K), horizontal tools, self-serve capable products.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="font-medium text-foreground mb-2">Key Metrics</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Signup-to-activation rate: 20-40%</li>
                    <li>• Free-to-paid conversion: 3-8%</li>
                    <li>• Time-to-value: &lt; 5 minutes</li>
                    <li>• Viral coefficient: &gt; 0.5</li>
                  </ul>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="font-medium text-foreground mb-2">Indian Examples</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Zoho (freemium + upsell)</li>
                    <li>• Freshworks (free tier)</li>
                    <li>• Chargebee (developer-first)</li>
                    <li>• Postman (viral product)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedMotion === "sales" && (
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h3 className="font-semibold text-lg">Sales-Led Growth</h3>
              <p className="text-muted-foreground">
                High-touch sales process with demos, POCs, and enterprise negotiations.
                Best for: ACV &gt; ₹20L ($25K), complex products, regulated industries.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="font-medium text-foreground mb-2">Key Metrics</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• SQL-to-close rate: 15-25%</li>
                    <li>• Sales cycle: 3-9 months</li>
                    <li>• CAC payback: 12-18 months</li>
                    <li>• AE quota: ₹1-2 Cr ARR</li>
                  </ul>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="font-medium text-foreground mb-2">Indian Examples</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Druva (enterprise security)</li>
                    <li>• Icertis (contract management)</li>
                    <li>• MindTickle (sales enablement)</li>
                    <li>• Whatfix (digital adoption)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedMotion === "hybrid" && (
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h3 className="font-semibold text-lg">Hybrid Motion (Recommended for Most)</h3>
              <p className="text-muted-foreground">
                Combines PLG for SMB acquisition with sales-assist for enterprise upsells.
                Best for: Multi-segment targeting, ACV ₹5L-25L, scalable teams.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="font-medium text-foreground mb-2">PLG → Sales Triggers</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• User hits usage limits</li>
                    <li>• Enterprise domain signup</li>
                    <li>• Team size &gt; 5 users</li>
                    <li>• Feature upgrade requests</li>
                  </ul>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="font-medium text-foreground mb-2">Team Structure</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Growth/PLG team: Activation</li>
                    <li>• SDRs: Qualify PQLs</li>
                    <li>• AEs: Enterprise deals</li>
                    <li>• CSMs: Expansion revenue</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display text-2xl text-foreground mb-6">Channel Effectiveness for B2B SaaS</h2>
          <div className="bg-card rounded-xl border border-border p-6">
            <BarChart data={channelEffectiveness} height={280} />
            <p className="text-sm text-muted-foreground mt-4">
              Effectiveness score based on 2024-25 Indian B2B SaaS benchmarks. 
              Referrals consistently outperform, but aren&apos;t scalable alone.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl text-foreground mb-6">The B2B SaaS Sales Funnel</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4">Typical Conversion Funnel</h3>
              <FunnelChart stages={salesFunnel} />
            </div>
            <div className="space-y-4">
              <FormulaBox 
                title="Conversion Rate Formula"
                formula="Conversion Rate = (Next Stage ÷ Current Stage) × 100"
                example="500 MQLs → 150 SQLs = 30% MQL-to-SQL conversion"
              />
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="font-medium text-foreground mb-2">2025 Benchmark Rates</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Visitor → MQL: 3-5%</li>
                  <li>• MQL → SQL: 25-35%</li>
                  <li>• SQL → Opportunity: 40-60%</li>
                  <li>• Opportunity → Close: 20-30%</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl text-foreground mb-6">GTM Playbook by Stage</h2>
          
          <StageCard number={1} title="Pre-Seed: Founder-Led Sales" subtitle="0-10 customers">
            <ul className="space-y-2 text-sm">
              <li>• <span className="font-medium text-foreground">Primary channel:</span> Your network, warm intros, LinkedIn DMs</li>
              <li>• <span className="font-medium text-foreground">Goal:</span> 10 design partners who&apos;ll give honest feedback</li>
              <li>• <span className="font-medium text-foreground">Pricing:</span> Heavily discounted or free in exchange for case studies</li>
              <li>• <span className="font-medium text-foreground">Time investment:</span> 50%+ of founder time on sales</li>
            </ul>
          </StageCard>

          <StageCard number={2} title="Seed: Repeatable Process" subtitle="10-50 customers">
            <ul className="space-y-2 text-sm">
              <li>• <span className="font-medium text-foreground">Build:</span> Basic CRM, email sequences, demo script</li>
              <li>• <span className="font-medium text-foreground">Hire:</span> First SDR or sales hire (consider offshore for US market)</li>
              <li>• <span className="font-medium text-foreground">Content:</span> Case studies, product docs, comparison pages</li>
              <li>• <span className="font-medium text-foreground">Target:</span> ₹50L-1Cr ARR with clear unit economics</li>
            </ul>
          </StageCard>

          <StageCard number={3} title="Series A: Scaling Machine" subtitle="50-200 customers">
            <ul className="space-y-2 text-sm">
              <li>• <span className="font-medium text-foreground">Team:</span> SDR team, 2-3 AEs, sales ops, demand gen</li>
              <li>• <span className="font-medium text-foreground">Channels:</span> Multi-channel: content + paid + events + outbound</li>
              <li>• <span className="font-medium text-foreground">Tech stack:</span> Full-fledged CRM, marketing automation, BI</li>
              <li>• <span className="font-medium text-foreground">Target:</span> ₹5-10 Cr ARR, path to ₹50 Cr</li>
            </ul>
          </StageCard>
        </section>

        <section>
          <h2 className="font-display text-2xl text-foreground mb-6">Pricing Strategy</h2>
          
          <DataTable 
            headers={["Model", "Best For", "Pros", "Cons"]}
            rows={[
              ["Per Seat", "Collaboration tools, CRMs", "Predictable, easy to understand", "Seat-sharing, slow expansion"],
              ["Usage-Based", "APIs, infrastructure, data tools", "Aligns with value, low entry barrier", "Unpredictable revenue, complex billing"],
              ["Tiered (Good/Better/Best)", "Most B2B SaaS", "Clear upgrade path, anchoring", "Feature overlap confusion"],
              ["Flat Rate", "Simple tools, early stage", "Simple, predictable", "Leaves money on table"],
              ["Hybrid (Base + Usage)", "Enterprise SaaS", "Best of both, high expansion", "Complex to implement"],
            ]}
          />

          <Callout type="tip" title="India-Specific Pricing Insight">
            For Indian customers, consider 60-70% discount from US pricing. For US market from India, 
            you can often price at parity with US competitors — your cost advantage is in operations, not pricing.
          </Callout>
        </section>

        <section>
          <h2 className="font-display text-2xl text-foreground mb-6">Key GTM Metrics to Track</h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard title="Pipeline Metrics" icon="📊">
              <ul className="text-sm space-y-1">
                <li>• Pipeline coverage (3-4x target)</li>
                <li>• Pipeline velocity</li>
                <li>• Stage conversion rates</li>
                <li>• Average deal size</li>
              </ul>
            </InfoCard>

            <InfoCard title="Efficiency Metrics" icon="⚡">
              <ul className="text-sm space-y-1">
                <li>• CAC by channel</li>
                <li>• CAC payback period</li>
                <li>• Magic number (ARR/Sales spend)</li>
                <li>• Sales cycle length</li>
              </ul>
            </InfoCard>

            <InfoCard title="Growth Metrics" icon="📈">
              <ul className="text-sm space-y-1">
                <li>• MRR/ARR growth rate</li>
                <li>• Net revenue retention</li>
                <li>• Expansion revenue %</li>
                <li>• Logo churn rate</li>
              </ul>
            </InfoCard>
          </div>

          <FormulaBox 
            title="Magic Number"
            formula="Magic Number = (Current Qtr ARR - Previous Qtr ARR) × 4 ÷ Previous Qtr S&M Spend"
            example="₹1Cr ARR growth, ₹80L S&M spend = 1.25 Magic Number (Good! >1 is healthy)"
          />
        </section>

        <section className="bg-primary/5 rounded-xl border border-primary/20 p-6">
          <h2 className="font-display text-xl text-foreground mb-4">GTM Checklist</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="font-medium text-foreground mb-2">Foundation</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>☐ ICP (Ideal Customer Profile) defined</li>
                <li>☐ Value proposition documented</li>
                <li>☐ Competitive positioning clear</li>
                <li>☐ Pricing model validated</li>
              </ul>
            </div>
            <div>
              <div className="font-medium text-foreground mb-2">Execution</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>☐ CRM set up and being used</li>
                <li>☐ Sales playbook documented</li>
                <li>☐ Demo flow optimized</li>
                <li>☐ Content engine running</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </HandbookLayout>
  );
}

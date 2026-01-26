"use client";

import { useState, useMemo } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { InfoCard, Callout, DataTable, StageCard, FormulaBox } from "@/components/handbook/UIComponents";
import { LineChart, BarChart } from "@/components/handbook/Charts";

export default function GrowthScalePage() {
  const [activeTab, setActiveTab] = useState<"growth" | "scale" | "international" | "design">("growth");
  const [targetARR, setTargetARR] = useState(10);
  const [currentARR, setCurrentARR] = useState(1);
  const [yearsToTarget, setYearsToTarget] = useState(3);

  const growthProjection = useMemo(() => {
    const requiredCAGR = Math.pow(targetARR / currentARR, 1 / yearsToTarget) - 1;
    const data: { x: string; y: number }[] = [];
    for (let i = 0; i <= yearsToTarget; i++) {
      data.push({
        x: `Year ${i}`,
        y: currentARR * Math.pow(1 + requiredCAGR, i) * 10000000,
      });
    }
    return { data, cagr: requiredCAGR * 100 };
  }, [targetARR, currentARR, yearsToTarget]);

  return (
    <HandbookLayout currentSection="growth-scale">
      <div className="space-y-10">
        <header>
          <h1 className="font-display text-4xl text-foreground">Growth & Scale</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
            Frameworks for sustainable growth, scaling operations, international expansion,
            and building design systems that last.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["growth", "scale", "international", "design"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "growth" ? "Growth Frameworks" : tab === "scale" ? "Scaling Operations" : tab === "international" ? "International" : "Design Systems"}
            </button>
          ))}
        </div>

        {activeTab === "growth" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">T2D3 Growth Framework</h2>
              <div className="bg-card rounded-xl border border-border p-6 mb-6">
                <p className="text-muted-foreground mb-4">
                  <span className="font-semibold text-foreground">T2D3</span> = Triple, Triple, Double, Double, Double.
                  The gold standard for SaaS growth from $1M to $100M+ ARR.
                </p>
                <DataTable 
                  headers={["Year", "Growth Rate", "ARR Target", "From ₹1Cr"]}
                  rows={[
                    ["Year 1", "3x (Triple)", "₹3Cr", "₹1Cr → ₹3Cr"],
                    ["Year 2", "3x (Triple)", "₹9Cr", "₹3Cr → ₹9Cr"],
                    ["Year 3", "2x (Double)", "₹18Cr", "₹9Cr → ₹18Cr"],
                    ["Year 4", "2x (Double)", "₹36Cr", "₹18Cr → ₹36Cr"],
                    ["Year 5", "2x (Double)", "₹72Cr", "₹36Cr → ₹72Cr"],
                  ]}
                />
              </div>

              <Callout type="info" title="Reality Check">
                Less than 5% of SaaS companies achieve T2D3. It&apos;s aspirational, not 
                expected. Consistent 50-100% YoY growth is excellent. Don&apos;t sacrifice 
                unit economics for unsustainable growth.
              </Callout>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Growth Calculator</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="grid gap-6 sm:grid-cols-3 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Current ARR (₹Cr): {currentARR}
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="20"
                      step="0.5"
                      value={currentARR}
                      onChange={(e) => setCurrentARR(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Target ARR (₹Cr): {targetARR}
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={targetARR}
                      onChange={(e) => setTargetARR(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Years: {yearsToTarget}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={yearsToTarget}
                      onChange={(e) => setYearsToTarget(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Required CAGR</div>
                    <div className="text-3xl font-bold text-primary">{growthProjection.cagr.toFixed(0)}%</div>
                    <div className="text-sm text-muted-foreground">per year</div>
                  </div>
                </div>
                <LineChart data={growthProjection.data} height={200} />
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Growth Levers</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="Acquisition Levers" icon="📈" variant="success">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Inbound:</span> Content, SEO, product-led</li>
                    <li><span className="font-medium">Outbound:</span> SDR/BDR, ABM, events</li>
                    <li><span className="font-medium">Partnerships:</span> Channel, referrals</li>
                    <li><span className="font-medium">Paid:</span> Ads, sponsorships</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Expansion Levers" icon="💰" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Upsell:</span> Higher tiers, more seats</li>
                    <li><span className="font-medium">Cross-sell:</span> Additional products</li>
                    <li><span className="font-medium">Price increases:</span> Annual adjustments</li>
                    <li><span className="font-medium">Usage-based:</span> Growth with customer</li>
                  </ul>
                </InfoCard>
              </div>
            </section>

            <FormulaBox
              title="Rule of 40"
              formula="Rule of 40 = Growth Rate (%) + Profit Margin (%)"
              example="60% growth + (-20%) margin = 40 ✓ | 30% growth + 10% margin = 40 ✓"
            />
          </div>
        )}

        {activeTab === "scale" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Scaling Challenges by Stage</h2>
              
              <StageCard number={1} title="10 → 50 people" subtitle="First real scaling">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Challenges</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Communication breaks down</li>
                      <li>• Tribal knowledge gets lost</li>
                      <li>• First managers needed</li>
                      <li>• Process seems like bureaucracy</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Solutions</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Document everything in wiki</li>
                      <li>• Weekly all-hands ritual</li>
                      <li>• First layer of management</li>
                      <li>• Light-touch processes</li>
                    </ul>
                  </div>
                </div>
              </StageCard>

              <StageCard number={2} title="50 → 150 people" subtitle="Dunbar's number">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Challenges</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Can&apos;t know everyone</li>
                      <li>• Silos form between teams</li>
                      <li>• Culture dilutes</li>
                      <li>• Coordination overhead grows</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Solutions</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Strong middle management</li>
                      <li>• Cross-functional pods</li>
                      <li>• Culture documentation</li>
                      <li>• OKRs for alignment</li>
                    </ul>
                  </div>
                </div>
              </StageCard>

              <StageCard number={3} title="150 → 500 people" subtitle="Enterprise complexity">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Challenges</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Politics and bureaucracy</li>
                      <li>• Innovation slows down</li>
                      <li>• A-players may leave</li>
                      <li>• Technical debt compounds</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Solutions</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Business units/squads</li>
                      <li>• Innovation labs</li>
                      <li>• Executive coaching</li>
                      <li>• Platform team investment</li>
                    </ul>
                  </div>
                </div>
              </StageCard>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Operational Scalability Checklist</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Engineering</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>□ CI/CD pipeline automated</li>
                    <li>□ Infrastructure as code</li>
                    <li>□ Monitoring & alerting</li>
                    <li>□ On-call rotation</li>
                    <li>□ Tech debt management</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Sales</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>□ CRM fully adopted</li>
                    <li>□ Sales playbook documented</li>
                    <li>□ Quota & territory design</li>
                    <li>□ Deal desk process</li>
                    <li>□ Sales enablement tools</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Customer Success</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>□ Onboarding playbook</li>
                    <li>□ Health scoring</li>
                    <li>□ Renewal process</li>
                    <li>□ Support ticketing</li>
                    <li>□ Self-service resources</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Finance</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>□ Monthly close &lt;10 days</li>
                    <li>□ Revenue recognition</li>
                    <li>□ Expense management</li>
                    <li>□ Board reporting</li>
                    <li>□ Audit-ready books</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">People</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>□ HRIS implemented</li>
                    <li>□ Performance reviews</li>
                    <li>□ Compensation bands</li>
                    <li>□ Learning & development</li>
                    <li>□ Employee engagement</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Legal/Compliance</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>□ Contract templates</li>
                    <li>□ Data privacy (GDPR/DPDP)</li>
                    <li>□ IP protection</li>
                    <li>□ Regulatory compliance</li>
                    <li>□ Insurance coverage</li>
                  </ul>
                </div>
              </div>
            </section>

            <Callout type="tip" title="Scale What's Working, Fix What's Broken">
              Don&apos;t scale processes that are already struggling. If something barely 
              works at 50 people, it will completely break at 150. Fix first, then scale.
            </Callout>
          </div>
        )}

        {activeTab === "international" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">When to Go International</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="Ready Signals" icon="✓" variant="success">
                  <ul className="text-sm space-y-2">
                    <li>• Strong PMF in home market</li>
                    <li>• Inbound from target market</li>
                    <li>• Repeatable sales playbook</li>
                    <li>• Product localization minimal</li>
                    <li>• Capital to invest 18+ months</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Not Ready If..." icon="⚠" variant="warning">
                  <ul className="text-sm space-y-2">
                    <li>• Still finding PMF at home</li>
                    <li>• Limited resources</li>
                    <li>• Product needs heavy localization</li>
                    <li>• No understanding of target market</li>
                    <li>• Chasing vanity (US office = credibility)</li>
                  </ul>
                </InfoCard>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Market Entry Options</h2>
              <DataTable 
                headers={["Approach", "Investment", "Control", "Speed", "Best For"]}
                rows={[
                  ["Remote selling", "Low", "High", "Fast", "Testing demand"],
                  ["Local hire/team", "Medium", "High", "Medium", "Committed entry"],
                  ["Partnerships", "Low-Medium", "Low", "Medium", "Market learning"],
                  ["Acquisition", "High", "High", "Fast", "Instant presence"],
                  ["Subsidiary", "High", "High", "Slow", "Large markets"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">US Market Entry (from India)</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-3">Structure Options</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li><span className="font-medium text-foreground">Delaware C-Corp:</span> Standard for VC-backed. Required for US investors.</li>
                      <li><span className="font-medium text-foreground">Flip structure:</span> US parent, India subsidiary</li>
                      <li><span className="font-medium text-foreground">Keep India parent:</span> US subsidiary for sales</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-3">Practical Considerations</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Timezone: EST overlap (7:30 PM - 12 AM IST)</li>
                      <li>• Banking: Mercury, Brex for startups</li>
                      <li>• Payroll: Deel, Remote for US hires</li>
                      <li>• Legal: Find US counsel early</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Regional Considerations</h2>
              <DataTable 
                headers={["Market", "Opportunity", "Challenges", "Entry Cost"]}
                rows={[
                  ["US", "Largest SaaS market, highest ACV", "Competition, timezone, expensive", "High"],
                  ["UK/EU", "Mature buyers, GDPR-ready test", "Fragmented, multiple languages", "Medium"],
                  ["SEA", "Growing fast, similar timezone", "Price sensitivity, fragmented", "Low-Medium"],
                  ["Middle East", "High growth, government contracts", "Localization, relationships", "Medium"],
                  ["ANZ", "English-speaking, high ACV", "Small market, geographic distance", "Medium"],
                ]}
              />
            </section>

            <Callout type="warning" title="The Flip Decision">
              Flipping (making US the parent company) is a one-way door. Consider 
              carefully: Is US your primary market? Do you need US VCs? The tax and 
              legal implications are significant. Get expert advice.
            </Callout>
          </div>
        )}

        {activeTab === "design" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Building a Design System</h2>
              <div className="bg-card rounded-xl border border-border p-6 mb-6">
                <p className="text-muted-foreground mb-4">
                  A design system is your product&apos;s visual language, codified. It enables 
                  faster development, consistent UX, and easier scaling of the design team.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-3">When to Build</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• 3+ engineers working on UI</li>
                      <li>• Inconsistencies creeping in</li>
                      <li>• Designer can&apos;t keep up</li>
                      <li>• Planning major redesign</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-3">Start With</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Color palette & typography</li>
                      <li>• Spacing system</li>
                      <li>• Core components (buttons, inputs, cards)</li>
                      <li>• Usage guidelines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Design System Components</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Foundations</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Color system</li>
                    <li>• Typography scale</li>
                    <li>• Spacing & grid</li>
                    <li>• Iconography</li>
                    <li>• Motion principles</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Core Components</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Buttons & CTAs</li>
                    <li>• Form inputs</li>
                    <li>• Cards & containers</li>
                    <li>• Navigation</li>
                    <li>• Modals & dialogs</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Patterns</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Data tables</li>
                    <li>• Empty states</li>
                    <li>• Loading states</li>
                    <li>• Error handling</li>
                    <li>• Onboarding flows</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Design Team Structure</h2>
              <DataTable 
                headers={["Stage", "Team Size", "Roles", "Focus"]}
                rows={[
                  ["Pre-PMF", "0-1", "Founder or contractor", "Speed over polish"],
                  ["Post-PMF", "1-2", "Product designer", "Core product UX"],
                  ["Series A", "2-4", "Lead + product designers", "Design system foundation"],
                  ["Series B", "4-8", "Design manager + specialists", "Scale system, brand"],
                  ["Series C+", "8+", "Design org with leads", "Design ops, research team"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Design-Engineering Collaboration</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="Design → Engineering" icon="🎨" variant="info">
                  <ul className="text-sm space-y-2">
                    <li>• Figma with developer handoff</li>
                    <li>• Design tokens (colors, spacing)</li>
                    <li>• Component documentation</li>
                    <li>• Interactive prototypes</li>
                    <li>• Design review in PR process</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Engineering → Design" icon="🔧" variant="success">
                  <ul className="text-sm space-y-2">
                    <li>• Storybook for components</li>
                    <li>• Accessibility requirements</li>
                    <li>• Performance constraints</li>
                    <li>• Technical feasibility input</li>
                    <li>• Implementation feedback</li>
                  </ul>
                </InfoCard>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Common Design System Tools</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <BarChart 
                  data={[
                    { label: "Figma", value: 85 },
                    { label: "Storybook", value: 70 },
                    { label: "Tailwind CSS", value: 65 },
                    { label: "Chromatic", value: 40 },
                    { label: "Zeroheight", value: 30 },
                  ]}
                  height={200}
                  valueSuffix="% adoption"
                />
                <p className="text-sm text-muted-foreground mt-4">
                  Adoption rates among B2B SaaS startups (Series A+)
                </p>
              </div>
            </section>

            <Callout type="tip" title="Start Small, Document Everything">
              Don&apos;t try to build a comprehensive design system on day one. Start with 
              10 most-used components, document them well, and expand based on what the 
              team actually needs. A small, well-documented system beats a large, outdated one.
            </Callout>
          </div>
        )}
      </div>
    </HandbookLayout>
  );
}

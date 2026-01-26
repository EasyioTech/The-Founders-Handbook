"use client";

import { useState } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { InfoCard, Callout, DataTable, FormulaBox, StageCard } from "@/components/handbook/UIComponents";
import { BarChart, PieChart } from "@/components/handbook/Charts";

const teamComposition = [
  { label: "Engineering", value: 50 },
  { label: "Product", value: 12 },
  { label: "Sales & Marketing", value: 20 },
  { label: "Customer Success", value: 10 },
  { label: "Operations", value: 8 },
];

const salaryBenchmarks = [
  { label: "Junior Dev (0-2 yrs)", value: 8 },
  { label: "Mid Dev (2-5 yrs)", value: 18 },
  { label: "Senior Dev (5+ yrs)", value: 32 },
  { label: "Tech Lead", value: 45 },
  { label: "Engineering Manager", value: 55 },
];

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<"hiring" | "compensation" | "culture" | "esop">("hiring");

  return (
    <HandbookLayout currentSection="team">
      <div className="space-y-10">
        <header>
          <h1 className="font-display text-4xl text-foreground">Team Building & Hiring</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
            Building world-class teams from India — hiring playbook, compensation benchmarks, 
            ESOP design, and culture that retains top talent.
          </p>
        </header>

        <Callout type="important" title="India&apos;s Talent Advantage">
          India produces 1.5M+ engineers annually. The challenge isn&apos;t finding talent — 
          it&apos;s identifying the top 5% and creating an environment where they thrive. 
          Startups compete with FAANG, unicorns, and well-funded peers for this talent.
        </Callout>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["hiring", "compensation", "culture", "esop"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "hiring" ? "Hiring Playbook" : tab === "compensation" ? "Compensation" : tab === "culture" ? "Culture" : "ESOP"}
            </button>
          ))}
        </div>

        {activeTab === "hiring" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Hiring by Stage</h2>
              
              <StageCard number={1} title="Pre-Seed (2-5 people)" subtitle="Founders + first hires">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Who to Hire</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Full-stack engineer (generalist)</li>
                      <li>• Maybe: Designer or DevOps</li>
                      <li>• Co-founder if missing skills</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Hire For</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Versatility over specialization</li>
                      <li>• Ownership mindset</li>
                      <li>• Comfort with ambiguity</li>
                    </ul>
                  </div>
                </div>
              </StageCard>

              <StageCard number={2} title="Seed (5-15 people)" subtitle="First real team">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Who to Hire</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 3-5 engineers (mix of levels)</li>
                      <li>• First sales hire (SDR or AE)</li>
                      <li>• Product manager / Designer</li>
                      <li>• Customer success (part-time ok)</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Key Decisions</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Remote vs office vs hybrid</li>
                      <li>• India-only vs global team</li>
                      <li>• Specialist vs generalist balance</li>
                    </ul>
                  </div>
                </div>
              </StageCard>

              <StageCard number={3} title="Series A (15-50 people)" subtitle="Building org structure">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Who to Hire</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• VP/Head of Engineering</li>
                      <li>• Sales team (SDRs + AEs)</li>
                      <li>• Marketing lead</li>
                      <li>• HR/People ops</li>
                      <li>• Finance (fractional CFO)</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Focus Areas</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Management layer formation</li>
                      <li>• Process without bureaucracy</li>
                      <li>• Culture documentation</li>
                      <li>• Performance frameworks</li>
                    </ul>
                  </div>
                </div>
              </StageCard>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Typical B2B SaaS Team Composition</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-card rounded-xl border border-border p-6">
                  <PieChart data={teamComposition} />
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-4">At Series A (~30 people)</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li><span className="font-medium text-foreground">Engineering (50%):</span> 15 engineers including leads</li>
                    <li><span className="font-medium text-foreground">Product (12%):</span> 2-3 PMs, 1-2 designers</li>
                    <li><span className="font-medium text-foreground">Sales/Marketing (20%):</span> 4 SDRs, 2 AEs, 1 marketing</li>
                    <li><span className="font-medium text-foreground">Customer Success (10%):</span> 3 CSMs</li>
                    <li><span className="font-medium text-foreground">Operations (8%):</span> HR, Finance, Admin</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Hiring Process</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <DataTable 
                  headers={["Stage", "Purpose", "Duration", "Who&apos;s Involved"]}
                  rows={[
                    ["Sourcing", "Find candidates via LinkedIn, referrals, job boards", "Ongoing", "Recruiter / Hiring manager"],
                    ["Resume Screen", "Filter for basic requirements", "1-2 days", "Recruiter / Hiring manager"],
                    ["Phone Screen", "Culture fit, motivation, basic skills", "30 mins", "Recruiter / Team member"],
                    ["Technical Round", "Coding, system design, or role-specific", "1-2 hours", "Tech lead / Peers"],
                    ["Hiring Manager", "Deep dive on experience, expectations", "45-60 mins", "Hiring manager"],
                    ["Founder Round", "Culture, vision alignment, close candidate", "30-45 mins", "Founder (for key hires)"],
                    ["Offer & Close", "Compensation discussion, joining date", "1-3 days", "HR + Hiring manager"],
                  ]}
                />
              </div>
            </section>
          </div>
        )}

        {activeTab === "compensation" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">2025 Salary Benchmarks (India, Startup)</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <BarChart data={salaryBenchmarks} height={250} />
                <p className="text-sm text-muted-foreground mt-4">
                  Values in ₹ Lakhs per annum. Bangalore/Mumbai command 15-25% premium. 
                  Add 20-40% for FAANG-tier talent.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Role-wise Compensation</h2>
              <DataTable 
                headers={["Role", "Early Stage", "Growth Stage", "Notes"]}
                rows={[
                  ["Founding Engineer", "₹15-30L + 1-3% equity", "N/A", "Critical, treat like co-founder"],
                  ["Senior Engineer", "₹25-45L + 0.1-0.5%", "₹35-60L + 0.05-0.2%", "Varies by specialization"],
                  ["Engineering Manager", "₹40-60L + 0.2-0.5%", "₹55-80L + 0.1-0.3%", "People management experience"],
                  ["Product Manager", "₹25-45L + 0.1-0.3%", "₹40-70L + 0.05-0.15%", "B2B SaaS experience premium"],
                  ["Account Executive", "₹15-25L base + OTE 2x", "₹20-35L + OTE 2x", "50% base, 50% variable"],
                  ["SDR/BDR", "₹6-12L + OTE 1.5x", "₹8-15L + OTE 1.5x", "Entry-level, high volume"],
                  ["Customer Success", "₹12-25L + bonus", "₹18-35L + bonus", "Retention focused metrics"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Compensation Philosophy</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="Cash vs Equity Trade-off" icon="⚖️" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Early stage:</span> Lower cash, higher equity (1-3x multiple potential)</li>
                    <li><span className="font-medium">Growth stage:</span> Market cash, meaningful equity</li>
                    <li><span className="font-medium">Late stage:</span> Competitive cash, standard equity</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Variable Pay" icon="📊" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Sales:</span> 40-60% variable, OTE = 2x base</li>
                    <li><span className="font-medium">CS:</span> 10-20% variable tied to NRR</li>
                    <li><span className="font-medium">Engineering:</span> Usually no variable, maybe annual bonus</li>
                  </ul>
                </InfoCard>
              </div>
            </section>
          </div>
        )}

        {activeTab === "culture" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Building Startup Culture</h2>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Ownership</h3>
                  <p className="text-sm text-muted-foreground">
                    Everyone acts like an owner. No &quot;not my job&quot; attitude. 
                    Outcomes over activities.
                  </p>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Speed</h3>
                  <p className="text-sm text-muted-foreground">
                    Bias for action. Ship fast, iterate faster. 
                    Done is better than perfect.
                  </p>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Transparency</h3>
                  <p className="text-sm text-muted-foreground">
                    Open metrics, open communication. 
                    Bad news travels fast.
                  </p>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Customer Obsession</h3>
                  <p className="text-sm text-muted-foreground">
                    Every decision starts with &quot;what&apos;s best for customers?&quot;
                    Everyone talks to customers.
                  </p>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">High Standards</h3>
                  <p className="text-sm text-muted-foreground">
                    A-players hire A-players. 
                    Mediocrity is not tolerated.
                  </p>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Continuous Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Mistakes are learning opportunities. 
                    Post-mortems without blame.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Remote Work Best Practices</h2>
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <p className="text-muted-foreground">
                  Most Indian SaaS startups operate hybrid or remote-first. Key practices:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Communication</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Default to async (Slack, Notion, Loom)</li>
                      <li>• Documented decisions over verbal</li>
                      <li>• Regular all-hands (weekly/bi-weekly)</li>
                      <li>• 4-hour overlap for global teams</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Connection</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Quarterly offsites (in-person)</li>
                      <li>• Virtual coffee chats / random 1:1s</li>
                      <li>• Team channels beyond work</li>
                      <li>• Recognition and celebration rituals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <Callout type="tip" title="Culture is What You Do, Not What You Say">
              Your culture is defined by who you hire, fire, and promote. 
              Document your values early, but know they&apos;ll evolve. 
              The founders set the culture — it scales through hiring.
            </Callout>
          </div>
        )}

        {activeTab === "esop" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">ESOP Fundamentals</h2>
              
              <FormulaBox 
                title="ESOP Pool Size"
                formula="Typical ESOP Pool = 10-15% of fully diluted cap table"
                example="₹50Cr post-money valuation with 10% ESOP = ₹5Cr pool for employees"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="Standard Vesting" icon="📅" variant="success">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Schedule:</span> 4 years total</li>
                    <li><span className="font-medium">Cliff:</span> 1 year (0% until month 12)</li>
                    <li><span className="font-medium">Post-cliff:</span> Monthly vesting (2.08%/month)</li>
                    <li><span className="font-medium">At cliff:</span> 25% vests at month 12</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Exercise Terms" icon="💰" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Strike price:</span> FMV at grant (or discount)</li>
                    <li><span className="font-medium">Exercise window:</span> Usually 90 days post-exit</li>
                    <li><span className="font-medium">Extended window:</span> 7-10 years (employee friendly)</li>
                    <li><span className="font-medium">Acceleration:</span> Single/double trigger options</li>
                  </ul>
                </InfoCard>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">ESOP Grant Guidelines</h2>
              <DataTable 
                headers={["Role/Level", "Early Stage", "Series A", "Series B+"]}
                rows={[
                  ["Founding Engineer (#1-5)", "1.0 - 3.0%", "N/A", "N/A"],
                  ["VP/Head of Engineering", "1.0 - 2.0%", "0.5 - 1.0%", "0.25 - 0.5%"],
                  ["Senior Engineer", "0.25 - 0.75%", "0.1 - 0.25%", "0.05 - 0.1%"],
                  ["Mid-level Engineer", "0.1 - 0.25%", "0.05 - 0.1%", "0.025 - 0.05%"],
                  ["Junior Engineer", "0.05 - 0.1%", "0.02 - 0.05%", "0.01 - 0.025%"],
                  ["VP Sales/Marketing", "0.5 - 1.5%", "0.25 - 0.75%", "0.1 - 0.25%"],
                  ["Product Manager", "0.2 - 0.5%", "0.1 - 0.25%", "0.05 - 0.1%"],
                ]}
              />
              <p className="text-sm text-muted-foreground mt-4">
                Percentages are of fully-diluted cap table. Early joiners take more risk, hence higher equity.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">ESOP Taxation (India)</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">At Exercise (Perquisite Tax)</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Tax on (FMV - Strike Price)</li>
                      <li>• Taxed as salary income (slab rate)</li>
                      <li>• Due at exercise, not sale</li>
                      <li>• Creates cash-flow challenge</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">At Sale (Capital Gains)</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Tax on (Sale Price - FMV at exercise)</li>
                      <li>• Short-term: Slab rate (&lt;2 years)</li>
                      <li>• Long-term: 12.5% (≥2 years)</li>
                      <li>• Holding period from exercise date</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Callout type="warning" title="ESOP Tax Deferral (Eligible Startups)">
                DPIIT-recognized startups can offer employees tax deferral on perquisite tax for up to 5 years 
                or until they leave/sell shares (whichever is earlier). Check eligibility criteria carefully.
              </Callout>
            </section>

            <section className="bg-primary/5 rounded-xl border border-primary/20 p-6">
              <h2 className="font-display text-xl text-foreground mb-4">ESOP Best Practices</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ Create ESOP pool before fundraising</li>
                  <li>✓ Use standardized grant agreements</li>
                  <li>✓ Communicate equity value to employees</li>
                  <li>✓ Regular refresher grants for retention</li>
                </ul>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ Document all grants in cap table</li>
                  <li>✓ Consider extended exercise windows</li>
                  <li>✓ Plan for liquidity events (secondaries)</li>
                  <li>✓ Get board approval for grants</li>
                </ul>
              </div>
            </section>
          </div>
        )}
      </div>
    </HandbookLayout>
  );
}

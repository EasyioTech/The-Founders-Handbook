"use client";

import { useState } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { InfoCard, Callout, DataTable, StageCard } from "@/components/handbook/UIComponents";
import { TimelineChart } from "@/components/handbook/Charts";

const boardEvolution = [
  { date: "Pre-Seed", title: "Founder-Only Board", description: "Founders control all decisions", type: "milestone" as const, status: "completed" as const, details: ["1-2 founders as directors", "Quick decision making", "No formal meetings required"] },
  { date: "Seed", title: "First Investor Director", description: "Lead investor joins the board", type: "funding" as const, status: "completed" as const, details: ["3-member board typical", "Monthly informal updates", "Quarterly formal meetings"] },
  { date: "Series A", title: "Formal Board Structure", description: "Professional governance begins", type: "funding" as const, status: "current" as const, details: ["5-member board common", "2 founders + 2 investors + 1 independent", "Formal committees begin"] },
  { date: "Series B+", title: "Independent Directors", description: "Adding domain expertise", type: "milestone" as const, status: "upcoming" as const, details: ["7+ member boards", "Audit & compensation committees", "Quarterly strategy reviews"] },
];

export default function BoardManagementPage() {
  const [activeTab, setActiveTab] = useState<"structure" | "meetings" | "governance" | "investors">("structure");

  return (
    <HandbookLayout currentSection="board-management">
      <div className="space-y-10">
        <header>
          <h1 className="font-display text-4xl text-foreground">Board Management</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
            Building effective boards, running productive meetings, and maintaining
            strong investor relations throughout your startup journey.
          </p>
        </header>

        <Callout type="important" title="Board as Strategic Asset">
          A well-functioning board isn&apos;t just governance overhead — it&apos;s a strategic
          asset. Great board members open doors, provide expertise, and help navigate
          critical decisions. Invest time in building the right board.
        </Callout>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["structure", "meetings", "governance", "investors"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "structure" ? "Board Structure" : tab === "meetings" ? "Board Meetings" : tab === "governance" ? "Governance" : "Investor Relations"}
            </button>
          ))}
        </div>

        {activeTab === "structure" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Board Evolution by Stage</h2>
              <TimelineChart events={boardEvolution} />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Typical Board Composition</h2>
              <DataTable 
                headers={["Stage", "Size", "Composition", "Meeting Frequency"]}
                rows={[
                  ["Pre-Seed", "1-2", "Founders only", "As needed"],
                  ["Seed", "3", "2 Founders + 1 Lead Investor", "Quarterly"],
                  ["Series A", "5", "2 Founders + 2 Investors + 1 Independent", "Monthly/Bi-monthly"],
                  ["Series B", "5-7", "2 Founders + 2-3 Investors + 1-2 Independents", "Monthly"],
                  ["Series C+", "7-9", "CEO + 3 Investors + 3-4 Independents", "Monthly + Committees"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Board Seat Rights</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="Common Rights" icon="✓" variant="success">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Board Seat:</span> Lead investor typically gets a seat</li>
                    <li><span className="font-medium">Observer Rights:</span> Smaller investors may get observer status</li>
                    <li><span className="font-medium">Information Rights:</span> Monthly/quarterly financials</li>
                    <li><span className="font-medium">Protective Provisions:</span> Veto on major decisions</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Protective Provisions" icon="🛡️" variant="warning">
                  <ul className="text-sm space-y-2">
                    <li>• Change in authorized shares</li>
                    <li>• Sale or merger of company</li>
                    <li>• Change in board size</li>
                    <li>• Taking on significant debt</li>
                    <li>• Related party transactions</li>
                  </ul>
                </InfoCard>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Selecting Independent Directors</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-3">What to Look For</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Domain expertise relevant to your business</li>
                      <li>• Operating experience (ideally CEO/CXO background)</li>
                      <li>• Network in your industry</li>
                      <li>• Time availability (not over-boarded)</li>
                      <li>• Chemistry with founding team</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-3">Red Flags</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Serving on too many boards (&gt;4 active)</li>
                      <li>• No relevant operating experience</li>
                      <li>• Conflicts with competitors</li>
                      <li>• Only interested in compensation</li>
                      <li>• Unwilling to make time for you</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "meetings" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Board Meeting Best Practices</h2>
              
              <StageCard number={1} title="Pre-Meeting (1 week before)" subtitle="Preparation is everything">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Board Deck Contents</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Executive summary (1 page)</li>
                      <li>• KPI dashboard & metrics</li>
                      <li>• Financial update (actuals vs plan)</li>
                      <li>• Product roadmap progress</li>
                      <li>• Team updates</li>
                      <li>• Key decisions needed</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Logistics</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Send deck 3-5 days in advance</li>
                      <li>• Confirm attendance</li>
                      <li>• Prepare discussion questions</li>
                      <li>• Brief any presenters</li>
                    </ul>
                  </div>
                </div>
              </StageCard>

              <StageCard number={2} title="During Meeting (2-3 hours)" subtitle="Focus on strategy, not updates">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Agenda Structure</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 10 min: Quick metrics review</li>
                      <li>• 60 min: Strategic discussion #1</li>
                      <li>• 60 min: Strategic discussion #2</li>
                      <li>• 20 min: Decisions & approvals</li>
                      <li>• 15 min: Closed session</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Best Practices</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Don&apos;t read the deck aloud</li>
                      <li>• Focus on decisions, not updates</li>
                      <li>• Ask for specific input</li>
                      <li>• Leave time for discussion</li>
                    </ul>
                  </div>
                </div>
              </StageCard>

              <StageCard number={3} title="Post-Meeting (within 48 hours)" subtitle="Follow through is critical">
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Send meeting minutes with action items</li>
                  <li>• Follow up on commitments made by board members</li>
                  <li>• Update board portal with any new documents</li>
                  <li>• Schedule any required follow-up calls</li>
                </ul>
              </StageCard>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Sample Board Deck Structure</h2>
              <DataTable 
                headers={["Section", "Pages", "Purpose", "Time Allocation"]}
                rows={[
                  ["Executive Summary", "1", "TL;DR of the quarter", "Reference only"],
                  ["Metrics Dashboard", "2-3", "KPIs, trends, vs targets", "10 min review"],
                  ["Financial Update", "2-3", "P&L, cash, runway", "10 min review"],
                  ["Strategic Topic #1", "3-5", "Deep dive discussion", "45-60 min"],
                  ["Strategic Topic #2", "3-5", "Deep dive discussion", "45-60 min"],
                  ["Team & Org", "1-2", "Hiring, departures, org changes", "5 min"],
                  ["Asks & Decisions", "1", "What you need from the board", "15 min"],
                  ["Appendix", "As needed", "Supporting data", "Reference only"],
                ]}
              />
            </section>

            <Callout type="tip" title="The 70/30 Rule">
              Spend 70% of board meeting time on forward-looking strategic discussions,
              and only 30% on backward-looking updates. Board members can read updates
              in advance — use meeting time for their strategic input.
            </Callout>
          </div>
        )}

        {activeTab === "governance" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Board Committees</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Audit Committee</h3>
                  <p className="text-sm text-muted-foreground mb-3">Required for public companies, good practice at Series B+</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Financial statement review</li>
                    <li>• Internal controls</li>
                    <li>• External auditor relationship</li>
                    <li>• Risk management oversight</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Compensation Committee</h3>
                  <p className="text-sm text-muted-foreground mb-3">Start at Series A for exec compensation</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Executive compensation</li>
                    <li>• ESOP grants approval</li>
                    <li>• Bonus structures</li>
                    <li>• Benchmarking</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Nominating Committee</h3>
                  <p className="text-sm text-muted-foreground mb-3">Usually at Series C+ or pre-IPO</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Board composition</li>
                    <li>• Director nominations</li>
                    <li>• Succession planning</li>
                    <li>• Board evaluations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Key Governance Documents</h2>
              <DataTable 
                headers={["Document", "Purpose", "When Needed", "Who Prepares"]}
                rows={[
                  ["Articles of Association", "Company constitution", "Incorporation", "Lawyer"],
                  ["Shareholders Agreement", "Rights, transfers, exits", "First funding", "Lawyer"],
                  ["Board Resolutions", "Formal decisions", "Each meeting", "Company Secretary"],
                  ["Minutes of Meeting", "Record of discussions", "Each meeting", "Company Secretary"],
                  ["D&O Insurance", "Director protection", "Series A+", "Insurance broker"],
                  ["Disclosure Policy", "Material information handling", "Series B+", "Legal team"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Director Duties (India)</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-3">Fiduciary Duties</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li><span className="font-medium text-foreground">Duty of Care:</span> Act with reasonable care and diligence</li>
                      <li><span className="font-medium text-foreground">Duty of Loyalty:</span> Act in company&apos;s best interest</li>
                      <li><span className="font-medium text-foreground">Duty of Good Faith:</span> Honest and transparent conduct</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-3">Compliance Requirements</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Annual director disclosures</li>
                      <li>• Related party transaction approvals</li>
                      <li>• Board meeting attendance (&gt;50%)</li>
                      <li>• Financial statement approval</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "investors" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Investor Communication Cadence</h2>
              <DataTable 
                headers={["Frequency", "Format", "Content", "Audience"]}
                rows={[
                  ["Weekly", "Email/Slack", "Quick pulse, blockers, wins", "Lead investors"],
                  ["Monthly", "Investor Update", "Metrics, progress, asks", "All investors"],
                  ["Quarterly", "Board Meeting", "Strategic discussions", "Board members"],
                  ["Annually", "Strategy Review", "Vision, plans, fundraising", "All investors"],
                  ["Ad-hoc", "Phone/Video", "Major news (good or bad)", "Relevant investors"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Monthly Investor Update Template</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-3">Always Include</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li><span className="font-medium text-foreground">Highlights:</span> Top 3 wins this month</li>
                      <li><span className="font-medium text-foreground">Lowlights:</span> Top 3 challenges/learnings</li>
                      <li><span className="font-medium text-foreground">Metrics:</span> ARR, MRR, customers, burn</li>
                      <li><span className="font-medium text-foreground">Runway:</span> Cash and months remaining</li>
                      <li><span className="font-medium text-foreground">Asks:</span> How investors can help</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-3">Optional Sections</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Product updates</li>
                      <li>• Team changes</li>
                      <li>• Customer wins/losses</li>
                      <li>• Competitive intelligence</li>
                      <li>• Fundraising status</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <Callout type="warning" title="Over-Communication is Better">
              Investors hate surprises. Bad news doesn&apos;t get better with age. 
              Share challenges early — your investors have seen it before and can often help.
              Radio silence erodes trust faster than bad news.
            </Callout>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Leveraging Your Investors</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="What Investors Can Help With" icon="🤝" variant="success">
                  <ul className="text-sm space-y-2">
                    <li>• Customer introductions</li>
                    <li>• Executive recruiting</li>
                    <li>• Strategic advice</li>
                    <li>• Future fundraising</li>
                    <li>• M&A connections</li>
                    <li>• PR and visibility</li>
                  </ul>
                </InfoCard>
                <InfoCard title="How to Make Asks" icon="📋" variant="info">
                  <ul className="text-sm space-y-2">
                    <li>• Be specific: &quot;Intro to CTO of Company X&quot;</li>
                    <li>• Make it easy: Provide context and draft</li>
                    <li>• Follow up: Update on outcome</li>
                    <li>• Say thanks: Acknowledge their help</li>
                  </ul>
                </InfoCard>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Managing Difficult Conversations</h2>
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <div>
                  <div className="font-medium text-foreground mb-2">When Raising a Bridge/Down Round</div>
                  <p className="text-sm text-muted-foreground">
                    Talk to existing investors first. Be honest about why metrics are off.
                    Present a clear plan. Ask for their support before approaching new investors.
                  </p>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">When Pivoting</div>
                  <p className="text-sm text-muted-foreground">
                    Share data that led to the decision. Explain the new opportunity clearly.
                    Get buy-in before major announcements. Update on progress frequently.
                  </p>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">When Missing Targets</div>
                  <p className="text-sm text-muted-foreground">
                    Don&apos;t hide it. Explain what happened and what you&apos;re doing differently.
                    Revise projections to be realistic. Show you understand the root cause.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </HandbookLayout>
  );
}

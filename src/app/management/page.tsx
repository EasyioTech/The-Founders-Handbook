"use client";

import { useState } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { InfoCard, Callout, DataTable, StageCard, ProgressBar } from "@/components/handbook/UIComponents";

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState<"leadership" | "org" | "culture" | "execution">("leadership");

  return (
    <HandbookLayout currentSection="management">
      <div className="space-y-10">
        <header>
          <h1 className="font-display text-4xl text-foreground">Management & Leadership</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
            Evolving from founder to CEO, building high-performance teams, and creating
            systems that scale beyond individual heroics.
          </p>
        </header>

        <Callout type="important" title="The Founder&apos;s Dilemma">
          What got you here won&apos;t get you there. The skills that make great founders 
          (hands-on, detail-obsessed, doing everything) become liabilities at scale. 
          The transition from founder to CEO is often the hardest part.
        </Callout>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["leadership", "org", "culture", "execution"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "leadership" ? "Leadership" : tab === "org" ? "Org Design" : tab === "culture" ? "Culture & Values" : "Execution"}
            </button>
          ))}
        </div>

        {activeTab === "leadership" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">CEO Evolution by Stage</h2>
              
              <StageCard number={1} title="Pre-Seed to Seed" subtitle="Founder-Builder Mode">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Primary Focus</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Building product yourself</li>
                      <li>• Talking to every customer</li>
                      <li>• Hiring first 10 people</li>
                      <li>• Doing whatever is needed</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Time Allocation</div>
                    <div className="space-y-2">
                      <ProgressBar label="Product/Engineering" value={40} color="primary" />
                      <ProgressBar label="Customers/Sales" value={30} color="chart-2" />
                      <ProgressBar label="Fundraising" value={20} color="chart-3" />
                      <ProgressBar label="Management" value={10} color="chart-4" />
                    </div>
                  </div>
                </div>
              </StageCard>

              <StageCard number={2} title="Series A" subtitle="Player-Coach Transition">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Primary Focus</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Hiring department heads</li>
                      <li>• Setting up processes</li>
                      <li>• Strategic customer relationships</li>
                      <li>• Company story and vision</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Time Allocation</div>
                    <div className="space-y-2">
                      <ProgressBar label="People/Hiring" value={35} color="primary" />
                      <ProgressBar label="Strategy/Vision" value={25} color="chart-2" />
                      <ProgressBar label="Key Customers" value={20} color="chart-3" />
                      <ProgressBar label="Fundraising" value={20} color="chart-4" />
                    </div>
                  </div>
                </div>
              </StageCard>

              <StageCard number={3} title="Series B+" subtitle="CEO Mode">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Primary Focus</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Executive team building</li>
                      <li>• Culture and values</li>
                      <li>• Strategic decisions only</li>
                      <li>• External representation</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Time Allocation</div>
                    <div className="space-y-2">
                      <ProgressBar label="Executive Team" value={30} color="primary" />
                      <ProgressBar label="Strategy/Board" value={30} color="chart-2" />
                      <ProgressBar label="External (PR, Partners)" value={25} color="chart-3" />
                      <ProgressBar label="Key Decisions" value={15} color="chart-4" />
                    </div>
                  </div>
                </div>
              </StageCard>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Leadership Skills to Develop</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Communication</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Company-wide alignment</li>
                    <li>• Investor storytelling</li>
                    <li>• Difficult conversations</li>
                    <li>• Public speaking</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Decision Making</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Data-informed intuition</li>
                    <li>• Speed vs quality tradeoffs</li>
                    <li>• Reversible vs irreversible</li>
                    <li>• Knowing when to delegate</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">People</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Hiring A-players</li>
                    <li>• Giving effective feedback</li>
                    <li>• Letting go (firing)</li>
                    <li>• Coaching and developing</li>
                  </ul>
                </div>
              </div>
            </section>

            <Callout type="tip" title="Get an Executive Coach">
              Most successful CEOs have coaches. It&apos;s not about fixing problems — 
              it&apos;s about having a thinking partner. Budget ₹2-5L/year for this.
              The ROI is enormous.
            </Callout>
          </div>
        )}

        {activeTab === "org" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Org Structure by Stage</h2>
              <DataTable 
                headers={["Stage", "Structure", "Reporting", "Key Additions"]}
                rows={[
                  ["5-15", "Flat, everyone reports to founders", "Direct to CEO", "First functional leads"],
                  ["15-30", "Functional teams form", "Team leads → CEO", "Engineering, Sales, Product heads"],
                  ["30-50", "Departments with managers", "Managers → VPs → CEO", "VP-level executives"],
                  ["50-100", "Multiple layers, clear hierarchy", "Full exec team", "COO/CFO, HR head"],
                  ["100+", "Business units possible", "BU heads → CEO", "GM roles, regional heads"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Building Your Executive Team</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="When to Hire Executives" icon="📅" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">VP Engineering:</span> At 8-12 engineers</li>
                    <li><span className="font-medium">VP Sales:</span> At 3-5 sales reps, proven playbook</li>
                    <li><span className="font-medium">VP Marketing:</span> After PMF, ready to scale</li>
                    <li><span className="font-medium">VP Product:</span> At 3+ product teams</li>
                    <li><span className="font-medium">CFO:</span> Pre-Series B or $5M+ ARR</li>
                    <li><span className="font-medium">HR Head:</span> At 30-40 employees</li>
                  </ul>
                </InfoCard>
                <InfoCard title="What to Look For" icon="🎯" variant="success">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Stage fit:</span> Have they done this stage before?</li>
                    <li><span className="font-medium">Culture fit:</span> Will they embrace startup chaos?</li>
                    <li><span className="font-medium">Player-coach:</span> Can they do AND manage?</li>
                    <li><span className="font-medium">Hiring ability:</span> Can they build their team?</li>
                    <li><span className="font-medium">Chemistry:</span> Do you want to work with them?</li>
                  </ul>
                </InfoCard>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Span of Control</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-3">Recommended Spans</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li><span className="font-medium text-foreground">CEO:</span> 5-8 direct reports max</li>
                      <li><span className="font-medium text-foreground">VPs:</span> 5-10 direct reports</li>
                      <li><span className="font-medium text-foreground">Managers:</span> 6-10 direct reports</li>
                      <li><span className="font-medium text-foreground">Tech Leads:</span> 4-7 engineers</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-3">Warning Signs</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• CEO has 12+ directs = chaos</li>
                      <li>• Manager with 15+ reports = no coaching</li>
                      <li>• Everyone reports to CEO at 30 people = bottleneck</li>
                      <li>• Adding layers too early = bureaucracy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <Callout type="warning" title="Promote Carefully">
              Your best IC (individual contributor) is often NOT your best manager.
              Different skills entirely. Before promoting, ask: Do they want to manage?
              Are they coaching others already? Can they let go of doing?
            </Callout>
          </div>
        )}

        {activeTab === "culture" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Defining Company Values</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-muted-foreground mb-6">
                  Values aren&apos;t aspirational posters — they&apos;re decision-making shortcuts.
                  Good values are specific enough to guide tough calls and filter hiring.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-3">Good Values</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li><span className="font-medium text-foreground">&quot;Speed over perfection&quot;</span> — guides product decisions</li>
                      <li><span className="font-medium text-foreground">&quot;Customer obsession&quot;</span> — prioritizes customer needs</li>
                      <li><span className="font-medium text-foreground">&quot;Disagree and commit&quot;</span> — enables fast alignment</li>
                      <li><span className="font-medium text-foreground">&quot;Default to transparency&quot;</span> — shapes communication</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-3">Weak Values</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li><span className="font-medium text-foreground">&quot;Excellence&quot;</span> — too generic, means nothing</li>
                      <li><span className="font-medium text-foreground">&quot;Integrity&quot;</span> — should be table stakes</li>
                      <li><span className="font-medium text-foreground">&quot;Innovation&quot;</span> — what does this mean daily?</li>
                      <li><span className="font-medium text-foreground">&quot;Work hard&quot;</span> — not a differentiator</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Culture Mechanisms</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Rituals</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Weekly all-hands</li>
                    <li>• Monthly town halls</li>
                    <li>• Quarterly offsites</li>
                    <li>• Friday demos</li>
                    <li>• Celebration rituals</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Symbols</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Who gets promoted</li>
                    <li>• What gets recognized</li>
                    <li>• Office design</li>
                    <li>• Perks you choose</li>
                    <li>• Stories you tell</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">Systems</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Hiring criteria</li>
                    <li>• Performance reviews</li>
                    <li>• Compensation philosophy</li>
                    <li>• Meeting norms</li>
                    <li>• Decision frameworks</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Maintaining Culture at Scale</h2>
              <DataTable 
                headers={["Size", "Challenge", "Solution"]}
                rows={[
                  ["10→30", "New hires don't know origin stories", "Document culture, founder onboarding"],
                  ["30→50", "Sub-cultures forming by team", "Cross-team projects, shared rituals"],
                  ["50→100", "Culture becomes &apos;what we used to be&apos;", "Culture carriers program, values in reviews"],
                  ["100→200", "Layers dilute founder influence", "Culture council, exec role modeling"],
                  ["200+", "Geography and timezones fragment", "Local culture leads, global moments"],
                ]}
              />
            </section>

            <Callout type="tip" title="Culture = Who You Hire, Fire, Promote">
              Culture is revealed in your hardest decisions. When you tolerate a
              high-performer who violates values, everyone notices. When you let
              go of a nice person who isn&apos;t performing, everyone notices. Actions &gt; words.
            </Callout>
          </div>
        )}

        {activeTab === "execution" && (
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Goal-Setting Frameworks</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="OKRs (Objectives & Key Results)" icon="🎯" variant="success">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Objective:</span> Qualitative, inspiring goal</li>
                    <li><span className="font-medium">Key Results:</span> 3-5 measurable outcomes</li>
                    <li><span className="font-medium">Cadence:</span> Quarterly, cascaded from company</li>
                    <li><span className="font-medium">Best for:</span> Alignment, ambitious goals</li>
                  </ul>
                </InfoCard>
                <InfoCard title="V2MOM" icon="📋" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Vision:</span> What do you want?</li>
                    <li><span className="font-medium">Values:</span> What&apos;s important about it?</li>
                    <li><span className="font-medium">Methods:</span> How do you get it?</li>
                    <li><span className="font-medium">Obstacles:</span> What&apos;s in the way?</li>
                    <li><span className="font-medium">Measures:</span> How do you know you have it?</li>
                  </ul>
                </InfoCard>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Meeting Cadence</h2>
              <DataTable 
                headers={["Meeting", "Frequency", "Duration", "Purpose", "Attendees"]}
                rows={[
                  ["1:1s", "Weekly", "30-45 min", "Coaching, blockers, feedback", "Manager + report"],
                  ["Team Standup", "Daily", "15 min", "Sync, blockers", "Team"],
                  ["Exec Team", "Weekly", "60-90 min", "Decisions, alignment", "Leadership"],
                  ["All Hands", "Weekly/Bi-weekly", "30-45 min", "Updates, recognition", "Everyone"],
                  ["Board Meeting", "Quarterly", "2-3 hours", "Governance, strategy", "Board"],
                  ["Strategy Offsite", "Quarterly", "1-2 days", "Planning, alignment", "Leadership"],
                ]}
              />
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Effective 1:1s</h2>
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-3">Agenda Template</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li><span className="font-medium text-foreground">Updates:</span> What&apos;s on your mind? (their agenda first)</li>
                      <li><span className="font-medium text-foreground">Priorities:</span> What are you focused on?</li>
                      <li><span className="font-medium text-foreground">Blockers:</span> Where are you stuck?</li>
                      <li><span className="font-medium text-foreground">Growth:</span> What do you want to develop?</li>
                      <li><span className="font-medium text-foreground">Feedback:</span> Both directions</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-3">Best Practices</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Never cancel — reschedule if needed</li>
                      <li>• Let them drive the agenda</li>
                      <li>• 10% status, 90% coaching</li>
                      <li>• Document action items</li>
                      <li>• Follow up on commitments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-foreground mb-6">Decision Making</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">RAPID Framework</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li><span className="font-medium text-foreground">R</span>ecommend: Who proposes the decision?</li>
                    <li><span className="font-medium text-foreground">A</span>gree: Who must agree for it to proceed?</li>
                    <li><span className="font-medium text-foreground">P</span>erform: Who implements?</li>
                    <li><span className="font-medium text-foreground">I</span>nput: Who provides input?</li>
                    <li><span className="font-medium text-foreground">D</span>ecide: Who has final authority?</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold mb-3">One-Way vs Two-Way Doors</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li><span className="font-medium text-foreground">One-way:</span> Hard to reverse. Take time, involve more people.</li>
                    <li><span className="font-medium text-foreground">Two-way:</span> Easy to reverse. Decide fast, bias for action.</li>
                    <li className="mt-3 text-foreground font-medium">Most decisions are two-way doors. Don&apos;t overthink them.</li>
                  </ul>
                </div>
              </div>
            </section>

            <Callout type="warning" title="Founder Tax">
              Every decision that goes to the founder creates a tax on the org.
              Ask: &quot;Can someone else make this?&quot; Push decisions down.
              Your job is to set context and constraints, not decide everything.
            </Callout>
          </div>
        )}
      </div>
    </HandbookLayout>
  );
}

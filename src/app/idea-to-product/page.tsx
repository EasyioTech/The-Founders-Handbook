import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { StageCard, Callout, DataTable, InfoCard } from "@/components/handbook/UIComponents";
import { FunnelChart, TimelineChart } from "@/components/handbook/Charts";
import { productStages, complianceChecklist } from "@/lib/handbook-data";
import Link from "next/link";

const validationFunnel = [
  { label: "Ideas", value: 100 },
  { label: "Problems", value: 60 },
  { label: "Solutions", value: 35 },
  { label: "MVPs", value: 15 },
  { label: "PMF", value: 5 },
];

const pmfSignals = [
  ["Signal", "What to Look For", "Target"],
  ["Sean Ellis Test", "Would you be very disappointed if you couldn't use this product?", ">40% say yes"],
  ["Organic Growth", "Users referring others without incentives", ">30% from referrals"],
  ["Retention", "Users still active after 30/60/90 days", ">25% D90 retention"],
  ["Revenue Retention", "Net revenue from existing customers", ">100% NRR"],
  ["Sales Cycle", "Time from first contact to close", "Decreasing trend"],
];

const customerDiscoveryQuestions = [
  "Tell me about the last time you experienced [problem]?",
  "What did you do to solve it?",
  "What's frustrating about current solutions?",
  "How much time/money does this problem cost you?",
  "If you could wave a magic wand, what would the ideal solution look like?",
  "Would you pay ₹X for a solution that does Y?",
];

export default function IdeaToProductPage() {
  return (
    <HandbookLayout currentSection="idea-to-product">
      <div className="space-y-12">
        <header className="space-y-4">
          <div className="text-sm text-primary font-medium">Chapter 1</div>
          <h1 className="font-display text-4xl text-foreground">
            From Idea to Product
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The journey from a spark of inspiration to a product that customers love 
            and are willing to pay for. Build something nobody wants = startup killer #1.
          </p>
        </header>

        <FunnelChart 
          stages={validationFunnel}
          title="The Validation Funnel: From 100 Ideas to Product-Market Fit"
        />

        <Callout type="important" title="The #1 Startup Killer">
          42% of startups fail because they build something nobody wants. 
          This chapter helps you avoid that fate by validating before building.
          In the Pre-Seed stage, your goal is singular: Build an MVP and acquire 
          the first 10 unaffiliated users.
        </Callout>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">The Product Development Stages</h2>
          
          {productStages.map((stage, index) => (
            <StageCard 
              key={stage.stage}
              number={index + 1}
              title={stage.stage}
              subtitle={`Duration: ${stage.duration}`}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Key Activities</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {stage.activities.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Outputs</h4>
                  <div className="flex flex-wrap gap-2">
                    {stage.outputs.map((output, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {output}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Key Questions to Answer</h4>
                  <ul className="space-y-1 text-sm">
                    {stage.key_questions.map((q, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary">→</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StageCard>
          ))}
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Customer Discovery</h2>
          <p className="text-muted-foreground">
            Before writing a single line of code, talk to at least 50 potential customers. 
            Here are the questions that matter:
          </p>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Essential Discovery Questions</h3>
            <ol className="space-y-3">
              {customerDiscoveryQuestions.map((question, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{question}</span>
                </li>
              ))}
            </ol>
          </div>

          <Callout type="tip" title="The Mom Test">
            Never ask &quot;Would you use this?&quot; People lie to be polite. Instead, ask about 
            their past behavior and actual spending. If they haven&apos;t tried to solve the 
            problem before, it&apos;s not painful enough.
          </Callout>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">MVP Validation Techniques</h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard title="What MVP Is" icon="✓" variant="success">
              <ul className="space-y-2 text-sm">
                <li>The smallest thing that tests your hypothesis</li>
                <li>Something people can actually use</li>
                <li>A learning vehicle, not a product</li>
                <li>Time-boxed (2-6 weeks typically)</li>
              </ul>
            </InfoCard>
            
            <InfoCard title="What MVP Is NOT" icon="✗" variant="warning">
              <ul className="space-y-2 text-sm">
                <li>A crappy version of your vision</li>
                <li>Missing core functionality</li>
                <li>Something you&apos;re embarrassed by</li>
                <li>An excuse to skip validation</li>
              </ul>
            </InfoCard>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Validation Techniques for Indian Founders</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="font-medium text-foreground">Fake Door Test</div>
                <p className="text-sm text-muted-foreground">
                  Place a button for a feature on your landing page. If users click, show 
                  &quot;Coming Soon&quot; and record interest. No clicks = saved months of dev time.
                </p>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-foreground">Concierge MVP</div>
                <p className="text-sm text-muted-foreground">
                  Deliver the service manually before building tech. Building an AI scheduler? 
                  Have a human schedule meetings first to understand edge cases.
                </p>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-foreground">Letter of Intent (LOI)</div>
                <p className="text-sm text-muted-foreground">
                  Get written commitments from potential customers before building. 
                  &quot;We will pay ₹X when you deliver Y&quot; is validation gold.
                </p>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-foreground">Paid Pilot</div>
                <p className="text-sm text-muted-foreground">
                  Charge even a small amount (₹1,000-5,000) for early access. 
                  People who pay behave differently than free users.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Product-Market Fit Signals</h2>
          <p className="text-muted-foreground">
            Product-market fit isn&apos;t binary—it&apos;s a spectrum. Here are the signals that 
            indicate you&apos;re getting close. The period between MVP and PMF is the 
            &quot;Valley of Death&quot; — manage your burn carefully.
          </p>

          <DataTable 
            headers={pmfSignals[0] as string[]}
            rows={pmfSignals.slice(1) as string[][]}
          />

          <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
            <h3 className="font-semibold text-foreground mb-3">The 40% Rule (Sean Ellis Test)</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Ask existing users: &quot;How would you feel if you could no longer use this product?&quot;
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-background rounded-lg p-4">
                <div className="text-2xl font-display text-destructive">{"<"}40%</div>
                <div className="text-xs text-muted-foreground mt-1">No PMF yet</div>
              </div>
              <div className="bg-background rounded-lg p-4">
                <div className="text-2xl font-display text-chart-3">40-60%</div>
                <div className="text-xs text-muted-foreground mt-1">Getting close</div>
              </div>
              <div className="bg-background rounded-lg p-4">
                <div className="text-2xl font-display text-primary">{">"}60%</div>
                <div className="text-xs text-muted-foreground mt-1">Strong PMF</div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Market Sizing: TAM, SAM, SOM</h2>
          
          <div className="relative">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full max-w-md aspect-square relative">
                <div className="absolute inset-0 bg-chart-4/20 rounded-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-chart-2/30 rounded-full flex items-center justify-center">
                    <div className="w-1/2 h-1/2 bg-primary/40 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-foreground">SOM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-3 mt-6">
              <div className="text-center">
                <div className="w-4 h-4 rounded-full bg-chart-4/20 mx-auto mb-2" />
                <div className="font-medium text-foreground">TAM</div>
                <div className="text-sm text-muted-foreground">Total Addressable Market</div>
                <div className="text-xs text-muted-foreground mt-1">Everyone who could theoretically buy</div>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 rounded-full bg-chart-2/30 mx-auto mb-2" />
                <div className="font-medium text-foreground">SAM</div>
                <div className="text-sm text-muted-foreground">Serviceable Available Market</div>
                <div className="text-xs text-muted-foreground mt-1">Market you can realistically reach</div>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 rounded-full bg-primary/40 mx-auto mb-2" />
                <div className="font-medium text-foreground">SOM</div>
                <div className="text-sm text-muted-foreground">Serviceable Obtainable Market</div>
                <div className="text-xs text-muted-foreground mt-1">What you can capture in 3-5 years</div>
              </div>
            </div>
          </div>

          <Callout type="info" title="Investor Perspective">
            VCs typically want to see TAM of ₹8,000 Cr+ ($1B+) for venture-scale returns. 
            But be realistic—investors prefer honest, bottoms-up analysis over 
            inflated top-down projections. &quot;50K agencies × ₹50K/yr = ₹250Cr Initial Market&quot; is better than 
            &quot;We&apos;ll get 1% of the $10B market.&quot;
          </Callout>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Founder&apos;s Compliance Checklist (India)</h2>
          <p className="text-muted-foreground">
            Before raising, ensure your startup is legally sound and investable. 
            Decisions in the first 30 days can affect investability for years.
          </p>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="space-y-4">
              {complianceChecklist.map((check, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 ${check.critical ? 'border-primary bg-primary/10' : 'border-border'}`} />
                  <div>
                    <span className={check.critical ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                      {check.item}
                    </span>
                    {check.critical && (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">Critical</span>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{check.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Callout type="warning" title="The Delaware vs India Decision">
            For US-focused SaaS, Delaware C-Corp provides access to US VCs and global liquidity. 
            For India/SEA focus, Indian Pvt Ltd has lower costs and rising domestic IPO multiples. 
            Many founders are now &quot;reverse flipping&quot; back to India (PhonePe, Groww, Pine Labs) 
            for BSE/NSE access.
          </Callout>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Validation Checklist</h2>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="space-y-4">
              {[
                { item: "Conducted 50+ customer discovery interviews", critical: true },
                { item: "Identified a specific, painful problem", critical: true },
                { item: "Validated willingness to pay (LOIs or actual payment)", critical: true },
                { item: "Built and tested MVP with real users", critical: true },
                { item: "Achieved first 10 unaffiliated users", critical: true },
                { item: "Achieved initial retention metrics", critical: false },
                { item: "Identified repeatable acquisition channel", critical: false },
                { item: "Documented customer personas", critical: false },
                { item: "Mapped competitive landscape", critical: false },
              ].map((check, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 ${check.critical ? 'border-primary' : 'border-border'}`} />
                  <span className={check.critical ? 'text-foreground' : 'text-muted-foreground'}>
                    {check.item}
                  </span>
                  {check.critical && (
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">Critical</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-border">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Overview
          </Link>
          <Link href="/funding-stages" className="text-primary hover:text-primary/80 transition-colors">
            Funding Stages →
          </Link>
        </div>
      </div>
    </HandbookLayout>
  );
}

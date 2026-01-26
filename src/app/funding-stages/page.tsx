import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { Callout, DataTable, FormulaBox, InfoCard } from "@/components/handbook/UIComponents";
import { BarChart, TimelineChart } from "@/components/handbook/Charts";
import { fundingStages, indianInvestors } from "@/lib/handbook-data";
import Link from "next/link";
import { FileText, ClipboardList, BarChart3, Banknote, Users, TrendingUp, Wrench, IndianRupee } from "lucide-react";

const fundingAmounts = [
  { label: "Pre-Seed", value: 200 },
  { label: "Seed", value: 1000 },
  { label: "Series A", value: 5250 },
  { label: "Series B", value: 10000 },
  { label: "Series C+", value: 40000 },
];

const termSheetTerms = [
  ["Term", "What It Means", "Typical Range (India)"],
  ["Valuation Cap", "Maximum valuation for iSAFE/note conversion", "₹10 Cr - ₹60 Cr"],
  ["Discount", "Price discount vs. next round investors", "15% - 25%"],
  ["Pro-rata Rights", "Right to maintain ownership in future rounds", "Often for leads"],
  ["Board Seats", "Investor representation on your board", "1 for Series A+"],
  ["Liquidation Preference", "Who gets paid first in exit", "1x non-participating"],
  ["Anti-dilution", "Protection if down round occurs", "Broad-Based Weighted Avg"],
];

const investorTypes = [
  {
    type: "Friends & Family",
    check_size: "₹10L - ₹50L",
    stage: "Pre-seed",
    pros: "Fast, flexible, trust-based",
    cons: "Limited funds, mixed business/personal",
  },
  {
    type: "Angel Investors",
    check_size: "₹20L - ₹2Cr",
    stage: "Pre-seed, Seed",
    pros: "Expertise, networks, quick decisions",
    cons: "Less capital, varying involvement",
  },
  {
    type: "Accelerators",
    check_size: "₹50L - ₹1.5Cr",
    stage: "Pre-seed, Seed",
    pros: "Mentorship, cohort, credibility",
    cons: "Dilution (5-10%), competitive entry",
  },
  {
    type: "Seed VCs",
    check_size: "₹2Cr - ₹10Cr",
    stage: "Seed",
    pros: "Larger checks, portfolio support",
    cons: "More diligence, board involvement",
  },
  {
    type: "Series A+ VCs",
    check_size: "₹20Cr - ₹100Cr+",
    stage: "Series A+",
    pros: "Scale capital, institutional support",
    cons: "High bar, significant dilution",
  },
];

export default function FundingStagesPage() {
  return (
    <HandbookLayout currentSection="funding-stages">
      <div className="space-y-12">
        <header className="space-y-4">
          <div className="text-sm text-primary font-medium">Chapter 2</div>
          <h1 className="font-display text-4xl text-foreground">
            Funding Stages Explained
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From your first check to institutional rounds—understand what Indian investors 
            expect at each stage and how to navigate the 16-week fundraising process.
          </p>
        </header>

        <BarChart 
          data={fundingAmounts}
          title="Typical Round Size by Stage (₹ Lakhs)"
          valuePrefix="₹"
          valueSuffix="L"
        />

        <Callout type="info" title="The Fuel Analogy">
          Bootstrapping (pushing the car yourself) lets you keep 100% but moves slowly. 
          VC funding (rocket engine) offers explosive speed but costs equity. Venture Debt 
          (nitrous oxide) extends runway without dilution but must be repaid. Choose based 
          on your market and ambition. Zoho bootstrapped to global dominance; Freshworks raised 
          to capture enterprise market share.
        </Callout>

        <section className="space-y-8">
          <h2 className="font-display text-2xl text-foreground">The Funding Staircase (2025 India)</h2>
          
          {fundingStages.map((stage, index) => (
            <div key={stage.name} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="bg-primary/5 p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{stage.name}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                      <span>Amount: {stage.typical_amount}</span>
                      <span>•</span>
                      <span>Valuation: {stage.valuation}</span>
                      <span>•</span>
                      <span>Dilution: {stage.dilution}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Capital Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    {stage.sources.map((source, i) => (
                      <span key={i} className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">What Investors Look For</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {stage.what_investors_look_for.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="font-medium text-foreground mb-3">Key Milestones to Hit</h4>
                  <div className="flex flex-wrap gap-2">
                    {stage.milestones.map((milestone, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {milestone}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Types of Investors in India</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left p-4 font-semibold text-foreground border border-border">Type</th>
                  <th className="text-left p-4 font-semibold text-foreground border border-border">Check Size</th>
                  <th className="text-left p-4 font-semibold text-foreground border border-border">Stage</th>
                  <th className="text-left p-4 font-semibold text-foreground border border-border">Pros</th>
                  <th className="text-left p-4 font-semibold text-foreground border border-border">Cons</th>
                </tr>
              </thead>
              <tbody>
                {investorTypes.map((inv, i) => (
                  <tr key={i} className="hover:bg-secondary/50">
                    <td className="p-4 border border-border font-medium text-foreground">{inv.type}</td>
                    <td className="p-4 border border-border text-muted-foreground">{inv.check_size}</td>
                    <td className="p-4 border border-border text-muted-foreground">{inv.stage}</td>
                    <td className="p-4 border border-border text-muted-foreground">{inv.pros}</td>
                    <td className="p-4 border border-border text-muted-foreground">{inv.cons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Notable Indian Investors by Stage</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium text-primary mb-2">Pre-Seed / Angels</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {indianInvestors.angels.map((inv, i) => (
                    <li key={i}>{inv.name} ({inv.typical_check})</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-primary mb-2">Seed Funds</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {indianInvestors.seedFunds.map((inv, i) => (
                    <li key={i}>{inv.name} ({inv.typical_check})</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-primary mb-2">Series A+</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {indianInvestors.seriesA.map((inv, i) => (
                    <li key={i}>{inv.name} ({inv.typical_check})</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Funding Instruments</h2>
          
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-foreground">iSAFE (India SAFE)</h3>
                </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="text-primary font-medium">What:</span> India-compliant version of SAFE, popularized by 100X.VC</li>
                <li><span className="text-primary font-medium">When:</span> Pre-seed, seed rounds</li>
                <li><span className="text-primary font-medium">Key terms:</span> Valuation cap (₹10-60Cr), discount (15-25%)</li>
                <li><span className="text-primary font-medium">Pros:</span> Simple, fast, no interest/maturity date, India-legal</li>
                <li><span className="text-primary font-medium">Cons:</span> Dilution can surprise founders at conversion</li>
              </ul>
            </div>
            
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-foreground">Convertible Note</h3>
                </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="text-primary font-medium">What:</span> Debt that converts to equity</li>
                <li><span className="text-primary font-medium">When:</span> Bridge rounds, early stage</li>
                <li><span className="text-primary font-medium">Key terms:</span> Interest rate (12-18%), maturity date, cap, discount</li>
                <li><span className="text-primary font-medium">Pros:</span> Familiar to traditional investors</li>
                <li><span className="text-primary font-medium">Cons:</span> More complex, accrues interest, maturity pressure</li>
              </ul>
            </div>
            
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-foreground">Priced Round (Preferred Stock)</h3>
                </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="text-primary font-medium">What:</span> Equity at a set price per share via SHA (Shareholders Agreement)</li>
                <li><span className="text-primary font-medium">When:</span> Series A and beyond</li>
                <li><span className="text-primary font-medium">Key terms:</span> Valuation, liquidation preferences, board seats</li>
                <li><span className="text-primary font-medium">Pros:</span> Clear ownership, standard terms</li>
                <li><span className="text-primary font-medium">Cons:</span> Expensive legal (₹5-15L), complex negotiation</li>
              </ul>
            </div>
            
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Banknote className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-foreground">Venture Debt</h3>
                </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="text-primary font-medium">What:</span> Non-dilutive loan for funded startups</li>
                <li><span className="text-primary font-medium">When:</span> Post-Series A, predictable revenue</li>
                <li><span className="text-primary font-medium">Key terms:</span> Interest (12-18%), warrants (1-5%)</li>
                <li><span className="text-primary font-medium">Pros:</span> Extends runway 3-6 months without equity dilution</li>
                <li><span className="text-primary font-medium">Cons:</span> Must repay, requires revenue traction</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Understanding Term Sheets</h2>
          <p className="text-muted-foreground">
            A term sheet is a non-binding document outlining the key terms of an investment. 
            Here are the terms that matter most for Indian founders:
          </p>

          <DataTable 
            headers={termSheetTerms[0] as string[]}
            rows={termSheetTerms.slice(1) as string[][]}
          />

          <FormulaBox
            title="Pre-Money vs Post-Money Valuation"
            formula="Post-Money = Pre-Money + Investment Amount"
            example="₹30 Cr pre-money + ₹10 Cr investment = ₹40 Cr post-money. Investor owns ₹10Cr/₹40Cr = 25%"
          />

          <FormulaBox
            title="iSAFE Conversion (with cap and discount)"
            formula="Conversion Price = MIN(Cap ÷ Pre-Money Shares, Round Price × (1 - Discount))"
            example="₹20 Cr cap, 20% discount, ₹50 Cr Series A. Cap: ₹20Cr/₹50Cr = 0.4x. Discount: 1 × 0.8 = 0.8x. Use cap price (lower = more shares for investor)"
          />

          <Callout type="warning" title="Watch Out For These Terms">
            <ul className="space-y-1 text-sm mt-2">
              <li><strong>Participating Preferred:</strong> Double-dipping. Push for 1x non-participating instead.</li>
              <li><strong>Full Ratchet Anti-dilution:</strong> Toxic term. Insist on Broad-Based Weighted Average.</li>
              <li><strong>Super Pro-Rata:</strong> Lets investor take more than their ownership % in future rounds.</li>
            </ul>
          </Callout>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">The 16-Week Fundraising Timeline</h2>
          
          <TimelineChart
            title="Typical Series A Timeline (India)"
            events={[
              { date: "Weeks 1-4", title: "Preparation", description: "Pitch deck, financial model, data room. Dream 50 investor list.", type: "milestone" },
              { date: "Weeks 5-10", title: "Roadshow", description: "Warm intros, initial meetings. Target 50+ conversations. Create FOMO.", type: "milestone" },
              { date: "Weeks 11-13", title: "Partner Meetings", description: "Deep dives with interested firms. Customer calls. Metric grilling.", type: "milestone" },
              { date: "Week 14", title: "Term Sheet", description: "Receive and negotiate term sheets. Legal review.", type: "funding" },
              { date: "Week 15", title: "Due Diligence", description: "Legal, financial, MCA compliance check. Customer references.", type: "milestone" },
              { date: "Week 16", title: "Close", description: "SHA signing, wire transfer, announcement.", type: "funding" },
            ]}
          />

          <Callout type="tip" title="Running a Tight Process">
            Create urgency by running a parallel process. Meet multiple investors simultaneously, 
            set clear timelines, and be willing to walk away. The best leverage is multiple 
            interested parties. Warm intros have 5x better response rate than cold emails.
          </Callout>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Pitch Deck Essentials</h2>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">The 10-Slide Framework</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { num: 1, title: "Title/Hook", desc: "One-liner (e.g., 'Salesforce for Indian Agencies')" },
                { num: 2, title: "Problem", desc: "Quantified pain point your ICP faces" },
                { num: 3, title: "Solution", desc: "Product screenshots, not just description" },
                { num: 4, title: "Market", desc: "Bottom-up TAM/SAM/SOM in India + Global" },
                { num: 5, title: "Product", desc: "Demo, key features, secret sauce" },
                { num: 6, title: "Traction", desc: "Revenue, users, growth rate, LOIs" },
                { num: 7, title: "Business Model", desc: "Pricing tiers, unit economics" },
                { num: 8, title: "Competition", desc: "2x2 matrix showing differentiation" },
                { num: 9, title: "Team", desc: "Founder-market fit, relevant experience" },
                { num: 10, title: "Ask", desc: "Amount (₹), use of funds, 18-mo milestones" },
              ].map((slide) => (
                <div key={slide.num} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium shrink-0">
                    {slide.num}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{slide.title}</div>
                    <div className="text-sm text-muted-foreground">{slide.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Red Flags Investors Watch For</h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard title="Team Red Flags" icon={<Users className="w-5 h-5" />} variant="warning">
                <ul className="space-y-1 text-sm">
                  <li>• Solo founder (for some investors)</li>
                  <li>• Co-founder conflicts or recent departures</li>
                  <li>• No domain expertise in the problem space</li>
                  <li>• Not full-time committed</li>
                </ul>
              </InfoCard>
            
              <InfoCard title="Market Red Flags" icon={<TrendingUp className="w-5 h-5" />} variant="warning">
                <ul className="space-y-1 text-sm">
                  <li>• TAM too small ({`<`}₹8,000 Cr / $1B)</li>
                  <li>• Declining or saturated market</li>
                  <li>• Winner-take-all already taken</li>
                  <li>• Heavy regulation without expertise</li>
                </ul>
              </InfoCard>
            
              <InfoCard title="Product Red Flags" icon={<Wrench className="w-5 h-5" />} variant="warning">
                <ul className="space-y-1 text-sm">
                  <li>• No differentiation from competitors</li>
                  <li>• Easily replicable by incumbents</li>
                  <li>• Tech risk without mitigation plan</li>
                  <li>• Product not being actively used</li>
                </ul>
              </InfoCard>
            
              <InfoCard title="Financial Red Flags" icon={<IndianRupee className="w-5 h-5" />} variant="warning">
                <ul className="space-y-1 text-sm">
                  <li>• Unrealistic hockey-stick projections</li>
                  <li>• No understanding of unit economics</li>
                  <li>• Messy cap table or dead equity</li>
                  <li>• Compliance gaps (GST, MCA, SOFTEX)</li>
                </ul>
              </InfoCard>
            </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-border">
          <Link href="/idea-to-product" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Idea to Product
          </Link>
          <Link href="/financial-metrics" className="text-primary hover:text-primary/80 transition-colors">
            Financial Metrics →
          </Link>
        </div>
      </div>
    </HandbookLayout>
  );
}

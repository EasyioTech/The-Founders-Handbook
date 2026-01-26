import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { Callout, DataTable, FormulaBox, InfoCard, ProgressBar } from "@/components/handbook/UIComponents";
import { BarChart, LineChart, PieChart } from "@/components/handbook/Charts";
import { indianSaaSBenchmarks } from "@/lib/handbook-data";
import Link from "next/link";

const unitEconomicsExample = [
  { label: "Revenue", value: 100 },
  { label: "COGS", value: 25 },
  { label: "Gross Profit", value: 75 },
  { label: "CAC", value: 20 },
  { label: "Net Margin", value: 55 },
];

const saasMetricsBenchmarks = [
  ["Metric", "Poor", "Okay", "Good", "Excellent"],
  ["LTV:CAC Ratio", "<1:1", "1:1 - 2:1", "3:1 - 4:1", ">5:1"],
  ["Gross Margin", "<60%", "60-70%", "70-80%", ">80%"],
  ["Monthly Churn", ">5%", "3-5%", "1-3%", "<1%"],
  ["Net Revenue Retention", "<90%", "90-100%", "100-120%", ">120%"],
  ["CAC Payback (months)", ">24", "18-24", "12-18", "<12"],
  ["Burn Multiple", ">3x", "2-3x", "1.5-2x", "<1.5x"],
];

const burnRateData = [
  { x: "Jan", y: 40000000 },
  { x: "Feb", y: 38000000 },
  { x: "Mar", y: 35500000 },
  { x: "Apr", y: 32800000 },
  { x: "May", y: 29600000 },
  { x: "Jun", y: 26000000 },
  { x: "Jul", y: 22000000 },
  { x: "Aug", y: 17600000 },
  { x: "Sep", y: 12800000 },
  { x: "Oct", y: 7600000 },
  { x: "Nov", y: 2000000 },
  { x: "Dec", y: 0 },
];

const expenseBreakdown = [
  { label: "Engineering", value: 45 },
  { label: "Sales & Marketing", value: 25 },
  { label: "Operations", value: 15 },
  { label: "G&A", value: 10 },
  { label: "Other", value: 5 },
];

export default function FinancialMetricsPage() {
  return (
    <HandbookLayout currentSection="financial-metrics">
      <div className="space-y-12">
        <header className="space-y-4">
          <div className="text-sm text-primary font-medium">Chapter 3</div>
          <h1 className="font-display text-4xl text-foreground">
            Financial Metrics & Formulas
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The key metrics every Indian SaaS founder must understand to build a sustainable 
            business and communicate effectively with investors.
          </p>
        </header>

        <Callout type="important" title="Why Metrics Matter">
          Investors speak the language of finance. Your ability to articulate these metrics 
          is a direct proxy for your competency. In 2025&apos;s &quot;Efficient Growth&quot; era, 
          investors demand robust unit economics from the earliest stages.
        </Callout>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Customer Acquisition Metrics</h2>
          
          <FormulaBox
            title="Customer Acquisition Cost (CAC)"
            formula="CAC = Total Sales & Marketing Spend ÷ New Customers Acquired"
            example="₹40 Lakhs marketing spend ÷ 100 new customers = ₹40,000 CAC"
          >
            <div className="mt-4 text-sm text-muted-foreground">
              <strong>What it tells you:</strong> How much you spend to acquire each customer. 
              Lower is generally better, but too low might mean underinvestment in growth.
            </div>
          </FormulaBox>

          <FormulaBox
            title="Blended CAC vs. Paid CAC"
            formula="Blended CAC = All S&M Costs ÷ All New Customers | Paid CAC = Paid Acquisition Costs ÷ Paid-Acquired Customers"
            example="Blended: ₹40L ÷ 100 = ₹40K | Paid: ₹32L ÷ 60 = ₹53K"
          >
            <div className="mt-4 text-sm text-muted-foreground">
              <strong>Why both matter:</strong> Blended CAC includes organic growth. 
              Paid CAC shows true cost of scalable acquisition channels.
            </div>
          </FormulaBox>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard title="CAC by Channel (India)" icon="📊" variant="info">
              <ul className="space-y-1 text-sm">
                <li>Paid Ads (Google/Meta): ₹5K-₹50K+</li>
                <li>Content Marketing: ₹8K-₹25K (longer payoff)</li>
                <li>Referrals: ₹2K-₹10K (lowest typically)</li>
                <li>Outbound Sales: ₹40K-₹1.5L+ (B2B enterprise)</li>
              </ul>
            </InfoCard>
            
            <InfoCard title="When CAC Is Healthy" icon="✓" variant="success">
              <ul className="space-y-1 text-sm">
                <li>CAC {"<"} 1/3 of LTV</li>
                <li>Payback period {"<"} 12 months</li>
                <li>Trending down over time</li>
                <li>Consistent across channels</li>
              </ul>
            </InfoCard>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Revenue Metrics</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormulaBox
              title="Monthly Recurring Revenue (MRR)"
              formula="MRR = Sum of Monthly Subscription Revenue"
              example="100 customers × ₹8,000/month = ₹8 Lakhs MRR"
            />
            
            <FormulaBox
              title="Annual Recurring Revenue (ARR)"
              formula="ARR = MRR × 12"
              example="₹8L MRR × 12 = ₹96 Lakhs ARR (~$115K)"
            />
          </div>

          <FormulaBox
            title="Annual Contract Value (ACV)"
            formula="ACV = Total Contract Value ÷ Contract Years"
            example="3-year contract worth ₹36 Lakhs → ACV = ₹12 Lakhs/year"
          >
            <div className="mt-4 text-sm text-muted-foreground">
              <strong>ACV vs ARR:</strong> ACV is per-contract average. ARR is total recurring revenue. 
              A company with 100 customers at ₹12L ACV has ₹12 Cr ARR.
            </div>
          </FormulaBox>

          <FormulaBox
            title="Average Revenue Per User (ARPU)"
            formula="ARPU = Total Revenue ÷ Number of Users"
            example="₹10 Lakhs revenue ÷ 125 users = ₹8,000 ARPU"
          />

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">MRR Components</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-display text-primary">+</div>
                <div className="font-medium text-foreground">New MRR</div>
                <div className="text-xs text-muted-foreground">From new customers</div>
              </div>
              <div className="text-center p-4 bg-chart-2/10 rounded-lg">
                <div className="text-2xl font-display text-chart-2">+</div>
                <div className="font-medium text-foreground">Expansion MRR</div>
                <div className="text-xs text-muted-foreground">Upsells & upgrades</div>
              </div>
              <div className="text-center p-4 bg-chart-3/10 rounded-lg">
                <div className="text-2xl font-display text-chart-3">−</div>
                <div className="font-medium text-foreground">Contraction MRR</div>
                <div className="text-xs text-muted-foreground">Downgrades</div>
              </div>
              <div className="text-center p-4 bg-destructive/10 rounded-lg">
                <div className="text-2xl font-display text-destructive">−</div>
                <div className="font-medium text-foreground">Churned MRR</div>
                <div className="text-xs text-muted-foreground">Lost customers</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <div className="font-mono text-sm text-center">
                Net New MRR = New + Expansion − Contraction − Churn
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Lifetime Value (LTV)</h2>

          <FormulaBox
            title="Customer Lifetime Value (Basic)"
            formula="LTV = ARPU × Average Customer Lifespan"
            example="₹8,000/month × 24 months = ₹1.92 Lakhs LTV"
          />

          <FormulaBox
            title="LTV (with Churn)"
            formula="LTV = ARPU ÷ Monthly Churn Rate"
            example="₹8,000/month ÷ 5% churn = ₹1.6 Lakhs LTV"
          >
            <div className="mt-4 text-sm text-muted-foreground">
              This assumes consistent churn. For more accuracy, use cohort analysis.
            </div>
          </FormulaBox>

          <FormulaBox
            title="LTV (with Gross Margin)"
            formula="LTV = (ARPU × Gross Margin) ÷ Monthly Churn Rate"
            example="(₹8,000 × 75%) ÷ 5% = ₹1.2 Lakhs GM-Adjusted LTV"
          />

          <FormulaBox
            title="LTV:CAC Ratio"
            formula="LTV:CAC = Customer Lifetime Value ÷ Customer Acquisition Cost"
            example="₹1.92L LTV ÷ ₹48K CAC = 4:1 ratio"
          >
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-destructive/10 rounded-lg">
                <div className="font-display text-lg text-destructive">{`<`}1:1</div>
                <div className="text-xs text-muted-foreground">Losing money</div>
              </div>
              <div className="text-center p-3 bg-chart-3/10 rounded-lg">
                <div className="font-display text-lg text-chart-3">1:1 - 3:1</div>
                <div className="text-xs text-muted-foreground">Needs improvement</div>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="font-display text-lg text-primary">{`>`}3:1</div>
                <div className="text-xs text-muted-foreground">Healthy</div>
              </div>
            </div>
          </FormulaBox>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Burn Rate & Runway</h2>

          <LineChart 
            data={burnRateData}
            title="Cash Runway Example: ₹4 Cr Starting Balance, ₹36 Lakhs Monthly Burn"
            height={200}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormulaBox
              title="Burn Rate"
              formula="Monthly Burn = Monthly Expenses − Monthly Revenue"
              example="₹65L expenses − ₹25L revenue = ₹40L net burn"
            />
            
            <FormulaBox
              title="Runway"
              formula="Runway (months) = Cash Balance ÷ Monthly Burn Rate"
              example="₹4.8 Cr cash ÷ ₹40L burn = 12 months runway"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormulaBox
              title="Gross Burn"
              formula="Gross Burn = Total Monthly Operating Expenses"
              example="Salaries + Rent + Marketing + Tools = ₹65L gross burn"
            />
            
            <FormulaBox
              title="Net Burn"
              formula="Net Burn = Gross Burn − Revenue"
              example="₹65L gross burn − ₹25L revenue = ₹40L net burn"
            />
          </div>

          <Callout type="warning" title="The 6-Month Rule">
            Start fundraising when you have 6+ months of runway. It typically takes 
            3-6 months to close a round. Running out of money kills your negotiating power.
            Investors in 2025 expect 18-24 months runway post-funding.
          </Callout>

          <PieChart 
            data={expenseBreakdown}
            title="Typical Early-Stage Indian SaaS Expense Breakdown"
          />
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Retention & Churn</h2>

          <FormulaBox
            title="Customer Churn Rate"
            formula="Churn Rate = (Customers Lost ÷ Starting Customers) × 100"
            example="(10 churned ÷ 200 starting) × 100 = 5% monthly churn"
          />

          <FormulaBox
            title="Revenue Churn Rate"
            formula="Revenue Churn = (MRR Lost ÷ Starting MRR) × 100"
            example="(₹50K lost ÷ ₹10L starting) × 100 = 5% revenue churn"
          />

          <FormulaBox
            title="Net Revenue Retention (NRR)"
            formula="NRR = ((Starting MRR + Expansion − Contraction − Churn) ÷ Starting MRR) × 100"
            example="((₹10L + ₹1.5L − ₹30K − ₹50K) ÷ ₹10L) × 100 = 107% NRR"
          >
            <div className="mt-4 text-sm text-muted-foreground">
              <strong>Why NRR matters:</strong> NRR {`>`} 100% means you grow even without new customers. 
              Top Indian SaaS companies target 110%+ NRR.
            </div>
          </FormulaBox>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Retention Benchmarks by Segment</h3>
            <div className="space-y-4">
              <ProgressBar label="Enterprise SaaS" value={95} color="primary" />
              <ProgressBar label="Mid-Market SaaS" value={90} color="chart-2" />
              <ProgressBar label="SMB SaaS" value={80} color="chart-3" />
              <ProgressBar label="Consumer Subscription" value={65} color="chart-4" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">Annual retention rates (100% - annual churn)</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Unit Economics</h2>

          <BarChart 
            data={unitEconomicsExample}
            title="Unit Economics Waterfall (per ₹100 revenue)"
            valuePrefix="₹"
          />

          <FormulaBox
            title="Gross Margin"
            formula="Gross Margin = ((Revenue − COGS) ÷ Revenue) × 100"
            example="((₹100 − ₹25) ÷ ₹100) × 100 = 75% gross margin"
          />

          <FormulaBox
            title="Contribution Margin"
            formula="Contribution Margin = Revenue − Variable Costs"
            example="₹100 revenue − ₹40 variable costs = ₹60 contribution margin"
          />

          <FormulaBox
            title="CAC Payback Period"
            formula="Payback = CAC ÷ (ARPU × Gross Margin)"
            example="₹48K CAC ÷ (₹8K × 75%) = 8 months payback"
          />

          <FormulaBox
            title="Burn Multiple"
            formula="Burn Multiple = Net Burn ÷ Net New ARR"
            example="₹40L burn ÷ ₹25L net new ARR = 1.6x burn multiple"
          >
            <div className="mt-4 text-sm text-muted-foreground">
              <strong>2025 Standard:</strong> Best-in-class Indian SaaS targets {`<`}1.5x burn multiple. 
              This means spending less than ₹1.50 to generate ₹1 of new ARR.
            </div>
          </FormulaBox>

          <Callout type="info" title="The Rule of 40">
            Revenue Growth % + Profit Margin % should exceed 40% for healthy SaaS companies.
            A company growing 60% with -15% margin = 45% (healthy). 
            Growing 30% with -20% margin = 10% (needs work).
          </Callout>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">2025 Indian SaaS Benchmarks</h2>

          <DataTable 
            headers={saasMetricsBenchmarks[0] as string[]}
            rows={saasMetricsBenchmarks.slice(1) as string[][]}
          />

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Key Benchmarks from Indian SaaS Report</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {indianSaaSBenchmarks.metrics.map((item, i) => (
                <div key={i} className="p-4 bg-secondary rounded-lg">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-foreground">{item.metric}</span>
                    <span className="text-primary font-display">{item.benchmark}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.context}</p>
                </div>
              ))}
            </div>
          </div>

          <Callout type="tip" title="Context Matters">
            These benchmarks vary by stage, industry, and go-to-market (domestic vs US). 
            Early-stage companies often have worse metrics that improve over time. 
            Compare yourself to similar companies at similar stages.
          </Callout>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Metrics Dashboard Example</h2>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-6">Monthly Metrics Snapshot (Seed Stage)</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-sm text-muted-foreground">MRR</div>
                <div className="text-2xl font-display text-foreground">₹10.2L</div>
                <div className="text-xs text-primary">+12% MoM</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-sm text-muted-foreground">Customers</div>
                <div className="text-2xl font-display text-foreground">128</div>
                <div className="text-xs text-primary">+18 new</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-sm text-muted-foreground">CAC</div>
                <div className="text-2xl font-display text-foreground">₹38K</div>
                <div className="text-xs text-primary">-8% MoM</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-sm text-muted-foreground">Churn</div>
                <div className="text-2xl font-display text-foreground">2.4%</div>
                <div className="text-xs text-chart-3">+0.3% MoM</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-sm text-muted-foreground">LTV:CAC</div>
                <div className="text-2xl font-display text-foreground">4.2:1</div>
                <div className="text-xs text-primary">Healthy</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-sm text-muted-foreground">NRR</div>
                <div className="text-2xl font-display text-foreground">108%</div>
                <div className="text-xs text-primary">Expanding</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-sm text-muted-foreground">Runway</div>
                <div className="text-2xl font-display text-foreground">14 mo</div>
                <div className="text-xs text-muted-foreground">₹5.4Cr cash</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-sm text-muted-foreground">Burn Multiple</div>
                <div className="text-2xl font-display text-foreground">1.8x</div>
                <div className="text-xs text-muted-foreground">₹38.5L net burn</div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-border">
          <Link href="/funding-stages" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Funding Stages
          </Link>
          <Link href="/calculators" className="text-primary hover:text-primary/80 transition-colors">
            Calculators →
          </Link>
        </div>
      </div>
    </HandbookLayout>
  );
}

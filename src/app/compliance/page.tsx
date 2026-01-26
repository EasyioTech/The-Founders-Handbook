"use client";

import { useState } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { InfoCard, Callout, DataTable, StageCard } from "@/components/handbook/UIComponents";
import { TimelineChart } from "@/components/handbook/Charts";

const incorporationTimeline = [
  { 
    date: "Week 1-2", 
    title: "Company Incorporation", 
    description: "Register Private Limited company with MCA, get CIN", 
    type: "milestone" as const,
    status: "completed" as const,
    details: [
      "Choose unique company name and check availability on MCA portal",
      "Get DSC (Digital Signature Certificate) for all directors",
      "Apply for DIN (Director Identification Number)",
      "Draft MOA (Memorandum of Association) and AOA (Articles of Association)",
      "File SPICe+ form with MCA and pay registration fees (₹8,000-15,000)",
      "Receive Certificate of Incorporation with CIN within 7-15 days"
    ]
  },
  { 
    date: "Week 2-3", 
    title: "PAN & TAN", 
    description: "Obtain PAN and TAN for the company", 
    type: "milestone" as const,
    status: "completed" as const,
    details: [
      "PAN is automatically issued with SPICe+ incorporation",
      "Apply for TAN separately for TDS compliance",
      "Keep both documents handy for bank account opening"
    ]
  },
  { 
    date: "Week 3-4", 
    title: "Bank Account", 
    description: "Open current account with documents", 
    type: "milestone" as const,
    status: "current" as const,
    details: [
      "Prepare: CIN, PAN, AOA/MOA, Board Resolution for account opening",
      "Choose startup-friendly banks: RazorpayX, Open, ICICI Startup",
      "Consider multi-currency account if planning international revenue",
      "Set up UPI, payment gateway integration early"
    ]
  },
  { 
    date: "Week 4-6", 
    title: "GST Registration", 
    description: "Register for GST if turnover threshold met", 
    type: "milestone" as const,
    status: "upcoming" as const,
    details: [
      "Mandatory if turnover exceeds ₹40L (goods) or ₹20L (services)",
      "Voluntary registration available for B2B credibility",
      "File LUT (Letter of Undertaking) for zero-rated software exports",
      "Set up GST compliance calendar: GSTR-1 and GSTR-3B monthly"
    ]
  },
  { 
    date: "Month 2", 
    title: "Startup India Recognition", 
    description: "Apply for DPIIT Startup Recognition for tax benefits", 
    type: "funding" as const,
    status: "upcoming" as const,
    details: [
      "Apply online at startupindia.gov.in with business description",
      "Unlock 3-year tax holiday under Section 80-IAC",
      "Get Angel Tax exemption for fundraising",
      "Self-certification for 9 labor and environmental laws",
      "80% rebate on patent filing fees"
    ]
  },
  { 
    date: "Month 2-3", 
    title: "IP & Legal Framework", 
    description: "Trademark, employment agreements, NDAs", 
    type: "product" as const,
    status: "upcoming" as const,
    details: [
      "File trademark application for brand name and logo (₹4,500-9,000)",
      "Draft standard employment agreement with IP assignment clause",
      "Create NDA template for partners, vendors, contractors",
      "Set up ESOP scheme if planning employee equity grants",
      "Prepare standard customer contract templates"
    ]
  },
];

const complianceCategories = [
  { id: "incorporation", label: "Incorporation" },
  { id: "tax", label: "Tax & GST" },
  { id: "forex", label: "Forex & FEMA" },
  { id: "employment", label: "Employment" },
  { id: "data", label: "Data & Privacy" },
  { id: "funding", label: "Funding Docs" },
];

export default function CompliancePage() {
  const [activeCategory, setActiveCategory] = useState("incorporation");

  return (
    <HandbookLayout currentSection="compliance">
      <div className="space-y-10">
        <header>
          <h1 className="font-display text-4xl text-foreground">Compliance & Legal</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
            Essential legal framework for Indian startups — from incorporation to 
            funding compliance. Stay compliant, avoid costly mistakes.
          </p>
        </header>

        <Callout type="warning" title="Not Legal Advice">
          This guide provides general information. Always consult qualified CA/CS professionals 
          for your specific situation. Regulations change frequently — verify current requirements.
        </Callout>

        <section>
          <h2 className="font-display text-2xl text-foreground mb-6">Incorporation Timeline</h2>
          <TimelineChart events={incorporationTimeline} />
        </section>

        <section>
          <h2 className="font-display text-2xl text-foreground mb-6">Compliance by Category</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {complianceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {activeCategory === "incorporation" && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg mb-4">Company Incorporation Checklist</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Pre-Registration</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex gap-2"><span>☐</span> Choose company name (check availability on MCA)</li>
                      <li className="flex gap-2"><span>☐</span> Decide on authorized capital (₹1L minimum typical)</li>
                      <li className="flex gap-2"><span>☐</span> Get DSC (Digital Signature Certificate) for directors</li>
                      <li className="flex gap-2"><span>☐</span> Obtain DIN (Director Identification Number)</li>
                      <li className="flex gap-2"><span>☐</span> Draft MOA & AOA</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Post-Registration</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex gap-2"><span>☐</span> Receive Certificate of Incorporation (CIN)</li>
                      <li className="flex gap-2"><span>☐</span> Apply for PAN & TAN</li>
                      <li className="flex gap-2"><span>☐</span> Open bank account with CIN, PAN, AOA</li>
                      <li className="flex gap-2"><span>☐</span> Issue share certificates</li>
                      <li className="flex gap-2"><span>☐</span> Maintain statutory registers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <DataTable 
                headers={["Document", "Purpose", "Cost (Approx)", "Timeline"]}
                rows={[
                  ["Private Limited Registration", "Legal entity creation", "₹8,000 - 15,000", "7-15 days"],
                  ["PAN Application", "Tax identification", "₹100 - 500", "3-7 days"],
                  ["TAN Application", "TDS deduction", "₹65", "3-7 days"],
                  ["DSC (Class 3)", "Digital signatures", "₹1,500 - 3,000 each", "1-2 days"],
                  ["Trademark (TM)", "Brand protection", "₹4,500 - 9,000", "6-12 months"],
                ]}
              />
            </div>
          )}

          {activeCategory === "tax" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="GST Compliance" icon="📋" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Registration threshold:</span> ₹40L (goods), ₹20L (services)</li>
                    <li><span className="font-medium">Returns:</span> GSTR-1 (monthly), GSTR-3B (monthly)</li>
                    <li><span className="font-medium">Software exports:</span> Zero-rated, file LUT for refund</li>
                    <li><span className="font-medium">Deadline:</span> GSTR-3B by 20th of next month</li>
                  </ul>
                </InfoCard>

                <InfoCard title="Income Tax" icon="🏛️" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Corporate tax:</span> 25% (turnover &lt; ₹400 Cr)</li>
                    <li><span className="font-medium">Startup exemption:</span> 80-IAC (3 years tax holiday)</li>
                    <li><span className="font-medium">Angel Tax:</span> Exemption for DPIIT registered</li>
                    <li><span className="font-medium">Advance tax:</span> Quarterly if liability &gt; ₹10,000</li>
                  </ul>
                </InfoCard>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg mb-4">Annual Tax Compliance Calendar</h3>
                <DataTable 
                  headers={["Due Date", "Compliance", "Applicable To"]}
                  rows={[
                    ["15th June/Sept/Dec/Mar", "Advance Tax Installments", "If tax liability > ₹10,000"],
                    ["31st July", "Income Tax Return (non-audit)", "Companies without audit"],
                    ["30th September", "Tax Audit Report", "Turnover > ₹1 Cr (business)"],
                    ["31st October", "Income Tax Return (audit cases)", "Companies requiring audit"],
                    ["30th November", "Transfer Pricing Report", "International transactions"],
                  ]}
                />
              </div>

              <Callout type="tip" title="Startup India Tax Benefits">
                DPIIT-recognized startups can claim: (1) 3-year tax holiday under 80-IAC, (2) Angel Tax 
                exemption, (3) Carry forward losses for 10 years, (4) Self-certification for labor laws.
              </Callout>
            </div>
          )}

          {activeCategory === "forex" && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg mb-4">FEMA & Foreign Investment Compliance</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Critical for startups receiving foreign investment or earning foreign revenue.
                </p>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="font-medium text-foreground mb-2">Foreign Investment (Receiving)</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex gap-2"><span>☐</span> FC-GPR filing within 30 days of allotment</li>
                      <li className="flex gap-2"><span>☐</span> KYC of foreign investor</li>
                      <li className="flex gap-2"><span>☐</span> Valuation report from CA (DCF method)</li>
                      <li className="flex gap-2"><span>☐</span> Share certificates to non-resident</li>
                      <li className="flex gap-2"><span>☐</span> Annual Return on Foreign Liabilities (FLA)</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-2">Export Proceeds (SaaS Revenue)</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex gap-2"><span>☐</span> SOFTEX filing for software exports</li>
                      <li className="flex gap-2"><span>☐</span> FIRC (Foreign Inward Remittance Certificate)</li>
                      <li className="flex gap-2"><span>☐</span> Realize proceeds within 9 months</li>
                      <li className="flex gap-2"><span>☐</span> eBRC generation for GST refund</li>
                    </ul>
                  </div>
                </div>
              </div>

              <DataTable 
                headers={["Filing", "When Required", "Deadline", "Penalty"]}
                rows={[
                  ["FC-GPR", "Foreign investment received", "30 days from allotment", "Up to 3x investment"],
                  ["FC-TRS", "Transfer of shares to/from NR", "60 days from transfer", "Compounding fee"],
                  ["FLA Return", "Foreign liability/investment", "15th July annually", "Late fee applicable"],
                  ["SOFTEX", "Software export proceeds", "Before realization", "Export proceeds blocked"],
                  ["ODI Forms", "Overseas investment", "Within 30 days", "Varies by violation"],
                ]}
              />

              <Callout type="important" title="Flip Structure Warning">
                Many Indian SaaS companies &quot;flip&quot; to US/Singapore holding structures for easier VC fundraising. 
                This requires RBI approval, tax planning (capital gains), and ongoing compliance in multiple jurisdictions.
              </Callout>
            </div>
          )}

          {activeCategory === "employment" && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg mb-4">Employment Compliance</h3>
                
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="font-medium text-foreground mb-2">PF (Provident Fund)</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Mandatory if 20+ employees</li>
                      <li>• 12% employer + 12% employee</li>
                      <li>• Monthly filing by 15th</li>
                      <li>• Annual return by April 30</li>
                    </ul>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="font-medium text-foreground mb-2">ESI (Health Insurance)</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Mandatory if 10+ employees</li>
                      <li>• For salary ≤ ₹21,000/month</li>
                      <li>• 3.25% employer + 0.75% employee</li>
                      <li>• Monthly contribution</li>
                    </ul>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="font-medium text-foreground mb-2">Professional Tax</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• State-specific (varies)</li>
                      <li>• Max ₹2,500/year</li>
                      <li>• Deducted from salary</li>
                      <li>• Monthly/annual filing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg mb-4">Essential Employment Documents</h3>
                <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span>☐</span> Employment Agreement (with IP assignment)</li>
                  <li className="flex gap-2"><span>☐</span> NDA / Confidentiality Agreement</li>
                  <li className="flex gap-2"><span>☐</span> ESOP Agreement (if applicable)</li>
                  <li className="flex gap-2"><span>☐</span> Background Verification Policy</li>
                  <li className="flex gap-2"><span>☐</span> Leave Policy Document</li>
                  <li className="flex gap-2"><span>☐</span> Anti-Harassment Policy (POSH)</li>
                  <li className="flex gap-2"><span>☐</span> Remote Work Policy</li>
                  <li className="flex gap-2"><span>☐</span> IT & Data Security Policy</li>
                </ul>
              </div>

              <Callout type="warning" title="POSH Compliance">
                Companies with 10+ employees MUST constitute an Internal Complaints Committee (ICC) 
                and file annual POSH report with District Officer. Non-compliance = ₹50,000 fine.
              </Callout>
            </div>
          )}

          {activeCategory === "data" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard title="DPDP Act 2023" icon="🔐" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Consent:</span> Explicit consent for personal data</li>
                    <li><span className="font-medium">Notice:</span> Clear privacy notice required</li>
                    <li><span className="font-medium">Rights:</span> Access, correction, erasure</li>
                    <li><span className="font-medium">Penalty:</span> Up to ₹250 Cr for violations</li>
                  </ul>
                </InfoCard>

                <InfoCard title="GDPR (for EU customers)" icon="🇪🇺" variant="info">
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">Applies if:</span> EU customers or data subjects</li>
                    <li><span className="font-medium">DPA:</span> Data Processing Agreement needed</li>
                    <li><span className="font-medium">SCCs:</span> Standard Contractual Clauses</li>
                    <li><span className="font-medium">Penalty:</span> Up to 4% global revenue</li>
                  </ul>
                </InfoCard>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg mb-4">Data Compliance Checklist</h3>
                <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span>☐</span> Privacy Policy on website</li>
                  <li className="flex gap-2"><span>☐</span> Cookie consent banner (if applicable)</li>
                  <li className="flex gap-2"><span>☐</span> Data Processing Agreement template</li>
                  <li className="flex gap-2"><span>☐</span> Data breach response plan</li>
                  <li className="flex gap-2"><span>☐</span> Data retention policy</li>
                  <li className="flex gap-2"><span>☐</span> Employee data handling training</li>
                  <li className="flex gap-2"><span>☐</span> Subprocessor list maintained</li>
                  <li className="flex gap-2"><span>☐</span> SOC 2 Type II (for enterprise sales)</li>
                </ul>
              </div>

              <Callout type="tip" title="SOC 2 for Enterprise Sales">
                US enterprise customers increasingly require SOC 2 Type II certification. 
                Budget ₹10-25L and 6-12 months for first-time certification. Start early if targeting enterprise.
              </Callout>
            </div>
          )}

          {activeCategory === "funding" && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-lg mb-4">Funding Documentation</h3>
                
                <StageCard number={1} title="iSAFE / SAFE" subtitle="Pre-Seed / Seed">
                  <ul className="text-sm space-y-1">
                    <li>• iSAFE Agreement (India-specific SAFE)</li>
                    <li>• Board Resolution for iSAFE issuance</li>
                    <li>• KYC documents of investors</li>
                    <li>• Valuation cap documentation</li>
                  </ul>
                </StageCard>

                <StageCard number={2} title="Priced Equity Round" subtitle="Seed / Series A+">
                  <ul className="text-sm space-y-1">
                    <li>• Term Sheet (non-binding)</li>
                    <li>• Share Subscription Agreement (SSA)</li>
                    <li>• Shareholders Agreement (SHA)</li>
                    <li>• Amended & Restated AOA</li>
                    <li>• Valuation Report (DCF method, CA certified)</li>
                    <li>• Due diligence documents</li>
                  </ul>
                </StageCard>
              </div>

              <DataTable 
                headers={["Document", "Purpose", "Who Prepares"]}
                rows={[
                  ["Term Sheet", "Key deal terms (non-binding)", "Lead investor / Lawyer"],
                  ["SSA", "Share issuance terms", "Company lawyer"],
                  ["SHA", "Shareholder rights & obligations", "Company lawyer"],
                  ["Valuation Report", "Fair value certification", "Chartered Accountant"],
                  ["Legal DD Report", "Legal risk assessment", "Investor lawyer"],
                  ["Financial DD Report", "Financial health check", "Investor / CA firm"],
                ]}
              />

              <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
                <h3 className="font-semibold text-lg mb-4">Post-Funding Compliance</h3>
                <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span>☐</span> FC-GPR filing (30 days)</li>
                  <li className="flex gap-2"><span>☐</span> MGT-14 (Board resolution filing)</li>
                  <li className="flex gap-2"><span>☐</span> PAS-3 (Share allotment return)</li>
                  <li className="flex gap-2"><span>☐</span> Update Register of Members</li>
                  <li className="flex gap-2"><span>☐</span> Issue Share Certificates</li>
                  <li className="flex gap-2"><span>☐</span> Update beneficial ownership</li>
                </ul>
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display text-2xl text-foreground mb-6">Startup India (DPIIT) Recognition</h2>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-3">Eligibility Criteria</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ Incorporated as Pvt Ltd, LLP, or Partnership</li>
                  <li>✓ Less than 10 years since incorporation</li>
                  <li>✓ Turnover &lt; ₹100 Cr in any financial year</li>
                  <li>✓ Working towards innovation/improvement</li>
                  <li>✓ Not formed by splitting or reconstruction</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Benefits</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ Tax exemption under 80-IAC (3 years)</li>
                  <li>✓ Angel Tax exemption</li>
                  <li>✓ Self-certification for 9 labor laws</li>
                  <li>✓ Fast-track patent examination (80% rebate)</li>
                  <li>✓ Easier public procurement eligibility</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-destructive/5 rounded-xl border border-destructive/20 p-6">
          <h2 className="font-display text-xl text-foreground mb-4">Common Compliance Mistakes to Avoid</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>❌ Not filing GST returns (even nil returns)</li>
              <li>❌ Missing FC-GPR deadline for foreign investment</li>
              <li>❌ No employment agreements with IP assignment</li>
              <li>❌ Informal founder arrangements (no SHA)</li>
            </ul>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>❌ Not maintaining statutory registers</li>
              <li>❌ Missing ROC annual filings</li>
              <li>❌ No POSH policy or ICC (10+ employees)</li>
              <li>❌ Using personal accounts for business</li>
            </ul>
          </div>
        </section>
      </div>
    </HandbookLayout>
  );
}

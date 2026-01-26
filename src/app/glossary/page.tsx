"use client";

import { useState, useMemo } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { glossaryTerms, fundingStages } from "@/lib/handbook-data";
import Link from "next/link";

const categories = {
  "Customer Metrics": ["CAC", "LTV", "LTV:CAC Ratio", "Churn Rate", "Payback Period"],
  "Revenue Metrics": ["ARR", "MRR", "ACV", "Net Revenue Retention", "Gross Margin", "Burn Multiple"],
  "Financial Planning": ["Burn Rate", "Runway", "Unit Economics"],
  "Funding & Investment": ["Pre-Money Valuation", "Post-Money Valuation", "Dilution", "SAFE", "iSAFE", "Convertible Note", "Valuation Cap", "Discount Rate", "Term Sheet", "Due Diligence"],
  "Equity & Ownership": ["Cap Table", "ESOP", "Liquidation Preference", "Pro Rata Rights", "Cliff", "Vesting", "Anti-Dilution", "Drag-Along Rights", "Tag-Along Rights"],
  "Market Analysis": ["TAM", "SAM", "SOM", "PMF", "MVP"],
  "Investors & Fundraising": ["Angel Investor", "Venture Capital", "Lead Investor", "Pitch Deck", "Traction", "Bridge Round", "Down Round"],
  "Indian Regulations": ["Private Limited Company", "GST", "SOFTEX", "FEMA", "TDS", "DTAA", "Reverse Flip"],
};

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    let terms = Object.entries(glossaryTerms);
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      terms = terms.filter(([term, data]) => 
        term.toLowerCase().includes(search) || 
        data.definition.toLowerCase().includes(search)
      );
    }
    
    if (selectedCategory) {
      const categoryTerms = categories[selectedCategory as keyof typeof categories] || [];
      terms = terms.filter(([term]) => categoryTerms.includes(term));
    }
    
    return terms.sort((a, b) => a[0].localeCompare(b[0]));
  }, [searchTerm, selectedCategory]);

  return (
    <HandbookLayout currentSection="glossary">
      <div className="space-y-8">
        <header className="space-y-4">
          <div className="text-sm text-primary font-medium">Appendix</div>
          <h1 className="font-display text-4xl text-foreground">
            Glossary of Terms
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A comprehensive reference of startup and funding terminology with 
            definitions, formulas, and examples — including India-specific terms.
          </p>
        </header>

        <div className="sticky top-0 z-10 bg-background py-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search terms (e.g., CAC, iSAFE, SOFTEX)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                !selectedCategory 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              All ({Object.keys(glossaryTerms).length})
            </button>
            {Object.entries(categories).map(([category, terms]) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {category} ({terms.length})
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No terms found matching &quot;{searchTerm}&quot;
            </div>
          ) : (
            filteredTerms.map(([term, data]) => (
              <div 
                key={term}
                id={term.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                className="bg-card rounded-xl border border-border p-6 scroll-mt-32"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{term}</h3>
                <p className="text-muted-foreground">{data.definition}</p>
                
                {data.formula && (
                  <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="text-xs text-primary font-medium mb-1">Formula</div>
                    <div className="font-mono text-sm text-foreground">{data.formula}</div>
                  </div>
                )}
                
                {data.example && (
                  <div className="mt-3 p-3 bg-secondary rounded-lg">
                    <div className="text-xs text-muted-foreground font-medium mb-1">Example</div>
                    <div className="text-sm text-foreground">{data.example}</div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <section className="bg-card rounded-xl border border-border p-6 mt-12">
          <h2 className="font-display text-xl text-foreground mb-4">Quick Reference Card</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium text-foreground mb-3">Key Formulas</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-secondary rounded font-mono">
                  CAC = S&M Spend ÷ New Customers
                </div>
                <div className="p-2 bg-secondary rounded font-mono">
                  LTV = ARPU ÷ Churn Rate
                </div>
                <div className="p-2 bg-secondary rounded font-mono">
                  Runway = Cash ÷ Burn Rate
                </div>
                <div className="p-2 bg-secondary rounded font-mono">
                  Post-Money = Pre-Money + Investment
                </div>
                <div className="p-2 bg-secondary rounded font-mono">
                  Burn Multiple = Net Burn ÷ Net New ARR
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-foreground mb-3">Key Benchmarks (India 2025)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-secondary rounded">
                  <span>LTV:CAC Ratio</span>
                  <span className="font-medium">{">"}3:1</span>
                </div>
                <div className="flex justify-between p-2 bg-secondary rounded">
                  <span>CAC Payback</span>
                  <span className="font-medium">{"<"}12 months</span>
                </div>
                <div className="flex justify-between p-2 bg-secondary rounded">
                  <span>Gross Margin (SaaS)</span>
                  <span className="font-medium">{">"}70%</span>
                </div>
                <div className="flex justify-between p-2 bg-secondary rounded">
                  <span>Burn Multiple</span>
                  <span className="font-medium">{"<"}1.5x</span>
                </div>
                <div className="flex justify-between p-2 bg-secondary rounded">
                  <span>Net Revenue Retention</span>
                  <span className="font-medium">{">"}110%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-xl text-foreground mb-4">Funding Stage Overview (India 2025)</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Stage</th>
                  <th className="text-left p-3 font-medium">Typical Amount</th>
                  <th className="text-left p-3 font-medium">Valuation</th>
                  <th className="text-left p-3 font-medium">Dilution</th>
                </tr>
              </thead>
              <tbody>
                {fundingStages.map((stage, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="p-3 font-medium">{stage.name}</td>
                    <td className="p-3 text-muted-foreground">{stage.typical_amount}</td>
                    <td className="p-3 text-muted-foreground">{stage.valuation}</td>
                    <td className="p-3 text-muted-foreground">{stage.dilution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-primary/5 rounded-xl border border-primary/20 p-6">
          <h2 className="font-display text-xl text-foreground mb-4">Acronym Reference</h2>
          
          <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-3 text-sm">
            <div><span className="font-medium">ACV</span> - Annual Contract Value</div>
            <div><span className="font-medium">ARR</span> - Annual Recurring Revenue</div>
            <div><span className="font-medium">CAC</span> - Customer Acquisition Cost</div>
            <div><span className="font-medium">COGS</span> - Cost of Goods Sold</div>
            <div><span className="font-medium">DD</span> - Due Diligence</div>
            <div><span className="font-medium">DTAA</span> - Double Taxation Avoidance Agreement</div>
            <div><span className="font-medium">ESOP</span> - Employee Stock Option Pool</div>
            <div><span className="font-medium">FEMA</span> - Foreign Exchange Management Act</div>
            <div><span className="font-medium">GST</span> - Goods and Services Tax</div>
            <div><span className="font-medium">iSAFE</span> - India Simple Agreement Future Equity</div>
            <div><span className="font-medium">LTV</span> - Lifetime Value</div>
            <div><span className="font-medium">MCA</span> - Ministry of Corporate Affairs</div>
            <div><span className="font-medium">MoM</span> - Month over Month</div>
            <div><span className="font-medium">MRR</span> - Monthly Recurring Revenue</div>
            <div><span className="font-medium">MVP</span> - Minimum Viable Product</div>
            <div><span className="font-medium">NRR</span> - Net Revenue Retention</div>
            <div><span className="font-medium">PMF</span> - Product-Market Fit</div>
            <div><span className="font-medium">RBI</span> - Reserve Bank of India</div>
            <div><span className="font-medium">SAFE</span> - Simple Agreement Future Equity</div>
            <div><span className="font-medium">SAM</span> - Serviceable Available Market</div>
            <div><span className="font-medium">SHA</span> - Shareholders Agreement</div>
            <div><span className="font-medium">SOFTEX</span> - Software Export Declaration</div>
            <div><span className="font-medium">SOM</span> - Serviceable Obtainable Market</div>
            <div><span className="font-medium">STPI</span> - Software Technology Parks of India</div>
            <div><span className="font-medium">TAM</span> - Total Addressable Market</div>
            <div><span className="font-medium">TDS</span> - Tax Deducted at Source</div>
            <div><span className="font-medium">VC</span> - Venture Capital</div>
            <div><span className="font-medium">YoY</span> - Year over Year</div>
          </div>
        </section>

        <section className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-xl text-foreground mb-4">India Compliance Quick Reference</h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-medium text-foreground mb-2">GST for SaaS</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Domestic sales: 18% GST</li>
                <li>• Exports: Zero-rated under LUT</li>
                <li>• ITC refunds available for exports</li>
              </ul>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-medium text-foreground mb-2">SOFTEX & FEMA</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• File SOFTEX for every foreign invoice</li>
                <li>• Repatriate export proceeds within 15 months</li>
                <li>• Non-compliance = frozen bank accounts</li>
              </ul>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Entity Structure</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Pvt Ltd: Standard for VC funding in India</li>
                <li>• Delaware C-Corp: For US VC / global exit</li>
                <li>• Reverse Flip: Trending for BSE/NSE IPO</li>
              </ul>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-medium text-foreground mb-2">ESOP in India</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Grant at Face Value (typically ₹10)</li>
                <li>• Unlike US FMV requirement</li>
                <li>• 4-year vest, 1-year cliff standard</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-border">
          <Link href="/dilution" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Dilution & Cap Table
          </Link>
          <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
            Back to Overview →
          </Link>
        </div>
      </div>
    </HandbookLayout>
  );
}

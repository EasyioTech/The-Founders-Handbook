"use client";

import { useState, useMemo } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { Callout, FormulaBox, DataTable } from "@/components/handbook/UIComponents";
import { PieChart } from "@/components/handbook/Charts";
import Link from "next/link";

const formatINR = (value: number, compact = false) => {
  if (compact) {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${value.toLocaleString('en-IN')}`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
};

function CapTableVisualizer() {
  const [rounds, setRounds] = useState([
    { name: "Founding", preMoney: 0, investment: 0, esop: 0 },
    { name: "Seed", preMoney: 300000000, investment: 100000000, esop: 10 },
    { name: "Series A", preMoney: 1250000000, investment: 400000000, esop: 5 },
  ]);

  const capTable = useMemo(() => {
    let founderShares = 10000000;
    const shareholders: { round: string; founders: number; investors: number; esop: number; total: number }[] = [];
    
    shareholders.push({
      round: "Founding",
      founders: 100,
      investors: 0,
      esop: 0,
      total: founderShares,
    });

    let currentInvestorShares = 0;
    let currentEsopShares = 0;
    let totalShares = founderShares;

    rounds.slice(1).forEach((round) => {
      if (round.investment > 0 && round.preMoney > 0) {
        const pricePerShare = round.preMoney / totalShares;
        const newInvestorShares = round.investment / pricePerShare;
        
        totalShares += newInvestorShares;
        currentInvestorShares += newInvestorShares;
        
        if (round.esop > 0) {
          const esopShares = (totalShares * round.esop) / (100 - round.esop);
          totalShares += esopShares;
          currentEsopShares += esopShares;
        }

        shareholders.push({
          round: round.name,
          founders: (founderShares / totalShares) * 100,
          investors: (currentInvestorShares / totalShares) * 100,
          esop: (currentEsopShares / totalShares) * 100,
          total: totalShares,
        });
      }
    });

    return shareholders;
  }, [rounds]);

  const latestCap = capTable[capTable.length - 1];
  const pieData = latestCap ? [
    { label: "Founders", value: latestCap.founders },
    { label: "Investors", value: latestCap.investors },
    { label: "ESOP", value: latestCap.esop },
  ] : [];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">Cap Table Evolution</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {rounds.slice(1).map((round, index) => (
            <div key={index} className="p-4 bg-secondary rounded-lg space-y-3">
              <div className="font-medium text-foreground">{round.name}</div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Pre-Money: {formatINR(round.preMoney, true)}
                </label>
                <input
                  type="range"
                  min="100000000"
                  max="4000000000"
                  step="100000000"
                  value={round.preMoney}
                  onChange={(e) => {
                    const newRounds = [...rounds];
                    newRounds[index + 1].preMoney = Number(e.target.value);
                    setRounds(newRounds);
                  }}
                  className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  Investment: {formatINR(round.investment, true)}
                </label>
                <input
                  type="range"
                  min="10000000"
                  max="1500000000"
                  step="10000000"
                  value={round.investment}
                  onChange={(e) => {
                    const newRounds = [...rounds];
                    newRounds[index + 1].investment = Number(e.target.value);
                    setRounds(newRounds);
                  }}
                  className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">
                  ESOP Expansion: {round.esop}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={round.esop}
                  onChange={(e) => {
                    const newRounds = [...rounds];
                    newRounds[index + 1].esop = Number(e.target.value);
                    setRounds(newRounds);
                  }}
                  className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <PieChart data={pieData} title={`Current Ownership (Post ${rounds[rounds.length - 1]?.name})`} />
          
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="p-2">Round</th>
                  <th className="p-2">Founders</th>
                  <th className="p-2">Investors</th>
                  <th className="p-2">ESOP</th>
                </tr>
              </thead>
              <tbody>
                {capTable.map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="p-2 font-medium">{row.round}</td>
                    <td className="p-2">{row.founders.toFixed(1)}%</td>
                    <td className="p-2">{row.investors.toFixed(1)}%</td>
                    <td className="p-2">{row.esop.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function DilutionCalculator() {
  const [preOwnership, setPreOwnership] = useState(80);
  const [preMoney, setPreMoney] = useState(800000000);
  const [investment, setInvestment] = useState(200000000);

  const results = useMemo(() => {
    const postMoney = preMoney + investment;
    const investorOwnership = (investment / postMoney) * 100;
    const dilutionPercent = (investorOwnership / 100) * preOwnership;
    const postOwnership = preOwnership - dilutionPercent;
    const pricePerPercent = investment / investorOwnership;
    
    return {
      postMoney,
      investorOwnership,
      dilutionPercent,
      postOwnership,
      pricePerPercent,
    };
  }, [preOwnership, preMoney, investment]);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">Dilution Calculator</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Current Ownership: {preOwnership}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={preOwnership}
              onChange={(e) => setPreOwnership(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Pre-Money Valuation: {formatINR(preMoney, true)}
            </label>
            <input
              type="range"
              min="100000000"
              max="4000000000"
              step="50000000"
              value={preMoney}
              onChange={(e) => setPreMoney(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Investment Amount: {formatINR(investment, true)}
            </label>
            <input
              type="range"
              min="10000000"
              max="1200000000"
              step="10000000"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Post-Money</div>
              <div className="text-xl font-display text-foreground">
                {formatINR(results.postMoney, true)}
              </div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Investor Gets</div>
              <div className="text-xl font-display text-foreground">
                {results.investorOwnership.toFixed(1)}%
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="text-sm text-muted-foreground">Your New Ownership</div>
            <div className="text-3xl font-display text-primary">
              {results.postOwnership.toFixed(1)}%
            </div>
            <div className="text-sm text-destructive">
              Diluted by {results.dilutionPercent.toFixed(1)} percentage points
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 h-8 bg-primary rounded-l-lg flex items-center justify-center text-xs text-primary-foreground font-medium"
              style={{ width: `${results.postOwnership}%` }}>
              You: {results.postOwnership.toFixed(0)}%
            </div>
            <div className="flex-1 h-8 bg-chart-3 rounded-r-lg flex items-center justify-center text-xs text-white font-medium"
              style={{ width: `${results.investorOwnership}%` }}>
              Inv: {results.investorOwnership.toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ISAFEConversionCalculator() {
  const [isafeAmount, setIsafeAmount] = useState(50000000);
  const [valuationCap, setValuationCap] = useState(400000000);
  const [discount, setDiscount] = useState(20);
  const [seriesAPreMoney, setSeriesAPreMoney] = useState(1000000000);
  const [seriesAInvestment, setSeriesAInvestment] = useState(250000000);

  const results = useMemo(() => {
    const seriesAPostMoney = seriesAPreMoney + seriesAInvestment;
    const seriesAPricePerShare = seriesAPreMoney / 10000000;
    
    const capPrice = valuationCap / 10000000;
    const discountPrice = seriesAPricePerShare * (1 - discount / 100);
    const conversionPrice = Math.min(capPrice, discountPrice);
    
    const isafeShares = isafeAmount / conversionPrice;
    const seriesAShares = seriesAInvestment / seriesAPricePerShare;
    
    const totalShares = 10000000 + isafeShares + seriesAShares;
    
    const founderOwnership = (10000000 / totalShares) * 100;
    const isafeOwnership = (isafeShares / totalShares) * 100;
    const seriesAOwnership = (seriesAShares / totalShares) * 100;
    
    return {
      capPrice,
      discountPrice,
      conversionPrice,
      usedCap: capPrice <= discountPrice,
      isafeShares,
      founderOwnership,
      isafeOwnership,
      seriesAOwnership,
    };
  }, [isafeAmount, valuationCap, discount, seriesAPreMoney, seriesAInvestment]);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">iSAFE Conversion Calculator</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="p-3 bg-secondary rounded-lg">
            <div className="text-xs text-muted-foreground mb-2">iSAFE Terms</div>
            <div>
              <label className="block text-xs text-foreground mb-1">
                iSAFE Amount: {formatINR(isafeAmount, true)}
              </label>
              <input
                type="range"
                min="5000000"
                max="200000000"
                step="5000000"
                value={isafeAmount}
                onChange={(e) => setIsafeAmount(Number(e.target.value))}
                className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs text-foreground mb-1">
                Valuation Cap: {formatINR(valuationCap, true)}
              </label>
              <input
                type="range"
                min="100000000"
                max="1500000000"
                step="50000000"
                value={valuationCap}
                onChange={(e) => setValuationCap(Number(e.target.value))}
                className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs text-foreground mb-1">
                Discount: {discount}%
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="5"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
          
          <div className="p-3 bg-secondary rounded-lg">
            <div className="text-xs text-muted-foreground mb-2">Series A Terms</div>
            <div>
              <label className="block text-xs text-foreground mb-1">
                Pre-Money: {formatINR(seriesAPreMoney, true)}
              </label>
              <input
                type="range"
                min="400000000"
                max="2500000000"
                step="100000000"
                value={seriesAPreMoney}
                onChange={(e) => setSeriesAPreMoney(Number(e.target.value))}
                className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs text-foreground mb-1">
                Investment: {formatINR(seriesAInvestment, true)}
              </label>
              <input
                type="range"
                min="100000000"
                max="800000000"
                step="50000000"
                value={seriesAInvestment}
                onChange={(e) => setSeriesAInvestment(Number(e.target.value))}
                className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Cap Price</div>
              <div className="text-lg font-display text-foreground">
                ₹{results.capPrice.toFixed(0)}
              </div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Discount Price</div>
              <div className="text-lg font-display text-foreground">
                ₹{results.discountPrice.toFixed(0)}
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="text-sm text-muted-foreground">Conversion Price (lower wins)</div>
            <div className="text-2xl font-display text-primary">
              ₹{results.conversionPrice.toFixed(0)}/share
            </div>
            <div className="text-xs text-muted-foreground">
              Using {results.usedCap ? "valuation cap" : "discount"} (better for iSAFE holder)
            </div>
          </div>
          
          <div className="p-4 bg-secondary rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Post-Series A Ownership</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Founders</span>
                <span className="font-medium">{results.founderOwnership.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>iSAFE Holders</span>
                <span className="font-medium text-chart-2">{results.isafeOwnership.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Series A</span>
                <span className="font-medium text-chart-3">{results.seriesAOwnership.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const dilutionExamples = [
  ["Round", "Pre-Money", "Investment", "Post-Money", "Founder Pre", "Dilution", "Founder Post"],
  ["Seed", "₹30 Cr", "₹10 Cr", "₹40 Cr", "100%", "25%", "75%"],
  ["Series A", "₹125 Cr", "₹40 Cr", "₹165 Cr", "75%", "18.2%", "56.8%"],
  ["Series B", "₹500 Cr", "₹120 Cr", "₹620 Cr", "56.8%", "11%", "45.8%"],
  ["Series C", "₹1,600 Cr", "₹400 Cr", "₹2,000 Cr", "45.8%", "9.2%", "36.6%"],
];

export default function DilutionPage() {
  return (
    <HandbookLayout currentSection="dilution-cap-table">
      <div className="space-y-12">
        <header className="space-y-4">
          <div className="text-sm text-primary font-medium">Chapter 5</div>
          <h1 className="font-display text-4xl text-foreground">
            Dilution & Cap Table
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Understand how your ownership changes through funding rounds and how to 
            read and manage your capitalization table. All values in INR.
          </p>
        </header>

        <Callout type="important" title="Why Dilution Matters">
          Every funding round reduces your ownership percentage. Expect to own roughly 
          50% after Series B and 30-40% after Series C. But remember: 20% of a ₹1,000 Cr 
          company (₹200 Cr) is vastly better than 100% of a ₹10 Cr company.
        </Callout>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">How Dilution Works</h2>
          
          <FormulaBox
            title="Dilution Formula"
            formula="Dilution % = Investment ÷ Post-Money Valuation × Your Pre-Round Ownership"
            example="₹20 Cr investment at ₹80 Cr post-money. You own 80%. Dilution = (₹20Cr ÷ ₹80Cr) × 80% = 20 percentage points"
          />

          <FormulaBox
            title="Post-Round Ownership"
            formula="New Ownership = Pre-Ownership × (1 - Investment ÷ Post-Money)"
            example="80% ownership, ₹20Cr into ₹80Cr post. New = 80% × (1 - 0.25) = 60%"
          />

          <DataTable 
            headers={dilutionExamples[0] as string[]}
            rows={dilutionExamples.slice(1) as string[][]}
          />

          <Callout type="tip" title="Dilution Benchmarks (India 2025)">
            <ul className="space-y-1 text-sm mt-2">
              <li><strong>Seed:</strong> 15-25% dilution (₹4-16 Cr raise)</li>
              <li><strong>Series A:</strong> 20-30% dilution (₹25-80 Cr raise)</li>
              <li><strong>By Series B:</strong> Founders typically own 30-50% collectively</li>
            </ul>
          </Callout>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Interactive Dilution Calculator</h2>
          <DilutionCalculator />
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Cap Table Simulator</h2>
          <CapTableVisualizer />
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">iSAFE Conversion</h2>
          <p className="text-muted-foreground">
            iSAFEs (India SAFE, popularized by 100X.VC) convert to equity at your next priced round. 
            The conversion price is the lower of the cap or discount—whichever gives 
            the iSAFE holder more shares.
          </p>
          <ISAFEConversionCalculator />
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Cap Table Best Practices</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="text-primary">✓</span> Do
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Keep cap table clean and simple</li>
                <li>• Use standard documents (iSAFE from 100X.VC)</li>
                <li>• Reserve 10-15% for ESOP at Face Value</li>
                <li>• Model dilution before accepting terms</li>
                <li>• Consider total dilution across all iSAFEs</li>
                <li>• Keep MCA filings and records up to date</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="text-destructive">✗</span> Don&apos;t
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Don&apos;t give equity to too many small angels</li>
                <li>• Avoid multiple iSAFE rounds at low caps</li>
                <li>• Don&apos;t forget to account for convertibles</li>
                <li>• Avoid non-standard terms without legal review</li>
                <li>• Don&apos;t let anyone own more than founders pre-A</li>
                <li>• Never promise equity without documentation</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Understanding ESOP (India)</h2>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Employee Stock Option Pool</h3>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-display text-primary">10-15%</div>
                <div className="text-sm text-muted-foreground">Typical pool size (Seed: 10-12%, Series A: expand to 15-20%)</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-display text-primary">4 years</div>
                <div className="text-sm text-muted-foreground">Standard vesting period with 1-year cliff</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-display text-primary">Face Value</div>
                <div className="text-sm text-muted-foreground">Options typically granted at ₹10 (unlike FMV in US)</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-secondary rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Sample Grant Ranges (% of company)</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CXO (post-Series A)</span>
                  <span className="text-foreground">0.5-2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VP Level</span>
                  <span className="text-foreground">0.25-0.75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Senior Engineer/Lead</span>
                  <span className="text-foreground">0.1-0.25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mid-level Hire</span>
                  <span className="text-foreground">0.05-0.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Junior Hire</span>
                  <span className="text-foreground">0.01-0.05%</span>
                </div>
              </div>
            </div>
          </div>

          <Callout type="warning" title="ESOP Creates Dilution">
            The option pool typically comes from founder shares, not investor shares. 
            Investors insist on creating ESOP pre-money. A 15% pool at seed with 25% 
            investor ownership means founders go from 100% → 60%, not 75% → 60%.
          </Callout>
        </section>

        <section className="space-y-6">
          <h2 className="font-display text-2xl text-foreground">Liquidation Preferences</h2>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">1x Non-Participating (Standard, Founder-Friendly)</h4>
                <p className="text-sm text-muted-foreground">
                  Investor gets back their investment OR their pro-rata share, 
                  whichever is higher. This is the norm in India.
                </p>
                <div className="p-3 bg-secondary rounded text-sm font-mono">
                  Exit: ₹400 Cr, Invested: ₹40 Cr (20%)<br/>
                  Investor gets: MAX(₹40Cr, ₹80Cr) = ₹80 Cr
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">1x Participating (Avoid If Possible)</h4>
                <p className="text-sm text-muted-foreground">
                  Investor gets their investment back PLUS their pro-rata share 
                  of remaining proceeds. Push back on this term.
                </p>
                <div className="p-3 bg-secondary rounded text-sm font-mono">
                  Exit: ₹400 Cr, Invested: ₹40 Cr (20%)<br/>
                  Investor gets: ₹40Cr + (₹360Cr × 20%) = ₹112 Cr
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-border">
          <Link href="/calculators" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Calculators
          </Link>
          <Link href="/glossary" className="text-primary hover:text-primary/80 transition-colors">
            Glossary →
          </Link>
        </div>
      </div>
    </HandbookLayout>
  );
}

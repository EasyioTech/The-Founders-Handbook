"use client";

import { useState, useMemo } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { Callout } from "@/components/handbook/UIComponents";
import { LineChart, BarChart } from "@/components/handbook/Charts";
import Link from "next/link";

const formatINR = (value: number, compact = false) => {
  if (compact) {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${value.toLocaleString('en-IN')}`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
};

function RunwayCalculator() {
  const [cashBalance, setCashBalance] = useState(40000000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(1500000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(5000000);
  const [revenueGrowth, setRevenueGrowth] = useState(10);

  const results = useMemo(() => {
    const netBurn = monthlyExpenses - monthlyRevenue;
    const simpleRunway = netBurn > 0 ? Math.floor(cashBalance / netBurn) : Infinity;
    
    let cash = cashBalance;
    let revenue = monthlyRevenue;
    let months = 0;
    const projections = [];
    
    while (cash > 0 && months < 36) {
      projections.push({ x: `M${months}`, y: Math.round(cash) });
      const burn = monthlyExpenses - revenue;
      cash -= burn;
      revenue *= (1 + revenueGrowth / 100);
      months++;
    }
    
    return {
      netBurn,
      simpleRunway,
      projectedRunway: months,
      projections,
      grossBurn: monthlyExpenses,
    };
  }, [cashBalance, monthlyRevenue, monthlyExpenses, revenueGrowth]);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">Runway Calculator</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Cash Balance: {formatINR(cashBalance, true)}
            </label>
            <input
              type="range"
              min="5000000"
              max="500000000"
              step="5000000"
              value={cashBalance}
              onChange={(e) => setCashBalance(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Monthly Revenue: {formatINR(monthlyRevenue, true)}
            </label>
            <input
              type="range"
              min="0"
              max="20000000"
              step="500000"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Monthly Expenses: {formatINR(monthlyExpenses, true)}
            </label>
            <input
              type="range"
              min="1000000"
              max="30000000"
              step="500000"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Monthly Revenue Growth: {revenueGrowth}%
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={revenueGrowth}
              onChange={(e) => setRevenueGrowth(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Gross Burn</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.grossBurn, true)}</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Net Burn</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.netBurn, true)}</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Simple Runway</div>
              <div className="text-xl font-display text-foreground">
                {results.simpleRunway === Infinity ? "∞" : `${results.simpleRunway} mo`}
              </div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="text-sm text-muted-foreground">With Growth</div>
              <div className="text-xl font-display text-primary">
                {results.projectedRunway >= 36 ? "36+ mo" : `${results.projectedRunway} mo`}
              </div>
            </div>
          </div>
          
          {results.simpleRunway < 6 && results.simpleRunway !== Infinity && (
            <div className="p-3 bg-destructive/10 rounded-lg text-sm text-destructive">
              Warning: Less than 6 months runway. Consider fundraising immediately.
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <LineChart 
          data={results.projections}
          title="Cash Projection Over Time"
          height={180}
        />
      </div>
    </div>
  );
}

function CACLTVCalculator() {
  const [marketingSpend, setMarketingSpend] = useState(4000000);
  const [newCustomers, setNewCustomers] = useState(100);
  const [arpu, setArpu] = useState(8000);
  const [churnRate, setChurnRate] = useState(5);
  const [grossMargin, setGrossMargin] = useState(70);

  const results = useMemo(() => {
    const cac = newCustomers > 0 ? marketingSpend / newCustomers : 0;
    const lifespanMonths = churnRate > 0 ? 1 / (churnRate / 100) : 100;
    const basicLtv = arpu * lifespanMonths;
    const grossMarginLtv = (arpu * (grossMargin / 100)) * lifespanMonths;
    const ltvCacRatio = cac > 0 ? grossMarginLtv / cac : 0;
    const paybackMonths = cac > 0 ? cac / (arpu * (grossMargin / 100)) : 0;

    return {
      cac,
      lifespanMonths,
      basicLtv,
      grossMarginLtv,
      ltvCacRatio,
      paybackMonths,
    };
  }, [marketingSpend, newCustomers, arpu, churnRate, grossMargin]);

  const getRatioColor = (ratio: number) => {
    if (ratio < 1) return "text-destructive";
    if (ratio < 3) return "text-chart-3";
    return "text-primary";
  };

  const getRatioLabel = (ratio: number) => {
    if (ratio < 1) return "Losing Money";
    if (ratio < 3) return "Needs Work";
    if (ratio < 5) return "Healthy";
    return "Excellent";
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">CAC / LTV Calculator</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Monthly S&M Spend: {formatINR(marketingSpend, true)}
            </label>
            <input
              type="range"
              min="100000"
              max="20000000"
              step="100000"
              value={marketingSpend}
              onChange={(e) => setMarketingSpend(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              New Customers This Month: {newCustomers}
            </label>
            <input
              type="range"
              min="1"
              max="500"
              step="1"
              value={newCustomers}
              onChange={(e) => setNewCustomers(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              ARPU (Monthly): {formatINR(arpu)}
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={arpu}
              onChange={(e) => setArpu(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Monthly Churn Rate: {churnRate}%
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={churnRate}
              onChange={(e) => setChurnRate(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Gross Margin: {grossMargin}%
            </label>
            <input
              type="range"
              min="20"
              max="95"
              step="5"
              value={grossMargin}
              onChange={(e) => setGrossMargin(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">CAC</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.cac)}</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Avg Lifespan</div>
              <div className="text-xl font-display text-foreground">{results.lifespanMonths.toFixed(0)} mo</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Basic LTV</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.basicLtv, true)}</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">GM-Adjusted LTV</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.grossMarginLtv, true)}</div>
            </div>
          </div>
          
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="text-sm text-muted-foreground">LTV:CAC Ratio</div>
            <div className={`text-3xl font-display ${getRatioColor(results.ltvCacRatio)}`}>
              {results.ltvCacRatio.toFixed(1)}:1
            </div>
            <div className={`text-sm ${getRatioColor(results.ltvCacRatio)}`}>
              {getRatioLabel(results.ltvCacRatio)}
            </div>
          </div>
          
          <div className="p-4 bg-secondary rounded-lg">
            <div className="text-sm text-muted-foreground">CAC Payback Period</div>
            <div className="text-xl font-display text-foreground">{results.paybackMonths.toFixed(1)} months</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaaSPricingCalculator() {
  const [baseCost, setBaseCost] = useState(500);
  const [targetMargin, setTargetMargin] = useState(80);
  const [marketSegment, setMarketSegment] = useState<"smb" | "mid" | "enterprise">("mid");
  const [competitorPrice, setCompetitorPrice] = useState(15000);
  const [valueMultiple, setValueMultiple] = useState(3);

  const results = useMemo(() => {
    const costPlusPrice = baseCost / (1 - targetMargin / 100);
    
    const segmentMultipliers = {
      smb: { low: 0.5, mid: 0.75, high: 1 },
      mid: { low: 1, mid: 1.5, high: 2.5 },
      enterprise: { low: 2, mid: 4, high: 8 },
    };
    
    const mult = segmentMultipliers[marketSegment];
    const valuePriceRange = {
      low: baseCost * valueMultiple * mult.low,
      mid: baseCost * valueMultiple * mult.mid,
      high: baseCost * valueMultiple * mult.high,
    };
    
    const competitorPriceRange = {
      low: competitorPrice * 0.7,
      mid: competitorPrice * 0.9,
      premium: competitorPrice * 1.2,
    };
    
    const recommendedPrice = Math.max(
      costPlusPrice,
      (valuePriceRange.low + valuePriceRange.mid) / 2,
      competitorPriceRange.low
    );
    
    const annualPrice = recommendedPrice * 12;
    const annualDiscount = annualPrice * 0.83;
    
    return {
      costPlusPrice,
      valuePriceRange,
      competitorPriceRange,
      recommendedPrice: Math.round(recommendedPrice),
      annualPrice: Math.round(annualPrice),
      annualDiscount: Math.round(annualDiscount),
      grossMargin: ((recommendedPrice - baseCost) / recommendedPrice) * 100,
    };
  }, [baseCost, targetMargin, marketSegment, competitorPrice, valueMultiple]);

  const pricingData = [
    { label: "Cost Plus", value: results.costPlusPrice },
    { label: "Value Low", value: results.valuePriceRange.low },
    { label: "Value Mid", value: results.valuePriceRange.mid },
    { label: "Competitor", value: results.competitorPriceRange.mid },
    { label: "Recommended", value: results.recommendedPrice },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">SaaS Pricing Calculator</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Cost to Serve (Monthly): {formatINR(baseCost)}
            </label>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={baseCost}
              onChange={(e) => setBaseCost(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="text-xs text-muted-foreground mt-1">Infrastructure, support, success costs per customer</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Target Gross Margin: {targetMargin}%
            </label>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={targetMargin}
              onChange={(e) => setTargetMargin(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="text-xs text-muted-foreground mt-1">SaaS benchmark: 75-85%</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Market Segment
            </label>
            <div className="flex gap-2">
              {(["smb", "mid", "enterprise"] as const).map((seg) => (
                <button
                  key={seg}
                  onClick={() => setMarketSegment(seg)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    marketSegment === seg 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {seg === "smb" ? "SMB" : seg === "mid" ? "Mid-Market" : "Enterprise"}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Competitor Price (Monthly): {formatINR(competitorPrice)}
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={competitorPrice}
              onChange={(e) => setCompetitorPrice(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Value Multiplier: {valueMultiple}x
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={valueMultiple}
              onChange={(e) => setValueMultiple(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="text-xs text-muted-foreground mt-1">How much value you deliver vs cost (typical: 3-5x)</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="text-sm text-muted-foreground">Recommended Monthly Price</div>
            <div className="text-3xl font-display text-primary">
              {formatINR(results.recommendedPrice)}
            </div>
            <div className="text-sm text-muted-foreground">
              {results.grossMargin.toFixed(0)}% gross margin
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Annual (Full)</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.annualPrice)}</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Annual (2 mo free)</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.annualDiscount)}</div>
            </div>
          </div>
          
          <div className="p-4 bg-secondary rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Price Anchors</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Floor (Cost Plus):</span>
                <span className="text-foreground">{formatINR(results.costPlusPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Value Range:</span>
                <span className="text-foreground">{formatINR(results.valuePriceRange.low)} - {formatINR(results.valuePriceRange.mid)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">vs Competitor:</span>
                <span className={results.recommendedPrice < results.competitorPriceRange.mid ? "text-primary" : "text-chart-3"}>
                  {((results.recommendedPrice / results.competitorPriceRange.mid - 1) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <BarChart 
          data={pricingData}
          title="Price Comparison"
          height={160}
        />
      </div>
    </div>
  );
}

function PricingTierCalculator() {
  const [basePrice, setBasePrice] = useState(5000);
  const [tierCount, setTierCount] = useState(3);
  const [tierMultiple, setTierMultiple] = useState(3);
  const [featureGating, setFeatureGating] = useState<"usage" | "features" | "seats">("features");

  const tiers = useMemo(() => {
    const tierNames = ["Starter", "Growth", "Pro", "Scale", "Enterprise"];
    const tierDescriptions = {
      usage: ["500 actions/mo", "5,000 actions/mo", "50,000 actions/mo", "500K actions/mo", "Unlimited"],
      features: ["Core features", "+ Analytics", "+ Automation", "+ API Access", "+ Custom"],
      seats: ["1-3 seats", "4-10 seats", "11-25 seats", "26-100 seats", "Unlimited"],
    };
    
    const result = [];
    for (let i = 0; i < tierCount; i++) {
      const multiplier = Math.pow(tierMultiple, i);
      result.push({
        name: tierNames[i],
        price: Math.round(basePrice * multiplier),
        description: tierDescriptions[featureGating][i],
        popular: i === Math.floor(tierCount / 2),
      });
    }
    return result;
  }, [basePrice, tierCount, tierMultiple, featureGating]);

  const avgRevenue = useMemo(() => {
    const weights = [0.4, 0.35, 0.15, 0.07, 0.03].slice(0, tierCount);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    return tiers.reduce((sum, tier, i) => sum + tier.price * (weights[i] / totalWeight), 0);
  }, [tiers, tierCount]);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">Pricing Tier Calculator</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Base Tier Price: {formatINR(basePrice)}/mo
            </label>
            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Number of Tiers: {tierCount}
            </label>
            <input
              type="range"
              min="2"
              max="5"
              step="1"
              value={tierCount}
              onChange={(e) => setTierCount(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tier Price Multiple: {tierMultiple}x
            </label>
            <input
              type="range"
              min="1.5"
              max="5"
              step="0.5"
              value={tierMultiple}
              onChange={(e) => setTierMultiple(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="text-xs text-muted-foreground mt-1">Each tier costs Nx the previous (typical: 2-3x)</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tier Differentiation
            </label>
            <div className="flex flex-wrap gap-2">
              {(["usage", "features", "seats"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFeatureGating(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    featureGating === type 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {type === "usage" ? "Usage-Based" : type === "features" ? "Feature-Based" : "Seat-Based"}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="text-sm text-muted-foreground">Estimated Blended ARPU</div>
            <div className="text-3xl font-display text-primary">
              {formatINR(Math.round(avgRevenue))}/mo
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Based on typical tier distribution (40% / 35% / 15% / 7% / 3%)
            </div>
          </div>
          
          <div className="grid gap-3">
            {tiers.map((tier, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-lg ${tier.popular ? 'bg-primary/10 border border-primary/30' : 'bg-secondary'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-foreground flex items-center gap-2">
                      {tier.name}
                      {tier.popular && <span className="text-xs px-2 py-0.5 bg-primary text-primary-foreground rounded-full">Popular</span>}
                    </div>
                    <div className="text-sm text-muted-foreground">{tier.description}</div>
                  </div>
                  <div className="text-xl font-display text-foreground">{formatINR(tier.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ValuationCalculator() {
  const [arr, setArr] = useState(80000000);
  const [growthRate, setGrowthRate] = useState(100);
  const [stage, setStage] = useState<"seed" | "seriesA" | "seriesB">("seriesA");

  const results = useMemo(() => {
    const multiples: Record<string, { low: number; mid: number; high: number }> = {
      seed: { low: 8, mid: 15, high: 25 },
      seriesA: { low: 10, mid: 20, high: 35 },
      seriesB: { low: 8, mid: 15, high: 25 },
    };
    
    const growthMultiplier = growthRate >= 100 ? 1.3 : growthRate >= 50 ? 1.1 : 0.9;
    const baseMultiples = multiples[stage];
    
    return {
      low: arr * baseMultiples.low * growthMultiplier,
      mid: arr * baseMultiples.mid * growthMultiplier,
      high: arr * baseMultiples.high * growthMultiplier,
      multiple: baseMultiples.mid * growthMultiplier,
    };
  }, [arr, growthRate, stage]);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">Valuation Estimator</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              ARR: {formatINR(arr, true)}
            </label>
            <input
              type="range"
              min="10000000"
              max="1000000000"
              step="10000000"
              value={arr}
              onChange={(e) => setArr(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              YoY Growth Rate: {growthRate}%
            </label>
            <input
              type="range"
              min="0"
              max="200"
              step="10"
              value={growthRate}
              onChange={(e) => setGrowthRate(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Stage
            </label>
            <div className="flex gap-2">
              {(["seed", "seriesA", "seriesB"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStage(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    stage === s 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {s === "seed" ? "Seed" : s === "seriesA" ? "Series A" : "Series B"}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Estimated Valuation Range</div>
            <div className="text-3xl font-display text-primary">
              {formatINR(results.mid, true)}
            </div>
            <div className="text-sm text-muted-foreground">
              Range: {formatINR(results.low, true)} - {formatINR(results.high, true)}
            </div>
          </div>
          
          <div className="p-4 bg-secondary rounded-lg">
            <div className="text-sm text-muted-foreground">ARR Multiple</div>
            <div className="text-xl font-display text-foreground">{results.multiple.toFixed(1)}x</div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Note: This is a rough estimate based on typical Indian SaaS multiples. 
            Actual valuations depend on market conditions, team, competition, and investor appetite.
          </div>
        </div>
      </div>
    </div>
  );
}

function MRRProjectionCalculator() {
  const [currentMrr, setCurrentMrr] = useState(4000000);
  const [growthRate, setGrowthRate] = useState(15);
  const [churnRate, setChurnRate] = useState(3);
  const [months, setMonths] = useState(12);

  const projections = useMemo(() => {
    const data = [];
    let mrr = currentMrr;
    
    for (let i = 0; i <= months; i++) {
      data.push({ x: `M${i}`, y: Math.round(mrr) });
      const newMrr = mrr * (growthRate / 100);
      const churnedMrr = mrr * (churnRate / 100);
      mrr = mrr + newMrr - churnedMrr;
    }
    
    return {
      data,
      finalMrr: data[data.length - 1]?.y || 0,
      arr: (data[data.length - 1]?.y || 0) * 12,
      totalGrowth: ((data[data.length - 1]?.y || 0) / currentMrr - 1) * 100,
    };
  }, [currentMrr, growthRate, churnRate, months]);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">MRR Projection Calculator</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Current MRR: {formatINR(currentMrr, true)}
            </label>
            <input
              type="range"
              min="100000"
              max="50000000"
              step="100000"
              value={currentMrr}
              onChange={(e) => setCurrentMrr(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Monthly New MRR Growth: {growthRate}%
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={growthRate}
              onChange={(e) => setGrowthRate(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Monthly Churn Rate: {churnRate}%
            </label>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={churnRate}
              onChange={(e) => setChurnRate(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Projection Period: {months} months
            </label>
            <input
              type="range"
              min="6"
              max="36"
              step="6"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Net Growth</div>
              <div className="text-xl font-display text-foreground">{(growthRate - churnRate).toFixed(1)}%</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Quick Ratio</div>
              <div className="text-xl font-display text-foreground">
                {churnRate > 0 ? (growthRate / churnRate).toFixed(1) : "∞"}
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="text-sm text-muted-foreground">Projected MRR (Month {months})</div>
            <div className="text-3xl font-display text-primary">
              {formatINR(projections.finalMrr, true)}
            </div>
            <div className="text-sm text-muted-foreground">
              {projections.totalGrowth.toFixed(0)}% total growth | {formatINR(projections.arr, true)} ARR
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <LineChart 
          data={projections.data}
          title="MRR Projection"
          height={180}
        />
      </div>
    </div>
  );
}

function FundraisingCalculator() {
  const [monthlyBurn, setMonthlyBurn] = useState(6000000);
  const [targetRunway, setTargetRunway] = useState(18);
  const [expectedDilution, setExpectedDilution] = useState(20);

  const results = useMemo(() => {
    const amountNeeded = monthlyBurn * targetRunway;
    const impliedPreMoney = (amountNeeded / (expectedDilution / 100)) - amountNeeded;
    const postMoney = impliedPreMoney + amountNeeded;
    
    return {
      amountNeeded,
      impliedPreMoney,
      postMoney,
    };
  }, [monthlyBurn, targetRunway, expectedDilution]);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">Fundraising Calculator</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Expected Monthly Burn: {formatINR(monthlyBurn, true)}
            </label>
            <input
              type="range"
              min="1000000"
              max="30000000"
              step="500000"
              value={monthlyBurn}
              onChange={(e) => setMonthlyBurn(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Target Runway: {targetRunway} months
            </label>
            <input
              type="range"
              min="12"
              max="36"
              step="6"
              value={targetRunway}
              onChange={(e) => setTargetRunway(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Expected Dilution: {expectedDilution}%
            </label>
            <input
              type="range"
              min="10"
              max="35"
              step="5"
              value={expectedDilution}
              onChange={(e) => setExpectedDilution(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="text-sm text-muted-foreground">Amount to Raise</div>
            <div className="text-3xl font-display text-primary">
              {formatINR(results.amountNeeded, true)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Implied Pre-Money</div>
              <div className="text-xl font-display text-foreground">
                {formatINR(results.impliedPreMoney, true)}
              </div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Post-Money</div>
              <div className="text-xl font-display text-foreground">
                {formatINR(results.postMoney, true)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BurnMultipleCalculator() {
  const [netBurn, setNetBurn] = useState(5000000);
  const [newArr, setNewArr] = useState(3000000);

  const results = useMemo(() => {
    const burnMultiple = newArr > 0 ? (netBurn * 12) / (newArr * 12) : 0;
    const efficiency = burnMultiple > 0 ? (1 / burnMultiple) * 100 : 0;
    
    let rating: string;
    let ratingColor: string;
    if (burnMultiple <= 1) {
      rating = "Elite";
      ratingColor = "text-primary";
    } else if (burnMultiple <= 1.5) {
      rating = "Best-in-Class";
      ratingColor = "text-primary";
    } else if (burnMultiple <= 2) {
      rating = "Good";
      ratingColor = "text-chart-3";
    } else if (burnMultiple <= 3) {
      rating = "Needs Improvement";
      ratingColor = "text-chart-3";
    } else {
      rating = "Inefficient";
      ratingColor = "text-destructive";
    }
    
    return {
      burnMultiple,
      efficiency,
      rating,
      ratingColor,
      annualBurn: netBurn * 12,
      annualNewArr: newArr * 12,
    };
  }, [netBurn, newArr]);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">Burn Multiple Calculator</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Monthly Net Burn: {formatINR(netBurn, true)}
            </label>
            <input
              type="range"
              min="500000"
              max="20000000"
              step="500000"
              value={netBurn}
              onChange={(e) => setNetBurn(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Monthly Net New ARR: {formatINR(newArr, true)}
            </label>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={newArr}
              onChange={(e) => setNewArr(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="text-xs text-muted-foreground mt-1">New + Expansion - Contraction - Churn</div>
          </div>
          
          <div className="formula-box p-4 rounded-lg">
            <div className="text-sm font-medium text-foreground mb-2">Formula</div>
            <div className="text-sm text-muted-foreground font-mono">
              Burn Multiple = Net Burn ÷ Net New ARR
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="text-sm text-muted-foreground">Burn Multiple</div>
            <div className={`text-3xl font-display ${results.ratingColor}`}>
              {results.burnMultiple.toFixed(2)}x
            </div>
            <div className={`text-sm ${results.ratingColor}`}>{results.rating}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Annual Burn</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.annualBurn, true)}</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Annual New ARR</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.annualNewArr, true)}</div>
            </div>
          </div>
          
          <div className="p-4 bg-secondary rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Benchmarks (2025)</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between"><span>Elite:</span><span className="text-primary">≤1.0x</span></div>
              <div className="flex justify-between"><span>Best-in-Class:</span><span className="text-primary">1.0-1.5x</span></div>
              <div className="flex justify-between"><span>Good:</span><span className="text-chart-3">1.5-2.0x</span></div>
              <div className="flex justify-between"><span>Needs Work:</span><span className="text-chart-3">2.0-3.0x</span></div>
              <div className="flex justify-between"><span>Inefficient:</span><span className="text-destructive">&gt;3.0x</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UnitEconomicsCalculator() {
  const [monthlyPrice, setMonthlyPrice] = useState(10000);
  const [grossMargin, setGrossMargin] = useState(80);
  const [cacMarketing, setCacMarketing] = useState(15000);
  const [cacSales, setCacSales] = useState(10000);
  const [avgLifespan, setAvgLifespan] = useState(24);
  const [expansionRate, setExpansionRate] = useState(5);

  const results = useMemo(() => {
    const cac = cacMarketing + cacSales;
    const monthlyGrossProfit = monthlyPrice * (grossMargin / 100);
    const basicLtv = monthlyPrice * avgLifespan;
    
    let ltv = 0;
    let monthlyRevenue = monthlyPrice;
    for (let i = 0; i < avgLifespan; i++) {
      ltv += monthlyRevenue;
      monthlyRevenue *= (1 + expansionRate / 100);
    }
    
    const ltvWithExpansion = ltv;
    const grossMarginLtv = ltvWithExpansion * (grossMargin / 100);
    const ltvCacRatio = cac > 0 ? grossMarginLtv / cac : 0;
    const paybackMonths = monthlyGrossProfit > 0 ? cac / monthlyGrossProfit : 0;
    const roi = cac > 0 ? ((grossMarginLtv - cac) / cac) * 100 : 0;
    
    return {
      cac,
      basicLtv,
      ltvWithExpansion,
      grossMarginLtv,
      ltvCacRatio,
      paybackMonths,
      roi,
      monthlyGrossProfit,
    };
  }, [monthlyPrice, grossMargin, cacMarketing, cacSales, avgLifespan, expansionRate]);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-foreground mb-6">Unit Economics Calculator</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Monthly Price: {formatINR(monthlyPrice)}
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={monthlyPrice}
              onChange={(e) => setMonthlyPrice(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Gross Margin: {grossMargin}%
            </label>
            <input
              type="range"
              min="40"
              max="95"
              step="5"
              value={grossMargin}
              onChange={(e) => setGrossMargin(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Marketing CAC: {formatINR(cacMarketing)}
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={cacMarketing}
              onChange={(e) => setCacMarketing(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Sales CAC: {formatINR(cacSales)}
            </label>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={cacSales}
              onChange={(e) => setCacSales(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Avg Customer Lifespan: {avgLifespan} months
            </label>
            <input
              type="range"
              min="6"
              max="60"
              step="6"
              value={avgLifespan}
              onChange={(e) => setAvgLifespan(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Monthly Expansion Rate: {expansionRate}%
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={expansionRate}
              onChange={(e) => setExpansionRate(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Blended CAC</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.cac)}</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Basic LTV</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.basicLtv, true)}</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">LTV w/ Expansion</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.ltvWithExpansion, true)}</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">GM-Adjusted LTV</div>
              <div className="text-xl font-display text-foreground">{formatINR(results.grossMarginLtv, true)}</div>
            </div>
          </div>
          
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="text-sm text-muted-foreground">LTV:CAC Ratio</div>
            <div className={`text-3xl font-display ${results.ltvCacRatio >= 3 ? "text-primary" : results.ltvCacRatio >= 1 ? "text-chart-3" : "text-destructive"}`}>
              {results.ltvCacRatio.toFixed(1)}:1
            </div>
            <div className="text-sm text-muted-foreground">
              {results.ltvCacRatio >= 3 ? "Healthy" : results.ltvCacRatio >= 1 ? "Needs work" : "Unprofitable"}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Payback Period</div>
              <div className="text-xl font-display text-foreground">{results.paybackMonths.toFixed(1)} mo</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground">Customer ROI</div>
              <div className={`text-xl font-display ${results.roi > 0 ? "text-primary" : "text-destructive"}`}>
                {results.roi.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalculatorsPage() {
  return (
    <HandbookLayout currentSection="calculators">
      <div className="space-y-12">
        <header className="space-y-4">
          <div className="text-sm text-primary font-medium">Chapter 4</div>
          <h1 className="font-display text-4xl text-foreground">
            Interactive Calculators
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Use these calculators to model your startup&apos;s financials and plan your 
            growth trajectory. All values are in Indian Rupees (₹).
          </p>
        </header>

        <Callout type="info" title="How to Use These Tools">
          These calculators provide estimates based on simplified models and 2025 Indian SaaS benchmarks. 
          Real-world scenarios may vary based on your GTM (domestic vs US), seasonality, and market conditions.
        </Callout>

        <section className="space-y-8">
          <div>
            <h2 className="font-display text-2xl text-foreground mb-4">Pricing & Revenue</h2>
            <div className="space-y-6">
              <SaaSPricingCalculator />
              <PricingTierCalculator />
            </div>
          </div>
          
          <div>
            <h2 className="font-display text-2xl text-foreground mb-4">Unit Economics</h2>
            <div className="space-y-6">
              <CACLTVCalculator />
              <UnitEconomicsCalculator />
              <BurnMultipleCalculator />
            </div>
          </div>
          
          <div>
            <h2 className="font-display text-2xl text-foreground mb-4">Growth & Projections</h2>
            <div className="space-y-6">
              <MRRProjectionCalculator />
              <RunwayCalculator />
            </div>
          </div>
          
          <div>
            <h2 className="font-display text-2xl text-foreground mb-4">Fundraising</h2>
            <div className="space-y-6">
              <ValuationCalculator />
              <FundraisingCalculator />
            </div>
          </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-border">
          <Link href="/financial-metrics" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Financial Metrics
          </Link>
          <Link href="/dilution" className="text-primary hover:text-primary/80 transition-colors">
            Dilution & Cap Table →
          </Link>
        </div>
      </div>
    </HandbookLayout>
  );
}

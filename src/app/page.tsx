"use client";

import Link from "next/link";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { TimelineChart } from "@/components/handbook/Charts";
import { useEffect, useState } from "react";
import { Calculator, Presentation, ShieldCheck, TrendingUp } from "lucide-react";

const journeyTimeline = [
  {
    date: "Phase 1",
    title: "Ideation & Validation",
    description: "Identify a real problem worth solving and validate that people will pay for a solution",
    type: "milestone" as const,
    status: "completed" as const,
    details: [
      "Conduct 50+ customer discovery interviews",
      "Define clear problem statement and target persona",
      "Research competitive landscape and alternatives",
      "Create value proposition canvas",
      "Test willingness to pay with landing page signups"
    ]
  },
  {
    date: "Phase 2",
    title: "MVP Development",
    description: "Build the minimum viable product that solves the core problem and acquire first paying customers",
    type: "product" as const,
    status: "current" as const,
    details: [
      "Focus on one core feature that delivers value",
      "Launch alpha with 3-5 design partners",
      "Implement basic analytics (activation, retention)",
      "Iterate based on user feedback weekly",
      "Get first 10 paying customers"
    ]
  },
  {
    date: "Phase 3",
    title: "Pre-Seed / Seed",
    description: "Raise capital from angels or seed VCs to extend runway and prove product-market fit",
    type: "funding" as const,
    status: "upcoming" as const,
    details: [
      "Typical raise: ₹1-4 Cr (Pre-Seed), ₹4-16 Cr (Seed)",
      "Instruments: iSAFE notes or priced equity round",
      "Investors: Angel networks, Micro VCs, Accelerators",
      "Dilution: 10-20% depending on stage",
      "Timeline: 8-16 weeks for full process"
    ]
  },
  {
    date: "Phase 4",
    title: "Product-Market Fit",
    description: "Prove that you have a repeatable, scalable business model with strong unit economics",
    type: "product" as const,
    status: "upcoming" as const,
    details: [
      "40%+ users would be 'very disappointed' without product",
      "Monthly churn below 3-5%",
      "LTV:CAC ratio > 3:1",
      "Net Revenue Retention > 100%",
      "Organic/referral growth accelerating"
    ]
  },
  {
    date: "Phase 5",
    title: "Series A",
    description: "Scale operations with institutional capital to become market leader",
    type: "funding" as const,
    status: "upcoming" as const,
    details: [
      "Typical raise: ₹25-80 Cr at ₹100-300 Cr valuation",
      "Requirements: ₹1-3 Cr ARR, strong PMF signals",
      "Investors: Tier-1 VCs (Sequoia, Accel, Peak XV)",
      "Use of funds: Sales team, marketing, product expansion",
      "Dilution: 15-25%"
    ]
  },
  {
    date: "Phase 6",
    title: "Growth & Expansion",
    description: "International expansion, market leadership, and path to profitability or next round",
    type: "milestone" as const,
    status: "upcoming" as const,
    details: [
      "US market entry (often 60-70% of revenue)",
      "Team growth: 50 → 200+ employees",
      "Build management layer and processes",
      "Expand product line or adjacent markets",
      "Path to Series B or profitability"
    ]
  },
];

const phases = [
  {
    phase: "Phase 1: Ideation",
    description: "From initial concept to a validated problem worth solving",
    color: "from-emerald-500/20 to-green-600/20",
    borderColor: "border-emerald-500/30",
    sections: [
      {
        id: "idea-to-product",
        title: "Idea to Product",
        href: "/idea-to-product",
        description: "Problem validation, customer discovery, MVP development, and achieving product-market fit",
        topics: ["Problem validation", "Customer discovery", "MVP development", "Product-market fit"],
      },
    ]
  },
  {
    phase: "Phase 2: Fundraising",
    description: "Understanding funding mechanics, pitching investors, and managing equity",
    color: "from-blue-500/20 to-indigo-600/20",
    borderColor: "border-blue-500/30",
    sections: [
      {
        id: "funding-stages",
        title: "Funding Stages",
        href: "/funding-stages",
        description: "Understanding each funding round from pre-seed to Series C+",
        topics: ["Pre-seed to Series A", "iSAFE & Term sheets", "Indian investors"],
      },
      {
        id: "pitch-deck",
        title: "Pitch Deck Guide",
        href: "/pitch-deck",
        description: "Crafting a compelling pitch deck that gets you funded",
        topics: ["12-slide structure", "Traction slides", "Common mistakes"],
      },
      {
        id: "financial-metrics",
        title: "Financial Metrics",
        href: "/financial-metrics",
        description: "Key metrics every founder must understand and track",
        topics: ["CAC & LTV", "Burn rate & runway", "Unit economics"],
      },
      {
        id: "calculators",
        title: "Calculators & Workbooks",
        href: "/calculators",
        description: "Interactive tools to model your startup finances in INR",
        topics: ["Runway calculator", "CAC/LTV calculator", "Valuation estimator"],
      },
      {
        id: "dilution",
        title: "Dilution & Cap Table",
        href: "/dilution",
        description: "How ownership changes through funding rounds",
        topics: ["Cap table basics", "iSAFE conversion", "ESOP allocation"],
      },
    ]
  },
  {
    phase: "Phase 3: Go-to-Market",
    description: "Building repeatable customer acquisition and revenue growth",
    color: "from-indigo-500/20 to-purple-600/20",
    borderColor: "border-indigo-500/30",
    sections: [
      {
        id: "gtm",
        title: "Go-to-Market Strategy",
        href: "/gtm",
        description: "Building repeatable, scalable customer acquisition",
        topics: ["GTM motions", "Sales funnel", "Pricing strategy"],
      },
      {
        id: "partnerships",
        title: "BD & Partnerships",
        href: "/partnerships",
        description: "Strategic partnerships and business development",
        topics: ["Partner types", "Deal structures", "Channel strategy"],
      },
    ]
  },
  {
    phase: "Phase 4: Scaling",
    description: "Growing your team, leadership, and organizational structure",
    color: "from-purple-600/20 to-blue-700/20",
    borderColor: "border-purple-600/30",
    sections: [
      {
        id: "growth-scale",
        title: "Growth & Scale",
        href: "/growth-scale",
        description: "Scaling operations and expanding into new markets",
        topics: ["International expansion", "Market leadership", "Series B readiness"],
      },
      {
        id: "team",
        title: "Team & Hiring",
        href: "/team",
        description: "Building world-class teams from India",
        topics: ["Hiring playbook", "Compensation", "ESOP", "Culture"],
      },
      {
        id: "management",
        title: "Leadership",
        href: "/management",
        description: "Building leadership and organizational structure",
        topics: ["Org design", "Performance management", "Leadership development"],
      },
      {
        id: "board-management",
        title: "Board Management",
        href: "/board-management",
        description: "Working effectively with your board of directors",
        topics: ["Board composition", "Meeting cadence", "Governance"],
      },
    ]
  },
  {
    phase: "Phase 5: Operations",
    description: "Infrastructure, security, and operational processes",
    color: "from-slate-600/20 to-blue-800/20",
    borderColor: "border-slate-600/30",
    sections: [
      {
        id: "operations",
        title: "Operations & Tech",
        href: "/operations",
        description: "Infrastructure, security, and operational processes",
        topics: ["Tech stack", "Security", "SOC 2", "Vendor selection"],
      },
      {
        id: "compliance",
        title: "Legal & Compliance",
        href: "/compliance",
        description: "Essential legal framework for Indian startups",
        topics: ["Incorporation", "Tax & GST", "FEMA", "Employment law"],
      },
    ]
  },
];

const quickActions = [
  {
    title: "Pitch Deck Guide",
    href: "/pitch-deck",
    icon: Presentation,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    desc: "12-slide structure & examples"
  },
  {
    title: "Dilution Calc",
    href: "/dilution",
    icon: Calculator,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    desc: "Calculate equity & ownership"
  },
  {
    title: "Fundraising",
    href: "/funding-stages",
    icon: TrendingUp,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    desc: "Pre-seed to Series A guide"
  },
  {
    title: "Compliance",
    href: "/compliance",
    icon: ShieldCheck,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    desc: "Legal checklist for India"
  },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HandbookLayout currentSection="overview">
      <div className="space-y-16">
        <header className={`relative transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="absolute -top-8 -left-8 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 -right-12 w-48 h-48 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              2025-2026 Edition
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1] tracking-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              The Founders<br />
              Handbook
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              A comprehensive guide to building products and raising funding in the Indian ecosystem.
              From your first idea to your Series A and beyond.
            </p>
          </div>
        </header>

        <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="group relative bg-card rounded-2xl border border-border p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${action.bg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300`}>
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {action.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{action.desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section className={`relative rounded-3xl border border-border p-8 bg-gradient-to-br from-card to-muted/30 overflow-hidden transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
          <div className="relative">
            <h2 className="text-xl font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>Why This Handbook?</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Indian SaaS ecosystem is projected to reach <span className="text-foreground font-medium">$50-70 billion by 2030</span>.
              The narrative has evolved from &quot;Building in India for cost arbitrage&quot; to
              &quot;<span className="text-foreground font-medium">Building from India for global value.</span>&quot; This handbook synthesizes ecosystem wisdom,
              2025 benchmarking data, and proven frameworks specifically for Indian founders navigating
              the funding staircase — from Pre-Seed to IPO.
            </p>
          </div>
        </section>

        <section className={`transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>The Startup Journey</h2>
            <p className="text-muted-foreground mt-2">
              Click on any phase to see detailed milestones and requirements
            </p>
          </div>
          <TimelineChart events={journeyTimeline} interactive={true} />
        </section>

        <section className={`transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Complete Handbook</h2>
            <p className="text-muted-foreground mt-2">
              Follow the phases sequentially or jump to the section you need.
            </p>
          </div>

          <div className="space-y-10">
            {phases.map((phaseGroup, phaseIdx) => (
              <div key={phaseGroup.phase} className="relative">
                <div className={`absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b ${phaseGroup.color}`} />

                <div className="mb-4 pl-4">
                  <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>{phaseGroup.phase}</h3>
                  <p className="text-sm text-muted-foreground">{phaseGroup.description}</p>
                </div>

                <div className="grid gap-3 pl-4">
                  {phaseGroup.sections.map((section, i) => (
                    <Link
                      key={section.id}
                      href={section.href}
                      className={`group relative bg-card rounded-xl border ${phaseGroup.borderColor} p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300`}
                      style={{ animationDelay: `${(phaseIdx * 100) + (i * 50)}ms` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {section.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{section.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {section.topics.map((topic, i) => (
                              <span
                                key={i}
                                className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`relative bg-gradient-to-br from-card to-muted/30 rounded-3xl border border-border p-8 overflow-hidden transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-2xl" />
          <div className="relative">
            <h2 className="text-xl font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>Reference</h2>
            <Link
              href="/glossary"
              className="group flex items-center gap-4 p-4 -m-4 rounded-xl hover:bg-primary/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center">
                <span className="text-primary text-lg">≡</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">Glossary</h3>
                <p className="text-sm text-muted-foreground">100+ key terms with definitions, formulas & examples</p>
              </div>
              <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        <section className={`bg-card rounded-3xl border border-border p-8 transition-all duration-700 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-xl font-semibold text-foreground mb-6" style={{ fontFamily: 'var(--font-display)' }}>How to Use This Handbook</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { num: "1", title: "Read sequentially", desc: "Start from Phase 1 and work through each phase", icon: "→" },
              { num: "2", title: "Use the calculators", desc: "Model your specific situation with interactive tools in INR", icon: "◈" },
              { num: "3", title: "Reference the glossary", desc: "Look up unfamiliar terms including India-specific ones", icon: "≡" },
              { num: "4", title: "Apply to your startup", desc: "Use the compliance checklist and worksheets for your journey", icon: "✓" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {item.num}
                </span>
                <div>
                  <div className="font-medium text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className={`text-center py-8 border-t border-border transition-all duration-700 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm text-muted-foreground">
            Built for Indian Founders & Maintained for the Public By{" "}
            <a
              href="https://easyio.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Easyio Technologies
            </a>
          </p>
        </footer>
      </div>
    </HandbookLayout>
  );
}

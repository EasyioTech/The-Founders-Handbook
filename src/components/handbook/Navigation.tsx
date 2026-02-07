"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationPhases = [
  {
    phase: "Getting Started",
    icon: "◈",
    sections: [
      { id: "overview", title: "Overview", href: "/" },
    ]
  },
  {
    phase: "Phase 1: Ideation",
    icon: "✦",
    sections: [
      { id: "idea-to-product", title: "Idea to Product", href: "/idea-to-product" },
      { id: "principles", title: "Founding Principles", href: "/resources/principles" },
    ]
  },
  {
    phase: "Phase 2: Fundraising",
    icon: "◆",
    sections: [
      { id: "funding-stages", title: "Funding Stages", href: "/funding-stages" },
      { id: "pitch-deck", title: "Pitch Deck Guide", href: "/pitch-deck" },
      { id: "financial-metrics", title: "Financial Metrics", href: "/financial-metrics" },
      { id: "calculators", title: "Calculators", href: "/calculators" },
      { id: "dilution-cap-table", title: "Dilution & Cap Table", href: "/dilution" },
    ]
  },
  {
    phase: "Phase 3: Go-to-Market",
    icon: "▲",
    sections: [
      { id: "gtm", title: "Go-to-Market Strategy", href: "/gtm" },
      { id: "partnerships", title: "BD & Partnerships", href: "/partnerships" },
    ]
  },
  {
    phase: "Phase 4: Scaling",
    icon: "●",
    sections: [
      { id: "growth-scale", title: "Growth & Scale", href: "/growth-scale" },
      { id: "team", title: "Team & Hiring", href: "/team" },
      { id: "management", title: "Leadership", href: "/management" },
      { id: "board-management", title: "Board Management", href: "/board-management" },
      { id: "esops", title: "ESOP Deep Dive", href: "/resources/esops" },
    ]
  },
  {
    phase: "Phase 5: Operations",
    icon: "◇",
    sections: [
      { id: "operations", title: "Operations & Tech", href: "/operations" },
      { id: "equity-split", title: "Founder & Team Equity", href: "/equity-split" },
      { id: "compliance", title: "Legal & Compliance", href: "/compliance" },
    ]
  },
  {
    phase: "Reference",
    icon: "≡",
    sections: [
      { id: "glossary", title: "Glossary", href: "/glossary" },
      { id: "resources", title: "Templates & Resources", href: "/resources" },
    ]
  },
];

export function Navigation({ currentSection }: { currentSection: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-4 left-4 z-50 lg:hidden bg-sidebar/75 border border-sidebar-border rounded-lg p-2.5 shadow-lg transition-all duration-200",
          isOpen && "hidden"
        )}
        aria-label="Toggle navigation"
      >
        <svg className="w-5 h-5 text-sidebar-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <nav
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-sidebar/75 backdrop-blur-md z-40 transform transition-transform duration-300 ease-out lg:translate-x-0 nav-glow",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-sidebar-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -left-12 w-32 h-32 bg-sidebar-primary/3 rounded-full blur-2xl" />
        </div>

        <div className="relative p-6 border-b border-sidebar-border">
          <Link href="/" className="block group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sidebar-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-sidebar-primary/20">
                <span className="text-sidebar-primary-foreground text-lg font-bold">S</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  Startup Handbook
                </h1>
                <p className="text-xs text-sidebar-foreground/50">Indian B2B SaaS Guide</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="relative p-4 overflow-y-auto h-[calc(100vh-100px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navigationPhases.map((phase, phaseIdx) => {
            const hasActiveSection = phase.sections.some(s => s.id === currentSection);

            return (
              <div
                key={phase.phase}
                className={cn(
                  phaseIdx > 0 && "mt-2",
                  "transition-all duration-300",
                  mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: `${phaseIdx * 50}ms` }}
              >
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-left",
                    hasActiveSection
                      ? "text-sidebar-primary"
                      : "text-sidebar-foreground/60"
                  )}
                >
                  <span className="text-xs">
                    {phase.icon}
                  </span>
                  <span className="flex-1 text-xs font-medium uppercase tracking-wider">
                    {phase.phase}
                  </span>
                </div>

                <div className="pl-4 mt-1 space-y-0.5 border-l border-sidebar-border/50 ml-4">
                  {phase.sections.map((section) => {
                    const isActive = currentSection === section.id;
                    return (
                      <Link
                        key={section.id}
                        href={section.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200 relative",
                          isActive
                            ? "text-sidebar-primary font-medium bg-sidebar-primary/10"
                            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/30"
                        )}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+0.5rem)] w-1.5 h-1.5 rounded-full bg-sidebar-primary" />
                        )}
                        {section.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>


      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

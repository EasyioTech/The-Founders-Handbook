## Project Summary
The Startup Handbook - A comprehensive Indian B2B SaaS founder's guide covering the journey from idea to funding and beyond. Features interactive calculators, charts, and a searchable glossary of 100+ startup and funding terms. Tailored for the Indian startup ecosystem with INR-based calculations.

## Tech Stack
- **Framework**: Next.js 15.3.5 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x with royal green color scheme
- **UI Components**: Custom components + shadcn/ui primitives
- **Charts**: Recharts library
- **Font**: Fraunces (display), system-ui (body)

## Architecture
```
src/
├── app/                           # Next.js App Router pages
│   ├── page.tsx                   # Overview/landing page
│   ├── idea-to-product/           # Chapter 1: Validation, MVP, PMF
│   ├── funding-stages/            # Chapter 2: Pre-seed to Series
│   ├── pitch-deck/                # Pitch Deck Guide
│   ├── financial-metrics/         # Chapter 3: CAC, LTV, burn rate formulas
│   ├── calculators/               # Chapter 4: Interactive calculators (9 tools)
│   ├── dilution/                  # Chapter 5: Cap table & dilution tools
│   ├── gtm/                       # Chapter 6: Go-to-market strategy
│   ├── partnerships/              # Chapter 7: BD & Partnerships
│   ├── board-management/          # Board management & governance
│   ├── management/                # Leadership & org design
│   ├── growth-scale/              # Growth, scaling, international
│   ├── team/                      # Hiring, compensation, ESOP
│   ├── operations/                # Tech stack, security, vendors
│   ├── compliance/                # Legal & compliance for India
│   └── glossary/                  # Appendix: Searchable glossary (100+ terms)
├── components/
│   ├── handbook/                  # Handbook-specific components
│   │   ├── Navigation.tsx         # Dark sidebar with collapsible phases
│   │   ├── HandbookLayout.tsx     # Page layout wrapper
│   │   ├── UIComponents.tsx       # FormulaBox, InfoCard, Callout, DataTable, etc.
│   │   └── Charts.tsx             # BarChart, LineChart, PieChart, FunnelChart, TimelineChart
│   └── ui/                        # shadcn/ui components
└── lib/
    ├── handbook-data.ts           # Glossary terms (100+), funding stages, benchmarks
    └── utils.ts                   # Utility functions
```

## User Preferences
- Royal green color scheme for an elegant, professional look
- Dark sidebar navigation with collapsible sections
- Clean, modern UI with subtle gradients and shadows
- Fraunces serif font for headings

## Project Guidelines
- Primary color is green (#166534 light mode, #4ade80 dark mode)
- Charts use green color palette (#166534, #15803d, #22c55e, #4ade80, #86efac)
- Navigation uses dark green theme (#0f1a14) with emerald accents
- All calculators use range sliders for inputs
- Formula boxes have green-tinted backgrounds
- Professional royal green aesthetic throughout

## Common Patterns
- Pages follow HandbookLayout wrapper with currentSection prop
- Interactive calculators use useMemo for derived calculations
- Charts accept simple data arrays with label/value objects
- Navigation uses collapsible phase groups with expand/collapse
- Sections use InfoCard, Callout, DataTable, StageCard for content structure
- Headings use fontFamily: 'var(--font-display)' for Fraunces font

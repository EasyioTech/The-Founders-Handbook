export const glossaryTerms: Record<string, { definition: string; example?: string; formula?: string }> = {
  "CAC": {
    definition: "Customer Acquisition Cost - The total cost of acquiring a new customer, including marketing, sales, and related expenses.",
    example: "If you spend ₹8 Lakhs on marketing and acquire 100 customers, your CAC is ₹8,000.",
    formula: "CAC = Total Sales & Marketing Costs ÷ Number of New Customers"
  },
  "ACV": {
    definition: "Annual Contract Value - The average annualized revenue per customer contract, excluding one-time fees.",
    example: "A 3-year contract worth ₹30 Lakhs has an ACV of ₹10 Lakhs.",
    formula: "ACV = Total Contract Value ÷ Contract Length (years)"
  },
  "ARR": {
    definition: "Annual Recurring Revenue - The value of recurring revenue normalized to a one-year period.",
    example: "100 customers paying ₹8,000/month = ₹96 Lakhs ARR",
    formula: "ARR = MRR × 12"
  },
  "MRR": {
    definition: "Monthly Recurring Revenue - The predictable revenue a business expects every month.",
    example: "50 customers at ₹15,000/month = ₹7.5 Lakhs MRR",
    formula: "MRR = Number of Customers × Average Revenue Per User"
  },
  "Burn Rate": {
    definition: "The rate at which a company spends its cash reserves, typically measured monthly.",
    example: "If you start with ₹4 Cr and have ₹2.8 Cr after 3 months, your burn rate is ₹40 Lakhs/month.",
    formula: "Burn Rate = (Starting Cash - Ending Cash) ÷ Number of Months"
  },
  "Runway": {
    definition: "The amount of time a company can continue operating before running out of cash.",
    example: "With ₹5 Cr in the bank and ₹40 Lakhs monthly burn, you have 12.5 months runway.",
    formula: "Runway = Cash Balance ÷ Monthly Burn Rate"
  },
  "LTV": {
    definition: "Lifetime Value - The total revenue expected from a single customer over their entire relationship.",
    example: "Customer pays ₹8,000/month for average 24 months = ₹1.92 Lakhs LTV",
    formula: "LTV = ARPU × Average Customer Lifespan"
  },
  "LTV:CAC Ratio": {
    definition: "The ratio of customer lifetime value to acquisition cost. A healthy ratio is 3:1 or higher.",
    example: "LTV of ₹24,000 and CAC of ₹8,000 = 3:1 ratio (healthy)",
    formula: "LTV:CAC = Customer Lifetime Value ÷ Customer Acquisition Cost"
  },
  "Churn Rate": {
    definition: "The percentage of customers who stop using your product over a given period.",
    example: "If you lose 5 customers out of 100 in a month, your monthly churn is 5%.",
    formula: "Churn Rate = (Customers Lost ÷ Starting Customers) × 100"
  },
  "Dilution": {
    definition: "The reduction in ownership percentage that occurs when new shares are issued to investors.",
    example: "If you own 100% and give 20% to investors, you're diluted to 80%.",
  },
  "Pre-Money Valuation": {
    definition: "The company's valuation before receiving new investment.",
    example: "If investors offer ₹1 Cr for 20%, your pre-money valuation is ₹4 Cr.",
    formula: "Pre-Money = Post-Money - Investment Amount"
  },
  "Post-Money Valuation": {
    definition: "The company's valuation immediately after receiving new investment.",
    example: "₹4 Cr pre-money + ₹1 Cr investment = ₹5 Cr post-money valuation.",
    formula: "Post-Money = Pre-Money + Investment Amount"
  },
  "Cap Table": {
    definition: "Capitalization Table - A spreadsheet showing who owns what percentage of a company.",
    example: "Founders: 70%, Investors: 20%, ESOP: 10%"
  },
  "ESOP": {
    definition: "Employee Stock Option Pool - Shares reserved for employee compensation and incentives. In India, options are typically granted at Face Value.",
    example: "Setting aside 10-15% of equity for current and future employee grants at ₹10 face value per share."
  },
  "Term Sheet": {
    definition: "A non-binding document outlining the key terms of a proposed investment.",
    example: "Includes valuation, investment amount, board seats, and liquidation preferences."
  },
  "SAFE": {
    definition: "Simple Agreement for Future Equity - A contract giving investors right to future equity upon a triggering event. YC's standard instrument.",
    example: "Investor gives $100K via SAFE at $5M cap, converts to equity at Series A."
  },
  "iSAFE": {
    definition: "India Simple Agreement for Future Equity - An Indian adaptation of SAFE, popularized by 100X.VC. It's a convertible instrument compliant with Indian regulations.",
    example: "Investor gives ₹50 Lakhs via iSAFE at ₹20 Cr cap, converts to equity at Series A."
  },
  "Convertible Note": {
    definition: "A loan that converts to equity, typically at a discount, upon a future funding round.",
    example: "₹50 Lakhs note with 20% discount converts at ₹4 per share instead of ₹5."
  },
  "Valuation Cap": {
    definition: "The maximum valuation at which a SAFE/iSAFE or convertible note will convert to equity.",
    example: "A ₹5 Cr cap means even if Series A is at ₹10 Cr, you convert at ₹5 Cr."
  },
  "Discount Rate": {
    definition: "The percentage discount SAFE/iSAFE/note holders receive compared to new investors.",
    example: "20% discount: if Series A is ₹10/share, note holders pay ₹8/share."
  },
  "Due Diligence": {
    definition: "The investigation process investors conduct before making an investment.",
    example: "Reviewing financials, legal documents, customer contracts, MCA filings, and team background."
  },
  "Liquidation Preference": {
    definition: "The order and amount investors get paid in a sale or liquidation event.",
    example: "1x non-participating: investor gets investment back OR their equity share, whichever is higher."
  },
  "Pro Rata Rights": {
    definition: "The right to participate in future funding rounds to maintain ownership percentage.",
    example: "A 10% owner can invest 10% of any future round to stay at 10%."
  },
  "MVP": {
    definition: "Minimum Viable Product - The simplest version of a product that can be released to test assumptions.",
    example: "A landing page with email signup to test demand before building the full product."
  },
  "PMF": {
    definition: "Product-Market Fit - When your product satisfies a strong market demand.",
    example: "Signs: organic growth, high retention, customers actively recommending your product."
  },
  "TAM": {
    definition: "Total Addressable Market - The total market demand for your product or service.",
    example: "All businesses in India that could potentially buy your B2B software."
  },
  "SAM": {
    definition: "Serviceable Available Market - The portion of TAM you can realistically target.",
    example: "B2B software companies in India with 50-500 employees."
  },
  "SOM": {
    definition: "Serviceable Obtainable Market - The realistic market share you can capture.",
    example: "5% of your SAM in the first 3 years = your SOM."
  },
  "Unit Economics": {
    definition: "The direct revenues and costs associated with a single unit (usually a customer).",
    example: "If each customer brings ₹40,000 revenue at ₹15,000 cost, unit economics are positive."
  },
  "Gross Margin": {
    definition: "Revenue minus cost of goods sold, expressed as a percentage.",
    example: "Revenue: ₹100, COGS: ₹30, Gross Margin: 70%",
    formula: "Gross Margin = ((Revenue - COGS) ÷ Revenue) × 100"
  },
  "Net Revenue Retention": {
    definition: "The percentage of recurring revenue retained from existing customers, including upsells.",
    example: "NRR of 120% means you're growing 20% just from existing customers.",
    formula: "NRR = ((Starting MRR + Expansion - Contraction - Churn) ÷ Starting MRR) × 100"
  },
  "Payback Period": {
    definition: "The time required to recover the cost of acquiring a customer.",
    example: "CAC of ₹1 Lakh with ₹8,000 monthly margin = 12.5 month payback.",
    formula: "Payback Period = CAC ÷ Monthly Gross Profit per Customer"
  },
  "Angel Investor": {
    definition: "An individual who provides capital for startups, typically in early stages.",
    example: "Investing ₹20 Lakhs - ₹1 Cr in exchange for equity or iSAFE notes."
  },
  "Venture Capital": {
    definition: "Professional firms that invest pooled money from LPs into high-growth startups.",
    example: "Indian VCs like Accel, Peak XV (Sequoia India), Blume Ventures investing ₹2 Cr - ₹100 Cr+ per deal."
  },
  "Lead Investor": {
    definition: "The primary investor in a round who sets terms and often takes a board seat.",
    example: "The VC who writes the largest check and negotiates the term sheet."
  },
  "Pitch Deck": {
    definition: "A presentation used to communicate your business to potential investors.",
    example: "10-15 slides covering problem, solution, market, traction, team, and ask."
  },
  "Traction": {
    definition: "Evidence that your product is gaining market acceptance and growth.",
    example: "100% MoM growth, 1,000 paying customers, ₹50 Lakhs MRR."
  },
  "Bridge Round": {
    definition: "Short-term financing to extend runway until the next major funding round.",
    example: "Raising ₹2 Cr to last 6 more months until Series A closes."
  },
  "Down Round": {
    definition: "A funding round at a lower valuation than the previous round.",
    example: "Series B at ₹300 Cr valuation after Series A at ₹400 Cr valuation."
  },
  "Cliff": {
    definition: "A period before any equity vests, typically 1 year for employees.",
    example: "4-year vesting with 1-year cliff: no equity until month 12, then 25% vests."
  },
  "Vesting": {
    definition: "The process by which equity is earned over time.",
    example: "4-year vesting: you earn 25% of your equity grant each year."
  },
  "Private Limited Company": {
    definition: "The standard corporate structure for startups in India. Offers limited liability and allows issuing different share classes.",
    example: "XYZ Technologies Private Limited - the legal entity that raises funding and employs the team."
  },
  "GST": {
    definition: "Goods and Services Tax - India's unified indirect tax. SaaS sold domestically is taxed at 18%.",
    example: "Domestic SaaS: 18% GST. Export of services: Zero-rated under LUT (Letter of Undertaking)."
  },
  "SOFTEX": {
    definition: "Software Export Declaration Form - Required by RBI for every invoice raised to a foreign client for software/SaaS exports.",
    example: "File SOFTEX with STPI within 30 days of invoice to certify your export earnings."
  },
  "FEMA": {
    definition: "Foreign Exchange Management Act - Regulates foreign exchange transactions in India. Critical for cross-border SaaS.",
    example: "Export proceeds must be repatriated within 15 months (extended from 9 months in 2025)."
  },
  "Reverse Flip": {
    definition: "Moving a company's domicile from a foreign country (usually Delaware) back to India.",
    example: "PhonePe, Groww, and Pine Labs have reverse flipped to India for BSE/NSE IPO access."
  },
  "DTAA": {
    definition: "Double Taxation Avoidance Agreement - Treaties between India and other countries to prevent double taxation.",
    example: "US-India DTAA helps avoid paying tax twice on software royalties and services."
  },
  "TDS": {
    definition: "Tax Deducted at Source - Tax withheld at the time of payment. Applicable on many B2B transactions.",
    example: "Deduct TDS at 10% on professional services before paying vendors."
  },
  "Burn Multiple": {
    definition: "The ratio of net burn to net new ARR. Measures capital efficiency in growth.",
    example: "Burn Multiple = Net Burn ÷ Net New ARR. Best-in-class Indian SaaS: <1.5x",
    formula: "Burn Multiple = Net Burn ÷ Net New ARR"
  },
  "Anti-Dilution": {
    definition: "Protection for investors if the company raises money at a lower valuation (down round).",
    example: "Broad-Based Weighted Average is founder-friendly. Full Ratchet is toxic and should be avoided."
  },
  "Drag-Along Rights": {
    definition: "Allows majority shareholders to force minority shareholders to sell their shares during an acquisition.",
    example: "If investors holding 60% agree to a sale, they can 'drag' the founders along."
  },
  "Tag-Along Rights": {
    definition: "Protects minority shareholders by giving them the right to sell alongside majority shareholders.",
    example: "If founders sell 20% to a strategic buyer, ESOP holders can 'tag along' at the same price."
  },
  "ROFR": {
    definition: "Right of First Refusal - Existing investors' right to purchase shares before they're sold to third parties.",
    example: "If a founder wants to sell shares, existing investors get the first chance to buy at the same terms."
  },
  "STPI": {
    definition: "Software Technology Parks of India - A government body facilitating software exports. Required for SOFTEX compliance.",
    example: "Register with STPI to file SOFTEX forms and access export benefits."
  },
  "LUT": {
    definition: "Letter of Undertaking - Allows exporting services without paying GST upfront (zero-rated supply).",
    example: "File LUT with GST department to export SaaS to US clients without charging 18% GST."
  },
  "FIRC": {
    definition: "Foreign Inward Remittance Certificate - Proof of foreign currency received, required for export compliance.",
    example: "Bank issues FIRC when you receive payment from US customers. Needed for SOFTEX closure."
  },
  "Quick Ratio": {
    definition: "SaaS metric measuring growth efficiency: (New MRR + Expansion MRR) ÷ (Churned MRR + Contraction MRR).",
    example: "Quick Ratio of 4 means for every ₹1 lost to churn, you're adding ₹4 in new/expansion revenue.",
    formula: "Quick Ratio = (New MRR + Expansion) ÷ (Churn + Contraction)"
  },
  "Magic Number": {
    definition: "Sales efficiency metric: Net New ARR ÷ Sales & Marketing Spend from prior quarter.",
    example: "Magic Number > 0.75 indicates efficient sales spend. >1.0 means add more sales capacity.",
    formula: "Magic Number = Net New ARR (Q) ÷ S&M Spend (Q-1)"
  },
  "Rule of 40": {
    definition: "Growth rate + Profit margin should exceed 40%. Benchmark for SaaS health at scale.",
    example: "50% growth + (-5%) margin = 45% → Healthy. 20% growth + 15% margin = 35% → Needs work.",
    formula: "Rule of 40 Score = Revenue Growth Rate + EBITDA Margin"
  },
  "ARPU": {
    definition: "Average Revenue Per User - Monthly or annual revenue divided by number of customers.",
    example: "₹40L MRR from 100 customers = ₹40,000 ARPU",
    formula: "ARPU = Total Revenue ÷ Number of Customers"
  },
  "ACV": {
    definition: "Annual Contract Value - The annualized value of a customer contract.",
    example: "A 2-year contract worth ₹20L has an ACV of ₹10L.",
    formula: "ACV = Total Contract Value ÷ Years"
  },
  "TCV": {
    definition: "Total Contract Value - The full value of a customer contract over its entire duration.",
    example: "3-year deal at ₹5L/year = ₹15L TCV"
  },
  "Cohort Analysis": {
    definition: "Tracking behavior of customer groups (cohorts) acquired in the same period over time.",
    example: "January cohort retained 80% after 12 months vs 70% for March cohort."
  },
  "Logo Churn": {
    definition: "Percentage of customers lost, regardless of revenue. Different from revenue churn.",
    example: "Lost 5 out of 100 customers = 5% logo churn (even if revenue churn was only 2%)."
  },
  "Negative Churn": {
    definition: "When expansion revenue from existing customers exceeds churned revenue.",
    example: "Lost ₹2L to churn but gained ₹3L from upsells = -₹1L (negative) churn. NRR > 100%."
  },
  "Land and Expand": {
    definition: "GTM strategy: Start with small deals, then grow account size over time.",
    example: "Sign 1 team for ₹50K/mo, expand to entire org for ₹5L/mo over 2 years."
  },
  "PLG": {
    definition: "Product-Led Growth - Growth strategy where the product itself drives acquisition and retention.",
    example: "Notion, Figma, Slack: Free tier → Viral sharing → Paid conversion."
  },
  "Bottom-Up SaaS": {
    definition: "Sales motion where end-users adopt the product before organization-level purchase.",
    example: "Individual developers use free tier → Team adopts → Enterprise procurement."
  },
  "ICP": {
    definition: "Ideal Customer Profile - Description of the perfect target customer for your product.",
    example: "ICP: Series A-C B2B SaaS companies, 50-200 employees, $5M+ ARR, US-based."
  },
  "Founder Vesting": {
    definition: "Schedule under which founders earn their equity over time. Protects against early departures.",
    example: "Standard: 4-year vesting with 1-year cliff. Departing founder forfeits unvested shares."
  },
  "Acceleration": {
    definition: "Immediate vesting of unvested equity upon specific trigger events.",
    example: "Single trigger: 100% vests on acquisition. Double trigger: 100% on acquisition + termination."
  },
  "Preference Stack": {
    definition: "The order in which investors get paid during a liquidation event.",
    example: "Series B (1x) → Series A (1x) → Seed → Common (founders, employees)."
  },
  "Participation Rights": {
    definition: "Whether investors can take their preference AND participate in remaining proceeds.",
    example: "Participating preferred: Get 1x back + pro-rata of remainder. Non-participating: 1x OR pro-rata."
  },
  "Information Rights": {
    definition: "Investor rights to receive regular company updates and financial information.",
    example: "Typical: Monthly P&L, quarterly board deck, annual audited financials."
  },
  "Board Observer": {
    definition: "Non-voting attendee at board meetings, typically smaller investors.",
    example: "Angel investor gets board observer seat without voting rights."
  },
  "Protective Provisions": {
    definition: "Veto rights investors have over major company decisions.",
    example: "Cannot sell company, raise debt, or issue new shares without investor approval."
  },
  "Pay-to-Play": {
    definition: "Provision requiring investors to participate in future rounds to maintain their rights.",
    example: "If investor doesn't invest pro-rata in next round, preferred converts to common."
  },
  "Authorized Shares": {
    definition: "Maximum number of shares a company can issue, set in articles of incorporation.",
    example: "Authorize 10M shares but only issue 1M to leave room for future issuances."
  },
  "409A Valuation": {
    definition: "Independent valuation determining fair market value of common stock for option grants (US companies).",
    example: "409A sets common stock at $2/share for employee option grants even if preferred is $5."
  },
  "Fair Market Value": {
    definition: "The price at which equity would change hands between willing buyer and seller.",
    example: "For Indian private companies, FMV calculated by registered valuer for ESOP grants."
  },
  "Waterfall Analysis": {
    definition: "Calculation showing how exit proceeds are distributed among shareholders.",
    example: "At ₹100Cr exit: Investors get ₹30Cr (1x pref), remaining ₹70Cr split by ownership."
  },
  "NDR": {
    definition: "Net Dollar Retention (same as NRR) - Revenue retained from existing customers including expansions.",
    example: "Start year with ₹1Cr from cohort, end with ₹1.2Cr after churn and expansion = 120% NDR."
  },
  "GRR": {
    definition: "Gross Revenue Retention - Revenue retained from existing customers, excluding expansion.",
    example: "Start: ₹1Cr, Churn: ₹10L, End: ₹90L = 90% GRR. Doesn't count upsells.",
    formula: "GRR = (Starting MRR - Churn - Contraction) ÷ Starting MRR"
  },
  "AE": {
    definition: "Account Executive - Sales role responsible for closing deals with qualified leads.",
    example: "SDRs book demos, AEs run demos and close deals. Typical AE OTE: ₹25-50L in India."
  },
  "SDR": {
    definition: "Sales Development Representative - Entry-level sales role focused on prospecting and qualifying.",
    example: "SDR targets: 15 qualified meetings/month, pipeline generation."
  },
  "OTE": {
    definition: "On-Target Earnings - Total compensation (base + commission) if sales targets are met.",
    example: "AE with ₹15L base + ₹15L commission at 100% quota = ₹30L OTE."
  },
  "Quota": {
    definition: "Sales target an AE must achieve, typically measured in ARR or bookings.",
    example: "₹2Cr annual quota = must close ₹2Cr in new ARR to earn full commission."
  },
  "ASP": {
    definition: "Average Selling Price - Average deal size for closed deals.",
    example: "100 deals closed at total ₹1Cr = ₹1L ASP"
  },
  "Sales Cycle": {
    definition: "Time from first contact to deal close.",
    example: "SMB: 1-2 weeks. Mid-market: 1-3 months. Enterprise: 3-12 months."
  },
  "Win Rate": {
    definition: "Percentage of opportunities that convert to closed deals.",
    example: "20 qualified opps, 5 closed = 25% win rate. Benchmark: 20-30% for enterprise."
  },
  "Pipeline": {
    definition: "Total value of deals in active sales process at various stages.",
    example: "₹5Cr pipeline at 25% win rate = ₹1.25Cr expected bookings."
  },
  "Pipeline Coverage": {
    definition: "Ratio of pipeline to quota, indicating likelihood of hitting targets.",
    example: "₹8Cr pipeline vs ₹2Cr quota = 4x coverage. Benchmark: 3-4x."
  },
  "MQL": {
    definition: "Marketing Qualified Lead - Lead meeting basic criteria from marketing activities.",
    example: "Downloaded whitepaper + company size >50 employees = MQL."
  },
  "SQL": {
    definition: "Sales Qualified Lead - Lead verified by sales as ready for active selling.",
    example: "MQL + confirmed budget + decision maker = SQL."
  },
  "PQL": {
    definition: "Product Qualified Lead - User whose product behavior indicates buying intent.",
    example: "Free user who invites 5+ teammates and uses advanced features = PQL."
  },
  "Venture Debt": {
    definition: "Loan to startups, often alongside equity rounds, with warrants as additional compensation.",
    example: "Raise ₹50Cr equity + ₹15Cr venture debt at 12% interest + 1% warrant coverage."
  },
  "Revenue-Based Financing": {
    definition: "Non-dilutive funding repaid as percentage of monthly revenue.",
    example: "Take ₹2Cr, repay 5% of monthly revenue until ₹2.4Cr repaid."
  },
  "Bridge Financing": {
    definition: "Short-term funding between major rounds, often from existing investors.",
    example: "Raise ₹1Cr bridge via convertible note while Series A is being finalized."
  },
  "Inside Round": {
    definition: "Funding round led or primarily funded by existing investors.",
    example: "Existing seed investors put in ₹2Cr more without new lead = inside round."
  },
  "Extension Round": {
    definition: "Additional funding at the same terms as previous round.",
    example: "Closed Series A at ₹100Cr valuation, 3 months later add ₹5Cr at same valuation."
  },
  "Flat Round": {
    definition: "Funding round at same valuation as previous round (neither up nor down).",
    example: "Series B at ₹400Cr same as Series A+ valuation = flat round."
  },
  "Secondary Sale": {
    definition: "Sale of existing shares (vs new issuance), often for founder/employee liquidity.",
    example: "Founder sells ₹2Cr of personal shares to incoming Series B investor."
  },
  "ESOP Buyback": {
    definition: "Company repurchasing vested ESOPs from employees at current valuation.",
    example: "Company offers to buy vested options at ₹500/share providing employee liquidity."
  },
  "Board Composition": {
    definition: "Structure and makeup of a company's board of directors.",
    example: "2 founder seats, 2 investor seats, 1 independent = 5-person board."
  },
  "Independent Director": {
    definition: "Board member not affiliated with founders or investors.",
    example: "Experienced CXO from adjacent industry serving as independent voice."
  },
  "Drag Along": {
    definition: "Right of majority shareholders to force minority to sell in an acquisition.",
    example: "If 75%+ approve acquisition, remaining shareholders must sell."
  },
  "Reserved Matters": {
    definition: "Major decisions requiring board or investor approval before proceeding.",
    example: "Hiring C-suite, raising debt >₹1Cr, M&A require board approval."
  },
  "Data Room": {
    definition: "Secure repository of company documents shared during due diligence.",
    example: "Data room includes: financials, cap table, contracts, employee agreements, IP filings."
  },
  "CIM": {
    definition: "Confidential Information Memorandum - Detailed document prepared for potential acquirers or investors.",
    example: "30-page CIM covering business overview, financials, market, team for M&A process."
  },
  "LOI": {
    definition: "Letter of Intent - Non-binding document expressing serious interest in acquisition.",
    example: "Acquirer sends LOI at ₹500Cr, 30-day exclusivity for due diligence."
  },
  "Exclusivity": {
    definition: "Period during which target company cannot negotiate with other potential acquirers.",
    example: "45-day exclusivity granted to lead bidder during M&A due diligence."
  },
  "Reps and Warranties": {
    definition: "Statements by seller about company's condition, backed by legal liability.",
    example: "Seller represents: no undisclosed liabilities, IP owned, contracts valid."
  },
  "Escrow": {
    definition: "Portion of acquisition proceeds held back to cover potential claims.",
    example: "10% of purchase price held in escrow for 18 months for reps & warranties claims."
  },
  "Earnout": {
    definition: "Additional payment contingent on post-acquisition performance targets.",
    example: "₹300Cr upfront + ₹100Cr earnout if ARR exceeds ₹50Cr in 12 months."
  },
  "Acqui-hire": {
    definition: "Acquisition primarily to hire the target company's team rather than product.",
    example: "Large tech co acquires 10-person startup for ₹10Cr mainly for engineering talent."
  },
  "Accredited Investor": {
    definition: "Individual meeting income/net worth thresholds to invest in private offerings.",
    example: "In India, accredited investor: ₹2Cr+ annual income or ₹7.5Cr+ net worth."
  },
  "Anchor Investor": {
    definition: "Large, reputable investor whose participation encourages others to invest.",
    example: "Tier-1 VC as anchor builds confidence for other investors to join the round."
  },
  "Party Round": {
    definition: "Round with many small investors and no clear lead.",
    example: "15 angels each putting ₹25L = party round. Often lacks governance and support."
  },
  "Preemptive Round": {
    definition: "Funding offered proactively by investors before company formally fundraises.",
    example: "VC offers term sheet based on traction even though founders weren't raising."
  },
  "SPV": {
    definition: "Special Purpose Vehicle - Legal entity pooling multiple investors into single cap table entry.",
    example: "Angels syndicate forms SPV to invest ₹5Cr as single entity vs 20 individual entries."
  },
  "Carry": {
    definition: "Share of profits (typically 20%) that VC fund managers earn from successful exits.",
    example: "Fund returns ₹500Cr on ₹100Cr invested. GPs earn 20% carry on ₹400Cr profit = ₹80Cr."
  },
  "Management Fee": {
    definition: "Annual fee (typically 2%) VCs charge LPs to operate the fund.",
    example: "₹500Cr fund × 2% = ₹10Cr/year for salaries, operations, deal sourcing."
  },
  "LP": {
    definition: "Limited Partner - Investor in a VC fund (pension funds, endowments, family offices).",
    example: "LPs commit capital, GPs (General Partners) make investment decisions."
  },
  "DPI": {
    definition: "Distributions to Paid-In - Cash returned to LPs relative to capital invested.",
    example: "Fund invested ₹100Cr, returned ₹150Cr = 1.5x DPI."
  },
  "TVPI": {
    definition: "Total Value to Paid-In - Total value (realized + unrealized) relative to capital invested.",
    example: "₹100Cr invested, ₹50Cr returned + ₹200Cr paper value = 2.5x TVPI."
  },
  "J-Curve": {
    definition: "Pattern where fund value dips initially (fees, failed investments) before rising.",
    example: "Typical VC fund shows negative returns for 3-4 years before successful exits."
  },
  "Vintage Year": {
    definition: "Year a VC fund was raised, used for benchmarking performance.",
    example: "2021 vintage funds benchmark against other funds raised in 2021."
  },
  "Follow-on": {
    definition: "Additional investment by existing investor in subsequent rounds.",
    example: "Seed investor reserves 2x initial check for follow-on in Series A and B."
  },
  "Markup": {
    definition: "Increase in company valuation between funding rounds.",
    example: "Seed at ₹20Cr, Series A at ₹100Cr = 5x markup."
  },
  "Paper Returns": {
    definition: "Unrealized gains based on latest valuation, not actual cash.",
    example: "Investment worth ₹50Cr on paper based on last round, but no actual exit."
  },
  "MOIC": {
    definition: "Multiple on Invested Capital - Total return multiple on an investment.",
    example: "Invested ₹1Cr, exited at ₹10Cr = 10x MOIC.",
    formula: "MOIC = Exit Value ÷ Invested Capital"
  },
  "IRR": {
    definition: "Internal Rate of Return - Annualized return accounting for time value of money.",
    example: "10x in 5 years = ~58% IRR. 10x in 10 years = ~26% IRR.",
    formula: "IRR accounts for timing of cash flows"
  }
};

export const fundingStages = [
  {
    name: "Pre-Seed",
    typical_amount: "₹1 Cr - ₹3 Cr",
    typical_amount_usd: "$120K - $360K",
    valuation: "₹10 Cr - ₹25 Cr",
    dilution: "10-15%",
    sources: ["Friends & Family", "Angel Networks", "Micro-VCs", "Accelerators"],
    what_investors_look_for: ["Strong founding team", "Clear problem statement", "Initial market research"],
    milestones: ["Idea validation", "Team formation", "MVP / Initial prototype", "First 10 unaffiliated users"],
    risk_profile: "Technology Risk (Can we build it?) and Market Risk (Does anyone care?)"
  },
  {
    name: "Seed",
    typical_amount: "₹4 Cr - ₹16 Cr",
    typical_amount_usd: "$500K - $2M",
    valuation: "₹30 Cr - ₹60 Cr",
    dilution: "15-25%",
    sources: ["Super Angels", "Seed Funds (Blume, Kae, 100X.VC)", "Accelerator Grads"],
    what_investors_look_for: ["Working MVP", "Early traction (Users 11-100)", "Clear go-to-market strategy"],
    milestones: ["Product-Market Fit signals", "First paying customers", "Initial team hired", "Repeatable sales process"],
    risk_profile: "Go-to-Market Risk (Can we sell this repeatedly?)"
  },
  {
    name: "Series A",
    typical_amount: "₹25 Cr - ₹80 Cr",
    typical_amount_usd: "$3M - $10M",
    valuation: "₹125 Cr - ₹250 Cr ($15M - $30M)",
    dilution: "20-30%",
    sources: ["Top Tier VCs (Accel, Peak XV, Lightspeed)", "Corporate VCs"],
    what_investors_look_for: ["Product-market fit proven", "Repeatable sales engine", "Strong unit economics (LTV:CAC > 3x)"],
    milestones: ["₹8 Cr+ ARR ($1M+)", "Clear path to profitability", "Scalable customer acquisition"],
    risk_profile: "Scaling Risk (Can we spend ₹1 to make ₹3 at scale?)"
  },
  {
    name: "Series B",
    typical_amount: "₹100 Cr+",
    typical_amount_usd: "$12M - $50M",
    valuation: "₹400 Cr - ₹800 Cr ($50M - $100M)",
    dilution: "15-25%",
    sources: ["Global VCs", "Growth Equity Firms", "Private Equity"],
    what_investors_look_for: ["Proven business model", "Market leadership potential", "Strong management team"],
    milestones: ["₹40 Cr+ ARR ($5M+)", "Team scaling", "US/Global market expansion"],
    risk_profile: "Execution Risk (Can we manage a large organization and defeat incumbents?)"
  },
  {
    name: "Series C+",
    typical_amount: "₹400 Cr+",
    typical_amount_usd: "$50M+",
    valuation: "₹1,600 Cr+ ($200M+)",
    dilution: "10-20%",
    sources: ["Late-stage VCs", "Hedge Funds", "PE Funds", "Sovereign Funds", "Strategic Investors"],
    what_investors_look_for: ["Market dominance", "Path to IPO/exit", "International expansion"],
    milestones: ["₹160 Cr+ ARR ($20M+)", "Profitability or clear path", "Market leader status", "IPO readiness"],
    risk_profile: "Exit Risk (Can we deliver returns to investors?)"
  },
];

export const indianInvestors = {
  angels: [
    { name: "Indian Angel Network", type: "Angel Network", typical_check: "₹25L - ₹2Cr" },
    { name: "Mumbai Angels", type: "Angel Network", typical_check: "₹25L - ₹1.5Cr" },
    { name: "Venture Catalysts", type: "Accelerator + Angels", typical_check: "₹1Cr" },
  ],
  seedFunds: [
    { name: "Blume Ventures", type: "Seed/Early VC", typical_check: "₹2Cr - ₹10Cr" },
    { name: "Kae Capital", type: "Seed VC", typical_check: "₹2Cr - ₹8Cr" },
    { name: "100X.VC", type: "Micro VC (iSAFE)", typical_check: "₹1.25Cr" },
    { name: "Titan Capital", type: "Angel Fund", typical_check: "₹50L - ₹2Cr" },
    { name: "Better Capital", type: "Pre-seed/Seed", typical_check: "₹50L - ₹3Cr" },
  ],
  seriesA: [
    { name: "Accel India", type: "Multi-stage VC", typical_check: "₹20Cr - ₹100Cr" },
    { name: "Peak XV Partners (Sequoia)", type: "Multi-stage VC", typical_check: "₹25Cr - ₹150Cr" },
    { name: "Lightspeed India", type: "Multi-stage VC", typical_check: "₹20Cr - ₹80Cr" },
    { name: "Matrix Partners India", type: "Multi-stage VC", typical_check: "₹15Cr - ₹60Cr" },
    { name: "Elevation Capital", type: "Multi-stage VC", typical_check: "₹20Cr - ₹100Cr" },
  ],
};

export const productStages = [
  {
    stage: "Ideation",
    duration: "1-3 months",
    activities: [
      "Problem identification and validation",
      "Customer discovery interviews (50+)",
      "Competitive landscape analysis",
      "Initial solution hypothesis",
    ],
    outputs: ["Problem statement", "Customer personas", "Value proposition canvas"],
    key_questions: [
      "Is this a real problem people have?",
      "Are people actively seeking solutions?",
      "How are they solving it today?",
    ],
  },
  {
    stage: "Validation",
    duration: "2-4 months",
    activities: [
      "Landing page with signup",
      "Smoke tests and fake door tests",
      "Letter of intent collection",
      "Pilot program design",
    ],
    outputs: ["Validated problem", "Early waitlist", "Initial pricing signals"],
    key_questions: [
      "Will people pay for this?",
      "What features are must-haves vs nice-to-haves?",
      "What's the right price point?",
    ],
  },
  {
    stage: "MVP",
    duration: "2-6 months",
    activities: [
      "Core feature development",
      "Alpha testing with design partners",
      "Iterative feedback loops",
      "Basic analytics implementation",
    ],
    outputs: ["Working product", "First 10 users", "Usage data"],
    key_questions: [
      "Are users actually using the product?",
      "What's the activation rate?",
      "What features drive retention?",
    ],
  },
  {
    stage: "Product-Market Fit",
    duration: "6-18 months",
    activities: [
      "Feature refinement based on data",
      "Customer success optimization",
      "Scalable acquisition channels",
      "Pricing optimization",
    ],
    outputs: ["Retention curves", "NPS scores", "Repeatable sales"],
    key_questions: [
      "Would users be very disappointed without us? (>40%)",
      "Is growth organic?",
      "Are unit economics positive?",
    ],
  },
  {
    stage: "Scale",
    duration: "Ongoing",
    activities: [
      "Team expansion",
      "Process standardization",
      "US/Global market expansion",
      "Product line extension",
    ],
    outputs: ["Predictable growth", "Market leadership", "Platform potential"],
    key_questions: [
      "Can we 10x without breaking?",
      "What's our moat?",
      "Where do we expand next (US, Europe, SEA)?",
    ],
  },
];

export const indianSaaSBenchmarks = {
  metrics: [
    { metric: "LTV:CAC Ratio", benchmark: "> 3:1", context: "Efficient growth standard. Best-in-class PLG companies reach 5:1" },
    { metric: "CAC Payback", benchmark: "< 12 months", context: "For SMBs, aim for <9 months; Enterprise can stretch to 15-18 months" },
    { metric: "Net Revenue Retention", benchmark: "> 110%", context: "Measures growth from existing customers. >100% = grow with zero new sales" },
    { metric: "Gross Margin", benchmark: "75% - 85%", context: "Pure SaaS should have high margins. Lower suggests high service costs" },
    { metric: "Burn Multiple", benchmark: "< 2x", context: "Spend less than ₹2 to generate ₹1 of new ARR. <1.5x preferred in 2025" },
    { metric: "Monthly Churn", benchmark: "< 3%", context: "SMB: 3-5% acceptable. Enterprise: <1% expected" },
    { metric: "Conversion Rate", benchmark: "1.5% - 3%", context: "Visitor to lead. Organic traffic converts higher than paid" },
  ],
  exitPathways: [
    { pathway: "Indian IPO (BSE/NSE)", description: "Maturing market with tech IPOs commanding premium multiples", examples: "Freshworks path via NYSE, but domestic listings rising" },
    { pathway: "US IPO (NASDAQ/NYSE)", description: "Global liquidity, higher multiples, requires Delaware structure", examples: "Freshworks, Atlassian model" },
    { pathway: "Strategic Acquisition", description: "Acquisition by larger tech company for technology or market access", examples: "Common exit for SaaS in ₹100-500Cr range" },
    { pathway: "Secondary Sale", description: "Selling shares to late-stage investors or PE firms", examples: "Liquidity for founders/early investors before IPO" },
  ],
};

export const complianceChecklist = [
  { item: "Private Limited Company incorporation", critical: true, description: "Standard structure for raising VC. LLPs/proprietorships unsuitable." },
  { item: "IP Assignment Agreement signed", critical: true, description: "Transfer all pre-incorporation code/IP to the company entity." },
  { item: "Co-founder Agreement with vesting", critical: true, description: "4-year vesting with 1-year cliff. Protects against dead equity." },
  { item: "GST Registration", critical: true, description: "Mandatory for SaaS. 18% on domestic, Zero-rated exports under LUT." },
  { item: "SOFTEX filing setup with STPI", critical: true, description: "Required for every foreign invoice. Non-compliance = frozen accounts." },
  { item: "CA appointed for compliance", critical: true, description: "GST, TDS, MCA filings. Negligence leads to penalties." },
  { item: "FEMA compliance documented", critical: true, description: "Export realization within 15 months. RBI reporting requirements." },
  { item: "RBI e-Mandate setup (domestic SaaS)", critical: false, description: "AFA required for recurring payments >₹15,000. Impacts retention." },
  { item: "DTAA benefits documented", critical: false, description: "For cross-border payments to avoid double taxation." },
  { item: "Data localization compliance", critical: false, description: "For fintech/healthtech, certain data must stay in India." },
];

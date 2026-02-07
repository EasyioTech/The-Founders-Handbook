"use client";

import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { InfoCard, Callout, FormulaBox, DataTable } from "@/components/handbook/UIComponents";
import { PieChart } from "@/components/handbook/Charts";

export default function EsopPage() {
    const esopDistribution = [
        { label: "Founding Team (Late)", value: 15 },
        { label: "Early Key Hires", value: 35 },
        { label: "Future Hires (Growth)", value: 40 },
        { label: "Advisors", value: 10 },
    ];

    return (
        <HandbookLayout currentSection="resources">
            <div className="space-y-10">
                <header>
                    <div className="text-sm text-primary font-medium mb-2">Resources</div>
                    <h1 className="font-display text-4xl text-foreground">Employee Stock Ownership Plans (ESOPs)</h1>
                    <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
                        A comprehensive guide to understanding, structuring, and granting equity to employees in Indian startups.
                    </p>
                </header>

                <section className="space-y-6">
                    <h2 className="font-display text-2xl text-foreground">What is an ESOP?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        An ESOP is a scheme where a company reserves a portion of its equity (shares) for employees.
                        Crucially, employees are granted <strong>options</strong>, not shares directly. An option gives the right
                        to buy a share at a pre-determined price (Exercise Price) in the future.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <InfoCard title="Why ESOPs Matter?" icon="🚀" variant="success">
                            <ul className="text-sm space-y-2">
                                <li><span className="font-medium">Alignment:</span> Employees think like owners.</li>
                                <li><span className="font-medium">Wealth Creation:</span> Life-changing upside for early risks.</li>
                                <li><span className="font-medium">Retention:</span> Vesting keeps talent for the long haul.</li>
                                <li><span className="font-medium">Cash Conservation:</span> Compete with big tech salaries.</li>
                            </ul>
                        </InfoCard>
                        <InfoCard title="Common Terms" icon="📚" variant="info">
                            <ul className="text-sm space-y-2">
                                <li><span className="font-medium">Grant Date:</span> When options are given.</li>
                                <li><span className="font-medium">Vesting:</span> Earning the right to own over time.</li>
                                <li><span className="font-medium">Cliff:</span> Minimum period before any vesting (usually 1 yr).</li>
                                <li><span className="font-medium">Exercise:</span> Converting options to shares.</li>
                            </ul>
                        </InfoCard>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="font-display text-2xl text-foreground">Structuring the Pool</h2>
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div className="bg-card rounded-xl border border-border p-6">
                            <h3 className="font-semibold mb-4 text-center">Typical Pool Allocations</h3>
                            <PieChart data={esopDistribution} />
                            <p className="text-sm text-center text-muted-foreground mt-4">
                                Most startups create a 10-15% pool post-money at the Seed stage.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <FormulaBox
                                title="Calculated on Fully Diluted Basis"
                                formula="Total Shares = Founders + Investors + ESOP Pool"
                                example="If you raise Seed round selling 20% and want a 10% ESOP pool, Founders retain 70%."
                            />
                            <Callout type="warning" title="Dilution Awareness">
                                The ESOP pool comes out of the <strong>Founders&apos;</strong> equity primarily, usually mandated by investors <em>before</em> their money comes in (Pre-Money).
                            </Callout>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="font-display text-2xl text-foreground">Standard Vesting Schedule</h2>
                    <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                        <div className="flex items-center gap-4 text-lg font-medium text-foreground border-b border-border pb-4">
                            4-Year Vesting with 1-Year Cliff
                        </div>
                        <div className="space-y-4 pt-2">
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground shrink-0">1</div>
                                <div>
                                    <h4 className="font-medium text-foreground">Year 0 - 1 (The Cliff)</h4>
                                    <p className="text-sm text-muted-foreground">No options vest. If the employee leaves, they get nothing.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary shrink-0">2</div>
                                <div>
                                    <h4 className="font-medium text-foreground">Month 12 (Cliff End)</h4>
                                    <p className="text-sm text-muted-foreground"><strong>25%</strong> of the total grant vests immediately. (e.g., 2,500 of 10,000 options).</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-500 shrink-0">3</div>
                                <div>
                                    <h4 className="font-medium text-foreground">Month 13 - 48</h4>
                                    <p className="text-sm text-muted-foreground">Remaining 75% vests monthly (1/48th per month) or quarterly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="font-display text-2xl text-foreground">Taxation for Employees (India)</h2>
                    <p className="text-muted-foreground">ESOPs are taxed at two instances in India. This is a critical pain point for liquidity.</p>

                    <DataTable
                        headers={["Stage", "Event", "Taxable Calculation", "Tax Rate"]}
                        rows={[
                            ["1. Exercise", "Converting Option → Share", "Fair Market Value (FMV) - Exercise Price", "Perquisite Tax (Salary Slab Rates)"],
                            ["2. Sale", "Selling the Share", "Sale Price - FMV at Exercise", "Capital Gains (LTCG/STCG)"]
                        ]}
                    />

                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                        <InfoCard title="Perquisite Tax Problem" icon="💸" variant="warning">
                            Employees must pay tax (often 30%+) upon exercise, even if they haven&apos;t sold the share to get cash.
                            <br /><br />
                            <strong>Fix:</strong> Most employees only exercise during a liquidity event (Buyback or IPO) where they can sell immediately to cover tax.
                        </InfoCard>
                        <InfoCard title="LTCG Benefit" icon="📉" variant="success">
                            If shares are held for &gt;24 months (unlisted companies) after exercise, gains are taxed at <strong>12.5%</strong> (Long Term Capital Gains) instead of slab rates.
                        </InfoCard>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="font-display text-2xl text-foreground">Founder&apos;s Checklist</h2>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {
                            [
                                "Allocate 10-15% pool pre-Series A.",
                                "Get a formal ESOP Scheme document drafted by lawyers.",
                                "Grant options via Grant Letters, not just verbal promises.",
                                "Set Exercise Price to Face Value (usually ₹10) for early employees to maximize upside.",
                                "Educate your team on the value of what they hold."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 p-3 rounded-lg bg-secondary/30 items-start">
                                    <span className="text-primary mt-1">✓</span>
                                    <span className="text-sm text-foreground">{item}</span>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </div>
        </HandbookLayout>
    );
}

"use client";

import { useState } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { Callout } from "@/components/handbook/UIComponents";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

function InfoTooltip({ content }: { content: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground/70 hover:text-foreground cursor-help transition-colors" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] text-sm">
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default function EquitySplitPage() {
    const [founders, setFounders] = useState([
        { name: "Founder 1", idea: 8, execution: 8, capital: 5, commitment: 10 },
        { name: "Founder 2", idea: 4, execution: 9, capital: 2, commitment: 10 },
    ]);

    const calculateEquity = () => {
        // Weights for different contributions (Total 100%)
        const weights = {
            idea: 0.15,        // Original idea/IP
            execution: 0.40,   // Ability to build/sell (Technical/Commercial)
            capital: 0.20,     // Money put in
            commitment: 0.25   // Full time vs Part time
        };

        const weightedScores = founders.map(f => {
            return (
                (f.idea * weights.idea) +
                (f.execution * weights.execution) +
                (f.capital * weights.capital) +
                (f.commitment * weights.commitment)
            );
        });

        const totalScore = weightedScores.reduce((a, b) => a + b, 0);

        return founders.map((f, i) => ({
            ...f,
            score: weightedScores[i],
            equity: totalScore > 0 ? (weightedScores[i] / totalScore) * 100 : 0
        }));
    };

    const results = calculateEquity();

    const handleUpdate = (index: number, field: string, value: string) => {
        const newFounders = [...founders];
        if (field === 'name') {
            // @ts-ignore
            newFounders[index][field] = value;
        } else {
            // @ts-ignore
            newFounders[index][field] = Number(value);
        }
        setFounders(newFounders);
    };

    const addFounder = () => {
        setFounders([...founders, { name: `Founder ${founders.length + 1}`, idea: 0, execution: 0, capital: 0, commitment: 0 }]);
    };

    const removeFounder = (index: number) => {
        if (founders.length > 1) {
            setFounders(founders.filter((_, i) => i !== index));
        }
    };

    return (
        <HandbookLayout currentSection="equity-split">
            <div className="space-y-12">
                <header className="space-y-4">
                    <div className="text-sm text-primary font-medium">Phase 1: Ideation</div>
                    <h1 className="font-display text-4xl text-foreground">
                        Founder & Team Equity
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Structuring fair equity splits for co-founders, early employees, and advisors is critical for long-term stability.
                    </p>
                </header>

                <Callout type="warning" title="Vesting is Mandatory">
                    Regardless of the split, <strong>always</strong> implement a vesting schedule (typically 4 years with a 1-year cliff). This protects the company if a co-founder leaves early.
                </Callout>

                <section className="space-y-8">
                    <h2 className="font-display text-2xl text-foreground">Co-Founder Equity Split Calculator</h2>
                    <p className="text-muted-foreground">
                        A simple weighted model to estimate fair equity distribution based on contributions. Rate each factor from 0 to 10.
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-border bg-card">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-secondary/50 text-muted-foreground font-medium border-b border-border">
                                <tr>
                                    <th className="p-4 min-w-[150px]">Founder Name</th>
                                    <th className="p-4 w-[180px]">
                                        <div className="flex items-center gap-2 mb-1">
                                            Idea / IP
                                            <InfoTooltip content="Who came up with the original concept or brings IP? (Weight: 15%)" />
                                        </div>
                                        <div className="text-xs font-normal opacity-70">Weight: 15%</div>
                                    </th>
                                    <th className="p-4 w-[180px]">
                                        <div className="flex items-center gap-2 mb-1">
                                            Execution
                                            <InfoTooltip content="Who will build the product or sell it? Day-to-day hard skills. (Weight: 40%)" />
                                        </div>
                                        <div className="text-xs font-normal opacity-70">Weight: 40%</div>
                                    </th>
                                    <th className="p-4 w-[180px]">
                                        <div className="flex items-center gap-2 mb-1">
                                            Capital
                                            <InfoTooltip content="Who is putting in the initial money? (Weight: 20%)" />
                                        </div>
                                        <div className="text-xs font-normal opacity-70">Weight: 20%</div>
                                    </th>
                                    <th className="p-4 w-[180px]">
                                        <div className="flex items-center gap-2 mb-1">
                                            Commitment
                                            <InfoTooltip content="Full-time vs Part-time. Risk taken. (Weight: 25%)" />
                                        </div>
                                        <div className="text-xs font-normal opacity-70">Weight: 25%</div>
                                    </th>
                                    <th className="p-4 text-right text-primary font-bold w-[120px]">Equity Split</th>
                                    <th className="p-4 w-[50px]"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {results.map((founder, i) => (
                                    <tr key={i} className="group hover:bg-secondary/10 transition-colors">
                                        <td className="p-4">
                                            <input
                                                type="text"
                                                value={founder.name}
                                                onChange={(e) => handleUpdate(i, 'name', e.target.value)}
                                                className="bg-transparent border-b border-transparent focus:border-primary outline-none py-1 font-medium w-full text-foreground transition-all"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>0</span>
                                                    <span className="font-medium text-foreground">{founder.idea}/10</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0" max="10"
                                                    step="1"
                                                    value={founder.idea}
                                                    onChange={(e) => handleUpdate(i, 'idea', e.target.value)}
                                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>0</span>
                                                    <span className="font-medium text-foreground">{founder.execution}/10</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0" max="10"
                                                    step="1"
                                                    value={founder.execution}
                                                    onChange={(e) => handleUpdate(i, 'execution', e.target.value)}
                                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>0</span>
                                                    <span className="font-medium text-foreground">{founder.capital}/10</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0" max="10"
                                                    step="1"
                                                    value={founder.capital}
                                                    onChange={(e) => handleUpdate(i, 'capital', e.target.value)}
                                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>0</span>
                                                    <span className="font-medium text-foreground">{founder.commitment}/10</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0" max="10"
                                                    step="1"
                                                    value={founder.commitment}
                                                    onChange={(e) => handleUpdate(i, 'commitment', e.target.value)}
                                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex flex-col items-end gap-1">
                                                <div className="font-display text-2xl text-primary">
                                                    {founder.equity.toFixed(1)}%
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Score: {founder.score.toFixed(1)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            {founders.length > 1 && (
                                                <button
                                                    onClick={() => removeFounder(i)}
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                                    title="Remove Founder"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-4 border-t border-border bg-secondary/10">
                            <button
                                onClick={addFounder}
                                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                + Add Co-Founder
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-4 italic">
                        Note: This is a static model based on initial inputs. In reality, "Dynamic Equity Splitting" (like the Slicing Pie method) tracks contributions over time until the company has cash to pay salaries.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-4">
                        <h3 className="font-display text-xl text-foreground">Initial Core Team (ESOP)</h3>
                        <div className="prose prose-sm text-muted-foreground">
                            <p>
                                For the first 5-10 employees, you typically set aside an <strong>ESOP Pool (Option Pool)</strong> of 10-15%.
                            </p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li><strong>Founding Engineer / CTO (Late):</strong> 1.0% - 5.0%</li>
                                <li><strong>Senior Engineer / Heads:</strong> 0.5% - 2.0%</li>
                                <li><strong>Mid-Level Engineers:</strong> 0.2% - 0.5%</li>
                                <li><strong>Junior Engineers / Ops:</strong> 0.05% - 0.2%</li>
                            </ul>
                            <p className="mt-2">
                                These are granted as options, usually vesting over 4 years.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="font-display text-xl text-foreground">Directors & Advisors</h3>
                        <div className="prose prose-sm text-muted-foreground">
                            <p>
                                Advisors and Board Directors (who are not investors) are compensated with small amounts of equity for their strategic guidance and network.
                            </p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li><strong>Standard Advisor:</strong> 0.1% - 0.25% (vests over 2 years)</li>
                                <li><strong>Strategic / Heavy-Lifting Advisor:</strong> 0.25% - 1.0%</li>
                                <li><strong>Independent Board Member:</strong> 0.5% - 1.0% (vests over 2-3 years)</li>
                            </ul>
                            <p className="mt-2">
                                Use a standard FAST Agreement (Founder / Advisor Standard Template) to formalize this.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="space-y-8 pt-8 border-t border-border">
                    <section className="space-y-4">
                        <h2 className="font-display text-2xl text-foreground">Compensation & Disbursement Strategy</h2>
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="font-semibold text-lg mb-4">Best Practices for Disbursement</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                        <h4 className="font-medium text-foreground">Founders (Executive)</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Pre-Seed/Seed:</strong> Below-market salary (enough to survive) + High Equity (10-40% each).
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Series A+:</strong> Market-aligned salary + Diluted Equity.
                                    </p>
                                    <div className="text-xs bg-secondary/50 p-2 rounded">
                                        <strong>Disbursement:</strong> Salary is monthly payroll. Equity is disbursed via 4-year vesting schedule (1-year cliff).
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-2 w-2 rounded-full bg-chart-2" />
                                        <h4 className="font-medium text-foreground">Executive Directors</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Directors who are also employees (e.g., CEO, CTO).
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Comp:</strong> Full Salary + Performance Bonus + ESOPs.
                                    </p>
                                    <div className="text-xs bg-secondary/50 p-2 rounded">
                                        <strong>Disbursement:</strong> Standard payroll. Bonuses often tied to OKRs or Revenue targets.
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-2 w-2 rounded-full bg-chart-3" />
                                        <h4 className="font-medium text-foreground">Non-Exec Directors</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Independent board members, Advisors, or Investor Directors.
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Comp:</strong> Primarily Equity (0.5% - 1%) + Reimbursements.
                                    </p>
                                    <div className="text-xs bg-secondary/50 p-2 rounded">
                                        <strong>Disbursement:</strong> Equity grant (FAST/RSA). Small annual retainer fees (sitting fees) are common for larger boards.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="font-display text-xl text-foreground">Director Compensation: Salary vs. Equity</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Should Directors take cash, stock, or both? This depends on the company stage and cash flow.
                        </p>

                        <div className="overflow-hidden rounded-xl border border-border">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-secondary text-muted-foreground font-medium">
                                    <tr>
                                        <th className="p-4 w-1/4">Model</th>
                                        <th className="p-4 w-1/4">Structure</th>
                                        <th className="p-4 w-1/4">Pros</th>
                                        <th className="p-4 w-1/4">Cons</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border bg-card">
                                    <tr className="hover:bg-secondary/10">
                                        <td className="p-4 font-medium text-foreground">1. Equity Only (Bootstrapped/Early)</td>
                                        <td className="p-4 text-muted-foreground">100% Stock Options (0.5% - 2%)</td>
                                        <td className="p-4 text-green-600">Preserves cash; Aligns long-term incentives with founders.</td>
                                        <td className="p-4 text-destructive">May not attract top-tier professionals who need cash flow.</td>
                                    </tr>
                                    <tr className="hover:bg-secondary/10">
                                        <td className="p-4 font-medium text-foreground">2. Cash + Equity (Hybrid)</td>
                                        <td className="p-4 text-muted-foreground">Small Stipend/Sitting Fee + Lower Equity (0.25% - 0.5%)</td>
                                        <td className="p-4 text-green-600">Balanced approach; Compensates for time immediately.</td>
                                        <td className="p-4 text-chart-3">Increases burn rate slightly.</td>
                                    </tr>
                                    <tr className="hover:bg-secondary/10">
                                        <td className="p-4 font-medium text-foreground">3. Salary/Cash Only (Scale-up)</td>
                                        <td className="p-4 text-muted-foreground">Market Rate Retainer ($25k-50k/yr)</td>
                                        <td className="p-4 text-green-600">Attracts professional "guns for hire" and seasoned board members.</td>
                                        <td className="p-4 text-destructive">Less "skin in the game"; Expensive for early stage.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </HandbookLayout>
    );
}

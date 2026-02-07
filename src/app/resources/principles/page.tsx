"use client";

import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { InfoCard, Callout } from "@/components/handbook/UIComponents";

export default function PrinciplesPage() {
    return (
        <HandbookLayout currentSection="resources">
            <div className="space-y-10">
                <header>
                    <div className="text-sm text-primary font-medium mb-2">Resources</div>
                    <h1 className="font-display text-4xl text-foreground">Founding Principles & Mental Models</h1>
                    <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
                        Operating systems for your brain. Better decision-making frameworks for the chaos of building a startup.
                    </p>
                </header>

                <section className="space-y-6">
                    <h2 className="font-display text-2xl text-foreground">1. First Principles Thinking</h2>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <p className="text-muted-foreground mb-4">
                            Boil things down to their fundamental truths and reason up from there, rather than reasoning by analogy (&quot;doing what others do&quot;).
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h3 className="font-medium text-foreground">Analogy Thinking (Bad)</h3>
                                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                                    <li>&quot;We need to hire a sales team because Competitor X has one.&quot;</li>
                                    <li>&quot;Battery packs are expensive because they&apos;ve always been expensive.&quot;</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-medium text-foreground">First Principles (Good)</h3>
                                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                                    <li>&quot;What is the most efficient way to get our product to customers? Is it sales, or product-led growth?&quot;</li>
                                    <li>&quot;What are the material constituents of a battery? What is their spot market price?&quot;</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="font-display text-2xl text-foreground">2. Bias for Action</h2>
                    <Callout type="important" title="Speed is the ultimate advantage">
                        In a startup, the cost of a wrong decision is usually lower than the cost of indecision.
                        Most decisions are reversible (Two-way doors). If you have 70% of the information, <strong>move.</strong>
                    </Callout>
                    <p className="text-muted-foreground">
                        High-velocity decision making &gt; Perfect decision making. You learn more from shipping and failing than from debating in a conference room.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="font-display text-2xl text-foreground">3. Leverage</h2>
                    <p className="text-muted-foreground">
                        Naval Ravikant defines leverage as tools that amplify your effort. As a founder, you must constantly seek high-leverage activities.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <InfoCard title="Code" icon="💻" variant="info">
                            <span className="text-sm">Write software once, run it millions of times at near-zero marginal cost.</span>
                        </InfoCard>
                        <InfoCard title="Media" icon="📹" variant="info">
                            <span className="text-sm">Create content (blogs, videos) that works for you while you sleep.</span>
                        </InfoCard>
                        <InfoCard title="Capital" icon="💰" variant="info">
                            <span className="text-sm">Money allows you to hire people and buy resources to scale faster.</span>
                        </InfoCard>
                        <InfoCard title="Labor" icon="👥" variant="info">
                            <span className="text-sm">People working for you. The oldest form of leverage, but requires management.</span>
                        </InfoCard>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="font-display text-2xl text-foreground">4. Second-Order Thinking</h2>
                    <div className="bg-card rounded-xl border border-border p-6">
                        <p className="text-muted-foreground mb-4">
                            First-order thinking focuses on the immediate effect. Second-order thinking focuses on the <em>consequences of the consequences.</em>
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <span className="font-bold text-foreground shrink-0">Action:</span>
                                <span className="text-muted-foreground"> offering unlimited free trials.</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-bold text-primary shrink-0">1st Order:</span>
                                <span className="text-muted-foreground"> Signups skyrocket. Metrics look great!</span>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-bold text-destructive shrink-0">2nd Order:</span>
                                <span className="text-muted-foreground"> Support team gets overwhelmed. Server costs explode. Paid conversion drops because free users consume all resources.</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="font-display text-2xl text-foreground">5. Do Things That Don&apos;t Scale</h2>
                    <p className="text-muted-foreground">
                        In the beginning (Phase 1 & 2), you cannot automate everything. You need to manually recruit users, manually onboard them, and manually solve their problems to truly understand the friction.
                    </p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        <li className="p-4 rounded-lg bg-secondary/30">
                            <strong>Airbnb:</strong> Founders went to New York to take professional photos of apartments themselves.
                        </li>
                        <li className="p-4 rounded-lg bg-secondary/30">
                            <strong>Stripe:</strong> &quot;Collison Installation&quot; — founders would grab users&apos; laptops and install the library for them on the spot.
                        </li>
                        <li className="p-4 rounded-lg bg-secondary/30">
                            <strong>DoorDash:</strong> Founders did the first deliveries themselves to understand the logistics.
                        </li>
                    </ul>
                </section>
            </div>
        </HandbookLayout>
    );
}

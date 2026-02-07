"use client";

import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { InvestorDirectory, Investor } from "@/components/resources/InvestorDirectory";
import investorsData from "@/../../public/data/investors.json";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function InvestorDirectoryPage() {
    return (
        <HandbookLayout currentSection="resources">
            <div className="space-y-8">
                {/* Breadcrumb */}
                <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Resources
                </Link>

                {/* Header */}
                <header className="space-y-4">
                    <div className="text-sm text-primary font-medium">Resources</div>
                    <h1 className="font-display text-4xl text-foreground">
                        Investor & VC Directory
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                        Comprehensive database of Indian and international VCs and angel investors.
                        Search by geography, stage, focus area, and more to find the right investors
                        for your startup.
                    </p>
                </header>

                {/* Info Banner */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-2">
                        📊 Directory Information
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        This directory is compiled from publicly available sources and updated regularly.
                        Always do your own research before reaching out to investors. For the best results,
                        get warm introductions through your network.
                    </p>
                </div>

                {/* Directory Component */}
                <InvestorDirectory investors={investorsData as Investor[]} />

                {/* Tips Section */}
                <section className="bg-secondary/30 rounded-2xl p-8 border border-border">
                    <h2 className="text-2xl font-display text-foreground mb-4">
                        Tips for Reaching Out
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">
                                ✅ Do
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>• Get warm introductions whenever possible</li>
                                <li>• Research their portfolio and investment thesis</li>
                                <li>• Personalize your outreach message</li>
                                <li>• Have a solid pitch deck ready</li>
                                <li>• Follow their preferred communication channel</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">
                                ❌ Don't
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>• Send generic mass emails</li>
                                <li>• Reach out if you don't match their thesis</li>
                                <li>• Ask for funding without traction</li>
                                <li>• Ignore their stage preferences</li>
                                <li>• Follow up too aggressively</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </HandbookLayout>
    );
}

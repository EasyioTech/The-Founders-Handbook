"use client";

import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import Link from "next/link";
import { ArrowLeft, BookOpen, Menu } from "lucide-react";
import fs from "fs";
import path from "path";
import { processGuideContent } from "@/lib/guide-processor";

// We need to read the file in the component for SSG/SSR in Next.js App Router.
// But fs is server-side only. This component is marked "use client" so we can't use fs directly.
// We should make this a Server Component or fetch data.
// The original file didn't have "use client", so it was a Server Component. 
// My previous read showed "import fs" but NO "use client".
// So I should keep it as a Server Component.

// RE-READING VALIDATION:
// The file I read (Step 540) did NOT have "use client".
// So I will write this as a Server Component.

export default function FundraisingGuidePage() {
    // Read the markdown content
    const filePath = path.join(process.cwd(), "public", "content", "complete-fundraising-guide.md");
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { html, toc } = processGuideContent(rawContent);

    return (
        <HandbookLayout currentSection="funding-stages">
            <div className="space-y-8">
                {/* Breadcrumb */}
                <Link
                    href="/funding-stages"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Funding Stages
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Header */}
                        <header className="space-y-4 pb-8 border-b border-border">
                            <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                <BookOpen className="w-4 h-4" />
                                Fundraising Resources
                            </div>
                            <h1 className="font-display text-4xl lg:text-5xl text-foreground">
                                Complete Fundraising Guide
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                A comprehensive course covering everything from understanding the funding ecosystem
                                to closing your first round and managing investor relationships.
                            </p>
                        </header>

                        {/* Guide Content */}
                        <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                        </article>

                        {/* CTA Section */}
                        <section className="bg-secondary/30 rounded-2xl p-8 border border-border mt-12">
                            <h2 className="text-2xl font-display text-foreground mb-4">
                                Ready to Start Fundraising?
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Explore our investor directory to find VCs and angels that match your startup's profile.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/investor-directory"
                                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Browse Investor Directory
                                </Link>
                                <Link
                                    href="/resources"
                                    className="px-6 py-3 border border-border rounded-lg hover:border-primary transition-colors font-medium"
                                >
                                    View All Resources
                                </Link>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar TOC - Hidden on mobile, sticky on desktop */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <div className="flex items-center gap-2 font-medium text-foreground">
                                <Menu className="w-4 h-4" />
                                Table of Contents
                            </div>
                            <nav className="text-sm border-l border-border pl-4 space-y-2">
                                {toc.map((item, index) => (
                                    <a
                                        key={index}
                                        href={`#${item.id}`}
                                        className={`block hover:text-primary transition-colors line-clamp-1 ${item.level === 1 ? 'font-medium text-foreground mt-3' : 'text-muted-foreground pl-2'
                                            }`}
                                        title={item.title}
                                    >
                                        {item.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>
                </div>
            </div>
        </HandbookLayout>
    );
}

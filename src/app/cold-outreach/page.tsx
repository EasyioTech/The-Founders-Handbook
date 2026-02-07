import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import Link from "next/link";
import { ArrowLeft, Mail, Menu } from "lucide-react";
import fs from "fs";
import path from "path";
import { processGuideContent } from "@/lib/guide-processor";

export default function ColdOutreachPage() {
    // Read the markdown content
    const filePath = path.join(process.cwd(), "public", "content", "cold-outreach-guide.md");
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { html, toc } = processGuideContent(rawContent);

    return (
        <HandbookLayout currentSection="funding-stages">
            <div className="space-y-8">
                {/* Breadcrumb */}
                <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Resources
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Header */}
                        <header className="space-y-4 pb-8 border-b border-border">
                            <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                <Mail className="w-4 h-4" />
                                Investor Outreach
                            </div>
                            <h1 className="font-display text-4xl lg:text-5xl text-foreground">
                                Cold Outreach Guide
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                                Learn how to craft effective cold emails to investors, with proven templates
                                and strategies that have helped founders raise millions.
                            </p>
                        </header>

                        {/* Key Takeaways */}
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                            <h3 className="font-semibold text-foreground mb-3">
                                📧 What You'll Learn
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>• How founders like Dhruv Ghulati raised $1M from Mark Cuban via cold email</li>
                                <li>• 6-step process for converting leads into investors</li>
                                <li>• 7 specific tips for writing investor cold  emails</li>
                                <li>• Email templates and subject line examples</li>
                                <li>• How to avoid spam filters and track results</li>
                            </ul>
                        </div>

                        {/* Guide Content */}
                        <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                        </article>

                        {/* CTA Section */}
                        <section className="bg-secondary/30 rounded-2xl p-8 border border-border mt-12">
                            <h2 className="text-2xl font-display text-foreground mb-4">
                                Ready to Reach Out?
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Use our investor directory to find the right investors for your startup and start building relationships.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/investor-directory"
                                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Find Investors
                                </Link>
                                <Link
                                    href="/fundraising"
                                    className="px-6 py-3 border border-border rounded-lg hover:border-primary transition-colors font-medium"
                                >
                                    Complete Fundraising Guide
                                </Link>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar TOC */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <div className="flex items-center gap-2 font-medium text-foreground">
                                <Menu className="w-4 h-4" />
                                Table of Contents
                            </div>
                            <nav className="text-sm border-l border-border pl-4 space-y-2 max-h-[80vh] overflow-y-auto">
                                {toc.map((item, index) => (
                                    <div key={index} className="py-1">
                                        <a
                                            href={`#${item.id}`}
                                            className={`block hover:text-primary transition-colors line-clamp-2 ${item.level === 1 ? 'font-medium text-foreground' : 'text-muted-foreground pl-2'
                                                }`}
                                        >
                                            {item.title}
                                        </a>
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </aside>
                </div>
            </div>
        </HandbookLayout>
    );
}

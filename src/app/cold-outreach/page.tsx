import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import fs from "fs";
import path from "path";

export default function ColdOutreachPage() {
    // Read the markdown content
    const filePath = path.join(process.cwd(), "public", "content", "cold-outreach-guide.md");
    const content = fs.readFileSync(filePath, "utf-8");

    return (
        <HandbookLayout currentSection="funding-stages">
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
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <Mail className="w-4 h-4" />
                        Investor Outreach
                    </div>
                    <h1 className="font-display text-4xl text-foreground">
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
                <article className="prose prose-lg max-w-none dark:prose-invert">
                    <div
                        className="outreach-content"
                        dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(content) }}
                    />
                </article>

                {/* CTA Section */}
                <section className="bg-secondary/30 rounded-2xl p-8 border border-border mt-12">
                    <h2 className="text-2xl font-display text-foreground mb-4">
                        Ready to Reach Out?
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        Use our investor directory to find the right investors for your startup and start building relationships.
                    </p>
                    <div className="flex gap-4">
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
        </HandbookLayout>
    );
}

// Simple markdown to HTML converter
function convertMarkdownToHTML(markdown: string): string {
    let html = markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Blockquotes
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
        // Bold
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // Horizontal rules
        .replace(/^---$/gim, '<hr/>')
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        // Bullet lists
        .replace(/^\• (.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    return `<div class="content-wrapper">${html}</div>`;
}

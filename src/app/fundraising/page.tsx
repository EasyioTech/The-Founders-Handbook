import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import fs from "fs";
import path from "path";

export default function FundraisingGuidePage() {
    // Read the markdown content
    const filePath = path.join(process.cwd(), "public", "content", "complete-fundraising-guide.md");
    const content = fs.readFileSync(filePath, "utf-8");

    return (
        <HandbookLayout currentSection="funding-stages">
            <div className="space-y-8">
                {/* Breadcrumb */}
                <Link
                    href="/funding-stages"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Funding Stages
                </Link>

                {/* Header */}
                <header className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <BookOpen className="w-4 h-4" />
                        Fundraising Resources
                    </div>
                    <h1 className="font-display text-4xl text-foreground">
                        Complete Fundraising Guide
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                        A comprehensive course covering everything from understanding the funding ecosystem
                        to closing your first round and managing investor relationships.
                    </p>
                </header>

                {/* Guide Content */}
                <article className="prose prose-lg max-w-none dark:prose-invert">
                    <div
                        className="fundraising-content"
                        dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(content) }}
                    />
                </article>

                {/* CTA Section */}
                <section className="bg-secondary/30 rounded-2xl p-8 border border-border mt-12">
                    <h2 className="text-2xl font-display text-foreground mb-4">
                        Ready to Start Fundraising?
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        Explore our investor directory to find VCs and angels that match your startup's profile.
                    </p>
                    <div className="flex gap-4">
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
        </HandbookLayout>
    );
}

// Simple markdown to HTML converter for basic formatting
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

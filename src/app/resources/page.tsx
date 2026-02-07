"use client";

import { useState } from "react";
import { HandbookLayout } from "@/components/handbook/HandbookLayout";
import { Download, FileText, ArrowRight, Eye, Copy, Check, Building2, BookOpen, Mail } from "lucide-react";
import { InvestorDirectory, Investor } from "@/components/resources/InvestorDirectory";
import investorsData from "@/../../public/data/investors.json";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface DocTemplate {
    title: string;
    description: string;
    category: "Legal" | "HR" | "Compliance";
    type: "PDF" | "DOCX";
    link?: string;
}

const templates: DocTemplate[] = [
    {
        title: "Founder Agreement / SHA",
        description: "Standard Shareholders Agreement defining equity splits, vesting, and roles.",
        category: "Legal",
        type: "DOCX",
        link: "/templates/founder_agreement.md"
    },
    {
        title: "Employment Offer Letter",
        description: "Standard offer letter compliant with Indian labor laws including CTC breakup.",
        category: "HR",
        type: "DOCX",
        link: "/templates/employment_offer_letter.md"
    },
    {
        title: "IP Assignment Agreement",
        description: "Ensures all intellectual property created by employees/founders belongs to the company.",
        category: "Legal",
        type: "DOCX",
        link: "/templates/ip_assignment.md"
    },
    {
        title: "Advisor Agreement (FAST)",
        description: "Founder Institute's 'FAST' agreement adapted for Indian context.",
        category: "Legal",
        type: "DOCX",
        link: "/templates/advisor_agreement_fast.md"
    },
    {
        title: "Freelancer / Contractor Agreement",
        description: "Work-for-hire agreement for contractors to ensure IP protection and non-compete.",
        category: "HR",
        type: "DOCX",
        link: "/templates/contractor_agreement.md"
    },
    {
        title: "Non-Disclosure Agreement (NDA)",
        description: "One-way and mutual NDAs for vendors, partners, and potential hires.",
        category: "Legal",
        type: "DOCX",
        link: "/templates/nda_mutual.md"
    },
    {
        title: "Board Resolution Template",
        description: "Standard format for passing board resolutions (for bank account, hiring, etc.).",
        category: "Compliance",
        type: "DOCX",
        link: "/templates/board_resolution.md"
    },
    {
        title: "ESOP Scheme Draft",
        description: "Draft ESOP policy document outlining grant, vesting, and exercise mechanics.",
        category: "HR",
        type: "PDF",
        link: "/templates/esop_scheme.md"
    },
    {
        title: "POSH Policy Document",
        description: "Mandatory Prevention of Sexual Harassment (POSH) policy draft for companies > 10 employees.",
        category: "Compliance",
        type: "DOCX",
        link: "/templates/posh_policy.md"
    }
];

export default function ResourcesPage() {
    const [activeTab, setActiveTab] = useState<"templates" | "investors">("templates");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<DocTemplate | null>(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handlePreview = async (template: DocTemplate) => {
        setSelectedTemplate(template);
        setIsOpen(true);
        setIsLoading(true);
        setContent("");

        try {
            if (template.link) {
                const response = await fetch(template.link);
                const text = await response.text();
                setContent(text);
            }
        } catch (error) {
            console.error("Failed to load template", error);
            setContent("Error loading template content.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        if (!selectedTemplate?.link) return;
        const link = document.createElement('a');
        link.href = selectedTemplate.link;
        link.download = selectedTemplate.link.split('/').pop() || 'document';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <HandbookLayout currentSection="resources">
            <div className="space-y-12">
                <header className="space-y-4">
                    <div className="text-sm text-primary font-medium">Resources</div>
                    <h1 className="font-display text-4xl text-foreground">
                        Resources & Tools
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Essential templates, investor directory, and tools for Indian startups.
                    </p>
                </header>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-border">
                    <button
                        onClick={() => setActiveTab("templates")}
                        className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors relative ${activeTab === "templates"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <FileText className="w-4 h-4" />
                        Document Templates
                        {activeTab === "templates" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("investors")}
                        className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors relative ${activeTab === "investors"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <Building2 className="w-4 h-4" />
                        Investor Directory
                        {activeTab === "investors" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                </div>

                {/* Templates Tab */}
                {activeTab === "templates" && (
                    <>
                        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {templates.map((doc, i) => (
                                <div key={i} className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                                    <div className="absolute top-4 right-4 text-xs font-medium px-2 py-1 bg-secondary rounded text-muted-foreground">
                                        {doc.type}
                                    </div>

                                    <div className="mb-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${doc.category === 'Legal' ? 'bg-blue-500/10 text-blue-600' :
                                            doc.category === 'HR' ? 'bg-emerald-500/10 text-emerald-600' :
                                                'bg-amber-500/10 text-amber-600'
                                            }`}>
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {doc.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {doc.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-border flex items-center justify-between">
                                        <span className="text-xs font-medium text-muted-foreground">{doc.category}</span>
                                        <button
                                            onClick={() => handlePreview(doc)}
                                            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                        >
                                            <Eye className="w-3.5 h-3.5" /> Preview & Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="bg-secondary/30 rounded-2xl p-8 border border-border">
                            <h2 className="text-2xl font-display text-foreground mb-4">Important Disclaimer</h2>
                            <p className="text-muted-foreground mb-6">
                                These templates are provided for informational purposes only and do not constitute legal advice.
                                Indian laws (Companies Act 2013, Contract Act 1872) change frequently.
                                Always have a qualified Company Secretary (CS) or Lawyer review final agreements before signing.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#" className="flex items-center gap-2 text-primary font-medium hover:underline">
                                    Read about MCA Compliance <ArrowRight className="w-4 h-4" />
                                </a>
                                <a href="#" className="flex items-center gap-2 text-primary font-medium hover:underline">
                                    Find a Startup Lawyer <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </section>

                        {/* Fundraising Guides Section */}
                        <section className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-display text-foreground mb-2">
                                    Fundraising Guides
                                </h2>
                                <p className="text-muted-foreground">
                                    Comprehensive guides to help you navigate the fundraising journey.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <Link
                                    href="/fundraising"
                                    className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                                >
                                    <div className="absolute top-4 right-4 text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                                        8 Modules
                                    </div>
                                    <div className="mb-4">
                                        <BookOpen className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        Complete Fundraising Guide
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        From understanding the funding ecosystem to closing your first round.
                                        Covers seed funding, Series A, investor types, pitching, and negotiations.
                                    </p>
                                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                                        Read Guide <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>

                                <Link
                                    href="/cold-outreach"
                                    className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                                >
                                    <div className="absolute top-4 right-4 text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                                        6-Step Process
                                    </div>
                                    <div className="mb-4">
                                        <Mail className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        Cold Outreach Guide
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Learn how to craft cold emails that get responses. Includes proven templates,
                                        subject lines, and strategies used to raise millions.
                                    </p>
                                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                                        Read Guide <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </div>
                        </section>
                    </>
                )}

                {/* Investor Directory Tab */}
                {activeTab === "investors" && (
                    <InvestorDirectory investors={investorsData as Investor[]} />
                )}

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                        <DialogHeader>
                            <DialogTitle>{selectedTemplate?.title}</DialogTitle>
                            <DialogDescription>
                                {selectedTemplate?.description}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto bg-muted/50 rounded-lg p-6 border border-border font-mono text-sm whitespace-pre-wrap">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    Loading template...
                                </div>
                            ) : (
                                content
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-4">
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-secondary transition-colors text-sm font-medium"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied" : "Copy Text"}
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                            >
                                <Download className="w-4 h-4" />
                                Download File
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </HandbookLayout>
    );
}

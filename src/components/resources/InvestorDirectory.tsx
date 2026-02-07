"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Download, ExternalLink, Mail, Linkedin, ChevronDown, ChevronUp, Globe, MapPin, Building, Banknote, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Investor {
    name: string;
    "first name"?: string;
    "last name"?: string;
    title?: string;
    type?: string;
    geography?: string;
    source_geography?: string;
    city?: string;
    stage?: string;
    focus?: string;
    ticket_size?: string;
    "ticket size"?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    "personal linkedin url"?: string;
    "company linkedin url"?: string;
    website?: string;
    "twitter url"?: string;
    description?: string;
    portfolio?: string;
    source?: string;
    "company address"?: string;
    "company country"?: string;
    contact_person?: string;
}

interface InvestorDirectoryProps {
    investors: Investor[];
}

export function InvestorDirectory({ investors }: InvestorDirectoryProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [geographyFilter, setGeographyFilter] = useState<string>("all");
    const [stageFilter, setStageFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    // Changing from selectedInvestor (modal) to expandedId (inline)
    // We'll use the investor's index in the filtered list or name as ID since there's no unique ID
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // Extract unique filter values
    const filterOptions = useMemo(() => {
        const types = new Set<string>();
        const geographies = new Set<string>();
        const stages = new Set<string>();

        investors.forEach((inv) => {
            if (inv.type) types.add(inv.type);
            if (inv.source_geography) geographies.add(inv.source_geography);
            if (inv.geography) geographies.add(inv.geography);
            if (inv.stage) stages.add(inv.stage);
        });

        return {
            types: Array.from(types).sort(),
            geographies: Array.from(geographies).sort(),
            stages: Array.from(stages).sort(),
        };
    }, [investors]);

    // Filter and search logic
    const filteredInvestors = useMemo(() => {
        return investors.filter((inv) => {
            // Search filter
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                (inv.name || "").toLowerCase().includes(searchLower) ||
                (inv.focus || "").toLowerCase().includes(searchLower) ||
                (inv.description || "").toLowerCase().includes(searchLower) ||
                (inv.city || "").toLowerCase().includes(searchLower);

            // Type filter
            const matchesType = typeFilter === "all" || inv.type === typeFilter;

            // Geography filter
            const matchesGeography =
                geographyFilter === "all" ||
                inv.source_geography === geographyFilter ||
                inv.geography === geographyFilter;

            // Stage filter
            const matchesStage = stageFilter === "all" || inv.stage === stageFilter;

            return matchesSearch && matchesType && matchesGeography && matchesStage;
        });
    }, [investors, searchQuery, typeFilter, geographyFilter, stageFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredInvestors.length / rowsPerPage);
    const paginatedInvestors = filteredInvestors.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Reset to page 1 and close expanded when filters change
    useMemo(() => {
        setCurrentPage(1);
        setExpandedIndex(null);
    }, [searchQuery, typeFilter, geographyFilter, stageFilter, rowsPerPage]);

    // Export to CSV
    const handleExportCSV = () => {
        const headers = ["Name", "Type", "Geography", "Stage", "Focus", "Ticket Size", "Email", "Website"];
        const rows = filteredInvestors.map((inv) => [
            inv.name || "",
            inv.type || "",
            inv.source_geography || inv.geography || "",
            inv.stage || "",
            inv.focus || "",
            inv.ticket_size || "",
            inv.email || "",
            inv.website || "",
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "investors-export.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setTypeFilter("all");
        setGeographyFilter("all");
        setStageFilter("all");
        setCurrentPage(1);
        setExpandedIndex(null);
    };

    const hasActiveFilters = searchQuery || typeFilter !== "all" || geographyFilter !== "all" || stageFilter !== "all";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-display font-semibold text-foreground">
                        Investor & VC Directory
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {filteredInvestors.length} of {investors.length} investors
                    </p>
                </div>
                <Button onClick={handleExportCSV} variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export CSV
                </Button>
            </div>

            {/* Filters */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {/* Search */}
                <div className="lg:col-span-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search investors, focus areas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

                {/* Type Filter */}
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {filterOptions.types.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Geography Filter */}
                <Select value={geographyFilter} onValueChange={setGeographyFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Geography" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        {filterOptions.geographies.map((geo) => (
                            <SelectItem key={geo} value={geo}>
                                {geo}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Stage Filter */}
                <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        {filterOptions.stages.map((stage) => (
                            <SelectItem key={stage} value={stage}>
                                {stage}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {searchQuery && (
                        <Badge variant="secondary" className="gap-1">
                            Search: {searchQuery}
                        </Badge>
                    )}
                    {typeFilter !== "all" && (
                        <Badge variant="secondary">Type: {typeFilter}</Badge>
                    )}
                    {geographyFilter !== "all" && (
                        <Badge variant="secondary">Geography: {geographyFilter}</Badge>
                    )}
                    {stageFilter !== "all" && (
                        <Badge variant="secondary">Stage: {stageFilter}</Badge>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-6 text-xs"
                    >
                        Clear all
                    </Button>
                </div>
            )}

            {/* Table - Desktop */}
            <div className="hidden md:block border border-border rounded-lg overflow-hidden bg-card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50 border-b border-border">
                            <tr>
                                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-[30%]">
                                    Name
                                </th>
                                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-[15%]">
                                    Type
                                </th>
                                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-[15%]">
                                    Geography
                                </th>
                                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-[20%]">
                                    Focus
                                </th>
                                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-[15%]">
                                    Stage
                                </th>
                                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-[5%]">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedInvestors.map((investor, idx) => {
                                const isExpanded = expandedIndex === idx;
                                return (
                                    <>
                                        <tr
                                            key={idx}
                                            onClick={() => toggleExpand(idx)}
                                            className={cn(
                                                "border-b border-border/50 transition-colors cursor-pointer",
                                                isExpanded ? "bg-muted/30" : "hover:bg-muted/30"
                                            )}
                                        >
                                            <td className="p-4">
                                                <div className="font-medium text-foreground">
                                                    {investor.name}
                                                </div>
                                                {investor.city && (
                                                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                        <MapPin className="w-3 h-3" /> {investor.city}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {investor.type && (
                                                    <Badge variant="outline" className="text-xs font-normal">
                                                        {investor.type}
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="p-4 text-sm text-muted-foreground">
                                                {investor.source_geography || investor.geography || "-"}
                                            </td>
                                            <td className="p-4 text-sm text-muted-foreground">
                                                <div className="truncate max-w-[200px]" title={investor.focus}>
                                                    {investor.focus || "-"}
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-muted-foreground">
                                                {investor.stage || "-"}
                                            </td>
                                            <td className="p-4 text-muted-foreground">
                                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </td>
                                        </tr>
                                        {/* Expanded Content */}
                                        {isExpanded && (
                                            <tr className="bg-muted/10 border-b border-border">
                                                <td colSpan={6} className="p-6 animate-in fade-in zoom-in-95 duration-200">
                                                    <div className="grid gap-6 md:grid-cols-2">
                                                        <div className="space-y-4">
                                                            {investor.description && (
                                                                <div>
                                                                    <h4 className="text-sm font-medium text-foreground mb-1">Description</h4>
                                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                                        {investor.description}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <h4 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                                                                        <Banknote className="w-3.5 h-3.5" /> Ticket Size
                                                                    </h4>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {investor["ticket size"] || investor.ticket_size || "-"}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                                                                        <Target className="w-3.5 h-3.5" /> Focus
                                                                    </h4>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {investor.focus || "-"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {investor.portfolio && (
                                                                <div>
                                                                    <h4 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                                                                        <Building className="w-3.5 h-3.5" /> Portfolio Ex.
                                                                    </h4>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {investor.portfolio}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="space-y-4 md:border-l md:border-border md:pl-6">
                                                            <div>
                                                                <h4 className="text-sm font-medium text-foreground mb-2">Details</h4>
                                                                <dl className="grid grid-cols-1 gap-y-2 text-sm">
                                                                    <div className="flex justify-between">
                                                                        <dt className="text-muted-foreground">Type</dt>
                                                                        <dd className="font-medium">{investor.type || "-"}</dd>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <dt className="text-muted-foreground">Stage</dt>
                                                                        <dd className="font-medium">{investor.stage || "-"}</dd>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <dt className="text-muted-foreground">Location</dt>
                                                                        <dd className="font-medium">{investor.source_geography || investor.geography || "-"} {investor.city ? `(${investor.city})` : ""}</dd>
                                                                    </div>
                                                                </dl>
                                                            </div>

                                                            <div className="space-y-3 pt-2">
                                                                {investor.website && (
                                                                    <a href={investor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                                                        <Globe className="w-4 h-4" />
                                                                        {investor.website.replace(/^https?:\/\//, '')}
                                                                        <ExternalLink className="w-3 h-3 ml-auto" />
                                                                    </a>
                                                                )}
                                                                {investor.linkedin && (
                                                                    <a href={investor.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                                                        <Linkedin className="w-4 h-4" />
                                                                        Company LinkedIn
                                                                        <ExternalLink className="w-3 h-3 ml-auto" />
                                                                    </a>
                                                                )}
                                                                {(investor["personal linkedin url"] || investor["company linkedin url"]) && (
                                                                    <a href={investor["personal linkedin url"] || investor["company linkedin url"]} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                                                        <Linkedin className="w-4 h-4" />
                                                                        {investor["personal linkedin url"] ? "Personal LinkedIn" : "Company LinkedIn"}
                                                                        <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                                                                    </a>
                                                                )}
                                                                {investor.email && (
                                                                    <a href={`mailto:${investor.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                                                        <Mail className="w-4 h-4" />
                                                                        {investor.email}
                                                                        <span className="text-xs text-muted-foreground ml-auto opacity-50">Email</span>
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Cards - Mobile */}
            <div className="md:hidden space-y-3">
                {paginatedInvestors.map((investor, idx) => {
                    const isExpanded = expandedIndex === idx;
                    return (
                        <div
                            key={idx}
                            className={cn(
                                "border border-border rounded-lg bg-card overflow-hidden transition-all",
                                isExpanded ? "ring-1 ring-primary/20" : ""
                            )}
                        >
                            {/* Card Header (Always Visible) */}
                            <div
                                className="p-4 cursor-pointer"
                                onClick={() => toggleExpand(idx)}
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div>
                                        <h3 className="font-semibold text-foreground">{investor.name}</h3>
                                        <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {investor.city || investor.source_geography || investor.geography || "Remote"}
                                        </div>
                                    </div>
                                    {investor.type && (
                                        <Badge variant="outline" className="text-xs shrink-0">
                                            {investor.type}
                                        </Badge>
                                    )}
                                </div>

                                <div className="space-y-2 text-sm">
                                    {investor.focus && (
                                        <div className="text-muted-foreground line-clamp-1">
                                            🎯 {investor.focus}
                                        </div>
                                    )}
                                    {investor.stage && (
                                        <div className="text-muted-foreground">
                                            💼 {investor.stage}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-center mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                    {isExpanded ? (
                                        <span className="flex items-center gap-1">Less Info <ChevronUp className="w-3 h-3" /></span>
                                    ) : (
                                        <span className="flex items-center gap-1">More Info <ChevronDown className="w-3 h-3" /></span>
                                    )}
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div className="px-4 pb-4 pt-0 space-y-4 animate-in slide-in-from-top-2 duration-200">
                                    {investor.description && (
                                        <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                                            {investor.description}
                                        </p>
                                    )}

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="bg-secondary/20 p-2 rounded">
                                            <span className="text-xs text-muted-foreground block mb-1">Ticket Size</span>
                                            <span className="font-medium">{investor["ticket size"] || investor.ticket_size || "-"}</span>
                                        </div>
                                        <div className="bg-secondary/20 p-2 rounded">
                                            <span className="text-xs text-muted-foreground block mb-1">Portfolio</span>
                                            <span className="font-medium truncate block">{investor.portfolio || "-"}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {investor.website && (
                                            <a href={investor.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                                                <Globe className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium">Website</span>
                                                <ExternalLink className="w-3 h-3 ml-auto text-muted-foreground" />
                                            </a>
                                        )}
                                        {investor.email && (
                                            <a href={`mailto:${investor.email}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                                                <Mail className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium">Email</span>
                                                <ExternalLink className="w-3 h-3 ml-auto text-muted-foreground" />
                                            </a>
                                        )}
                                        {(investor.linkedin || investor["personal linkedin url"] || investor["company linkedin url"]) && (
                                            <a href={investor.linkedin || investor["personal linkedin url"] || investor["company linkedin url"]} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                                                <Linkedin className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium">LinkedIn</span>
                                                <ExternalLink className="w-3 h-3 ml-auto text-muted-foreground" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Rows per page:</span>
                        <Select
                            value={rowsPerPage.toString()}
                            onValueChange={(value) => setRowsPerPage(Number(value))}
                        >
                            <SelectTrigger className="w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span className="text-sm text-muted-foreground px-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {/* No Results */}
            {filteredInvestors.length === 0 && (
                <div className="text-center py-12">
                    <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        No investors found
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Try adjusting your filters or search query
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                        Clear all filters
                    </Button>
                </div>
            )}
        </div>
    );
}

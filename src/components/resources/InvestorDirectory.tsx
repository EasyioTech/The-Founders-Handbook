"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Download, ExternalLink, Mail, Linkedin, Eye } from "lucide-react";
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

import { InvestorDetailModal } from "./InvestorDetailModal";

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
    const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewDetails = (investor: Investor) => {
        setSelectedInvestor(investor);
        setIsModalOpen(true);
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

    // Reset to page 1 when filters change
    useMemo(() => {
        setCurrentPage(1);
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
            <div className="hidden md:block border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                                    Name
                                </th>
                                <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                                    Type
                                </th>
                                <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                                    Geography
                                </th>
                                <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                                    Focus
                                </th>
                                <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                                    Stage
                                </th>
                                <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                                    View
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedInvestors.map((investor, idx) => (
                                <tr
                                    key={idx}
                                    className="border-t border-border hover:bg-muted/30 transition-colors"
                                >
                                    <td className="p-3">
                                        <div className="font-medium text-foreground">
                                            {investor.name}
                                        </div>
                                        {investor.city && (
                                            <div className="text-xs text-muted-foreground">
                                                {investor.city}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        {investor.type && (
                                            <Badge variant="outline" className="text-xs">
                                                {investor.type}
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="p-3 text-sm text-muted-foreground">
                                        {investor.source_geography || investor.geography || "-"}
                                    </td>
                                    <td className="p-3 text-sm text-muted-foreground max-w-xs truncate">
                                        {investor.focus || "-"}
                                    </td>
                                    <td className="p-3 text-sm text-muted-foreground">
                                        {investor.stage || "-"}
                                    </td>
                                    <td className="p-3">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                                            onClick={() => handleViewDetails(investor)}
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span className="sr-only">View Details</span>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Cards - Mobile */}
            <div className="md:hidden space-y-3">
                {paginatedInvestors.map((investor, idx) => (
                    <div
                        key={idx}
                        className="border border-border rounded-lg p-4 bg-card hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between gap-2 mb-3">
                            <h3 className="font-semibold text-foreground">{investor.name}</h3>
                            {investor.type && (
                                <Badge variant="outline" className="text-xs">
                                    {investor.type}
                                </Badge>
                            )}
                        </div>

                        <div className="space-y-2 text-sm">
                            {(investor.source_geography || investor.geography) && (
                                <div className="text-muted-foreground">
                                    📍 {investor.source_geography || investor.geography}
                                    {investor.city && ` • ${investor.city}`}
                                </div>
                            )}
                            {investor.focus && (
                                <div className="text-muted-foreground">
                                    🎯 {investor.focus}
                                </div>
                            )}
                            {investor.stage && (
                                <div className="text-muted-foreground">
                                    💼 {investor.stage}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border mt-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full gap-2"
                                onClick={() => handleViewDetails(investor)}
                            >
                                <Eye className="w-4 h-4" />
                                View Details
                            </Button>
                        </div>
                    </div>
                ))}
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
            {/* Investor Detail Modal */}
            <InvestorDetailModal
                investor={selectedInvestor}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

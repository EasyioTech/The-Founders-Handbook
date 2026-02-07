"use client";

import { Investor } from "./InvestorDirectory";
import { X, Mail, Linkedin, ExternalLink, Phone, MapPin, Briefcase, Target, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InvestorDetailModalProps {
    investor: Investor | null;
    isOpen: boolean;
    onClose: () => void;
}

export function InvestorDetailModal({ investor, isOpen, onClose }: InvestorDetailModalProps) {
    if (!isOpen || !investor) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-start justify-between">
                    <div className="flex-1 pr-4">
                        <h2 className="text-2xl font-display font-semibold text-foreground">
                            {investor.name}
                        </h2>
                        {investor.title && (
                            <p className="text-sm text-muted-foreground mt-1">
                                {investor.title}
                            </p>
                        )}
                        {investor.type && (
                            <Badge variant="outline" className="mt-2">
                                {investor.type}
                            </Badge>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6 space-y-6">
                    {/* Location & Geography */}
                    {(investor.source_geography || investor.geography || investor.city) && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                Location
                            </h3>
                            <div className="pl-6 space-y-1">
                                {(investor.source_geography || investor.geography) && (
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">Geography:</span>{" "}
                                        {investor.source_geography || investor.geography}
                                    </p>
                                )}
                                {investor.city && (
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">City:</span>{" "}
                                        {investor.city}
                                    </p>
                                )}
                                {investor["company country"] && (
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">Country:</span>{" "}
                                        {investor["company country"]}
                                    </p>
                                )}
                                {investor["company address"] && (
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">Address:</span>{" "}
                                        {investor["company address"]}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Investment Details */}
                    {(investor.stage || investor.focus || investor.ticket_size || investor["ticket size"]) && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-primary" />
                                Investment Details
                            </h3>
                            <div className="pl-6 space-y-1">
                                {investor.stage && (
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">Stage:</span>{" "}
                                        {investor.stage}
                                    </p>
                                )}
                                {investor.focus && (
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">Focus:</span>{" "}
                                        {investor.focus}
                                    </p>
                                )}
                                {(investor.ticket_size || investor["ticket size"]) && (
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground">Ticket Size:</span>{" "}
                                        {investor.ticket_size || investor["ticket size"]}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {investor.description && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <Target className="w-4 h-4 text-primary" />
                                About
                            </h3>
                            <p className="text-sm text-muted-foreground pl-6">
                                {investor.description}
                            </p>
                        </div>
                    )}

                    {/* Portfolio */}
                    {investor.portfolio && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-primary" />
                                Portfolio
                            </h3>
                            <p className="text-sm text-muted-foreground pl-6">
                                {investor.portfolio}
                            </p>
                        </div>
                    )}

                    {/* Contact Information */}
                    {(investor.email || investor.phone || investor.linkedin || investor["personal linkedin url"] ||
                        investor.website || investor["twitter url"] || investor["company linkedin url"]) && (
                            <div className="space-y-3 pt-4 border-t border-border">
                                <h3 className="text-sm font-semibold text-foreground">
                                    Contact Information
                                </h3>
                                <div className="grid gap-3">
                                    {investor.email && (
                                        <a
                                            href={`mailto:${investor.email}`}
                                            className="flex items-center gap-3 text-sm text-primary hover:text-primary/80 transition-colors group"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <span>{investor.email}</span>
                                        </a>
                                    )}
                                    {investor.phone && (
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <span>{investor.phone}</span>
                                        </div>
                                    )}
                                    {(investor.linkedin || investor["personal linkedin url"]) && (
                                        <a
                                            href={investor.linkedin || investor["personal linkedin url"]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-sm text-primary hover:text-primary/80 transition-colors group"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <Linkedin className="w-4 h-4" />
                                            </div>
                                            <span>Personal LinkedIn</span>
                                            <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                                        </a>
                                    )}
                                    {investor["company linkedin url"] && (
                                        <a
                                            href={investor["company linkedin url"]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-sm text-primary hover:text-primary/80 transition-colors group"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <Linkedin className="w-4 h-4" />
                                            </div>
                                            <span>Company LinkedIn</span>
                                            <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                                        </a>
                                    )}
                                    {investor.website && (
                                        <a
                                            href={investor.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-sm text-primary hover:text-primary/80 transition-colors group"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </div>
                                            <span>Website</span>
                                            <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                                        </a>
                                    )}
                                    {investor["twitter url"] && (
                                        <a
                                            href={investor["twitter url"]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-sm text-primary hover:text-primary/80 transition-colors group"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </div>
                                            <span>Twitter</span>
                                            <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </>
    );
}

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FormulaBox({ 
  title, 
  formula, 
  example,
  children 
}: { 
  title: string; 
  formula: string; 
  example?: string;
  children?: ReactNode;
}) {
  return (
    <div className="formula-box rounded-lg p-5 my-5">
      <h4 className="font-medium text-foreground mb-3">{title}</h4>
      <div className="bg-background rounded p-3 font-mono text-sm border border-border">
        {formula}
      </div>
      {example && (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Example:</span> {example}
        </p>
      )}
      {children}
    </div>
  );
}

export function InfoCard({ 
  title, 
  icon, 
  children, 
  variant = "default" 
}: { 
  title: string; 
  icon?: ReactNode; 
  children: ReactNode; 
  variant?: "default" | "success" | "warning" | "info";
}) {
  const variants = {
    default: "bg-card border-border",
    success: "bg-secondary border-border",
    warning: "bg-secondary border-border",
    info: "bg-secondary border-border",
  };

  return (
    <div className={cn("rounded-lg border p-5", variants[variant])}>
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-primary">{icon}</span>}
        <h4 className="font-medium">{title}</h4>
      </div>
      <div className="text-muted-foreground text-sm">{children}</div>
    </div>
  );
}

export function StageCard({ 
  number, 
  title, 
  subtitle,
  children 
}: { 
  number: number; 
  title: string; 
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative pl-10 pb-6 last:pb-0">
      <div className="absolute left-0 top-0 w-7 h-7 rounded-full bg-foreground flex items-center justify-center text-background font-medium text-sm">
        {number}
      </div>
      <div className="absolute left-[13px] top-9 bottom-0 w-px bg-border last:hidden" />
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="font-medium text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        <div className="mt-3 text-muted-foreground text-sm">{children}</div>
      </div>
    </div>
  );
}

export function DataTable({ 
  headers, 
  rows 
}: { 
  headers: string[]; 
  rows: (string | number)[][]; 
}) {
  return (
    <div className="overflow-x-auto my-5">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-secondary">
            {headers.map((header, i) => (
              <th key={i} className="text-left p-3 font-medium text-foreground border border-border first:rounded-tl-lg last:rounded-tr-lg">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-secondary/50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="p-3 border border-border text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProgressBar({ 
  label, 
  value, 
  max = 100, 
  color = "primary" 
}: { 
  label: string; 
  value: number; 
  max?: number; 
  color?: "primary" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
}) {
  const percentage = (value / max) * 100;
  const colors = {
    primary: "#166534",
    "chart-2": "#22c55e",
    "chart-3": "#4ade80",
    "chart-4": "#86efac",
    "chart-5": "#bbf7d0",
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 bg-secondary rounded overflow-hidden">
        <div 
          className="h-full rounded transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: colors[color] }}
        />
      </div>
    </div>
  );
}

export function Callout({ 
  type = "info", 
  title, 
  children 
}: { 
  type?: "info" | "warning" | "tip" | "important"; 
  title?: string; 
  children: ReactNode;
}) {
  const styles = {
    info: { bg: "bg-secondary", border: "border-border", icon: "i" },
    warning: { bg: "bg-secondary", border: "border-border", icon: "!" },
    tip: { bg: "bg-secondary", border: "border-border", icon: "*" },
    important: { bg: "bg-secondary", border: "border-border", icon: "*" },
  };

  const style = styles[type];

  return (
    <div className={cn("rounded-lg border p-4 my-5", style.bg, style.border)}>
      <div className="flex gap-3">
        <span className="w-5 h-5 rounded-full bg-foreground text-background text-xs font-medium flex items-center justify-center flex-shrink-0">
          {style.icon}
        </span>
        <div>
          {title && <h4 className="font-medium text-foreground mb-1">{title}</h4>}
          <div className="text-muted-foreground text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

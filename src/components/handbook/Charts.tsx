"use client";

import { useState, useEffect, memo } from "react";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  TooltipProps,
} from "recharts";

const CHART_COLORS = [
  "#1d4ed8", // royal-blue
  "#059669", // emerald-600
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#6366f1", // indigo-500
  "#22d3ee", // cyan-400
  "#7c3aed", // violet-600
  "#f43f5e", // rose-500
  "#0ea5e9", // sky-500
  "#8b5cf6", // purple-500
];

function ChartSkeleton({ height = 200 }: { height?: number }) {
  return (
    <div
      className="animate-pulse bg-secondary rounded-lg flex items-center justify-center"
      style={{ height, minHeight: height }}
    >
      <div className="text-muted-foreground text-sm">Loading...</div>
    </div>
  );
}

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  title?: string;
  height?: number;
  showValues?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
}

export const BarChart = memo(function BarChart({
  data,
  title,
  height = 200,
  valuePrefix = "",
  valueSuffix = ""
}: BarChartProps) {
  const hasMounted = useHasMounted();

  if (!data || data.length === 0) return null;
  if (!hasMounted) return <ChartSkeleton height={height} />;

  const chartData = data.map((d, i) => ({
    name: d.label,
    value: d.value,
    fill: d.color || CHART_COLORS[i % CHART_COLORS.length],
  }));

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-md px-3 py-2 shadow-lg">
          <p className="text-sm font-medium text-foreground">
            {valuePrefix}{payload[0].value?.toLocaleString()}{valueSuffix}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="my-6">
      {title && <h4 className="font-medium text-foreground mb-4">{title}</h4>}
      <div style={{ width: "100%", height, minHeight: height }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={200}>
          <RechartsBarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" opacity={0.5} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#78716c" }}
              axisLine={{ stroke: "#e7e5e4" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#78716c" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${valuePrefix}${v.toLocaleString()}${valueSuffix}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

interface LineChartProps {
  data: { x: string; y: number }[];
  title?: string;
  height?: number;
  color?: string;
  showArea?: boolean;
  formatValue?: (value: number) => string;
}

export const LineChart = memo(function LineChart({
  data,
  title,
  height = 200,
  showArea = true,
  formatValue = (v) => v >= 10000000 ? `₹${(v / 10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : v.toLocaleString()
}: LineChartProps) {
  const hasMounted = useHasMounted();

  if (!data || data.length === 0) return null;
  if (!hasMounted) return <ChartSkeleton height={height} />;

  const chartData = data.map((d) => ({
    name: d.x,
    value: d.y,
  }));

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-md px-3 py-2 shadow-lg">
          <p className="text-xs text-muted-foreground mb-1">{label}</p>
          <p className="text-sm font-medium text-foreground">
            {formatValue(payload[0].value as number)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="my-6">
      {title && <h4 className="font-medium text-sm text-foreground mb-3">{title}</h4>}
      <div className="rounded-xl border border-border bg-card">
        <div style={{ width: "100%", height, minHeight: height }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={200}>
            {showArea ? (
              <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" opacity={0.5} vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#78716c" }}
                  axisLine={false}
                  tickLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#78716c" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatValue}
                  width={50}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#166534"
                  strokeWidth={2}
                  fill="url(#areaGradient)"
                  dot={{ r: 3, fill: "#166534", strokeWidth: 0 }}
                  activeDot={{ r: 4, fill: "#166534", stroke: "#ffffff", strokeWidth: 2 }}
                />
              </AreaChart>
            ) : (
              <RechartsLineChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" opacity={0.5} vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#78716c" }}
                  axisLine={false}
                  tickLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#78716c" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatValue}
                  width={50}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#166534"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#166534", strokeWidth: 0 }}
                  activeDot={{ r: 4, fill: "#166534", stroke: "#ffffff", strokeWidth: 2 }}
                />
              </RechartsLineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
});

interface PieChartProps {
  data: { label: string; value: number; color?: string }[];
  title?: string;
  size?: number;
  showLegend?: boolean;
}

export const PieChart = memo(function PieChart({
  data,
  title,
  size = 200,
  showLegend = true
}: PieChartProps) {
  const hasMounted = useHasMounted();

  if (!data || data.length === 0) return null;
  if (!hasMounted) return <ChartSkeleton height={size} />;

  const total = data.reduce((sum, d) => sum + d.value, 0);

  const chartData = data.map((d, i) => ({
    name: d.label,
    value: d.value,
    fill: d.color || CHART_COLORS[i % CHART_COLORS.length],
    percentage: ((d.value / total) * 100).toFixed(1),
  }));

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-md px-3 py-2 shadow-lg">
          <p className="text-sm font-medium text-foreground">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            {data.value.toLocaleString()} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = () => (
    <div className="space-y-2">
      {chartData.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.fill }} />
          <span className="text-foreground">{entry.name}</span>
          <span className="text-muted-foreground">({entry.percentage}%)</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="my-6">
      {title && <h4 className="font-medium text-foreground mb-4">{title}</h4>}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div style={{ width: size, height: size, minWidth: size, minHeight: size }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={size * 0.2}
                outerRadius={size * 0.4}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        {showLegend && renderLegend()}
      </div>
    </div>
  );
});

interface FunnelChartProps {
  stages: { label: string; value: number; conversion?: number }[];
  title?: string;
}

export function FunnelChart({ stages, title }: FunnelChartProps) {
  if (!stages || stages.length === 0) return null;

  const maxValue = stages[0]?.value || 1;
  const emeraldShades = ["#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe"];

  return (
    <div className="my-6">
      {title && <h4 className="font-medium text-foreground mb-4">{title}</h4>}
      <div className="space-y-2">
        {stages.map((stage, i) => {
          const width = (stage.value / maxValue) * 100;
          const conversion = i > 0 ? ((stage.value / stages[i - 1].value) * 100).toFixed(1) : null;
          const bgColor = emeraldShades[Math.min(i, emeraldShades.length - 1)];
          return (
            <div key={i} className="relative">
              <div className="flex items-center gap-4">
                <div className="w-24 text-sm text-foreground truncate">{stage.label}</div>
                <div className="flex-1 h-10 bg-secondary rounded-lg overflow-hidden">
                  <div
                    className="h-10 rounded-lg flex items-center transition-all duration-300 px-3"
                    style={{ width: `${Math.max(width, 15)}%`, backgroundColor: bgColor }}
                  >
                    <span className="text-xs text-white font-medium ml-auto whitespace-nowrap">
                      {stage.value.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="w-16 text-xs text-muted-foreground text-right">
                  {i === 0 ? "100%" : conversion ? `${conversion}%` : ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface TimelineChartProps {
  events: {
    date: string;
    title: string;
    description?: string;
    type?: "milestone" | "funding" | "product";
    details?: string[];
    status?: "completed" | "current" | "upcoming";
  }[];
  title?: string;
  interactive?: boolean;
}

export function TimelineChart({ events, title, interactive = true }: TimelineChartProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!events || events.length === 0) return null;

  const handleClick = (index: number) => {
    if (interactive) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case "milestone": return "from-emerald-500 to-green-600";
      case "funding": return "from-blue-500 to-indigo-600";
      case "product": return "from-indigo-500 to-purple-600";
      default: return "from-primary to-blue-600";
    }
  };

  return (
    <div className="my-6">
      {title && <h4 className="font-medium text-foreground mb-4">{title}</h4>}

      <div className="relative pl-8">
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-blue-500 to-muted rounded-full" />
        <div className="space-y-4">
          {events.map((event, i) => {
            const isExpanded = expandedIndex === i;
            const status = event.status || "upcoming";

            return (
              <div
                key={i}
                className={`relative transition-opacity duration-300 ${status === "upcoming" ? "opacity-60" : "opacity-100"}`}
              >
                <div
                  className={`
                    relative flex gap-4 items-start p-4 -ml-4 rounded-xl
                    transition-all duration-200 cursor-pointer
                    ${interactive ? 'hover:bg-muted/50' : ''}
                    ${isExpanded ? 'bg-muted/50' : ''}
                  `}
                  onClick={() => handleClick(i)}
                >
                  <div
                    className={`
                      absolute left-[-11px] top-5 w-4 h-4 rounded-full bg-gradient-to-br ${getTypeColor(event.type)}
                      ${status === 'current' ? 'ring-4 ring-primary/20' : ''}
                      ${status === 'upcoming' ? 'opacity-50' : ''}
                    `}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground font-medium">
                        {event.date}
                      </span>
                      {status === "current" && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="font-medium text-foreground text-lg">
                      {event.title}
                    </div>

                    {event.description && (
                      <div className={`text-sm text-muted-foreground mt-1 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {event.description}
                      </div>
                    )}

                    {interactive && event.details && event.details.length > 0 && (
                      <div className={`
                        overflow-hidden transition-all duration-300 ease-out
                        ${isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}
                      `}>
                        <div className="bg-card rounded-xl p-4 border border-border">
                          <ul className="space-y-2">
                            {event.details.map((detail, j) => (
                              <li
                                key={j}
                                className="text-sm text-foreground flex items-start gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {interactive && (event.details?.length || 0) > 0 && (
                      <button className="mt-3 text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1 font-medium">
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        {isExpanded ? 'Show less' : 'Show details'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

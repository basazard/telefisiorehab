import { createFileRoute } from "@tanstack/react-router";
import { Play, Pause, Timer } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, PageHeader, Stat } from "@/components/PageHeader";
import { chartAxis, chartGrid, chartPrimary, tooltipStyle, weekly } from "@/lib/rehab-data";

export const Route = createFileRoute("/patient/duration")({
  head: () => ({
    meta: [
      { title: "Exercise Duration — TeleFisioRehab Patient" },
      {
        name: "description",
        content: "Session timer and daily exercise duration tracking for home rehab.",
      },
      { property: "og:title", content: "Exercise Duration — TeleFisioRehab Patient" },
      {
        property: "og:description",
        content: "Session timer and daily exercise duration tracking for home rehab.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DurationPage,
});

function DurationPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="Exercise Duration"
        subtitle="Time spent exercising, tracked automatically per session"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Today" value="14:32" sub="Target 18:00" />
        <Stat label="This week" value="2h 01m" sub="+18 min" />
        <Stat label="Daily average" value="17 min" sub="Last 7 days" />
        <Stat label="Longest session" value="23 min" sub="Sunday" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] grid place-items-center">
          <div className="text-center">
            <Timer className="size-5 mx-auto text-accent" />
            <p className="text-5xl font-display font-bold mt-3 tabular-nums">14:32</p>
            <p className="text-xs text-muted-foreground mt-1">Session timer running</p>
            <div className="mt-5 flex justify-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
                <Pause className="size-4" /> Pause
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium">
                <Play className="size-4" /> Resume
              </button>
            </div>
          </div>
        </div>

        <Card className="lg:col-span-2" title="Minutes per Day" sub="Last 7 days">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly}>
                <defs>
                  <linearGradient id="dur" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartPrimary} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={chartPrimary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                <XAxis dataKey="d" stroke={chartAxis} fontSize={12} />
                <YAxis stroke={chartAxis} fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="minutes"
                  stroke={chartPrimary}
                  strokeWidth={2.5}
                  fill="url(#dur)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

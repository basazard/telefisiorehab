import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, PageHeader, Stat } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import { chartAccent, chartAxis, chartGrid, tooltipStyle, weekly } from "@/lib/rehab-data";

export const Route = createFileRoute("/patient/repetitions")({
  head: () => ({
    meta: [
      { title: "Repetition Indicator — TeleFisioRehab Patient" },
      {
        name: "description",
        content: "Live repetition counting per set with weekly repetition totals.",
      },
      { property: "og:title", content: "Repetition Indicator — TeleFisioRehab Patient" },
      {
        property: "og:description",
        content: "Live repetition counting per set with weekly repetition totals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RepetitionsPage,
});

const sets = [
  { s: "Set 1", done: 15, target: 15 },
  { s: "Set 2", done: 12, target: 15 },
  { s: "Set 3", done: 9, target: 15 },
];

function RepetitionsPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="Repetition Indicator"
        subtitle="Real-time repetition counting for the current exercise"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Today" value="36 / 45" sub="80% of target" />
        <Stat label="This week" value="260" sub="+12% vs last week" />
        <Stat label="Best day" value="48 reps" sub="Sunday" />
        <Stat label="Accuracy" value="94%" sub="Correct form" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] grid place-items-center">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Current set</p>
            <p className="text-6xl font-display font-bold text-primary mt-2">12</p>
            <p className="text-sm text-muted-foreground mt-1">of 15 repetitions</p>
            <div className="mt-4 w-48">
              <Progress value={80} className="h-2" />
            </div>
          </div>
        </div>

        <Card className="lg:col-span-2" title="Sets Breakdown" sub="Quadriceps strengthening">
          <div className="space-y-4">
            {sets.map((s) => (
              <div key={s.s}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{s.s}</span>
                  <span className="font-medium">
                    {s.done} / {s.target}
                  </span>
                </div>
                <Progress value={(s.done / s.target) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Weekly Repetitions" sub="Total repetitions per day">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekly}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
              <XAxis dataKey="d" stroke={chartAxis} fontSize={12} />
              <YAxis stroke={chartAxis} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="reps" fill={chartAccent} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

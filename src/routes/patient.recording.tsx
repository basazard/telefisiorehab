import { createFileRoute } from "@tanstack/react-router";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, PageHeader, Stat } from "@/components/PageHeader";
import {
  chartAccent,
  chartAxis,
  chartGrid,
  chartPrimary,
  tooltipStyle,
  weekly,
} from "@/lib/rehab-data";

export const Route = createFileRoute("/patient/recording")({
  head: () => ({
    meta: [
      { title: "Compliance Recording — TeleFisioRehab Patient" },
      {
        name: "description",
        content: "A full log of recorded rehab sessions with repetitions and adherence.",
      },
      { property: "og:title", content: "Compliance Recording — TeleFisioRehab Patient" },
      {
        property: "og:description",
        content: "A full log of recorded rehab sessions with repetitions and adherence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecordingPage,
});

const log = [
  { d: "Today, 08:30", e: "Quad strengthening", r: "36 reps", m: "14:32", c: 87 },
  { d: "Yesterday, 08:12", e: "Knee mobility", r: "30 reps", m: "12:05", c: 70 },
  { d: "Fri, 09:02", e: "Quad strengthening", r: "45 reps", m: "21:10", c: 92 },
  { d: "Thu, 08:44", e: "Balance training", r: "36 reps", m: "17:20", c: 84 },
  { d: "Wed, 08:20", e: "Knee mobility", r: "41 reps", m: "19:00", c: 88 },
];

function RecordingPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="Compliance Recording"
        subtitle="Every session is recorded and shared with your physiotherapist"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Sessions logged" value="42" sub="Last 30 days" />
        <Stat label="Completed fully" value="36" sub="86%" />
        <Stat label="Partial" value="4" sub="Stopped early" />
        <Stat label="Missed" value="2" sub="Rescheduled" />
      </div>

      <Card title="Daily Reps vs Adherence" sub="Last 7 days">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weekly}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
              <XAxis dataKey="d" stroke={chartAxis} fontSize={12} />
              <YAxis stroke={chartAxis} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="reps"
                stroke={chartPrimary}
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="compliance"
                stroke={chartAccent}
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Session Log" sub="Most recent first">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground border-b">
                <th className="py-2 pr-4">When</th>
                <th className="py-2 pr-4">Exercise</th>
                <th className="py-2 pr-4">Repetitions</th>
                <th className="py-2 pr-4">Duration</th>
                <th className="py-2">Compliance</th>
              </tr>
            </thead>
            <tbody>
              {log.map((l, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-3 pr-4 text-muted-foreground text-xs">{l.d}</td>
                  <td className="py-3 pr-4 font-medium">{l.e}</td>
                  <td className="py-3 pr-4">{l.r}</td>
                  <td className="py-3 pr-4">{l.m}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        l.c >= 80
                          ? "bg-success text-success-foreground"
                          : "bg-warning text-warning-foreground"
                      }`}
                    >
                      {l.c}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

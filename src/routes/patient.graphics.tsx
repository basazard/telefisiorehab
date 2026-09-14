import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
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
  rom,
  strength,
  tooltipStyle,
} from "@/lib/rehab-data";

export const Route = createFileRoute("/patient/graphics")({
  head: () => ({
    meta: [
      { title: "Functional Graphics — TeleFisioRehab Patient" },
      {
        name: "description",
        content: "Visual recovery graphics for range of motion, strength and function.",
      },
      { property: "og:title", content: "Functional Graphics — TeleFisioRehab Patient" },
      {
        property: "og:description",
        content: "Visual recovery graphics for range of motion, strength and function.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GraphicsPage,
});

function GraphicsPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="Visualized Functional Graphics"
        subtitle="Your recovery trends over the last 6 weeks"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Range of motion" value="80°" sub="+38° gained" />
        <Stat label="Muscle strength" value="71%" sub="+33 pts" />
        <Stat label="Functional score" value="7.8 / 10" sub="+0.4" />
        <Stat label="Programme week" value="6 / 12" sub="On schedule" />
      </div>

      <Card title="Range of Motion" sub="Degrees — last 6 weeks">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={rom}>
              <defs>
                <linearGradient id="romg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartPrimary} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={chartPrimary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
              <XAxis dataKey="w" stroke={chartAxis} fontSize={12} />
              <YAxis stroke={chartAxis} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="v"
                stroke={chartPrimary}
                strokeWidth={2.5}
                fill="url(#romg)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Muscle Strength Index" sub="Percentage of healthy side">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={strength}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
              <XAxis dataKey="w" stroke={chartAxis} fontSize={12} />
              <YAxis stroke={chartAxis} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="v"
                stroke={chartAccent}
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

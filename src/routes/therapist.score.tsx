import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, PageHeader, Stat } from "@/components/PageHeader";
import { chartAccent, chartAxis, chartGrid, patients, scoreData, tooltipStyle } from "@/lib/rehab-data";

export const Route = createFileRoute("/therapist/score")({
  head: () => ({
    meta: [
      { title: "Functional Score — TeleFisioRehab Physiotherapist" },
      {
        name: "description",
        content: "Functional evaluation scores per patient and cohort trend over 6 months.",
      },
      { property: "og:title", content: "Functional Score — TeleFisioRehab Physiotherapist" },
      {
        property: "og:description",
        content: "Functional evaluation scores per patient and cohort trend over 6 months.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScorePage,
});

function ScorePage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="Functional Evaluation Score"
        subtitle="Standardised 0–10 functional outcome scoring"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Cohort average" value="7.4" sub="+0.4 this month" />
        <Stat label="Highest" value="9.0" sub="Sofia Rossi" />
        <Stat label="Lowest" value="6.2" sub="Marcus Holt" />
        <Stat label="Assessed" value="24 / 24" sub="All up to date" />
      </div>

      <Card title="Cohort Trend" sub="Average score · 6 months">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
              <XAxis dataKey="m" stroke={chartAxis} fontSize={12} />
              <YAxis stroke={chartAxis} fontSize={12} domain={[0, 10]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="v" fill={chartAccent} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Scores by Patient" sub="Latest evaluation">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground border-b">
                <th className="py-2 pr-4">Patient</th>
                <th className="py-2 pr-4">Condition</th>
                <th className="py-2 pr-4">Score</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.name} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-medium">{p.name}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{p.cond}</td>
                  <td className="py-3 pr-4 font-semibold">{p.score.toFixed(1)}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        p.score >= 7.5
                          ? "bg-success text-success-foreground"
                          : "bg-warning text-warning-foreground"
                      }`}
                    >
                      {p.score >= 7.5 ? "Improving" : "Monitor"}
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

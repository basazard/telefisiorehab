import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, PageHeader, Stat } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import { chartAxis, chartGrid, chartPrimary, patients, tooltipStyle } from "@/lib/rehab-data";

export const Route = createFileRoute("/therapist/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance Level — TeleFisioRehab Physiotherapist" },
      {
        name: "description",
        content: "Cohort compliance levels with alerts for patients falling behind.",
      },
      { property: "og:title", content: "Compliance Level — TeleFisioRehab Physiotherapist" },
      {
        property: "og:description",
        content: "Cohort compliance levels with alerts for patients falling behind.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComplianceLevelPage,
});

function ComplianceLevelPage() {
  const data = patients.map((p) => ({ name: p.name.split(" ")[0], v: p.compliance }));
  const atRisk = patients.filter((p) => p.compliance < 75);

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Compliance Level"
        subtitle="Adherence monitoring across your active patients"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Cohort average" value="81%" sub="+4% vs last month" />
        <Stat label="Above target" value="16" sub="≥ 80% adherence" />
        <Stat label="At risk" value={String(atRisk.length)} sub="< 75% adherence" />
        <Stat label="Missed sessions" value="11" sub="Last 7 days" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Compliance by Patient" sub="Last 7 days">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                <XAxis dataKey="name" stroke={chartAxis} fontSize={12} />
                <YAxis stroke={chartAxis} fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="v" fill={chartPrimary} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Detailed Levels" sub="Compliance per patient">
          <div className="space-y-4">
            {patients.map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{p.name}</span>
                  <span className="font-medium">{p.compliance}%</span>
                </div>
                <Progress value={p.compliance} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Needs Follow-up" sub="Patients below the 75% threshold">
        <ul className="divide-y">
          {atRisk.map((p) => (
            <li key={p.name} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.cond} · last session {p.last.toLowerCase()}
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-warning text-warning-foreground">
                {p.compliance}%
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Stat } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import { weekly } from "@/lib/rehab-data";

export const Route = createFileRoute("/patient/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance Bar — TeleFisioRehab Patient" },
      {
        name: "description",
        content: "Weekly adherence bars showing how closely you follow your rehab plan.",
      },
      { property: "og:title", content: "Compliance Bar — TeleFisioRehab Patient" },
      {
        property: "og:description",
        content: "Weekly adherence bars showing how closely you follow your rehab plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompliancePage,
});

function CompliancePage() {
  const avg = Math.round(weekly.reduce((a, b) => a + b.compliance, 0) / weekly.length);
  return (
    <div className="grid gap-6">
      <PageHeader title="Compliance Bar" subtitle="How closely you followed your plan each day" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Weekly average" value={`${avg}%`} sub="Excellent" />
        <Stat label="Best day" value="95%" sub="Sunday" />
        <Stat label="Missed sessions" value="2" sub="Last 30 days" />
        <Stat label="Streak" value="9 days" sub="Keep going" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="This Week's Adherence" sub="Daily compliance">
          <div className="space-y-4">
            {weekly.map((d) => (
              <div key={d.d}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{d.d}</span>
                  <span className="font-medium">{d.compliance}%</span>
                </div>
                <Progress value={d.compliance} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        <Card title="By Exercise Type" sub="Last 30 days">
          <div className="space-y-4">
            {[
              { l: "Strengthening", v: 91 },
              { l: "Mobility / ROM", v: 84 },
              { l: "Balance", v: 76 },
              { l: "Stretching", v: 68 },
            ].map((x) => (
              <div key={x.l}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{x.l}</span>
                  <span className="font-medium">{x.v}%</span>
                </div>
                <Progress value={x.v} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

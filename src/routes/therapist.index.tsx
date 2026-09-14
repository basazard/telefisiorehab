import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Stat } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import { patients } from "@/lib/rehab-data";

export const Route = createFileRoute("/therapist/")({
  head: () => ({
    meta: [
      { title: "Patient Data — TeleFisioRehab Physiotherapist" },
      {
        name: "description",
        content: "Adaptive monitoring of home-rehab patients, compliance and functional scores.",
      },
      { property: "og:title", content: "Patient Data — TeleFisioRehab Physiotherapist" },
      {
        property: "og:description",
        content: "Adaptive monitoring of home-rehab patients, compliance and functional scores.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PatientDataPage,
});

function PatientDataPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        title="Patient Data"
        subtitle={`Adaptive monitoring across ${patients.length} active home-rehab patients.`}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Active patients" value="24" sub="+3 this week" />
        <Stat label="Avg compliance" value="81%" sub="+4% vs last month" />
        <Stat label="Avg functional score" value="7.4" sub="Scale 0–10" />
        <Stat label="Teleconsults today" value="6" sub="2 upcoming" />
      </div>

      <Card title="Patient List" sub="Compliance level & functional evaluation score">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground border-b">
                <th className="py-2 pr-4">Patient</th>
                <th className="py-2 pr-4">Condition</th>
                <th className="py-2 pr-4">Compliance</th>
                <th className="py-2 pr-4">Score</th>
                <th className="py-2">Last session</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.name} className="border-b last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground grid place-items-center text-xs font-semibold">
                        {p.name.charAt(0)}
                      </div>
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{p.cond}</td>
                  <td className="py-3 pr-4 w-40">
                    <div className="flex items-center gap-2">
                      <Progress value={p.compliance} className="h-1.5 flex-1" />
                      <span className="text-xs font-medium w-9 text-right">{p.compliance}%</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        p.score >= 7.5
                          ? "bg-success text-success-foreground"
                          : "bg-warning text-warning-foreground"
                      }`}
                    >
                      {p.score.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground text-xs">{p.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

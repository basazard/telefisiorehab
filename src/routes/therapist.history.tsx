import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Stat } from "@/components/PageHeader";
import { sessions } from "@/lib/rehab-data";

export const Route = createFileRoute("/therapist/history")({
  head: () => ({
    meta: [
      { title: "Session History — TeleFisioRehab Physiotherapist" },
      {
        name: "description",
        content: "Complete history of recorded home-rehab sessions across your patients.",
      },
      { property: "og:title", content: "Session History — TeleFisioRehab Physiotherapist" },
      {
        property: "og:description",
        content: "Complete history of recorded home-rehab sessions across your patients.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  return (
    <div className="grid gap-6">
      <PageHeader title="Session History" subtitle="Every recorded session, newest first" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Sessions today" value="9" sub="Across 7 patients" />
        <Stat label="This week" value="61" sub="+8 vs last week" />
        <Stat label="Avg duration" value="16 min" sub="Per session" />
        <Stat label="Avg compliance" value="85%" sub="This week" />
      </div>

      <Card title="Recorded Sessions" sub="Latest activity">
        <ul className="divide-y">
          {sessions.map((s, i) => (
            <li key={i} className="py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">{s.p}</p>
                <p className="text-xs text-muted-foreground">{s.e}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${s.c >= 80 ? "text-accent" : "text-muted-foreground"}`}
                >
                  {s.c}%
                </p>
                <p className="text-xs text-muted-foreground">{s.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

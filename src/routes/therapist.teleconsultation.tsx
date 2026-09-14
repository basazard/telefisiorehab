import { createFileRoute } from "@tanstack/react-router";
import { Phone, Video, Calendar } from "lucide-react";
import { Card, PageHeader, Stat } from "@/components/PageHeader";

export const Route = createFileRoute("/therapist/teleconsultation")({
  head: () => ({
    meta: [
      { title: "Teleconsultation — TeleFisioRehab Physiotherapist" },
      {
        name: "description",
        content: "Schedule and run remote physiotherapy consultations with your patients.",
      },
      { property: "og:title", content: "Teleconsultation — TeleFisioRehab Physiotherapist" },
      {
        property: "og:description",
        content: "Schedule and run remote physiotherapy consultations with your patients.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeleconsultationPage,
});

const upcoming = [
  { n: "Bagus Besar Bagaskara", t: "11:30", in: "in 25 min", r: "Post-ACL review" },
  { n: "Jonas Weber", t: "14:00", in: "in 2h", r: "Hip replacement check-in" },
  { n: "Priya Shah", t: "16:45", in: "later today", r: "Core programme update" },
];

const past = [
  { n: "Sofia Rossi", d: "Yesterday, 15:00", m: "18 min" },
  { n: "Marcus Holt", d: "2 days ago, 10:30", m: "24 min" },
  { n: "Priya Shah", d: "4 days ago, 09:15", m: "15 min" },
];

function TeleconsultationPage() {
  return (
    <div className="grid gap-6">
      <PageHeader title="Teleconsultation" subtitle="Remote sessions with your home-rehab patients" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Today" value="6" sub="2 upcoming" />
        <Stat label="This week" value="19" sub="+3" />
        <Stat label="Avg call length" value="19 min" sub="Last 30 days" />
        <Stat label="Attendance" value="94%" sub="Patients joined" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]">
          <div className="aspect-video bg-[image:var(--gradient-soft)] grid place-items-center">
            <div className="text-center">
              <div className="size-16 rounded-full bg-card grid place-items-center shadow-[var(--shadow-soft)] mx-auto">
                <Video className="size-7 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mt-3">No active call</p>
            </div>
          </div>
          <div className="p-5 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90">
              <Phone className="size-4" /> Start instant call
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-secondary text-secondary-foreground px-4 py-2.5 text-sm font-medium">
              <Calendar className="size-4" /> Schedule session
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card title="Upcoming" sub="Today's schedule">
            <ul className="space-y-3">
              {upcoming.map((s) => (
                <li
                  key={s.n}
                  className="rounded-xl bg-[image:var(--gradient-soft)] p-3 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{s.n}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.t} · {s.in}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.r}</p>
                  </div>
                  <button className="size-9 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center hover:opacity-90">
                    <Phone className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Recent Calls" sub="Completed consultations">
            <ul className="divide-y">
              {past.map((p) => (
                <li key={p.n + p.d} className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{p.n}</p>
                    <p className="text-xs text-muted-foreground">{p.d}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{p.m}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

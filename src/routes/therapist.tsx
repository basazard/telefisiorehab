import { createFileRoute } from "@tanstack/react-router";
import { Users, Gauge, ClipboardList, History, Video, Phone } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/DashboardShell";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/therapist")({
  head: () => ({ meta: [{ title: "Physiotherapist Dashboard — TeleFisioRehab" }] }),
  component: TherapistDashboard,
});

const nav: NavItem[] = [
  { label: "Patient Data", to: "/therapist", icon: Users },
  { label: "Compliance Level", to: "/therapist", icon: Gauge },
  { label: "Functional Score", to: "/therapist", icon: ClipboardList },
  { label: "Session History", to: "/therapist", icon: History },
  { label: "Teleconsultation", to: "/therapist", icon: Video },
];

const patients = [
  {
    name: "Bagus Besar Bagaskara",
    cond: "Post-ACL knee",
    compliance: 87,
    score: 7.8,
    last: "Today",
  },
  { name: "Marcus Holt", cond: "Rotator cuff", compliance: 64, score: 6.2, last: "Yesterday" },
  { name: "Priya Shah", cond: "Lower-back pain", compliance: 92, score: 8.4, last: "Today" },
  { name: "Jonas Weber", cond: "Hip replacement", compliance: 71, score: 6.9, last: "2 days ago" },
  { name: "Sofia Rossi", cond: "Ankle sprain", compliance: 95, score: 9.0, last: "Today" },
];

const scoreData = [
  { m: "Jan", v: 5.2 },
  { m: "Feb", v: 5.8 },
  { m: "Mar", v: 6.5 },
  { m: "Apr", v: 6.9 },
  { m: "May", v: 7.4 },
  { m: "Jun", v: 7.8 },
];

function TherapistDashboard() {
  return (
    <DashboardShell role="Physiotherapist" userName="Dr. Lina Park" nav={nav}>
      <div className="grid gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">Clinical Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Adaptive monitoring across {patients.length} active home-rehab patients.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Active patients" value="24" sub="+3 this week" />
          <Stat label="Avg compliance" value="81%" sub="+4% vs last month" />
          <Stat label="Avg functional score" value="7.4" sub="Scale 0–10" />
          <Stat label="Teleconsults today" value="6" sub="2 upcoming" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Patient Data */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold">Patient Data</h3>
                <p className="text-xs text-muted-foreground">
                  Compliance level & functional evaluation score
                </p>
              </div>
              <button className="text-xs font-medium rounded-md px-3 py-1.5 bg-secondary text-secondary-foreground">
                All patients
              </button>
            </div>
            <div className="mt-5 overflow-x-auto">
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
                          <span className="text-xs font-medium w-9 text-right">
                            {p.compliance}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${p.score >= 7.5 ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}`}
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
          </div>

          {/* Teleconsultation */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2">
              <Video className="size-4 text-accent" />
              <h3 className="font-display font-bold">Teleconsultation</h3>
            </div>
            <p className="text-xs text-muted-foreground">Upcoming sessions</p>
            <ul className="mt-4 space-y-3">
              {[
                { n: "Bagus Besar Bagaskara", t: "11:30", in: "in 25 min" },
                { n: "Jonas Weber", t: "14:00", in: "in 2h" },
                { n: "Priya Shah", t: "16:45", in: "later today" },
              ].map((s) => (
                <li
                  key={s.n}
                  className="rounded-xl bg-[image:var(--gradient-soft)] p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold">{s.n}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.t} · {s.in}
                    </p>
                  </div>
                  <button className="size-9 rounded-full bg-primary text-primary-foreground grid place-items-center hover:opacity-90">
                    <Phone className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90">
              Start instant call
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Functional Score */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-display font-bold">Functional Evaluation Score</h3>
            <p className="text-xs text-muted-foreground">Cohort average · 6 months</p>
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.02 195)" />
                  <XAxis dataKey="m" stroke="oklch(0.50 0.03 210)" fontSize={12} />
                  <YAxis stroke="oklch(0.50 0.03 210)" fontSize={12} domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                    }}
                  />
                  <Bar dataKey="v" fill="oklch(0.72 0.13 165)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Session History */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-display font-bold">Session History</h3>
            <p className="text-xs text-muted-foreground">Latest recorded sessions</p>
            <ul className="mt-4 divide-y">
              {[
                { p: "Sofia Rossi", e: "Ankle mobility · 12 min", c: 98, d: "Today, 09:12" },
                {
                  p: "Bagus Besar Bagaskara",
                  e: "Quad strengthening · 18 min",
                  c: 87,
                  d: "Today, 08:30",
                },
                { p: "Priya Shah", e: "Core stability · 22 min", c: 92, d: "Yesterday" },
                { p: "Marcus Holt", e: "Shoulder ROM · 15 min", c: 64, d: "Yesterday" },
              ].map((s, i) => (
                <li key={i} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{s.p}</p>
                    <p className="text-xs text-muted-foreground">{s.e}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{s.c}%</p>
                    <p className="text-xs text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-display font-bold mt-1">{value}</p>
      <p className="text-[11px] text-accent mt-1">{sub}</p>
    </div>
  );
}

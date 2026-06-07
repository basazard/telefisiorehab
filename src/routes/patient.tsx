import { createFileRoute } from "@tanstack/react-router";
import {
  ClipboardCheck,
  Video,
  Repeat,
  Timer,
  Gauge,
  Bell,
  Activity,
  LineChart,
  Play,
  Pause,
  CheckCircle2,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/DashboardShell";
import { Progress } from "@/components/ui/progress";
import {
  LineChart as RLineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

export const Route = createFileRoute("/patient")({
  head: () => ({ meta: [{ title: "Patient Dashboard — TeleFisioRehab" }] }),
  component: PatientDashboard,
});

const nav: NavItem[] = [
  { label: "Assessment", to: "/patient", icon: ClipboardCheck },
  { label: "Video", to: "/patient", icon: Video },
  { label: "Repetition Indicator", to: "/patient", icon: Repeat },
  { label: "Exercise Duration", to: "/patient", icon: Timer },
  { label: "Compliance Bar", to: "/patient", icon: Gauge },
  { label: "Exercise Reminder", to: "/patient", icon: Bell },
  { label: "Compliance Recording", to: "/patient", icon: Activity },
  { label: "Functional Graphics", to: "/patient", icon: LineChart },
];

const weekly = [
  { d: "Mon", reps: 32, compliance: 78 },
  { d: "Tue", reps: 28, compliance: 72 },
  { d: "Wed", reps: 41, compliance: 88 },
  { d: "Thu", reps: 36, compliance: 84 },
  { d: "Fri", reps: 45, compliance: 92 },
  { d: "Sat", reps: 30, compliance: 70 },
  { d: "Sun", reps: 48, compliance: 95 },
];

const rom = [
  { w: "W1", v: 42 },
  { w: "W2", v: 50 },
  { w: "W3", v: 58 },
  { w: "W4", v: 65 },
  { w: "W5", v: 72 },
  { w: "W6", v: 80 },
];

function PatientDashboard() {
  return (
    <DashboardShell role="Patient" userName="Amelia Chen" nav={nav}>
      <div className="grid gap-6">
        {/* Hero */}
        <div className="rounded-2xl p-6 md:p-8 bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-soft)]">
          <p className="text-sm opacity-90">Good morning, Amelia</p>
          <h1 className="text-2xl md:text-3xl font-display font-bold mt-1">
            Today's session: Knee Recovery — Day 12
          </h1>
          <p className="mt-2 text-sm opacity-90 max-w-xl">
            3 exercises · ~18 min · adaptive intensity based on yesterday's compliance.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-card text-card-foreground px-5 py-2.5 font-medium hover:bg-secondary">
              <Play className="size-4" /> Start session
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur px-5 py-2.5 font-medium hover:bg-white/25">
              View plan
            </button>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard icon={Repeat} label="Repetitions" value="36 / 45" trend="+12%" />
          <KpiCard icon={Timer} label="Exercise Duration" value="14:32" trend="On track" />
          <KpiCard icon={Gauge} label="Compliance" value="87%" trend="Excellent" />
          <KpiCard icon={CheckCircle2} label="Assessment Score" value="7.8 / 10" trend="+0.4" />
        </div>

        {/* Video + compliance bar */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]">
            <div className="aspect-video bg-[image:var(--gradient-soft)] relative grid place-items-center">
              <div className="size-16 rounded-full bg-card grid place-items-center shadow-[var(--shadow-soft)] cursor-pointer">
                <Play className="size-7 text-primary" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <button className="size-9 rounded-full bg-card grid place-items-center">
                  <Pause className="size-4" />
                </button>
                <div className="flex-1 h-1.5 bg-card/60 rounded-full overflow-hidden">
                  <div className="h-full w-2/5 bg-primary" />
                </div>
                <span className="text-xs font-medium text-foreground bg-card px-2 py-1 rounded">
                  04:12 / 10:30
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-lg">
                Quadriceps Strengthening — Set 2 of 3
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Keep your back straight. The repetition indicator counts each successful range of
                motion.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-display font-bold">Compliance Bar</h3>
            <p className="text-xs text-muted-foreground">This week's adherence</p>
            <div className="mt-4 space-y-4">
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
          </div>
        </div>

        {/* Reminder + Graphics */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2">
              <Bell className="size-4 text-accent" />
              <h3 className="font-display font-bold">Exercise Reminders</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {[
                { t: "Morning routine", time: "08:00", on: true },
                { t: "Midday stretching", time: "13:30", on: true },
                { t: "Evening session", time: "19:00", on: false },
              ].map((r) => (
                <li
                  key={r.t}
                  className="flex items-center justify-between rounded-lg bg-muted px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-medium">{r.t}</p>
                    <p className="text-xs text-muted-foreground">{r.time}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${r.on ? "bg-success text-success-foreground" : "bg-secondary text-secondary-foreground"}`}
                  >
                    {r.on ? "On" : "Off"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold">Functional Recovery Graphics</h3>
                <p className="text-xs text-muted-foreground">Range of motion (°) — last 6 weeks</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-success text-success-foreground">
                +38° gained
              </span>
            </div>
            <div className="h-56 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={rom}>
                  <defs>
                    <linearGradient id="rom" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.58 0.11 195)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.58 0.11 195)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.02 195)" />
                  <XAxis dataKey="w" stroke="oklch(0.50 0.03 210)" fontSize={12} />
                  <YAxis stroke="oklch(0.50 0.03 210)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="oklch(0.58 0.11 195)"
                    strokeWidth={2.5}
                    fill="url(#rom)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Compliance recording */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-display font-bold">Compliance Recording</h3>
          <p className="text-xs text-muted-foreground">Daily reps vs adherence</p>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RLineChart data={weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.02 195)" />
                <XAxis dataKey="d" stroke="oklch(0.50 0.03 210)" fontSize={12} />
                <YAxis stroke="oklch(0.50 0.03 210)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="reps"
                  stroke="oklch(0.58 0.11 195)"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="compliance"
                  stroke="oklch(0.72 0.13 165)"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </RLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <div className="size-9 rounded-lg bg-secondary text-secondary-foreground grid place-items-center">
          <Icon className="size-4" />
        </div>
        <span className="text-[11px] font-medium text-accent">{trend}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-3">{label}</p>
      <p className="text-2xl font-display font-bold mt-1">{value}</p>
    </div>
  );
}

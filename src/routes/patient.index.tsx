import { createFileRoute, Link } from "@tanstack/react-router";
import { Repeat, Timer, Gauge, CheckCircle2, Play } from "lucide-react";
import { Card, Stat } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/patient/")({
  head: () => ({
    meta: [
      { title: "Assessment — TeleFisioRehab Patient" },
      {
        name: "description",
        content: "Daily rehab assessment, today's session plan and adaptive progress overview.",
      },
      { property: "og:title", content: "Assessment — TeleFisioRehab Patient" },
      {
        property: "og:description",
        content: "Daily rehab assessment, today's session plan and adaptive progress overview.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssessmentPage,
});

const questions = [
  { q: "Pain level after last session", a: "2 / 10", tone: "success" },
  { q: "Knee stiffness in the morning", a: "Mild", tone: "warning" },
  { q: "Walking without support", a: "15 min", tone: "success" },
  { q: "Sleep quality", a: "Good", tone: "success" },
];

function AssessmentPage() {
  return (
    <div className="grid gap-6">
      <div className="rounded-2xl p-6 md:p-8 bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-soft)]">
        <p className="text-sm opacity-90">Good morning, Amelia</p>
        <h1 className="text-2xl md:text-3xl font-display font-bold mt-1">
          Today's session: Knee Recovery — Day 12
        </h1>
        <p className="mt-2 text-sm opacity-90 max-w-xl">
          3 exercises · ~18 min · adaptive intensity based on yesterday's compliance.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/patient/video"
            className="inline-flex items-center gap-2 rounded-xl bg-card text-card-foreground px-5 py-2.5 font-medium hover:bg-secondary"
          >
            <Play className="size-4" /> Start session
          </Link>
          <Link
            to="/patient/graphics"
            className="inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur px-5 py-2.5 font-medium hover:bg-white/25"
          >
            View progress
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Repetitions" value="36 / 45" sub="+12%" />
        <Stat label="Exercise Duration" value="14:32" sub="On track" />
        <Stat label="Compliance" value="87%" sub="Excellent" />
        <Stat label="Assessment Score" value="7.8 / 10" sub="+0.4" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Daily Self-Assessment" sub="Answers recorded this morning">
          <ul className="space-y-3">
            {questions.map((x) => (
              <li
                key={x.q}
                className="flex items-center justify-between rounded-lg bg-muted px-3 py-2.5"
              >
                <span className="text-sm">{x.q}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    x.tone === "success"
                      ? "bg-success text-success-foreground"
                      : "bg-warning text-warning-foreground"
                  }`}
                >
                  {x.a}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Recovery Milestones" sub="Knee Recovery programme · week 6 of 12">
          <div className="space-y-4">
            {[
              { l: "Range of motion", v: 80 },
              { l: "Muscle strength", v: 71 },
              { l: "Balance & stability", v: 64 },
              { l: "Programme completion", v: 50 },
            ].map((m) => (
              <div key={m.l}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{m.l}</span>
                  <span className="font-medium">{m.v}%</span>
                </div>
                <Progress value={m.v} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { i: Repeat, l: "Next exercise", v: "Quadriceps set 2" },
          { i: Timer, l: "Estimated time", v: "18 minutes" },
          { i: Gauge, l: "Adaptive level", v: "Moderate" },
        ].map((x) => (
          <div
            key={x.l}
            className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4 shadow-[var(--shadow-card)]"
          >
            <div className="size-10 rounded-lg bg-secondary text-secondary-foreground grid place-items-center">
              <x.i className="size-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{x.l}</p>
              <p className="font-display font-bold">{x.v}</p>
            </div>
          </div>
        ))}
      </div>

      <Card title="Therapist Note" sub="Dr. Lina Park · today">
        <p className="text-sm text-muted-foreground">
          Great consistency this week. Increase to 15 repetitions per set if pain stays below 3/10.
          <CheckCircle2 className="inline size-4 text-accent ml-1" />
        </p>
      </Card>
    </div>
  );
}
